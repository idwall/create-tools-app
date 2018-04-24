'use strict'

// Packages
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://iddog-api.now.sh',
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpZGRvZyIsInN1YiI6IjVhZDY4YzZkNTM0MzRhMDA0YmE3ZTc1ZCIsImlhdCI6MTUyNDAxMDA5MywiZXhwIjoxNTI1MzA2MDkzfQ.Pjr3A4s-Bdeh-nmske1VWTHJGbbv41heW5AEJPKabDA'

  config.headers.authorization = token

  return config
})

api.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data
    }

    return response
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data.error)
    }

    return Promise.reject(error)
  }
)

export default api
