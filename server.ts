import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import {
  handleHealth,
  handleSuggest,
  handleChat,
  handleChatStream,
  handleSendAssessmentEmail,
} from "./server/geminiHandler.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));
  app.use(express.static(path.join(process.cwd(), "public")));

  app.get("/api/health", (req, res) => handleHealth(req, res));
  app.post("/api/gemini/suggest", (req, res) => handleSuggest(req, res));
  app.post("/api/gemini/chat", (req, res) => handleChat(req, res));
  app.post("/api/gemini/chat/stream", (req, res) => handleChatStream(req, res));
  app.post("/api/send-assessment-email", (req, res) => handleSendAssessmentEmail(req, res));

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
