import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";


const Pr = "#8B6E3C";

function BarChart({ data, xKey, barKey, color = Pr, height = 140 }) {
  // const max = Math.max(...data.map(d=>d[barKey]));
  const max = Math.max(
    ...data.map(d => Number(d[barKey]) || 0),
    1
  );
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, paddingBottom: 22, position: "relative" }}>
      {data.map((d, i) => (
        <div key={d[xKey]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: 4 }}>
          <motion.div initial={{ height: 0 }} animate={{ height: `${(d[barKey] / max) * 100}%` }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", background: color, borderRadius: "3px 3px 0 0", minHeight: 3 }} />
          <span style={{ fontSize: 9, color: "#9b8a7a", fontFamily: "Syne,sans-serif", fontWeight: 600, position: "absolute", bottom: 0 }}>{d[xKey]}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data, size = 120 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const r = 45, cx = size/2, cy = size/2;
  const circumference = 2 * Math.PI * r;
  const segments = data.map(d => {
    const dash = (d.value / total) * circumference;
    const gap  = circumference - dash;
    const rot  = (offset / total) * 360;
    offset += d.value;
    return { ...d, dash, gap, rot };
  });
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0ebe4" strokeWidth={14} />
      {segments.map((s, i) => (
        <circle key={s.label} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={14}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-((s.off - s.value) / total) * circumference + circumference * 0.25}
          transform={`rotate(-90 ${cx} ${cy})`} />
      ))}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, fill: "#1A1614" }}>{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: "DM Sans,sans-serif", fontSize: 9, fill: "#8B7060" }}>Total</text>
    </svg>
  );
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("week");
  const fetchAnalytics = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `https://api.letconvo.live/api/me/analytics?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data.analytics;
};

const {
  data: analyticsData,
  isLoading,
  error,
  // refetch
} = useQuery({
  queryKey: ["analytics", period],
  queryFn: fetchAnalytics,

  staleTime: 7000,
  gcTime: 10 * 60 * 1000,

  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchOnMount: true,
  refetchInterval: 30000
});

  const statusDist = [
    {
      label: "Completed",
      value: analyticsData?.callStatus?.completed || 0,
      color: "#10b981"
    },
    {
      label: "Transferred",
      value: analyticsData?.callStatus?.transferred || 0,
      color: "#3b82f6"
    },
    {
      label: "Missed",
      value: analyticsData?.callStatus?.missed || 0,
      color: "#ef4444"
    }
  ];

  const sentDist = [
  {
    label: "Positive",
    value: analyticsData?.sentiment?.positive || 0,
    color: "#10b981"
  },
  {
    label: "Neutral",
    value: analyticsData?.sentiment?.neutral || 0,
    color: "#f59e0b"
  },
  {
    label: "Negative",
    value: analyticsData?.sentiment?.negative || 0,
    color: "#ef4444"
  },
  {
    label: "Unknown",
    value: analyticsData?.sentiment?.unknown || 0,
    color: "#6b7280"
  }
];
  
  
  const weeklyData = analyticsData?.weeklyData || [
    { day: "Mon", calls: 0 },
    { day: "Tue", calls: 0 },
    { day: "Wed", calls: 0 },
    { day: "Thu", calls: 0 },
    { day: "Fri", calls: 0 },
    { day: "Sat", calls: 0 },
    { day: "Sun", calls: 0 }
  ];

  const hourlyData = analyticsData?.hourlyData || [
    { hour: "8am", calls: 0 },
    { hour: "9am", calls: 0 },
    { hour: "10am", calls: 0 },
    { hour: "11am", calls: 0 },
    { hour: "12pm", calls: 0 },
    { hour: "1pm", calls: 0 },
    { hour: "2pm", calls: 0 },
    { hour: "3pm", calls: 0 },
    { hour: "4pm", calls: 0 },
    { hour: "5pm", calls: 0 }
  ];

  const kpiCards = [
    { label: "Total Calls", value: analyticsData?.totalCalls || 0, change: "0%", icon: "call", color: "#4E4439" },
    { label: "Answered Rate", value: `${analyticsData?.answeredRate || 0}%`, change: "0%", icon: "phone_in_talk", color: "#10b981" },
    { label: "Avg Duration", value: analyticsData?.avgDuration || "0s", change: "0s", icon: "timer", color: "#3b82f6" },
    { label: "Satisfaction", value: analyticsData?.satisfaction || "0/5", change: "0", icon: "star", color: "#f59e0b" }
  ];



if (isLoading) return <div style={{ padding: 24 }}>Loading analytics...</div>;
if (error) return <div style={{ padding: 24 }}>Failed to load analytics.</div>;

  return (
    <div style={{ padding: "24px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: "#1A1614", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Analytics</h1>
          <p style={{ fontSize: 12, color: "#8B7060", marginTop: 2 }}>Performance insights for your AI receptionist</p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["day", "week", "month"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ padding: "5px 14px", borderRadius: 5, border: `1px solid ${period === p ? Pr : "#e8e2d8"}`, background: period === p ? Pr : "#fff", color: period === p ? "#fff" : "#4E4439", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
  {kpiCards.map((k,i)=>(
    <motion.div key={k.label} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
      style={{ background:"#fff", border:"1px solid #e8e2d8", borderRadius:8, padding:"16px 18px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
        <span style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060" }}>{k.label}</span>
        <div style={{ width:28, height:28, borderRadius:6, background:`${k.color}15`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span className="material-symbols-outlined" style={{ fontSize:15, color:k.color }}>{k.icon}</span>
        </div>
      </div>
      <div style={{ fontSize:26, fontFamily:"Syne,sans-serif", fontWeight:800, color:"#1A1614", letterSpacing:"-0.02em", lineHeight:1.1 }}>{k.value}</div>
      {/* <div style={{ fontSize:10, color:"#10b981", fontFamily:"Syne,sans-serif", fontWeight:600, marginTop:4 }}>{analyticsData.periodChangePercent > 0 ? "↑" : "↓"}{" "}
{Math.abs(analyticsData?.periodChangePercent ?? 0)}%
vs {period}
</div> */}

<div
  style={{
    fontSize: 10,
    color:
      (analyticsData?.periodChangePercent ?? 0) >= 0
        ? "#10b981"
        : "#ef4444",
    fontFamily: "Syne,sans-serif",
    fontWeight: 600,
    marginTop: 4
  }}
>
  {(analyticsData?.periodChangePercent ?? 0) >= 0 ? "↑" : "↓"}{" "}
  {Math.abs(analyticsData?.periodChangePercent ?? 0)}%
  vs {analyticsData?.compareLabel || period}
</div>
    </motion.div>
  ))}
</div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614" }}>Call Volume</span>
            <div style={{ display: "flex", gap: 10 }}>
              {[["#8B6E3C", "Calls"], ["#10b981", "Booked"], ["#ef4444", "Missed"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} /><span style={{ fontSize: 10, color: "#8B7060" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <BarChart data={weeklyData} xKey="day" barKey="calls" color={Pr} height={200} />
        </motion.div>

        {[{ title: "Call Status", data: statusDist }, { title: "Sentiment", data: sentDist }].map((chart, ci) => (
          <motion.div key={chart.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 + ci * 0.06 }}
            style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614", marginBottom: 16 }}>{chart.title}</span>
            <DonutChart data={chart.data} />
            <div style={{ marginTop: 14, width: "100%" }}>
              {chart.data.map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: ci === 1 ? "50%" : 2, background: s.color }} /><span style={{ fontSize: 11, color: "#4E4439" }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#1A1614" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hourly + Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px" }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614", display: "block", marginBottom: 22 }}>Peak Call Hours (Today)</span>
          <BarChart data={hourlyData} xKey="hour" barKey="calls" color="#0097A7" height={250} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", padding: "20px" }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1614", display: "block", marginBottom: 14 }}>Key Metrics</span>
          {/* {[["Answer Rate", "97.2%", "1.8%"], ["First Call Resolution", "84%", "3%"], ["Avg Wait Time", "0s", "2s"], ["Transfer Rate", "8.1%", "1.2%", false], ["Booking Conversion", "63%", "5%"], ["Repeat Callers", "22%", "4%", false], ["NPS Score", "78", "6"]].map(([l, v, c, pos = true]) => ( */}
         
         {[
  ["Answer Rate", analyticsData?.keyMetrics?.answerRate || "0%", "0%"],
  ["First Call Resolution", analyticsData?.keyMetrics?.firstCallResolution || "0%", "0%"],
  ["Avg Wait Time", analyticsData?.keyMetrics?.avgWaitTime || "0s", "0s"],
  ["Transfer Rate", analyticsData?.keyMetrics?.transferRate || "0%", "0%", false],
  ["Booking Conversion", analyticsData?.keyMetrics?.bookingConversion || "0%", "0%"],
  ["Repeat Callers", analyticsData?.keyMetrics?.repeatCallers || "0%", "0%", false],
  ["NPS Score", analyticsData?.keyMetrics?.npsScore || 0, "0"]
].map(([l,v,c,pos=true]) => (
         
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f7f3ef" }}>
              <span style={{ fontSize: 12, color: "#4E4439" }}>{l}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontFamily: "Syne,sans-serif", fontWeight: 700, color: "#1A1614" }}>{v}</span>
                <span style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, color: pos ? "#10b981" : "#ef4444" }}>{pos ? "↑" : "↓"} {c}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
