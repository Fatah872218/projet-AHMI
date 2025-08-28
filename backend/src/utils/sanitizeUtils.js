// backend/src/utils/sanitizeUtils.js
import sanitizeHtml from "sanitize-html";

export const cleanString = (input) => {
  if (!input || typeof input !== "string") return "";
  return sanitizeHtml(input, {
    allowedTags: [], // aucune balise autorisée
    allowedAttributes: {}, // aucun attribut autorisé
    disallowedTagsMode: "discard",
  });
};
