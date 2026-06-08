export default function Footer({ setPage }) {
  return (
    <footer className="relative z-10 bg-white border-t border-[#d4c8b8]/40 py-7 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 sm:gap-5">
        <div className="text-center sm:text-left">
          <div className="font-syne font-black text-[#8B6E3C] tracking-[.1em] uppercase text-[13px]">Luminous AI</div>
          <div className="text-[11px] text-[#4E4439]/50 mt-0.5">© 2025 Luminous AI. Excellence in reception automation.</div>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {["Compliance","Terms","Integration","Support"].map(l=>(
            <a key={l} className="text-[11.5px] text-[#4E4439]/50 hover:text-[#8B6E3C] transition-colors cursor-pointer">{l}</a>
          ))}
        </nav>
        <div className="flex gap-2">
          {["share","hub"].map(ic=>(
            <div key={ic} className="w-8 h-8 rounded-sm border border-[#d4c8b8]/60 flex items-center justify-center text-[#4E4439]/50 hover:bg-[#8B6E3C] hover:text-white hover:border-[#8B6E3C] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[13px]">{ic}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
