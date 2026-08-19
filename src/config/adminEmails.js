// UX-only allowlist — NOT a security boundary. It only controls whether the
// "Admin Panel" link/route render for this logged-in user; every actual
// /api/admin/* call is independently gated server-side (middleware/adminAuth.js)
// against its own ADMIN_EMAILS env var, so editing this list or localStorage
// client-side can never grant real admin access.
export const ADMIN_EMAILS = ["akinrataa@gmail.com"];
