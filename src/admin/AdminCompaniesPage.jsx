import { useEffect, useState, useCallback } from "react";
import { fetchCompanies } from "../api/adminApi";

const Pr = "#8B6E3C";

const STATUS_COLORS = {
  active: { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", text: "#10b981" },
  paused: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#ef4444" }
};

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.active;
  return (
    <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 100, background: c.bg, border: `1px solid ${c.border}`, fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, color: c.text, textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {status}
    </span>
  );
}

export default function AdminCompaniesPage({ openCompany }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    fetchCompanies({ q, status })
      .then((res) => setCompanies(res.companies || []))
      .catch((err) => console.error("❌ Admin companies load failed:", err.response?.data || err.message))
      .finally(() => setLoading(false));
  }, [q, status]);

  useEffect(() => {
    const handle = setTimeout(load, 300);
    return () => clearTimeout(handle);
  }, [load]);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#1A1614", marginBottom: 4 }}>Companies</h1>
      <p style={{ fontSize: 12, color: "#8B7060", marginBottom: 18 }}>Every business signed up on the platform.</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input placeholder="Search name, owner, email…" value={q} onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: "8px 12px", border: "1px solid #d4c8b8", borderRadius: 6, fontSize: 12, outline: "none" }} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #d4c8b8", borderRadius: 6, fontSize: 12, background: "#fff", cursor: "pointer" }}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr style={{ background: "#fdf9f5", borderBottom: "1px solid #f0ebe4" }}>
                {["Business", "Owner", "Plan", "Status", "Credits", "Signed Up"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8B7060" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} style={{ padding: 24, textAlign: "center", fontSize: 12, color: "#8B7060" }}>Loading...</td></tr>
              )}
              {!loading && companies.length === 0 && (
                <tr><td colSpan={6} style={{ padding: 24, textAlign: "center", fontSize: 12, color: "#8B7060" }}>No companies found.</td></tr>
              )}
              {!loading && companies.map((c) => (
                <tr key={c.id} onClick={() => openCompany(c.id)}
                  style={{ borderBottom: "1px solid #f7f2ec", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#fdf9f5"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "11px 14px", fontSize: 12, fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#1A1614" }}>{c.business_name}</td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: "#4E4439" }}>{c.ownerName || "-"}<br /><span style={{ fontSize: 10, color: "#8B7060" }}>{c.ownerEmail}</span></td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: "#4E4439" }}>{c.planName || "-"}</td>
                  <td style={{ padding: "11px 14px" }}><StatusBadge status={c.status} /></td>
                  <td style={{ padding: "11px 14px", fontSize: 12, color: Pr, fontFamily: "Syne,sans-serif", fontWeight: 700 }}>{Math.round(c.credits_remaining || 0).toLocaleString()}</td>
                  <td style={{ padding: "11px 14px", fontSize: 11, color: "#8B7060" }}>{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
