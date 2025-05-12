// src/services/eventService.js
import api from './api'

export const getEventById = (id) => api.get(`/evenements/${id}`)

export const getCategories = () => api.get(`/categories`)

export const getAllEvents = () => api.get('/evenements')

export const createEvent = (data) => api.post(`/evenements`, data)

export const updateEvent = (id, data) => api.put(`/evenements/${id}`, data)

// Récupérer les places restantes pour un événement
export const getPlacesRestantes = (id) => api.get(`/evenements/${id}/places-restantes`)

// Récupérer les événements par statut
export const getEventsByStatus = (status) => api.get(`/evenements/statut/${status}`)

// Mettre à jour le statut d'un événement
export const updateEventStatus = (id, status) =>
  api.patch(`/api/evenements/${id}/statut`, { statut: status })

export const deleteEvent = (id) => api.delete(`/evenements/${id}`)
