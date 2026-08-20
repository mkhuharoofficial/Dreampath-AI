import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const CANDIDATE_MODELS = [
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash",
  "gemini-3.1-flash-lite",
];

/**
 * Intelligent domain-specific Pakistani Career Knowledge Fallback
 * Provides instant, high-quality advice if API models are experiencing temporary high-demand spikes (503/429).
 */
function getSmartCareerKnowledgeResponse(message: string, context?: string): string {
  const query = `${message || ""} ${context || ""}`.toLowerCase();

  if (query.includes("cs") || query.includes("computer science") || query.includes("software") || query.includes("se") || query.includes("coding") || query.includes("programming")) {
    return "In Pakistan's current market, BS Computer Science and BS Software Engineering offer top entry-level opportunities (PKR 90k–220k/month locally, and $1,000–$3,500/month in remote international roles). Top institutions include FAST NUCES, NUST SEECS, COMSATS, GIKI, and ITU. Focus strongly on Data Structures, problem-solving on LeetCode, modern full-stack development, and AI integration during your 2nd and 3rd years.";
  }

  if (query.includes("ai") || query.includes("artificial intelligence") || query.includes("data science") || query.includes("machine learning")) {
    return "BS Artificial Intelligence and BS Data Science are expanding rapidly in Pakistan. Top institutes offering specialized programs include FAST NUCES, NUST, ITU Lahore, and GIKI. Ensure you build strong foundations in Linear Algebra, Python, PyTorch/TensorFlow, and cloud deployment (AWS/GCP) alongside your core degree courses.";
  }

  if (query.includes("mbbs") || query.includes("medical") || query.includes("bds") || query.includes("doctor") || query.includes("mdcat") || query.includes("dpt")) {
    return "For medical aspirants in Pakistan, MDCAT requires early, disciplined preparation focusing on UHS/NUMS/SZABMU/DUHS syllabus. While MBBS and BDS remain prestigious, high-demand allied health fields like Doctor of Physical Therapy (DPT), Medical Lab Technology (MLT), and Pharm-D also offer expanding hospital and private clinic opportunities.";
  }

  if (query.includes("nust") || query.includes("fast") || query.includes("entry test") || query.includes("net") || query.includes("ecat") || query.includes("lat")) {
    return "For university entrance tests in Pakistan: 1) NUST NET: Focus on FSc textbook concepts, speed, and repeated past papers (Series 1–4). 2) FAST NUCES: Emphasize Advanced Math and Basic Math speed without negative marking. 3) ECAT: Strengthen Physics and Mathematics concepts. 4) HEC LAT: Review General Knowledge, English grammar, and Urdu/English essay formats.";
  }

  if (query.includes("business") || query.includes("bba") || query.includes("finance") || query.includes("fintech") || query.includes("accounting") || query.includes("ca")) {
    return "For business & finance in Pakistan: BBA and BS FinTech from IBA Karachi, LUMS, NUST NBS, and LSE provide exceptional corporate recruitment. If you are interested in rigorous accounting, ICAP Chartered Accountancy (CA) or ACCA provide prestigious global mobility with high long-term financial rewards.";
  }

  if (query.includes("law") || query.includes("llb") || query.includes("advocate") || query.includes("css") || query.includes("civil service")) {
    return "5-Year LLB requires clearing the HEC Law Admission Test (LAT) with at least 50% marks. Top institutions include Punjab University Law College, LUMS School of Law, Quaid-i-Azam University, and SZABUL Karachi. A law degree also serves as an outstanding foundation for the CSS (Central Superior Services) competitive examination.";
  }

  if (query.includes("scholarship") || query.includes("fee") || query.includes("financial aid") || query.includes("free")) {
    return "Key scholarship opportunities in Pakistan include: 1) HEC Need-Based Scholarships (covers full tuition + stipend across public universities), 2) Ehsaas Undergraduate Scholarship, 3) PEEF (Punjab Educational Endowment Fund), 4) Ihsan Trust Qarz-e-Hasna (interest-free loans), and 5) Merit scholarships at NUST, FAST, IBA, and LUMS (NOP).";
  }

  return "Every career path has strong potential when paired with market-relevant skills, disciplined study, and continuous practical projects. Explore our 2026 Degree Blueprints to review entry tests, syllabus modules, salary benchmarks, and top Pakistani universities for your chosen field.";
}

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
    } catch {
      return null;
    }
  };

  /**
   * Resilient content generation that falls back through candidates
   * if a 503 (high demand), 429 (rate limit), or temporary unavailable state is encountered.
   */
  const generateResilientContent = async (
    ai: GoogleGenAI,
    contents: any,
    systemInstruction?: string
  ): Promise<string | null> => {
    for (let i = 0; i < CANDIDATE_MODELS.length; i++) {
      const model = CANDIDATE_MODELS[i];
      try {
        const config: any = {};
        if (systemInstruction) {
          config.systemInstruction = systemInstruction;
        }

        const response = await ai.models.generateContent({
          model,
          contents,
          config,
        });

        if (response && response.text && response.text.trim()) {
          return response.text.trim();
        }
      } catch (err: any) {
        const errMessage = String(err?.message || err || "");
        const isSpikeOrUnavailable = 
          errMessage.includes("503") || 
          errMessage.includes("high demand") || 
          errMessage.includes("UNAVAILABLE") || 
          errMessage.includes("429") || 
          errMessage.includes("RESOURCE_EXHAUSTED");

        if (i < CANDIDATE_MODELS.length - 1) {
          if (isSpikeOrUnavailable) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
          continue;
        }
      }
    }
    return null;
  };

  // API Endpoints for Gemini AI
  app.post("/api/gemini/suggest", async (req, res) => {
    const { context } = req.body;
    const ai = getAI();

    if (ai) {
      const prompt = `You are a "DreamPath AI" mentor for Pakistani students. 
The student is currently looking at: ${context || "general career options"}. 
Give a punchy 2-sentence motivational tip or career advice specifically for this context in the Pakistan job market for 2026. 
Keep it inspiring, practical, and professional.`;

      const generated = await generateResilientContent(
        ai,
        prompt,
        "You are Dreampath AI Career Mentor for students in Pakistan. Be practical, inspiring, and culturally relevant."
      );

      if (generated) {
        return res.json({ text: generated, fallback: false });
      }
    }

    // Smart fallback
    const fallbackText = getSmartCareerKnowledgeResponse("", context || "");
    res.json({
      text: fallbackText,
      fallback: true,
    });
  });

  app.post("/api/gemini/chat", async (req, res) => {
    const { history, message } = req.body;
    const ai = getAI();

    if (ai && message) {
      const contents = (history || []).map((m: { role: 'user' | 'model', content: string }) => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const systemInstruction = 
        "You are 'Dreampath AI' Friendly Career Mentor for Pakistani students. You help them navigate career choices in Pakistan (HEC universities like NUST, FAST, LUMS, IBA, GIKI, COMSATS, entrance tests like MDCAT, ECAT, LAT, scholarships, and 2026 market demand). Be encouraging, informative, practical, and culturally aware.";

      const generated = await generateResilientContent(ai, contents, systemInstruction);
      if (generated) {
        return res.json({ text: generated, fallback: false });
      }
    }

    // High quality smart fallback based on student question
    const fallbackResponse = getSmartCareerKnowledgeResponse(message || "", "");
    res.json({
      text: fallbackResponse,
      fallback: true,
    });
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

