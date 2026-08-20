import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import MotivationalBridge from './components/MotivationalBridge';
import Dashboard from './components/Dashboard';
import DegreeBlueprint from './components/DegreeBlueprint';
import FullGuide from './components/FullGuide';
import Assessment from './components/Assessment';
import Blog from './components/Blog';
import BookAppointment from './components/BookAppointment';
import AdminDashboard from './components/AdminDashboard';
import GoogleChatWorkspace from './components/GoogleChatWorkspace';
import AuthModal from './components/AuthModal';
import AuthPage from './components/AuthPage';
import Layout from './components/Layout';
import { Degree } from './types';
import { DEGREES } from './data';
import { auth, onAuthStateChanged, signOut } from './services/firebase';

export type ScreenState = 
  | 'landing' 
  | 'bridge' 
  | 'dashboard' 
  | 'degree' 
  | 'guide' 
  | 'assessment' 
  | 'blog' 
  | 'appointment' 
  | 'admin'
  | 'auth'
  | 'google-chat';

export default function App() {
  const ADMIN_UID = "qwUnad3ZkZhqb2DQu8RnbSVsv3X2";
  const ADMIN_EMAIL = "dreampathai.official@gmail.com";

  const [screen, setScreen] = useState<ScreenState>('landing');
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [chatPromptToTrigger, setChatPromptToTrigger] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalPrompt, setAuthModalPrompt] = useState<string>('');
  const [authRedirectTarget, setAuthRedirectTarget] = useState<ScreenState | null>(null);
  const [adminPreviewStudentMode, setAdminPreviewStudentMode] = useState(false);

  const [user, setUser] = useState<{ uid?: string; name: string; email: string; phone?: string; city?: string } | null>(() => {
    try {
      const stored = localStorage.getItem('dreampath_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAdmin = Boolean(user && (user.uid === ADMIN_UID || user.email === ADMIN_EMAIL));

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const currentUser = {
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Student',
          email: fbUser.email || '',
        };
        setUser((prev) => ({ ...prev, ...currentUser }));
        localStorage.setItem('dreampath_user', JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem('dreampath_user');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Firebase signOut error:', err);
    }
    setUser(null);
    localStorage.removeItem('dreampath_user');
    setScreen('landing');
  };

  // Monitor deep-link parameters on mount and hash changes
  useEffect(() => {
    const checkDeepLink = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      if (hash === '#assessment' || pathname.endsWith('/assessment')) {
        setScreen('assessment');
        return;
      }
      if (hash === '#blog' || pathname.endsWith('/blog')) {
        setScreen('blog');
        return;
      }
      if (hash === '#appointment' || pathname.endsWith('/appointment') || hash === '#book') {
        setScreen('appointment');
        return;
      }
      if (hash === '#admin' || pathname.endsWith('/admin')) {
        setScreen('admin');
        return;
      }
      if (hash === '#dashboard' || pathname.endsWith('/dashboard')) {
        setScreen('dashboard');
        return;
      }
      if (hash === '#auth' || hash === '#login' || pathname.endsWith('/auth') || pathname.endsWith('/login')) {
        setScreen('auth');
        return;
      }
      if (hash === '#google-chat' || hash === '#chat-spaces' || pathname.endsWith('/google-chat') || pathname.endsWith('/chat-spaces')) {
        setScreen('google-chat');
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const queryDegreeId = params.get('degree');

      // Check URL Hash too (e.g. #degree=mbbs)
      let hashDegreeId = '';
      if (hash.startsWith('#degree=')) {
        hashDegreeId = hash.replace('#degree=', '');
      } else if (hash.includes('degree=')) {
        const hashParams = new URLSearchParams(hash.substring(1));
        hashDegreeId = hashParams.get('degree') || '';
      }

      const targetId = queryDegreeId || hashDegreeId;
      if (targetId) {
        const found = DEGREES.find(d => d.id.toLowerCase() === targetId.toLowerCase());
        if (found) {
          setSelectedDegree(found);
          setScreen('degree');
        }
      }
    };

    checkDeepLink();
    window.addEventListener('hashchange', checkDeepLink);
    return () => {
      window.removeEventListener('hashchange', checkDeepLink);
    };
  }, []);

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dreampath_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse favorites from localStorage:', e);
      return [];
    }
  });

  const handleToggleFavorite = (degreeId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(degreeId)
        ? prev.filter((id) => id !== degreeId)
        : [...prev, degreeId];
      try {
        localStorage.setItem('dreampath_favorites', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save favorites to localStorage:', e);
      }
      return next;
    });
  };

  const handleStart = () => {
    setScreen('bridge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinue = () => {
    setScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDegree = (degree: Degree) => {
    setSelectedDegree(degree);
    setScreen('degree');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#degree=${degree.id}`);
  };

  const handleBackToDashboard = () => {
    setScreen('dashboard');
    setSelectedDegree(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleViewFullGuide = () => {
    setScreen('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssessment = () => {
    if (!user) {
      setAuthModalPrompt("Please Sign In / Log In to continue.");
      setAuthRedirectTarget('assessment');
      setIsAuthModalOpen(true);
      return;
    }
    setScreen('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#assessment');
  };

  const handleNavigate = (targetScreen: ScreenState) => {
    if (targetScreen === 'appointment' && !user) {
      setAuthModalPrompt("Please Sign Up / Log In to proceed.");
      setAuthRedirectTarget('appointment');
      setIsAuthModalOpen(true);
      return;
    }
    setScreen(targetScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', `#${targetScreen}`);
  };

  const handleOpenChatWithPrompt = (promptText: string) => {
    setChatPromptToTrigger(promptText);
  };

  const getContext = () => {
    if (screen === 'landing') return 'the main landing page of Dreampath AI';
    if (screen === 'bridge') return 'a motivational career transition screen';
    if (screen === 'dashboard') {
      return isAdmin && !adminPreviewStudentMode 
        ? 'the Dreampath AI Administrator management dashboard' 
        : 'the main career dashboard exploring various domains like Health, Tech, and Law';
    }
    if (screen === 'degree' && selectedDegree) return `the ${selectedDegree.title} degree blueprint details`;
    if (screen === 'guide') return 'the comprehensive career manual for all degrees in Pakistan';
    if (screen === 'assessment') return 'the 12-question career self-assessment tool';
    if (screen === 'blog') return 'the Dreampath AI career and education blog';
    if (screen === 'appointment') return 'the 1-to-1 personal counseling appointment booking page';
    if (screen === 'admin') return 'the admin appointment and user management portal';
    if (screen === 'auth') return 'the user sign-in and account registration page';
    return 'the Dreampath AI career guide';
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)', zIndex: 9999 }}></div>
      <Layout 
        currentContext={getContext()} 
        onOpenAssessment={handleOpenAssessment} 
        onNavigate={handleNavigate}
        onOpenAuthModal={() => handleNavigate('auth')}
        onLogout={handleLogout}
        user={user}
        chatPromptToTrigger={chatPromptToTrigger}
        onClearChatPrompt={() => setChatPromptToTrigger(null)}
      >
        {screen === 'landing' && (
          <Landing 
            onStart={handleStart} 
            onOpenAssessment={handleOpenAssessment} 
            onOpenBlog={() => handleNavigate('blog')}
            onBookAppointment={() => handleNavigate('appointment')}
            onOpenAICounselor={() => handleOpenChatWithPrompt("Assalam-o-Alaikum! Please help me choose a degree and university in Pakistan based on my interests.")}
          />
        )}

        {screen === 'bridge' && <MotivationalBridge onContinue={handleContinue} />}

        {screen === 'dashboard' && (
          isAdmin && !adminPreviewStudentMode ? (
            <AdminDashboard 
              user={user} 
              onSelectDegree={handleSelectDegree}
              onSwitchToStudentView={() => setAdminPreviewStudentMode(true)}
            />
          ) : (
            <div>
              {isAdmin && adminPreviewStudentMode && (
                <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-center text-xs font-bold text-amber-700 flex items-center justify-center gap-3">
                  <span>👀 You are currently previewing the Student Dashboard view.</span>
                  <button
                    onClick={() => setAdminPreviewStudentMode(false)}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-black uppercase cursor-pointer"
                  >
                    Return to Admin Dashboard
                  </button>
                </div>
              )}
              <Dashboard 
                onSelectDegree={handleSelectDegree} 
                onViewFullGuide={handleViewFullGuide}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
                onOpenAssessment={handleOpenAssessment}
              />
            </div>
          )
        )}

        {screen === 'guide' && <FullGuide onBack={handleBackToDashboard} />}

        {screen === 'assessment' && (
          <Assessment 
            onBackToMain={handleBackToDashboard} 
            onSelectDegree={handleSelectDegree}
            onOpenChatWithPrompt={handleOpenChatWithPrompt}
          />
        )}

        {screen === 'blog' && (
          <Blog 
            onOpenAssessment={handleOpenAssessment}
            onBookAppointment={() => handleNavigate('appointment')}
          />
        )}

        {screen === 'appointment' && (
          <BookAppointment 
            onOpenAssessment={handleOpenAssessment}
            user={user}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSuccessSubmitted={() => {
              if (user) {
                // Stay or offer dashboard view
              }
            }}
          />
        )}

        {screen === 'admin' && (
          <AdminDashboard 
            user={user} 
            onSelectDegree={handleSelectDegree} 
            onSwitchToStudentView={() => setAdminPreviewStudentMode(true)} 
          />
        )}

        {screen === 'auth' && (
          <AuthPage 
            onSuccessLogin={(authenticatedUser) => {
              setUser(authenticatedUser);
              handleNavigate('dashboard');
            }}
            onNavigateToHome={() => handleNavigate('landing')}
          />
        )}

        {screen === 'google-chat' && (
          <GoogleChatWorkspace 
            onNavigateHome={() => handleNavigate('landing')}
            onSelectDegree={handleSelectDegree}
          />
        )}

        {screen === 'degree' && selectedDegree && (
          <DegreeBlueprint 
            degree={selectedDegree} 
            onBack={handleBackToDashboard}
            isFavorite={favoriteIds.includes(selectedDegree.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedDegree.id)}
          />
        )}
      </Layout>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthModalPrompt('');
          setAuthRedirectTarget(null);
        }}
        onSuccessLogin={(authenticatedUser) => {
          setUser(authenticatedUser);
          const target = authRedirectTarget || 'dashboard';
          setAuthModalPrompt('');
          setAuthRedirectTarget(null);
          setIsAuthModalOpen(false);
          handleNavigate(target);
        }}
        initialPrompt={authModalPrompt}
      />
    </>
  );
}
