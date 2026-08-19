import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const FALLBACK_MESSAGE = "Our AI assistant is currently updating. Please try again in a few moments.";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "public")));

  // Helper to safely initialize GoogleGenAI with server-side GEMINI_API_KEY or other env variables
  const getAI = () => {
    try {
      const apiKey = 
        process.env.GEMINI_API_KEY || 
        process.env.VITE_GEMINI_API_KEY || 
        process.env.NEXT_PUBLIC_GEMINI_API_KEY || 
        "";
      if (!apiKey || !apiKey.trim()) return null;
      return new GoogleGenAI({
        apiKey: apiKey.trim(),
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.warn("Failed to initialize GoogleGenAI:", err);
      return null;
    }
  };

  // API Endpoints for Gemini AI
  app.post("/api/gemini/suggest", async (req, res) => {
    try {
      const { context } = req.body;
      const ai = getAI();
      if (!ai) {
        return res.json({ 
          text: "DreamPath AI Tip: In Pakistan's growing economy, aligning your skills with industry demand (Tech, Health, Business & Civil Services) creates the highest opportunity.",
          fallback: true 
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: `You are a "DreamPath AI" mentor for Pakistani students. 
The student is currently looking at: ${context || "general career options"}. 
Give a punchy 2-sentence motivational tip or career advice specifically for this context in the Pakistan job market for 2026. 
Keep it inspiring, practical, and professional.`,
      });
      res.json({ text: response.text || "Your path is unique. Keep building your skills, and the future will reward your discipline." });
    } catch (error) {
      console.warn("Gemini Suggest handled fallback:", error);
      res.json({ 
        text: "Your path is unique. Keep building your skills in Pakistan's emerging industries, and the future will reward your discipline.",
        fallback: true
      });
    }
  });

  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { history, message } = req.body;
      const ai = getAI();
      if (!ai) {
        return res.json({ 
          text: FALLBACK_MESSAGE,
          fallback: true 
        });
      }

      const contents = (history || []).map((m: { role: 'user' | 'model', content: string }) => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: contents,
        config: {
          systemInstruction: "You are 'Dreampath AI' Friendly Mentor for Pakistani students. You help them navigate career choices in Pakistan (HEC universities, MDCAT, ECAT, LAT, scholarships, high-demand fields). Be encouraging, informative, practical, and culturally aware.",
        }
      });

      res.json({ text: response.text || FALLBACK_MESSAGE });
    } catch (error) {
      console.warn("Gemini Chat handled fallback:", error);
      res.json({ 
        text: FALLBACK_MESSAGE,
        fallback: true
      });
    }
  });

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
