import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAdminStats, fetchRecentSignups } from "../api/adminApi";

const Pr = "#8B6E3C";

function StatCard({ icon, label, value, color = Pr, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060" }}>{label}</span>
        <span className="material-symbols-outlined" style={{ fontSize: 16, color }}>{icon}</span>
      </div>
      <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 24, color: "#1A1614" }}>{value}</div>
    </motion.div>
  );
}

export default function AdminOverviewPage({ openCompany }) {
  const [stats, setStats] = useState(null);
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAdminStats(), fetchRecentSignups()])
      .then(([statsRes, signupsRes]) => {
        setStats(statsRes.stats);
        setSignups(signupsRes.companies || []);
      })
      .catch((err) => console.error("❌ Admin overview load failed:", err.response?.data || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: 24, fontSize: 12, color: "#8B7060" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#1A1614", marginBottom: 4 }}>Admin Overview</h1>
      <p style={{ fontSize: 12, color: "#8B7060", marginBottom: 20 }}>Platform-wide status across every company.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 28 }}>
        <StatCard icon="domain" label="Total Companies" value={stats?.totalCompanies ?? 0} delay={0} />
        <StatCard icon="check_circle" label="Active" value={stats?.activeCompanies ?? 0} color="#10b981" delay={0.05} />
        <StatCard icon="pause_circle" label="Paused" value={stats?.pausedCompanies ?? 0} color="#ef4444" delay={0.1} />
        <StatCard icon="account_balance_wallet" label="Credits Outstanding" value={Math.round(stats?.totalCreditsOutstanding ?? 0).toLocaleString()} delay={0.15} />
        <StatCard icon="fiber_new" label="New Signups (48h)" value={stats?.newSignups48h ?? 0} color="#0097A7" delay={0.2} />
      </div>

      <div style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "13px 18px", borderBottom: "1px solid #f0ebe4", background: "#fdf9f5" }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>
            New Signups (Last 48 Hours)
          </span>
        </div>
        {signups.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", fontSize: 12, color: "#8B7060" }}>No new signups in the last 48 hours.</div>
        )}
        {signups.map((c) => (
          <div key={c.id} onClick={() => openCompany(c.id)}
            style={{ padding: "12px 18px", borderBottom: "1px solid #f7f2ec", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#fdf9f5"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            <div>
              <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 13, color: "#1A1614" }}>{c.business_name}</div>
              <div style={{ fontSize: 11, color: "#8B7060", marginTop: 2 }}>{c.ownerName || "-"} · {c.ownerEmail || "-"}</div>
            </div>
            <div style={{ fontSize: 11, color: "#8B7060" }}>{new Date(c.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
