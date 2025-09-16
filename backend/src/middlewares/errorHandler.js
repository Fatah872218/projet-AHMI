/// middlewares/errorHandler.js
export default function errorHandler(err, req, res, _next) {
  try {
    const status = err?.status || err?.statusCode || 500;
    const isProd = process.env.NODE_ENV === "production";
    // Log serveur (évite les doublons)
    console.error("ERREUR →", err?.stack || err?.message || err);
    return res.status(status).json({
      success: false,
      message: isProd ? "Erreur interne du serveur" : err?.message || "Erreur",
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Erreur interne" });
  }
}
