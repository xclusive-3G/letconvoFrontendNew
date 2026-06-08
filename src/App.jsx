import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnimatedBg     from "./components/AnimatedBg";
import Navbar         from "./components/Navbar";
import BenefitsPage   from "./pages/BenefitsPage";
import PricingPage    from "./pages/PricingPage";
import ContactPage    from "./pages/ContactPage";
import LoginPage      from "./pages/LoginPage";
import GetStartedPage from "./pages/GetStartedPage";
import DashboardPage  from "./dashboard/DashboardPage";

const PUBLIC_PAGES = {
  benefits:   { comp: BenefitsPage,   title: "Luminous AI | Never Miss a Lead Again"  },
  pricing:    { comp: PricingPage,    title: "Pricing — Luminous AI"                  },
  contact:    { comp: ContactPage,    title: "Contact — Luminous AI"                  },
  login:      { comp: LoginPage,      title: "Login — Luminous AI"                    },
  getstarted: { comp: GetStartedPage, title: "Get Started Free — Luminous AI"         },
};

const VALID_PAGES = new Set([...Object.keys(PUBLIC_PAGES), "dashboard"]);

function getInitialPage() {
  // Always let the landing page load by default.
  // A saved token should not force the user into the dashboard because it hides the public site.
  const hashPage = window.location.hash?.replace("#", "").trim();
  return VALID_PAGES.has(hashPage) ? hashPage : "benefits";
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);

  const changePage = (p) => {
    const nextPage = VALID_PAGES.has(p) ? p : "benefits";
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.hash = nextPage === "benefits" ? "" : nextPage;
    setTimeout(() => setPage(nextPage), 60);
  };

  useEffect(() => {
    const onHashChange = () => setPage(getInitialPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = page === "dashboard" ? "Dashboard — Luminous AI" : (PUBLIC_PAGES[page]?.title ?? "Luminous AI");
  }, [page]);

  if (page === "dashboard") {
    const token = localStorage.getItem("token");
    if (!token) return <LoginPage setPage={changePage} />;
    return <DashboardPage setAppPage={changePage} />;
  }

  const Active = PUBLIC_PAGES[page]?.comp ?? BenefitsPage;

  return (
    <>
      <AnimatedBg />
      <Navbar page={page} setPage={changePage} />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          <Active setPage={changePage} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
