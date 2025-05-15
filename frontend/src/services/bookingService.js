// src/services/bookingService.js
import api from './api'

// ➤ Créer une réservation
export const createBooking = (data) => {
  return api.post('/reservations', data)
}

// ➤ Récupérer les réservations de l'utilisateur connecté
export const getMyBookings = () => {
  return api.get('/reservations/utilisateur/mes-reservations')
}

// ➤ Modifier une réservation
export const updateBooking = (id, data) => {
  return api.put(`/reservations/${id}`, data)
}

// ➤ Supprimer une réservation
export const deleteBooking = (id) => {
  return api.delete(`/reservations/${id}`)
}

// ➤ (optionnel) Récupérer toutes les réservations (admin)
export const getAllBookings = () => {
  return api.get('/reservations')
}
