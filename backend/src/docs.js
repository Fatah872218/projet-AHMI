// backend/src/docs.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveSpecPath() {
  if (process.env.OPENAPI_SPEC_PATH) {
    const abs = path.resolve(__dirname, process.env.OPENAPI_SPEC_PATH);
    if (fs.existsSync(abs)) return abs;
    console.warn("[docs] OPENAPI_SPEC_PATH défini mais introuvable:", abs);
  }
  const local = path.resolve(__dirname, "../docs/openapi.yaml");
  if (fs.existsSync(local)) return local;

  const root = path.resolve(__dirname, "../../DOCS/openapi.yaml");
  if (fs.existsSync(root)) return root;

  return null;
}

function safeLoadSpec() {
  const p = resolveSpecPath();
  if (!p) {
    console.warn(
      "[docs] Aucune spec OpenAPI trouvée, usage d'une spec minimale."
    );
    return null;
  }
  try {
    const spec = YAML.load(p);
    const url =
      process.env.PUBLIC_API_URL ||
      `http://localhost:${process.env.PORT || 5000}`;
    spec.servers = [{ url }];
    return spec;
  } catch (e) {
    console.warn(
      "[docs] Erreur parsing OpenAPI, fallback minimal:",
      e?.message || e
    );
    return null;
  }
}

export function mountDocs(app) {
  const spec = safeLoadSpec();
  const fallback = {
    openapi: "3.1.0",
    info: { title: "AHMI API (fallback)", version: "1.0.0" },
    paths: {
      "/health": { get: { responses: { 200: { description: "OK" } } } },
    },
    servers: [
      {
        url:
          process.env.PUBLIC_API_URL ||
          `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  };
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(spec || fallback, { explorer: true })
  );
}

export default mountDocs;
