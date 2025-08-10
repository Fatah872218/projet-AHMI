// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("ERREUR →", err.stack || err.message);
  const status = err.status || 500;

  // Log serveur (toujours)
  console.error("ERREUR →", err.stack || err.message);

  // Réponse côté client
  const isProd = process.env.NODE_ENV === "production";
  res.status(status).json({
    success: false,
    message: isProd ? "Erreur interne du serveur" : err.message || "Erreur",
  });
};

export default errorHandler;
