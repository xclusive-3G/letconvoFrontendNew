import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { PAGE_PATHS } from "../config/routes";
import { BLOG_POSTS } from "./BlogPostPage";

const GUIDES = Object.entries(BLOG_POSTS).map(([id, post]) => ({ id, ...post }));

const ARTICLES = [
  {
    question: "How do I stop losing leads from missed calls?",
    answer: "Letconvo helps you stop losing leads to missed calls by answering your business phone when your team is busy, with a customer, or unavailable. Instead of sending a potential customer to voicemail, Letconvo can have the conversation, collect their details and reason for calling, and keep the opportunity moving."
  },
  {
    question: "Can an AI receptionist book appointments?",
    answer: "Yes. Letconvo can check the availability and business hours you set, book an appointment for a caller, and help them find or update an existing booking. This gives callers a faster way to schedule while reducing manual booking work for your team."
  },
  {
    question: "Can AI answer my business phone?",
    answer: "Yes. Letconvo is an AI phone receptionist built to answer incoming business calls. It uses the greeting, service details, policies, and booking information you provide to give callers a consistent, professional first response."
  },
  {
    question: "What is an AI receptionist?",
    answer: "An AI receptionist is a voice assistant that answers business calls and handles routine customer conversations. Letconvo acts as your AI receptionist by answering calls, capturing leads, responding to common questions, and helping callers book appointments—without requiring a person to answer every call."
  },
  {
    question: "How can I answer calls after business hours?",
    answer: "Letconvo gives your business a way to respond when your office is closed or your team is unavailable. Your AI receptionist can answer after-hours calls, collect enquiries, provide useful business information, and handle appointment requests so callers are not left without a response."
  },
  {
    question: "Can an AI receptionist answer customer questions?",
    answer: "Yes. Letconvo can answer the customer questions you prepare it for, including questions about your services, opening hours, location, booking policies, and other business information. This helps callers get quick answers while keeping your communication consistent."
  },
  {
    question: "How do I capture leads when I miss a call?",
    answer: "With Letconvo, your business does not have to rely on callers leaving a voicemail. The AI receptionist can answer the call, collect contact information and the caller's needs, and record the conversation so your team has the context needed for a meaningful follow-up."
  },
  {
    question: "Is an AI receptionist good for a small business?",
    answer: "For small businesses that depend on phone enquiries and appointments, Letconvo can provide reliable call coverage without adding a full-time receptionist. It is especially useful when a small team is serving customers, working in the field, or unable to answer every call immediately."
  },
];

export default function BlogPage({ setPage }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ARTICLES.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="relative z-10 pt-[52px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="px-4 sm:px-6 py-14 sm:py-20 bg-[#fdf8f3] border-b border-[#d4c8b8]/45">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65 mb-3">Letconvo Insights</p>
            <h1 className="font-syne font-black uppercase tracking-tight text-[#1A1614] leading-tight" style={{ fontSize:"clamp(30px,5vw,52px)", maxWidth:760 }}>
              Answers for businesses that cannot afford to miss a call.
            </h1>
            <p className="text-[#4E4439]/70 text-[13px] sm:text-[15px] mt-4 max-w-2xl leading-relaxed">
              Learn how Letconvo helps businesses capture more leads, answer customer questions, and book appointments with an AI phone receptionist.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-[#fdf8f3] border-b border-[#d4c8b8]/45">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-6 sm:mb-8">
            <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65">Guides</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {GUIDES.map((guide, index) => (
              <Reveal key={guide.id} delay={index * 0.05}>
                <a href={PAGE_PATHS[guide.id]} onClick={(event) => { event.preventDefault(); setPage(guide.id); }}
                  className="block h-full border border-[#d4c8b8]/55 bg-white p-5 sm:p-7 hover:border-[#8B6E3C]/60 transition-colors">
                  <p className="font-syne font-semibold text-[9px] uppercase tracking-[.15em] text-[#8B6E3C]/65 mb-3">{guide.eyebrow}</p>
                  <h2 className="font-syne font-black text-[#1A1614] leading-snug text-[16px] sm:text-[18px]">{guide.title}</h2>
                  <p className="text-[#4E4439]/75 leading-relaxed text-[12.5px] sm:text-[13px] mt-3">{guide.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {ARTICLES.map((article, index) => (
            <Reveal key={article.question} delay={index * 0.04}>
              <article className="h-full border border-[#d4c8b8]/55 bg-[#fdfaf6] p-5 sm:p-7">
                <div className="font-syne font-bold text-[#8B6E3C] text-[10px] uppercase tracking-[.15em] mb-4">{String(index + 1).padStart(2, "0")}</div>
                <h2 className="font-syne font-black text-[#1A1614] leading-snug text-[16px] sm:text-[18px]">{article.question}</h2>
                <p className="text-[#4E4439]/75 leading-relaxed text-[12.5px] sm:text-[13px] mt-3">{article.answer}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-14 sm:py-18 bg-[#8B6E3C] text-center">
        <Reveal>
          <h2 className="font-syne font-black uppercase tracking-tight text-white" style={{ fontSize:"clamp(25px,4vw,40px)" }}>Ready to stop missing opportunities?</h2>
          <p className="text-white/75 text-[12.5px] sm:text-[14px] mt-3 max-w-xl mx-auto leading-relaxed">Letconvo gives every caller a professional response, even when your team cannot get to the phone.</p>
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }} onClick={() => setPage("getstarted")}
            className="mt-6 bg-white text-[#6b5228] font-syne font-bold uppercase tracking-[.12em] px-8 py-3.5 text-[11px] hover:bg-[#f7f2ec] transition-colors">
            Get Started Free
          </motion.button>
        </Reveal>
      </section>
      <Footer setPage={setPage} />
    </main>
  );
}
