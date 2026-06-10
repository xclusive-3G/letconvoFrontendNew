import { motion } from "framer-motion";
import PageHero  from "../components/PageHero";
import Reveal    from "../components/Reveal";
import Counter   from "../components/Counter";
import Footer    from "../components/Footer";

// const Pr = "#8B6E3C";

const BENEFITS = [
  { icon:"contact_emergency", title:"Maximize Revenue",   desc:"No more voicemails. Every caller speaks to a polished AI ready to qualify and convert." },
  { icon:"calendar_month",    title:"Automated Booking",  desc:"Direct integration with your calendar allows the AI to manage schedules autonomously." },
  { icon:"phone_disabled",    title:"Eternal Uptime",     desc:"24/7/365 availability. Luminous maintains your professional image round the clock." },
  { icon:"payments",          title:"Optimized Overhead", desc:"Drastically reduce staffing costs while increasing output and response times." },
];

const STATS = [
  { val:35,   suf:"%",  lbl:"Avg. booking increase" },
  { val:80,   suf:"%",  lbl:"Cost savings vs. staff" },
  { val:4.8,  suf:"/5", lbl:"Customer satisfaction"  },
  { val:99.9, suf:"%",  lbl:"System uptime"           },
];

const TESTS = [
  { q:"Within 2 weeks, our missed call rate dropped to zero and bookings were up 42%. Luminous paid for itself on day one.", name:"Dr. Sarah Okonkwo", role:"Medical Director, Apex Health",  grad:"from-amber-600 to-cyan-600" },
  { q:"The ROI was immediate. My receptionist now focuses on in-office experience while Luminous handles every inbound call.", name:"Marcus Adebayo",   role:"Principal, Adebayo Law Group", grad:"from-slate-600 to-amber-600" },
  { q:"Setup took under 15 minutes. The AI voice is indistinguishable from human — clients love it.",                        name:"Chioma Eze",       role:"CEO, Lagos Growth Partners",   grad:"from-cyan-600 to-slate-600" },
];

const WITHOUT = ["Missed calls after hours","Staff overwhelmed at peak times","Manual appointment scheduling","Inconsistent customer experience","High staffing overhead","No data on call performance"];
const WITH    = ["Every call answered instantly, 24/7","Unlimited concurrent call handling","Automatic calendar booking","Consistent, branded interactions","Up to 80% cost savings","Full analytics dashboard"];

function S({ children, bg, className="" }) {
  return (
    <section className={`relative px-4 sm:px-6 py-12 sm:py-14 ${className}`}
      style={{ background:bg, zIndex:10, position:"relative" }}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}
function H2({ children, center=false }) {
  return <h2 className={`font-syne font-black uppercase tracking-tight text-[#1A1614] leading-tight ${center?"text-center":""}`} style={{ fontSize:"clamp(20px,3vw,30px)" }}>{children}</h2>;
}
function Label({ children }) {
  return <div className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65 mb-2">{children}</div>;
}

export default function BenefitsPage({ setPage }) {
  return (
    <main style={{ position:"relative", zIndex:10 }}>
      <PageHero chip="Corporate Intelligence" title="Never Miss a Lead Again."
        hlWord="Lead"
        sub="Luminous AI captures every call, books appointments, and greets your customers with corporate precision."
        primaryBtn="Deploy AI Now"   primaryAction={() => setPage("getstarted")}
        secondaryBtn="View Demo"     secondaryAction={() => setPage("pricing")} />

      {/* Benefits */}
      <S bg="rgba(255,255,255,0.97)">
        <Reveal className="mb-8 sm:mb-10">
          <Label>Why Luminous AI</Label>
          <H2>Corporate Precision</H2>
          <p className="text-[#4E4439]/65 text-[12.5px] mt-2 max-w-lg leading-relaxed">We've engineered a receptionist that integrates seamlessly with your existing professional workflow.</p>
        </Reveal>
        {/* 2-col on mobile → 4-col on md */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
          {BENEFITS.map((b,i)=>(
            <Reveal key={b.title} delay={i*.07}>
              <div className="group">
                <div className="w-9 h-9 flex items-center justify-center text-[#8B6E3C] mb-3">
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">{b.icon}</span>
                </div>
                <h3 className="font-syne font-bold uppercase tracking-[.06em] text-[#1A1614] mb-1.5 text-[10.5px] sm:text-[11px]">{b.title}</h3>
                <p className="text-[#4E4439]/70 leading-relaxed text-[11.5px] sm:text-[12.5px]">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </S>

      {/* Bento grid — stacked on mobile, 12-col on md */}
      <S bg="rgba(236,231,224,0.97)" className="py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          <Reveal className="md:col-span-8">
            <div className="relative overflow-hidden bg-[#e2ddd6] border border-[#ccc5ba]/50 p-6 sm:p-9 flex flex-col justify-end" style={{ minHeight:180 }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60')", backgroundSize:"cover", backgroundPosition:"center" }}/>
              <div className="relative z-10">
                <h3 className="font-syne font-black text-[#8B6E3C] uppercase tracking-tight mb-1.5 text-[15px] sm:text-[17px]">Elite Reliability</h3>
                <p className="text-[#4E4439]/75 max-w-sm leading-relaxed text-[12px] sm:text-[12.5px]">Our enterprise architecture ensures peak performance with zero latency.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={.1} className="md:col-span-4">
            <div className="bg-[#8B6E3C] p-6 sm:p-8 flex flex-col justify-between text-white" style={{ minHeight:180 }}>
              <span className="material-symbols-outlined text-[28px] sm:text-[34px]" style={{ fontVariationSettings:"'FILL' 1" }}>bolt</span>
              <div>
                <h3 className="font-syne font-black uppercase tracking-tight mb-1.5 text-[14px] sm:text-[15px]">Instant Sync</h3>
                <p className="text-white/78 leading-relaxed text-[12px] sm:text-[12.5px]">Direct connection to enterprise CRMs and 2,000+ productivity tools.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="md:col-span-4">
            <div className="bg-white border border-[#ccc5ba]/50 p-5 sm:p-6" style={{ minHeight:160 }}>
              <h3 className="font-syne font-black uppercase tracking-tight text-[#1A1614] mb-4 text-[12px] sm:text-[13px]">Analytics Hub</h3>
              <div className="space-y-2.5">
                {[["75%","#8B6E3C"],["50%","#0097A7"],["84%","#545F7E"]].map(([w,c],i)=>(
                  <div key={i} className="h-1.5 bg-[#e8e3dc] rounded-full overflow-hidden">
                    <motion.div initial={{width:0}} whileInView={{width:w}} viewport={{once:true}} transition={{delay:i*.1+.3,duration:.7,ease:[.16,1,.3,1]}}
                      className="h-full rounded-full" style={{background:c}}/>
                  </div>
                ))}
              </div>
              <p className="text-[#4E4439]/65 mt-3 leading-relaxed text-[11px] sm:text-[11.5px]">Actionable insights from every interaction and conversion.</p>
            </div>
          </Reveal>
          <Reveal delay={.1} className="md:col-span-8">
            <div className="relative overflow-hidden border border-[#ccc5ba]/50" style={{ minHeight:160 }}>
              <img src="https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover absolute inset-0" style={{opacity:.4}}/>
              <div className="absolute inset-0 bg-gradient-to-t from-white/97 via-white/55 to-transparent"/>
              <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                <h3 className="font-syne font-black text-[#1A1614] uppercase tracking-tight mb-1 text-[13px] sm:text-[14px]">Seamless Transition</h3>
                <p className="text-[#4E4439]/75 max-w-sm text-[11.5px] sm:text-[12.5px] leading-relaxed">Luminous identifies high-value opportunities for immediate human intervention.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </S>

      {/* Stats — 2-col on mobile, 4-col on md */}
      <div className="relative py-10 sm:py-12 px-4 sm:px-6 border-y border-[#ccc5ba]/50" style={{ background:"rgba(255,252,248,0.97)", zIndex:10, position:"relative" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-[#ccc5ba]/50">
          {STATS.map((s,i)=>(
            <Reveal key={s.lbl} delay={i*.08} className={`sm:px-6 sm:first:pl-0`}>
              <div className="font-syne font-black text-[#8B6E3C] leading-none" style={{ fontSize:"clamp(28px,3.8vw,42px)" }}>
                <Counter to={s.val} suffix={s.suf}/>
              </div>
              <div className="text-[#4E4439]/60 mt-1.5 text-[11px] sm:text-[12px]">{s.lbl}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Comparison — stacked on mobile, 2-col on md */}
      <S bg="rgba(253,248,243,0.97)">
        <Reveal className="mb-7 sm:mb-8">
          <Label>The Difference</Label>
          <H2>Traditional vs. Letconvo</H2>
          <p className="text-[#4E4439]/65 text-[12.5px] mt-2 leading-relaxed">See exactly what changes when you deploy Letconvo AI.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <Reveal delay={.08}>
            <div className="rounded-sm border border-red-200/60 p-5 sm:p-8" style={{ background:"rgba(254,242,242,0.45)" }}>
              <h3 className="font-syne font-bold text-[11px] sm:text-[12px] uppercase tracking-[.1em] text-red-700 mb-4 sm:mb-5">❌ Without Letconvo</h3>
              {WITHOUT.map(r=>(
                <div key={r} className="flex items-center gap-2.5 py-2 sm:py-2.5 border-b border-red-100/50 last:border-0 text-[12px] sm:text-[13px] text-[#4E4439]">
                  <span className="material-symbols-outlined text-red-400 text-[14px] sm:text-[15px] flex-shrink-0">close</span>{r}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={.16}>
            <div className="rounded-sm border border-amber-300/50 p-5 sm:p-8" style={{ background:"rgba(255,251,235,0.45)" }}>
              <h3 className="font-syne font-bold text-[11px] sm:text-[12px] uppercase tracking-[.1em] text-[#8B6E3C] mb-4 sm:mb-5">✓ With Letconvo</h3>
              {WITH.map(r=>(
                <div key={r} className="flex items-center gap-2.5 py-2 sm:py-2.5 border-b border-amber-100/50 last:border-0 text-[12px] sm:text-[13px] text-[#4E4439]">
                  <span className="material-symbols-outlined text-[#8B6E3C] text-[14px] sm:text-[15px] flex-shrink-0">check_circle</span>{r}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </S>

      {/* Testimonials — stacked on mobile, 3-col on md */}
      <S bg="rgba(255,255,255,0.97)">
        <Reveal className="mb-7 sm:mb-8">
          <Label>Social Proof</Label>
          <H2>Trusted Worldwide</H2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTS.map((t,i)=>(
            <Reveal key={t.name} delay={i*.09}>
              <div className="border-l-[3px] border-[#8B6E3C] pl-4 sm:pl-5 py-1 flex flex-col h-full">
                <div className="text-[#8B6E3C] tracking-widest mb-2 text-[11px]">★★★★★</div>
                <p className="text-[#4E4439]/80 leading-relaxed mb-4 italic text-[12.5px] sm:text-[13px] flex-1">"{t.q}"</p>
                <div className="flex items-center gap-2.5 mt-auto">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.grad} flex-shrink-0`}/>
                  <div>
                    <div className="font-syne font-bold text-[#1A1614] text-[11px]">{t.name}</div>
                    <div className="text-[#4E4439]/50 mt-0.5 text-[10px]">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </S>

      {/* CTA */}
      <S bg="rgba(255,255,255,0.97)" className="py-16 sm:py-20 text-center">
        <Reveal>
          <Label>Get Started</Label>
          <h2 className="font-syne font-black uppercase tracking-[-0.02em] text-[#1A1614] leading-[1.0] mb-5 sm:mb-6" style={{ fontSize:"clamp(28px,5.5vw,52px)" }}>
            Professional<br/>Transformation.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 flex-wrap mb-7 sm:mb-8">
            {[["verified_user","Implementation","Standardized Setup"],["support_agent","Support","Priority Account Manager"]].map(([ic,lbl,val])=>(
              <div key={lbl} className="flex items-center gap-3 text-left bg-[#f7f2ec] border border-[#ccc5ba]/50 px-4 py-3 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#8B6E3C]/10 flex items-center justify-center text-[#8B6E3C] flex-shrink-0">
                  <span className="material-symbols-outlined text-[15px]">{ic}</span>
                </div>
                <div>
                  <div className="font-syne font-bold uppercase tracking-[.1em] text-[#4E4439]/50 text-[9px]">{lbl}</div>
                  <div className="font-syne font-semibold text-[#1A1614] mt-0.5 text-[12px]">{val}</div>
                </div>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }} onClick={() => setPage("getstarted")}
            className="bg-[#8B6E3C] text-white font-syne font-bold uppercase tracking-[.12em] px-8 sm:px-12 py-3.5 sm:py-4 hover:bg-[#6b5228] transition-colors text-[11px] sm:text-[12px] w-full sm:w-auto">
            Activate Letconvo AI
          </motion.button>
          <p className="text-[10.5px] text-[#4E4439]/45 mt-4">500 credits free trial · No credit card required</p>
        </Reveal>
      </S>

      <Footer setPage={setPage}/>
    </main>
  );
}
