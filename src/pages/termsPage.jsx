import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const LAST_UPDATED = "June 15, 2025";
const COMPANY = "LetConvo AI";
const CONTACT_EMAIL = "legal@letconvo.live";
const SITE = "letconvo.live";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      `By accessing or using ${COMPANY}'s website, platform, or AI receptionist services (collectively, the "Services"), you ("User", "you", or "your") agree to be legally bound by these Terms and Conditions ("Terms"). If you are using our Services on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.`,
      "If you do not agree to these Terms in their entirety, you must immediately cease all use of our Services. Your continued use of the Services constitutes your ongoing acceptance of any updates or amendments to these Terms.",
    ],
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: [
      `${COMPANY} provides AI-powered receptionist and call management services, including but not limited to: automated call answering, appointment scheduling, lead qualification, call recording and transcription, CRM integrations, analytics dashboards, and related business automation tools.`,
      "We reserve the right to modify, suspend, or discontinue any part of the Services at any time, with or without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of Services.",
      "Access to certain features may require a paid subscription. Features available to you depend on the plan you have selected and your compliance with these Terms.",
    ],
  },
  {
    id: "accounts",
    title: "3. Account Registration & Security",
    items: [
      "You must provide accurate, current, and complete information when creating an account.",
      "You are solely responsible for maintaining the confidentiality of your login credentials.",
      "You must immediately notify us at " + CONTACT_EMAIL + " of any unauthorized use of your account.",
      "You may not share your account credentials with third parties or allow multiple users to access a single account (unless permitted by your subscription plan).",
      "You must be at least 18 years of age to create an account and use our Services.",
      "We reserve the right to suspend or terminate accounts that we reasonably believe have been compromised or are being used in violation of these Terms.",
    ],
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable Use Policy",
    content: [
      "You agree to use the Services only for lawful purposes and in a manner consistent with all applicable local, national, and international laws and regulations.",
    ],
    subSections: [
      {
        heading: "You must NOT use our Services to:",
        items: [
          "Make or facilitate fraudulent, deceptive, or misleading calls",
          "Harass, threaten, intimidate, or abuse any person",
          "Collect personal data from callers without their informed consent",
          "Violate any applicable telemarketing, do-not-call, or consumer protection laws (including NDPR, GDPR, TCPA, or equivalent)",
          "Distribute spam, malware, or engage in phishing activities",
          "Impersonate any person, business, or legal entity",
          "Attempt to gain unauthorized access to our systems or those of third parties",
          "Use the Services for any purpose that infringes the intellectual property rights of others",
          "Reverse engineer, decompile, or disassemble any part of our platform",
        ],
      },
    ],
    footer: "We reserve the right to investigate any suspected violation of this policy and take appropriate action, including immediate account suspension without refund.",
  },
  {
    id: "call-recording",
    title: "5. Call Recording & AI Transcription",
    content: [
      "Our Services include AI-powered call recording and transcription. By enabling these features, you acknowledge and agree to the following:",
    ],
    items: [
      "You are solely responsible for complying with all applicable laws regarding call recording consent in your jurisdiction and in the jurisdictions of your callers.",
      "Many jurisdictions require that all parties to a call be informed and consent to recording before the call begins. You must configure appropriate disclosure messages.",
      "LetConvo AI provides tools to help you notify callers of recording, but compliance with recording consent laws is your responsibility.",
      "We store call recordings and transcripts in accordance with our Privacy Policy and your selected plan's data retention settings.",
      "You grant us a limited licence to process, store, and analyse call recordings solely to provide and improve our Services.",
      "You may request deletion of call recordings through your dashboard or by contacting us.",
    ],
  },
  {
    id: "data-privacy",
    title: "6. Data & Privacy",
    content: [
      `Your use of our Services is subject to our Privacy Policy, available at ${SITE}/privacy, which is incorporated into these Terms by reference. By using our Services, you consent to the collection, processing, and use of data as described in our Privacy Policy.`,
      "As a business using our Services, you are a data controller in respect of your callers' personal data. LetConvo AI acts as your data processor. You must ensure you have a lawful basis for processing any personal data collected through our Services.",
      "You are responsible for notifying callers of how their data is collected and used, and for responding to any data subject rights requests from your callers.",
    ],
  },
  {
    id: "payment",
    title: "7. Payment, Billing & Refunds",
    items: [
      "All subscription fees are billed in advance on a monthly or annual basis, depending on your chosen plan.",
      "You authorize us to charge your designated payment method on each billing cycle renewal date.",
      "All fees are exclusive of applicable taxes (including VAT, GST, or sales tax), which you are responsible for paying.",
      "Minute overages beyond your plan's included allowance will be billed at the applicable per-minute rate shown in your account dashboard.",
      "We offer a 14-day free trial for new accounts. No credit card is required to start a trial. Trials are limited to one per business or individual.",
      "Refunds are generally not provided for monthly subscriptions. Annual subscriptions may be eligible for a prorated refund if cancelled within 30 days of the annual renewal date, at our discretion.",
      "Failed payments may result in service interruption. We will attempt to notify you before suspending your account.",
      "We reserve the right to modify pricing with 30 days' written notice. Continued use after the effective date of any price change constitutes acceptance.",
    ],
  },
  {
    id: "cancellation",
    title: "8. Cancellation & Termination",
    content: [
      "You may cancel your subscription at any time through your account dashboard or by contacting us. Cancellation takes effect at the end of your current billing period. You will retain access to the Services until that date.",
    ],
    items: [
      "We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms.",
      "Upon termination, your right to use the Services will immediately cease.",
      "We will retain your data for 30 days after account termination, after which it may be permanently deleted. You are responsible for exporting any data you require before termination.",
      "Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.",
    ],
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    content: [
      `The Services, including all software, algorithms, AI models, interfaces, content, trademarks, logos, and branding ("${COMPANY} IP"), are the exclusive property of ${COMPANY} and its licensors. These Terms do not grant you any rights to ${COMPANY} IP except for the limited right to use the Services as expressly permitted herein.`,
      "You retain ownership of all content, business data, and materials you upload or input into the Services (\u201cYour Content\u201d). By using our Services, you grant us a non-exclusive, worldwide, royalty-free licence to process, display, and store Your Content solely as necessary to provide the Services.",
      "You represent and warrant that Your Content does not infringe the intellectual property rights of any third party and that you have all rights necessary to grant us the licence above.",
    ],
  },
  {
    id: "disclaimers",
    title: "10. Disclaimers & Limitations",
    content: [
      'THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, LETCONVO AI EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
      "WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. AI-GENERATED CALL RESPONSES, TRANSCRIPTIONS, AND SUMMARIES MAY CONTAIN ERRORS AND SHOULD NOT BE RELIED UPON AS THE SOLE BASIS FOR CRITICAL BUSINESS DECISIONS.",
    ],
  },
  {
    id: "liability",
    title: "11. Limitation of Liability",
    content: [
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LETCONVO AI, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
      "IN NO EVENT SHALL OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES EXCEED THE GREATER OF: (A) THE TOTAL AMOUNTS PAID BY YOU TO US IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED US DOLLARS (USD $100).",
    ],
  },
  {
    id: "indemnification",
    title: "12. Indemnification",
    content: [
      `You agree to indemnify, defend, and hold harmless ${COMPANY} and its officers, directors, employees, agents, and successors from and against any and all claims, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or relating to: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; (d) your call recording practices and compliance obligations; or (e) your infringement of any third-party rights.`,
    ],
  },
  {
    id: "governing-law",
    title: "13. Governing Law & Dispute Resolution",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions. The courts of Lagos State, Nigeria shall have exclusive jurisdiction over any disputes arising from or relating to these Terms or the Services.",
      "Before initiating any formal legal proceedings, both parties agree to attempt to resolve disputes informally by contacting us at " + CONTACT_EMAIL + ". We will endeavour to respond and resolve the issue within 30 days.",
    ],
  },
  {
    id: "changes",
    title: "14. Changes to These Terms",
    content: [
      "We reserve the right to modify these Terms at any time. When we make material changes, we will notify you by email (to the address associated with your account) and/or by posting a prominent notice on our website at least 14 days before the changes take effect.",
      "Your continued use of the Services after the effective date of the revised Terms constitutes your acceptance of the changes. If you do not agree to the updated Terms, you must stop using the Services and cancel your subscription.",
    ],
  },
  {
    id: "general",
    title: "15. General Provisions",
    items: [
      "Entire Agreement: These Terms, together with our Privacy Policy, constitute the entire agreement between you and LetConvo AI regarding the Services.",
      "Severability: If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
      "Waiver: Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
      "Assignment: You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.",
      "Force Majeure: We shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including acts of God, natural disasters, war, government actions, or internet outages.",
      "Contact: For any questions regarding these Terms, please contact us at " + CONTACT_EMAIL + ".",
    ],
  },
];

function SectionBlock({ section, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      id={section.id}
      className="scroll-mt-20"
    >
      <div
        className="flex items-start justify-between gap-4 cursor-pointer md:cursor-default py-1"
        onClick={onClick}
      >
        <h2 className="font-syne font-black text-[#1A1614] uppercase tracking-tight leading-tight"
          style={{ fontSize: "clamp(14px,2vw,17px)" }}>
          {section.title}
        </h2>
        {/* Accordion toggle — mobile only */}
        <motion.span
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="material-symbols-outlined text-[#8B6E3C] text-[18px] flex-shrink-0 mt-0.5 md:hidden"
        >
          expand_more
        </motion.span>
      </div>

      {/* Content — always visible on md+, accordion on mobile */}
      <div className={`md:block ${isActive ? "block" : "hidden"}`}>
        <div className="mt-3 space-y-3 pl-0 md:pl-0">
          {section.content?.map((para, i) => (
            <p key={i} className="text-[#4E4439]/80 leading-relaxed text-[12.5px] sm:text-[13px]">{para}</p>
          ))}
          {section.items && (
            <ul className="space-y-2 mt-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-[#4E4439]/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B6E3C] flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {section.subSections?.map((sub, si) => (
            <div key={si} className="mt-3">
              <p className="font-syne font-semibold text-[11px] uppercase tracking-[.1em] text-[#8B6E3C] mb-2">{sub.heading}</p>
              <ul className="space-y-2">
                {sub.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-[#4E4439]/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B6E3C] flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {section.footer && (
            <p className="text-[12.5px] sm:text-[13px] text-[#4E4439]/80 mt-3 italic">{section.footer}</p>
          )}
        </div>
        <div className="h-px bg-[#f0ebe4] mt-6 md:mt-8" />
      </div>
    </motion.div>
  );
}

export default function TermsPage({ setPage }) {
  const [activeSection, setActiveSection] = useState(null);

  const toggle = id => setActiveSection(prev => prev === id ? null : id);
  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={{ position: "relative", zIndex: 10 }}>
      {/* Hero */}
      <section className="relative pt-[52px] overflow-hidden" style={{ background:"linear-gradient(160deg,#1a1410 0%,#2d2010 60%,#1a1410 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.05, duration:.5, ease:[.16,1,.3,1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-700/15 mb-5">
            <span className="material-symbols-outlined text-amber-400 text-[13px]">gavel</span>
            <span className="font-syne font-semibold text-[9px] uppercase tracking-[.18em] text-amber-300/80">Legal Document</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.12, duration:.6, ease:[.16,1,.3,1] }}
            className="font-syne font-black text-white uppercase leading-tight tracking-[-0.02em] mb-4"
            style={{ fontSize:"clamp(28px,5vw,50px)" }}>
            Terms &amp; Conditions
          </motion.h1>

          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.22, duration:.5 }}
            className="text-white/65 text-[13px] sm:text-[14px] leading-relaxed max-w-md mb-6">
            Please read these Terms carefully before using LetConvo AI. They govern your use of our platform and services.
          </motion.p>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}
            className="flex flex-wrap gap-4 text-[11.5px] text-white/45">
            <span>Last updated: <strong className="text-white/70">{LAST_UPDATED}</strong></span>
            <span className="hidden sm:inline">·</span>
            <span>Effective immediately upon acceptance</span>
          </motion.div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      </section>

      {/* Body */}
      <section className="relative z-10 px-4 sm:px-6 py-10 sm:py-14" style={{ background:"rgba(255,255,255,0.98)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 lg:gap-14 items-start">

            {/* Sidebar TOC — desktop only */}
            <div className="hidden md:block sticky top-20">
              <p className="font-syne font-bold text-[9px] uppercase tracking-[.18em] text-[#8B6E3C]/65 mb-3">Contents</p>
              <nav className="flex flex-col gap-1">
                {SECTIONS.map(s => (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className="text-left font-syne text-[10.5px] text-[#4E4439]/60 hover:text-[#8B6E3C] transition-colors py-0.5 leading-snug">
                    {s.title}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-[#f0ebe4]">
                <p className="font-syne font-bold text-[9px] uppercase tracking-[.18em] text-[#8B6E3C]/65 mb-3">Questions?</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[11px] text-[#8B6E3C] font-semibold hover:underline break-all">{CONTACT_EMAIL}</a>
              </div>
            </div>

            {/* Main content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Quick summary banner */}
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1, duration:.5 }}
                className="bg-[#fdf9f5] border border-[#d4c8b8]/60 rounded-sm p-4 sm:p-5 mb-2">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="material-symbols-outlined text-[#8B6E3C] text-[18px]" style={{ fontVariationSettings:"'FILL' 1" }}>info</span>
                  <span className="font-syne font-bold text-[11px] uppercase tracking-[.1em] text-[#8B6E3C]">Summary — Key Points</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    ["check_circle","You own your data and caller information"],
                    ["check_circle","14-day free trial — no credit card needed"],
                    ["warning","You're responsible for call recording consent laws"],
                    ["warning","AI outputs may contain errors — verify critical info"],
                    ["info","Cancel anytime from your dashboard"],
                    ["info","Governed by Nigerian law, Lagos courts"],
                  ].map(([icon,text],i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-[#4E4439]/80">
                      <span className="material-symbols-outlined text-[14px] flex-shrink-0 mt-0.5" style={{ color:icon==="check_circle"?"#10b981":icon==="warning"?"#f59e0b":"#3b82f6", fontVariationSettings:"'FILL' 1" }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile TOC accordion trigger */}
              <div className="md:hidden bg-[#f7f2ec] border border-[#d4c8b8]/50 rounded-sm p-4 text-[12px] text-[#4E4439]/70">
                <p className="font-syne font-semibold text-[10px] uppercase tracking-[.12em] text-[#8B6E3C] mb-1">Tap any section to expand</p>
                <p>All 15 sections of these Terms are listed below. Tap the heading to read each section.</p>
              </div>

              {/* Sections */}
              <div className="space-y-0">
                {SECTIONS.map(section => (
                  <SectionBlock
                    key={section.id}
                    section={section}
                    isActive={activeSection === section.id}
                    onClick={() => toggle(section.id)}
                  />
                ))}
              </div>

              {/* Acceptance footer */}
              <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                className="mt-8 pt-6 border-t-2 border-[#f0ebe4]">
                <div className="bg-[#1a1410] rounded-sm p-5 sm:p-7 text-center">
                  <span className="material-symbols-outlined text-[#c4a97a] text-[28px] block mb-3" style={{ fontVariationSettings:"'FILL' 1" }}>handshake</span>
                  <h3 className="font-syne font-black text-white uppercase tracking-tight text-[15px] sm:text-[17px] mb-2">
                    By Using LetConvo AI
                  </h3>
                  <p className="text-white/55 text-[12px] sm:text-[13px] leading-relaxed max-w-md mx-auto mb-5">
                    You confirm that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}
                      onClick={() => setPage("getstarted")}
                      className="bg-[#8B6E3C] text-white font-syne font-bold text-[11px] uppercase tracking-[.1em] px-7 py-3 hover:bg-[#6b5228] transition-colors">
                      Accept &amp; Get Started →
                    </motion.button>
                    <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}
                      onClick={() => setPage("contact")}
                      className="border border-white/25 text-white/70 font-syne font-semibold text-[11px] uppercase tracking-[.1em] px-7 py-3 hover:bg-white/5 transition-colors">
                      Contact Us
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </main>
  );
}
