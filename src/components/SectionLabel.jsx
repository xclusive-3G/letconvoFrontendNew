export default function SectionLabel({ children, center = false }) {
  return (
    <div className={`flex items-center gap-2 text-[9px] font-syne font-bold uppercase tracking-[.18em] text-[#8B6E3C]/65 mb-2 ${center ? "justify-center" : ""}`}>
      <div className="w-3.5 h-px bg-[#8B6E3C]/50 flex-shrink-0" />
      {children}
      {center && <div className="w-3.5 h-px bg-[#8B6E3C]/50 flex-shrink-0" />}
    </div>
  );
}
