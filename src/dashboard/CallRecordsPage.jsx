import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCalls } from "../api/dashboardApi";
import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";

const Pr = "#8B6E3C";

// const normalizeStatus = (status) => {
//   const s = String(status || "").toLowerCase();

//   if (["completed", "ended", "call_ended", "success"].includes(s)) return "completed";
//   if (["failed", "dial_failed", "error"].includes(s)) return "failed";
//   if (["missed", "dial_no_answer", "no_answer", "dial_busy"].includes(s)) return "missed";
//   if (["transferred", "call_transfer"].includes(s)) return "transferred";

//   return s || "completed";
// };

// const formatDuration = (ms) => {
//   const sec = Math.ceil(Number(ms || 0) / 1000);
//   if (sec < 60) return `${sec}s`;
//   return `${Math.floor(sec / 60)}m ${sec % 60}s`;
// };

// const mapBackendCall = (c) => ({
//   id: c.id,
//   caller: c.caller_phone || "Unknown caller",
//   number: c.caller_phone || "-",
//   duration: formatDuration(c.duration_ms),
//   status: normalizeStatus(c.call_status || c.disconnection_reason),
//   sentiment: c.sentiment || "neutral",
//   recording: Boolean(c.recording_url),
//   recording_url: c.recording_url,

//   transcript:
//     c.call_summary ||
//     c.transcript ||
//     "No transcript available yet.",

//   transcript_object: Array.isArray(c.transcript_object)
//     ? c.transcript_object
//     : [],

//   tags: [
//     c.direction || "call",
//     c.credits_deducted ? `${c.credits_deducted}-credits` : "no-credits"
//   ],

//   time: c.created_at ? new Date(c.created_at).toLocaleString() : "-",
//   raw: c
// });


const StatusBadge = ({ status }) => {
  const m = { completed: { bg: "#ecfdf5", color: "#10b981" }, missed: { bg: "#fef2f2", color: "#ef4444" }, transferred: { bg: "#eff6ff", color: "#3b82f6" } };
  const s = m[status] || { bg: "#f3f4f6", color: "#6b7280" };
  return <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, background: s.bg, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{status}</span>;
};


function AudioPlayer({ caller, recordingUrl }) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("0:00");

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${String(sec).padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    if (!audioRef.current || !recordingUrl) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (err) {
      console.log("❌ Audio play failed:", err.message);
    }
  };

  const reset = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setPlaying(false);
    setProgress(0);
    setTime("0:00");
  };

  const seekAudio = (e) => {
    if (!audioRef.current) return;

    const value = Number(e.target.value);
    const duration = audioRef.current.duration || 0;

    audioRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };


  return (
    <div style={{ background: "#fdf9f5", border: "1px solid #e8e2d8", borderRadius: 8, padding: "12px 16px" }}>
      <audio
        ref={audioRef}
        src={recordingUrl}
        preload="metadata"
        onTimeUpdate={(e) => {
          const current = e.target.currentTime;
          const duration = e.target.duration || 1;

          setTime(formatTime(current));
          setProgress((current / duration) * 100);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(100);
        }}
      />

      <div style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 8 }}>
        Call Recording — {caller}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={togglePlay}
          style={{ width: 34, height: 34, borderRadius: "50%", background: Pr, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#fff", fontVariationSettings: "'FILL' 1" }}>
            {playing ? "pause" : "play_arrow"}
          </span>
        </button>

        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 1.5, height: 28, overflow: "hidden" }}>
            {Array.from({ length: 60 }, (_, i) => {
              const h = 4 + Math.abs(Math.sin(i * 0.7) * 20) + Math.abs(Math.cos(i * 1.3) * 8);
              return (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: h,
                    borderRadius: 1.5,
                    flexShrink: 0,
                    background: (i / 60) * 100 <= progress ? Pr : "#e8e2d8",
                    transition: "background 0.2s"
                  }}
                />
              );
            })}
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={seekAudio}
            style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer" }}
          />
        </div>

        <span style={{ fontSize: 11, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#4E4439", minWidth: 36 }}>
          {time}
        </span>

        <button onClick={reset} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: "#8B7060" }}>replay</span>
        </button>

        <a
          href={recordingUrl}
          download
          target="_blank"
          rel="noreferrer"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: "#8B7060" }}>download</span>
        </a>
      </div>
    </div>
  );
}


function CallDrawer({ call, onClose }) {
  return (
    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 480, background: "#fff", borderLeft: "1px solid #e8e2d8", zIndex: 200, display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.1)" }}>
      <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0ebe4", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 14, color: "#1A1614" }}>{call.caller}</div>
          <div style={{ fontSize: 11, color: "#8B7060", marginTop: 2 }}>{call.number} · {call.time}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#8B7060" }}>close</span>
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <StatusBadge status={call.status} />
          <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, background: call.sentiment === "positive" ? "#ecfdf5" : call.sentiment === "negative" ? "#fef2f2" : "#fffbeb", color: call.sentiment === "positive" ? "#10b981" : call.sentiment === "negative" ? "#ef4444" : "#f59e0b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{call.sentiment}</span>
          <span style={{ padding: "2px 8px", borderRadius: 100, fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, background: "#f3f4f6", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>⏱ {call.duration}</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {call.tags.map(t => <span key={t} style={{ padding: "3px 9px", borderRadius: 4, fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 600, background: "rgba(139,110,60,0.08)", color: Pr }}>#{t}</span>)}
        </div>
        {call.recording
          ? <AudioPlayer caller={call.caller}
            recordingUrl={call.recording_url}
          />
          : <div style={{ background: "#f7f2ec", borderRadius: 8, padding: "14px 16px", textAlign: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#c4a97a", display: "block", marginBottom: 4 }}>mic_off</span>
            <div style={{ fontSize: 11, color: "#8B7060" }}>No recording available for this call</div>
          </div>
        }
        <div>
          {/* <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 8 }}>AI Transcript Summary</div> */}
          {/* <div style={{ background: "#fdf9f5", borderRadius: 8, border: "1px solid #f0ebe4", padding: "12px 14px" }}> */}
          {/* <p style={{ fontSize:12, color:"#4E4439", lineHeight:1.65 }}>{call.transcript}</p> */}
          {/* </div> */}
        </div>
        <div>
          <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7060", marginBottom: 8 }}>Conversation Log</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* {[
              {role:"ai",text:"Thank you for calling. How can I assist you today?"},
              {role:"caller",text:call.transcript.split(".")[0]+"."},
              {role:"ai",text:"Absolutely, I can help with that. Let me check for you."},
              {role:"caller",text:"That would be great, thank you."},
              {role:"ai",text:"I've confirmed your request. You'll receive an SMS confirmation shortly. Is there anything else?"},
              {role:"caller",text:"No, that's perfect. Thank you!"},
              {role:"ai",text:"My pleasure! Have a wonderful day. Goodbye."},
            ].map((msg,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:msg.role==="ai"?"flex-start":"flex-end" }}>
                <div style={{ maxWidth:"80%", padding:"8px 12px", borderRadius:msg.role==="ai"?"4px 12px 12px 4px":"12px 4px 4px 12px", background:msg.role==="ai"?"#f7f2ec":Pr, color:msg.role==="ai"?"#4E4439":"#fff", fontSize:11.5, lineHeight:1.5 }}>
                  <div style={{ fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", opacity:0.6, marginBottom:3 }}>{msg.role==="ai"?"Letconvo AI":call.caller}</div>
                  {msg.text}
                </div>
              </div>
            ))} */}
            {(
              call.transcript_object?.length > 0
                ? call.transcript_object.map((msg) => ({
                  role:
                    msg.role === "agent" ||
                      msg.role === "assistant" ||
                      msg.role === "ai"
                      ? "ai"
                      : "caller",
                  text: msg.content || msg.text || msg.message || ""
                }))
                : call.raw?.transcript
                  ? call.raw.transcript
                    .split(/(?=Agent:|User:)/g)
                    .filter(Boolean)
                    .map((line) => ({
                      role: line.startsWith("Agent:") ? "ai" : "caller",
                      text: line.replace("Agent:", "").replace("User:", "").trim()
                    }))
                  : [
                    {
                      role: "ai",
                      text: "No conversation log available yet."
                    }
                  ]
            ).map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "ai" ? "flex-start" : "flex-end" }}>
                <div style={{ maxWidth: "80%", padding: "8px 12px", borderRadius: msg.role === "ai" ? "4px 12px 12px 4px" : "12px 4px 4px 12px", background: msg.role === "ai" ? "#f7f2ec" : Pr, color: msg.role === "ai" ? "#4E4439" : "#fff", fontSize: 11.5, lineHeight: 1.5 }}>
                  <div style={{ fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: 3 }}>
                    {msg.role === "ai" ? "Letconvo AI" : call.caller}
                  </div>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
          <button style={{ flex: 1, padding: "8px", background: Pr, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Schedule Follow-up</button>
          <button style={{ flex: 1, padding: "8px", background: "#f7f2ec", color: "#4E4439", border: "1px solid #e8e2d8", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Add to CRM</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CallRecordsPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSent, setFilterSent] = useState("all");
  // const [calls, setCalls] = useState([]);

  // const [showDialer, setShowDialer] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [calling, setCalling] = useState(false);


  const {
    data: calls = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["calls"],
    queryFn: fetchCalls,

    staleTime: 30000,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });

  


  // const startOutboundCall = async () => {
  //   try {
  //     setCalling(true);

  //     const token = localStorage.getItem("token");

  //     await axios.post(
  //       "http://localhost:5000/api/calls/outbound",
  //       { to: phoneNumber },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );

  //     alert("AI call started");
  //     setPhoneNumber("");
  //     setShowDialer(false);
  //     refetch?.();
  //   } catch (err) {
  //     alert(err.response?.data?.error || "Failed to start call");
  //   } finally {
  //     setCalling(false);
  //   }
  // };


  const filtered = calls.filter((c) => {
    const caller = String(c.caller || "Unknown caller").toLowerCase();
    const number = String(c.number || "").toLowerCase();
    const tags = Array.isArray(c.tags) ? c.tags : [];

    const matchesSearch =
      caller.includes(search.toLowerCase()) ||
      number.includes(search.toLowerCase()) ||
      tags.some((t) => String(t).toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      filterStatus === "all" || c.status === filterStatus;

    const matchesSentiment =
      filterSent === "all" || c.sentiment === filterSent;

    return matchesSearch && matchesStatus && matchesSentiment;
  });

  const exportCSV = () => {
    const rows = calls.map((c) => ({
      caller: c.caller,
      number: c.number,
      duration: c.duration,
      status: c.status,
      sentiment: c.sentiment,
      recording: c.recording_url || "",
      time: c.time
    }));

    const csv = [
      Object.keys(rows[0] || {}).join(","),
      ...rows.map((row) =>
        Object.values(row)
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "call-records.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div style={{ padding: 24 }}>
        Loading call records...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        Failed to load call records
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: "#1A1614", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Call Records</h1>
          <p style={{ fontSize: 12, color: "#8B7060", marginTop: 2 }}>{calls.length} calls recorded · Click any row to listen & view details</p>
        </div>
        {/* <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: Pr, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>download</span> Export CSV
        </button> */}

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>

          {/* <button
            onClick={() => setShowDialer(!showDialer)}
            style={{
              padding: "8px 14px",
              background: "#8B6E3C",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "Syne,sans-serif",
              fontWeight: 700,
              fontSize: 11
            }}
          >
            📞 Dial
          </button> */}

          <button
            onClick={() => refetch()}
            style={{
              padding: "7px 14px",
              background: "#f7f2ec",
              color: "#4E4439",
              border: "1px solid #e8e2d8",
              borderRadius: 5,
              cursor: "pointer",
              fontFamily: "Syne,sans-serif",
              fontWeight: 700,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}
          >
            Refresh
          </button>

          <button
            onClick={exportCSV}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: Pr, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
              download
            </span>
            Export CSV
          </button>
        </div>



      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e8e2d8", borderRadius: 6, padding: "6px 12px", flex: 1, maxWidth: 280 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: Pr }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search calls or tags…"
            style={{ border: "none", background: "transparent", fontSize: 12, color: "#1A1614", outline: "none", width: "100%", fontFamily: "DM Sans,sans-serif" }} />
        </div>
        {["all", "completed", "missed", "transferred"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            style={{ padding: "5px 12px", borderRadius: 5, border: `1px solid ${filterStatus === s ? Pr : "#e8e2d8"}`, background: filterStatus === s ? Pr : "#fff", color: filterStatus === s ? "#fff" : "#4E4439", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer" }}>
            {s === "all" ? "All Status" : s}
          </button>
        ))}
        {["all", "positive", "neutral", "negative"].map(s => (
          <button key={s} onClick={() => setFilterSent(s)}
            style={{ padding: "5px 12px", borderRadius: 5, border: `1px solid ${filterSent === s ? "#0097A7" : "#e8e2d8"}`, background: filterSent === s ? "#0097A7" : "#fff", color: filterSent === s ? "#fff" : "#4E4439", fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer" }}>
            {s === "all" ? "All Sentiment" : s}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#8B7060" }}>{filtered.length} results</span>
      </div>
      <AnimatePresence>
        {/* {showDialer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDialer(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.25)",
                zIndex: 180
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 420,
                background: "#fff",
                border: "1px solid #e8e2d8",
                borderRadius: 14,
                padding: 22,
                zIndex: 190,
                boxShadow: "0 24px 70px rgba(0,0,0,0.18)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                <div>
                  <h3 style={{ margin: 0, fontFamily: "Syne,sans-serif", fontSize: 15 }}>
                    Start AI Call
                  </h3>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8B7060" }}>
                    Bella will call this number and handle the conversation.
                  </p>
                </div>

                <button
                  onClick={() => setShowDialer(false)}
                  style={{
                    border: "none",
                    background: "#f7f2ec",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    cursor: "pointer"
                  }}
                >
                  ×
                </button>
              </div>

              <label
                style={{
                  fontSize: 10,
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 700,
                  color: "#8B7060",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                }}
              >
                Phone Number
              </label>

              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+15551234567"
                autoFocus
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #e8e2d8",
                  borderRadius: 8,
                  marginTop: 8,
                  marginBottom: 14,
                  outline: "none",
                  fontSize: 14
                }}
              />

              <button
                onClick={startOutboundCall}
                disabled={calling || !phoneNumber}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: calling || !phoneNumber ? "#c4a97a" : Pr,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: calling || !phoneNumber ? "not-allowed" : "pointer",
                  fontFamily: "Syne,sans-serif",
                  fontWeight: 800,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                }}
              >
                {calling ? "Starting Call..." : "Start AI Call"}
              </button>
            </motion.div>
          </>
        )} */}
      </AnimatePresence>      <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e2d8", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fdf9f5", borderBottom: "2px solid #f0ebe4" }}>
              {["Caller & Number", "Duration", "Status", "Sentiment", "Recording", "Tags", "Time", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8B7060", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <motion.tr key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.3 }}
                onClick={() => setSelected(c)} style={{ borderBottom: "1px solid #f7f3ef", cursor: "pointer", transition: "background 0.12s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fdf9f5"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ fontSize: 12, fontFamily: "Syne,sans-serif", fontWeight: 600, color: "#1A1614" }}>{c.caller}</div>
                  <div style={{ fontSize: 10, color: "#8B7060" }}>{c.number}</div>
                </td>
                <td style={{ padding: "10px 16px", fontSize: 12, color: "#4E4439", fontFamily: "Syne,sans-serif", fontWeight: 600 }}>{c.duration}</td>
                <td style={{ padding: "10px 16px" }}><StatusBadge status={c.status} /></td>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.sentiment === "positive" ? "#10b981" : c.sentiment === "negative" ? "#ef4444" : "#f59e0b" }} />
                    <span style={{ fontSize: 11, color: "#4E4439", textTransform: "capitalize" }}>{c.sentiment}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 16px" }}>
                  {c.recording
                    ? <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 15, color: Pr, fontVariationSettings: "'FILL' 1" }}>mic</span><span style={{ fontSize: 10, color: Pr, fontFamily: "Syne,sans-serif", fontWeight: 600 }}>Available</span></div>
                    : <span style={{ fontSize: 10, color: "#c4a97a" }}>—</span>
                  }
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {c.tags.slice(0, 2).map(t => <span key={t} style={{ padding: "2px 6px", borderRadius: 3, fontSize: 9, fontFamily: "Syne,sans-serif", fontWeight: 600, background: "rgba(139,110,60,0.07)", color: Pr }}>#{t}</span>)}
                  </div>
                </td>
                <td style={{ padding: "10px 16px", fontSize: 11, color: "#8B7060", whiteSpace: "nowrap" }}>{c.time}</td>
                <td style={{ padding: "10px 16px" }}><span className="material-symbols-outlined" style={{ fontSize: 16, color: "#c4a97a" }}>chevron_right</span></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: "40px", textAlign: "center", color: "#8B7060", fontSize: 13 }}>No calls match your filters.</div>}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 150 }} />
            <CallDrawer call={selected} onClose={() => setSelected(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
