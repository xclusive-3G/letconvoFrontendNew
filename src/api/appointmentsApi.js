import axios from "axios";
import { API_BASE } from "../config/apiBase";

const API = API_BASE;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Maps a raw backend booking row onto the shape the dashboard UI already
// expects (see dashboard/data.js APPOINTMENTS), so no component markup
// has to change - just the data source.
function mapBooking(b) {
  const dateObj = b.appointment_date
    ? new Date(`${b.appointment_date}T${b.appointment_time || "00:00"}`)
    : null;

  const todayStr = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  let dateLabel = b.appointment_date || "-";
  if (b.appointment_date === todayStr) dateLabel = "Today";
  else if (b.appointment_date === tomorrowStr) dateLabel = "Tomorrow";
  else if (dateObj && !Number.isNaN(dateObj.getTime())) {
    dateLabel = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  const timeLabel =
    dateObj && !Number.isNaN(dateObj.getTime())
      ? dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : b.appointment_time || "-";

  return {
    id: b.id,
    name: b.customer_name,
    phone: b.customer_phone,
    time: timeLabel,
    date: dateLabel,
    raw_date: b.appointment_date,
    raw_time: b.appointment_time,
    type: b.service || "Appointment",
    status: b.status === "rescheduled" ? "pending" : b.status, // fold into the 3 statuses the UI filters on
    rawStatus: b.status,
    notes: b.notes || "",
  };
}

export const fetchAppointments = async () => {
  const { data } = await axios.get(`${API}/me/appointments`, {
    headers: authHeaders(),
  });
  return (data.appointments || []).map(mapBooking);
};

export const updateAppointment = async (id, updates) => {
  const { data } = await axios.patch(`${API}/me/appointments/${id}`, updates, {
    headers: authHeaders(),
  });
  return mapBooking(data.appointment);
};

export const sendReminderSms = async (id) => {
  const { data } = await axios.post(`${API}/me/appointments/${id}/send-reminder`, {}, {
    headers: authHeaders(),
  });
  return data;
};
