import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { PAGE_PATHS } from "../config/routes";

// Kept as plain data (not imported from BlogPostPage.jsx) to avoid a
// circular import between the two page modules.
const RELATED_GUIDES = [
  { id: "after-hours-call-answering-service", title: "After-Hours Call Answering Service: How Small Businesses Stop Losing Nighttime Calls" },
  { id: "ai-phone-answering-service-for-service-businesses", title: "AI Phone Answering Service for Service Businesses: A Practical Guide" },
];

const PAGES = {
  "ai-receptionist-for-small-business": {
    eyebrow: "AI receptionist for small business",
    title: "Answer every business call without adding another full-time role.",
    description: "Letconvo is an AI receptionist for small businesses that answers calls, captures leads, answers customer questions, and books appointments 24/7.",
    audience: "small businesses that depend on phone enquiries and appointments",
    painPoint: "Every unanswered call is a customer who found somebody else. Small teams don't have a spare person to sit by the phone, so calls that arrive mid-task, mid-lunch, or after close go to voicemail — and most callers don't leave a message, they just call the next business.",
    benefits: [
      ["phone_in_talk", "Answer every call", "Letconvo picks up even when your team is mid-rush, with a customer, or the office is closed."],
      ["support_agent", "Sound like a real front desk", "Your greeting, hours, and services, delivered consistently, without hiring for it."],
      ["person_add", "Capture every lead", "Name, number, reason for calling — ready for your team to follow up."],
      ["event_available", "Book without back-and-forth", "Checks your real calendar and confirms the appointment on the spot."],
    ],
    faq: [
      { q: "Do I need technical skills to set this up?", a: "No. You provide your business details, hours, and booking rules through a simple setup, and Letconvo handles the calls from there." },
      { q: "What happens on calls the AI can't handle?", a: "Letconvo captures the caller's details and reason for calling so your team has everything needed to follow up directly." },
      { q: "Does it work with my existing business number?", a: "Yes. Letconvo is set up to answer calls to the number your customers already use." },
    ],
  },
  "ai-receptionist-for-plumbers": {
    eyebrow: "AI receptionist for plumbers",
    title: "Keep plumbing leads moving while your team is on the job.",
    description: "Letconvo is an AI receptionist for plumbing businesses that answers calls, captures service enquiries, and books appointments when your team cannot get to the phone.",
    audience: "plumbing businesses and field-service teams",
    framing: "Letconvo is an AI receptionist for small businesses — this is what it looks like for plumbing and field-service teams.",
    painPoint: "Your team is usually on a job, not standing next to a phone. A caller with a burst pipe won't wait for a callback — they're already dialing the next plumber in the search results.",
    benefits: [
      ["phone_in_talk", "Answers while your team is on-site", "Captures the address, issue, and urgency without pulling anyone off the job."],
      ["location_on", "Knows your service area", "Tells callers upfront whether you cover their location."],
      ["emergency", "Triages real emergencies", "Flags urgency — burst pipe vs. routine fix — so you know what to call back first."],
      ["event_available", "Books the job", "Checks open slots and locks in an appointment, not just a message."],
    ],
    faq: [
      { q: "Can it tell an emergency from a routine call?", a: "Yes. Letconvo asks about the issue and captures how urgent it is, so your team can prioritize call-backs correctly." },
      { q: "Does it know which areas I service?", a: "Yes. You configure your service area, and Letconvo lets callers know upfront whether you cover their location." },
      { q: "What if a customer wants a quote over the phone?", a: "Letconvo captures the job details needed for a quote and passes them to your team — it doesn't guess at pricing on your behalf." },
    ],
  },
  "ai-receptionist-for-salons": {
    eyebrow: "AI receptionist for salons",
    title: "Give every salon caller a professional answer and an easy way to book.",
    description: "Letconvo is an AI receptionist for salons that answers customer calls, handles common questions, and helps clients book appointments around the clock.",
    audience: "salons, beauty businesses, and appointment-led teams",
    framing: "Letconvo is an AI receptionist for small businesses — this is what it looks like for salons and appointment-led teams.",
    painPoint: "A stylist mid-appointment can't step away to answer the phone. A caller wanting to book today won't wait — they'll call the next salon instead.",
    benefits: [
      ["phone_in_talk", "Answers while your hands are full", "No more choosing between the client in the chair and the phone."],
      ["event_available", "Checks real availability", "Books against your actual schedule, not a guess."],
      ["forum", "Shares services & pricing", "Answers the questions callers ask before they book."],
      ["check_circle", "Reduces no-shows", "Confirms details clearly so appointments actually get honored."],
    ],
    faq: [
      { q: "Can it book with a specific stylist?", a: "Yes, if you configure staff-level availability, Letconvo can check and book against a specific stylist's schedule." },
      { q: "Can it answer questions about services and pricing?", a: "Yes. You provide your service list and pricing, and Letconvo gives callers consistent answers." },
      { q: "Does it handle cancellations and rescheduling?", a: "Yes. Callers can look up an existing booking and reschedule or cancel it directly." },
    ],
  },
  "ai-receptionist-for-clinics": {
    eyebrow: "AI receptionist for clinics",
    title: "Support clinic callers when your front desk is busy.",
    description: "Letconvo is an AI receptionist for clinics that answers incoming calls, captures enquiries, provides approved business information, and helps manage appointment requests.",
    audience: "clinics and healthcare practices that need reliable call coverage",
    framing: "Letconvo is an AI receptionist for small businesses — this is what it looks like for clinics and healthcare practices.",
    painPoint: "Your front desk is juggling patients in the waiting room and the phone at the same time. Calls during lunch or after hours go unanswered — some from patients with a real, time-sensitive need.",
    benefits: [
      ["support_agent", "Covers your front desk", "During rushes, lunch, and after hours."],
      ["forum", "Gives consistent, approved answers", "Hours, location, accepted information, and policies, every time."],
      ["event_available", "Handles appointment requests", "Checks availability and schedules without tying up staff."],
      ["assignment", "Reduces phone-tag", "Captures full details so your team can follow up efficiently."],
    ],
    faq: [
      { q: "Will it give medical advice to callers?", a: "No. Letconvo shares the approved business information you provide — it does not give medical advice." },
      { q: "Can it handle appointment scheduling?", a: "Yes. It checks your configured availability and can book, reschedule, or cancel appointment requests." },
      { q: "Is caller information kept confidential?", a: "Yes. Caller details are only used to route the call and inform your team's follow-up." },
    ],
  },
  "ai-receptionist-for-law-firms": {
    eyebrow: "AI receptionist for law firms",
    title: "Capture legal enquiries before they call the next firm.",
    description: "Letconvo is an AI receptionist for law firms that answers calls, captures prospective-client details, and provides clear information when your office is unavailable.",
    audience: "law firms and legal practices that rely on new-client calls",
    framing: "Letconvo is an AI receptionist for small businesses — this is what it looks like for law firms and legal practices.",
    painPoint: "Someone who just had an accident or got served papers is often calling several firms in the same hour. The firm that actually answers — not the one with the best website — usually gets the case.",
    benefits: [
      ["phone_in_talk", "Answers immediately", "Prospective clients call around; the first firm to respond often wins the matter."],
      ["assignment", "Captures real intake details", "Name, contact info, and the nature of the matter, ready for attorney review."],
      ["gavel", "Represents your firm consistently", "Practice areas and next steps, on every call."],
      ["filter_alt", "Filters and prioritizes", "So your team focuses first on the calls that matter most."],
    ],
    faq: [
      { q: "Can it give legal advice?", a: "No. Letconvo captures intake details only — it does not provide legal advice to callers." },
      { q: "Is caller information handled securely?", a: "Yes. Intake details are captured to be reviewed by your team, not shared beyond your firm." },
      { q: "Can it schedule consultations?", a: "Yes. Letconvo can check your configured availability and schedule a consultation directly." },
    ],
  },
  "missed-call-lead-capture": {
    eyebrow: "Missed-call lead capture",
    title: "Do not let a missed call become a lost lead.",
    description: "Letconvo captures leads from incoming business calls by answering customers, collecting their details, and keeping the conversation moving when your team is busy.",
    audience: "businesses that lose opportunities when calls go unanswered",
    framing: "Letconvo is an AI receptionist for small businesses — this is how it stops missed calls from becoming lost leads.",
    painPoint: "Voicemail isn't a safety net — it's a filter that quietly removes your least patient, often most valuable, leads. A caller comparing a few businesses rarely leaves a message and waits.",
    benefits: [
      ["phone_in_talk", "Never sends a caller to voicemail", "Answers instead of dropping to an automated greeting."],
      ["person_add", "Captures the details that matter", "Name, number, reason for calling, and urgency."],
      ["insights", "Gives your team real context", "No more guessing who called or why."],
      ["schedule", "Works around every gap", "Busy periods, lunch breaks, after hours, sick days."],
    ],
    faq: [
      { q: "How is this different from voicemail?", a: "Letconvo has an actual conversation with the caller and captures structured details, instead of leaving them with a beep and a hope they call back." },
      { q: "Where do captured leads go?", a: "Details are logged for your team to follow up, with the full context of why the person called." },
      { q: "Does it cover calls during business hours too, or just missed ones?", a: "Both. Letconvo can answer every call, or just the ones your team can't get to — however you configure it." },
    ],
  },
  "ai-appointment-booking": {
    eyebrow: "AI appointment booking",
    title: "Let callers book while their interest is still high.",
    description: "Letconvo is an AI appointment booking assistant that answers calls, checks configured availability, and helps customers book or reschedule appointments.",
    audience: "appointment-based businesses that want less scheduling work",
    framing: "Letconvo is an AI receptionist for small businesses — this is how it handles appointment booking automatically.",
    painPoint: "Manual scheduling means back-and-forth calls, double-booking risk, and appointments that live on a sticky note instead of a calendar.",
    benefits: [
      ["event_available", "Books against your real calendar", "No double-bookings, no manual back-and-forth."],
      ["event_repeat", "Lets callers reschedule or cancel", "Without another round of calls with your team."],
      ["fact_check", "Confirms details clearly", "Service, date, and time, so nothing gets miscommunicated."],
      ["check_circle", "Reduces no-shows", "A properly confirmed appointment holds better than a scribbled note."],
    ],
    faq: [
      { q: "Which calendars does it work with?", a: "Letconvo checks the availability and booking rules you configure for your business." },
      { q: "Can it handle cancellations and rescheduling, not just new bookings?", a: "Yes. Callers can look up an existing booking and change or cancel it directly." },
      { q: "What happens if the caller wants a time that's not available?", a: "Letconvo lets them know the slot isn't open and offers the closest available times instead." },
    ],
  },
};

export { PAGES as SEO_LANDING_PAGES };

export default function SeoLandingPage({ pageId, setPage }) {
  const page = PAGES[pageId] || PAGES["ai-receptionist-for-small-business"];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="relative z-10 pt-[52px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
        <div className="max-w-5xl mx-auto">
          {page.framing && (
            <Reveal className="mb-3">
              <p className="text-[#8B6E3C] text-[12px] sm:text-[13px] italic">{page.framing}</p>
            </Reveal>
          )}
          <Reveal delay={0.04} className="mb-8 sm:mb-10">
            <p className="text-[#4E4439]/75 text-[13px] sm:text-[14.5px] max-w-2xl leading-relaxed">{page.painPoint}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
            {page.benefits.map(([icon, title, copy], index) => (
              <Reveal key={title} delay={index * .06}>
                <article className="h-full bg-[#fdfaf6] border border-[#d4c8b8]/55 p-5 sm:p-6">
                  <span className="material-symbols-outlined text-[#8B6E3C] text-[21px]">{icon}</span>
                  <h2 className="font-syne font-bold uppercase tracking-[.06em] text-[#1A1614] text-[11px] sm:text-[12px] mt-4 mb-2">{title}</h2>
                  <p className="text-[#4E4439]/70 leading-relaxed text-[11.5px] sm:text-[12px]">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-[#fdf8f3] border-t border-[#d4c8b8]/45">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-6 sm:mb-8">
            <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65 mb-2">Common Questions</p>
            <h2 className="font-syne font-black uppercase tracking-tight text-[#1A1614] leading-tight" style={{ fontSize:"clamp(20px,3vw,28px)" }}>Questions About {page.eyebrow}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {page.faq.map((item, index) => (
              <Reveal key={item.q} delay={index * 0.05}>
                <article className="border-t border-[#d4c8b8]/60 py-4 sm:py-5">
                  <h3 className="font-syne font-bold text-[#1A1614] text-[12px] sm:text-[13px] leading-snug">{item.q}</h3>
                  <p className="text-[#4E4439]/70 leading-relaxed text-[12px] sm:text-[12.5px] mt-2">{item.a}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <Reveal>
            <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65 mb-4">Other Solutions</p>
            <ul className="flex flex-col gap-2.5">
              {Object.entries(PAGES).filter(([id]) => id !== pageId).map(([id, p]) => (
                <li key={id}>
                  <a href={PAGE_PATHS[id]} onClick={(event) => { event.preventDefault(); setPage(id); }}
                    className="text-[12px] text-[#4E4439]/65 hover:text-[#8B6E3C] transition-colors">
                    {p.eyebrow}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65 mb-4">Related Reading</p>
            <ul className="flex flex-col gap-3.5">
              {RELATED_GUIDES.map((guide) => (
                <li key={guide.id}>
                  <a href={PAGE_PATHS[guide.id]} onClick={(event) => { event.preventDefault(); setPage(guide.id); }}
                    className="text-[12px] font-semibold text-[#1A1614] hover:text-[#8B6E3C] transition-colors leading-snug block">
                    {guide.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Footer setPage={setPage} />
    </main>
  );
}
