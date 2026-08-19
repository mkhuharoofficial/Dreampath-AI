import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Laptop, Settings, Briefcase, Scale, ChevronRight, 
  GraduationCap, Clock, ArrowRight, Compass, Bookmark, Search, X, Sparkles, Download, FileText,
  FlaskConical, Users, Palette, BookOpen
} from 'lucide-react';
import { DomainType, Degree } from '../types';
import { DOMAINS, DEGREES } from '../data';
import CareerMotivation from './CareerMotivation';
import { generate2026RoadmapsPDF } from '../utils/roadmapPdfGenerator';
import { LogoImage } from './LogoImage';

interface DashboardProps {
  onSelectDegree: (degree: Degree) => void;
  onViewFullGuide: () => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onOpenAssessment?: () => void;
}

export default function Dashboard({ onSelectDegree, onViewFullGuide, favoriteIds, onToggleFavorite, onOpenAssessment }: DashboardProps) {
  const [selectedDomain, setSelectedDomain] = useState<DomainType | null>(null);
  const [filterDuration, setFilterDuration] = useState<'All' | '1-2' | '3-4' | '5+'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingRoadmaps, setIsGeneratingRoadmaps] = useState(false);

  const handleDownloadRoadmaps = async () => {
    setIsGeneratingRoadmaps(true);
    try {
      await generate2026RoadmapsPDF();
    } catch (err) {
      console.error('Dashboard roadmaps download error:', err);
    } finally {
      setIsGeneratingRoadmaps(false);
    }
  };

  const icons: Record<string, React.ReactNode> = {
    Stethoscope: <Stethoscope size={18} />,
    Laptop: <Laptop size={18} />,
    Settings: <Settings size={18} />,
    Briefcase: <Briefcase size={18} />,
    Scale: <Scale size={18} />,
    FlaskConical: <FlaskConical size={18} />,
    Users: <Users size={18} />,
    Palette: <Palette size={18} />,
    BookOpen: <BookOpen size={18} />,
  };

  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm',
    blue: 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm',
    orange: 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm',
    purple: 'bg-purple-50 text-purple-600 border-purple-100 shadow-sm',
    slate: 'bg-slate-50 text-slate-650 border-slate-100 shadow-sm',
    teal: 'bg-teal-50 text-teal-600 border-teal-100 shadow-sm',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm',
    rose: 'bg-rose-50 text-rose-600 border-rose-100 shadow-sm',
    amber: 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm',
  };

  // Helper to categorize degree duration
  const getDurationGroup = (degree: Degree) => {
    const durLower = degree.duration.toLowerCase();
    const titleLower = degree.title.toLowerCase();
    
    if (
      durLower.includes('1–2') || 
      durLower.includes('1-2') || 
      durLower.includes('1 year') || 
      durLower.includes('2 years') || 
      degree.category === 'Skill'
    ) {
      return '1_2';
    }
    
    if (
      durLower.includes('5 year') || 
      durLower.includes('5–6') || 
      durLower.includes('5-6') || 
      durLower.includes('house job') ||
      titleLower.includes('mbbs') ||
      titleLower.includes('bds') ||
      titleLower.includes('dvm') ||
      titleLower.includes('dpt') ||
      degree.category === 'Doctor level Career' ||
      degree.category === 'Professional Health Career'
    ) {
      return '5_plus';
    }
    
    return '3_4';
  };

  // Filter degrees dynamically based on: search query, active domain selection, duration filter
  const filteredDegrees = DEGREES.filter(d => {
    const matchesSearch = searchQuery === '' || 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.domain.toLowerCase().includes(searchQuery.toLowerCase());

    // Search across all domains when a search query is active
    const matchesDomain = !selectedDomain || d.domain === selectedDomain || searchQuery.trim() !== '';
    
    let matchesFilter = true;
    if (filterDuration === '1-2') {
      matchesFilter = d.duration.includes('1–2') || d.duration.includes('1-2') || d.category === 'Skill';
    } else if (filterDuration === '3-4') {
      matchesFilter = d.duration.includes('3–4') || d.duration.includes('3-4') || d.category === 'Degree' || d.category === 'Professional' || d.category === 'Professional Health Career';
    } else if (filterDuration === '5+') {
      matchesFilter = d.duration.includes('5–6') || d.duration.includes('5-6') || d.duration.includes('5 Years') || d.category === 'Doctor level Career';
    }
    return matchesSearch && matchesDomain && matchesFilter;
  });

  const mlt1to2 = filteredDegrees.filter(d => getDurationGroup(d) === '1_2');
  const mlt3to4 = filteredDegrees.filter(d => getDurationGroup(d) === '3_4');
  const mlt5plus = filteredDegrees.filter(d => getDurationGroup(d) === '5_plus');

  const [user, setUser] = useState<{ uid?: string; name: string; email: string } | null>(() => {
    try {
      const stored = localStorage.getItem('dreampath_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [appointments, setAppointments] = useState<any[]>(() => {
    try {
      const storedCounseling = localStorage.getItem('dreampath_counseling_sessions');
      const counselingList = storedCounseling ? JSON.parse(storedCounseling) : [];

      const stored = localStorage.getItem('dreampath_appointments');
      const allApts = stored ? JSON.parse(stored) : [];

      const combined = [...counselingList, ...allApts];

      // Filter appointments to ONLY show those matching the current standard student's profile (by email or UID)
      const currentUserStored = localStorage.getItem('dreampath_user');
      if (currentUserStored) {
        const currentUser = JSON.parse(currentUserStored);
        if (currentUser && currentUser.email) {
          const ADMIN_EMAIL = "dreampathai.official@gmail.com";
          if (currentUser.email === ADMIN_EMAIL) {
            return combined;
          }
          return combined.filter((apt: any) => 
            (apt.studentEmail && apt.studentEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
            (apt.email && apt.email.toLowerCase() === currentUser.email.toLowerCase()) || 
            (apt.userId && currentUser.uid && apt.userId === currentUser.uid)
          );
        }
      }
      return []; 
    } catch {
      return [];
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
      
      {/* Student Account Welcome Banner */}
      <div className="mb-10 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
          <div className="flex items-center gap-5">
            <LogoImage className="h-16 md:h-20 w-auto object-contain shrink-0" />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Student Dashboard
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display mt-1">
                Welcome, {user ? user.name : 'Pakistani Student'}! 👋
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Manage your career assessment, degree roadmaps, and 1-on-1 counselor appointments.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadRoadmaps}
            disabled={isGeneratingRoadmaps}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Download size={14} className="text-teal-400" />
            <span>2026 Roadmaps Handbook</span>
          </button>
        </div>

        {/* Dashboard Quick Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <button
            onClick={onOpenAssessment}
            className="p-4 bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/80 rounded-2xl text-left transition-all cursor-pointer group"
          >
            <div className="text-xl mb-1">🎯</div>
            <h4 className="font-extrabold text-xs text-indigo-950 group-hover:text-indigo-600">My Assessment</h4>
            <p className="text-[10px] text-indigo-700/80 font-medium">12-question profile</p>
          </button>

          <button
            onClick={handleDownloadRoadmaps}
            className="p-4 bg-teal-50/70 hover:bg-teal-100/80 border border-teal-200/80 rounded-2xl text-left transition-all cursor-pointer group"
          >
            <div className="text-xl mb-1">📊</div>
            <h4 className="font-extrabold text-xs text-teal-950 group-hover:text-teal-700">My Reports</h4>
            <p className="text-[10px] text-teal-700/80 font-medium">PDF Handbooks</p>
          </button>

          <button
            onClick={onViewFullGuide}
            className="p-4 bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200/80 rounded-2xl text-left transition-all cursor-pointer group"
          >
            <div className="text-xl mb-1">🤖</div>
            <h4 className="font-extrabold text-xs text-purple-950 group-hover:text-purple-600">AI Counselor</h4>
            <p className="text-[10px] text-purple-700/80 font-medium">24/7 Guidance</p>
          </button>

          <button
            onClick={onViewFullGuide}
            className="p-4 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/80 rounded-2xl text-left transition-all cursor-pointer group"
          >
            <div className="text-xl mb-1">🎓</div>
            <h4 className="font-extrabold text-xs text-amber-950 group-hover:text-amber-700">Universities</h4>
            <p className="text-[10px] text-amber-700/80 font-medium">NUST, FAST, DUHS</p>
          </button>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-left">
            <div className="text-xl mb-1">📅</div>
            <h4 className="font-extrabold text-xs text-emerald-950">1-to-1 Counseling</h4>
            <p className="text-[10px] text-emerald-700 font-bold">{appointments.length} Sessions</p>
          </div>

          <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-2xl text-left">
            <div className="text-xl mb-1">👤</div>
            <h4 className="font-extrabold text-xs text-slate-900">My Profile</h4>
            <p className="text-[10px] text-slate-500 font-medium truncate">{user ? user.email : 'Guest Student'}</p>
          </div>
        </div>

        {/* User Appointments Status List */}
        {appointments.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs uppercase font-extrabold text-slate-700 flex items-center gap-1.5">
              <span>📅 My 1-to-1 Career Counseling Sessions</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {appointments.map((apt: any) => (
                <div key={apt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-slate-500">{apt.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      apt.status === 'Confirmed' ? 'bg-emerald-500 text-white' :
                      apt.status === 'Rejected' ? 'bg-red-500 text-white' :
                      'bg-amber-400 text-slate-950'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900">
                    Session Date: {apt.preferredDate} at {apt.preferredTime}
                  </div>

                  {apt.googleMeetLink ? (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-bold flex items-center justify-between">
                      <span className="text-[11px]">Google Meet Link Ready:</span>
                      <a href={apt.googleMeetLink} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] uppercase font-black hover:bg-emerald-700">
                        Join Meet
                      </a>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      Payment verification in progress. Meet link will be displayed here once approved.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Centered Hero Header with Search Bar */}
      <div className="max-w-2xl mx-auto text-center mb-14 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-extrabold uppercase tracking-widest text-[10px] mb-6 shadow-sm">
          <Compass size={12} className="animate-spin text-indigo-500" /> Discovery Center 2026
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 font-display text-slate-900 leading-none">
          Find Your <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">Dream Pathway</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto font-medium mb-8 leading-relaxed">
          Explore comprehensive roadmaps and structural degree blueprints curated for the modern Pakistani career landscape.
        </p>

        {/* Search Bar with Focus Ring Animation */}
        <div className="relative group max-w-xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-2xl blur-md opacity-20 group-focus-within:opacity-40 group-hover:opacity-30 transition-all duration-300" />
          <div className="relative flex items-center bg-white border border-slate-200 group-focus-within:border-indigo-600 rounded-2xl shadow-sm group-focus-within:shadow-md transition-all duration-300 overflow-hidden pl-4 pr-2 py-1.5">
            <Search className="text-slate-400 group-focus-within:text-indigo-600 transition-colors shrink-0 mr-3" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any degree (e.g., Computer Science, Medicine)..."
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-0 py-2.5"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all shrink-0 mr-1"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <button
              onClick={() => {}}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Glowing Career Self-Assessment Banner */}
      {onOpenAssessment && (
        <div className="mb-10 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-indigo-500/20">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-300 font-extrabold text-[11px] uppercase tracking-wider mb-2">
                <Sparkles size={12} className="text-teal-400 animate-spin" /> Recommended Tool
              </span>
              <h3 className="text-xl md:text-2xl font-black font-display tracking-tight text-white">
                Not sure which degree fits you best?
              </h3>
              <p className="text-slate-300 text-xs md:text-sm font-medium mt-1 max-w-xl">
                Take our 12-question interactive Career Self-Assessment to analyze your strengths, background, and goals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadRoadmaps}
                disabled={isGeneratingRoadmaps}
                id="dashboard-roadmaps-pdf-btn"
                className="px-5 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs md:text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center gap-2 border border-slate-700 cursor-pointer disabled:opacity-50"
              >
                <Download size={15} className="text-teal-400" />
                <span>📚 Download 2026 Roadmaps PDF</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenAssessment}
                id="dashboard-assessment-btn"
                className="px-6 py-3.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-500 text-slate-950 font-black text-xs md:text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-teal-400/20 hover:shadow-teal-400/35 transition-all flex items-center gap-2 border border-teal-200/50 cursor-pointer"
              >
                <span>🎯 Start Self-Assessment Test</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Animated Career Motivation Quotes Ticker */}
      <div className="mb-10">
        <CareerMotivation />
      </div>

      {/* Domain Selection */}
      <div className="mb-14 relative z-10">
        {!selectedDomain ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {DOMAINS.map((domain) => (
              <motion.button
                key={domain.type}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedDomain(domain.type)}
                className="flex flex-col items-start p-6 rounded-3xl border bg-white border-slate-200 hover:border-indigo-600/30 hover:shadow-lg hover:shadow-indigo-600/5 transition-all text-left group shadow-sm text-slate-600"
              >
                <div className="mb-4 p-2.5 rounded-2xl transition-all bg-slate-50 border border-slate-100 text-indigo-600 group-hover:text-indigo-700 group-hover:bg-indigo-50 flex items-center justify-center shrink-0">
                  {icons[domain.icon as keyof typeof icons]}
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider mb-2 text-slate-800 group-hover:text-indigo-600 font-display">
                  {domain.type}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 font-medium tracking-wide">
                  {domain.description}
                </p>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white via-slate-50 to-indigo-50/30 p-6 md:p-8 rounded-3xl border border-indigo-100 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/[0.01] pointer-events-none" />
            
            {DOMAINS.filter(d => d.type === selectedDomain).map(domain => (
              <div key={domain.type} className="flex flex-col md:flex-row items-center gap-6 flex-1 relative z-10">
                <div className={`p-3.5 rounded-2xl border ${colors[domain.color as keyof typeof colors]} flex items-center justify-center shrink-0`}>
                  {icons[domain.icon as keyof typeof icons]}
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-indigo-600 block mb-1">Active Selection</span>
                  <h3 className="text-2xl font-extrabold text-slate-800 uppercase tracking-tight font-display mb-1">
                    {domain.type}
                  </h3>
                  <p className="text-slate-500 font-semibold text-sm tracking-wide">{domain.description}</p>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setSelectedDomain(null)}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-indigo-600 font-extrabold rounded-xl shadow-sm border border-slate-200 transition-all uppercase tracking-widest text-[10px] flex items-center gap-2 relative z-10"
            >
              <ArrowRight className="rotate-180" size={14} /> See All Domains
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 relative z-10">
        
        {/* Sidebar Filters */}
        <div className="lg:w-64 shrink-0 space-y-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewFullGuide}
            className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-indigo-600 to-teal-600 text-white rounded-3xl shadow-lg shadow-indigo-600/10 hover:from-indigo-500 hover:to-teal-500 transition-all border border-indigo-500/20 group text-left"
          >
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-indigo-200 mb-1">📘 2026 Manual</p>
              <h4 className="font-extrabold text-sm tracking-wide group-hover:text-indigo-100 transition-colors font-display">Full Career Guide</h4>
            </div>
            <ArrowRight size={18} className="text-indigo-200 transition-transform group-hover:translate-x-1" />
          </motion.button>

          {!selectedDomain ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h4 className="flex items-center gap-2 text-slate-800 font-extrabold mb-5 text-xs uppercase tracking-widest font-display">
                <Clock size={14} className="text-indigo-600" /> Path Duration
              </h4>
              <div className="flex flex-col gap-2">
                {['All', '1-2', '3-4', '5+'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterDuration(f as any)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border ${
                      filterDuration === f 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' 
                        : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700'
                    }`}
                  >
                    {f === '1-2' ? '1-2 Year Skills' : f === '3-4' ? '3-4 Year Degrees' : f === '5+' ? '5-6 Year Specialist' : 'All Durations'}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="flex items-center gap-2 text-slate-800 font-extrabold text-xs uppercase tracking-widest font-display">
                <Clock size={14} className="text-indigo-600" /> Group Legend
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Pathways below are organized cleanly by qualification length:
              </p>
              <div className="space-y-3 border-t border-slate-100 pt-4 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shrink-0 shadow-sm"></span>
                  <span>1-2 Year Skills</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block shrink-0 shadow-sm"></span>
                  <span>3-4 Year Bachelors</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block shrink-0 shadow-sm"></span>
                  <span>5+ Year Specialists</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Degree Grid / Results */}
        <div className="flex-1">
          {/* Saved Bookmarks Section */}
          {favoriteIds.length > 0 && !selectedDomain && searchQuery === '' && (
            <div className="mb-14 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2.5 font-display uppercase tracking-wide">
                  <Bookmark className="text-amber-500 fill-amber-500 animate-pulse" size={18} />
                  Saved Pathways & Blueprints
                  <span className="text-slate-400 font-bold text-xs normal-case ml-2.5">({favoriteIds.length} bookmarked)</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEGREES.filter(d => favoriteIds.includes(d.id)).map((degree) => (
                  <motion.div
                    key={degree.id}
                    role="button"
                    tabIndex={0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectDegree(degree)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectDegree(degree);
                      }
                    }}
                    className="text-left p-4 bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl hover:shadow-md hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group h-full relative cursor-pointer select-none"
                  >
                    <div className="flex justify-between w-full items-start mb-2.5">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
                        {degree.duration}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(degree.id);
                        }}
                        className="text-slate-300 hover:text-amber-500 transition-colors p-1"
                        aria-label="Toggle bookmark"
                      >
                        <Bookmark size={14} fill={favoriteIds.includes(degree.id) ? "currentColor" : "none"} className={favoriteIds.includes(degree.id) ? "text-amber-400" : ""} />
                      </button>
                    </div>
                    <h4 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors tracking-wide leading-tight">
                      {degree.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Regular or Filtered/Search display */}
          {searchQuery !== '' ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2.5 font-display uppercase tracking-wide">
                  <Search className="text-indigo-600" size={18} />
                  Search Results
                  <span className="text-slate-400 font-bold text-xs normal-case ml-2.5">({filteredDegrees.length} found)</span>
                </h3>
                {selectedDomain && (
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2.5 py-1 rounded-lg">
                    Filtering in {selectedDomain}
                  </span>
                )}
              </div>
              
              {filteredDegrees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDegrees.map((degree) => (
                    <motion.div
                      key={degree.id}
                      role="button"
                      tabIndex={0}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectDegree(degree)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectDegree(degree);
                        }
                      }}
                      className="text-left p-4 bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl hover:shadow-md hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group h-full relative cursor-pointer select-none"
                    >
                      <div className="flex justify-between w-full items-start mb-2.5">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
                          {degree.duration}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(degree.id);
                          }}
                          className="text-slate-300 hover:text-amber-500 transition-colors p-1"
                          aria-label="Toggle bookmark"
                        >
                          <Bookmark size={14} fill={favoriteIds.includes(degree.id) ? "currentColor" : "none"} className={favoriteIds.includes(degree.id) ? "text-amber-400" : ""} />
                        </button>
                      </div>
                      <h4 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors tracking-wide leading-tight">
                        {degree.title}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-150 rounded-3xl p-12 text-center">
                  <p className="text-slate-500 font-medium italic">No pathways match &quot;{searchQuery}&quot;. Try searching for &quot;Computer Science&quot; or &quot;Medicine&quot;!</p>
                </div>
              )}
            </div>
          ) : !selectedDomain ? (
            <div className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-sm min-h-[350px]">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/10 to-transparent pointer-events-none" />
              <div className="mb-6 flex justify-center relative z-10">
                <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-full shadow-sm text-indigo-600 animate-bounce">
                  <Sparkles size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-3 tracking-tight uppercase font-display relative z-10">Select a Domain or Search</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed font-medium relative z-10 mb-6">
                Choose a career domain above or type in the search bar to find detailed degree blueprints, curated roadmaps, and Pakistani market analysis.
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center max-w-md relative z-10">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider self-center mr-1">Try:</span>
                {['Computer Science', 'Medicine', 'Graphic Design', 'CA / ACCA'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 text-slate-600 hover:text-indigo-600 text-xs font-semibold transition-all shadow-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-3 font-display uppercase tracking-wide">
                  <GraduationCap className="text-indigo-600 animate-pulse" />
                  {selectedDomain} Pathways
                  <span className="text-slate-400 font-bold text-xs normal-case ml-2.5">({filteredDegrees.length} results)</span>
                </h3>
              </div>

              <div className="space-y-12">
                {/* 1-2 Years Group */}
                {mlt1to2.length > 0 && (
                  <div className="space-y-5">
                    <div className="relative pl-4 border-l-4 border-amber-500">
                      <h4 className="text-base font-extrabold uppercase tracking-wide text-slate-800 flex items-center gap-3 font-display">
                        ⚡ 1–2 Year Fast-Track Paths (Skills & Diplomas)
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 font-extrabold border border-amber-150">
                          {mlt1to2.length} Available
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Short programs and high-value certificates for quick, direct entry into active job roles.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mlt1to2.map((degree) => (
                        <motion.div
                          key={degree.id}
                          role="button"
                          tabIndex={0}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelectDegree(degree)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onSelectDegree(degree);
                            }
                          }}
                          className="text-left p-4 bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl hover:shadow-md hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group h-full relative cursor-pointer select-none"
                        >
                          <div className="flex justify-between w-full items-start mb-2.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
                              {degree.duration}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(degree.id);
                              }}
                              className="text-slate-300 hover:text-amber-500 transition-colors p-1"
                              aria-label="Toggle bookmark"
                            >
                              <Bookmark size={14} fill={favoriteIds.includes(degree.id) ? "currentColor" : "none"} className={favoriteIds.includes(degree.id) ? "text-amber-400" : ""} />
                            </button>
                          </div>
                          <h4 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors tracking-wide leading-tight">
                            {degree.title}
                          </h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3-4 Years Group */}
                {mlt3to4.length > 0 && (
                  <div className="space-y-5">
                    <div className="relative pl-4 border-l-4 border-indigo-500">
                      <h4 className="text-base font-extrabold uppercase tracking-wide text-slate-800 flex items-center gap-3 font-display">
                        🎓 3–4 Year Undergraduate Paths (Bachelor Degrees)
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-150">
                          {mlt3to4.length} Available
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Standard four-year bachelors and professional graduation streams offering structural foundation.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mlt3to4.map((degree) => (
                        <motion.div
                          key={degree.id}
                          role="button"
                          tabIndex={0}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelectDegree(degree)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onSelectDegree(degree);
                            }
                          }}
                          className="text-left p-4 bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl hover:shadow-md hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group h-full relative cursor-pointer select-none"
                        >
                          <div className="flex justify-between w-full items-start mb-2.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
                              {degree.duration}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(degree.id);
                              }}
                              className="text-slate-300 hover:text-amber-500 transition-colors p-1"
                              aria-label="Toggle bookmark"
                            >
                              <Bookmark size={14} fill={favoriteIds.includes(degree.id) ? "currentColor" : "none"} className={favoriteIds.includes(degree.id) ? "text-amber-400" : ""} />
                            </button>
                          </div>
                          <h4 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors tracking-wide leading-tight">
                            {degree.title}
                          </h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5+ Years Group */}
                {mlt5plus.length > 0 && (
                  <div className="space-y-5">
                    <div className="relative pl-4 border-l-4 border-purple-500">
                      <h4 className="text-base font-extrabold uppercase tracking-wide text-slate-800 flex items-center gap-3 font-display">
                        🩺 5+ Year Specialist & Professional Doctorates
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-650 font-extrabold border border-purple-150">
                          {mlt5plus.length} Available
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">High-level specialist qualifications and professional doctorate degrees requiring dedicated study.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mlt5plus.map((degree) => (
                        <motion.div
                          key={degree.id}
                          role="button"
                          tabIndex={0}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelectDegree(degree)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onSelectDegree(degree);
                            }
                          }}
                          className="text-left p-4 bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl hover:shadow-md hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group h-full relative cursor-pointer select-none"
                        >
                          <div className="flex justify-between w-full items-start mb-2.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
                              {degree.duration}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(degree.id);
                              }}
                              className="text-slate-300 hover:text-amber-500 transition-colors p-1"
                              aria-label="Toggle bookmark"
                            >
                              <Bookmark size={14} fill={favoriteIds.includes(degree.id) ? "currentColor" : "none"} className={favoriteIds.includes(degree.id) ? "text-amber-400" : ""} />
                            </button>
                          </div>
                          <h4 className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors tracking-wide leading-tight">
                            {degree.title}
                          </h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {filteredDegrees.length === 0 && (
                <div className="bg-slate-50 rounded-3xl p-12 text-center border border-dashed border-slate-200">
                  <p className="text-slate-500 font-medium italic">No paths found matching these filters. Try broader criteria!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

    </div>
  );
}
