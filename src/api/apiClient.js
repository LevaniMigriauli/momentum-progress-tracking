import axios from 'axios'

// prev test token
// const token = '9e6c5dce-6c15-4bde-bd58-e850ce4cde4d'
const token = '9e7c99ea-dd8e-4ed5-8efb-1976bad6f050'
const BASE_URL = 'https://momentum.redberryinternship.ge/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${token}`

    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = `application/json`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let errorMessage = 'An error occurred'

    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          errorMessage = 'Bad Request'
          break
        case 401:
          errorMessage = 'Unauthorized. Please login.'
          break
        case 404:
          errorMessage = 'Resource not found'
          break
        case 500:
          errorMessage = 'Server error. Please try again later.'
          break
        default:
          errorMessage = 'Unexpected error occurred'
          break
      }
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection.'
    } else {
      errorMessage = `Error: ${error.message}`
    }

    console.error('API Error:', errorMessage)

    return Promise.reject(new Error(errorMessage))
  },
)

export default apiClient
