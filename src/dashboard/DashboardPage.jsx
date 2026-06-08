import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { supabase } from "../lib/supabase";
import DashboardAlerts from "./DashboardAlerts";
import DashboardLayout  from "./DashboardLayout";
import OverviewPage     from "./OverviewPage";
import CallRecordsPage  from "./CallRecordsPage";
import AppointmentsPage from "./AppointmentsPage";
import AnalyticsPage    from "./AnalyticsPage";
import LiveCallsPage    from "./LiveCallsPage";
import BalancePage      from "./BalancePage";
import SettingsPage     from "./SettingsPage";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const PAGE_MAP = {
  overview:     OverviewPage,
  calls:        CallRecordsPage,
  appointments: AppointmentsPage,
  analytics:    AnalyticsPage,
  live:         LiveCallsPage,
  balance:      BalancePage,
  settings:     SettingsPage,
};

export default function DashboardPage({ setAppPage }) {
  const [activePage, setActivePage] = useState("overview");
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const Active = PAGE_MAP[activePage] || OverviewPage;

  const logoutUser = useCallback(async () => {
    try { await supabase.auth.signOut(); } catch (_) {}
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    localStorage.removeItem("user");
    setClient(null);
    setAppPage("login");
  }, [setAppPage]);

  const fetchClient = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token || localStorage.getItem("token");

      if (!token) {
        await logoutUser();
        return;
      }

      localStorage.setItem("token", token);
      const res = await axios.get(`${API_BASE}/me/client`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClient(res.data.client);
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        await logoutUser();
        return;
      }
      setLoadError(err.response?.data?.message || err.message || "Could not load dashboard");
    } finally {
      setLoading(false);
    }
  }, [logoutUser]);

  useEffect(() => { fetchClient(); }, [fetchClient]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") logoutUser();
      if (event === "TOKEN_REFRESHED" && session?.access_token) localStorage.setItem("token", session.access_token);
    });
    return () => data.subscription.unsubscribe();
  }, [logoutUser]);

  if (loading) {
    return <div style={{ minHeight:"100vh", display:"grid", placeItems:"center", fontFamily:"Syne,sans-serif", color:"#8B6E3C", fontWeight:800 }}>Loading dashboard...</div>;
  }

  if (!client) {
    return <div style={{ minHeight:"100vh", display:"grid", placeItems:"center", padding:20, textAlign:"center" }}>
      <div>
        <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, color:"#1A1614", marginBottom:8 }}>No client found</div>
        {loadError && <div style={{ color:"#8B7060", fontSize:13, marginBottom:14 }}>{loadError}</div>}
        <button onClick={logoutUser} style={{ background:"#8B6E3C", color:"white", border:0, borderRadius:6, padding:"10px 14px", cursor:"pointer" }}>Back to login</button>
      </div>
    </div>;
  }

  return (
    <>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.5)}}`}</style>
      <DashboardAlerts setActivePage={setActivePage} />
      <DashboardLayout activePage={activePage} setActivePage={setActivePage} setAppPage={setAppPage} client={client} refreshClient={fetchClient}>
        <Active setActivePage={setActivePage} setAppPage={setAppPage} client={client} refreshClient={fetchClient} />
      </DashboardLayout>
    </>
  );
}
