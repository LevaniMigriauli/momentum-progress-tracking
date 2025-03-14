import apiClient from "./apiClient.js";

export const getDepartments = async () => {
  return apiClient.get('/departments').then(res => res.data);
}