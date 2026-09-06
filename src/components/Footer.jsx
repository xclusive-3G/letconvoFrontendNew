import { PAGE_PATHS } from "../config/routes";

const SOLUTIONS = [
  { id: "ai-receptionist-for-small-business", label: "AI Receptionist for Small Business" },
  { id: "ai-receptionist-for-plumbers",       label: "AI Receptionist for Plumbers" },
  { id: "ai-receptionist-for-salons",         label: "AI Receptionist for Salons" },
  { id: "ai-receptionist-for-clinics",        label: "AI Receptionist for Clinics" },
  { id: "ai-receptionist-for-law-firms",      label: "AI Receptionist for Law Firms" },
  { id: "missed-call-lead-capture",           label: "Missed-Call Lead Capture" },
  { id: "ai-appointment-booking",             label: "AI Appointment Booking" },
];

export default function Footer({ setPage }) {
  const go = (id) => (event) => { event.preventDefault(); setPage(id); };

  return (
    <footer className="relative z-10 bg-white border-t border-[#d4c8b8]/40 pt-9 sm:pt-11 pb-7 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pb-8 sm:pb-9 border-b border-[#d4c8b8]/40 text-center sm:text-left">
          <div>
            <div className="font-syne font-black text-[#8B6E3C] tracking-[.1em] uppercase text-[13px]">Letconvo AI</div>
            <p className="text-[11px] text-[#4E4439]/50 mt-2 max-w-[220px] mx-auto sm:mx-0 leading-relaxed">
              AI receptionist for small businesses — answer every call, capture missed-call leads, and book appointments 24/7.
            </p>
          </div>
          <nav aria-label="Solutions">
            <div className="font-syne font-bold uppercase tracking-[.12em] text-[#1A1614] text-[10px] mb-3">Solutions</div>
            <ul className="flex flex-col gap-2">
              {SOLUTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a href={PAGE_PATHS[id]} onClick={go(id)}
                    className="text-[11.5px] text-[#4E4439]/60 hover:text-[#8B6E3C] transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <div className="font-syne font-bold uppercase tracking-[.12em] text-[#1A1614] text-[10px] mb-3">Company</div>
            <ul className="flex flex-col gap-2">
              <li><a href={PAGE_PATHS.blog} onClick={go("blog")} className="text-[11.5px] text-[#4E4439]/60 hover:text-[#8B6E3C] transition-colors">Blog</a></li>
              <li><a href={PAGE_PATHS.contact} onClick={go("contact")} className="text-[11.5px] text-[#4E4439]/60 hover:text-[#8B6E3C] transition-colors">Contact</a></li>
              <li><a href={PAGE_PATHS.terms} onClick={go("terms")} className="text-[11.5px] text-[#4E4439]/60 hover:text-[#8B6E3C] transition-colors">Terms</a></li>
              <li><a href={PAGE_PATHS.privacy} onClick={go("privacy")} className="text-[11.5px] text-[#4E4439]/60 hover:text-[#8B6E3C] transition-colors">Privacy</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 pt-5">
          <div className="text-[11px] text-[#4E4439]/50">© 2025 Letconvo AI. Excellence in reception automation.</div>
          <div className="flex gap-2">
            {["share", "hub"].map(ic => (
              <div key={ic} className="w-8 h-8 rounded-sm border border-[#d4c8b8]/60 flex items-center justify-center text-[#4E4439]/50 hover:bg-[#8B6E3C] hover:text-white hover:border-[#8B6E3C] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[13px]">{ic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
