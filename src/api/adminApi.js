import axios from "axios";
import { API_BASE } from "../config/apiBase";

const API = API_BASE;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const fetchAdminStats = async () => {
  const { data } = await axios.get(`${API}/admin/stats`, authHeaders());
  return data;
};

export const fetchCompanies = async ({ q = "", status = "" } = {}) => {
  const { data } = await axios.get(`${API}/admin/companies`, {
    ...authHeaders(),
    params: { q, status }
  });
  return data;
};

export const fetchRecentSignups = async () => {
  const { data } = await axios.get(`${API}/admin/companies/recent-signups`, authHeaders());
  return data;
};

export const fetchCompanyDetail = async (clientId) => {
  const { data } = await axios.get(`${API}/admin/companies/${clientId}`, authHeaders());
  return data;
};

export const fetchAdminPlans = async () => {
  const { data } = await axios.get(`${API}/admin/plans`, authHeaders());
  return data;
};

export const updateCompanyPlan = async (clientId, planId) => {
  const { data } = await axios.patch(
    `${API}/admin/companies/${clientId}/plan`,
    { planId },
    authHeaders()
  );
  return data;
};

export const updateCompanyStatus = async (clientId, status) => {
  const { data } = await axios.patch(
    `${API}/admin/companies/${clientId}/status`,
    { status },
    authHeaders()
  );
  return data;
};

export const adjustCompanyCredits = async (clientId, { amount, type, description }) => {
  const { data } = await axios.post(
    `${API}/admin/companies/${clientId}/credits/adjust`,
    { amount, type, description },
    authHeaders()
  );
  return data;
};

export const assignPhoneNumber = async (clientId, telnyxNumber) => {
  const { data } = await axios.put(
    `${API}/admin/companies/${clientId}/phone-number`,
    { telnyxNumber },
    authHeaders()
  );
  return data;
};

export const assignRetellAgent = async (clientId, retellAgentId) => {
  const { data } = await axios.put(
    `${API}/admin/companies/${clientId}/retell-agent`,
    { retellAgentId },
    authHeaders()
  );
  return data;
};

export const migrateToRetellNative = async (clientId) => {
  const { data } = await axios.post(
    `${API}/admin/companies/${clientId}/migrate-to-retell-native`,
    {},
    authHeaders()
  );
  return data;
};

export const deleteCompany = async (clientId) => {
  const { data } = await axios.delete(`${API}/admin/companies/${clientId}`, authHeaders());
  return data;
};

export const fetchContactMessages = async () => {
  const { data } = await axios.get(`${API}/admin/contact-messages`, authHeaders());
  return data;
};

export const markContactMessageRead = async (id) => {
  const { data } = await axios.patch(`${API}/admin/contact-messages/${id}/read`, {}, authHeaders());
  return data;
};
