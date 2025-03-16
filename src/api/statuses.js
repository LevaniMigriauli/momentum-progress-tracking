import apiClient from "./apiClient.js";

export const getStatuses = async () => {
  return apiClient.get('/statuses').then(res => res.data);
}