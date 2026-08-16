// Single source of truth for the backend API location.
// Set REACT_APP_API_BASE_URL in .env to point at a local backend
// (e.g. http://localhost:5000/api) for local testing. Falls back to
// production if the env var isn't set.
const configured = process.env.REACT_APP_API_BASE_URL;

// API_BASE always includes the trailing /api segment.
export const API_BASE = configured || "https://api.letconvo.live/api";

// API_ROOT is the same host without /api, for the handful of routes
// (e.g. the Google OAuth redirect) that aren't under /api.
export const API_ROOT = API_BASE.replace(/\/api\/?$/, "");
