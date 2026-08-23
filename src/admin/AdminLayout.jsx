import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Pr = "#8B6E3C";

const NAV_ITEMS = [
  { id: "overview",  icon: "dashboard",       label: "Overview"  },
  { id: "companies", icon: "domain",          label: "Companies" },
  { id: "messages",  icon: "mail",            label: "Messages"  },
];

export default function AdminLayout({ children, activePage, setActivePage, setAppPage, logoutUser, unreadMessages = 0 }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const navTo = (id) => { setActivePage(id); setMobileNav(false); };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans',sans-serif", background: "#f4f0eb" }}>

      {/* ── DESKTOP SIDEBAR ── */}
      <motion.aside
        animate={{ width: desktopOpen ? 220 : 64 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="dashboard-desktop-sidebar"
        style={{ height: "100%", flexShrink: 0, background: "#1a1410", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 20 }}
      >
        <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10, overflow: "hidden", flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, background: Pr, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontSize: 13, fontFamily: "Syne,sans-serif", fontWeight: 900 }}>L</span>
          </div>
          <AnimatePresence>
            {desktopOpen && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}
                style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 12, color: Pr, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Admin Panel
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "10px 0" }}>
          {NAV_ITEMS.map(item => {
            const active = activePage === item.id;
            const badge = item.id === "messages" ? unreadMessages : 0;
            return (
              <motion.button key={item.id} whileHover={{ x: 2 }} onClick={() => navTo(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "9px 16px", background: active ? "rgba(139,110,60,0.18)" : "transparent", border: "none", cursor: "pointer", borderLeft: active ? `3px solid ${Pr}` : "3px solid transparent", transition: "background 0.15s", overflow: "hidden" }}>
                <span style={{ position: "relative", flexShrink: 0, display: "flex" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: active ? Pr : "rgba(255,255,255,0.45)" }}>{item.icon}</span>
                  {badge > 0 && (
                    <span style={{ position: "absolute", top: -3, right: -5, minWidth: 14, height: 14, padding: "0 3px", borderRadius: 100, background: "#ef4444", color: "#fff", fontSize: 8, fontFamily: "Syne,sans-serif", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                      {badge > 9 ? "9+" : badge}
                    </span>
                  )}
                </span>
                <AnimatePresence>
                  {desktopOpen && (
                    <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }}
                      style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 11, color: active ? "#c4a97a" : "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
                      {item.label}
                      {badge > 0 && (
                        <span style={{ minWidth: 15, height: 15, padding: "0 4px", borderRadius: 100, background: "#ef4444", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                          {badge > 9 ? "9+" : badge}
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "8px 0" }}>
          <motion.button whileHover={{ x: 2 }} onClick={() => setAppPage("dashboard")}
            style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "9px 16px", background: "transparent", border: "none", cursor: "pointer", overflow: "hidden" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 17, color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>arrow_back</span>
            <AnimatePresence>
              {desktopOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                  Back to Dashboard
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button whileHover={{ x: 2 }} onClick={logoutUser}
            style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "9px 16px", background: "transparent", border: "none", cursor: "pointer", overflow: "hidden" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 17, color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>logout</span>
            <AnimatePresence>
              {desktopOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <button onClick={() => setDesktopOpen(!desktopOpen)}
            style={{ display: "flex", alignItems: "center", justifyContent: desktopOpen ? "flex-end" : "center", width: "100%", padding: "7px 16px", background: "transparent", border: "none", cursor: "pointer" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15, color: "rgba(255,255,255,0.3)" }}>{desktopOpen ? "chevron_left" : "chevron_right"}</span>
          </button>
        </div>
      </motion.aside>

      {/* ── MAIN PANEL ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <header style={{ height: 52, flexShrink: 0, background: "#fff", borderBottom: "1px solid #e8e2d8", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
          <button className="md:hidden flex items-center justify-center w-8 h-8 text-[#4E4439] flex-shrink-0"
            onClick={() => setMobileNav(true)}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>menu</span>
          </button>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 12, color: "#1A1614", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {NAV_ITEMS.find(n => n.id === activePage)?.label || "Admin"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(139,110,60,0.08)", border: `1px solid rgba(139,110,60,0.25)`, borderRadius: 100 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 13, color: Pr }}>admin_panel_settings</span>
            <span style={{ fontSize: 10, fontFamily: "Syne,sans-serif", fontWeight: 700, color: Pr, textTransform: "uppercase", letterSpacing: "0.08em" }}>Admin</span>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} style={{ minHeight: "100%" }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── MOBILE SLIDE-OUT NAV SHEET ── */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileNav(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-40" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col"
              style={{ width: 260, background: "#1a1410", paddingBottom: "env(safe-area-inset-bottom)" }}>
              <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 12, color: Pr, letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Panel</span>
                <button onClick={() => setMobileNav(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 20 }}>✕</button>
              </div>
              <nav style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
                {NAV_ITEMS.map(item => {
                  const active = activePage === item.id;
                  const badge = item.id === "messages" ? unreadMessages : 0;
                  return (
                    <button key={item.id} onClick={() => navTo(item.id)}
                      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "11px 16px", background: active ? "rgba(139,110,60,0.18)" : "transparent", border: "none", cursor: "pointer", borderLeft: active ? `3px solid ${Pr}` : "3px solid transparent" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: active ? Pr : "rgba(255,255,255,0.45)", flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 12, color: active ? "#c4a97a" : "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 6 }}>
                        {item.label}
                        {badge > 0 && (
                          <span style={{ minWidth: 15, height: 15, padding: "0 4px", borderRadius: 100, background: "#ef4444", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                            {badge > 9 ? "9+" : badge}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </nav>
              <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <button onClick={() => setAppPage("dashboard")}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "transparent", border: "none", cursor: "pointer" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }}>arrow_back</span>
                  <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Back to Dashboard</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
