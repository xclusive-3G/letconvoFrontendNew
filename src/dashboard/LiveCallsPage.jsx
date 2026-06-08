import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Pr = "#8B6E3C";

// const LIVE_CALLS_INIT = [
//   { id:"live1", caller:"Dr. Emeka Obi",     number:"+234 803 456 7890", duration:42,  status:"active",  intent:"Appointment booking",  sentiment:"positive", transcript:["Hello, I'd like to schedule an appointment please.","Of course! What date works best for you?","Thursday morning if possible.","Let me check availability for Thursday morning..."] },
//   { id:"live2", caller:"Unknown Caller",    number:"+234 905 112 3456", duration:18,  status:"active",  intent:"General inquiry",       sentiment:"neutral",  transcript:["Hi, I have a question about your services.","Absolutely, I'd be happy to help. What would you like to know?"] },
//   { id:"live3", caller:"Chidi Enterprises", number:"+234 812 345 6789", duration:125, status:"on-hold", intent:"Lead qualification",     sentiment:"positive", transcript:["We're a tech company looking for automation solutions.","That's great! Can I take some details?","Sure, we have about 50 staff and need a solution for..."] },
// ];




function LiveCallCard({ call, onSelect, selected }) {
  const [elapsed, setElapsed] = useState(call.duration);
  const [dots,    setDots]    = useState(".");
  useEffect(() => {
    const t1 = setInterval(()=>setElapsed(e=>e+1), 1000);
    const t2 = setInterval(()=>setDots(d=>d.length>=3?".":d+"."), 500);
    return ()=>{ clearInterval(t1); clearInterval(t2); };
  }, []);
  const fmt = s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const sc = call.status==="active"?"#10b981":"#f59e0b";
  const sentc = call.sentiment==="positive"?"#10b981":call.sentiment==="negative"?"#ef4444":"#f59e0b";
  return (
    <motion.div whileHover={{y:-2}} onClick={()=>onSelect(call)}
      style={{ background:selected?`${Pr}08`:"#fff", border:`1.5px solid ${selected?Pr:"#e8e2d8"}`, borderRadius:8, padding:"14px 16px", cursor:"pointer", transition:"all 0.15s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <div>
          <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:13, color:"#1A1614" }}>{call.caller}</div>
          <div style={{ fontSize:10, color:"#8B7060", marginTop:1 }}>{call.number}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 8px", borderRadius:100, background:`${sc}15` }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:sc, animation:call.status==="active"?"pulse 1.2s ease infinite":"none" }}/>
            <span style={{ fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:sc }}>{call.status}</span>
          </div>
          <span style={{ fontSize:12, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#4E4439" }}>{fmt(elapsed)}</span>
        </div>
      </div>
      <div style={{ fontSize:11, color:"#8B7060", marginBottom:6 }}><span style={{ fontWeight:600, color:Pr }}>Intent: </span>{call.intent}</div>
      <div style={{ background:"#fdf9f5", borderRadius:6, padding:"7px 10px", marginBottom:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:Pr, animation:"pulse 1s ease infinite" }}/>
          <span style={{ fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:Pr }}>Live transcript{dots}</span>
        </div>
        <div style={{ fontSize:11, color:"#4E4439", lineHeight:1.4 }}>"{call.transcript?.length ? call.transcript[call.transcript.length - 1] : 'Call in progress...'}"</div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:sentc }}/>
          <span style={{ fontSize:10, color:sentc, textTransform:"capitalize" }}>{call.sentiment}</span>
        </div>
        <button onClick={e=>{e.stopPropagation();}}
          style={{ padding:"3px 10px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:100, fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#ef4444", textTransform:"uppercase", letterSpacing:"0.08em", cursor:"pointer" }}>
          Transfer
        </button>
      </div>
    </motion.div>
  );
}

function LiveTranscriptPanel({ call }) {
  // const [messages, setMessages] = useState(call.transcript.map((t,i)=>({role:i%2===0?"caller":"ai",text:t})));
  const [messages, setMessages] = useState(
  Array.isArray(call.transcript) && call.transcript.length > 0
    ? call.transcript.map((t, i) => ({
        role: i % 2 === 0 ? "caller" : "ai",
        text: t
      }))
    : [{ role: "ai", text: "Live transcript will appear here..." }]
);
  const [typing,   setTyping]   = useState(false);
  const [input,    setInput]    = useState("");
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, typing]);

  // useEffect(()=>{
  //   const t = setTimeout(()=>{
  //     setTyping(true);
  //     setTimeout(()=>{
  //       const replies=["I've found an available slot on Thursday at 10:30 AM. Shall I confirm?","Your appointment has been booked. You'll receive an SMS shortly.","Is there anything else I can help you with?","Thank you for calling. Have a wonderful day!"];
  //       setMessages(p=>[...p,{role:"ai",text:replies[Math.floor(Math.random()*replies.length)]}]);
  //       setTyping(false);
  //     }, 2000);
  //   }, 4000);
  //   return ()=>clearTimeout(t);
  // }, [messages.length]);

  const send = ()=>{
    if(!input.trim()) return;
    setMessages(p=>[...p,{role:"caller",text:input}]);
    setInput("");
    setTyping(true);
    setTimeout(()=>{ setMessages(p=>[...p,{role:"ai",text:"Understood. Let me take care of that for you right away."}]); setTyping(false); }, 1500);
  };

  return (
    <div style={{ background:"#fff", borderRadius:8, border:"1px solid #e8e2d8", display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ padding:"14px 18px", borderBottom:"1px solid #f0ebe4", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:13, color:"#1A1614" }}>{call.caller}</div>
          <div style={{ fontSize:10, color:"#8B7060" }}>Live conversation · {call.number}</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[["pause","Hold","#fff3cd","#fde68a","#92400e"],["call_end","End","#fef2f2","#fecaca","#ef4444"],["call_made","Transfer",`${Pr}15`,`${Pr}40`,Pr]].map(([ic,lbl,bg,bd,c])=>(
            <button key={lbl} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", background:bg, border:`1px solid ${bd}`, borderRadius:5, cursor:"pointer", fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:10, color:c }}>
              <span className="material-symbols-outlined" style={{ fontSize:13 }}>{ic}</span>{lbl}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"14px 18px", display:"flex", flexDirection:"column", gap:8 }}>
        {messages.map((msg,i)=>(
          <motion.div key={i} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
            style={{ display:"flex", justifyContent:msg.role==="ai"?"flex-start":"flex-end" }}>
            <div style={{ maxWidth:"75%", padding:"8px 12px", lineHeight:1.5, borderRadius:msg.role==="ai"?"4px 12px 12px 4px":"12px 4px 4px 12px", background:msg.role==="ai"?"#fdf9f5":Pr, color:msg.role==="ai"?"#4E4439":"#fff", fontSize:12 }}>
              <div style={{ fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", opacity:0.6, marginBottom:3 }}>
                {msg.role==="ai"?"Luminous AI":call.caller}
              </div>
              {msg.text}
            </div>
          </motion.div>
        ))}
        <AnimatePresence>
          {typing&&(
            <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}} style={{ display:"flex", justifyContent:"flex-start" }}>
              <div style={{ background:"#fdf9f5", padding:"8px 14px", borderRadius:"4px 12px 12px 4px" }}>
                <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                  {[0,1,2].map(i=>(
                    <motion.div key={i} animate={{y:[0,-4,0]}} transition={{repeat:Infinity,duration:0.7,delay:i*0.15}}
                      style={{ width:6, height:6, borderRadius:"50%", background:Pr }}/>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef}/>
      </div>
      <div style={{ padding:"10px 16px", borderTop:"1px solid #f0ebe4", flexShrink:0 }}>
        <div style={{ fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060", marginBottom:6 }}>Whisper to AI (hidden from caller)</div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type instruction to guide the AI…"
            style={{ flex:1, border:"1px solid #e8e2d8", borderRadius:5, padding:"7px 12px", fontSize:12, color:"#1A1614", fontFamily:"DM Sans,sans-serif", outline:"none" }}/>
          <button onClick={send} style={{ padding:"7px 12px", background:Pr, color:"#fff", border:"none", borderRadius:5, cursor:"pointer" }}>
            <span className="material-symbols-outlined" style={{ fontSize:15 }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LiveCallsPage() {
  // const [liveCalls]   = useState(LIVE_CALLS_INIT);
  // const [selected, setSelected] = useState(LIVE_CALLS_INIT[0]);
  // const [liveCalls, setLiveCalls] = useState([]);
const [selected, setSelected] = useState(null);
  // const [queue, setQueue] = useState(1);
  const [queue, setQueue] = useState(0);
  
  const [showDialer, setShowDialer] = useState(false);
const [phoneNumber, setPhoneNumber] = useState("");
const [calling, setCalling] = useState(false);
const [liveCalls, setLiveCalls] = useState([]);


  useEffect(() => {
  fetchLiveCalls();

  const interval = setInterval(
    fetchLiveCalls,
    5000
  );

  return () => clearInterval(interval);
}, []);



  const startOutboundCall = async () => {
  try {
    setCalling(true);

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/calls/outbound",
      {
        to: phoneNumber
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("AI call started");
    setPhoneNumber("");
    setShowDialer(false);
  } catch (err) {
    alert(err.response?.data?.error || "Failed to start call");
  } finally {
    setCalling(false);
  }
};




const fetchLiveCalls = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/me/live-calls",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const calls = res.data.liveCalls || [];

    setLiveCalls(calls);

    // queue count from backend
    setQueue(res.data.queueCount || 0);

    setSelected((current) => {
      if (!current && calls.length > 0) {
        return calls[0];
      }

      const stillActive = calls.find(
        (c) => c.id === current?.id
      );

      return stillActive || calls[0] || null;
    });

  } catch (err) {
    console.log(
      "❌ Fetch live calls failed:",
      err.response?.data || err.message
    );
  }
};

  return (
    <div style={{ padding:"24px", maxWidth:1400, margin:"0 auto", height:"calc(100vh - 54px)", display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexShrink:0 }}>
        <div>
          <h1 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:18, color:"#1A1614", textTransform:"uppercase", letterSpacing:"-0.01em" }}>Live Calls</h1>
          <p style={{ fontSize:12, color:"#8B7060", marginTop:2 }}>Real-time AI call monitoring · {liveCalls.length} active · {queue} in queue</p>
        </div>
        <div
  style={{
    display:"flex",
    gap:10,
    alignItems:"center",
    position:"relative"
  }}
>
          <button
  onClick={() => setShowDialer(!showDialer)}
  style={{
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "none",
    background: "#8B6E3C",
    color: "#fff",
    cursor: "pointer"
  }}
>
  <span className="material-symbols-outlined">call</span>
</button>

  
  {showDialer && (
  <div
    style={{
      position: "absolute",
      top: 70,
      right: 24,
      width: 320,
      background: "#fff",
      border: "1px solid #e8e2d8",
      borderRadius: 10,
      padding: 16,
      zIndex: 9999,
      boxShadow: "0 10px 25px rgba(0,0,0,.12)"
    }}
  >
    <input
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      placeholder="+15551234567"
      style={{
        width: "100%",
        padding: 10,
        border: "1px solid #e8e2d8",
        borderRadius: 6,
        marginBottom: 10
      }}
    />

    <button
      onClick={startOutboundCall}
      disabled={calling || !phoneNumber}
      style={{
        padding: "9px 16px",
        background: "#8B6E3C",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
      }}
    >
      {calling ? "Calling..." : "Start AI Call"}
    </button>
  </div>
)}

          {queue>0&&(
            <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}
              style={{ padding:"5px 12px", background:"#fffbeb", border:"1px solid #fde68a", borderRadius:5, display:"flex", alignItems:"center", gap:6 }}>
              <span className="material-symbols-outlined" style={{ fontSize:14, color:"#f59e0b" }}>queue</span>
              <span style={{ fontSize:11, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#92400e" }}>{queue} caller waiting</span>
            </motion.div>
          )}
          <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:100 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", animation:"pulse 1.2s ease infinite" }}/>
            <span style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#10b981", textTransform:"uppercase", letterSpacing:"0.1em" }}>Live</span>
          </div>
        </div>
      </div>

      <div style={{ flex:1, display:"grid", gridTemplateColumns:"340px 1fr", gap:14, minHeight:0 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:10, overflowY:"auto" }}>
          {liveCalls.map(call=>(
            <LiveCallCard key={call.id} call={call} onSelect={setSelected} selected={selected?.id===call.id}/>
          ))}
          {queue>0&&(
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span className="material-symbols-outlined" style={{ fontSize:16, color:"#f59e0b" }}>queue</span>
                <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:12, color:"#92400e" }}>In Queue</span>
              </div>
              <div style={{ fontSize:11, color:"#78350f" }}>+234 812 999 0000 · Waiting 0:23</div>
              <button style={{ marginTop:8, padding:"4px 12px", background:"#f59e0b", color:"#fff", border:"none", borderRadius:5, cursor:"pointer", fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>Answer Now</button>
            </motion.div>
          )}
          <div style={{ background:"#1a1410", borderRadius:8, padding:"14px 16px", marginTop:4 }}>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:"#c4a97a", marginBottom:10 }}>AI Performance</div>
            {[["Calls Handled Today","38"],["Avg Response Time","< 1s"],["Escalation Rate","8%"],["Uptime","99.9%"]].map(([l,v])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)" }}>{l}</span>
                <span style={{ fontSize:11, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#c4a97a" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        {selected ? (
  <LiveTranscriptPanel key={selected.id} call={selected} />
) : (
  <div
    style={{
      background: "#fff",
      borderRadius: 8,
      border: "1px solid #e8e2d8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#8B7060",
      fontSize: 13
    }}
  >
    No active calls right now
  </div>
)}
      </div>
    </div>
  );
}
