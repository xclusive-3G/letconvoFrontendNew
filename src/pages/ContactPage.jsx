import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";

const INFO=[{icon:"mail",label:"Email",val:"hello@luminousai.com"},{icon:"call",label:"Phone",val:"+1 (800) 555-LUMI"},{icon:"schedule",label:"Response Time",val:"Within 2 business hours"},{icon:"support_agent",label:"Support Hours",val:"24/7 for active clients"}];
const OFFICES=[{tag:"Headquarters",city:"San Francisco, CA",addr:["100 Market Street, Suite 800","San Francisco, CA 94105","United States"]},{tag:"EMEA",city:"London, UK",addr:["30 St Mary Axe, Level 12","London EC3A 8BF","United Kingdom"]},{tag:"Africa",city:"Lagos, Nigeria",addr:["Victoria Island Business Hub","Adeola Odeku Street","Lagos, Nigeria"]}];
const INTERESTS=["General information","Starter plan","Growth plan","Enterprise / Agency","Custom demo"];
const inputCls="text-[12.5px] text-[#1A1614] bg-white border border-[#d4c8b8]/70 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-[#8B6E3C] transition-colors";

function S({children,bg,className=""}) {
  return <section className={`relative z-10 py-12 sm:py-14 px-4 sm:px-6 ${className}`} style={{background:bg}}><div className="max-w-5xl mx-auto">{children}</div></section>;
}

export default function ContactPage({setPage}) {
  const [sent,setSent]=useState(false);
  return (
    <main style={{position:"relative",zIndex:10}}>
      <PageHero chip="Get In Touch" title="Let's Start a Conversation" hlWord="Conversation"
        sub="Whether you're ready to deploy or just exploring, our team guides you through every step." />

      {/* Form + Info — stacked mobile, side-by-side md */}
      <S bg="rgba(255,255,255,0.97)">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 sm:gap-12 items-start">
          <Reveal>
            <p className="font-syne font-semibold text-[9px] uppercase tracking-[.18em] text-[#8B6E3C]/60 mb-1.5">Contact Us</p>
            <h3 className="font-syne font-black uppercase tracking-tight text-[#1A1614] mb-2 leading-tight" style={{fontSize:"clamp(18px,2.8vw,24px)"}}>We'd Love to Hear From You</h3>
            <p className="text-[12.5px] text-[#4E4439]/70 leading-relaxed mb-6 max-w-xs">Questions about Luminous AI? Our team typically responds within 2 business hours.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              {INFO.map(({icon,label,val})=>(
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#f7f2ec] border border-[#d4c8b8]/60 flex items-center justify-center flex-shrink-0 text-[#8B6E3C]">
                    <span className="material-symbols-outlined text-[15px]">{icon}</span>
                  </div>
                  <div>
                    <div className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50 mb-0.5">{label}</div>
                    <div className="text-[12.5px] font-medium text-[#1A1614]">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={.1}>
            <div className="bg-white border border-[#d4c8b8]/60 rounded-sm p-5 sm:p-7 shadow-sm">
              <p className="font-syne font-semibold text-[9px] uppercase tracking-[.18em] text-[#8B6E3C]/60 mb-4">Send a Message</p>
              <AnimatePresence mode="wait">
                {sent?(
                  <motion.div key="ok" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="text-center py-8 sm:py-10">
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="font-syne font-black text-[16px] uppercase tracking-tight text-[#1A1614] mb-1.5">Message Sent!</h3>
                    <p className="text-[12px] text-[#4E4439]/65">We'll get back to you within 2 business hours.</p>
                  </motion.div>
                ):(
                  <motion.form key="form" onSubmit={e=>{e.preventDefault();setSent(true);}}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[["First Name","text","Sarah"],["Last Name","text","Okonkwo"],["Work Email","email","sarah@company.com"],["Phone","tel","+1 (555) 000-0000"]].map(([lbl,type,ph])=>(
                        <div key={lbl} className="flex flex-col gap-1">
                          <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">{lbl}</label>
                          <input type={type} placeholder={ph} className={inputCls}/>
                        </div>
                      ))}
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">Company Name</label>
                        <input type="text" placeholder="Apex Health Clinic" className={inputCls}/>
                      </div>
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">I'm interested in</label>
                        <select className={inputCls + " cursor-pointer bg-white"}>
                          {INTERESTS.map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="sm:col-span-2 flex flex-col gap-1">
                        <label className="font-syne font-bold text-[9px] uppercase tracking-[.1em] text-[#4E4439]/50">Message</label>
                        <textarea rows={4} placeholder="Tell us about your business..." className={inputCls + " resize-y"}/>
                      </div>
                    </div>
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:.97}} type="submit"
                      className="w-full mt-4 py-3 bg-[#8B6E3C] text-white font-syne font-bold text-[11px] uppercase tracking-[.1em] rounded-sm hover:bg-[#6b5228] transition-colors">
                      Send Message →
                    </motion.button>
                    <p className="text-[10px] text-[#4E4439]/40 text-center mt-2">We respect your privacy. Your info is never shared.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </S>

      {/* Offices — stacked mobile, 3-col md */}
      <S bg="rgba(247,243,239,0.98)">
        <Reveal className="mb-6 sm:mb-7">
          <h2 className="font-syne font-black uppercase tracking-tight text-[#1A1614]" style={{fontSize:"clamp(18px,2.5vw,24px)"}}>Global Presence</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OFFICES.map((o,i)=>(
            <Reveal key={o.city} delay={i*.08}>
              <div className="bg-white border border-[#d4c8b8]/60 rounded-sm p-5 shadow-sm">
                <span className="inline-block px-2 py-0.5 bg-[#f7f2ec] border border-[#d4c8b8]/60 text-[9px] font-syne font-bold uppercase tracking-[.1em] text-[#8B6E3C] mb-3 rounded-sm">{o.tag}</span>
                <h4 className="font-syne font-bold text-[13px] uppercase tracking-tight text-[#1A1614] mb-1.5">{o.city}</h4>
                <p className="text-[12px] text-[#4E4439]/65 leading-relaxed">{o.addr.map((l,j)=><span key={j}>{l}<br/></span>)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </S>
      <Footer setPage={setPage}/>
    </main>
  );
}
