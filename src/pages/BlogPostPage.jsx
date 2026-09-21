import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { PAGE_PATHS } from "../config/routes";

const POSTS = {
  "after-hours-call-answering-service": {
    eyebrow: "After-Hours Call Answering",
    title: "After-Hours Call Answering Service: How Small Businesses Stop Losing Nighttime Calls",
    description: "An after-hours call answering service keeps your business reachable outside office hours. See how it works, what it costs to skip one, and how an AI receptionist compares to a live answering service.",
    sections: [
      {
        heading: "Why after-hours calls matter more than they seem to",
        paragraphs: [
          "Most small businesses close for the day and let the phone go quiet with them. But callers don't work on your schedule — someone searching for a plumber at 9pm, a salon at 7am before work, or a clinic at midnight because a symptom won't wait is a real lead with a real, immediate need. If that call reaches voicemail, a meaningful share of those callers simply call the next business on the list instead of leaving a message.",
          "An after-hours call answering service exists to close that gap: a way for a business to keep answering calls, capturing details, and giving callers a real response even when no one on the team is available to pick up the phone.",
        ],
      },
      {
        heading: "What an after-hours answering service actually does",
        paragraphs: [
          "At its core, an after-hours answering service picks up calls that arrive outside your normal working hours (or during hours you've marked as closed) and handles them instead of routing to voicemail. Depending on the service, that can mean anything from a human answering service reading a script, to an AI receptionist like Letconvo that can hold a real conversation — greeting the caller, answering common questions about your business, capturing their name, number, and reason for calling, and even booking or checking an appointment against your actual schedule.",
          "The goal isn't to replace your team's judgement on complex calls — it's to make sure no caller is met with silence, and that whoever calls in the morning has a clear, accurate record of who called and why.",
        ],
      },
      {
        heading: "The real cost of relying on voicemail after hours",
        paragraphs: [
          "Voicemail feels like a safety net, but it behaves more like a filter that quietly removes your least patient — and often most valuable — leads. A caller who is comparing a few local businesses rarely leaves a message and waits; they move to whichever business actually answers. For appointment-based businesses especially (salons, clinics, contractors, law firms), the caller who reaches out after hours is frequently someone who is ready to book right now, not someone doing early research.",
          "The cost isn't just the missed call itself — it's the lead going to a competitor who happened to have coverage at that hour.",
        ],
      },
      {
        heading: "AI receptionist vs. traditional answering service",
        paragraphs: [
          "Traditional live answering services staff a call center with human agents working in shifts, which covers after-hours calls but usually means a generic script, per-minute or per-call pricing, and a message that gets relayed to you rather than resolved on the call.",
          "An AI phone receptionist like Letconvo instead uses the specific information you provide — your services, hours, booking policies, and FAQs — to answer callers directly, in your business's voice, every time a call comes in, at any hour. It can check your real availability and book an appointment on the spot instead of just taking a message, which matters most exactly when a live team isn't around to follow up quickly.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "If your business currently sends after-hours calls to voicemail, the fastest way to see the difference is to try answering just one shift's worth of calls with an AI receptionist and compare what you get back the next morning: real caller details and, where relevant, real bookings, instead of a handful of unreturned voicemail notifications.",
        ],
      },
    ],
  },
  "ai-phone-answering-service-for-service-businesses": {
    eyebrow: "AI Phone Answering for Service Businesses",
    title: "AI Phone Answering Service for Service Businesses: A Practical Guide",
    description: "Service businesses lose more leads to missed calls than almost any other type of business, because the team is usually on a job, not at a desk. Here's how an AI phone answering service fits into how service businesses actually work.",
    sections: [
      {
        heading: "Why service businesses miss more calls than most",
        paragraphs: [
          "Plumbers, electricians, HVAC technicians, cleaners, landscapers, and similar service businesses share one operational reality: the people who could answer the phone are usually on a job, driving between jobs, or working with their hands, not sitting at a desk. That's exactly when a new customer calls to book service — and exactly when the call is hardest to answer.",
          "Unlike an office-based business, adding a full-time receptionist to solve this often doesn't make financial sense for a small crew. That's the specific gap an AI phone answering service is built to fill.",
        ],
      },
      {
        heading: "What it looks like in practice",
        paragraphs: [
          "An AI phone answering service for a service business answers every inbound call using the details you've configured — your services, service area, pricing approach, and availability — and handles the conversation the way a well-trained front-desk person would: greeting the caller, answering routine questions (\"do you service this area,\" \"are you available this week\"), collecting the job details and contact information, and booking or scheduling an appointment directly against your real calendar rather than just taking a message.",
          "Because it answers instantly regardless of what the field team is doing, it removes the tradeoff between being on a job and being reachable — both happen at once.",
        ],
      },
      {
        heading: "Where it fits alongside your team, not instead of it",
        paragraphs: [
          "The most effective setup isn't \"AI replaces the phone\" — it's AI handling the call the moment it comes in, so nothing goes to voicemail, while your team still makes the judgment calls that need a person: quoting an unusual job, handling a complaint, or a customer who specifically asks for a callback from someone on staff. Letconvo is built around that division: it answers, qualifies, and books what it can, and hands off exactly the details a person needs for anything it can't resolve itself.",
        ],
      },
      {
        heading: "What to look for in a service-business AI receptionist",
        paragraphs: [
          "Three things matter more for service businesses than for a typical office: real appointment booking against your actual open slots (not just message-taking), the ability to correctly represent your service area and hours so callers aren't misled, and reliability outside normal business hours, since service calls (a burst pipe, a broken furnace) frequently happen at the worst possible time.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "If missed calls are currently costing your service business real jobs, the fastest way to find out how much is to route one number through an AI receptionist for a few weeks and compare the leads and bookings it captures against what used to go to voicemail.",
        ],
      },
    ],
  },
};

export { POSTS as BLOG_POSTS };

export default function BlogPostPage({ pageId, setPage }) {
  const post = POSTS[pageId] || POSTS["after-hours-call-answering-service"];
  const activeId = POSTS[pageId] ? pageId : "after-hours-call-answering-service";
  const otherPosts = Object.entries(POSTS).filter(([id]) => id !== activeId).map(([id, p]) => ({ id, ...p }));
  const go = (id) => (event) => { event.preventDefault(); setPage(id); };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: "Letconvo AI" },
  };

  return (
    <main className="relative z-10 pt-[52px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article>
        <section className="px-4 sm:px-6 py-14 sm:py-20 bg-[#fdf8f3] border-b border-[#d4c8b8]/45">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <a href={PAGE_PATHS.blog} onClick={go("blog")}
                className="inline-flex items-center gap-1 font-syne font-semibold text-[10px] uppercase tracking-[.15em] text-[#8B6E3C]/70 hover:text-[#8B6E3C] transition-colors mb-4">
                <span className="material-symbols-outlined text-[13px]">arrow_back</span> All guides
              </a>
              <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65 mb-3">{post.eyebrow}</p>
              <h1 className="font-syne font-black uppercase tracking-tight text-[#1A1614] leading-tight" style={{ fontSize:"clamp(26px,4.2vw,42px)" }}>{post.title}</h1>
              <p className="text-[#4E4439]/70 text-[13px] sm:text-[15px] mt-4 leading-relaxed">{post.description}</p>
            </Reveal>
          </div>
        </section>

        <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto flex flex-col gap-9 sm:gap-11">
            {post.sections.map(({ heading, paragraphs }, index) => (
              <Reveal key={heading} delay={index * 0.05}>
                <h2 className="font-syne font-bold text-[#1A1614] text-[15px] sm:text-[17px] leading-snug mb-3">{heading}</h2>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-[#4E4439]/75 leading-relaxed text-[12.5px] sm:text-[13.5px] mt-3">{paragraph}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-[#fdf8f3] border-t border-[#d4c8b8]/45">
          <div className="max-w-3xl mx-auto">
            <Reveal className="mb-5 sm:mb-6">
              <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65">More guides</p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {otherPosts.map((otherPost, index) => (
                <Reveal key={otherPost.id} delay={index * 0.05}>
                  <a href={PAGE_PATHS[otherPost.id]} onClick={go(otherPost.id)}
                    className="block h-full border border-[#d4c8b8]/55 bg-white p-5 sm:p-6 hover:border-[#8B6E3C]/60 transition-colors">
                    <p className="font-syne font-semibold text-[9px] uppercase tracking-[.15em] text-[#8B6E3C]/65 mb-2">{otherPost.eyebrow}</p>
                    <h3 className="font-syne font-black text-[#1A1614] leading-snug text-[14px] sm:text-[15px]">{otherPost.title}</h3>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={otherPosts.length * 0.05}>
                <a href={PAGE_PATHS.blog} onClick={go("blog")}
                  className="flex h-full items-center border border-[#d4c8b8]/55 bg-white p-5 sm:p-6 hover:border-[#8B6E3C]/60 transition-colors">
                  <span className="font-syne font-bold text-[#8B6E3C] text-[12px] sm:text-[13px] uppercase tracking-[.08em]">View all guides →</span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative px-4 sm:px-6 py-14 sm:py-18 bg-[#8B6E3C] text-center">
          <Reveal>
            <h2 className="font-syne font-black uppercase tracking-tight text-white" style={{ fontSize:"clamp(22px,3.5vw,34px)" }}>Ready to stop missing calls?</h2>
            <p className="text-white/75 text-[12.5px] sm:text-[14px] mt-3 max-w-xl mx-auto leading-relaxed">Letconvo answers every caller, captures the details, and books appointments — day or night.</p>
            <button onClick={() => setPage("getstarted")}
              className="mt-6 bg-white text-[#6b5228] font-syne font-bold uppercase tracking-[.12em] px-8 py-3.5 text-[11px] hover:bg-[#f7f2ec] transition-colors">
              Get Started Free
            </button>
          </Reveal>
        </section>
      </article>
      <Footer setPage={setPage} />
    </main>
  );
}
