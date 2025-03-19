import apiClient from './apiClient.js'

export const getComments = (taskId) => {
  return apiClient.get(`/tasks/${taskId}/comments`).then((res) => res.data)
}

export const createComment = (taskId, commentBody) => {
  return apiClient
    .post(`/tasks/${taskId}/comments`, commentBody)
    .then((res) => res.data)
}
