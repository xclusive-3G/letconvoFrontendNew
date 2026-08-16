// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import AnimatedBg     from "./components/AnimatedBg";
// import Navbar         from "./components/Navbar";
// import BenefitsPage   from "./pages/BenefitsPage";
// import PricingPage    from "./pages/PricingPage";
// import ContactPage    from "./pages/ContactPage";
// import LoginPage      from "./pages/LoginPage";
// import GetStartedPage from "./pages/GetStartedPage";
// import DashboardPage  from "./dashboard/DashboardPage";
// import TermsPage      from "./pages/termsPage";


// const PUBLIC_PAGES = {
//   benefits:   { comp: BenefitsPage,   title: "Letconvo AI | Never Miss a Lead Again"  },
//   pricing:    { comp: PricingPage,    title: "Pricing — Letconvo AI"                  },
//   contact:    { comp: ContactPage,    title: "Contact — Letconvo AI"                  },
//   terms:      { comp: TermsPage,      title: "Terms — Letconvo AI"                    },
//   login:      { comp: LoginPage,      title: "Login — Letconvo AI"                    },
//   getstarted: { comp: GetStartedPage, title: "Get Started Free — Letconvo AI"         },
// };

// const VALID_PAGES = new Set([...Object.keys(PUBLIC_PAGES), "dashboard"]);

// function getInitialPage() {
//   // Always let the landing page load by default.
//   // A saved token should not force the user into the dashboard because it hides the public site.
//   const hashPage = window.location.hash?.replace("#", "").trim();
//   return VALID_PAGES.has(hashPage) ? hashPage : "benefits";
// }

// export default function App() {
//   const [page, setPage] = useState(getInitialPage);

//   const changePage = (p) => {
//   const nextPage = VALID_PAGES.has(p) ? p : "benefits";
//   window.location.hash = nextPage === "benefits" ? "" : nextPage;
//   setTimeout(() => {
//     setPage(nextPage);
//     // Scroll after state update, not before
//     window.scrollTo({ top: 0, behavior: "instant" });
//   }, 60);
// };

//   useEffect(() => {
//     const onHashChange = () => setPage(getInitialPage());
//     window.addEventListener("hashchange", onHashChange);
//     return () => window.removeEventListener("hashchange", onHashChange);
//   }, []);

//   useEffect(() => {
//     document.title = page === "dashboard" ? "Dashboard — Letconvo AI" : (PUBLIC_PAGES[page]?.title ?? "Letconvo AI");
//   }, [page]);

//   if (page === "dashboard") {
//     const token = localStorage.getItem("token");
//     if (!token) return <LoginPage setPage={changePage} />;
//     return <DashboardPage setAppPage={changePage} />;
//   }

//   const Active = PUBLIC_PAGES[page]?.comp ?? BenefitsPage;

//   return (
//     <>
//       <AnimatedBg />
//       <Navbar page={page} setPage={changePage} />
//       <AnimatePresence mode="wait">
//         <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
//           <Active setPage={changePage} />
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// }


import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnimatedBg     from "./components/AnimatedBg";
import Navbar         from "./components/Navbar";
import BenefitsPage   from "./pages/BenefitsPage";
import PricingPage    from "./pages/PricingPage";
import ContactPage    from "./pages/ContactPage";
import LoginPage      from "./pages/LoginPage";
import GetStartedPage from "./pages/GetStartedPage";
import DashboardPage  from "./dashboard/DashboardPage";
import TermsPage      from "./pages/termsPage"; // ← fix casing
import PrivacyPage    from "./pages/privacyPage";
import { supabase }   from "./lib/supabase";


const PUBLIC_PAGES = {
  benefits:   { comp: BenefitsPage,   title: "Letconvo AI | Never Miss a Lead Again"  },
  pricing:    { comp: PricingPage,    title: "Pricing — Letconvo AI"                  },
  contact:    { comp: ContactPage,    title: "Contact — Letconvo AI"                  },
  terms:      { comp: TermsPage,      title: "Terms — Letconvo AI"                    },
  login:      { comp: LoginPage,      title: "Login — Letconvo AI"                    },
  getstarted: { comp: GetStartedPage, title: "Get Started Free — Letconvo AI"         },
  privacy:    { comp: PrivacyPage,    title: "Privacy — Letconvo AI"                  },
};

const VALID_PAGES = new Set([...Object.keys(PUBLIC_PAGES), "dashboard"]);

function getInitialPage() {
  const hashPage = window.location.hash?.replace("#", "").trim();
  return VALID_PAGES.has(hashPage) ? hashPage : "benefits";
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);

  const changePage = useCallback((p) => {
    const nextPage = VALID_PAGES.has(p) ? p : "benefits";
    window.location.hash = nextPage === "benefits" ? "" : nextPage;
    setTimeout(() => {
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: "instant" }); // ← after mount
    }, 60);
  }, []);

  useEffect(() => {
    const onHashChange = () => setPage(getInitialPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
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
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Active setPage={changePage} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}