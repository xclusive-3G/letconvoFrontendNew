import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE, API_ROOT } from "../config/apiBase";
import { supabase } from "../lib/supabase";

const Pr = "#8B6E3C";




const Toggle = ({ value, onChange, label, sub }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f7f3ef" }}>
    <div>
      <div style={{ fontSize: 13, color: "#1A1614", fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#8B7060", marginTop: 2 }}>{sub}</div>}
    </div>
    <div onClick={() => onChange(!value)}
      style={{ width: 40, height: 22, borderRadius: 11, cursor: "pointer", position: "relative", flexShrink: 0, background: value ? Pr : "#e8e2d8", transition: "background 0.2s" }}>
      <motion.div animate={{ x: value ? 20 : 2 }} transition={{ duration: .2, ease: [.16, 1, .3, 1] }}
        style={{ position: "absolute", top: 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
    </div>
  </div>
);

const Inp = ({ label, value, onChange, placeholder, type = "text", sub }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 5 }}>{label}</label>
    {sub && <div style={{ fontSize: 11, color: "#8B7060", marginBottom: 5 }}>{sub}</div>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", border: "1px solid #e8e2d8", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1A1614", fontFamily: "DM Sans,sans-serif", outline: "none", background: "#fff" }} />
  </div>
);

const Sel = ({ label, value, onChange, options, sub }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 5 }}>{label}</label>
    {sub && <div style={{ fontSize: 11, color: "#8B7060", marginBottom: 5 }}>{sub}</div>}
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", border: "1px solid #e8e2d8", borderRadius: 6, padding: "9px 12px", fontSize: 13, color: "#1A1614", fontFamily: "DM Sans,sans-serif", outline: "none", background: "#fff", cursor: "pointer" }}>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  </div>
);

const Sec = ({ title, icon, children, locked }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
    <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0ebe4", display: "flex", alignItems: "center", gap: 10, background: "#fdf9f5" }}>
      <span className="material-symbols-outlined" style={{ fontSize: 17, color: Pr }}>{icon}</span>
      <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>{title}</span>
      {locked && (
        <span style={{ marginLeft: "auto", padding: "3px 9px", borderRadius: 4, background: `${Pr}10`, border: `1px solid ${Pr}30`, color: Pr, fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
          Growth &amp; Premium
        </span>
      )}
    </div>
    {locked && (
      <div style={{ padding: "9px 20px", background: "#fdf9f5", borderBottom: "1px solid #f0ebe4", fontSize: 11.5, color: "#8B7060" }}>
        This integration comes with the Growth and Premium plans, both still under build — not available yet.
      </div>
    )}
    <div style={{ padding: "16px 20px", opacity: locked ? 0.45 : 1, pointerEvents: locked ? "none" : "auto" }}>{children}</div>
  </motion.div>
);

  



const fetchSettings = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API_BASE}/me/settings`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data.settings;
};

const fetchPhoneSetup = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API_BASE}/me/phone-setup`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data.setup;

  
};







export default function SettingsPage({ client }) {

  const API_URL = API_ROOT;

const {
  data: settingsData,
  isLoading
} = useQuery({
  queryKey: ["settings"],
  queryFn: fetchSettings,
  staleTime: 10000,
  gcTime: 10 * 60 * 1000,
  refetchInterval: 15000,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchOnMount: true,
  retry: false
});

    const {
      data: phoneSetup,
      isPending: phoneSetupPending
    } = useQuery({
      queryKey: ["phone-setup"],
      queryFn: fetchPhoneSetup,
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false
    });


const letconvoNumber = phoneSetup?.letconvo_number || null;
const forwardingVerified = phoneSetup?.forwarding_verified || false;

  const [tab, setTab] = useState(() =>
    new URLSearchParams(window.location.search).get("settings") ? "integrations" : "account"
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("settings");
    if (!result) return;

    if (result === "success") alert("Google Calendar connected!");
    else if (result === "error") alert("Couldn't connect Google Calendar — please try again.");

    params.delete("settings");
    const newSearch = params.toString();
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (newSearch ? `?${newSearch}` : "") + window.location.hash
    );
  }, []);


  // const [tab, setTab] = useState("account");

  const [businessName, setBusinessName] = useState("Apex Health Clinic");
  const [businessAddress, setBusinessAddress] = useState('123 Wellness Ave, California, united states');

  const [calendarSync, setCalendarSync] = useState(true);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [receptionistPaused, setReceptionistPaused] = useState(false);
  const [pausing, setPausing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [calendarEmail, setCalendarEmail] = useState(null);
  const [crmSync, setCrmSync] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookTest, setWebhookTest] = useState(null);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [missedAlerts, setMissedAlerts] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [reportFreq, setReportFreq] = useState("daily");
  const [reportEmail, setReportEmail] = useState("admin@apexhealth.com");
  const [adminName, setAdminName] = useState("Sarah Adeyemi");
  const [adminEmail, setAdminEmail] = useState("sarah@apexhealth.com");
  const [timezone, setTimezone] = useState("Africa/Lagos");
  const [saved, setSaved] = useState(false);
const [subscription, setSubscription] = useState(null);
const [verifying, setVerifying] = useState(false);
const queryClient = useQueryClient();

  // ── Danger zone ──
  const togglePause = async () => {
    const pausing_ = !receptionistPaused;
    const ok = window.confirm(
      pausing_
        ? "Pause your AI receptionist? It will stop answering calls, making missed-call callbacks and sending appointment reminder calls until you resume it."
        : "Resume your AI receptionist? It will start answering calls again."
    );
    if (!ok) return;

    try {
      setPausing(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE}/me/receptionist/pause`,
        { paused: pausing_ },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReceptionistPaused(res.data.paused);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["settings"] }),
        queryClient.invalidateQueries({ queryKey: ["overview"] })
      ]);
      if (res.data.lowCredits) {
        alert("Your AI receptionist is resumed, but it can't take calls until you add credits. Top up from the Balance page.");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Couldn't update your AI receptionist. Please try again.");
    } finally {
      setPausing(false);
    }
  };

  const deleteAccount = async () => {
    if (deleteText !== "DELETE") return;
    try {
      setDeleting(true);
      setDeleteError("");
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/me/account`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { confirm: "DELETE" }
      });
      try { await supabase.auth.signOut(); } catch (_) {}
      localStorage.removeItem("token");
      localStorage.removeItem("clientId");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (err) {
      setDeleteError(err.response?.data?.error || "Couldn't delete your account. Please try again or contact support.");
      setDeleting(false);
    }
  };



  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_BASE}/me/settings`,
        {
          businessName,
          businessAddress,
          adminName,
          adminEmail,
          timezone,
          calendarSync,
          crmSync,
          webhookUrl,
          emailNotif,
          smsNotif,
          missedAlerts,
          appointmentReminders,
          reportFreq,
          reportEmail
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      console.log("❌ Save settings failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to save settings");
    }
  };





  const sendWebhookTest = async () => {
    try {
      setTestingWebhook(true);
      setWebhookTest(null);
      await axios.post(
        `${API_BASE}/me/webhook/test`,
        { webhookUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWebhookTest({ ok: true, message: "Test event delivered." });
    } catch (err) {
      setWebhookTest({ ok: false, message: err.response?.data?.error || "Couldn't send the test event." });
    } finally {
      setTestingWebhook(false);
    }
  };

  const verifyForwarding = async () => {
    try {
      setVerifying(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE}/me/phone-setup/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      await queryClient.invalidateQueries({ queryKey: ["phone-setup"] });

      alert(
        res.data.verified
          ? "Phone forwarding verified — your calls are now reaching Letconvo."
          : "No test call detected yet. Call your business number first, then click Verify Connection again."
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Verification failed"
      );
    } finally {
      setVerifying(false);
    }
  };


  const TABS = [
    // {id:"ai",            label:"AI Behaviour",  icon:"smart_toy"},
    { id: "account", label: "Account", icon: "manage_accounts" },
    { id: "integrations", label: "Integrations", icon: "hub" },
    { id: "notifications", label: "Notifications", icon: "notifications" },

  ];

useEffect(() => {
  if (!settingsData) return;

  setSubscription(settingsData.subscription || null);
  setBusinessName(settingsData.businessName || "");
  setBusinessAddress(settingsData.businessAddress || "");
  setAdminName(settingsData.adminName || "");
  setAdminEmail(settingsData.adminEmail || "");
  setTimezone(settingsData.timezone || "Africa/Lagos");

  setCalendarSync(settingsData.calendarSync);
  setCalendarConnected(settingsData.calendarConnected);
  setReceptionistPaused(Boolean(settingsData.receptionistPaused));
  setCalendarEmail(settingsData.calendarEmail);
  setCrmSync(settingsData.crmSync);
  setWebhookUrl(settingsData.webhookUrl || "");

  setEmailNotif(settingsData.emailNotif);
  setSmsNotif(settingsData.smsNotif);
  setMissedAlerts(settingsData.missedAlerts);
  setAppointmentReminders(settingsData.appointmentReminders);
  setReportFreq(settingsData.reportFreq || "daily");
  setReportEmail(settingsData.reportEmail || "");
}, [settingsData]);




if (isLoading) {
  return <div style={{ padding: 24 }}>Loading settings...</div>;
}

  return (
    <div style={{ padding: "24px", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: "#1A1614", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Settings</h1>
          <p style={{ fontSize: 12, color: "#8B7060", marginTop: 2 }}>Configure your Letconvo AI receptionist</p>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} onClick={handleSave}
          style={{ padding: "8px 20px", borderRadius: 5, border: "none", cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", background: saved ? "#10b981" : "#8B6E3C", color: "#fff", transition: "background 0.2s" }}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </motion.button>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 2, background: "#f7f2ec", borderRadius: 8, padding: 4, marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: "8px 12px", border: "none", cursor: "pointer", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: tab === t.id ? "#fff" : "transparent", boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,.08)" : "none", transition: "all 0.18s" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15, color: tab === t.id ? Pr : "#8B7060" }}>{t.icon}</span>
            <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: tab === t.id ? "#1A1614" : "#8B7060" }}>{t.label}</span>
          </button>
        ))}
      </div>

      {tab === "integrations" && (
        <>
          <Sec title="Calendar Integration" icon="calendar_month">
            <Toggle value={calendarSync} onChange={setCalendarSync} label="Google Calendar Sync" sub="AI automatically books appointments into your calendar." />
            {calendarConnected ? (
  <div style={{ marginTop: 10, padding: "12px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 7, display: "flex", alignItems: "center", gap: 8 }}>
    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#10b981" }}>check_circle</span>
    <span style={{ fontSize: 12, color: "#065f46" }}>Connected: {calendarEmail}</span>
  </div>
) : (
  <div style={{ marginTop: 10, padding: "12px 14px", background: "#fdf9f5", border: "1px solid #e8e2d8", borderRadius: 7, display: "flex", alignItems: "center", gap: 8 }}>
    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#8B7060" }}>info</span>
    <span style={{ fontSize: 12, color: "#8B7060" }}>Not connected yet — click Google Calendar below to connect.</span>
  </div>
)}
<div style={{ marginTop: 12, display: "flex", gap: 10 }}>
  {[["Google Calendar", "calendar_month", "#4285F4"], ["Outlook", "mail", "#0078d4"], ["Calendly", "event", "#006BFF"]].map(([name, ic, c]) => (
    <button
      key={name}
      onClick={name === "Google Calendar" ? () => window.location.href = `${API_URL}/api/auth/google/${client?.id}` : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 14px", border: `1px solid ${c}30`,
        borderRadius: 6, background: `${c}08`,
        cursor: name === "Google Calendar" ? "pointer" : "not-allowed",
        fontFamily: "Syne,sans-serif", fontWeight: 600,
        fontSize: 11, color: "#1A1614",
        opacity: name === "Google Calendar" ? 1 : 0.5,
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 14, color: c }}>{ic}</span>
      {name}
    </button>
  ))}

            </div>
          </Sec>
          <Sec title="CRM Integration" icon="contacts" locked>
            <Toggle value={crmSync} onChange={setCrmSync} label="CRM Auto-sync" sub="Automatically create/update contacts and log interactions." />
            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive"].map(name => (
                <button key={name} style={{ padding: "7px 14px", border: "1px solid #e8e2d8", borderRadius: 6, background: "#fff", cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 11, color: "#4E4439" }}>Connect {name}</button>
              ))}
            </div>
          </Sec>
          <Sec title="Zapier, Make & Webhooks" icon="code">
            <Inp label="Webhook URL" value={webhookUrl} onChange={v => { setWebhookUrl(v); setWebhookTest(null); }} placeholder="https://hooks.zapier.com/hooks/catch/..." sub="We send call summaries and transcripts, new bookings and booking changes to this address." />
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <button type="button" onClick={sendWebhookTest} disabled={!webhookUrl.trim() || testingWebhook}
                style={{ padding: "8px 14px", border: `1px solid ${Pr}`, borderRadius: 6, background: "#fff", color: Pr, cursor: !webhookUrl.trim() || testingWebhook ? "not-allowed" : "pointer", opacity: !webhookUrl.trim() || testingWebhook ? 0.5 : 1, fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11 }}>
                {testingWebhook ? "Sending…" : "Send test event"}
              </button>
              {webhookTest && <span role="status" style={{ fontSize: 12, color: webhookTest.ok ? "#065f46" : "#b91c1c" }}>{webhookTest.message}</span>}
            </div>
            <div style={{ marginTop: 14, padding: "12px 14px", background: "#fdf9f5", borderRadius: 7, border: "1px solid #f0ebe4", fontSize: 12, color: "#4E4439", lineHeight: 1.6 }}>
              <strong>Zapier:</strong> create a Zap with "Webhooks by Zapier" → "Catch Hook" (may need a paid Zapier plan).<br />
              <strong>Make:</strong> add a "Custom webhook" module.<br />
              Copy the URL it gives you, paste it above, send a test event, then click Save Changes.
            </div>
          </Sec>
        </>
      )}

      {tab === "notifications" && (
        <>
          <Sec title="Alert Channels" icon="notifications_active">
            <Toggle value={emailNotif} onChange={setEmailNotif} label="Email Notifications" sub="Receive call summaries and alerts via email." />
            <Toggle value={smsNotif} onChange={setSmsNotif} label="SMS Notifications" sub="Get real-time SMS alerts for missed calls and new leads." />
            <Toggle value={missedAlerts} onChange={setMissedAlerts} label="Missed Call Alerts" sub="Immediate notification when a caller disconnects before being helped." />
          </Sec>
          <Sec title="Appointment Reminders" icon="event_available">
            <Toggle value={appointmentReminders} onChange={setAppointmentReminders} label="Call Customers Before Appointments" sub="AI calls the customer 20 minutes before their appointment to confirm they're still coming — uses call credits like any other AI call." />
          </Sec>
          <Sec title="Reports" icon="summarize">
            <Sel label="Report Frequency" value={reportFreq} onChange={setReportFreq}
              options={[{ value: "realtime", label: "Real-time" }, { value: "hourly", label: "Hourly digest" }, { value: "daily", label: "Daily summary" }, { value: "weekly", label: "Weekly report" }]} />
            <Inp label="Report Email" value={reportEmail} onChange={setReportEmail} type="email" placeholder="admin@yourcompany.com" />
            <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
              {["Call Volume", "Booking Rate", "Sentiment Score", "Missed Calls", "Lead Count"].map(m => (
                <span key={m} style={{ padding: "4px 10px", borderRadius: 100, background: `${Pr}10`, color: Pr, fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 600, cursor: "pointer" }}>{m}</span>
              ))}
            </div>
          </Sec>
        </>
      )}

      {tab === "account" && (
        <>
          <Sec title="Business Information" icon="manage_accounts">
            <Inp label="Business Name" value={businessName} onChange={setBusinessName} placeholder="Your Business Name" sub="Used in all AI greetings and messages." />
            <Inp label="Business Address" value={businessAddress} onChange={setBusinessAddress} placeholder="Your Business Address" sub="Displayed Business Address " />
          </Sec>

          <Sec title="Phone Setup" icon="call">
{phoneSetupPending && !phoneSetup ? (
  <p>Loading phone setup...</p>
) : (
  <>
    <div
    style={{
      padding: 16,
      background: "#fdf9f5",
      border: "1px solid #f0ebe4",
      borderRadius: 8,
      marginBottom: 16
    }}
  >
    <div
      style={{
        fontSize: 10,
        fontFamily: "Syne,sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#8B7060",
        marginBottom: 6
      }}
    >
      Forward Calls To
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: Pr
        }}
      >
        {letconvoNumber ? letconvoNumber : "Number not assigned"}
      </div>
      {letconvoNumber && (
        <button
          onClick={() => navigator.clipboard.writeText(letconvoNumber)}
          style={{
            padding: "4px 10px",
            border: "1px solid #e8e2d8",
            borderRadius: 5,
            background: "#fff",
            cursor: "pointer",
            fontFamily: "Syne,sans-serif",
            fontWeight: 700,
            fontSize: 10,
            color: "#4E4439"
          }}
        >
          Copy
        </button>
      )}
    </div>

    <div
      style={{
        marginTop: 8,
        fontSize: 12,
        color: "#8B7060"
      }}
    >
      This is the number your carrier needs to forward calls to. Letconvo
      answers every call that reaches it — your business number itself
      never changes.
    </div>
  </div>

  </>
)}


  <div
    style={{
      background: "#fff",
      border: "1px solid #e8e2d8",
      borderRadius: 8,
      padding: 16,
      marginBottom: 14
    }}
  >
    {letconvoNumber ? (
  <>
    <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1614", marginBottom: 4 }}>
      Set up call forwarding
    </div>
    <p style={{ fontSize: 12, color: "#8B7060", marginTop: 0, marginBottom: 12 }}>
      Choose <strong>unconditional / forward all calls</strong> on your carrier
      — not "forward when busy" or "forward when unanswered" — so every
      call reaches Letconvo, not just the ones you miss.
    </p>

    <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
      {[
        ["AT&T", `*21*${letconvoNumber.replace(/\D/g, "")}#`, "Then press call. To turn off: dial #21# and press call."],
        ["T-Mobile", `**21*${letconvoNumber.replace(/\D/g, "")}#`, "Then press call. To turn off: dial ##21# and press call."],
        ["Verizon", `*72${letconvoNumber.replace(/\D/g, "")}`, "Then press call, wait for confirmation, then hang up. To turn off: dial *73."],
        ["Other carrier / landline / VoIP", `*72${letconvoNumber.replace(/\D/g, "")}`, "Most carriers use *72 to enable and *73 to disable — if that doesn't work, ask your carrier for the \"unconditional call forwarding\" code."]
      ].map(([carrier, code, note]) => (
        <div key={carrier} style={{ padding: "10px 12px", background: "#fdf9f5", border: "1px solid #f0ebe4", borderRadius: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#1A1614" }}>{carrier}</span>
            <code style={{ fontSize: 12, background: "#f0ebe4", padding: "3px 8px", borderRadius: 4, color: Pr, fontWeight: 700 }}>{code}</code>
          </div>
          <div style={{ fontSize: 11, color: "#8B7060", marginTop: 4 }}>{note}</div>
        </div>
      ))}
    </div>

    <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1614", marginBottom: 8 }}>
      Then verify it worked
    </div>
    <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#4E4439", lineHeight: 1.7 }}>
      <li>From a different phone, call your business number.</li>
      <li>Confirm Letconvo's AI receptionist answers.</li>
      <li>Come back here and click <strong>Verify Connection</strong> below.</li>
    </ol>
  </>
) : (
  <p>
    No LetConvo number has been assigned to your account yet.
    Please contact admin.
  </p>
)}
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >
    <div>
      {!letconvoNumber ? (
  <span
    style={{
      color: "#f59e0b",
      fontWeight: 700
    }}
  >
    🟡 Number Not Assigned
  </span>
) : forwardingVerified ? (
  <span
    style={{
      color: "#10b981",
      fontWeight: 700
    }}
  >
    🟢 Phone Connected
  </span>
) : (
  <span
    style={{
      color: "#ef4444",
      fontWeight: 700
    }}
  >
    🔴 Not Verified
  </span>
)}
    </div>

    <button
  onClick={verifyForwarding}
  disabled={verifying || !letconvoNumber}
      style={{
        padding: "8px 16px",
        border: "none",
        borderRadius: 6,
        background: Pr,
        color: "#fff",
        cursor: verifying || !letconvoNumber ? "not-allowed" : "pointer",
        opacity: verifying || !letconvoNumber ? 0.5 : 1,
        fontFamily: "Syne,sans-serif",
        fontWeight: 700
      }}
    >
      {verifying
        ? "Verifying..."
        : "Verify Connection"}
    </button>
  </div>

</Sec>

          <Sec title="Profile" icon="manage_accounts">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Inp label="Admin Name" value={adminName} onChange={setAdminName} placeholder="Your Name" />
              <Inp label="Email Address" value={adminEmail} onChange={setAdminEmail} type="email" placeholder="admin@company.com" />
            </div>
            <Sel label="Timezone" value={timezone} onChange={setTimezone}
              options={["Africa/Lagos", "Africa/Accra", "Africa/Johannesburg", "Europe/London", "America/New_York", "America/Los_Angeles"]} />
          </Sec>
          <Sec title="Subscription" icon="credit_card">
            <div
              style={{
                fontFamily: "Syne,sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: Pr
              }}
            >
              {subscription?.plan || "Starter"} Plan
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#8B7060",
                marginTop: 2
              }}
            >
              ${subscription?.monthlyPrice || 0}/month ·
              {subscription?.includedMinutes || 0} minutes included ·
              Renews {
                subscription?.renewalDate
                  ? new Date(subscription.renewalDate).toLocaleDateString()
                  : "N/A"
              }
            </div>
            <span
              style={{
                fontSize: 12,
                fontFamily: "Syne,sans-serif",
                fontWeight: 700,
                color: Pr
              }}
            >
              {subscription?.usedMinutes || 0} /
              {subscription?.includedMinutes || 1}
            </span>
            <div style={{ height: 8, background: "#f0ebe4", borderRadius: 100, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${subscription?.includedMinutes
                    ? (
                      ((subscription?.usedMinutes || 0) /
                        subscription.includedMinutes) *
                      100
                    ).toFixed(1)
                    : 0
                    }%`
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.8
                }}
                style={{
                  height: "100%",
                  background: Pr,
                  borderRadius: 100
                }}
              />
            </div>
          </Sec>
          <Sec title="Danger Zone" icon="warning">
            {receptionistPaused && (
              <div style={{ marginBottom: 12, padding: "10px 12px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, fontSize: 12, color: "#92400e" }}>
                Your AI receptionist is paused. It isn't answering calls, making callbacks or sending reminders.
              </div>
            )}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button type="button" onClick={togglePause} disabled={pausing}
                style={{ padding: "8px 16px", background: receptionistPaused ? "#ecfdf5" : "#fef2f2", color: receptionistPaused ? "#047857" : "#ef4444", border: `1px solid ${receptionistPaused ? "#a7f3d0" : "#fecaca"}`, borderRadius: 5, cursor: pausing ? "wait" : "pointer", opacity: pausing ? 0.6 : 1, fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {pausing ? "Saving…" : receptionistPaused ? "Resume AI Receptionist" : "Pause AI Receptionist"}
              </button>
              <button type="button" onClick={() => { setShowDelete(true); setDeleteText(""); setDeleteError(""); }}
                style={{ padding: "8px 16px", background: "#fff", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Delete Account
              </button>
            </div>

            {showDelete && (
              <div role="dialog" aria-modal="true" aria-labelledby="delete-account-title"
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
                onClick={() => !deleting && setShowDelete(false)}>
                <div onClick={e => e.stopPropagation()}
                  style={{ background: "#fff", borderRadius: 10, padding: 24, maxWidth: 440, width: "100%", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
                  <h3 id="delete-account-title" style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 16, color: "#1A1614", margin: 0 }}>Delete your account?</h3>
                  <p style={{ fontSize: 13, color: "#4E4439", lineHeight: 1.6, marginTop: 10 }}>
                    This permanently deletes your business, settings, call history, appointments, credits and login. Your AI receptionist stops immediately. <strong>This can't be undone.</strong>
                  </p>
                  <label style={{ display: "block", fontSize: 12, color: "#4E4439", marginTop: 14, marginBottom: 6 }}>
                    Type <strong>DELETE</strong> to confirm
                  </label>
                  <input value={deleteText} onChange={e => setDeleteText(e.target.value)} autoFocus disabled={deleting}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #e8e2d8", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  {deleteError && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 8 }}>{deleteError}</p>}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
                    <button type="button" onClick={() => setShowDelete(false)} disabled={deleting}
                      style={{ padding: "8px 16px", background: "#fff", color: "#4E4439", border: "1px solid #e8e2d8", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Cancel
                    </button>
                    <button type="button" onClick={deleteAccount} disabled={deleteText !== "DELETE" || deleting}
                      style={{ padding: "8px 16px", background: deleteText === "DELETE" ? "#ef4444" : "#fca5a5", color: "#fff", border: "none", borderRadius: 5, cursor: deleteText === "DELETE" && !deleting ? "pointer" : "not-allowed", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {deleting ? "Deleting…" : "Delete account"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Sec>
        </>
      )}
    </div>
  );
}
