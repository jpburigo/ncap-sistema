import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
}

export const ncService = {
  list: () => api.get('/non-conformities'),
  create: (data) => api.post('/non-conformities', data),
  update: (id, data) => api.put(`/non-conformities/${id}`, data),
  delete: (id) => api.delete(`/non-conformities/${id}`),
  getById: (id) => api.get(`/non-conformities/${id}`),
}

export const actionPlanService = {
  list: () => api.get('/action-plans'),
  create: (data) => api.post('/action-plans', data),
  update: (id, data) => api.put(`/action-plans/${id}`, data),
  delete: (id) => api.delete(`/action-plans/${id}`),
  getById: (id) => api.get(`/action-plans/${id}`),
}

export const reportService = {
  getSummary: () => api.get('/reports/summary'),
  getByNorm: (norm) => api.get(`/reports/by-norm/${norm}`),
}

export default api
