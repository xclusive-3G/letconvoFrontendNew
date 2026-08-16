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

import { API_BASE } from "../config/apiBase";

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
  const [needsSignup, setNeedsSignup] = useState(false);
  const Active = PAGE_MAP[activePage] || OverviewPage;

  // Clears local session state only — does not call supabase.auth.signOut().
  // Used to react to a sign-out that already happened (auth event, missing/invalid token),
  // so it never re-enters Supabase's auth client and races the session lock.
  const clearLocalSession = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    localStorage.removeItem("user");
    setClient(null);
    setAppPage("login");
  }, [setAppPage]);

  // Initiates a sign-out. Only call this from user-triggered actions —
  // it calls supabase.auth.signOut(), which itself fires the SIGNED_OUT
  // event handled below via clearLocalSession (not logoutUser again).
  const logoutUser = useCallback(async () => {
    try { await supabase.auth.signOut(); } catch (_) {}
    clearLocalSession();
  }, [clearLocalSession]);

  const fetchClient = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");
      setNeedsSignup(false);
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token || localStorage.getItem("token");

      if (!token) {
        clearLocalSession();
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
      if (status === 404 && err.response?.data?.needsSignup) {
        setNeedsSignup(true);
        return;
      }
      setLoadError(err.response?.data?.message || err.message || "Could not load dashboard");
    } finally {
      setLoading(false);
    }
  }, [clearLocalSession, logoutUser]);

  // Sends an already-authenticated user (e.g. fresh Google sign-in with no
  // business profile yet) to finish the signup wizard, without signing them
  // out. GetStartedPage picks up "oauth_intent" and resumes using this session.
  const goToSignup = useCallback(() => {
    localStorage.setItem("oauth_intent", "signup");
    setAppPage("getstarted");
  }, [setAppPage]);

  useEffect(() => { fetchClient(); }, [fetchClient]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") clearLocalSession();
      if (event === "TOKEN_REFRESHED" && session?.access_token) localStorage.setItem("token", session.access_token);
    });
    return () => data.subscription.unsubscribe();
  }, [clearLocalSession]);

  if (loading) {
    return <div style={{ minHeight:"100vh", display:"grid", placeItems:"center", fontFamily:"Syne,sans-serif", color:"#8B6E3C", fontWeight:800 }}>Loading dashboard...</div>;
  }

  if (!client && needsSignup) {
    return <div style={{ minHeight:"100vh", display:"grid", placeItems:"center", padding:20, textAlign:"center" }}>
      <div>
        <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, color:"#1A1614", marginBottom:8 }}>Almost there!</div>
        <div style={{ color:"#8B7060", fontSize:13, marginBottom:14, maxWidth:320 }}>You're signed in, but haven't set up your business yet. Finish signup to get to your dashboard.</div>
        <button onClick={goToSignup} style={{ background:"#8B6E3C", color:"white", border:0, borderRadius:6, padding:"10px 14px", cursor:"pointer", marginRight:8 }}>Complete Business Setup →</button>
        <button onClick={logoutUser} style={{ background:"transparent", color:"#8B7060", border:"1px solid #d4c8b8", borderRadius:6, padding:"10px 14px", cursor:"pointer" }}>Sign Out</button>
      </div>
    </div>;
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
      <DashboardLayout activePage={activePage} setActivePage={setActivePage} setAppPage={setAppPage} client={client} refreshClient={fetchClient} logoutUser={logoutUser}>
        <Active setActivePage={setActivePage} setAppPage={setAppPage} client={client} refreshClient={fetchClient} />
      </DashboardLayout>
    </>
  );
}
