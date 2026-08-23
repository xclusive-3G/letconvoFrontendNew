import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { fetchAdminStats } from "../api/adminApi";
import AdminLayout from "./AdminLayout";
import AdminOverviewPage from "./AdminOverviewPage";
import AdminCompaniesPage from "./AdminCompaniesPage";
import AdminCompanyDetailPage from "./AdminCompanyDetailPage";
import AdminMessagesPage from "./AdminMessagesPage";

export default function AdminPage({ setAppPage }) {
  const [activePage, setActivePage] = useState("overview");
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [access, setAccess] = useState("checking"); // "checking" | "granted" | "denied"
  const [unreadMessages, setUnreadMessages] = useState(0);

  const refreshUnreadCount = useCallback(() => {
    fetchAdminStats()
      .then((res) => setUnreadMessages(res.stats?.unreadMessages || 0))
      .catch(() => {});
  }, []);

  const logoutUser = useCallback(async () => {
    try { await supabase.auth.signOut(); } catch (_) {}
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    localStorage.removeItem("user");
    setAppPage("login");
  }, [setAppPage]);

  useEffect(() => {
    fetchAdminStats()
      .then((res) => {
        setAccess("granted");
        setUnreadMessages(res.stats?.unreadMessages || 0);
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setAccess("denied");
        } else {
          setAccess("denied");
        }
      });
  }, []);

  const openCompany = (clientId) => {
    setSelectedClientId(clientId);
    setActivePage("companyDetail");
  };

  if (access === "checking") {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "Syne,sans-serif", color: "#8B6E3C", fontWeight: 800 }}>
        Loading admin panel...
      </div>
    );
  }

  if (access === "denied") {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 20, textAlign: "center" }}>
        <div>
          <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, color: "#1A1614", marginBottom: 8 }}>Access denied</div>
          <div style={{ color: "#8B7060", fontSize: 13, marginBottom: 14, maxWidth: 320 }}>
            This account doesn't have admin access.
          </div>
          <button onClick={() => setAppPage("dashboard")}
            style={{ background: "#8B6E3C", color: "white", border: 0, borderRadius: 6, padding: "10px 14px", cursor: "pointer" }}>
            Back to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout activePage={activePage} setActivePage={setActivePage} setAppPage={setAppPage} logoutUser={logoutUser} unreadMessages={unreadMessages}>
      {activePage === "overview" && <AdminOverviewPage openCompany={openCompany} setActivePage={setActivePage} />}
      {activePage === "companies" && <AdminCompaniesPage openCompany={openCompany} />}
      {activePage === "companyDetail" && (
        <AdminCompanyDetailPage clientId={selectedClientId} onBack={() => setActivePage("companies")} />
      )}
      {activePage === "messages" && <AdminMessagesPage onRead={refreshUnreadCount} />}
    </AdminLayout>
  );
}
