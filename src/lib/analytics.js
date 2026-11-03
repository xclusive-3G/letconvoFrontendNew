// The Google tag in public/index.html owns page views and tag initialization.
// Send completed registrations through that same tag; never load a second copy.
export function trackSignup(method) {
  if (navigator.webdriver || window.location.hostname !== "letconvo.live") return;
  if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl) return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "sign_up", {
      send_to: "G-Q46LYZW19K",
      method,
      page_location: "https://letconvo.live/get-started",
    });
  } catch {
    // Analytics failure must not turn a completed registration into an error.
  }
}
