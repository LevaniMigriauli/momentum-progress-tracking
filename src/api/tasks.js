import apiClient from "./apiClient.js";

export const getTasks = async () => {
  return apiClient.get('/tasks').then(res => res.data);
}

export const createTask = async (body) => {
  return apiClient.post('/tasks', body).then(res => res.data);
}