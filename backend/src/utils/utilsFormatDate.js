//src / utils / utilsFormatDate.js;
export function formatEvenement(e) {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const eventObj = e.toObject ? e.toObject() : e;

  return {
    ...eventObj,
    dateDebut: formatter.format(new Date(eventObj.dateDebut)),
    dateFin: formatter.format(new Date(eventObj.dateFin)),
    dateCreation: formatter.format(new Date(eventObj.dateCreation)),
  };
}
export function formatReservation(r) {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const obj = r.toObject ? r.toObject() : r;

  // Liste des champs de date à formater dans l'événement
  const dateFields = [
    "dateDebut",
    "dateFin",
    "dateCreation",
    "dateModeration",
    "dateReservation",
  ];

  if (obj.evenement) {
    for (const field of dateFields) {
      if (obj.evenement[field]) {
        obj.evenement[field] = formatter.format(new Date(obj.evenement[field]));
      }
    }
  }

  // Formater la date de réservation principale
  if (obj.dateReservation) {
    obj.dateReservation = formatter.format(new Date(obj.dateReservation));
  }

  return obj;
}
