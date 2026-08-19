import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  User as FirebaseUser, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "./firebase";

export const CHAT_SCOPES = [
  "https://www.googleapis.com/auth/chat.spaces",
  "https://www.googleapis.com/auth/chat.spaces.readonly",
  "https://www.googleapis.com/auth/chat.spaces.create",
  "https://www.googleapis.com/auth/chat.messages",
  "https://www.googleapis.com/auth/chat.messages.readonly",
  "https://www.googleapis.com/auth/chat.messages.create",
  "https://www.googleapis.com/auth/chat.messages.reactions",
  "https://www.googleapis.com/auth/chat.messages.reactions.readonly",
  "https://www.googleapis.com/auth/chat.messages.reactions.create",
  "https://www.googleapis.com/auth/chat.memberships",
  "https://www.googleapis.com/auth/chat.memberships.readonly",
  "https://www.googleapis.com/auth/chat.customemojis",
  "https://www.googleapis.com/auth/chat.customemojis.readonly",
  "https://www.googleapis.com/auth/chat.users.readstate",
  "https://www.googleapis.com/auth/chat.users.readstate.readonly",
  "https://www.googleapis.com/auth/chat.users.spacesettings",
];

// In-memory token cache (Do NOT store in localStorage or sessionStorage per security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Clear cached token on sign-out
onAuthStateChanged(auth, (user) => {
  if (!user) {
    cachedAccessToken = null;
  }
});

export const getGoogleChatAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setGoogleChatAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const signInWithGoogleChat = async (): Promise<{ user: FirebaseUser; accessToken: string }> => {
  try {
    isSigningIn = true;
    const provider = new GoogleAuthProvider();
    CHAT_SCOPES.forEach((scope) => provider.addScope(scope));
    // Prompt user for consent if needed to ensure all Google Chat scopes are authorized
    provider.setCustomParameters({
      prompt: 'consent',
      access_type: 'offline'
    });

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error("Could not retrieve Google Chat access token. Please grant permissions.");
    }

    cachedAccessToken = credential.accessToken;
    return {
      user: result.user,
      accessToken: cachedAccessToken,
    };
  } finally {
    isSigningIn = false;
  }
};

export interface ChatSpace {
  name: string; // e.g. "spaces/AAAA..."
  displayName?: string;
  type?: 'SPACE' | 'GROUP_CHAT' | 'DIRECT_MESSAGE' | string;
  spaceType?: 'SPACE' | 'GROUP_CHAT' | 'DIRECT_MESSAGE' | string;
  singleUserBotDm?: boolean;
  threaded?: boolean;
  spaceDetails?: {
    description?: string;
    guidelines?: string;
  };
  membershipCount?: {
    joinedDirectHumanUserCount?: number;
  };
  createTime?: string;
}

export interface ChatMessage {
  name: string; // e.g. "spaces/AAAA.../messages/BBBB..."
  text?: string;
  formattedText?: string;
  sender?: {
    name?: string;
    displayName?: string;
    avatarUrl?: string;
    type?: 'HUMAN' | 'BOT' | string;
    email?: string;
  };
  createTime?: string;
  emojiReactionSummaries?: {
    emoji?: {
      unicode?: string;
    };
    reactionCount?: number;
  }[];
}

export interface ChatMember {
  name: string;
  state?: string;
  role?: 'ROLE_MEMBER' | 'ROLE_MANAGER' | string;
  member?: {
    name?: string;
    displayName?: string;
    avatarUrl?: string;
    type?: 'HUMAN' | 'BOT' | string;
    email?: string;
  };
}

const CHAT_API_BASE = "https://chat.googleapis.com/v1";

/**
 * Fetch all accessible Google Chat spaces for the authenticated user
 */
export async function listChatSpaces(token?: string): Promise<ChatSpace[]> {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error("Authentication required. Please sign in with Google to view your Google Chat spaces.");
  }

  const response = await fetch(`${CHAT_API_BASE}/spaces?pageSize=100`, {
    headers: {
      Authorization: `Bearer ${activeToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData.error?.message || `Google Chat API error (${response.status})`;
    throw new Error(message);
  }

  const data = await response.json();
  return data.spaces || [];
}

/**
 * Create a new Google Chat Space (e.g. for Career Counseling, Study Groups, Mentor sessions)
 */
export async function createChatSpace(
  displayName: string, 
  description?: string, 
  token?: string
): Promise<ChatSpace> {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error("Authentication required. Please sign in with Google to create a space.");
  }

  const body: any = {
    spaceType: "SPACE",
    displayName: displayName.trim(),
  };

  if (description?.trim()) {
    body.spaceDetails = {
      description: description.trim(),
    };
  }

  const response = await fetch(`${CHAT_API_BASE}/spaces`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${activeToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData.error?.message || `Failed to create space (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

/**
 * List messages in a specific Google Chat space
 */
export async function listSpaceMessages(spaceName: string, token?: string): Promise<ChatMessage[]> {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error("Authentication required. Please sign in with Google to view messages.");
  }

  const encodedSpace = spaceName.replace(/^spaces\//, '');
  const url = `${CHAT_API_BASE}/spaces/${encodeURIComponent(encodedSpace)}/messages?pageSize=100`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${activeToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData.error?.message || `Failed to load messages (${response.status})`;
    throw new Error(message);
  }

  const data = await response.json();
  const messages: ChatMessage[] = data.messages || [];
  
  // Sort chronologically ascending
  return messages.sort((a, b) => {
    const timeA = a.createTime ? new Date(a.createTime).getTime() : 0;
    const timeB = b.createTime ? new Date(b.createTime).getTime() : 0;
    return timeA - timeB;
  });
}

/**
 * Send a message to a Google Chat space
 */
export async function sendSpaceMessage(
  spaceName: string, 
  text: string, 
  token?: string
): Promise<ChatMessage> {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error("Authentication required. Please sign in with Google to post messages.");
  }

  const encodedSpace = spaceName.replace(/^spaces\//, '');
  const url = `${CHAT_API_BASE}/spaces/${encodeURIComponent(encodedSpace)}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${activeToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text.trim(),
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData.error?.message || `Failed to send message (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

/**
 * Add a reaction emoji to a message
 */
export async function addMessageReaction(
  messageName: string, 
  emojiUnicode: string, 
  token?: string
): Promise<void> {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error("Authentication required.");
  }

  const url = `${CHAT_API_BASE}/${messageName}/reactions`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${activeToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emoji: {
        unicode: emojiUnicode,
      },
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Failed to add reaction.");
  }
}

/**
 * Delete a message from a Google Chat space (requires explicit user confirmation before call)
 */
export async function deleteSpaceMessage(messageName: string, token?: string): Promise<void> {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) {
    throw new Error("Authentication required.");
  }

  const url = `${CHAT_API_BASE}/${messageName}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${activeToken}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Failed to delete message (${response.status})`);
  }
}

/**
 * List members in a space
 */
export async function listSpaceMembers(spaceName: string, token?: string): Promise<ChatMember[]> {
  const activeToken = token || cachedAccessToken;
  if (!activeToken) return [];

  try {
    const encodedSpace = spaceName.replace(/^spaces\//, '');
    const url = `${CHAT_API_BASE}/spaces/${encodeURIComponent(encodedSpace)}/members?pageSize=50`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${activeToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.memberships || [];
  } catch {
    return [];
  }
}
