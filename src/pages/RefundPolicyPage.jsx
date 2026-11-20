import { motion } from "framer-motion";
import Footer from "../components/Footer";
import {
  BRAND,
  LEGAL_ENTITY,
  SUPPORT_EMAIL,
  REFUND_WINDOW_DAYS,
  LEGAL_LAST_UPDATED,
  PADDLE_MOR_NOTICE
} from "../config/legal";

const SECTIONS = [
  {
    id: "guarantee",
    title: `1. ${REFUND_WINDOW_DAYS}-Day Money-Back Guarantee`,
    content: [
      `We want you to be happy with ${BRAND}. If you are not satisfied for any reason, you can request a full refund within ${REFUND_WINDOW_DAYS} days of any payment you make to us — including your first subscription payment, a subscription renewal, or a purchase of prepaid call credits (top-up).`,
      "No questions asked: you do not need to give a reason, and the refund is for the full amount of that payment."
    ]
  },
  {
    id: "how",
    title: "2. How to Request a Refund",
    items: [
      `Email us at ${SUPPORT_EMAIL} from the email address on your account, or`,
      "Contact Paddle, our payment provider, directly at paddle.net, where you can look up your order and request a refund.",
      "Please include your order number or the email address you used at checkout so we can find your payment quickly."
    ]
  },
  {
    id: "processing",
    title: "3. How Refunds Are Processed",
    content: [
      PADDLE_MOR_NOTICE,
      "Approved refunds are returned to the original payment method used at checkout. Depending on your bank or card issuer, it usually takes 5–10 business days for the money to appear on your statement.",
      "Refunds are issued in the same currency you paid in (for example US dollars or Canadian dollars), including any sales tax that was charged."
    ]
  },
  {
    id: "cancellation",
    title: "4. Cancelling Your Subscription",
    content: [
      "You can cancel your subscription at any time from your account dashboard or by contacting us. After cancelling you will not be charged again, and you keep access until the end of the billing period you have already paid for.",
      `Payments made more than ${REFUND_WINDOW_DAYS} days ago are not refundable, but cancelling stops all future charges.`
    ]
  },
  {
    id: "free-credit",
    title: "5. Free Trial Credit",
    content: [
      "The free calling credit given to new accounts costs nothing, so there is nothing to refund for it. You are never charged unless you choose to subscribe or buy credits."
    ]
  },
  {
    id: "contact",
    title: "6. Questions",
    content: [
      `${BRAND} is operated by ${LEGAL_ENTITY}. If you have any questions about this Refund Policy or a payment, contact us at ${SUPPORT_EMAIL}.`
    ]
  }
];

export default function RefundPolicyPage({ setPage }) {
  return (
    <main style={{ position: "relative", zIndex: 10 }}>
      <section className="relative pt-[52px] overflow-hidden" style={{ background: "linear-gradient(160deg,#1a1410 0%,#2d2010 60%,#1a1410 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05, duration: .5, ease: [.16, 1, .3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-700/15 mb-5">
            <span className="material-symbols-outlined text-amber-400 text-[13px]">currency_exchange</span>
            <span className="font-syne font-semibold text-[9px] uppercase tracking-[.18em] text-amber-300/80">Legal Document</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .6, ease: [.16, 1, .3, 1] }}
            className="font-syne font-black text-white uppercase leading-tight tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(28px,5vw,50px)" }}>
            Refund Policy
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22, duration: .5 }}
            className="text-white/65 text-[13px] sm:text-[14px] leading-relaxed max-w-md mb-6">
            Every payment to {BRAND} is covered by a {REFUND_WINDOW_DAYS}-day, no-questions-asked money-back guarantee.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}
            className="flex flex-wrap gap-4 text-[11.5px] text-white/45">
            <span>Last updated: <strong className="text-white/70">{LEGAL_LAST_UPDATED}</strong></span>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 py-10 sm:py-14" style={{ background: "rgb(255,255,255)" }}>
        <div className="max-w-3xl mx-auto space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="font-syne font-black text-[#1A1614] uppercase tracking-tight leading-tight"
                style={{ fontSize: "clamp(14px,2vw,17px)" }}>
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
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
              </div>
              <div className="h-px bg-[#f0ebe4] mt-6 md:mt-8" />
            </div>
          ))}
        </div>
      </section>

      <Footer setPage={setPage} />
    </main>
  );
}
