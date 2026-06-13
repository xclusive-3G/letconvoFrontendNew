import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

const Sec = ({ title, icon, children }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
    <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0ebe4", display: "flex", alignItems: "center", gap: 10, background: "#fdf9f5" }}>
      <span className="material-symbols-outlined" style={{ fontSize: 17, color: Pr }}>{icon}</span>
      <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>{title}</span>
    </div>
    <div style={{ padding: "16px 20px" }}>{children}</div>
  </motion.div>
);

  



const fetchSettings = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    "https://api.letconvo.live/api/me/settings",
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
    "https://api.letconvo.live/api/me/phone-setup",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data.setup;

  
};







export default function SettingsPage() {

  const API_URL = "https://api.letconvo.live";

const {
  data: settingsData,
  isLoading
} = useQuery({
  queryKey: ["settings"],
  queryFn: fetchSettings,
  staleTime: Infinity,
  gcTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
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

  const [tab, setTab] = useState("account");


  // const [tab, setTab] = useState("account");

  const [businessName, setBusinessName] = useState("Apex Health Clinic");
  const [businessAddress, setBusinessAddress] = useState('123 Wellness Ave, California, united states');

  const [calendarSync, setCalendarSync] = useState(true);
  const [crmSync, setCrmSync] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [zapierKey, setZapierKey] = useState("");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [missedAlerts, setMissedAlerts] = useState(true);
  const [reportFreq, setReportFreq] = useState("daily");
  const [reportEmail, setReportEmail] = useState("admin@apexhealth.com");
  const [adminName, setAdminName] = useState("Sarah Adeyemi");
  const [adminEmail, setAdminEmail] = useState("sarah@apexhealth.com");
  const [timezone, setTimezone] = useState("Africa/Lagos");
  const [saved, setSaved] = useState(false);
const [subscription, setSubscription] = useState(null);
// const [businessPhone, setBusinessPhone] = useState("");
// const [letconvoNumber, setLetconvoNumber] = useState(null);
// const [forwardingVerified, setForwardingVerified] = useState(false);
// const [letconvoNumber, setLetconvoNumber] = useState(null);
// const [forwardingVerified, setForwardingVerified] = useState(false);
// const [verifying, setVerifying] = useState(false);
// const [phoneSetup, setPhoneSetup] = useState(null);

  

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://api.letconvo.live/api/me/settings",
        {
          businessName,
          businessAddress,
          adminName,
          adminEmail,
          timezone,
          calendarSync,
          crmSync,
          webhookUrl,
          zapierKey,
          emailNotif,
          smsNotif,
          missedAlerts,
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





//   const verifyForwarding = async () => {
//   try {
//     setVerifying(true);

//     const token = localStorage.getItem("token");

//     const res = await axios.post(
//       "https://api.letconvo.live/api/me/phone-setup/verify",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     setForwardingVerified(
//       res.data.verified
//     );

//     alert(
//       res.data.verified
//         ? "Phone forwarding verified"
//         : "No forwarded call detected"
//     );
//   } catch (err) {
//     alert(
//       err.response?.data?.message ||
//       err.response?.data?.error ||
//       "Verification failed"
//     );
//   } finally {
//     setVerifying(false);
//   }
// };


  const TABS = [
    // {id:"ai",            label:"AI Behaviour",  icon:"smart_toy"},
    { id: "account", label: "Account", icon: "manage_accounts" },
    { id: "integrations", label: "Integrations", icon: "hub" },
    { id: "notifications", label: "Notifications", icon: "notifications" },

  ];

//   useEffect(() => {
//   const loadPhoneSetup = async () => {
//     try {
//       const setup = await fetchPhoneSetup();

//       setLetconvoNumber(setup?.letconvo_number || null);
//       setForwardingVerified(setup?.forwarding_verified || false);
//       setBusinessPhone(setup?.business_number || "");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   loadPhoneSetup();
// }, []);

useEffect(() => {
  if (!settingsData) return;

  setSubscription(settingsData.subscription || null);
  setBusinessName(settingsData.businessName || "");
  setBusinessAddress(settingsData.businessAddress || "");
  setAdminName(settingsData.adminName || "");
  setAdminEmail(settingsData.adminEmail || "");
  setTimezone(settingsData.timezone || "Africa/Lagos");

  setCalendarSync(settingsData.calendarSync);
  setCrmSync(settingsData.crmSync);
  setWebhookUrl(settingsData.webhookUrl || "");
  setZapierKey(settingsData.zapierKey || "");

  setEmailNotif(settingsData.emailNotif);
  setSmsNotif(settingsData.smsNotif);
  setMissedAlerts(settingsData.missedAlerts);
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
            {calendarSync && (
  <div style={{ marginTop: 10, padding: "12px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 7, display: "flex", alignItems: "center", gap: 8 }}>
    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#10b981" }}>check_circle</span>
    <span style={{ fontSize: 12, color: "#065f46" }}>Connected: apex-health@gmail.com · Last sync 2 min ago</span>
  </div>
)}
<div style={{ marginTop: 12, display: "flex", gap: 10 }}>
  {[["Google Calendar", "calendar_month", "#4285F4"], ["Outlook", "mail", "#0078d4"], ["Calendly", "event", "#006BFF"]].map(([name, ic, c]) => (
    <button
      key={name}
      onClick={name === "Google Calendar" ? () => window.location.href = `${API_URL}/api/auth/google/:userId` : undefined}
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
          <Sec title="CRM Integration" icon="contacts">
            <Toggle value={crmSync} onChange={setCrmSync} label="CRM Auto-sync" sub="Automatically create/update contacts and log interactions." />
            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive"].map(name => (
                <button key={name} style={{ padding: "7px 14px", border: "1px solid #e8e2d8", borderRadius: 6, background: "#fff", cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 11, color: "#4E4439" }}>Connect {name}</button>
              ))}
            </div>
          </Sec>
          <Sec title="Webhook & API" icon="code">
            <Inp label="Webhook URL" value={webhookUrl} onChange={setWebhookUrl} placeholder="https://your-server.com/webhook" sub="Receive real-time events for every call, booking, and lead qualification." />
            <Inp label="Zapier API Key" value={zapierKey} onChange={setZapierKey} placeholder="zap_xxxxxxxxxxxxxxxxx" type="password" sub="Connect to 2,000+ apps via Zapier." />
            <div style={{ marginTop: 14, padding: "12px 14px", background: "#fdf9f5", borderRadius: 7, border: "1px solid #f0ebe4" }}>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 6 }}>Your API Key</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <code style={{ flex: 1, fontSize: 11, background: "#f0ebe4", padding: "6px 10px", borderRadius: 5, color: "#4E4439", letterSpacing: "0.05em" }}>lum_sk_live_••••••••••••••••••••••••</code>
                <button style={{ padding: "6px 12px", background: Pr, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 10 }}>Copy</button>
                <button style={{ padding: "6px 12px", background: "#f7f2ec", color: "#4E4439", border: "1px solid #e8e2d8", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 10 }}>Regenerate</button>
              </div>
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

    <div
      style={{
        fontSize: 18,
        fontWeight: 700,
        color: Pr
      }}
    >
      {letconvoNumber ? letconvoNumber : "Number not assigned"}
    </div>

    <div
      style={{
        marginTop: 8,
        fontSize: 12,
        color: "#8B7060"
      }}
    >
      Configure call forwarding from your carrier
      to this LetConvo number.
    </div>
  </div>

  </>
)}

  
  <div
    style={{
      background: "#fff",
      border: "1px solid #e8e2d8",
      borderRadius: 8,
      padding: 14,
      marginBottom: 14
    }}
  >
    {letconvoNumber ? (
  <>
    <p>Call your carrier.</p>
    <p>Enable call forwarding.</p>
    <p>Forward calls to {letconvoNumber}.</p>
    <p>Call your business number.</p>
    <p>Click Verify Connection.</p>
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

   {/* <button
  onClick={verifyForwarding}
  disabled={verifying || !letconvoNumber}
      style={{
        padding: "8px 16px",
        border: "none",
        borderRadius: 6,
        background: Pr,
        color: "#fff",
        cursor: "pointer",
        fontFamily: "Syne,sans-serif",
        fontWeight: 700
      }}
    >
      {verifying
        ? "Verifying..."
        : "Verify Connection"}
    </button> */}
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
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "8px 16px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Pause AI Receptionist</button>
              <button style={{ padding: "8px 16px", background: "#fff", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Delete Account</button>
            </div>
          </Sec>
        </>
      )}
    </div>
  );
}
