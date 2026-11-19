/**
 * Dreampath AI - Client Service for Gemini AI Endpoints
 * Communicates strictly with server-side /api/gemini/* routes.
 */

export type ChatMode = 'balanced' | 'fast';

export interface StudentCareerContext {
  studentName?: string;
  city?: string;
  province?: string;
  educationLevel?: string;
  academicPercentage?: string;
  careerStage: string;
  currentScreen: string;
  pageDescription: string;
  assessmentProgress: {
    step: number;
    answeredCount: number;
    totalQuestions: number;
    completed: boolean;
    targetDomain?: string;
    preferredTrack?: string;
  };
  selectedDegree?: {
    id: string;
    title: string;
    domain: string;
    category: string;
    duration: string;
    summary: string;
    universities: string[];
    salaryBenchmarks: string[];
    keySkills: string[];
  };
  savedDegrees: string[];
  counselingBooking?: {
    booked: boolean;
    status?: string;
    slot?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  isError?: boolean;
}

export interface ChatResponseResult {
  text: string;
  model?: string;
}

export interface ChatOptions {
  context?: string;
  userContext?: StudentCareerContext;
  mode?: ChatMode;
}

class ApiHttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function extractApiError(res: Response, fallbackMessage: string): Promise<ApiHttpError> {
  const raw = await res.text().catch(() => '');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.error && typeof parsed.error === 'string') {
        return new ApiHttpError(parsed.error, res.status);
      }
    } catch {
      // Non-JSON response (e.g., 404 HTML or Vercel proxy timeout)
    }
  }

  if (res.status === 404) {
    return new ApiHttpError(
      'AI backend endpoint (/api/gemini) was not found. Ensure the /api serverless functions are deployed and GEMINI_API_KEY is configured.',
      404
    );
  }
  if (res.status === 504) {
    return new ApiHttpError(
      'Dreampath AI took too long to respond. Please switch to Fast mode or retry.',
      504
    );
  }

  return new ApiHttpError(`${fallbackMessage} (HTTP ${res.status})`, res.status);
}

/**
 * Generates a fast contextual career insight tip via the server-side Gemini endpoint.
 */
export const getAISuggestion = async (
  context: string,
  userContext?: StudentCareerContext
): Promise<string> => {
  const res = await fetch('/api/gemini/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, userContext }),
  });

  if (!res.ok) {
    throw await extractApiError(res, 'Unable to load AI insight right now. Please try again.');
  }

  const data = await res.json().catch(() => ({}));
  if (!data?.text || typeof data.text !== 'string') {
    throw new Error('Empty response received from AI service.');
  }

  return data.text;
};

/**
 * Multi-turn chat handler (non-streaming) via server-side Gemini Chat API.
 */
export const chatWithMentor = async (
  history: ChatMessage[],
  currentMessage: string,
  options?: ChatOptions
): Promise<ChatResponseResult> => {
  const res = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      history,
      message: currentMessage,
      context: options?.context,
      userContext: options?.userContext,
      mode: options?.mode || 'balanced',
    }),
  });

  if (!res.ok) {
    throw await extractApiError(res, 'Unable to connect to Dreampath AI. Please try again.');
  }

  const data = await res.json().catch(() => ({}));
  if (!data?.text || typeof data.text !== 'string') {
    throw new Error('Empty response received from AI service.');
  }

  return {
    text: data.text,
    model: data.model,
  };
};

function processSseEventBlock(
  rawEvent: string,
  onDelta: (chunk: string) => void,
  onModel: (model: string) => void
) {
  const lines = rawEvent.split(/\r?\n/);
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const payloadStr = line.slice(6).trim();
    if (!payloadStr) continue;

    let parsed: any;
    try {
      parsed = JSON.parse(payloadStr);
    } catch {
      continue;
    }

    if (parsed.error) {
      throw new Error(parsed.error);
    }
    if (typeof parsed.chunk === 'string' && parsed.chunk.length > 0) {
      onDelta(parsed.chunk);
    }
    if (parsed.model) {
      onModel(parsed.model);
    }
  }
}

/**
 * Multi-turn streaming chat handler via Server-Sent Events (SSE).
 * Falls back cleanly to standard /api/gemini/chat if streaming is buffered/unavailable on a hosting edge.
 */
export const streamChatWithMentor = async (
  history: ChatMessage[],
  currentMessage: string,
  onChunk: (chunkText: string) => void,
  options?: ChatOptions
): Promise<ChatResponseResult> => {
  let fullText = '';
  let usedModel: string | undefined;

  const fallbackToNonStreaming = async (): Promise<ChatResponseResult> => {
    const result = await chatWithMentor(history, currentMessage, options);
    onChunk(result.text);
    return result;
  };

  let res: Response;
  try {
    res = await fetch('/api/gemini/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history,
        message: currentMessage,
        context: options?.context,
        userContext: options?.userContext,
        mode: options?.mode || 'balanced',
      }),
    });
  } catch {
    return fallbackToNonStreaming();
  }

  if (!res.ok) {
    const apiErr = await extractApiError(res, 'Unable to connect to Dreampath AI. Please try again.');
    // For client/key/quota errors, throw immediately; for transient proxy/stream route issues, try non-streaming endpoint
    if ([400, 401, 403, 429].includes(apiErr.status)) {
      throw apiErr;
    }
    try {
      return await fallbackToNonStreaming();
    } catch (fallbackErr: any) {
      throw fallbackErr instanceof Error ? fallbackErr : apiErr;
    }
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json().catch(() => ({}));
    if (data?.text && typeof data.text === 'string') {
      onChunk(data.text);
      return { text: data.text, model: data.model };
    }
    if (data?.error) {
      throw new Error(data.error);
    }
  }

  if (!res.body) {
    return fallbackToNonStreaming();
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        buffer += decoder.decode();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || '';

      for (const rawEvent of events) {
        processSseEventBlock(
          rawEvent,
          (delta) => {
            fullText += delta;
            onChunk(delta);
          },
          (model) => {
            usedModel = model;
          }
        );
      }
    }

    if (buffer.trim()) {
      processSseEventBlock(
        buffer,
        (delta) => {
          fullText += delta;
          onChunk(delta);
        },
        (model) => {
          usedModel = model;
        }
      );
    }
  } catch (streamErr) {
    if (!fullText.trim()) {
      return fallbackToNonStreaming();
    }
    throw streamErr;
  }

  if (!fullText.trim()) {
    return fallbackToNonStreaming();
  }

  return { text: fullText, model: usedModel };
};
