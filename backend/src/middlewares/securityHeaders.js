// backend/src/middlewares/securityHeaders.js
import helmet from "helmet";

const securityHeaders = helmet({
  xPoweredBy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" }, // pour images/CDN
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "img-src": ["'self'", "data:", "blob:", "https:"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "'unsafe-inline'"], // Tailwind injecte du style
      "connect-src": [
        "'self'",
        "http://localhost:5173",
        "https://nominatim.openstreetmap.org",
      ],
    },
  },
  referrerPolicy: { policy: "no-referrer" },
});

export default securityHeaders;
