// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("ERREUR →", err.stack || err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur interne du serveur",
  });
};

export default errorHandler;
