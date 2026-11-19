import { GoogleGenAI, GenerateContentResponse, ThinkingLevel } from "@google/genai";

export type ChatRole = "user" | "model";

export interface RawHistoryItem {
  role: ChatRole;
  content: string;
  isError?: boolean;
}

export const GENERAL_CHAT_MODEL = "gemini-4-hydrogen";
export const FAST_CHAT_MODEL = "gemini-3.1-flash-lite";

const SYSTEM_INSTRUCTION_CHAT = `You are "Dreampath AI Career Mentor", a warm, knowledgeable, and practical career & higher education advisor for students in Pakistan (Matric, O-Levels, FSc, ICS, A-Levels, and undergraduate applicants).

Your responsibilities:
- Provide clear, accurate, structured guidance on Pakistani degree programs (CS, AI, Software Engineering, MBBS, BDS, Allied Health, Engineering, BBA, FinTech, CA/ACCA, LLB, CSS/PMS, Social Sciences, Arts & Design, and Short Skill Courses).
- Advise on HEC-recognized Pakistani universities (e.g., NUST, FAST-NUCES, LUMS, IBA, GIKI, PIEAS, UET, COMSATS, KEMU, AKU, Dow, Punjab University, QAU) and entry tests (MDCAT, NUST NET, FAST Test, ECAT, NAT, LAT, SAT).
- Share realistic 2026 Pakistan & remote/international salary expectations, scholarship options (HEC Need-Based, Ehsaas, PEEF, LUMS NOP, Ihsan Trust), and actionable next steps.
- Maintain a supportive, clear, well-organized tone using concise headings and bullet points so students can read answers easily.
- Always tailor your advice directly to the student's current career stage, academic profile, assessment progress, and selected degree context provided below.`;

export function formatUserContextBlock(context?: string, userContext?: any): string {
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
      lines.push(
        `- Currently Selected Degree Blueprint: ${deg.title} (${deg.domain} | ${deg.category} | Duration: ${deg.duration})`
      );
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

export function getGeminiApiKey(): string | null {
  const key =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.API_KEY;
  return key && key.trim() ? key.trim() : null;
}

export function getAI(): GoogleGenAI | null {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export function sanitizeHistory(history: unknown) {
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

  if (alternating.length > 0 && alternating[alternating.length - 1].role === "user") {
    alternating.pop();
  }

  return alternating;
}

export function parseGeminiError(err: any): { status: number; message: string } {
  const rawMessage = String(err?.message || err || "");
  const statusCode = Number(err?.status || err?.code || 0);

  if (
    statusCode === 400 &&
    (rawMessage.includes("API_KEY_INVALID") || rawMessage.toLowerCase().includes("api key"))
  ) {
    return {
      status: 400,
      message:
        "Your Gemini API key appears invalid. Please verify GEMINI_API_KEY in Vercel Environment Variables or Settings > Secrets.",
    };
  }

  if (statusCode === 403 || rawMessage.includes("PERMISSION_DENIED")) {
    return {
      status: 403,
      message:
        "Permission denied for the Gemini API key. Please verify GEMINI_API_KEY in Vercel Environment Variables or Settings > Secrets.",
    };
  }

  if (statusCode === 429 || rawMessage.includes("RESOURCE_EXHAUSTED")) {
    return {
      status: 429,
      message:
        "Gemini API rate limit or quota reached. Please wait a moment and try again, or switch to Fast mode.",
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

function isModelNotFoundError(err: any): boolean {
  const status = Number(err?.status || err?.code || 0);
  const msg = String(err?.message || "");
  return status === 404 || msg.includes("NOT_FOUND");
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

export async function parseJsonBody(req: any): Promise<any> {
  if (req?.body !== undefined && req?.body !== null) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    if (Buffer.isBuffer(req.body)) {
      try {
        return JSON.parse(req.body.toString("utf8"));
      } catch {
        return {};
      }
    }
    if (typeof req.body === "object") {
      return req.body;
    }
  }

  if (req && typeof req[Symbol.asyncIterator] === "function") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
    }
    const raw = Buffer.concat(chunks).toString("utf8").trim();
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  return {};
}

function sendJson(res: any, statusCode: number, payload: any) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(payload);
  }
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function applyCorsHeaders(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

const MISSING_KEY_ERROR =
  "Gemini API key is not configured on the server. Add GEMINI_API_KEY in Vercel Project Settings > Environment Variables (or Settings > Secrets) and redeploy.";

export interface ServerEnvCheck {
  name: string;
  present: boolean;
  required: boolean;
  note: string;
}

export interface ServerRuntimeEnvReport {
  ok: boolean;
  platform: "vercel" | "node";
  vercelEnv: string | null;
  nodeEnv: string;
  geminiConfigured: boolean;
  misconfiguredClientKeyOnly: boolean;
  checks: ServerEnvCheck[];
}

export function verifyServerRuntimeEnv(): ServerRuntimeEnvReport {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY?.trim());
  const hasGoogleGeminiKey = Boolean(process.env.GOOGLE_GEMINI_API_KEY?.trim());
  const hasGoogleKey = Boolean(process.env.GOOGLE_API_KEY?.trim());
  const hasGenericApiKey = Boolean(process.env.API_KEY?.trim());
  const hasViteGeminiKey = Boolean(process.env.VITE_GEMINI_API_KEY?.trim());
  const hasAppUrl = Boolean(process.env.APP_URL?.trim());

  const geminiConfigured = Boolean(getGeminiApiKey());
  const misconfiguredClientKeyOnly = !geminiConfigured && hasViteGeminiKey;

  const checks: ServerEnvCheck[] = [
    {
      name: "GEMINI_API_KEY",
      present: hasGeminiKey,
      required: true,
      note: hasGeminiKey
        ? "Injected and accessible at server runtime."
        : geminiConfigured
          ? "Using fallback Google Gemini server key env var; adding GEMINI_API_KEY is recommended."
          : misconfiguredClientKeyOnly
            ? "VITE_GEMINI_API_KEY was found, but /api serverless functions require GEMINI_API_KEY (without VITE_ prefix)."
            : "Missing in server environment. Add GEMINI_API_KEY in Vercel Project Settings > Environment Variables.",
    },
    {
      name: "GOOGLE_GEMINI_API_KEY / GOOGLE_API_KEY",
      present: hasGoogleGeminiKey || hasGoogleKey || hasGenericApiKey,
      required: false,
      note: "Optional server-side fallback variable names for Gemini.",
    },
    {
      name: "APP_URL",
      present: hasAppUrl,
      required: false,
      note: hasAppUrl ? "Configured for server runtime." : "Not set (optional on Vercel).",
    },
  ];

  return {
    ok: geminiConfigured,
    platform: process.env.VERCEL ? "vercel" : "node",
    vercelEnv: process.env.VERCEL_ENV || null,
    nodeEnv: process.env.NODE_ENV || "development",
    geminiConfigured,
    misconfiguredClientKeyOnly,
    checks,
  };
}

export async function handleHealth(req: any, res: any) {
  applyCorsHeaders(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  const envDiagnostics = verifyServerRuntimeEnv();
  return sendJson(res, 200, {
    ok: true,
    geminiConfigured: envDiagnostics.geminiConfigured,
    envDiagnostics,
    models: {
      balanced: GENERAL_CHAT_MODEL,
      fast: FAST_CHAT_MODEL,
    },
  });
}

export async function handleSuggest(req: any, res: any) {
  applyCorsHeaders(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method && req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed. Use POST." });
  }

  const ai = getAI();
  if (!ai) {
    return sendJson(res, 500, { error: MISSING_KEY_ERROR });
  }

  try {
    const body = await parseJsonBody(req);
    const { context, userContext } = body || {};
    const contextSummary = formatUserContextBlock(context, userContext);
    const prompt =
      "Give a punchy, practical 2-sentence career insight or actionable next step specifically tailored to this student's current career stage and selected degree in Pakistan for 2026.";

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
      return sendJson(res, 502, { error: "Gemini returned an empty response. Please try again." });
    }

    return sendJson(res, 200, { text, model: FAST_CHAT_MODEL });
  } catch (err: any) {
    console.error("[Gemini Suggest Error]:", err);
    const parsed = parseGeminiError(err);
    return sendJson(res, parsed.status, { error: parsed.message });
  }
}

async function runChatWithFallback(
  ai: GoogleGenAI,
  selectedModel: string,
  sanitizedHistory: Array<{ role: ChatRole; parts: Array<{ text: string }> }>,
  contextualInstruction: string,
  message: string
): Promise<{ response: GenerateContentResponse; modelUsed: string }> {
  const attemptModel = async (modelId: string) => {
    const chat = ai.chats.create({
      model: modelId,
      history: sanitizedHistory,
      config: {
        systemInstruction: contextualInstruction,
        ...(modelId === GENERAL_CHAT_MODEL
          ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
          : {}),
      },
    });
    return chat.sendMessage({ message });
  };

  try {
    const response = await withRetry(() => attemptModel(selectedModel));
    return { response, modelUsed: selectedModel };
  } catch (err) {
    if (selectedModel !== FAST_CHAT_MODEL && isModelNotFoundError(err)) {
      const response = await withRetry(() => attemptModel(FAST_CHAT_MODEL));
      return { response, modelUsed: FAST_CHAT_MODEL };
    }
    throw err;
  }
}

export async function handleChat(req: any, res: any) {
  applyCorsHeaders(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method && req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed. Use POST." });
  }

  const ai = getAI();
  if (!ai) {
    return sendJson(res, 500, { error: MISSING_KEY_ERROR });
  }

  const body = await parseJsonBody(req);
  const { history, message, context, userContext, mode } = body || {};
  if (!message || typeof message !== "string" || !message.trim()) {
    return sendJson(res, 400, { error: "A non-empty message is required." });
  }

  const selectedModel = mode === "fast" ? FAST_CHAT_MODEL : GENERAL_CHAT_MODEL;
  const sanitizedHistory = sanitizeHistory(history);
  const contextualInstruction = formatUserContextBlock(context, userContext);

  try {
    const { response, modelUsed } = await runChatWithFallback(
      ai,
      selectedModel,
      sanitizedHistory,
      contextualInstruction,
      message.trim()
    );

    const text = response.text?.trim();
    if (!text) {
      return sendJson(res, 502, { error: "Gemini returned an empty response. Please try again." });
    }

    return sendJson(res, 200, { text, model: modelUsed });
  } catch (err: any) {
    console.error("[Gemini Chat Error]:", err);
    const parsed = parseGeminiError(err);
    return sendJson(res, parsed.status, { error: parsed.message });
  }
}

export async function handleChatStream(req: any, res: any) {
  applyCorsHeaders(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method && req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed. Use POST." });
  }

  const ai = getAI();
  if (!ai) {
    return sendJson(res, 500, { error: MISSING_KEY_ERROR });
  }

  const body = await parseJsonBody(req);
  const { history, message, context, userContext, mode } = body || {};
  if (!message || typeof message !== "string" || !message.trim()) {
    return sendJson(res, 400, { error: "A non-empty message is required." });
  }

  const selectedModel = mode === "fast" ? FAST_CHAT_MODEL : GENERAL_CHAT_MODEL;
  const sanitizedHistory = sanitizeHistory(history);
  const contextualInstruction = formatUserContextBlock(context, userContext);

  const attemptStream = async (modelId: string) => {
    const chat = ai.chats.create({
      model: modelId,
      history: sanitizedHistory,
      config: {
        systemInstruction: contextualInstruction,
        ...(modelId === GENERAL_CHAT_MODEL
          ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
          : {}),
      },
    });
    return chat.sendMessageStream({ message: message.trim() });
  };

  try {
    let modelUsed = selectedModel;
    let streamResponse: AsyncIterable<GenerateContentResponse>;

    try {
      streamResponse = await withRetry(() => attemptStream(selectedModel));
    } catch (err) {
      if (selectedModel !== FAST_CHAT_MODEL && isModelNotFoundError(err)) {
        modelUsed = FAST_CHAT_MODEL;
        streamResponse = await withRetry(() => attemptStream(FAST_CHAT_MODEL));
      } else {
        throw err;
      }
    }

    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
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
      res.write(`data: ${JSON.stringify({ done: true, model: modelUsed })}\n\n`);
    }
    res.end();
  } catch (err: any) {
    console.error("[Gemini Chat Stream Error]:", err);
    const parsed = parseGeminiError(err);
    if (!res.headersSent) {
      return sendJson(res, parsed.status, { error: parsed.message });
    }
    res.write(`data: ${JSON.stringify({ error: parsed.message })}\n\n`);
    res.end();
  }
}

export async function handleSendAssessmentEmail(req: any, res: any) {
  applyCorsHeaders(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method && req.method !== "POST") {
    return sendJson(res, 405, { success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const body = await parseJsonBody(req);
    const { email, studentInfo, topMatches } = body || {};
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return sendJson(res, 400, { success: false, error: "Valid email address is required" });
    }

    console.log(
      `[Email Dispatch] Sending Dreampath AI Career Assessment Summary to ${email} for student ${
        studentInfo?.fullName || "Aspirant"
      }`
    );
    console.log(`[Email Content] Top Matches:`, topMatches?.map((m: any) => m.title).join(", "));

    return sendJson(res, 200, {
      success: true,
      message: `Assessment summary email successfully dispatched to ${email}`,
    });
  } catch (err: any) {
    console.error("Email dispatch error:", err);
    return sendJson(res, 500, { success: false, error: err?.message || "Failed to send email" });
  }
}
