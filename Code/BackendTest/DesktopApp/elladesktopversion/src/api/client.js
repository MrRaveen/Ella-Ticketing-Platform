import axios from 'axios'

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE || 'http://localhost:8002'

export const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_jwt')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const authApi = {
  adminLogin: async ({ username, password }) => {
    // backend expects GET with body in current code; we will send POST to a small wrapper AccessPoint if needed.
    return api.get('/auth/adminLogin', { data: { username, password } })
  },
  createAdmin: (payload) => api.post('/auth/CreateAdmin', payload),
}

export const adminApi = {
  addTrainInfo: (payload) => api.post('/admin/addTrainInfo', payload),
  createStation: (payload) => api.post('/admin/createStation', payload),
  updateStation: (payload) => api.put('/admin/updateStation', payload),
  removeStation: (stationID) => api.delete('/admin/RemoveStation', { params: { stationID } }),
  getAllStations: () => api.get('/admin/GetAllStations'),
  createTrains: (payload) => api.post('/admin/createTrains', payload),
  updateTrains: (payload) => api.put('/admin/updateTrains', payload),
  createPlatform: (payload) => api.post('/admin/createPlatform', payload),
  createRoute: (payload) => api.post('/admin/createRoute', payload),
  createTrainTime: (payload) => api.post('/admin/createTrainTime', payload),
  createTrainSeatClass: (payload) => api.post('/admin/createTrainSeatClass', payload),
}


