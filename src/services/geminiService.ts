/**
 * Dreampath AI - Gemini Service
 * Resilient Gemini AI service with environment secret resolution for Vercel, Vite, and production hosting.
 */

export interface ChatResponseResult {
  text: string;
  isFallback?: boolean;
}

export const FALLBACK_MESSAGE = "Our AI assistant is currently updating. Please try again in a few moments.";

/**
 * Safely resolves the Gemini API key from environment secrets.
 */
export const getResolvedGeminiApiKey = (): string => {
  try {
    // 1. Vite environment secret
    if (typeof import.meta !== 'undefined' && (import.meta as any)?.env) {
      const viteKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      if (typeof viteKey === 'string' && viteKey.trim()) {
        return viteKey.trim();
      }
    }

    // 2. Next.js / Vercel public environment secret
    if (typeof process !== 'undefined' && process.env) {
      const nextPublicKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (typeof nextPublicKey === 'string' && nextPublicKey.trim()) {
        return nextPublicKey.trim();
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      if (typeof geminiKey === 'string' && geminiKey.trim()) {
        return geminiKey.trim();
      }
    }

    // 3. Window runtime environment key
    if (typeof window !== 'undefined') {
      const win = window as any;
      const winKey = win.GEMINI_API_KEY || win.__GEMINI_API_KEY__ || win.VITE_GEMINI_API_KEY;
      if (typeof winKey === 'string' && winKey.trim()) {
        return winKey.trim();
      }
    }
  } catch {
    // Environment resolution safety guard
  }

  return "";
};

/**
 * Direct fetch call to Google Generative Language REST API with fallback models and error handling.
 */
async function callDirectGeminiRestAPI(
  contents: Array<{ role: string; parts: Array<{ text: string }> }>,
  systemInstruction: string,
  apiKey: string
): Promise<string> {
  const models = ['gemini-2.5-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      
      const payload: any = {
        contents,
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      let signal: AbortSignal | undefined = undefined;
      if (typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal) {
        signal = AbortSignal.timeout(15000);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal,
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const message = errJson?.error?.message || `HTTP ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText && typeof generatedText === 'string' && generatedText.trim()) {
        return generatedText.trim();
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Gemini direct model ${model} attempt logged:`, err?.message || err);
    }
  }

  throw lastError || new Error("Failed to generate content from Gemini REST API.");
}

/**
 * Generates an AI suggestion for career roadmap contexts.
 * Wrapped in try/catch to guarantee no runtime crashes.
 */
export const getAISuggestion = async (context: string): Promise<string> => {
  try {
    // 1. Try server proxy endpoint first (if running in fullstack container)
    try {
      const res = await fetch("/api/gemini/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.text && !data?.fallback) return data.text;
      }
    } catch {
      // Server proxy route unavailable, proceed to direct client fallback
    }

    // 2. Direct REST API call if environment secret is present
    const apiKey = getResolvedGeminiApiKey();
    if (apiKey) {
      try {
        const text = await callDirectGeminiRestAPI(
          [{ role: 'user', parts: [{ text: `Provide a quick 2-sentence motivational tip or career advice for: ${context} in Pakistan.` }] }],
          "You are Dreampath AI mentor for Pakistani students. Be encouraging, concise, and realistic.",
          apiKey
        );
        if (text) return text;
      } catch (err) {
        console.warn("getAISuggestion direct call fallback:", err);
      }
    }
  } catch (err) {
    console.warn("getAISuggestion outer error handled:", err);
  }

  // 3. Graceful fallback
  return "Focus on building strong analytical and practical skills in Pakistan's high-demand sectors. Consistency and early exam preparation will pave the way to top universities.";
};

/**
 * Main chat handler for the AI Career Mentor.
 * Always wrapped in try/catch to guarantee zero runtime crashes on Vercel or production hosting.
 */
export const chatWithMentor = async (
  history: { role: 'user' | 'model', content: string }[],
  currentMessage: string
): Promise<ChatResponseResult> => {
  try {
    // 1. Try server-side proxy route first (for full-stack server runtime)
    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: currentMessage }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.text && !data?.fallback) {
          return { text: data.text };
        }
      }
    } catch {
      // Server route not accessible (e.g. Vercel static SPA deployment)
    }

    // 2. Direct REST API call if environment secret is available
    const apiKey = getResolvedGeminiApiKey();
    if (apiKey) {
      try {
        const contents = history.map((m) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));
        contents.push({
          role: 'user',
          parts: [{ text: currentMessage }]
        });

        const responseText = await callDirectGeminiRestAPI(
          contents,
          "You are 'Dreampath AI' Friendly Career Mentor for Pakistani students. You help them navigate career choices in Pakistan (HEC universities, MDCAT, ECAT, LAT, scholarships, high-demand fields). Be encouraging, informative, practical, and culturally aware.",
          apiKey
        );

        if (responseText) {
          return { text: responseText };
        }
      } catch (restErr: any) {
        console.warn("Gemini REST API attempt:", restErr?.message || restErr);
      }
    }
  } catch (outerErr) {
    console.warn("chatWithMentor outer error handled:", outerErr);
  }

  // 3. Clean fallback when API call fails or environment secret is missing
  return {
    text: FALLBACK_MESSAGE,
    isFallback: true
  };
};
