import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const LAST_UPDATED = "June 15, 2025";
const COMPANY = "LetConvo AI";
const SITE = "letconvo.live";
const CONTACT_EMAIL = "privacy@letconvo.live";

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    content: [
      `${COMPANY} ("we", "our", or "us") operates the website ${SITE} and provides AI-powered receptionist and call management services. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our platform.`,
      "By using our Services, you consent to the data practices described in this Privacy Policy. If you do not agree, please discontinue use immediately.",
    ],
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    subSections: [
      {
        heading: "Information you provide directly:",
        items: [
          "Account registration data: name, email address, phone number, business name",
          "Payment and billing information (processed securely via third-party payment processors — we do not store card numbers)",
          "Business configuration data: greeting scripts, working hours, call handling preferences",
          "Communications with our support team",
        ],
      },
      {
        heading: "Information collected automatically:",
        items: [
          "Log data: IP address, browser type, pages visited, timestamps",
          "Device information: device type, operating system, unique device identifiers",
          "Usage data: features used, call volumes, dashboard interactions",
          "Cookies and similar tracking technologies (see Section 8)",
        ],
      },
      {
        heading: "Information from your callers (on your behalf):",
        items: [
          "Caller phone numbers and names (where provided)",
          "Call recordings and transcriptions (if you have enabled this feature)",
          "Appointment details and contact information provided during AI-handled calls",
          "Sentiment and intent data derived from AI analysis of calls",
        ],
      },
      {
        heading: "Information from Google services (if you connect Google integrations):",
        items: [
          "Google Calendar: appointment data, availability, calendar event details",
          "Google Contacts: contact names and phone numbers (read-only, for caller matching)",
          "Google account email address for authentication purposes",
          "We only access Google data with your explicit consent and use it solely to provide the Services",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    items: [
      "To provide, operate, and maintain our AI receptionist Services",
      "To process and manage your account, subscription, and payments",
      "To configure and personalise your AI receptionist based on your preferences",
      "To handle and route calls, book appointments, and qualify leads on your behalf",
      "To generate call transcripts, summaries, and analytics for your dashboard",
      "To send transactional emails (account confirmations, billing receipts, service alerts)",
      "To respond to your customer support enquiries",
      "To detect, prevent, and address fraud, abuse, or security incidents",
      "To comply with legal obligations and enforce our Terms and Conditions",
      "To improve our AI models and Services using aggregated, anonymised data only",
      "We will NEVER sell your personal data or your callers' data to third parties",
    ],
  },
  {
    id: "google-data",
    title: "4. Google User Data",
    content: [
      `${COMPANY}'s use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.`,
    ],
    subSections: [
      {
        heading: "What Google data we access:",
        items: [
          "Google Calendar — to read/write appointments when you enable calendar booking",
          "Google account profile (name, email) — for account authentication only",
        ],
      },
      {
        heading: "How we use Google data:",
        items: [
          "Google data is used solely to provide the features you explicitly request",
          "We do not use Google data to show advertisements",
          "We do not allow humans to read your Google data unless you explicitly request support, it is necessary for security purposes, or required by law",
          "We do not transfer Google data to third parties except as necessary to provide the Services",
          "Google data is never used to train AI/ML models",
        ],
      },
    ],
    footer: "You can revoke our access to your Google data at any time via your Google Account settings at myaccount.google.com/permissions.",
  },
  {
    id: "data-sharing",
    title: "5. How We Share Information",
    content: [
      "We do not sell, rent, or trade your personal information. We only share data in the following limited circumstances:",
    ],
    subSections: [
      {
        heading: "Service providers (data processors):",
        items: [
          "Cloud hosting and infrastructure providers (e.g. AWS, Google Cloud)",
          "Payment processors (e.g. Stripe, Paystack) — they handle card data under their own PCI-DSS compliance",
          "SMS/communication providers for sending confirmation messages",
          "Analytics tools for aggregated, anonymised usage statistics",
        ],
      },
      {
        heading: "We may also disclose data:",
        items: [
          "When required by law, court order, or government authority",
          "To protect the rights, property, or safety of LetConvo AI, our users, or the public",
          "In connection with a business merger, acquisition, or sale of assets (you will be notified)",
          "With your explicit written consent",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    items: [
      "Account data is retained for as long as your account is active",
      "Call recordings are stored according to your plan's retention settings (default: 90 days)",
      "Call transcripts and summaries: 12 months by default, configurable in your settings",
      "Payment records: 7 years to comply with financial regulations",
      "After account deletion, we permanently delete your data within 30 days",
      "Some data may be retained longer if required by applicable law",
      "You may request early deletion of specific data at any time",
    ],
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    content: [
      "Depending on your location, you may have the following rights regarding your personal data:",
    ],
    subSections: [
      {
        heading: "You have the right to:",
        items: [
          "Access — request a copy of the personal data we hold about you",
          "Rectification — correct inaccurate or incomplete personal data",
          "Erasure — request deletion of your personal data ('right to be forgotten')",
          "Portability — receive your data in a structured, machine-readable format",
          "Restriction — ask us to limit how we process your data",
          "Objection — object to processing based on legitimate interests",
          "Withdraw consent — where processing is based on consent, withdraw it at any time",
        ],
      },
    ],
    footer: `To exercise any of these rights, contact us at ${CONTACT_EMAIL}. We will respond within 30 days. We may need to verify your identity before fulfilling requests.`,
  },
  {
    id: "cookies",
    title: "8. Cookies & Tracking",
    content: [
      "We use cookies and similar technologies to operate and improve our Services.",
    ],
    subSections: [
      {
        heading: "Types of cookies we use:",
        items: [
          "Essential cookies — required for login sessions and security (cannot be disabled)",
          "Functional cookies — remember your preferences and settings",
          "Analytics cookies — help us understand how our platform is used (aggregated data only)",
        ],
      },
    ],
    footer: "You can control cookies through your browser settings. Disabling essential cookies may prevent you from logging in or using core features.",
  },
  {
    id: "security",
    title: "9. Data Security",
    content: [
      "We implement industry-standard security measures to protect your data:",
    ],
    items: [
      "All data in transit is encrypted using TLS 1.2 or higher",
      "Data at rest is encrypted using AES-256",
      "Access to personal data is restricted to authorised personnel on a need-to-know basis",
      "Regular security audits and vulnerability assessments",
      "Multi-factor authentication available for all accounts",
      "Incident response procedures to notify affected users in the event of a breach",
    ],
    footer: "No method of electronic transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.",
  },
  {
    id: "children",
    title: "10. Children's Privacy",
    content: [
      `Our Services are not directed to children under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at ${CONTACT_EMAIL} and we will delete it immediately.`,
    ],
  },
  {
    id: "international",
    title: "11. International Data Transfers",
    content: [
      "LetConvo AI is based in Nigeria and our primary servers are located in Nigeria and the European Union. If you access our Services from outside Nigeria, your data may be transferred to and processed in countries with different data protection laws.",
      "For transfers from the European Economic Area (EEA), we rely on Standard Contractual Clauses approved by the European Commission. For transfers involving UK users, we comply with UK GDPR requirements.",
      "By using our Services, you consent to the transfer of your information to our facilities and to those third parties with whom we share it as described in this Privacy Policy.",
    ],
  },
  {
    id: "legal-basis",
    title: "12. Legal Basis for Processing (GDPR & NDPR)",
    content: [
      "For users in the European Economic Area (EEA), United Kingdom, and Nigeria, we process personal data under the following legal bases:",
    ],
    items: [
      "Contract performance — processing necessary to provide the Services you've subscribed to",
      "Legitimate interests — fraud prevention, security, improving our Services",
      "Legal obligation — complying with applicable laws and regulations",
      "Consent — for optional features like marketing emails or certain Google integrations",
    ],
  },
  {
    id: "third-party",
    title: "13. Third-Party Links & Services",
    content: [
      "Our platform may contain links to third-party websites or integrate with third-party services (e.g. Google Calendar, CRM platforms). This Privacy Policy does not apply to those third-party services. We encourage you to review their privacy policies before sharing any personal data with them.",
    ],
  },
  {
    id: "changes",
    title: "14. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email and/or by posting a notice on our platform at least 14 days before the change takes effect.",
      "Your continued use of our Services after the effective date of the updated Privacy Policy constitutes your acceptance of the changes.",
    ],
  },
  {
    id: "contact",
    title: "15. Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy team:",
    ],
    items: [
      `Email: ${CONTACT_EMAIL}`,
      `Website: https://${SITE}`,
      "LetConvo AI, Victoria Island, Lagos, Nigeria",
      "We aim to respond to all privacy enquiries within 5 business days",
    ],
  },
];

function SectionBlock({ section, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.08 }}
      transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
      id={section.id}
      className="scroll-mt-20"
    >
      <div className="flex items-start justify-between gap-4 cursor-pointer md:cursor-default py-1" onClick={onClick}>
        <h2 className="font-syne font-black text-[#1A1614] uppercase tracking-tight leading-tight"
          style={{ fontSize:"clamp(13px,2vw,16px)" }}>
          {section.title}
        </h2>
        <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration:0.22 }}
          className="material-symbols-outlined text-[#8B6E3C] text-[18px] flex-shrink-0 mt-0.5 md:hidden">
          expand_more
        </motion.span>
      </div>

      <div className={`md:block ${isActive ? "block" : "hidden"}`}>
        <div className="mt-3 space-y-3">
          {section.content?.map((para,i) => (
            <p key={i} className="text-[#4E4439]/80 leading-relaxed text-[12.5px] sm:text-[13px]">{para}</p>
          ))}
          {section.items && (
            <ul className="space-y-2 mt-2">
              {section.items.map((item,i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-[#4E4439]/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B6E3C] flex-shrink-0 mt-[6px]" />{item}
                </li>
              ))}
            </ul>
          )}
          {section.subSections?.map((sub,si) => (
            <div key={si} className="mt-3">
              <p className="font-syne font-semibold text-[10.5px] uppercase tracking-[.1em] text-[#8B6E3C] mb-2">{sub.heading}</p>
              <ul className="space-y-2">
                {sub.items.map((item,i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-[#4E4439]/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B6E3C] flex-shrink-0 mt-[6px]" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {section.footer && (
            <p className="text-[12px] sm:text-[12.5px] text-[#4E4439]/70 mt-3 italic border-l-2 border-[#8B6E3C]/30 pl-3">{section.footer}</p>
          )}
        </div>
        <div className="h-px bg-[#f0ebe4] mt-6 md:mt-8" />
      </div>
    </motion.div>
  );
}

export default function PrivacyPage({ setPage }) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    window.scrollTo({ top:0, behavior:"instant" });
  }, []);

  const toggle = id => setActiveSection(prev => prev === id ? null : id);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });

  return (
    <main style={{ position:"relative", zIndex:10 }}>
      {/* ── Hero ── */}
      <section className="relative pt-[52px] overflow-hidden" style={{ background:"linear-gradient(160deg,#1a1410 0%,#2d2010 60%,#1a1410 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.05,duration:.5,ease:[.16,1,.3,1]}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-700/15 mb-5">
            <span className="material-symbols-outlined text-amber-400 text-[13px]">shield</span>
            <span className="font-syne font-semibold text-[9px] uppercase tracking-[.18em] text-amber-300/80">Legal Document</span>
          </motion.div>

          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.6,ease:[.16,1,.3,1]}}
            className="font-syne font-black text-white uppercase leading-tight tracking-[-0.02em] mb-4"
            style={{ fontSize:"clamp(26px,5vw,50px)" }}>
            Privacy Policy
          </motion.h1>

          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.22,duration:.5}}
            className="text-white/65 text-[13px] sm:text-[14px] leading-relaxed max-w-md mb-6">
            We take your privacy seriously. This policy explains exactly what data we collect, why we collect it, and how we protect it.
          </motion.p>

          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}
            className="flex flex-wrap gap-3 sm:gap-5 text-[11px] sm:text-[11.5px] text-white/45">
            <span>Last updated: <strong className="text-white/70">{LAST_UPDATED}</strong></span>
            <span className="hidden sm:inline">·</span>
            <span>Applies to all LetConvo AI services</span>
            <span className="hidden sm:inline">·</span>
            <span>GDPR · NDPR · Google API compliant</span>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      </section>

      {/* ── Body ── */}
      <section className="relative z-10 px-4 sm:px-6 py-10 sm:py-14" style={{ background:"rgba(255,255,255,0.98)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 lg:gap-14 items-start">

            {/* Desktop sidebar TOC */}
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
                <p className="font-syne font-bold text-[9px] uppercase tracking-[.18em] text-[#8B6E3C]/65 mb-2">Privacy Contact</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[11px] text-[#8B6E3C] font-semibold hover:underline break-all">{CONTACT_EMAIL}</a>
              </div>
            </div>

            {/* Main content */}
            <div className="space-y-6 sm:space-y-8">

              {/* Google API compliance badge */}
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.5}}
                className="bg-[#fdf9f5] border border-[#d4c8b8]/60 rounded-sm p-4 sm:p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="material-symbols-outlined text-[#8B6E3C] text-[20px] flex-shrink-0" style={{ fontVariationSettings:"'FILL' 1" }}>verified_user</span>
                  <div>
                    <p className="font-syne font-bold text-[11px] uppercase tracking-[.1em] text-[#8B6E3C] mb-1">Google API Compliance</p>
                    <p className="text-[12px] text-[#4E4439]/75 leading-relaxed">
                      LetConvo AI's use of Google APIs complies with the{" "}
                      <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-[#8B6E3C] underline">
                        Google API Services User Data Policy
                      </a>
                      , including the Limited Use requirements. We never use Google user data to serve ads or train AI models.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Key commitments summary */}
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.15,duration:.5}}
                className="bg-[#f7f2ec] border border-[#d4c8b8]/50 rounded-sm p-4 sm:p-5">
                <p className="font-syne font-bold text-[10px] uppercase tracking-[.14em] text-[#8B6E3C] mb-3">Our Core Commitments</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    ["check_circle","We never sell your personal data"],
                    ["check_circle","Google data is never used for ads or AI training"],
                    ["check_circle","You can delete your data at any time"],
                    ["check_circle","All data is encrypted in transit and at rest"],
                    ["check_circle","We are GDPR and NDPR compliant"],
                    ["check_circle","We notify you within 72 hours of any data breach"],
                  ].map(([icon,text],i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-[#4E4439]/80">
                      <span className="material-symbols-outlined text-[#10b981] text-[14px] flex-shrink-0" style={{ fontVariationSettings:"'FILL' 1" }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile hint */}
              <div className="md:hidden bg-white border border-[#d4c8b8]/50 rounded-sm px-4 py-3 text-[11.5px] text-[#4E4439]/60">
                Tap any section heading to expand it.
              </div>

              {/* All sections */}
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

              {/* Bottom CTA */}
              <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                className="mt-8 pt-6 border-t-2 border-[#f0ebe4]">
                <div className="bg-[#1a1410] rounded-sm p-5 sm:p-7 text-center">
                  <span className="material-symbols-outlined text-[#c4a97a] text-[28px] block mb-3" style={{ fontVariationSettings:"'FILL' 1" }}>lock</span>
                  <h3 className="font-syne font-black text-white uppercase tracking-tight text-[14px] sm:text-[16px] mb-2">
                    Your Privacy is Protected
                  </h3>
                  <p className="text-white/55 text-[12px] sm:text-[13px] leading-relaxed max-w-md mx-auto mb-5">
                    Questions about how we handle your data? Our privacy team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={`mailto:${CONTACT_EMAIL}`}
                      className="bg-[#8B6E3C] text-white font-syne font-bold text-[11px] uppercase tracking-[.1em] px-7 py-3 hover:bg-[#6b5228] transition-colors inline-block text-center">
                      Contact Privacy Team
                    </a>
                    <motion.button whileHover={{scale:1.04}} whileTap={{scale:.97}}
                      onClick={() => setPage("getstarted")}
                      className="border border-white/25 text-white/70 font-syne font-semibold text-[11px] uppercase tracking-[.1em] px-7 py-3 hover:bg-white/5 transition-colors">
                      Get Started →
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
