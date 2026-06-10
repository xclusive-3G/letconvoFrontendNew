import { useEffect, useState } from "react";
import axios from "axios";

const Pr = "#8B6E3C";

export default function DashboardAlerts({ setActivePage }) {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://api.letconvo.live/api/me/alerts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const a = res.data.alerts;

        const hasSeenNumberPopup = localStorage.getItem("number_popup_seen");

        if (a.lowCredit) {
          setAlert({
            type: "lowCredit",
            title: "Low Credit Warning",
            message: a.lowCreditMessage,
            button: "Top Up Now"
          });
          return;
        }

        if (a.numberAdded && !hasSeenNumberPopup) {
          setAlert({
            type: "numberAdded",
            title: "Phone Number Added",
            message: a.numberMessage,
            button: "Okay"
          });

          localStorage.setItem("number_popup_seen", "true");
        }
      } catch (err) {
        console.log("❌ Alerts failed:", err.response?.data || err.message);
      }
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!alert) return null;

  const isLowCredit = alert.type === "lowCredit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          borderRadius: 10,
          padding: 24,
          boxShadow: "0 20px 70px rgba(0,0,0,0.25)"
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: isLowCredit ? "#fef2f2" : "#ecfdf5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 28,
              color: isLowCredit ? "#ef4444" : "#10b981"
            }}
          >
            {isLowCredit ? "warning" : "check_circle"}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "Syne,sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: "#1A1614",
            marginBottom: 8
          }}
        >
          {alert.title}
        </h2>

        <p
          style={{
            fontSize: 13,
            color: "#8B7060",
            lineHeight: 1.6,
            marginBottom: 20
          }}
        >
          {alert.message}
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          {isLowCredit && (
            <button
              onClick={() => {
                setAlert(null);
                setActivePage("balance");
              }}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: Pr,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "Syne,sans-serif",
                fontWeight: 700,
                fontSize: 11,
                textTransform: "uppercase"
              }}
            >
              Top Up Now
            </button>
          )}

          <button
            onClick={() => setAlert(null)}
            style={{
              flex: 1,
              padding: "10px 14px",
              background: "#f7f2ec",
              color: "#4E4439",
              border: "1px solid #e8e2d8",
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "Syne,sans-serif",
              fontWeight: 700,
              fontSize: 11,
              textTransform: "uppercase"
            }}
          >
            {isLowCredit ? "Later" : "Okay"}
          </button>
        </div>
      </div>
    </div>
  );
}