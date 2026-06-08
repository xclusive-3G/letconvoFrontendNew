import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APPOINTMENTS } from "./data";

const Pr = "#8B6E3C";

const StatusBadge = ({ status }) => {
  const m = { confirmed:{bg:"#ecfdf5",color:"#10b981"}, pending:{bg:"#fffbeb",color:"#f59e0b"}, cancelled:{bg:"#fef2f2",color:"#ef4444"} };
  const s = m[status]||{bg:"#f3f4f6",color:"#6b7280"};
  return <span style={{ padding:"3px 9px", borderRadius:100, fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:700, background:s.bg, color:s.color, textTransform:"uppercase", letterSpacing:"0.08em" }}>{status}</span>;
};

function AppointmentCard({ appt, onClick }) {
  return (
    <motion.div whileHover={{ y:-2, boxShadow:"0 6px 20px rgba(139,110,60,0.10)" }}
      onClick={() => onClick(appt)}
      style={{ background:"#fff", border:"1px solid #e8e2d8", borderRadius:8, padding:"14px 16px", cursor:"pointer", transition:"border-color 0.15s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <div style={{ width:38, height:38, borderRadius:8, background:Pr, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span className="material-symbols-outlined" style={{ fontSize:18, color:"#fff" }}>person</span>
          </div>
          <div>
            <div style={{ fontSize:12, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#1A1614" }}>{appt.name}</div>
            <div style={{ fontSize:10, color:"#8B7060", marginTop:1 }}>{appt.phone}</div>
          </div>
        </div>
        <StatusBadge status={appt.status}/>
      </div>
      <div style={{ display:"flex", gap:12, marginTop:6 }}>
        {[["schedule",appt.time],["calendar_today",appt.date],["category",appt.type]].map(([ic,val])=>(
          <div key={ic} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <span className="material-symbols-outlined" style={{ fontSize:13, color:"#8B7060" }}>{ic}</span>
            <span style={{ fontSize:11, color:"#4E4439" }}>{val}</span>
          </div>
        ))}
      </div>
      {appt.notes && (
        <div style={{ marginTop:8, fontSize:11, color:"#8B7060", fontStyle:"italic", lineHeight:1.4, borderTop:"1px solid #f0ebe4", paddingTop:8 }}>"{appt.notes}"</div>
      )}
    </motion.div>
  );
}

function AppointmentDrawer({ appt, onClose }) {
  const [status, setStatus] = useState(appt.status);
  const [notes, setNotes] = useState(appt.notes||"");
  return (
    <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:0.28,ease:[0.16,1,0.3,1]}}
      style={{ position:"fixed", top:0, right:0, bottom:0, width:400, background:"#fff", borderLeft:"1px solid #e8e2d8", zIndex:200, display:"flex", flexDirection:"column", boxShadow:"-8px 0 32px rgba(0,0,0,0.1)" }}>
      <div style={{ padding:"16px 20px", borderBottom:"1px solid #f0ebe4", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, background:"#fdf9f5" }}>
        <div>
          <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:14, color:"#1A1614" }}>{appt.name}</div>
          <div style={{ fontSize:11, color:"#8B7060", marginTop:1 }}>{appt.type} · {appt.date} at {appt.time}</div>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}>
          <span className="material-symbols-outlined" style={{ fontSize:20, color:"#8B7060" }}>close</span>
        </button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ background:"#fdf9f5", borderRadius:8, border:"1px solid #f0ebe4", padding:"12px 14px" }}>
          <div style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060", marginBottom:8 }}>Contact Details</div>
          {[["call",appt.phone],["calendar_month",`${appt.date} at ${appt.time}`],["category",appt.type]].map(([icon,val])=>(
            <div key={icon} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span className="material-symbols-outlined" style={{ fontSize:14, color:Pr }}>{icon}</span>
              <span style={{ fontSize:12, color:"#4E4439" }}>{val}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060", marginBottom:8 }}>Appointment Status</div>
          <div style={{ display:"flex", gap:8 }}>
            {["confirmed","pending","cancelled"].map(s=>(
              <button key={s} onClick={()=>setStatus(s)}
                style={{ flex:1, padding:"8px", border:`1.5px solid ${status===s?Pr:"#e8e2d8"}`, background:status===s?`${Pr}12`:"#fff", borderRadius:6, fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:status===s?Pr:"#8B7060", cursor:"pointer" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060", marginBottom:8 }}>Notes</div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4} placeholder="Add notes about this appointment…"
            style={{ width:"100%", border:"1px solid #e8e2d8", borderRadius:6, padding:"10px 12px", fontSize:12, color:"#4E4439", fontFamily:"DM Sans,sans-serif", lineHeight:1.5, resize:"vertical", outline:"none" }}/>
        </div>
        <div>
          <div style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060", marginBottom:8 }}>Quick Actions</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["sms","Send Reminder SMS"],["mail","Send Email"],["call","Call Patient"],["edit_calendar","Reschedule"]].map(([ic,lbl])=>(
              <button key={lbl} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 12px", background:"#f7f2ec", border:"1px solid #e8e2d8", borderRadius:6, cursor:"pointer", fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:11, color:"#4E4439" }}>
                <span className="material-symbols-outlined" style={{ fontSize:14, color:Pr }}>{ic}</span>{lbl}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060", marginBottom:8 }}>Activity Timeline</div>
          {[["Appointment booked by AI","2 hours ago","event"],["SMS confirmation sent","2 hours ago","sms"],["Patient confirmed via SMS","1 hour ago","check_circle"]].map(([ev,t,ic],i)=>(
            <div key={i} style={{ display:"flex", gap:10, paddingBottom:10, position:"relative" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:`${Pr}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, zIndex:1 }}>
                  <span className="material-symbols-outlined" style={{ fontSize:13, color:Pr }}>{ic}</span>
                </div>
                {i<2&&<div style={{ width:1, flex:1, background:"#e8e2d8", marginTop:3 }}/>}
              </div>
              <div style={{ paddingTop:3 }}>
                <div style={{ fontSize:12, color:"#1A1614" }}>{ev}</div>
                <div style={{ fontSize:10, color:"#8B7060", marginTop:1 }}>{t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"14px 20px", borderTop:"1px solid #f0ebe4", display:"flex", gap:8, flexShrink:0 }}>
        <button onClick={onClose} style={{ flex:1, padding:"9px", background:Pr, color:"#fff", border:"none", borderRadius:5, cursor:"pointer", fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em" }}>Save Changes</button>
        <button onClick={onClose} style={{ padding:"9px 14px", background:"#f7f2ec", color:"#4E4439", border:"1px solid #e8e2d8", borderRadius:5, cursor:"pointer", fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:11 }}>Cancel</button>
      </div>
    </motion.div>
  );
}

export default function AppointmentsPage() {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("all");
  const dates = [...new Set(APPOINTMENTS.map(a=>a.date))];
  const filtered = APPOINTMENTS.filter(a=>filter==="all"||a.status===filter);

  return (
    <div style={{ padding:"24px", maxWidth:1400, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <h1 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:18, color:"#1A1614", textTransform:"uppercase", letterSpacing:"-0.01em" }}>Appointments</h1>
          <p style={{ fontSize:12, color:"#8B7060", marginTop:2 }}>{APPOINTMENTS.length} upcoming appointments booked by Luminous AI</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ display:"flex", background:"#fff", border:"1px solid #e8e2d8", borderRadius:6, overflow:"hidden" }}>
            {[["list","view_list"],["calendar","calendar_view_month"]].map(([v,ic])=>(
              <button key={v} onClick={()=>setView(v)} style={{ padding:"6px 12px", border:"none", cursor:"pointer", background:view===v?Pr:"transparent", display:"flex", alignItems:"center", gap:5, transition:"background 0.15s" }}>
                <span className="material-symbols-outlined" style={{ fontSize:15, color:view===v?"#fff":"#8B7060" }}>{ic}</span>
              </button>
            ))}
          </div>
          <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", background:Pr, color:"#fff", border:"none", borderRadius:5, cursor:"pointer", fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em" }}>
            <span className="material-symbols-outlined" style={{ fontSize:15 }}>add</span>New Appointment
          </button>
        </div>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
        {["all","confirmed","pending","cancelled"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            style={{ padding:"5px 14px", borderRadius:100, border:`1px solid ${filter===f?Pr:"#e8e2d8"}`, background:filter===f?Pr:"#fff", color:filter===f?"#fff":"#4E4439", fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", cursor:"pointer" }}>
            {f==="all"?`All (${APPOINTMENTS.length})`:`${f} (${APPOINTMENTS.filter(a=>a.status===f).length})`}
          </button>
        ))}
      </div>

      {view==="list" && dates.map(date=>{
        const group=filtered.filter(a=>a.date===date);
        if(!group.length) return null;
        return (
          <div key={date} style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:Pr }}>{date}</span>
              <div style={{ flex:1, height:1, background:"#f0ebe4" }}/>
              <span style={{ fontSize:10, color:"#8B7060" }}>{group.length} appointment{group.length>1?"s":""}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:10 }}>
              {group.map(a=><AppointmentCard key={a.id} appt={a} onClick={setSelected}/>)}
            </div>
          </div>
        );
      })}

      {view==="calendar" && (
        <div style={{ background:"#fff", border:"1px solid #e8e2d8", borderRadius:8, padding:"24px" }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:16, color:"#1A1614", textTransform:"uppercase" }}>May 2025</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:8 }}>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
              <div key={d} style={{ textAlign:"center", fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#8B7060", padding:"6px 0" }}>{d}</div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
            {Array.from({length:4},(_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:31},(_,i)=>{
              const day=i+1;
              const hasAppt=APPOINTMENTS.some(a=>a.date.includes(`${day} May`)||(day===1&&a.date==="Today")||(day===2&&a.date==="Tomorrow"));
              return (
                <div key={day} style={{ aspectRatio:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius:6, cursor:hasAppt?"pointer":"default", background:day===1?Pr:hasAppt?`${Pr}12`:"transparent", border:hasAppt&&day!==1?`1px solid ${Pr}30`:"1px solid transparent" }}>
                  <span style={{ fontSize:12, fontFamily:"Syne,sans-serif", fontWeight:day===1?800:500, color:day===1?"#fff":hasAppt?Pr:"#4E4439" }}>{day}</span>
                  {hasAppt&&day!==1&&<div style={{ width:4, height:4, borderRadius:"50%", background:Pr, marginTop:1 }}/>}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:20, borderTop:"1px solid #f0ebe4", paddingTop:16 }}>
            <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:"#8B7060", marginBottom:10 }}>Today's Schedule</div>
            {APPOINTMENTS.filter(a=>a.date==="Today").map(a=>(
              <div key={a.id} onClick={()=>setSelected(a)} style={{ display:"flex", gap:10, alignItems:"center", padding:"8px 12px", background:"#fdf9f5", borderRadius:6, border:"1px solid #f0ebe4", cursor:"pointer", marginBottom:6 }}>
                <div style={{ width:3, height:36, background:Pr, borderRadius:2, flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#1A1614" }}>{a.name}</div>
                  <div style={{ fontSize:10, color:"#8B7060" }}>{a.time} · {a.type}</div>
                </div>
                <StatusBadge status={a.status}/>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected&&(
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.25)", zIndex:150 }}/>
            <AppointmentDrawer appt={selected} onClose={()=>setSelected(null)}/>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
