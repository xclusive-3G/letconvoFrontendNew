import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";

const PLANS=[
  {tier:"Starter",price:"$120",desc:"For solo practitioners.",feats:["24/7 Response Time","Basic Call Logs","400 Minutes Included","Professional Greetings","Call Records","Appointments","Analytics","Live Calls","Missed-Call Callback","Appointment Rescheduling"],dim:["CRM Integration","Voice Cloning"],featured:true,available:true,cta:"Try 15 Free Minutes",target:"getstarted"},
  {tier:"Growth",price:"$349",desc:"For growing businesses that demand full automation.",feats:["Everything in Starter","Minutes announced at launch","Google Calendar Booking","Custom Logic Scripts","Full CRM Integration","Advanced Analytics"],dim:[],featured:false,available:false,cta:"Coming Soon",target:"getstarted"},
  {tier:"Enterprise",price:"$699+",desc:"White-label solutions at scale.",feats:["Everything in Growth","Minutes announced at launch","Multi-Practice Support","Custom AI Voice Cloning","White-label Dashboard","API & Automations"],dim:[],featured:false,available:false,cta:"Coming Soon",target:"contact"},
];
const TABLE=[["24/7 AI answering","✓","✓","✓"],["Included minutes","400","At launch","At launch"],["SMS follow-up","✓","✓","✓"],["Call records","✓","✓","✓"],["Appointments","✓","✓","✓"],["Appointment rescheduling","✓","✓","✓"],["Missed-call callback","✓","✓","✓"],["Live calls","✓","✓","✓"],["Analytics","✓","✓","✓"],["Calendar booking","—","✓","✓"],["CRM integration","—","✓","✓"],["Advanced analytics","—","✓","✓"],["Voice cloning","—","—","✓"],["White-label","—","—","✓"],["Multi-location","—","—","✓"]];
const FAQS=[["Can I change plans anytime?","Starter is currently available. Growth and Enterprise are coming soon; contact us to discuss your needs."],["What if I exceed my minutes?","Calls require an available calling balance. Review current top-up options in your dashboard or contact us before purchasing additional usage."],["Is there a free trial?","Every new signup gets 15 minutes of free AI calling credit to test Letconvo with real calls. No credit card required."],["How long does setup take?","Most clients are live within 15 minutes using our guided onboarding wizard."],["Does it work with my current phone?","You can forward calls from a compatible existing business number. Forwarding support and charges depend on your carrier; contact us to confirm your setup."],["What integrations are supported?","Starter supports appointments using your configured business hours and available slots. Contact us to confirm a specific calendar or CRM connection before subscribing."]];

function S({children,bg,className=""}) {
  return <section className={`relative z-10 py-12 sm:py-14 px-4 sm:px-6 ${className}`} style={{background:bg}}><div className="max-w-5xl mx-auto">{children}</div></section>;
}

export default function PricingPage({setPage}) {
  const [openFaq,setOpenFaq]=useState(null);
  return (
    <main style={{position:"relative",zIndex:10}}>
      <PageHero chip="Transparent Pricing" title="AI Receptionist Pricing" hlWord="Pricing"
        sub="Start with 15 free calling minutes. Starter includes 400 minutes for $120 USD per month. Growth and Enterprise are not available yet." />

      {/* Plans — stacked mobile, 3-col desktop */}
      <S bg="rgb(253,248,242)">
        <Reveal className="text-center mb-8 sm:mb-10">
          <h2 className="font-syne font-black uppercase tracking-tight text-[#1A1614] leading-tight" style={{fontSize:"clamp(20px,3.2vw,30px)"}}>
            Choose Your <span style={{color:"#8B6E3C"}}>Plan</span>
          </h2>
          <p className="text-[12px] text-[#4E4439]/65 mt-2 max-w-sm mx-auto leading-relaxed">Test with real calls before choosing Starter. Future plan details may change before launch.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-start">
          {PLANS.map((p,i)=>(
            <Reveal key={p.tier} delay={i*.1}>
              <div className={`relative flex flex-col bg-white border rounded-sm ${!p.available?"opacity-60":""} ${p.featured?"border-[#8B6E3C] shadow-lg shadow-[#8B6E3C]/10":"border-[#d4c8b8]/60 shadow-sm"}`}
                style={{transform:p.featured?"translateY(-6px)":undefined}}
                title={p.available?undefined:"This plan is still under build and isn't available yet"}>
                {p.featured&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B6E3C] text-white font-syne font-bold text-[9px] uppercase tracking-[.1em] px-4 py-1 rounded-sm whitespace-nowrap">Available Now</div>}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className={`font-syne font-bold text-[10px] uppercase tracking-[.12em] ${p.featured?"text-[#8B6E3C]":"text-[#4E4439]/55"}`}>{p.tier}</div>
                    {!p.available&&<span className="font-syne font-bold text-[8px] uppercase tracking-[.08em] text-[#8B6E3C] bg-[#8B6E3C]/10 border border-[#8B6E3C]/25 rounded-sm px-1.5 py-0.5 whitespace-nowrap">Coming Soon</span>}
                  </div>
                  <div className="flex items-baseline gap-0.5 mb-1">
                    <span className="font-syne font-black text-[34px] sm:text-[38px] text-[#8B6E3C] leading-none tracking-tight">{p.available ? p.price : "Coming soon"}</span>
                    {p.available && <span className="text-[12px] text-[#4E4439]/55 mb-0.5">USD / month</span>}
                  </div>
                  <p className="text-[11.5px] text-[#4E4439]/60 mb-4 leading-relaxed">{p.available?p.desc:"Still under build — not available yet"}</p>
                  <div className="h-px bg-[#d4c8b8]/50 mb-4"/>
                  <div className="flex flex-col gap-2 flex-1">
                    {p.feats.map(f=>(
                      <div key={f} className="flex items-center gap-2 text-[12px] text-[#4E4439]/80">
                        <span className="material-symbols-outlined text-[#8B6E3C] text-[13px] flex-shrink-0">check_circle</span>{f}
                      </div>
                    ))}
                    {p.dim.map(f=>(
                      <div key={f} className="flex items-center gap-2 text-[12px] text-[#4E4439]/30">
                        <span className="material-symbols-outlined text-[13px] flex-shrink-0">cancel</span>{f}
                      </div>
                    ))}
                  </div>
                  <motion.button whileHover={p.available?{scale:1.02}:{}} whileTap={p.available?{scale:.97}:{}}
                    onClick={()=>p.available&&setPage(p.target)} disabled={!p.available}
                    className={`mt-5 sm:mt-6 w-full py-2.5 font-syne font-bold text-[11px] uppercase tracking-[.08em] transition-colors rounded-sm ${!p.available?"border border-[#d4c8b8] text-[#8B7060] cursor-not-allowed":p.featured?"bg-[#8B6E3C] text-white hover:bg-[#6b5228]":"border border-[#8B6E3C] text-[#8B6E3C] hover:bg-[#8B6E3C]/5"}`}>
                    {p.cta}
                  </motion.button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </S>

      {/* Feature table — scrollable on mobile */}
      <S bg="rgb(247,243,239)">
        <Reveal className="mb-6 sm:mb-7">
          <h2 className="font-syne font-black text-[20px] sm:text-[26px] uppercase tracking-tight text-[#1A1614]">What's Included</h2>
        </Reveal>
        <Reveal>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="min-w-[480px] sm:min-w-0 bg-white border border-[#d4c8b8]/60 rounded-sm overflow-hidden shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f7f2ec] border-b-2 border-[#d4c8b8]/50">
                    <th className="text-left px-4 sm:px-5 py-3 font-syne font-bold text-[10px] uppercase tracking-[.1em] text-[#4E4439]">Feature</th>
                    {[["Starter",true],["Growth",false],["Enterprise",false]].map(([h,available])=>(
                      <th key={h} className="px-3 sm:px-4 py-3 font-syne font-bold text-[10px] uppercase tracking-[.1em] text-center text-[#4E4439]">
                        {h}{!available&&<div className="text-[8px] font-normal normal-case tracking-normal text-[#8B7060] mt-0.5">(Coming Soon)</div>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((row,ri)=>(
                    <tr key={row[0]} className={ri%2===1?"bg-[#fdf9f5]":""}>
                      <td className="px-4 sm:px-5 py-2.5 text-[12px] font-medium text-[#1A1614] border-b border-[#d4c8b8]/30">{row[0]}</td>
                      {row.slice(1).map((c,ci)=>(
                        <td key={ci} className={`px-3 sm:px-4 py-2.5 text-[12px] text-center border-b border-[#d4c8b8]/30 font-semibold ${c==="✓"?"text-[#8B6E3C]":c==="—"?"text-[#d4c8b8]":"text-[#4E4439]"}`}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[10.5px] text-[#8B7060] mt-2 sm:hidden text-center">← Scroll to see all columns</p>
        </Reveal>
      </S>

      {/* FAQ — 1-col mobile, 2-col md */}
      <S bg="rgb(255,255,255)">
        <Reveal className="mb-6 sm:mb-7">
          <h2 className="font-syne font-black text-[20px] sm:text-[26px] uppercase tracking-tight text-[#1A1614]">Common Questions</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FAQS.map(([q,a],i)=>(
            <Reveal key={q} delay={i*.05}>
              <div onClick={()=>setOpenFaq(openFaq===i?null:i)}
                className="bg-white border border-[#d4c8b8]/60 rounded-sm p-4 cursor-pointer hover:border-[#8B6E3C]/40 transition-colors">
                <div className="flex justify-between items-start gap-3">
                  <span className="font-syne font-semibold text-[12px] sm:text-[12.5px] text-[#1A1614] leading-snug">{q}</span>
                  <motion.span animate={{rotate:openFaq===i?180:0}} transition={{duration:.22}}
                    className="material-symbols-outlined text-[#8B6E3C] flex-shrink-0 text-[16px] mt-0.5">expand_more</motion.span>
                </div>
                <AnimatePresence>
                  {openFaq===i&&(
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.26,ease:[.16,1,.3,1]}} className="overflow-hidden">
                      <p className="text-[12px] text-[#4E4439]/75 leading-relaxed pt-2.5">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </S>

      <Footer setPage={setPage}/>
    </main>
  );
}
