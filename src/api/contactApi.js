import axios from "axios";
import { API_BASE } from "../config/apiBase";

export const submitContactMessage = async (payload) => {
  const { data } = await axios.post(`${API_BASE}/contact`, payload);
  return data;
};
