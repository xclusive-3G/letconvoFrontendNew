import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { PAGE_PATHS } from "../config/routes";
import { SEO_LANDING_PAGES } from "./SeoLandingPage";

// Which industry/solution landing pages each post links out to — picked from
// the businesses/topics the post itself already names.
const RELATED_SOLUTIONS = {
  "after-hours-call-answering-service": ["missed-call-lead-capture", "ai-receptionist-for-clinics", "ai-receptionist-for-law-firms"],
  "ai-phone-answering-service-for-service-businesses": ["ai-receptionist-for-plumbers", "missed-call-lead-capture", "ai-appointment-booking"],
  "ai-receptionist-cost": ["ai-receptionist-for-small-business", "missed-call-lead-capture", "ai-appointment-booking"],
  "free-ai-receptionist-small-business": ["ai-receptionist-for-small-business", "missed-call-lead-capture", "ai-appointment-booking"],
  "ai-receptionist-vs-human-receptionist": ["ai-receptionist-for-small-business", "ai-receptionist-for-salons", "missed-call-lead-capture"],
  "best-ai-receptionist-small-business-usa": ["ai-receptionist-for-small-business", "ai-receptionist-for-salons", "ai-appointment-booking"],
};

const POSTS = {
  "after-hours-call-answering-service": {
    eyebrow: "After-Hours Call Answering",
    title: "After-Hours Call Answering Service: How Small Businesses Stop Losing Nighttime Calls",
    description: "An after-hours call answering service keeps your business reachable outside office hours. See how it works, what it costs to skip one, and how an AI receptionist compares to a live answering service.",
    sections: [
      {
        heading: "Why after-hours calls matter more than they seem to",
        paragraphs: [
          "Most small businesses close up for the night and let the phone go quiet right along with them. Callers don't work on your schedule, though — someone looking for a plumber at 9pm, a salon before work at 7am, or a clinic at midnight because a symptom won't wait is a real person with a real, immediate need. Reach voicemail, and a lot of them won't bother leaving a message. They'll just call the next name on the list.",
          "That's the gap an after-hours answering service is meant to close: some way to keep answering, capturing details, and giving callers an actual response, even when nobody on your team is anywhere near a phone.",
        ],
      },
      {
        heading: "What an after-hours answering service actually does",
        paragraphs: [
          "Strip it down, and an after-hours service just picks up the calls that land outside your normal hours instead of letting them roll to voicemail. How it handles those calls varies a lot — a human answering service usually works from a script, while an AI receptionist like Letconvo can hold an actual conversation: greet the caller, answer the questions people usually have, grab their name and number, and check or book an appointment against your real schedule.",
          "None of this is about replacing your team's judgment on the calls that need it. It's about making sure nobody gets dead air, and that whoever opens up in the morning has an accurate record of who called and why.",
        ],
      },
      {
        heading: "The real cost of relying on voicemail after hours",
        paragraphs: [
          "Voicemail feels like a safety net. In practice it behaves more like a filter that quietly screens out your least patient — and often most valuable — leads. Someone comparing a few local businesses isn't going to leave a message and wait around; they'll call whoever actually picks up. For salons, clinics, contractors, and law firms especially, the person calling after hours is often ready to book right now, not just browsing.",
          "The real cost isn't the missed call itself. It's that lead ending up with a competitor who happened to have someone covering the phone at that hour.",
        ],
      },
      {
        heading: "AI receptionist vs. traditional answering service",
        paragraphs: [
          "A traditional live answering service staffs a call center in shifts, which does cover the after-hours gap — but usually with a generic script, per-minute pricing, and a message that just gets relayed to you rather than resolved on the call.",
          "An AI receptionist like Letconvo works from the specifics you give it — your services, hours, policies, FAQs — and answers every caller in your business's own voice, at any hour, not just during a shift someone happened to schedule. It can check real availability and book on the spot instead of taking a message, which matters most exactly when nobody's around to follow up quickly.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "If after-hours calls at your business are currently going to voicemail, the fastest way to see the difference is to let an AI receptionist handle just one overnight shift and compare what you get the next morning — real caller details and real bookings, instead of a few voicemail notifications nobody's calling back.",
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
          "Plumbers, electricians, HVAC techs, cleaners, landscapers — these businesses all share one problem: whoever could answer the phone is usually on a job, driving between jobs, or hands full with a tool, not sitting at a desk. And that's exactly when a new customer calls wanting service booked.",
          "Hiring a full-time receptionist to fix this rarely makes financial sense for a small crew. An AI phone answering service exists for exactly that math problem.",
        ],
      },
      {
        heading: "What it looks like in practice",
        paragraphs: [
          "An AI phone answering service for a trade business answers every call using whatever you've set up — your services, service area, pricing approach, availability — and runs the conversation the way a solid front-desk person would: greets the caller, answers the obvious questions (\"do you cover my area,\" \"can you come this week\"), gets the job details and contact info, and books straight onto your configured booking availability instead of just jotting down a message.",
          "Because it answers the instant the phone rings no matter what the crew is doing, it erases the usual tradeoff between being on a job and being reachable. Both just happen at once.",
        ],
      },
      {
        heading: "Where it fits alongside your team, not instead of it",
        paragraphs: [
          "The setups that actually work aren't \"AI replaces the phone\" — they're AI picking up the second a call comes in, so nothing goes to voicemail, while your team still handles what genuinely needs a person: quoting an odd job, smoothing over a complaint, or a customer who specifically wants a callback from someone on staff. Letconvo is built around exactly that split — it answers, qualifies, books what it can, and hands a person the context they need for anything it can't close out itself.",
        ],
      },
      {
        heading: "What to look for in a service-business AI receptionist",
        paragraphs: [
          "Three things matter more here than at a typical office: real booking against your actual open slots, not just message-taking; getting your service area and hours right so callers aren't misled; and holding up outside normal hours, since the calls that matter most — a burst pipe, a dead furnace — tend to land at the worst possible time.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "If missed calls are quietly costing your business real jobs, the fastest way to find out how many is to route one number through an AI receptionist for a couple of weeks and see what it captures compared to what used to vanish into voicemail.",
        ],
      },
    ],
  },
  "ai-receptionist-cost": {
    eyebrow: "AI Receptionist Pricing",
    title: "How Much Does an AI Receptionist Cost? Complete Small Business Pricing Guide",
    description: "What an AI phone receptionist actually costs, the pricing models you'll run into, how it stacks up against a human receptionist's salary, and how to test one before you pay for a full month.",
    sections: [
      {
        heading: "Why the cost of a missed call matters more than the cost of answering it",
        paragraphs: [
          "Every small business already pays for missed calls — it just never shows up on an invoice. Someone hits voicemail after hours, mid-shift, or while your one receptionist's at lunch, and most of them don't leave a message; they just call whoever picks up next. That's the real comparison behind a search like \"AI receptionist cost\": not $0 against some monthly fee, but the ongoing cost of calls nobody answers versus the cost of answering every one of them.",
          "Before you start comparing prices, it's worth knowing exactly what you'd be paying for.",
        ],
      },
      {
        heading: "What is an AI receptionist?",
        paragraphs: [
          "An AI receptionist is software that answers your business calls the way a trained front-desk person would — greeting callers, answering the usual questions about your services, hours, and pricing, taking down a lead's name and number, handing off anything complicated to a person, and for appointment-based businesses, booking straight onto your configured booking availability. It's on 24/7, so a call at 11pm gets the same response as one at 11am.",
          "Letconvo works exactly this way: set up your business details once, and every call after that gets answered using them — no staffing decision required per call.",
        ],
      },
      {
        heading: "How much does an AI receptionist cost?",
        paragraphs: [
          "There's no standard price tag in this category, so it helps to know what you're actually comparing. You'll run into flat monthly subscriptions that bundle a set number of minutes, pay-per-minute or pay-per-call rates with no base fee, usage tiers that scale with volume, setup or onboarding fees, charges for extra numbers or overflow calls, and premium add-ons like CRM syncing or custom voice cloning.",
          "Letconvo Starter is listed at $120 USD per month with 400 included calling minutes. Calls require an available balance; review top-up options in the dashboard. Growth and Enterprise are coming soon. Confirm external calendar or CRM requirements before subscribing.",
        ],
      },
      {
        heading: "AI receptionist vs. human receptionist cost",
        paragraphs: [
          "A single full-time receptionist usually runs well past $2,500–$3,500 a month once you factor in wages, payroll tax, and benefits — and that's still only one shift's coverage. An AI receptionist typically costs a fraction of that, with no second hire needed to cover evenings, weekends, lunch breaks, or sick days.",
        ],
        table: {
          headers: ["", "AI Receptionist", "Human Receptionist"],
          rows: [
            ["Availability", "24/7, every day", "Scheduled hours only"],
            ["Simultaneous calls", "Handles multiple at once", "One call at a time"],
            ["Typical monthly cost", "From $120 (Letconvo Starter)", "$2,500–$3,500+ in wages & benefits"],
            ["Appointment booking", "Automatic, against real availability", "Manual"],
            ["Scaling to more calls", "Same plan, no extra hiring", "Requires additional staff"],
          ],
        },
      },
      {
        heading: "What should a small business look for in an AI receptionist?",
        paragraphs: [
          "Price alone won't tell you whether an AI receptionist will actually hold up on your calls. Worth checking first: does it hold a real conversation instead of reading off a script, does it book and reschedule actual appointments rather than just taking a message, can it hand a call to a person when it needs to, does it follow up by text after a missed or finished call, how fast can you train it on your specific services and FAQs, and do you get logs and analytics that show what's really happening on your line.",
          "Setup time counts too — a system that takes weeks to configure defeats the point of fixing a problem you have today.",
        ],
      },
      {
        heading: "Is an AI receptionist worth it for a small business?",
        paragraphs: [
          "It tends to pay for itself fastest at businesses where a missed call means a missed booking, not just a missed chat — barbershops, salons, dental and medical offices, plumbers and HVAC crews, repair shops, real estate agents, restaurants juggling reservations, and other lead- or appointment-driven work. If most of your revenue hinges on someone actually picking up the phone, an AI receptionist usually costs a lot less than the bookings a voicemail greeting quietly loses you.",
        ],
      },
      {
        heading: "Try it free before you pay for it",
        paragraphs: [
          "A lot of people searching for AI receptionist pricing are really asking something simpler: can I try this for free before I pay for anything? Letconvo gives every new signup 15 minutes of free AI calling credit — no card, no commitment — so you can send it a handful of real calls and hear exactly how it handles them before picking a plan.",
          "That's usually a faster way to answer \"is this worth it\" than reading yet another pricing page. A few real, answered calls will tell you more than any comparison chart.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "If missed calls are already costing you bookings, the quickest way to put a number on that is to claim your 15 free minutes, send Letconvo a few real calls, and compare what it catches against what used to disappear into voicemail.",
        ],
      },
    ],
  },
  "free-ai-receptionist-small-business": {
    eyebrow: "Free AI Receptionist",
    title: "Free AI Receptionist for Small Businesses: What You Can Get for $0",
    description: "What a \"free AI receptionist\" offer actually gets you, what's never really free, and how far Letconvo's no-cost calling credit goes before you need a paid plan.",
    sections: [
      {
        heading: "What people searching for \"free AI receptionist\" actually want",
        paragraphs: [
          "Most of the traffic behind \"free AI receptionist for small business\" isn't actually hoping to run a phone line for free forever — it's trying to answer something smaller first: does this even work, and is it worth paying for? Before spending money on a monthly plan, wanting to hear the thing handle a real call, answer a real question, maybe book a real appointment — that's a completely reasonable ask.",
          "So it's worth being straight about what \"free\" really covers here, and what it doesn't.",
        ],
      },
      {
        heading: "Is there a completely free AI receptionist?",
        paragraphs: [
          "Not one that genuinely answers your business line indefinitely, no. Every call that comes in costs something real to handle — a phone number, carrier minutes, AI voice processing — so anything that actually picks up your calls, holds a conversation, and books appointments has to charge for usage somewhere, even if getting in the door is free.",
          "What you can find instead, and what's actually worth looking for, is a real product you get to try before paying anything: free setup, free minutes to test with, no card required to start. That answers \"does this work for my business\" honestly, instead of handing you a forever-free tool that quietly can't do what the paid version does.",
        ],
      },
      {
        heading: "What you can actually get for $0 with Letconvo",
        paragraphs: [
          "Every new Letconvo signup gets 15 minutes of free AI calling credit, no card, no commitment. That's enough to run a handful of real calls through it — a new customer asking a question, someone checking your hours, a booking request — and hear exactly how it handles your business before you decide anything.",
          "Think of it as a test, not a replacement for a plan. Fifteen minutes tells you how it performs, not what it'd cost to run your phone line full time. Once you've seen it handle a few real calls the way you need, moving to a paid plan is what keeps it answering everything after that.",
        ],
      },
      {
        heading: "What to check before trusting a \"free\" AI receptionist offer",
        paragraphs: [
          "Free offers in this space aren't all equally free. Before you hand over a card or your business number, check whether one's required upfront — that's usually a sign you'll get auto-charged the second the free usage runs dry — whether the free tier quietly strips out what actually matters (real booking, SMS follow-up, call transfers), leaving a demo-grade chatbot behind, and whether there's a contract waiting once the free period's over.",
          "Letconvo's free credit doesn't ask for a card and doesn't auto-enroll you into anything. Once the 15 minutes are gone, it's your call whether to subscribe — not the other way around.",
        ],
      },
      {
        heading: "When free is enough, and when you need a paid plan",
        paragraphs: [
          "Free calling credit answers one question well: will this handle my calls the way I need it to? It's not built to cover your real call volume — a business that actually depends on its phone will burn through 15 minutes in a single busy afternoon. Once you trust it works, a paid plan is what keeps it picking up every call, not just the first few. For what that costs month to month, our AI receptionist pricing guide breaks it down.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "Want to know if an AI receptionist is worth paying for before you pay for it? Claim your 15 free minutes, send it a few real calls, and judge it by what it actually catches — not by the price tag.",
        ],
      },
    ],
  },
  "ai-receptionist-vs-human-receptionist": {
    eyebrow: "AI vs. Human Receptionist",
    title: "AI Receptionist vs. Human Receptionist: Which Is Better for a Small Business?",
    description: "A dimension-by-dimension comparison of AI and human receptionists — availability, cost, consistency, and the calls each one actually handles better — so you can decide what your small business needs.",
    sections: [
      {
        heading: "This isn't really an either/or question",
        paragraphs: [
          "\"AI receptionist vs. human receptionist\" sounds like a contest with one winner. But most small businesses that have actually run both end up asking a smaller question instead: which calls does each one handle better? A human and an AI receptionist just aren't good at the same things, and the businesses getting the most out of either tend to split the work rather than pick a side.",
          "Before putting them head to head, it helps to see what each one's actually built for.",
        ],
      },
      {
        heading: "Where a human receptionist wins",
        paragraphs: [
          "A good human receptionist still beats AI on calls that need judgment, not just information — talking down an angry customer, picking up on a vague or emotional request between the lines, improvising through a sales call that won't follow a script, building the kind of rapport that makes a regular client feel known rather than processed. If your calls run complex, high-stakes, or relationship-heavy, a person on the line is genuinely hard to replace.",
          "People also catch what AI tends to miss — a tone that says the real problem isn't what's being said out loud, or a longtime customer who expects to be recognized instead of asked for their name again.",
        ],
      },
      {
        heading: "Where an AI receptionist wins",
        paragraphs: [
          "An AI receptionist pulls ahead on the calls that are frequent, time-sensitive, and don't need judgment — answering instantly at 2am, handling several calls at once instead of stacking people on hold, giving the same correct answer every single time instead of a tired or inconsistent one, booking straight onto your configured booking availability with nobody typing it in later. It doesn't take lunch, call in sick, quit for a better offer, or need two weeks of training before it gets your hours right.",
          "That matters most on the calls that quietly cost small businesses the most money: a new customer calling after hours, or calling at the exact moment the one person who could answer is already on another line.",
        ],
      },
      {
        heading: "AI receptionist vs. human receptionist, side by side",
        paragraphs: [
          "For a full breakdown of what each option actually costs month to month, our AI receptionist pricing guide covers that in detail. Here's how they stack up on everything else that usually decides it.",
        ],
        table: {
          headers: ["", "AI Receptionist", "Human Receptionist"],
          rows: [
            ["Availability", "24/7, including nights and weekends", "Scheduled working hours only"],
            ["Handling multiple calls", "Answers several at once", "One call at a time, others wait or go to voicemail"],
            ["Consistency", "Same accurate answer every time", "Varies with mood, memory, fatigue"],
            ["Complex or emotional calls", "Can escalate or transfer to a person", "Handles directly, with judgment"],
            ["Ramp-up time", "Configured in minutes", "Days to weeks of training"],
            ["Turnover risk", "None", "Sick days, quitting, hiring gaps"],
            ["Scaling to more call volume", "Same plan handles more calls", "Needs additional hires"],
          ],
        },
      },
      {
        heading: "The hybrid model most small businesses actually land on",
        paragraphs: [
          "In practice, the businesses getting the best results don't pick one — they let the AI receptionist answer the instant the phone rings, handle whatever it can (FAQs, booking, basic qualifying questions), and pass anything that genuinely needs judgment straight to a person. Nothing goes to voicemail, and the calls that really need a human still get one.",
          "Letconvo's built around exactly that split: it answers, qualifies, and books what it can on its own, then hands a person exactly the context they'd need for anything it can't close out.",
        ],
      },
      {
        heading: "So which is better for your small business?",
        paragraphs: [
          "If most of your calls are routine — booking, hours, pricing, availability — an AI receptionist alone will probably beat a human on cost, consistency, and coverage. If a good chunk of your calls are complex, emotional, or relationship-driven, you'll still want a person available, but having an AI receptionist soak up the overflow and after-hours calls means that person isn't your only line of defense against a missed one.",
          "Hardly any small business actually needs to pick a permanent side here. Most just need the phone answered right more often than it currently is, by whichever combination gets them there.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "Letconvo gives every new signup 15 minutes of free AI calling credit, no card required, so you can see firsthand which of your calls it handles well on its own — and which ones you'd still rather a person took.",
        ],
      },
    ],
  },
  "best-ai-receptionist-small-business-usa": {
    eyebrow: "Buyer's Guide",
    title: "How to Choose an AI Receptionist for a US Small Business",
    description: "Compare call answering, booking, forwarding requirements, and total costs before choosing an AI receptionist for your US business.",
    sections: [
      { heading: "Start with the calls you need to handle", paragraphs: ["List your five most common caller questions, the details you need for a lead, and what should happen when a caller wants an appointment. Use these same scenarios to evaluate each provider. This guide is written by Letconvo, which sells an AI receptionist; it is a buying checklist rather than an independent product ranking."] },
      { heading: "Test booking and follow-up with real scenarios", paragraphs: ["Ask for an available appointment, then request an unavailable time and reschedule an existing booking. Confirm where the appointment appears and how your team receives caller details. Distinguish booking against configured business availability from synchronizing an external calendar; confirm the exact integration and plan before purchasing."] },
      { heading: "Confirm US number support and forwarding", paragraphs: ["Before moving a business line, confirm number availability, carrier forwarding support, possible carrier charges, and what happens if the AI cannot complete a request. Verify these details for your own number and business requirements with the provider."] },
      { heading: "Compare total monthly cost", paragraphs: ["Check the subscription price, included usage, top-up rules, number charges, and cancellation terms. A low headline price is only useful if the plan covers the calls and features you need. Confirm current prices directly with each provider rather than relying on an old comparison table."] },
      { heading: "What you can test with Letconvo", paragraphs: ["Letconvo offers 15 free calling minutes to test answering, lead capture, and appointments using configured business availability. Starter is listed at $120 USD per month with 400 included minutes. Growth and Enterprise are coming soon. Contact us to confirm number support and any external calendar or CRM requirement before subscribing."] },
      { heading: "Choose using a repeatable test", paragraphs: ["Run the same greeting, opening-hours question, booking request, and difficult question with each shortlisted service. Check the recorded outcome, clarity of the response, and follow-up information. Choose the service that performs well on your actual calls and fits your budget."] },
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
    url: `https://letconvo.live${PAGE_PATHS[activeId]}`,
    mainEntityOfPage: `https://letconvo.live${PAGE_PATHS[activeId]}`,
    publisher: { "@type": "Organization", name: "Letconvo AI", url: "https://letconvo.live/" },
    author: { "@type": "Organization", name: "Letconvo AI" },
  };

  return (
    <main className="relative z-10 pt-[52px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article>
        <p className="max-w-3xl mx-auto px-4 pt-8 text-sm text-[#4E4439]">By the Letconvo AI team ? Product guidance from the service provider</p>
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
            {post.sections.map(({ heading, paragraphs, table }, index) => (
              <Reveal key={heading} delay={index * 0.05}>
                <h2 className="font-syne font-bold text-[#1A1614] text-[15px] sm:text-[17px] leading-snug mb-3">{heading}</h2>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-[#4E4439]/75 leading-relaxed text-[12.5px] sm:text-[13.5px] mt-3">{paragraph}</p>
                ))}
                {table && (
                  <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 mt-5">
                    <div className="min-w-[480px] sm:min-w-0 bg-[#fdfaf6] border border-[#d4c8b8]/55 overflow-hidden">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#f7f2ec] border-b-2 border-[#d4c8b8]/50">
                            {table.headers.map((h) => (
                              <th key={h || "blank"} className="text-left px-3 sm:px-4 py-2.5 font-syne font-bold text-[9.5px] uppercase tracking-[.08em] text-[#4E4439]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, ri) => (
                            <tr key={row[0]} className={ri % 2 === 1 ? "bg-white" : ""}>
                              {row.map((cell, ci) => (
                                <td key={ci} className={`px-3 sm:px-4 py-2.5 text-[11.5px] sm:text-[12px] border-b border-[#d4c8b8]/30 ${ci === 0 ? "font-medium text-[#1A1614]" : "text-[#4E4439]/85"}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        <section className="relative px-4 sm:px-6 py-12 sm:py-16 bg-white border-t border-[#d4c8b8]/45">
          <div className="max-w-3xl mx-auto">
            <Reveal className="mb-5 sm:mb-6">
              <p className="font-syne font-semibold text-[9px] uppercase tracking-[.2em] text-[#8B6E3C]/65">Related solutions</p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {(RELATED_SOLUTIONS[activeId] || []).map((solutionId, index) => (
                <Reveal key={solutionId} delay={index * 0.05}>
                  <a href={PAGE_PATHS[solutionId]} onClick={go(solutionId)}
                    className="block h-full border border-[#d4c8b8]/55 bg-[#fdfaf6] p-4 sm:p-5 hover:border-[#8B6E3C]/60 transition-colors">
                    <h3 className="font-syne font-black uppercase tracking-[.04em] text-[#1A1614] leading-snug text-[11.5px] sm:text-[12.5px]">{SEO_LANDING_PAGES[solutionId].eyebrow}</h3>
                  </a>
                </Reveal>
              ))}
            </div>
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
