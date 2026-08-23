import { useEffect, useState, useCallback } from "react";
import { fetchContactMessages, markContactMessageRead } from "../api/adminApi";

const Pr = "#8B6E3C";

export default function AdminMessagesPage({ onRead }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetchContactMessages()
      .then((res) => setMessages(res.messages || []))
      .catch((err) => console.error("❌ Admin messages load failed:", err.response?.data || err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const open = async (msg) => {
    setOpenId(openId === msg.id ? null : msg.id);
    if (!msg.read) {
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)));
      try {
        await markContactMessageRead(msg.id);
        onRead?.();
      } catch (err) {
        console.error("❌ Mark read failed:", err.response?.data || err.message);
      }
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#1A1614", marginBottom: 4 }}>Messages</h1>
      <p style={{ fontSize: 12, color: "#8B7060", marginBottom: 18 }}>Submissions from the public Contact Us form.</p>

      <div style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, overflow: "hidden" }}>
        {loading && (
          <div style={{ padding: 24, textAlign: "center", fontSize: 12, color: "#8B7060" }}>Loading...</div>
        )}
        {!loading && messages.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", fontSize: 12, color: "#8B7060" }}>No messages yet.</div>
        )}
        {!loading && messages.map((m) => {
          const isOpen = openId === m.id;
          const fullName = [m.first_name, m.last_name].filter(Boolean).join(" ");
          return (
            <div key={m.id} style={{ borderBottom: "1px solid #f7f2ec" }}>
              <div onClick={() => open(m)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer", background: isOpen ? "#fdf9f5" : "transparent" }}
                onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = "#fdf9f5"; }}
                onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}>
                {!m.read && <span style={{ width: 7, height: 7, borderRadius: "50%", background: Pr, flexShrink: 0 }} />}
                {m.read && <span style={{ width: 7, height: 7, flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "Syne,sans-serif", fontWeight: m.read ? 600 : 800, fontSize: 12, color: "#1A1614" }}>{fullName || "Unknown"}</span>
                    <span style={{ fontSize: 11, color: "#8B7060" }}>{m.email}</span>
                    {m.company_name && <span style={{ fontSize: 10, color: "#8B7060" }}>· {m.company_name}</span>}
                  </div>
                  {!isOpen && (
                    <div style={{ fontSize: 11, color: "#4E4439", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</div>
                  )}
                </div>
                <span style={{ fontSize: 10, color: "#8B7060", flexShrink: 0, whiteSpace: "nowrap" }}>{new Date(m.created_at).toLocaleDateString()}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#8B7060", flexShrink: 0 }}>{isOpen ? "expand_less" : "expand_more"}</span>
              </div>
              {isOpen && (
                <div style={{ padding: "0 16px 16px 33px" }}>
                  <div style={{ fontSize: 12, color: "#4E4439", lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 10 }}>{m.message}</div>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 11, color: "#8B7060" }}>
                    {m.phone && <span>📞 {m.phone}</span>}
                    {m.interest && <span>Interested in: {m.interest}</span>}
                    <a href={`mailto:${m.email}`} style={{ color: Pr, fontWeight: 700, textDecoration: "none" }}>Reply by email →</a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
