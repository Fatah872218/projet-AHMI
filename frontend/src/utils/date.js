// src/utils/date.js
export const formatDateForInput = (date) => {
  const d = new Date(date)
  const offset = d.getTimezoneOffset()
  const localDate = new Date(d.getTime() - offset * 60000)
  return localDate.toISOString().slice(0, 16)
}

export const toISOStringFromInput = (localDateStr) => {
  return new Date(localDateStr).toISOString()
}
