import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, MessageSquare, Sparkles, X, Send, Bot, User, HelpCircle, 
  Download, FileText, Menu, Calendar, BookOpen, UserCheck, ShieldCheck, LogOut, LogIn,
  CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import { 
  getAISuggestion, 
  chatWithMentor 
} from '../services/geminiService';
import { generate2026RoadmapsPDF } from '../utils/roadmapPdfGenerator';
import { LogoImage } from './LogoImage';
import { 
  FloatingWhatsAppButton, 
  SOCIAL_MEDIA_LINKS, 
  WhatsAppIcon, 
  YouTubeIcon, 
  FacebookIcon, 
  InstagramIcon, 
  MailIcon 
} from './SocialLinks';

interface LayoutProps {
  children: React.ReactNode;
  currentContext: string;
  onOpenAssessment: () => void;
  onNavigate: (screen: 'landing' | 'bridge' | 'dashboard' | 'degree' | 'guide' | 'assessment' | 'blog' | 'appointment' | 'admin' | 'auth' | 'google-chat') => void;
  onOpenAuthModal: () => void;
  onLogout?: () => void;
  user: { uid?: string; name: string; email: string; phone?: string; city?: string } | null;
  chatPromptToTrigger?: string | null;
  onClearChatPrompt?: () => void;
}

export default function Layout({ 
  children, 
  currentContext, 
  onOpenAssessment, 
  onNavigate,
  onOpenAuthModal,
  onLogout,
  user,
  chatPromptToTrigger, 
  onClearChatPrompt 
}: LayoutProps) {
  const ADMIN_EMAIL = "dreampathai.official@gmail.com";
  const ADMIN_UID = "qwUnad3ZkZhqb2DQu8RnbSVsv3X2";
  const isAdmin = user && (user.email === ADMIN_EMAIL || user.uid === ADMIN_UID);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "Assalam-o-Alaikum! I'm your Dreampath AI Career Assistant. Ask me anything about university admissions, job salaries, degree roadmaps, or career paths in Pakistan!" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    if (chatPromptToTrigger) {
      setIsChatOpen(true);
      handleChatSubmit(undefined, chatPromptToTrigger);
      if (onClearChatPrompt) onClearChatPrompt();
    }
  }, [chatPromptToTrigger]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen, isChatLoading]);

  const handleSuggest = async () => {
    setIsSuggestOpen(true);
    setIsSuggestLoading(true);
    const tip = await getAISuggestion(currentContext);
    setSuggestion(tip);
    setIsSuggestLoading(false);
  };

  const handleChatSubmit = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const messageToSend = customMsg || chatInput;
    if (!messageToSend.trim() || isChatLoading) return;

    if (!customMsg) setChatInput('');
    const newHistory = [...chatMessages, { role: 'user' as const, content: messageToSend }];
    setChatMessages(newHistory);
    setIsChatLoading(true);

    try {
      const response = await chatWithMentor(chatMessages, messageToSend);
      setChatMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (err: any) {
      console.warn('Chat error caught gracefully:', err);
      setChatMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          content: "Our AI assistant is currently updating. Please try again in a few moments." 
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const quickQuestions = [
    "What are top CS universities in Pakistan?",
    "Software vs Data Science career prospects?",
    "Medical vs Engineering salaries in Pakistan?",
    "How to prepare for NUST & FAST entrance tests?"
  ];

  const [isGeneratingRoadmapsPDF, setIsGeneratingRoadmapsPDF] = useState(false);

  const handleDownloadRoadmaps = async () => {
    setIsGeneratingRoadmapsPDF(true);
    try {
      await generate2026RoadmapsPDF();
    } catch (err) {
      console.error('Roadmaps PDF error:', err);
    } finally {
      setIsGeneratingRoadmapsPDF(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans bg-slate-50/60 text-slate-800 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3 flex items-center justify-between shadow-xs">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-3 text-left cursor-pointer group">
            <LogoImage 
              className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className="hidden sm:block">
              <span className="font-black text-lg md:text-xl tracking-tight text-slate-900 font-display flex items-center gap-1">
                Dreampath<span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">AI</span>
              </span>
              <p className="text-[8.5px] md:text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Career Guidance System</p>
            </div>
          </button>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-extrabold text-slate-700">
          <button onClick={() => onNavigate('landing')} className="hover:text-indigo-600 transition-colors cursor-pointer">
            Home
          </button>
          <button onClick={() => onNavigate('bridge')} className="hover:text-indigo-600 transition-colors cursor-pointer">
            Career Roadmaps
          </button>
          <button onClick={() => onNavigate('blog')} className="hover:text-indigo-600 transition-colors cursor-pointer">
            Blog
          </button>
          <button onClick={() => onNavigate('google-chat')} className="text-teal-700 hover:text-teal-800 transition-colors cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-teal-50 border border-teal-200/70">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span>Google Chat</span>
          </button>
          <button onClick={onOpenAssessment} className="hover:text-indigo-600 transition-colors cursor-pointer">
            Self-Assessment
          </button>
          <button onClick={() => onNavigate('appointment')} className="hover:text-indigo-600 transition-colors cursor-pointer">
            1-to-1 Career Counseling
          </button>
          {isAdmin && (
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 hover:bg-amber-500/20 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <ShieldCheck size={14} className="text-amber-600" />
              <span>Admin Dashboard</span>
            </button>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {user ? (
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-2 rounded-xl border font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                  isAdmin 
                    ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100' 
                    : 'bg-indigo-50 border-indigo-200/80 text-indigo-700 hover:bg-indigo-100'
                }`}
                title={isAdmin ? "System Admin Dashboard" : "Student Dashboard"}
              >
                {isAdmin ? (
                  <ShieldCheck size={14} className="text-amber-600 shrink-0" />
                ) : (
                  <UserCheck size={14} className="text-indigo-600 shrink-0" />
                )}
                <span className="max-w-[90px] md:max-w-[120px] truncate">{user.name}</span>
                {isAdmin && (
                  <span className="px-1 py-0.2 bg-amber-200 text-amber-900 text-[9px] font-black rounded uppercase">
                    Admin
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 border border-slate-200/80 text-slate-600 font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer"
                title="Sign Out of Account"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all shadow-md shadow-indigo-600/15 flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn size={14} />
              <span>Login / Sign Up</span>
            </button>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenAssessment}
            className="relative group overflow-hidden px-3.5 md:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 text-white font-black text-xs tracking-wide shadow-md shadow-indigo-500/20 border border-indigo-400/30 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1">
              🎯 <span className="hidden sm:inline">Take Free</span> Assessment
            </span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 z-30 shadow-md"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <LogoImage className="h-10 w-auto object-contain" />
              <span className="font-black text-base text-slate-900 tracking-tight">Dreampath <span className="text-indigo-600">AI</span></span>
            </div>
            <button onClick={() => { onNavigate('landing'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-slate-800 border-b border-slate-100">
              Home
            </button>
            <button onClick={() => { onNavigate('bridge'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-slate-800 border-b border-slate-100">
              Career Roadmaps
            </button>
            <button onClick={() => { onNavigate('blog'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-slate-800 border-b border-slate-100">
              Blog / Career Articles
            </button>
            <button onClick={() => { onNavigate('google-chat'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-teal-700 border-b border-slate-100 flex items-center justify-between">
              <span>Google Chat Spaces</span>
              <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-teal-100 text-teal-800 uppercase">Live</span>
            </button>
            <button onClick={() => { onOpenAssessment(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-indigo-600 border-b border-slate-100">
              Self-Assessment
            </button>
            <button onClick={() => { onNavigate('appointment'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-slate-800 border-b border-slate-100">
              1-to-1 Career Counseling (PKR 500)
            </button>
            {isAdmin && (
              <button onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-amber-600 border-b border-slate-100 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-amber-600" /> 
                <span>Admin Dashboard</span>
              </button>
            )}
            {!user ? (
              <button onClick={() => { onOpenAuthModal(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-indigo-600 font-display flex items-center gap-2">
                <LogIn size={15} />
                <span>Login / Sign Up</span>
              </button>
            ) : (
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <button onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-indigo-600 font-display flex items-center gap-2">
                  {isAdmin ? <ShieldCheck size={15} className="text-amber-600" /> : <UserCheck size={15} />}
                  <span>{isAdmin ? 'Admin Dashboard' : 'Account Dashboard'} ({user.name})</span>
                </button>
                <button onClick={() => { if (onLogout) onLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-extrabold text-xs uppercase text-rose-600 font-display flex items-center gap-2">
                  <LogOut size={15} />
                  <span>Log Out ({user.email})</span>
                </button>
              </div>
            )}

            {/* Mobile Social Follow Links */}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Follow Dreampath AI</p>
              <div className="flex items-center gap-2">
                {SOCIAL_MEDIA_LINKS.map((s) => {
                  const Icon = s.IconComponent;
                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 transition-all flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" color="currentColor" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-0 flex-grow">
        {children}
      </main>

      {/* Floating AI Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end max-w-[90vw]">
        <AnimatePresence>
          {isSuggestOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white border border-slate-200 shadow-xl p-5 rounded-2xl w-80 max-w-sm mb-2 shadow-indigo-600/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-teal-500" />
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest font-display">
                  <Sparkles size={14} className="text-indigo-500 animate-pulse" /> AI Insight
                </div>
                <button onClick={() => setIsSuggestOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded">
                  <X size={14} />
                </button>
              </div>
              {isSuggestLoading ? (
                <div className="space-y-2 py-2">
                  <div className="h-3 w-3/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
                </div>
              ) : (
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  {suggestion}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSuggest}
            className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-full shadow-md hover:border-indigo-200 hover:text-indigo-600 transition-all font-bold text-xs cursor-pointer"
          >
            <Brain size={16} className="text-indigo-500 animate-pulse" />
            <span>AI Insight</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-teal-600 text-white px-4.5 py-3 rounded-full shadow-xl shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <MessageSquare size={18} className="fill-white/20" />
            <span className="font-black text-xs uppercase tracking-wider">Career Assistant</span>
          </motion.button>
        </div>
      </div>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-[59]"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="fixed bottom-0 right-0 md:bottom-20 md:right-6 w-full md:w-[420px] h-[85vh] md:h-[600px] bg-white border border-slate-200 shadow-2xl rounded-t-3xl md:rounded-3xl z-[60] flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-slate-900 text-white p-4 px-5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <LogoImage className="w-9 h-9 object-contain brightness-110" />
                  <div>
                    <h3 className="font-extrabold text-sm">Dreampath AI Assistant</h3>
                    <p className="text-[10px] text-teal-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                      <span>Online • AI Career Mentor</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)} 
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close chat"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[88%] p-3 rounded-2xl text-xs font-medium leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold italic p-2 bg-indigo-50/70 border border-indigo-100 rounded-xl max-w-fit">
                    <RefreshCw size={12} className="animate-spin text-indigo-600" />
                    <span>Dreampath AI is thinking...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Questions Helper Bar */}
              <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                  Quick Ask:
                </span>
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChatSubmit(undefined, q)}
                    disabled={isChatLoading}
                    className="shrink-0 px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleChatSubmit} className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about Pakistani degrees, entry tests, jobs..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-400"
                />
                <button 
                  type="submit" 
                  disabled={!chatInput.trim() || isChatLoading} 
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl cursor-pointer disabled:opacity-40 transition-all shadow-sm"
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Complete Footer */}
      <footer className="w-full py-12 px-6 bg-slate-900 text-white border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LogoImage className="h-14 md:h-16 w-auto object-contain brightness-110" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Dreampath AI is Pakistan's premier AI-powered career guidance platform for matric, FSc, ICS, and university students.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><button onClick={() => onNavigate('landing')} className="hover:text-white cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavigate('bridge')} className="hover:text-white cursor-pointer">Career Roadmaps</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-white cursor-pointer">Blog / Articles</button></li>
              <li><button onClick={onOpenAssessment} className="hover:text-white cursor-pointer">Self-Assessment</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 mb-3">Services</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><button onClick={() => onNavigate('appointment')} className="hover:text-white cursor-pointer">1-to-1 Career Counseling</button></li>
              <li><button onClick={handleDownloadRoadmaps} className="hover:text-white cursor-pointer">Download 2026 Roadmaps PDF</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-400 mb-3">Follow & Connect</h4>
            <p className="text-xs text-slate-400 mb-3">Join our community for daily admission alerts & career guidance:</p>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_MEDIA_LINKS.map((social) => {
                const Icon = social.IconComponent;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${social.name}: ${social.handle}`}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700/80 transition-all cursor-pointer flex items-center justify-center group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" color="currentColor" />
                  </a>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800">
              <p className="text-xs text-slate-400">Founder: <span className="text-white font-bold">Muhammad Khan Khuharo</span></p>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">© 2026 Dreampath AI. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
