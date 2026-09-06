import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const PAGES = {
  "ai-receptionist-for-small-business": {
    eyebrow: "AI receptionist for small business",
    title: "Answer every business call without adding another full-time role.",
    description: "Letconvo is an AI receptionist for small businesses that answers calls, captures leads, answers customer questions, and books appointments 24/7.",
    audience: "small businesses that depend on phone enquiries and appointments",
  },
  "ai-receptionist-for-plumbers": {
    eyebrow: "AI receptionist for plumbers",
    title: "Keep plumbing leads moving while your team is on the job.",
    description: "Letconvo is an AI receptionist for plumbing businesses that answers calls, captures service enquiries, and books appointments when your team cannot get to the phone.",
    audience: "plumbing businesses and field-service teams",
  },
  "ai-receptionist-for-salons": {
    eyebrow: "AI receptionist for salons",
    title: "Give every salon caller a professional answer and an easy way to book.",
    description: "Letconvo is an AI receptionist for salons that answers customer calls, handles common questions, and helps clients book appointments around the clock.",
    audience: "salons, beauty businesses, and appointment-led teams",
  },
  "ai-receptionist-for-clinics": {
    eyebrow: "AI receptionist for clinics",
    title: "Support clinic callers when your front desk is busy.",
    description: "Letconvo is an AI receptionist for clinics that answers incoming calls, captures enquiries, provides approved business information, and helps manage appointment requests.",
    audience: "clinics and healthcare practices that need reliable call coverage",
  },
  "ai-receptionist-for-law-firms": {
    eyebrow: "AI receptionist for law firms",
    title: "Capture legal enquiries before they call the next firm.",
    description: "Letconvo is an AI receptionist for law firms that answers calls, captures prospective-client details, and provides clear information when your office is unavailable.",
    audience: "law firms and legal practices that rely on new-client calls",
  },
  "missed-call-lead-capture": {
    eyebrow: "Missed-call lead capture",
    title: "Do not let a missed call become a lost lead.",
    description: "Letconvo captures leads from incoming business calls by answering customers, collecting their details, and keeping the conversation moving when your team is busy.",
    audience: "businesses that lose opportunities when calls go unanswered",
  },
  "ai-appointment-booking": {
    eyebrow: "AI appointment booking",
    title: "Let callers book while their interest is still high.",
    description: "Letconvo is an AI appointment booking assistant that answers calls, checks configured availability, and helps customers book or reschedule appointments.",
    audience: "appointment-based businesses that want less scheduling work",
  },
};

export { PAGES as SEO_LANDING_PAGES };

export default function SeoLandingPage({ pageId, setPage }) {
  const page = PAGES[pageId] || PAGES["ai-receptionist-for-small-business"];
  const benefits = [
    ["phone_in_talk", "Answer every caller", "Letconvo responds when your team is busy, serving a customer, or closed."],
    ["person_add", "Capture lead details", "Collect the caller's name, number, reason for calling, and the information your team needs next."],
    ["event_available", "Book appointments", "Help callers request, find, or update appointments using the hours and booking rules you set."],
    ["forum", "Give useful answers", "Provide consistent answers about your services, hours, policies, and approved business information."],
  ];

  return (
    <main className="relative z-10 pt-[52px]">
      <section className="px-4 sm:px-6 py-14 sm:py-20 bg-[#fdf8f3] border-b border-[#d4c8b8]/45">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65 mb-3">{page.eyebrow}</p>
            <h1 className="font-syne font-black uppercase tracking-tight text-[#1A1614] leading-tight max-w-4xl" style={{ fontSize:"clamp(30px,5vw,52px)" }}>{page.title}</h1>
            <p className="text-[#4E4439]/70 text-[13px] sm:text-[15px] mt-4 max-w-2xl leading-relaxed">Letconvo gives {page.audience} an AI phone receptionist that captures leads, answers common questions, and helps customers take the next step.</p>
            <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }} onClick={() => setPage("getstarted")}
              className="mt-6 bg-[#8B6E3C] text-white font-syne font-bold uppercase tracking-[.12em] px-7 py-3 text-[11px] hover:bg-[#6b5228] transition-colors">Get Started Free</motion.button>
          </Reveal>
        </div>
      </section>
      <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {benefits.map(([icon, title, copy], index) => <Reveal key={title} delay={index * .06}><article className="h-full bg-[#fdfaf6] border border-[#d4c8b8]/55 p-5 sm:p-6"><span className="material-symbols-outlined text-[#8B6E3C] text-[21px]">{icon}</span><h2 className="font-syne font-bold uppercase tracking-[.06em] text-[#1A1614] text-[11px] sm:text-[12px] mt-4 mb-2">{title}</h2><p className="text-[#4E4439]/70 leading-relaxed text-[11.5px] sm:text-[12px]">{copy}</p></article></Reveal>)}
        </div>
      </section>
      <Footer setPage={setPage} />
    </main>
  );
}
