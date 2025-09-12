// src/services/bookingService.js
import api from './api'

// ➤ Créer une réservation
export const createBooking = (data, config = {}) => api.post('/reservations', data, config)

// ➤ Récupérer les réservations de l'utilisateur connecté
export const getMyBookings = (config = {}) =>
  +api.get('/reservations/utilisateur/mes-reservations', config)

// ➤ Modifier une réservation
export const updateBooking = (id, data, config = {}) =>
  +api.put(`/reservations/${id}`, data, config)

// ➤ Supprimer une réservation
export const deleteBooking = (id, config = {}) => api.delete(`/reservations/${id}`, config)

// ➤ (optionnel) Récupérer toutes les réservations (admin)
export const getAllBookings = (config = {}) => api.get('/reservations', config)
