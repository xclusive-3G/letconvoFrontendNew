import axios from "axios";
import { API_BASE } from "../config/apiBase";

const API = API_BASE;

export const fetchDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `${API}/me/dashboard-stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const fetchAnalytics = async (period) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `${API}/me/analytics?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


// Pulls this client's call history directly from Retell and backfills
// anything the push webhook failed to deliver. Safe to call repeatedly —
// the backend skips calls it's already logged. Failures are swallowed since
// this is a best-effort sync, not something that should block page loads.
export const reconcileCalls = async () => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.post(
      `${API}/me/reconcile-calls`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (err) {
    console.error("Call reconciliation failed:", err.response?.data || err.message);
    return null;
  }
};

export const fetchCalls = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/me/calls`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return (res.data.calls || []).map((c) => ({
    id: c.id,
    caller: c.caller_phone || "Unknown caller",
    number: c.caller_phone || "-",
    duration:
      Math.ceil(Number(c.duration_ms || 0) / 1000) < 60
        ? `${Math.ceil(Number(c.duration_ms || 0) / 1000)}s`
        : `${Math.floor(
            Math.ceil(Number(c.duration_ms || 0) / 1000) / 60
          )}m`,

    status: c.call_status || "completed",
    sentiment: c.sentiment || "neutral",
    recording: Boolean(c.recording_url),
    recording_url: c.recording_url,
    transcript:
      c.call_summary ||
      c.transcript ||
      "No transcript available",
    transcript_object: c.transcript_object || [],
    tags: [
      c.direction || "call",
      c.credits_deducted
        ? `${c.credits_deducted}-credits`
        : "no-credits"
    ],
    time: c.created_at
      ? new Date(c.created_at).toLocaleString()
      : "-",
    raw: c
  }));
};