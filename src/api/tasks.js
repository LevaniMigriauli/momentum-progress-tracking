import apiClient from './apiClient.js'

export const getTasks = async () => {
  return apiClient.get('/tasks').then((res) => res.data)
}

export const createTask = async (body) => {
  return apiClient.post('/tasks', body).then((res) => res.data)
}

export const retrieveTask = async (id) => {
  return apiClient.get(`/tasks/${id}`).then((res) => res.data)
}

export const changeTaskStatus = async (id, statusBody) => {
  return apiClient.put(`/tasks/${id}`, statusBody).then((res) => res.data)
}
