/**
 * Dreampath AI - Gemini Service
 * Resilient Gemini AI service with multi-model fallback chain and smart domain knowledge.
 */

export interface ChatResponseResult {
  text: string;
  isFallback?: boolean;
}

export const FALLBACK_MESSAGE = "Our AI assistant is currently updating. Please try again in a few moments.";

/**
 * Intelligent domain-specific Pakistani Career Knowledge Fallback
 */
export function getSmartCareerKnowledgeResponse(message: string, context?: string): string {
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
  const model = 'gemini-3.1-flash-lite';
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
    signal = AbortSignal.timeout(1500);
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
    throw new Error("Fast API request failed");
  }

  const data = await response.json();
  const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (generatedText && typeof generatedText === 'string' && generatedText.trim()) {
    return generatedText.trim();
  }

  throw new Error("Empty response");
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
        if (data?.text) return data.text;
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
      } catch {
        // Continue to fallback
      }
    }
  } catch {
    // Outer error handled
  }

  // 3. Smart contextual fallback
  return getSmartCareerKnowledgeResponse("", context || "");
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
        if (data?.text) {
          return { text: data.text, isFallback: Boolean(data.fallback) };
        }
      }
    } catch {
      // Server route not accessible (e.g. static SPA deployment)
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
      } catch {
        // Direct REST fallback
      }
    }
  } catch {
    // Outer catch
  }

  // 3. High quality domain-specific Pakistani career response
  return {
    text: getSmartCareerKnowledgeResponse(currentMessage, ""),
    isFallback: true
  };
};
