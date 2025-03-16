import apiClient from "./apiClient.js";

export const getPriorities = async () => {
  return apiClient.get('/priorities').then(res => res.data);
}