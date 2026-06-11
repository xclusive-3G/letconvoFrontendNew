import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { id:"benefits", label:"Features" },
  { id:"pricing",  label:"Pricing"  },
  { id:"contact",  label:"Contact"  },
];

export default function Navbar({ page, setPage }) {
  const [solid, setSolid] = useState(false);
  const [open,  setOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = p => { setPage(p); setOpen(false); window.scrollTo({top:0}); };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-[#d4c8b8]/40 ${solid ? "bg-white/80 shadow-sm" : "bg-white backdrop-blur-md"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => go("benefits")}
          className="font-syne font-black text-[#d19836] tracking-[.12em] uppercase text-[13px] sm:text-[14px] hover:opacity-75 transition-opacity flex-shrink-0">
          letconvo
        </button>

        {/* Desktop centre nav */}
        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ id, label }) => (
            <button key={label} onClick={() => go(id)}
              className={`relative font-syne font-semibold text-[11.5px] uppercase tracking-[.08em] pb-0.5 transition-colors duration-200 ${
                page === id ? "text-[#d9951f]" : "text-[#4E4439]/60 hover:text-[#8B6E3C]"
              }`}>
              {label}
              {page === id && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#dbcaac] rounded-full" />}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => go("login")}
            className="font-syne font-semibold text-[11.5px] uppercase tracking-[.08em] text-[#4E4439]/55 hover:text-[#8B6E3C] transition-colors">
            Login
          </button>
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}
            onClick={() => go("getstarted")}
            className="bg-[#c4a775] text-white font-syne font-bold text-[11px] uppercase tracking-[.08em] px-4 py-2 rounded-sm hover:bg-[#6b5228] transition-colors">
            Get Started
          </motion.button>
        </div>

        {/* Mobile: Login link + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => go("login")}
            className="font-syne font-semibold text-[11px] uppercase tracking-[.08em] text-[#4E4439]/55 hover:text-[#8B6E3C] transition-colors">
            Login
          </button>
          <button className="p-1.5 text-[#8B6E3C]" onClick={() => setOpen(!open)} aria-label="Menu">
            <div className={`w-[18px] h-[1.5px] bg-current mb-[4px] transition-all origin-center ${open ? "rotate-45 translate-y-[5.5px]" : ""}`} />
            <div className={`w-[18px] h-[1.5px] bg-current transition-all origin-center ${open ? "-rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:.25, ease:[.16,1,.3,1] }}
            className="md:hidden bg-white border-t border-[#d4c8b8]/40 overflow-hidden shadow-md">
            <div className="px-5 py-5 flex flex-col gap-4">
              {NAV_LINKS.map(({ id, label }) => (
                <button key={label} onClick={() => go(id)}
                  className={`font-syne font-semibold text-[13px] uppercase tracking-wide text-left transition-colors ${page === id ? "text-[#8B6E3C]" : "text-[#1A1614]"}`}>
                  {label}
                </button>
              ))}
              <div className="h-px bg-[#f0ebe4]" />
              <button onClick={() => go("getstarted")}
                className="bg-[#8B6E3C] text-white font-syne font-bold text-[12px] uppercase tracking-wide px-5 py-3 rounded-sm w-full text-center">
                Get Started Free →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
