// import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import { APPOINTMENTS, AGENTS } from "./data";


const API = "https://api.letconvo.live/api";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

const fetchOverviewData = async () => {
  const [statsRes, callsRes, performanceRes] = await Promise.all([
    axios.get(`${API}/me/dashboard-stats`, {
      headers: authHeaders()
    }),
    axios.get(`${API}/me/calls`, {
      headers: authHeaders()
    }),
    axios.get(`${API}/me/todays-performance`, {
      headers: authHeaders()
    })
  ]);

  return {
    dashboardData: statsRes.data,
    callHistory: callsRes.data.calls || [],
    performanceData: performanceRes.data.performance || null
  };
};

const Pr = "#8B6E3C";

function StatCard({ icon, label, value, sub, color = Pr, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 11, fontFamily: "Syne,sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b5d52" }}>{label}</span>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color }}>{icon}</span>
        </div>
      </div>
      <div style={{ fontSize: 28, fontFamily: "Syne,sans-serif", fontWeight: 800, color: "#1A1614", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#8B7060" }}>{sub}</div>}
    </motion.div>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(
    ...data.map((d) => Number(d.calls) || 0),
    1
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 5,
        height: 190
      }}
    >
      {data.map((d, i) => (
        <div
          key={d.day}
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#4E4439"
            }}
          >
            {d.calls}
          </div>

          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: `${Math.max((d.calls / max) * 70, d.calls > 0 ? 8 : 2)}px`
            }}
            transition={{
              delay: i * 0.05,
              duration: 0.6
            }}
            style={{
              width: "100%",
              background: Pr,
              borderRadius: "3px 3px 0 0",
              minHeight: d.calls > 0 ? 8 : 2
            }}
          />

          <span
            style={{
              fontSize: 9,
              color: "#9b8a7a",
              fontFamily: "Syne,sans-serif",
              fontWeight: 600
            }}
          >
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { completed: { bg: "#ecfdf5", color: "#10b981" }, missed: { bg: "#fef2f2", color: "#ef4444" }, transferred: { bg: "#eff6ff", color: "#3b82f6" }, pending: { bg: "#fffbeb", color: "#f59e0b" }, confirmed: { bg: "#ecfdf5", color: "#10b981" } };
  const s = map[status] || { bg: "#f3f4f6", color: "#6b7280" };
  return <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, background: s.bg, color: s.color, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{status}</span>;
}

export default function OverviewPage({ setActivePage, client }) {


const fetchLiveCalls = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("https://api.letconvo.live/api/me/live-calls", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

  const {
  data,
  isLoading,
  error
} = useQuery({
  queryKey: ["overview"],
  queryFn: fetchOverviewData,
  staleTime: 30000,
  refetchInterval: 10000,
  refetchOnWindowFocus: false
});

const { data: liveCallsData } = useQuery({
  queryKey: ["live-calls"],
  queryFn: fetchLiveCalls,
  refetchInterval: 2000,
  refetchOnWindowFocus: false
});

const activeCount = liveCallsData?.activeCount || 0;

const dashboardData = data?.dashboardData;
const callHistory = data?.callHistory || [];
  <p style={{ fontSize: 12, color: "#8B7060", marginTop: 2 }}>
  {callHistory.length} calls recorded · {activeCount} active caller
  {activeCount !== 1 ? "s" : ""} live
</p>

const performanceData = data?.performanceData;

  const weeklyData = dashboardData?.weeklyData || [
    { day: "Sun", calls: 0 },
    { day: "Mon", calls: 0 },
    { day: "Tue", calls: 0 },
    { day: "Wed", calls: 0 },
    { day: "Thu", calls: 0 },
    { day: "Fri", calls: 0 },
    { day: "Sat", calls: 0 }
  ];

  const weeklyTotal = weeklyData.reduce(
    (sum, d) => sum + Number(d.calls || 0),
    0
  );

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const callsTrend = dashboardData?.stats?.callsTrend || "neutral";
  const callsChangePercent = dashboardData?.stats?.callsChangePercent || 0;

  const callsTodaySub =
    callsTrend === "neutral"
      ? "No change vs yesterday"
      : `${callsTrend === "up" ? "↑" : "↓"} ${Math.abs(
        callsChangePercent
      )}% vs yesterday`;

      if (isLoading) {
  return <div style={{ padding: 24 }}>Loading overview...</div>;
}

if (error) {
  return <div style={{ padding: 24 }}>Failed to load overview.</div>;
}

  return (
    <div style={{ padding: "24px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#1A1614", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Dashboard Overview</h1>
        <p style={{ fontSize: 12, color: "#8B7060", marginTop: 3 }}>{currentDate} · Letconvo AI is active and handling calls</p>
      </div>

      {/* Live banner */}
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
        style={{ background: "linear-gradient(90deg,#1a1410,#2d2010)", borderRadius: 8, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14, border: "1px solid rgba(139,110,60,0.3)" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", flexShrink: 0, boxShadow: "0 0 0 3px rgba(16,185,129,0.25)", animation: "pulse 1.2s ease infinite" }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, color: "#c4a97a", textTransform: "uppercase", letterSpacing: "0.1em" }}>AI Receptionist Live </span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>
  Currently handling

  <strong style={{ color: "#c4a97a", marginLeft: 5 }}>
    {activeCount} active caller
    {activeCount !== 1 ? "s" : ""}
  </strong>
</span>
        </div>
        {/* <button onClick={() => setActivePage("live")}
          style={{ background: "#10b981", border: "none", borderRadius: 5, padding: "6px 14px", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
          View Live →
        </button> */}
      </motion.div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard
          icon="call"
          label="Calls Today"
          value={dashboardData?.stats?.callsToday || 0}
          sub={callsTodaySub}
          delay={0}
          color={
            callsTrend === "down"
              ? "#ef4444"
              : callsTrend === "up"
                ? "#10b981"
                : Pr
          }
        />        <StatCard icon="calendar_month" label="Booked Today" value={dashboardData?.stats?.appointmentsBooked || 0} sub="Appointments confirmed" delay={0.06} color="#0097A7" />
        <StatCard icon="person_add" label="Leads Qualified" value={dashboardData?.stats?.leadsQualified || 0} sub="From inbound calls" delay={0.12} color="#6366f1" />
        {/* <StatCard icon="phone" label="Lives Calls" value={dashboardData?.stats?.missedCalls || 0} sub="All have voicemails" delay={0.18} color="#ef4444" /> */}
        {/* <StatCard
          icon="phone"
          label="Live Calls"
          value={dashboardData?.stats?.liveCalls || 0}
          sub="Currently active"
          delay={0.18}
          color="#ef4444"
        /> */}

        <StatCard
  icon="phone"
  label="Live Calls"
  value={activeCount}
  sub="Currently active"
  delay={0.18}
  color="#ef4444"
/>
        <StatCard icon="star" label="Satisfaction" value={`${dashboardData?.stats?.satisfactionScore}/5`} sub="Based on 38 calls" delay={0.24} color="#f59e0b" />
        <StatCard icon="timer" label="Avg Duration" value={dashboardData?.stats?.avgDuration || 0} sub="Per call today" delay={0.30} color="#10b981" />
        <StatCard icon="call_made" label="Transfer Rate" value={dashboardData?.stats?.transferRate || 0} sub="Escalated to humans" delay={0.36} color="#8b5cf6" />
        <StatCard icon="phone_in_talk" label="Total Calls" value={dashboardData?.stats?.totalCalls || 0} sub="All time" delay={0.42} />
      </div>

      {/* Chart + Appointments */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>Calls This Week</span>
            <span style={{ fontSize: 10, color: Pr, fontFamily: "Syne,sans-serif", fontWeight: 600 }}>{weeklyTotal} total</span>
          </div>
          <MiniBarChart
            data={
              weeklyData
            }

          />
          <div style={{ display: "flex", gap: 16, marginTop: 14, paddingTop: 12, borderTop: "1px solid #f0ebe4" }}>
            {[["#8B6E3C", "Total Calls"], ["#10b981", "Booked"], ["#ef4444", "Missed"]].map(([c, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                <span style={{ fontSize: 10, color: "#8B7060" }}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>Today's Appointments</span>
            <button onClick={() => setActivePage("appointments")} style={{ fontSize: 10, color: Pr, fontFamily: "Syne,sans-serif", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
            {APPOINTMENTS.filter(a => a.date === "Today").map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#fdf9f5", borderRadius: 6, border: "1px solid #f0ebe4" }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: Pr, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700 }}>{a.time.replace(" ", "").slice(0, 5)}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#1A1614", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                  <div style={{ fontSize: 10, color: "#8B7060" }}>{a.type}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent calls + Agents */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0ebe4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>Recent Calls</span>
            <button onClick={() => setActivePage("calls")} style={{ fontSize: 10, color: Pr, fontFamily: "Syne,sans-serif", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fdf9f5" }}>
                {["Caller", "Duration", "Status", "Sentiment", "Time"].map(h => (
                  <th key={h} style={{ padding: "8px 16px", textAlign: "left", fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8B7060", borderBottom: "1px solid #f0ebe4" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {callHistory.slice(0, 5).map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f7f3ef" }}>
                  <td style={{ padding: "10px 16px" }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "Syne,sans-serif",
                        fontWeight: 600,
                        color: "#1A1614"
                      }}
                    >
                      {c.caller_phone || "Unknown caller"}
                    </div>

                    <div style={{ fontSize: 10, color: "#8B7060" }}>
                      {c.direction || "unknown"}
                    </div>
                  </td>

                  <td style={{ padding: "10px 16px", fontSize: 12 }}>
                    {Math.ceil((c.duration_ms || 0) / 1000)}s
                  </td>

                  <td style={{ padding: "10px 16px" }}>
                    <StatusBadge status={c.call_status || "completed"} />
                  </td>

                  <td style={{ padding: "10px 16px" }}>
                    {c.disconnection_reason || "-"}
                  </td>

                  <td style={{ padding: "10px 16px", fontSize: 11 }}>
                    {c.created_at
                      ? new Date(c.created_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.5 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px" }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614", display: "block", marginBottom: 16 }}>Agent Status</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AGENTS.map(a => {
              const sc = a.status === "active" ? "#10b981" : a.status === "online" ? "#3b82f6" : a.status === "busy" ? "#f59e0b" : "#9ca3af";
              return (
                <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#fdf9f5", borderRadius: 6, border: "1px solid #f0ebe4" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: sc, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#1A1614" }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: "#8B7060", marginTop: 1 }}>{a.calls} calls · {a.satisfaction}/5 ★</div>
                  </div>
                  <span style={{ fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: sc }}>{a.status}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #f0ebe4" }}>
            <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8B7060", marginBottom: 10 }}>Today's Performance</div>
            {[
              ["Call Answer Rate", `${performanceData?.callAnswerRate || 0}%`],
              ["Avg Handle Time", performanceData?.avgHandleTime || "0s"],
              ["Customer Score", performanceData?.customerScore || "0/5"]
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <span style={{ fontSize: 11, color: "#4E4439" }}>{l}</span>
                <span style={{ fontSize: 11, fontFamily: "Syne,sans-serif", fontWeight: 700, color: Pr }}>{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
