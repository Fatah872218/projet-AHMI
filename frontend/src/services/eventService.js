// src/services/eventService.js
import api from './api'

export const getEventById = (id) => api.get(`/api/evenements/${id}`)

export const getCategories = () => api.get(`/api/categories`)

export const createEvent = (data) => api.post(`/api/evenements`, data)

export const updateEvent = (id, data) => api.put(`/api/evenements/${id}`, data)
