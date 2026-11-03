import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnimatedBg     from "./components/AnimatedBg";
import Navbar         from "./components/Navbar";
import BenefitsPage   from "./pages/BenefitsPage";
import PricingPage    from "./pages/PricingPage";
import ContactPage    from "./pages/ContactPage";
import LoginPage      from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import GetStartedPage from "./pages/GetStartedPage";
import DashboardPage  from "./dashboard/DashboardPage";
import AdminPage      from "./admin/AdminPage";
import TermsPage      from "./pages/termsPage"; // ← fix casing
import PrivacyPage    from "./pages/privacyPage";
import BlogPage       from "./pages/BlogPage";
import SeoLandingPage, { SEO_LANDING_PAGES } from "./pages/SeoLandingPage";
import BlogPostPage, { BLOG_POSTS } from "./pages/BlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import SeoMeta        from "./components/SeoMeta";
import { PAGE_PATHS, pageFromPath } from "./config/routes";
import { supabase }   from "./lib/supabase";


const PUBLIC_PAGES = {
  notfound: { comp: NotFoundPage, title: "Page Not Found | Letconvo AI", description: "This page could not be found. Explore Letconvo features and pricing." },
  benefits:   { comp: BenefitsPage,   title: "AI Receptionist for Small Business | Letconvo AI", description: "Letconvo is an AI phone receptionist for small businesses. Answer every call, capture missed-call leads, and book appointments 24/7 — no voicemail, no lost customers." },
  pricing: { comp: PricingPage, title: "AI Receptionist Pricing | Letconvo AI", description: "Explore Letconvo Starter pricing: $120 USD per month with 400 included minutes. Try 15 free calling minutes before subscribing." },
  contact:    { comp: ContactPage,    title: "Contact — Letconvo AI",                  description: "Get in touch with the Letconvo AI team about setup, pricing, or how the AI phone receptionist works for your business." },
  terms:      { comp: TermsPage,      title: "Terms — Letconvo AI",                    description: "Letconvo AI's terms of service — the rules and conditions for using the Letconvo AI phone receptionist platform." },
  login:      { comp: LoginPage,      title: "Login — Letconvo AI",                    description: "Log in to your Letconvo AI dashboard to manage calls, appointments, credits, and receptionist settings." },
  getstarted: { comp: GetStartedPage, title: "Get Started Free — Letconvo AI",         description: "Start free with Letconvo AI. Set up your AI phone receptionist in minutes and start capturing every call, lead, and appointment." },
  privacy:    { comp: PrivacyPage,    title: "Privacy — Letconvo AI",                  description: "Letconvo AI's privacy policy — how we collect, use, and protect the data of businesses and callers using the Letconvo AI receptionist." },
  blog:       { comp: BlogPage,       title: "AI Receptionist Blog — Letconvo AI",     description: "Guides on missed calls, AI receptionists, and phone answering for small businesses, from the Letconvo AI team." },
};

Object.entries(SEO_LANDING_PAGES).forEach(([pageId, page]) => {
  PUBLIC_PAGES[pageId] = {
    comp: SeoLandingPage,
    title: `${page.eyebrow.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())} | Letconvo AI`,
    description: page.description,
  };
});

Object.entries(BLOG_POSTS).forEach(([pageId, post]) => {
  PUBLIC_PAGES[pageId] = {
    comp: BlogPostPage,
    title: `${post.title} | Letconvo AI`,
    description: post.description,
  };
});

const VALID_PAGES = new Set([...Object.keys(PUBLIC_PAGES), "dashboard", "admin"]);

function getInitialPage() {
  const legacyHashPage = window.location.hash?.replace(/^#/, "").trim();
  if (VALID_PAGES.has(legacyHashPage)) return legacyHashPage;
  return pageFromPath(window.location.pathname);
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);

  const changePage = useCallback((p) => {
    const nextPage = VALID_PAGES.has(p) ? p : "benefits";
    const nextPath = PAGE_PATHS[nextPage] || PAGE_PATHS.benefits;
    if (window.location.pathname !== nextPath) window.history.pushState({}, "", nextPath);
    setTimeout(() => {
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: "instant" }); // ← after mount
    }, 60);
  }, []);

  useEffect(() => {
    const legacyHashPage = window.location.hash?.replace(/^#/, "").trim();
    if (VALID_PAGES.has(legacyHashPage)) {
      window.history.replaceState({}, "", PAGE_PATHS[legacyHashPage] || "/");
      setPage(legacyHashPage);
    }
    const onPopState = () => setPage(getInitialPage());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Picks up the session after a Google OAuth redirect. LoginPage sets
  // oauth_intent="login" before sending the user to Google; GetStartedPage
  // sets it to "signup" and handles resuming the wizard itself, so this
  // only auto-navigates for the login case.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" || !session?.access_token) return;

      const intent = localStorage.getItem("oauth_intent");
      if (intent !== "login") return;

      localStorage.setItem("token", session.access_token);
      localStorage.setItem("user", JSON.stringify(session.user));
      localStorage.removeItem("oauth_intent");
      changePage("dashboard");
    });
    return () => data.subscription.unsubscribe();
  }, [changePage]);

  useEffect(() => {
    document.title =
      page === "dashboard"
        ? "Dashboard — Letconvo AI"
        : PUBLIC_PAGES[page]?.title ?? "Letconvo AI";
  }, [page]);

  // Supabase's password-reset redirect carries its own #access_token=...&
  // type=recovery hash fragment, which the hash-based page router below
  // can't route on — check the query string instead (same pattern
  // BalancePage uses for the Paystack checkout return) so this renders
  // regardless of what garbage is currently in the hash.
  if (new URLSearchParams(window.location.search).get("passwordReset") === "1") {
    return <ResetPasswordPage setPage={changePage} />;
  }

  if (page === "dashboard") {
    const token = localStorage.getItem("token");
    if (!token) return <LoginPage setPage={changePage} />;
    return <DashboardPage setAppPage={changePage} />;
  }

  if (page === "admin") {
    const token = localStorage.getItem("token");
    if (!token) return <LoginPage setPage={changePage} />;
    return <AdminPage setAppPage={changePage} />;
  }

  const Active = PUBLIC_PAGES[page]?.comp ?? BenefitsPage;
  const seo = PUBLIC_PAGES[page] || PUBLIC_PAGES.benefits;
  const path = page === "notfound" ? window.location.pathname : PAGE_PATHS[page] || PAGE_PATHS.benefits;

  return (
    <>
      <SeoMeta title={seo.title} description={seo.description || "Letconvo is an AI receptionist that answers calls, captures leads, answers customer questions, and books appointments 24/7."} path={path} noindex={page === "login" || page === "notfound"} />
      <AnimatedBg />
      <Navbar page={page} setPage={changePage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Active setPage={changePage} pageId={page} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
