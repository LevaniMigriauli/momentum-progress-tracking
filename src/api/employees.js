import apiClient from "./apiClient.js";

export const getEmployees = async () => {
  return apiClient.get('/employees').then(res => res.data);
}