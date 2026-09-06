export const PAGE_PATHS = {
  benefits: "/",
  pricing: "/pricing",
  contact: "/contact",
  blog: "/blog",
  terms: "/terms",
  privacy: "/privacy",
  login: "/login",
  getstarted: "/get-started",
  dashboard: "/dashboard",
  admin: "/admin",
  "ai-receptionist-for-small-business": "/ai-receptionist-for-small-business",
  "ai-receptionist-for-plumbers": "/ai-receptionist-for-plumbers",
  "ai-receptionist-for-salons": "/ai-receptionist-for-salons",
  "ai-receptionist-for-clinics": "/ai-receptionist-for-clinics",
  "ai-receptionist-for-law-firms": "/ai-receptionist-for-law-firms",
  "missed-call-lead-capture": "/missed-call-lead-capture",
  "ai-appointment-booking": "/ai-appointment-booking",
  "after-hours-call-answering-service": "/blog/after-hours-call-answering-service",
  "ai-phone-answering-service-for-service-businesses": "/blog/ai-phone-answering-service-for-service-businesses",
};

const NORMALIZED_PATHS = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page])
);

export function pageFromPath(pathname) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return NORMALIZED_PATHS[normalized] || "benefits";
}
