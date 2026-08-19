import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Compass, Target, GraduationCap, Star, 
  Download, CheckCircle2, Bot, Calendar, BookOpen, ShieldCheck,
  Building2, Award, Briefcase, Zap, HeartHandshake, Users
} from 'lucide-react';
import { generate2026RoadmapsPDF } from '../utils/roadmapPdfGenerator';
import { BLOG_POSTS } from './Blog';
import { SocialConnectCard, SOCIAL_MEDIA_LINKS } from './SocialLinks';
import { LogoImage } from './LogoImage';

interface LandingProps {
  onStart: () => void;
  onOpenAssessment: () => void;
  onOpenBlog: () => void;
  onBookAppointment: () => void;
  onOpenAICounselor: () => void;
}

export default function Landing({
  onStart,
  onOpenAssessment,
  onOpenBlog,
  onBookAppointment,
  onOpenAICounselor
}: LandingProps) {
  const [isGeneratingRoadmaps, setIsGeneratingRoadmaps] = useState(false);

  const handleDownloadRoadmaps = async () => {
    setIsGeneratingRoadmaps(true);
    try {
      await generate2026RoadmapsPDF();
    } catch (err) {
      console.error('Landing roadmaps download error:', err);
    } finally {
      setIsGeneratingRoadmaps(false);
    }
  };

  const latestArticles = BLOG_POSTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 space-y-20 pb-20">
      
      {/* ==========================================
          SECTION 1: HERO SECTION
         ========================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Hero Content */}
        <div className="w-full md:w-1/2 space-y-6 z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 font-extrabold text-xs uppercase tracking-wider shadow-xs"
          >
            <Sparkles size={14} className="text-indigo-600 animate-spin" />
            <span>AI Career Guidance for Students</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.1]">
            Your Career. <br />
            Your Future. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Your Dreampath.
            </span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-xl">
            Free AI-powered career guidance for Pakistani students. Discover suitable degrees, universities, skills, scholarships, and career paths based on your interests and academic background.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenAssessment}
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>🎯 Take Free Assessment</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onOpenAICounselor}
              className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs uppercase tracking-wider rounded-2xl border border-slate-200 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bot size={16} className="text-indigo-600" />
              <span>Talk to AI Counselor</span>
            </button>

            <button
              onClick={onStart}
              className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass size={16} className="text-teal-400" />
              <span>Explore All Domains & Degrees</span>
            </button>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500" /> 100% Free Self-Assessment</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500" /> Tailored for Pakistan</span>
          </div>
        </div>

        {/* Right Visual Card Showcase */}
        <div className="w-full md:w-1/2 relative z-10">
          <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-2xl space-y-6 text-center">
            {/* Top Logo Frame */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-5 md:p-6 bg-gradient-to-br from-indigo-50/80 via-white to-teal-50/80 rounded-3xl border border-indigo-100/90 shadow-sm relative group w-full flex items-center justify-center">
                <LogoImage className="h-28 md:h-36 w-auto object-contain mx-auto transition-transform group-hover:scale-105" />
              </div>
            </div>

            {/* Colors Animated Mission Statement */}
            <div className="space-y-3 px-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wider shadow-2xs">
                <Sparkles size={12} className="text-indigo-600 animate-spin" />
                <span>AI-Powered Career Guidance</span>
              </div>

              <h3 className="text-lg md:text-xl font-black font-display tracking-tight leading-snug">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 via-pink-500 to-teal-500 bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                  Dreampath AI is an AI powered career guidance platform
                </span>{' '}
                <span className="text-slate-800">
                  helping students choose their career wisely and start a new journey.
                </span>
              </h3>
            </div>

            {/* Social Media Section */}
            <div className="pt-5 border-t border-slate-100 space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                Join us for more updates
              </p>

              {/* Only Icons Bar with Direct Links */}
              <div className="flex items-center justify-center gap-3">
                {SOCIAL_MEDIA_LINKS.map((item) => {
                  const Icon = item.IconComponent;
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${item.name} (${item.handle})`}
                      className={`p-3 rounded-2xl border transition-all transform hover:scale-115 hover:-translate-y-0.5 flex items-center justify-center bg-white shadow-xs ${item.borderColor} ${item.textColor} ${item.hoverColor}`}
                    >
                      <Icon className="w-5 h-5" color={item.iconColor} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Post Banner: How to Choose the Right Career in Pakistan */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div 
          onClick={onOpenBlog}
          className="bg-white rounded-3xl p-6 md:p-8 border border-indigo-200/80 shadow-xl shadow-indigo-500/5 hover:shadow-2xl hover:border-indigo-400 transition-all cursor-pointer group relative overflow-hidden"
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-70 pointer-events-none group-hover:scale-110 transition-transform" />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
            {/* Image Thumbnail */}
            <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="How to Choose the Right Career in Pakistan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                Featured Guide 🇵🇰
              </span>
            </div>

            {/* Post Content */}
            <div className="w-full md:w-2/3 space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[11px] font-extrabold">Career Advisory</span>
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span className="text-emerald-600 font-black">2 Comments Enabled</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-display leading-tight">
                How to Choose the Right Career in Pakistan: A Simple Guide
              </h3>

              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Choosing a career after intermediate or school is a huge decision. In Pakistan, students often get confused by comparing unrelated fields like Pharmacy vs AI. Here is a simple, 5-step guide to help you find your right path.
              </p>

              {/* Step Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                  Step 1: Pick Domain First
                </span>
                <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                  Step 2: Extrovert vs Introvert
                </span>
                <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                  Step 3: Time & Money (Fast vs Long Path)
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <BookOpen size={16} />
                <span>Read Complete Guide & Community Comments</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: HOW IT WORKS (4 STEPS)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-extrabold text-xs uppercase tracking-wider rounded-full inline-block mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display">
            How Dreampath AI Works
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium">
            Four simple steps to clarify your academic and career direction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Take the Assessment',
              desc: 'Answer 12 simple questions about your marks, interests, goals, and budget.',
              icon: '🎯'
            },
            {
              step: '02',
              title: 'Get Your Career Profile',
              desc: 'Receive an instant report identifying your top 3 degree matches and work style.',
              icon: '📊'
            },
            {
              step: '03',
              title: 'Explore Degrees & Universities',
              desc: 'Review Pakistani university seats, fee structures, and admission criteria.',
              icon: '🎓'
            },
            {
              step: '04',
              title: 'Create Your Roadmap',
              desc: 'Follow year-by-year skill milestones, entry test plans, and career job roles.',
              icon: '🗺️'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm relative space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  STEP {item.step}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 3: WHY DREAMPATH AI (6 CARDS)
         ========================================== */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 bg-teal-50 text-teal-800 font-extrabold text-xs uppercase tracking-wider rounded-full inline-block mb-3">
              Platform Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display">
              Why Dreampath AI?
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium">
              Purpose-built to guide students through the Pakistani higher education landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'Personalized Guidance',
                desc: 'Custom career profiling based on your specific provincial board percentages and interest areas.'
              },
              {
                icon: Bot,
                title: 'AI Career Counselor',
                desc: 'Instant 24/7 AI assistance for questions regarding entry tests, fee structures, and degree scopes.'
              },
              {
                icon: GraduationCap,
                title: 'Degree & University Guidance',
                desc: 'Detailed breakdowns for Pakistani universities like NUST, FAST, GIKI, DUHS, COMSATS, and IBA.'
              },
              {
                icon: Award,
                title: 'Scholarship Guidance',
                desc: 'Information on HEC Need-Based, Ehsaas Undergraduate, PEEF, and international full scholarships.'
              },
              {
                icon: Compass,
                title: 'Career Roadmaps',
                desc: 'Year-by-year university roadmap milestones from freshman entry to post-graduation job placement.'
              },
              {
                icon: HeartHandshake,
                title: 'Built for Pakistani Students',
                desc: 'Tailored for matric, intermediate (FSc/ICS/I.Com), and A-Levels students across all Pakistani provinces.'
              }
            ].map((card, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-200/70 space-y-3 hover:border-indigo-300 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-xs">
                  <card.icon size={20} />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: CAREER ROADMAPS SHOWCASE
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl space-y-4">
              <span className="px-3 py-1 bg-teal-400/20 text-teal-300 text-xs font-black uppercase tracking-widest rounded-md inline-block">
                Comprehensive Handbooks
              </span>
              <h2 className="text-2xl md:text-4xl font-black font-display tracking-tight">
                2026 Pakistani Degree & Career Roadmaps
              </h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Explore structured 4-year timelines for Computer Science, Software Engineering, AI, Medical & Allied Health, Business, and Engineering degrees.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                onClick={onStart}
                className="w-full sm:w-auto px-6 py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-lg"
              >
                Explore All Career Roadmaps
              </button>
              <button
                onClick={handleDownloadRoadmaps}
                disabled={isGeneratingRoadmaps}
                className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>Download Handbook PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5: SELF-ASSESSMENT PROMO
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-md text-center max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
            🎯
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display">
            Not sure what to study?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
            Take our free 12-question self-assessment test and discover degree and career options that match your interests, strengths, goals, and academic background in Pakistan.
          </p>
          <button
            onClick={onOpenAssessment}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Free Assessment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: ONE-TO-ONE GUIDANCE
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 md:p-12 border border-emerald-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-teal-400/20 text-teal-300 text-xs font-black uppercase tracking-widest rounded-md inline-block">
              1-to-1 Career Counseling
            </span>
            <h2 className="text-2xl md:text-3xl font-black font-display">
              Need 1-to-1 Career Counseling?
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Book an affordable 20 to 30-minute 1-to-1 Career Counseling video session with a certified Dreampath AI counselor for degree selection, merit analysis, and entry test strategy.
            </p>
            <div className="text-teal-300 font-extrabold text-sm">
              Session Fee: <span className="text-white text-lg font-black">PKR 500</span>
            </div>
          </div>

          <button
            onClick={onBookAppointment}
            className="w-full md:w-auto px-8 py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-lg shrink-0 flex items-center justify-center gap-2"
          >
            <Calendar size={18} />
            <span>1-to-1 Career Counseling</span>
          </button>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: BLOG SECTION (LATEST 3)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-extrabold text-xs uppercase tracking-wider rounded-full inline-block mb-2">
              Career Articles
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display">
              Latest Career & Education Articles
            </h2>
          </div>
          <button
            onClick={onOpenBlog}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>View All Articles</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((post) => (
            <div
              key={post.id}
              onClick={onOpenBlog}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group p-5 space-y-3"
            >
              <div className="h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">{post.category}</span>
              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 8: SOCIAL MEDIA FOLLOW & CONNECT
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <SocialConnectCard />
      </section>

      {/* ==========================================
          SECTION 9: FINAL CTA
         ========================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight">
            Your future deserves a clear direction.
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto font-medium">
            Start your free career assessment today and explore the best higher education paths tailored for you.
          </p>
          <button
            onClick={onOpenAssessment}
            className="px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:from-teal-300 hover:to-emerald-300 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Your Free Career Assessment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

    </div>
  );
}
