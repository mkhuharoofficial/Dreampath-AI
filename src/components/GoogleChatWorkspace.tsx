import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Search, 
  Users, 
  Sparkles, 
  RefreshCw, 
  ExternalLink, 
  Trash2, 
  Smile, 
  Share2, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  LogOut,
  Hash,
  MessageCircle,
  Clock,
  ArrowRight,
  Shield
} from 'lucide-react';
import { 
  ChatSpace, 
  ChatMessage, 
  ChatMember,
  listChatSpaces, 
  listSpaceMessages, 
  sendSpaceMessage, 
  createChatSpace, 
  addMessageReaction, 
  deleteSpaceMessage, 
  listSpaceMembers,
  signInWithGoogleChat,
  getGoogleChatAccessToken,
  setGoogleChatAccessToken
} from '../services/googleChat';
import { DEGREES } from '../data';
import { Degree } from '../types';

interface GoogleChatWorkspaceProps {
  onNavigateHome?: () => void;
  onSelectDegree?: (degree: Degree) => void;
}

export default function GoogleChatWorkspace({ onNavigateHome, onSelectDegree }: GoogleChatWorkspaceProps) {
  const [accessToken, setAccessToken] = useState<string | null>(getGoogleChatAccessToken());
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [spaces, setSpaces] = useState<ChatSpace[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<ChatSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<ChatSpace | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [spaceFilter, setSpaceFilter] = useState<'ALL' | 'SPACE' | 'DIRECT_MESSAGE'>('ALL');
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [members, setMembers] = useState<ChatMember[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Modals state
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [newSpaceTitle, setNewSpaceTitle] = useState('');
  const [newSpaceDesc, setNewSpaceDesc] = useState('');
  const [isCreatingSpace, setIsCreatingSpace] = useState(false);

  const [isShareRoadmapOpen, setIsShareRoadmapOpen] = useState(false);
  const [selectedDegreeForShare, setSelectedDegreeForShare] = useState<Degree>(DEGREES[0]);
  const [isSharingRoadmap, setIsSharingRoadmap] = useState(false);

  const [deleteTargetMessage, setDeleteTargetMessage] = useState<ChatMessage | null>(null);
  const [isDeletingMessage, setIsDeletingMessage] = useState(false);

  const [feedbackToast, setFeedbackToast] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setFeedbackToast({ type, text });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 4000);
  };

  // Check if token exists on mount
  useEffect(() => {
    const token = getGoogleChatAccessToken();
    setAccessToken(token);
    if (token) {
      loadSpaces(token);
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const { accessToken: token } = await signInWithGoogleChat();
      setAccessToken(token);
      showToast('success', 'Connected to Google Chat successfully!');
      await loadSpaces(token);
    } catch (err: any) {
      console.error('Google Chat Sign In Error:', err);
      const msg = err.message || 'Failed to authenticate with Google. Please try again.';
      setAuthError(msg);
      showToast('error', msg);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleDisconnect = () => {
    setGoogleChatAccessToken(null);
    setAccessToken(null);
    setSpaces([]);
    setSelectedSpace(null);
    setMessages([]);
    showToast('success', 'Disconnected from Google Chat.');
  };

  const loadSpaces = async (token?: string) => {
    setIsLoadingSpaces(true);
    try {
      const list = await listChatSpaces(token || accessToken || undefined);
      setSpaces(list);
      setFilteredSpaces(list);
      if (list.length > 0 && !selectedSpace) {
        setSelectedSpace(list[0]);
      }
    } catch (err: any) {
      console.error('Error loading spaces:', err);
      showToast('error', err.message || 'Failed to load Google Chat spaces.');
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  // Filter spaces when search or filter tab changes
  useEffect(() => {
    let result = [...spaces];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        (s.displayName && s.displayName.toLowerCase().includes(q)) ||
        (s.spaceDetails?.description && s.spaceDetails.description.toLowerCase().includes(q))
      );
    }
    if (spaceFilter !== 'ALL') {
      result = result.filter(s => (s.spaceType || s.type) === spaceFilter);
    }
    setFilteredSpaces(result);
  }, [spaces, searchQuery, spaceFilter]);

  // Load messages and members whenever selectedSpace changes
  useEffect(() => {
    if (selectedSpace && accessToken) {
      loadMessagesAndMembers(selectedSpace.name);
    }
  }, [selectedSpace, accessToken]);

  const loadMessagesAndMembers = async (spaceName: string) => {
    setIsLoadingMessages(true);
    try {
      const [msgList, memberList] = await Promise.all([
        listSpaceMessages(spaceName, accessToken || undefined),
        listSpaceMembers(spaceName, accessToken || undefined)
      ]);
      setMessages(msgList);
      setMembers(memberList);
    } catch (err: any) {
      console.error('Error loading messages:', err);
      showToast('error', err.message || 'Failed to fetch messages for this space.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingMessages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !selectedSpace || isSending) return;

    const textToSend = messageInput.trim();
    setIsSending(true);
    try {
      const newMsg = await sendSpaceMessage(selectedSpace.name, textToSend, accessToken || undefined);
      setMessages(prev => [...prev, newMsg]);
      setMessageInput('');
      showToast('success', 'Message posted to Google Chat');
    } catch (err: any) {
      console.error('Send error:', err);
      showToast('error', err.message || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpaceTitle.trim() || isCreatingSpace) return;

    setIsCreatingSpace(true);
    try {
      const created = await createChatSpace(newSpaceTitle, newSpaceDesc, accessToken || undefined);
      setSpaces(prev => [created, ...prev]);
      setSelectedSpace(created);
      setIsCreateSpaceOpen(false);
      setNewSpaceTitle('');
      setNewSpaceDesc('');
      showToast('success', `Space "${created.displayName || newSpaceTitle}" created successfully!`);
    } catch (err: any) {
      console.error('Space creation error:', err);
      showToast('error', err.message || 'Could not create Google Chat Space.');
    } finally {
      setIsCreatingSpace(false);
    }
  };

  const handleAddReaction = async (messageName: string, unicodeEmoji: string) => {
    try {
      await addMessageReaction(messageName, unicodeEmoji, accessToken || undefined);
      showToast('success', `Reacted with ${unicodeEmoji}`);
      if (selectedSpace) {
        loadMessagesAndMembers(selectedSpace.name);
      }
    } catch (err: any) {
      console.error('Reaction error:', err);
      showToast('error', err.message || 'Could not add reaction.');
    }
  };

  const confirmDeleteMessage = async () => {
    if (!deleteTargetMessage) return;
    setIsDeletingMessage(true);
    try {
      await deleteSpaceMessage(deleteTargetMessage.name, accessToken || undefined);
      setMessages(prev => prev.filter(m => m.name !== deleteTargetMessage.name));
      showToast('success', 'Message deleted from Google Chat');
      setDeleteTargetMessage(null);
    } catch (err: any) {
      console.error('Delete error:', err);
      showToast('error', err.message || 'Failed to delete message.');
    } finally {
      setIsDeletingMessage(false);
    }
  };

  const handleShareRoadmapToChat = async () => {
    if (!selectedSpace || !selectedDegreeForShare || isSharingRoadmap) return;

    setIsSharingRoadmap(true);
    try {
      const formattedText = `🎓 *Dreampath AI Degree Blueprint: ${selectedDegreeForShare.title}*\n` +
        `📚 *Domain:* ${selectedDegreeForShare.domain} | ⏱️ *Duration:* ${selectedDegreeForShare.duration}\n\n` +
        `📌 *Key Career Sectors:* ${selectedDegreeForShare.keySectors.slice(0, 4).join(', ')}\n` +
        `💼 *Top Job Roles:* ${selectedDegreeForShare.jobRoles.slice(0, 3).join(', ')}\n` +
        `🏛️ *Top Universities in Pakistan:* ${selectedDegreeForShare.universities.slice(0, 3).join(', ')}\n\n` +
        `🚀 *Recommended 4-Year Milestone:* ${selectedDegreeForShare.roadmap[0]?.milestone || 'Build core foundational skills and entry projects'}\n` +
        `💡 *Dreampath Summary:* ${selectedDegreeForShare.summary}`;

      const newMsg = await sendSpaceMessage(selectedSpace.name, formattedText, accessToken || undefined);
      setMessages(prev => [...prev, newMsg]);
      setIsShareRoadmapOpen(false);
      showToast('success', `Shared "${selectedDegreeForShare.title}" roadmap to ${selectedSpace.displayName || 'space'}!`);
    } catch (err: any) {
      console.error('Share error:', err);
      showToast('error', err.message || 'Failed to share roadmap to Google Chat.');
    } finally {
      setIsSharingRoadmap(false);
    }
  };

  const quickPrompts = [
    "🎓 What are the key entry requirements and entry test tips for this field?",
    "💼 What is the fresh graduate starting salary range in Pakistan?",
    "🏛️ What are the top universities in Lahore, Islamabad, and Karachi for this degree?",
    "🚀 What certifications should I complete alongside this degree in 2026?"
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 font-sans">
      {/* Toast Feedback */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-black ${
              feedbackToast.type === 'success' 
                ? 'bg-teal-50 border-teal-200 text-teal-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            {feedbackToast.type === 'success' ? (
              <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
            )}
            <span>{feedbackToast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-teal-100 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-teal-300" /> Google Workspace Integration
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display flex items-center gap-3">
              Google Chat Spaces <span className="text-teal-300 text-lg font-medium">& Study Rooms</span>
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Connect directly with your mentors, peer study circles, and university admission advisors through your official Google Chat account.
            </p>
          </div>

          {accessToken && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => loadSpaces()}
                disabled={isLoadingSpaces}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                title="Refresh spaces"
              >
                <RefreshCw size={14} className={isLoadingSpaces ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-100 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut size={14} />
                <span>Disconnect</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {!accessToken ? (
        /* Sign-in with Google Card */
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg max-w-2xl mx-auto my-8"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-md shadow-teal-500/20">
            <MessageSquare size={32} />
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-3 font-display">
            Connect Your Google Chat Account
          </h2>
          <p className="text-slate-600 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            Link your Google account with permission to view your Google Chat spaces, communicate with student study groups, and share verified DreamPath Career roadmaps with your circles.
          </p>

          {authError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2 text-left">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Official Google Material Sign-In Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoadingAuth}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl border border-slate-300 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingAuth ? (
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
              )}
              <span>{isLoadingAuth ? 'Connecting Google Chat...' : 'Sign in with Google'}</span>
            </button>

            <div className="flex items-center gap-2 text-slate-400 text-xs mt-2">
              <Shield size={14} className="text-teal-600" />
              <span>OAuth 2.0 Secure Direct Google Authentication</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-extrabold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <Users size={14} className="text-teal-600" /> Study Spaces
              </h4>
              <p className="text-[11px] text-slate-500">Collaborate with fellow students targeting FAST, NUST, or MDCAT.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-extrabold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <Share2 size={14} className="text-indigo-600" /> 1-Click Blueprints
              </h4>
              <p className="text-[11px] text-slate-500">Post degree roadmaps and salary analysis directly into your rooms.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-extrabold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <Smile size={14} className="text-amber-500" /> Emoji Reactions
              </h4>
              <p className="text-[11px] text-slate-500">Engage instantly with standard Google Chat emoji reactions.</p>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Connected Google Chat Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
          
          {/* Left Column: Spaces List */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4 flex flex-col h-[640px]">
            {/* Spaces Top Controls */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <MessageCircle size={16} className="text-teal-600" /> Chat Spaces
                </h3>
                <p className="text-[11px] text-slate-400 font-bold">{spaces.length} active spaces</p>
              </div>
              <button
                onClick={() => setIsCreateSpaceOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs"
              >
                <Plus size={14} />
                <span>New Space</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search spaces or direct chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-teal-500 transition-all"
              />
            </div>

            {/* Type Filter Pills */}
            <div className="flex items-center gap-1.5 mb-3 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setSpaceFilter('ALL')}
                className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                  spaceFilter === 'ALL' ? 'bg-white text-teal-700 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSpaceFilter('SPACE')}
                className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                  spaceFilter === 'SPACE' ? 'bg-white text-teal-700 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Spaces
              </button>
              <button
                onClick={() => setSpaceFilter('DIRECT_MESSAGE')}
                className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                  spaceFilter === 'DIRECT_MESSAGE' ? 'bg-white text-teal-700 shadow-xs font-black' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Direct
              </button>
            </div>

            {/* Spaces Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {isLoadingSpaces ? (
                <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  <span>Loading Google Chat spaces...</span>
                </div>
              ) : filteredSpaces.length === 0 ? (
                <div className="py-12 text-center px-4">
                  <MessageSquare size={28} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-600">No spaces found</p>
                  <p className="text-[11px] text-slate-400 mt-1">Create a study space to start chatting!</p>
                  <button
                    onClick={() => setIsCreateSpaceOpen(true)}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold hover:bg-teal-100 transition-all cursor-pointer"
                  >
                    + Create First Space
                  </button>
                </div>
              ) : (
                filteredSpaces.map((space) => {
                  const isSelected = selectedSpace?.name === space.name;
                  const isDm = (space.spaceType || space.type) === 'DIRECT_MESSAGE';
                  const title = space.displayName || (isDm ? 'Direct Conversation' : 'Unnamed Space');

                  return (
                    <div
                      key={space.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedSpace(space)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedSpace(space);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 border ${
                        isSelected 
                          ? 'bg-teal-50/80 border-teal-300/80 shadow-xs' 
                          : 'bg-white hover:bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-xs ${
                        isSelected 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isDm ? <Users size={16} /> : <Hash size={16} />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={`text-xs truncate font-extrabold ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                            {title}
                          </h4>
                        </div>
                        {space.spaceDetails?.description ? (
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {space.spaceDetails.description}
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {isDm ? 'Direct Message' : 'Group Workspace'}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Active Space Conversation */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col h-[640px] overflow-hidden">
            {selectedSpace ? (
              <>
                {/* Active Space Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black shrink-0">
                      <Hash size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm text-slate-900 truncate">
                        {selectedSpace.displayName || 'Google Chat Conversation'}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        {members.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Users size={12} className="text-teal-600" /> {members.length} members
                          </span>
                        )}
                        {selectedSpace.spaceDetails?.description && (
                          <span className="truncate max-w-[240px]">
                            • {selectedSpace.spaceDetails.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsShareRoadmapOpen(true)}
                      className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Share a career roadmap to this space"
                    >
                      <BookOpen size={14} />
                      <span className="hidden sm:inline">Share Blueprint</span>
                    </button>

                    <a
                      href="https://chat.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
                      title="Open in Google Chat Web"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                  {isLoadingMessages ? (
                    <div className="py-20 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                      <span>Loading space messages...</span>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="py-20 text-center px-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
                        <MessageSquare size={22} />
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-800 mb-1">No messages in this space yet</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        Send the first message or post a Dreampath Career Blueprint to kick off the discussion.
                      </p>
                      
                      {/* Quick start questions */}
                      <div className="max-w-md mx-auto space-y-2 text-left">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Suggested Questions:</p>
                        {quickPrompts.slice(0, 2).map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setMessageInput(prompt);
                            }}
                            className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-300 text-xs font-semibold text-slate-700 transition-all flex items-center justify-between cursor-pointer"
                          >
                            <span>{prompt}</span>
                            <ArrowRight size={12} className="text-teal-600 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const senderName = msg.sender?.displayName || 'Chat Member';
                      const isBot = msg.sender?.type === 'BOT';
                      const timeStr = msg.createTime 
                        ? new Date(msg.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                        : '';

                      return (
                        <div key={msg.name} className="group flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isBot 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gradient-to-tr from-teal-500 to-indigo-600 text-white'
                          }`}>
                            {senderName.charAt(0).toUpperCase()}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-black text-xs text-slate-900">{senderName}</span>
                              {isBot && (
                                <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase">
                                  App
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Clock size={10} /> {timeStr}
                              </span>

                              {/* Message actions (Reaction & Delete) */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex items-center gap-1">
                                <button
                                  onClick={() => handleAddReaction(msg.name, '👍')}
                                  className="p-1 hover:bg-slate-200 rounded text-xs cursor-pointer"
                                  title="Thumbs Up"
                                >
                                  👍
                                </button>
                                <button
                                  onClick={() => handleAddReaction(msg.name, '💡')}
                                  className="p-1 hover:bg-slate-200 rounded text-xs cursor-pointer"
                                  title="Insightful"
                                >
                                  💡
                                </button>
                                <button
                                  onClick={() => handleAddReaction(msg.name, '❤️')}
                                  className="p-1 hover:bg-slate-200 rounded text-xs cursor-pointer"
                                  title="Love"
                                >
                                  ❤️
                                </button>
                                <button
                                  onClick={() => setDeleteTargetMessage(msg)}
                                  className="p-1 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                                  title="Delete Message"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>

                            {/* Message text content */}
                            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap shadow-2xs">
                              {msg.text || '(No text content)'}
                            </div>

                            {/* Emoji reaction badges */}
                            {msg.emojiReactionSummaries && msg.emojiReactionSummaries.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {msg.emojiReactionSummaries.map((rx, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
                                  >
                                    <span>{rx.emoji?.unicode || '👍'}</span>
                                    <span>{rx.reactionCount || 1}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input & Quick Prompt Toolbar */}
                <div className="p-3 border-t border-slate-200 bg-white">
                  {/* Quick Prompts Carousel */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1 scrollbar-none">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 shrink-0 flex items-center gap-1">
                      <Sparkles size={11} className="text-teal-600" /> Prompts:
                    </span>
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMessageInput(prompt)}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 text-[10px] font-bold text-slate-600 shrink-0 transition-all cursor-pointer truncate max-w-[200px]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Message #${selectedSpace.displayName || 'space'}...`}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-teal-500 focus:bg-white transition-all"
                    />

                    <button
                      type="submit"
                      disabled={!messageInput.trim() || isSending}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-teal-600/15 cursor-pointer disabled:opacity-40"
                    >
                      {isSending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-1">Select a Chat Space</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Choose a study space or mentorship room from the left sidebar to start messaging.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Create New Space */}
      <AnimatePresence>
        {isCreateSpaceOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Plus size={18} className="text-teal-600" /> Create Google Chat Space
                </h3>
                <button
                  onClick={() => setIsCreateSpaceOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateSpace} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Space Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FAST CS Admission Prep 2026"
                    value={newSpaceTitle}
                    onChange={(e) => setNewSpaceTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Description & Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Discussion space for merit formulas, entry test tips, and career roadmaps."
                    value={newSpaceDesc}
                    onChange={(e) => setNewSpaceDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateSpaceOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newSpaceTitle.trim() || isCreatingSpace}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-teal-600/20 cursor-pointer disabled:opacity-50"
                  >
                    {isCreatingSpace ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} />
                    )}
                    <span>Create Space</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Share Career Roadmap into Space */}
      <AnimatePresence>
        {isShareRoadmapOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <BookOpen size={18} className="text-indigo-600" /> Share Roadmap to Google Chat
                </h3>
                <button
                  onClick={() => setIsShareRoadmapOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 mb-4">
                Select a degree to generate a formatted career blueprint summary and post it directly to #{selectedSpace?.displayName || 'space'}.
              </p>

              <div className="space-y-3 mb-6">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Select Career Pathway:
                </label>
                <select
                  value={selectedDegreeForShare.id}
                  onChange={(e) => {
                    const found = DEGREES.find(d => d.id === e.target.value);
                    if (found) setSelectedDegreeForShare(found);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-indigo-500"
                >
                  {DEGREES.map((deg) => (
                    <option key={deg.id} value={deg.id}>
                      {deg.title} ({deg.domain})
                    </option>
                  ))}
                </select>

                {/* Preview Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-black text-indigo-900">🎓 {selectedDegreeForShare.title}</p>
                  <p className="text-[11px] text-slate-500">⏱️ Duration: {selectedDegreeForShare.duration}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2">💡 {selectedDegreeForShare.summary}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsShareRoadmapOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShareRoadmapToChat}
                  disabled={isSharingRoadmap}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
                >
                  {isSharingRoadmap ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Share2 size={14} />
                  )}
                  <span>Post to Chat</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mandatory User Confirmation Dialog for Destructive Operations (Workspace Safety Requirement) */}
      <AnimatePresence>
        {deleteTargetMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-100 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 size={22} />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">Delete Chat Message?</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Are you sure you want to delete this message from Google Chat? This action cannot be undone.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 text-left mb-5 truncate">
                "{deleteTargetMessage.text || 'Message'}"
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteTargetMessage(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteMessage}
                  disabled={isDeletingMessage}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  {isDeletingMessage ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  <span>Confirm Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
