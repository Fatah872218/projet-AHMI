import api from './api'

export const getEventById = (id) => api.get(`/events/${id}`)

export const getCategories = () => api.get(`/categories`)

export const getAllEvents = () => api.get('/events')

export const createEvent = (data) => api.post(`/events`, data)

export const updateEvent = (id, data) => api.put(`/events/${id}`, data)

export const getPlacesRestantes = (id) => api.get(`/events/${id}/places-restantes`)

export const getEventsByStatus = (status) => api.get(`/events/statut/${status}`)

export const updateEventStatus = (id, status) =>
  api.patch(`/events/${id}/statut`, { statut: status })

export const deleteEvent = (id) => api.delete(`/events/${id}`)
