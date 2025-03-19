import apiClient from './apiClient.js'

export const getEmployees = async () => {
  return apiClient.get('/employees').then((res) => res.data)
}

export const createEmployees = async (form) => {
  return apiClient
    .post('/employees', form, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
}
