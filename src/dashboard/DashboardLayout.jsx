import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NOTIFICATIONS } from "./data";

const Pr = "#8B6E3C";
const NAV_ITEMS = [
  { id:"overview",     icon:"dashboard",               label:"Overview"          },
  { id:"calls",        icon:"call",                    label:"Call Records"      },
  { id:"appointments", icon:"calendar_month",          label:"Appointments"      },
  { id:"analytics",    icon:"bar_chart",               label:"Analytics"         },
  { id:"live",         icon:"sensors",                 label:"Live Calls"        },
  { id:"balance",      icon:"account_balance_wallet",  label:"Balance & Billing" },
  { id:"settings",     icon:"settings",                label:"Settings"          },
];

export default function DashboardLayout({ children, activePage, setActivePage, setAppPage }) {
  // const [sidebarOpen, setSidebarOpen] = useState(false); // default closed on mobile
  const [desktopOpen, setDesktopOpen] = useState(true);  // desktop sidebar state
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [mobileNav,   setMobileNav]   = useState(false); // mobile bottom sheet nav
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  // On desktop we use desktopOpen; we detect via CSS classes
  const navTo = (id) => { setActivePage(id); setMobileNav(false); };

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", fontFamily:"'DM Sans',sans-serif", background:"#f4f0eb" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <motion.aside
        animate={{ width: desktopOpen ? 220 : 64 }}
        transition={{ duration:0.28, ease:[0.16,1,0.3,1] }}
        className="dashboard-desktop-sidebar"
        style={{ height:"100%", flexShrink:0, background:"#1a1410", flexDirection:"column", overflow:"hidden", position:"relative", zIndex:20 }}
      >
        {/* Logo */}
        <div style={{ padding:"18px 16px 12px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:10, overflow:"hidden", flexShrink:0 }}>
          <div style={{ width:30, height:30, background:Pr, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ color:"#fff", fontSize:13, fontFamily:"Syne,sans-serif", fontWeight:900 }}>L</span>
          </div>
          <AnimatePresence>
            {desktopOpen && (
              <motion.span initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:0.2}}
                style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:12, color:Pr, letterSpacing:"0.1em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                Luminous AI
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, overflowY:"auto", overflowX:"hidden", padding:"10px 0" }}>
          {NAV_ITEMS.map(item => {
            const active = activePage === item.id;
            return (
              <motion.button key={item.id} whileHover={{x:2}} onClick={() => navTo(item.id)}
                style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"9px 16px", background:active?"rgba(139,110,60,0.18)":"transparent", border:"none", cursor:"pointer", borderLeft:active?`3px solid ${Pr}`:"3px solid transparent", transition:"background 0.15s", overflow:"hidden" }}>
                <span className="material-symbols-outlined" style={{ fontSize:18, color:active?Pr:"rgba(255,255,255,0.45)", flexShrink:0 }}>{item.icon}</span>
                <AnimatePresence>
                  {desktopOpen && (
                    <motion.span initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:0.18}}
                      style={{ fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:11, color:active?"#c4a97a":"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", padding:"8px 0" }}>
          <motion.button whileHover={{x:2}} onClick={() => setAppPage("benefits")}
            style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"9px 16px", background:"transparent", border:"none", cursor:"pointer", overflow:"hidden" }}>
            <span className="material-symbols-outlined" style={{ fontSize:17, color:"rgba(255,255,255,0.35)", flexShrink:0 }}>arrow_back</span>
            <AnimatePresence>
              {desktopOpen && (
                <motion.span initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  style={{ fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:11, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.06em", whiteSpace:"nowrap" }}>
                  Back to Site
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <button onClick={() => setDesktopOpen(!desktopOpen)}
            style={{ display:"flex", alignItems:"center", justifyContent:desktopOpen?"flex-end":"center", width:"100%", padding:"7px 16px", background:"transparent", border:"none", cursor:"pointer" }}>
            <span className="material-symbols-outlined" style={{ fontSize:15, color:"rgba(255,255,255,0.3)" }}>{desktopOpen?"chevron_left":"chevron_right"}</span>
          </button>
        </div>
      </motion.aside>

      {/* ── MAIN PANEL ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

        {/* Top bar */}
        <header style={{ height:52, flexShrink:0, background:"#fff", borderBottom:"1px solid #e8e2d8", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 12px 0 16px", gap:12 }}>
          {/* Mobile hamburger */}
          <button className="md:hidden flex items-center justify-center w-8 h-8 text-[#4E4439] flex-shrink-0"
            onClick={() => setMobileNav(true)}>
            <span className="material-symbols-outlined" style={{ fontSize:20 }}>menu</span>
          </button>

          {/* Search — hidden on very small, visible sm+ */}
          <div className="hidden sm:flex flex-1 items-center gap-2 bg-[#f7f2ec] rounded-md px-3 py-1.5 max-w-xs md:max-w-sm" style={{ minWidth:0 }}>
            <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize:15, color:Pr }}>search</span>
            <input placeholder="Search calls, appointments…"
              style={{ border:"none", background:"transparent", fontSize:12, color:"#1A1614", outline:"none", width:"100%", fontFamily:"DM Sans,sans-serif", minWidth:0 }} />
          </div>

          {/* Right cluster */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            {/* Balance chip — hidden on mobile */}
            <button onClick={() => navTo("balance")}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full cursor-pointer transition-all"
              style={{ background:"rgba(139,110,60,0.08)", border:"1px solid rgba(139,110,60,0.25)", fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, color:Pr }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(139,110,60,0.16)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(139,110,60,0.08)"}>
              <span className="material-symbols-outlined" style={{ fontSize:12, color:Pr }}>account_balance_wallet</span>
              <span>278 min</span>
              <span style={{ color:"rgba(139,110,60,0.45)", margin:"0 1px" }}>·</span>
              <span>$47.50</span>
            </button>

            {/* Live indicator — hidden on small mobile */}
            <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.25)" }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:"#10b981", animation:"pulse 1.5s ease infinite" }}/>
              <span style={{ fontSize:10, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#10b981", textTransform:"uppercase", letterSpacing:"0.08em" }}>Live</span>
            </div>

            {/* Notifications */}
            <div style={{ position:"relative" }}>
              <button onClick={() => setNotifOpen(!notifOpen)}
                style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                <span className="material-symbols-outlined" style={{ fontSize:20, color:"#4E4439" }}>notifications</span>
                {unread > 0 && <span style={{ position:"absolute", top:1, right:1, width:14, height:14, background:Pr, borderRadius:"50%", fontSize:8, color:"#fff", fontFamily:"Syne,sans-serif", fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{unread}</span>}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{opacity:0,y:-8,scale:0.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:0.96}} transition={{duration:0.2}}
                    style={{ position:"fixed", right:8, top:56, width:"min(320px, calc(100vw - 16px))", background:"#fff", border:"1px solid #e8e2d8", borderRadius:8, boxShadow:"0 12px 32px rgba(0,0,0,0.12)", zIndex:100, overflow:"hidden" }}>
                    <div style={{ padding:"11px 14px", borderBottom:"1px solid #f0ebe4", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", color:"#1A1614" }}>Notifications</span>
                      <span style={{ fontSize:10, color:Pr, fontWeight:600, cursor:"pointer" }} onClick={() => setNotifOpen(false)}>Mark all read</span>
                    </div>
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} style={{ padding:"9px 14px", borderBottom:"1px solid #f7f2ec", display:"flex", gap:9, alignItems:"flex-start", background:n.read?"transparent":"rgba(139,110,60,0.04)" }}>
                        <span className="material-symbols-outlined" style={{ fontSize:14, color:Pr, marginTop:1, flexShrink:0 }}>
                          {n.type==="call"?"call":n.type==="appointment"?"calendar_month":n.type==="lead"?"person_add":n.type==="transfer"?"call_made":"warning"}
                        </span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:11.5, color:"#1A1614", lineHeight:1.4 }}>{n.text}</div>
                          <div style={{ fontSize:10, color:Pr, marginTop:2 }}>{n.time}</div>
                        </div>
                        {!n.read && <div style={{ width:5, height:5, borderRadius:"50%", background:Pr, flexShrink:0, marginTop:5 }}/>}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <div style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer" }}>
              <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#8B6E3C,#0097A7)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ color:"#fff", fontSize:11, fontFamily:"Syne,sans-serif", fontWeight:700 }}>SA</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span style={{ fontSize:11, fontFamily:"Syne,sans-serif", fontWeight:700, color:"#1A1614", lineHeight:1.2 }}>Sarah A.</span>
                <span style={{ fontSize:9, color:Pr, fontFamily:"Syne,sans-serif", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.2}} style={{ minHeight:"100%" }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── MOBILE BOTTOM NAV ── */}
        <nav className="md:hidden flex items-center justify-around border-t border-[#e8e2d8] bg-white flex-shrink-0" style={{ height:56, paddingBottom:"env(safe-area-inset-bottom)" }}>
          {NAV_ITEMS.slice(0,5).map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => navTo(item.id)}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
                style={{ background:"none", border:"none", cursor:"pointer" }}>
                <span className="material-symbols-outlined" style={{ fontSize:19, color:active?Pr:"#9b8a7a" }}>{item.icon}</span>
                <span style={{ fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", color:active?Pr:"#9b8a7a" }}>
                  {item.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
          {/* More button */}
          <button onClick={() => setMobileNav(true)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            style={{ background:"none", border:"none", cursor:"pointer" }}>
            <span className="material-symbols-outlined" style={{ fontSize:19, color:"#9b8a7a" }}>more_horiz</span>
            <span style={{ fontSize:9, fontFamily:"Syne,sans-serif", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", color:"#9b8a7a" }}>More</span>
          </button>
        </nav>
      </div>

      {/* ── MOBILE SLIDE-OUT NAV SHEET ── */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setMobileNav(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-40"/>
            <motion.div initial={{x:"-100%"}} animate={{x:0}} exit={{x:"-100%"}} transition={{duration:0.28,ease:[0.16,1,0.3,1]}}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col"
              style={{ width:260, background:"#1a1410", paddingBottom:"env(safe-area-inset-bottom)" }}>
              {/* Header */}
              <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:30, height:30, background:Pr, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ color:"#fff", fontSize:13, fontFamily:"Syne,sans-serif", fontWeight:900 }}>L</span>
                  </div>
                  <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:12, color:Pr, letterSpacing:"0.1em", textTransform:"uppercase" }}>Luminous AI</span>
                </div>
                <button onClick={() => setMobileNav(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:20 }}>✕</button>
              </div>
              {/* All nav items */}
              <nav style={{ flex:1, overflowY:"auto", padding:"10px 0" }}>
                {NAV_ITEMS.map(item => {
                  const active = activePage === item.id;
                  return (
                    <button key={item.id} onClick={() => navTo(item.id)}
                      style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"11px 16px", background:active?"rgba(139,110,60,0.18)":"transparent", border:"none", cursor:"pointer", borderLeft:active?`3px solid ${Pr}`:"3px solid transparent" }}>
                      <span className="material-symbols-outlined" style={{ fontSize:18, color:active?Pr:"rgba(255,255,255,0.45)", flexShrink:0 }}>{item.icon}</span>
                      <span style={{ fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:12, color:active?"#c4a97a":"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
              {/* Balance chip in mobile nav */}
              <div style={{ padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                <button onClick={() => navTo("balance")}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:"rgba(139,110,60,0.12)", border:"1px solid rgba(139,110,60,0.25)", borderRadius:6, cursor:"pointer" }}>
                  <span className="material-symbols-outlined" style={{ fontSize:15, color:"#c4a97a" }}>account_balance_wallet</span>
                  <span style={{ fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:11, color:"#c4a97a" }}>278 min · $47.50</span>
                </button>
                <button onClick={() => setAppPage("benefits")}
                  style={{ marginTop:8, width:"100%", display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:"transparent", border:"none", cursor:"pointer" }}>
                  <span className="material-symbols-outlined" style={{ fontSize:16, color:"rgba(255,255,255,0.3)" }}>arrow_back</span>
                  <span style={{ fontFamily:"Syne,sans-serif", fontWeight:600, fontSize:11, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.06em" }}>Back to Site</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
