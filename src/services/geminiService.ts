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

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || 'Unable to load AI insight right now. Please try again.');
  }

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

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || 'Unable to connect to Dreampath AI. Please try again.');
  }

  if (!data?.text || typeof data.text !== 'string') {
    throw new Error('Empty response received from AI service.');
  }

  return {
    text: data.text,
    model: data.model,
  };
};

/**
 * Multi-turn streaming chat handler via Server-Sent Events (SSE).
 * Delivers real-time chunks to `onChunk` so answers appear immediately and clearly.
 */
export const streamChatWithMentor = async (
  history: ChatMessage[],
  currentMessage: string,
  onChunk: (chunkText: string) => void,
  options?: ChatOptions
): Promise<ChatResponseResult> => {
  const res = await fetch('/api/gemini/chat/stream', {
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
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error || 'Unable to connect to Dreampath AI. Please try again.');
  }

  if (!res.body) {
    // Fallback to standard non-streaming response if ReadableStream is unavailable
    return chatWithMentor(history, currentMessage, options);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';
  let usedModel: string | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split('\n\n');
    buffer = events.pop() || '';

    for (const rawEvent of events) {
      const lines = rawEvent.split('\n');
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
          fullText += parsed.chunk;
          onChunk(parsed.chunk);
        }
        if (parsed.model) {
          usedModel = parsed.model;
        }
      }
    }
  }

  if (!fullText.trim()) {
    throw new Error('No response text was received from Dreampath AI. Please try again.');
  }

  return { text: fullText, model: usedModel };
};
