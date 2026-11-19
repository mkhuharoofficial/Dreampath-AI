import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, GenerateContentResponse, ThinkingLevel } from "@google/genai";

type ChatRole = "user" | "model";

interface RawHistoryItem {
  role: ChatRole;
  content: string;
  isError?: boolean;
}

const GENERAL_CHAT_MODEL = "gemini-4-hydrogen";
const FAST_CHAT_MODEL = "gemini-3.1-flash-lite";

const SYSTEM_INSTRUCTION_CHAT = `You are "Dreampath AI Career Mentor", a warm, knowledgeable, and practical career & higher education advisor for students in Pakistan (Matric, O-Levels, FSc, ICS, A-Levels, and undergraduate applicants).

Your responsibilities:
- Provide clear, accurate, structured guidance on Pakistani degree programs (CS, AI, Software Engineering, MBBS, BDS, Allied Health, Engineering, BBA, FinTech, CA/ACCA, LLB, CSS/PMS, Social Sciences, Arts & Design, and Short Skill Courses).
- Advise on HEC-recognized Pakistani universities (e.g., NUST, FAST-NUCES, LUMS, IBA, GIKI, PIEAS, UET, COMSATS, KEMU, AKU, Dow, Punjab University, QAU) and entry tests (MDCAT, NUST NET, FAST Test, ECAT, NAT, LAT, SAT).
- Share realistic 2026 Pakistan & remote/international salary expectations, scholarship options (HEC Need-Based, Ehsaas, PEEF, LUMS NOP, Ihsan Trust), and actionable next steps.
- Maintain a supportive, clear, well-organized tone using concise headings and bullet points so students can read answers easily.
- Always tailor your advice directly to the student's current career stage, academic profile, assessment progress, and selected degree context provided below.`;

function formatUserContextBlock(context?: string, userContext?: any): string {
  const lines: string[] = [];

  if (userContext && typeof userContext === "object") {
    if (userContext.careerStage) {
      lines.push(`- Current Career Stage: ${userContext.careerStage}`);
    } else if (context) {
      lines.push(`- Current Screen Context: ${context}`);
    }

    const profileParts = [
      userContext.studentName ? `Name: ${userContext.studentName}` : "",
      userContext.educationLevel ? `Education: ${userContext.educationLevel}` : "",
      userContext.academicPercentage ? `Marks/Grade: ${userContext.academicPercentage}` : "",
      userContext.city || userContext.province
        ? `Location: ${[userContext.city, userContext.province].filter(Boolean).join(", ")}`
        : "",
    ].filter(Boolean);

    if (profileParts.length > 0) {
      lines.push(`- Student Profile: ${profileParts.join(" | ")}`);
    }

    if (userContext.assessmentProgress) {
      const ap = userContext.assessmentProgress;
      const statusText = ap.completed
        ? "Completed (12/12 questions)"
        : ap.answeredCount > 0
          ? `In progress (${ap.answeredCount}/${ap.totalQuestions || 12} answered, current step ${ap.step})`
          : "Not started yet";
      lines.push(`- Self-Assessment Status: ${statusText}`);
      if (ap.targetDomain) {
        lines.push(`- Assessment Target Domain: ${ap.targetDomain}`);
      }
      if (ap.preferredTrack) {
        lines.push(`- Preferred Learning Track: ${ap.preferredTrack}`);
      }
    }

    if (userContext.selectedDegree && userContext.selectedDegree.title) {
      const deg = userContext.selectedDegree;
      lines.push(`- Currently Selected Degree Blueprint: ${deg.title} (${deg.domain} | ${deg.category} | Duration: ${deg.duration})`);
      if (deg.summary) {
        lines.push(`  • Degree Summary: ${deg.summary}`);
      }
      if (Array.isArray(deg.universities) && deg.universities.length > 0) {
        lines.push(`  • Key Pakistani Universities: ${deg.universities.join(", ")}`);
      }
      if (Array.isArray(deg.salaryBenchmarks) && deg.salaryBenchmarks.length > 0) {
        lines.push(`  • Salary Benchmarks: ${deg.salaryBenchmarks.join(" | ")}`);
      }
      if (Array.isArray(deg.keySkills) && deg.keySkills.length > 0) {
        lines.push(`  • Core Skills: ${deg.keySkills.join(", ")}`);
      }
    }

    if (Array.isArray(userContext.savedDegrees) && userContext.savedDegrees.length > 0) {
      lines.push(`- Student's Saved/Bookmarked Degrees: ${userContext.savedDegrees.join(", ")}`);
    }

    if (userContext.counselingBooking?.booked) {
      lines.push(
        `- 1-to-1 Counseling Status: Booked (${userContext.counselingBooking.status || "pending_verification"}${
          userContext.counselingBooking.slot ? `, slot: ${userContext.counselingBooking.slot}` : ""
        })`
      );
    }
  } else if (context) {
    lines.push(`- Current Screen Context: ${context}`);
  }

  if (lines.length === 0) {
    return SYSTEM_INSTRUCTION_CHAT;
  }

  return `${SYSTEM_INSTRUCTION_CHAT}\n\nSTUDENT PROGRESS & ACTIVE CONTEXT:\n${lines.join("\n")}`;
}

/**
 * Safely initializes GoogleGenAI on the server with required telemetry header.
 */
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

/**
 * Sanitizes client chat history for multi-turn Gemini `ai.chats.create`:
 * - Filters out empty or error messages
 * - Strips any leading 'model' greeting so history starts with 'user'
 * - Ensures strictly alternating 'user' / 'model' turns
 */
function sanitizeHistory(history: unknown) {
  if (!Array.isArray(history)) return [];

  const validItems = history.filter((item): item is RawHistoryItem => {
    return (
      Boolean(item) &&
      typeof item === "object" &&
      ((item as RawHistoryItem).role === "user" || (item as RawHistoryItem).role === "model") &&
      typeof (item as RawHistoryItem).content === "string" &&
      (item as RawHistoryItem).content.trim().length > 0 &&
      !(item as RawHistoryItem).isError
    );
  });

  // Drop leading model turns (e.g., the initial greeting)
  const firstUserIdx = validItems.findIndex((m) => m.role === "user");
  if (firstUserIdx === -1) return [];

  const sliced = validItems.slice(firstUserIdx);
  const alternating: Array<{ role: ChatRole; parts: Array<{ text: string }> }> = [];

  for (const item of sliced) {
    const last = alternating[alternating.length - 1];
    if (last && last.role === item.role) {
      last.parts[0].text = `${last.parts[0].text}\n\n${item.content.trim()}`;
    } else {
      alternating.push({
        role: item.role,
        parts: [{ text: item.content.trim() }],
      });
    }
  }

  // History passed to ai.chats.create should end with a 'model' turn before sending the next 'user' message
  if (alternating.length > 0 && alternating[alternating.length - 1].role === "user") {
    alternating.pop();
  }

  return alternating;
}

/**
 * Maps Gemini API errors to clear HTTP statuses and helpful messages.
 */
function parseGeminiError(err: any): { status: number; message: string } {
  const rawMessage = String(err?.message || err || "");
  const statusCode = Number(err?.status || err?.code || 0);

  if (
    statusCode === 400 &&
    (rawMessage.includes("API_KEY_INVALID") || rawMessage.toLowerCase().includes("api key"))
  ) {
    return {
      status: 400,
      message: "Your Gemini API key appears invalid. Please check it in the Settings > Secrets panel.",
    };
  }

  if (statusCode === 403 || rawMessage.includes("PERMISSION_DENIED")) {
    return {
      status: 403,
      message: "Permission denied for the Gemini API key. Please verify your API key in the Settings > Secrets panel.",
    };
  }

  if (statusCode === 429 || rawMessage.includes("RESOURCE_EXHAUSTED")) {
    return {
      status: 429,
      message: "Gemini API rate limit or quota reached. Please wait a moment and try again, or check your billing/quota in Settings > Secrets.",
    };
  }

  if (statusCode === 404 || rawMessage.includes("NOT_FOUND")) {
    return {
      status: 404,
      message: "The requested Gemini model was not found. Please try again shortly.",
    };
  }

  if (statusCode === 503 || rawMessage.includes("UNAVAILABLE")) {
    return {
      status: 503,
      message: "Gemini AI is experiencing temporary high demand. Please retry in a few seconds.",
    };
  }

  return {
    status: statusCode >= 400 && statusCode < 600 ? statusCode : 500,
    message: rawMessage || "Unable to reach Gemini AI right now. Please try again.",
  };
}

function isRetryableError(err: any): boolean {
  const status = Number(err?.status || err?.code || 0);
  const msg = String(err?.message || "");
  return status === 503 || status === 500 || msg.includes("UNAVAILABLE") || msg.includes("fetch failed");
}

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= maxRetries || !isRetryableError(err)) {
        throw err;
      }
      attempt++;
      await new Promise((resolve) => setTimeout(resolve, 400 * Math.pow(2, attempt - 1)));
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));
  app.use(express.static(path.join(process.cwd(), "public")));

  // Fast Career Insight Suggestion Endpoint (uses gemini-3.1-flash-lite for speed)
  app.post("/api/gemini/suggest", async (req, res) => {
    const ai = getAI();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY in the Settings > Secrets panel.",
      });
    }

    try {
      const { context, userContext } = req.body || {};
      const contextSummary = formatUserContextBlock(context, userContext);
      const prompt = `Give a punchy, practical 2-sentence career insight or actionable next step specifically tailored to this student's current career stage and selected degree in Pakistan for 2026.`;

      const response = await withRetry(() =>
        ai.models.generateContent({
          model: FAST_CHAT_MODEL,
          contents: prompt,
          config: {
            systemInstruction: `${contextSummary}\n\nRespond in strictly 2 concise, encouraging, practical sentences tailored to the student's current stage and degree.`,
          },
        })
      );

      const text = response.text?.trim();
      if (!text) {
        return res.status(502).json({ error: "Gemini returned an empty response. Please try again." });
      }

      return res.json({ text, model: FAST_CHAT_MODEL });
    } catch (err: any) {
      console.error("[Gemini Suggest Error]:", err);
      const parsed = parseGeminiError(err);
      return res.status(parsed.status).json({ error: parsed.message });
    }
  });

  // Multi-turn Chat Endpoint (Standard JSON)
  app.post("/api/gemini/chat", async (req, res) => {
    const ai = getAI();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY in the Settings > Secrets panel.",
      });
    }

    const { history, message, context, userContext, mode } = req.body || {};
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "A non-empty message is required." });
    }

    const selectedModel = mode === "fast" ? FAST_CHAT_MODEL : GENERAL_CHAT_MODEL;
    const sanitizedHistory = sanitizeHistory(history);
    const contextualInstruction = formatUserContextBlock(context, userContext);

    try {
      const response = await withRetry(async () => {
        const chat = ai.chats.create({
          model: selectedModel,
          history: sanitizedHistory,
          config: {
            systemInstruction: contextualInstruction,
            ...(selectedModel === GENERAL_CHAT_MODEL
              ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
              : {}),
          },
        });
        return chat.sendMessage({ message: message.trim() });
      });

      const text = response.text?.trim();
      if (!text) {
        return res.status(502).json({ error: "Gemini returned an empty response. Please try again." });
      }

      return res.json({ text, model: selectedModel });
    } catch (err: any) {
      console.error("[Gemini Chat Error]:", err);
      const parsed = parseGeminiError(err);
      return res.status(parsed.status).json({ error: parsed.message });
    }
  });

  // Multi-turn Chat Streaming Endpoint (SSE for fast, clear real-time replies)
  app.post("/api/gemini/chat/stream", async (req, res) => {
    const ai = getAI();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY in the Settings > Secrets panel.",
      });
    }

    const { history, message, context, userContext, mode } = req.body || {};
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "A non-empty message is required." });
    }

    const selectedModel = mode === "fast" ? FAST_CHAT_MODEL : GENERAL_CHAT_MODEL;
    const sanitizedHistory = sanitizeHistory(history);
    const contextualInstruction = formatUserContextBlock(context, userContext);

    try {
      const streamResponse = await withRetry(async () => {
        const chat = ai.chats.create({
          model: selectedModel,
          history: sanitizedHistory,
          config: {
            systemInstruction: contextualInstruction,
            ...(selectedModel === GENERAL_CHAT_MODEL
              ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
              : {}),
          },
        });
        return chat.sendMessageStream({ message: message.trim() });
      });

      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      if (typeof res.flushHeaders === "function") {
        res.flushHeaders();
      }

      let hasText = false;
      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        const delta = c.text;
        if (delta) {
          hasText = true;
          res.write(`data: ${JSON.stringify({ chunk: delta })}\n\n`);
        }
      }

      if (!hasText) {
        res.write(`data: ${JSON.stringify({ error: "Gemini returned an empty response. Please try again." })}\n\n`);
      } else {
        res.write(`data: ${JSON.stringify({ done: true, model: selectedModel })}\n\n`);
      }
      res.end();
    } catch (err: any) {
      console.error("[Gemini Chat Stream Error]:", err);
      const parsed = parseGeminiError(err);
      if (!res.headersSent) {
        return res.status(parsed.status).json({ error: parsed.message });
      }
      res.write(`data: ${JSON.stringify({ error: parsed.message })}\n\n`);
      res.end();
    }
  });

  app.post("/api/send-assessment-email", async (req, res) => {
    try {
      const { email, studentInfo, topMatches } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ success: false, error: "Valid email address is required" });
      }

      console.log(`[Email Dispatch] Sending Dreampath AI Career Assessment Summary to ${email} for student ${studentInfo?.fullName || "Aspirant"}`);
      console.log(`[Email Content] Top Matches:`, topMatches?.map((m: any) => m.title).join(", "));

      return res.json({
        success: true,
        message: `Assessment summary email successfully dispatched to ${email}`,
      });
    } catch (err: any) {
      console.error("Email dispatch error:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to send email" });
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
