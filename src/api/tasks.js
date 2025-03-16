import apiClient from "./apiClient.js";

export const createTask = async (body) => {
  return apiClient.post('/tasks', body).then(res => res.data);
}