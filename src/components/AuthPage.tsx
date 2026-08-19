import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, User, Phone, MapPin, GraduationCap, 
  ArrowRight, CheckCircle2, AlertCircle, Sparkles, LogIn, UserPlus, Send, RefreshCw, Check 
} from 'lucide-react';
import { LogoImage } from './LogoImage';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification,
  sendPasswordResetEmail,
  applyActionCode,
  signOut, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from '../services/firebase';
import EmailVerificationScreen from './EmailVerificationScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

interface AuthPageProps {
  onSuccessLogin: (user: { uid?: string; name: string; email: string; phone?: string; city?: string }) => void;
  onNavigateToHome?: () => void;
}

export default function AuthPage({ onSuccessLogin, onNavigateToHome }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify' | 'forgot'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [educationLevel, setEducationLevel] = useState('Matric / O-Levels');

  // Pending unverified user info
  const [pendingUserData, setPendingUserData] = useState<{
    uid?: string;
    name?: string;
    phone?: string;
    city?: string;
    educationLevel?: string;
  } | undefined>(undefined);
  const [isNewAccount, setIsNewAccount] = useState(true);

  // Email Action Code / URL Redirect State
  const [emailVerifiedSuccess, setEmailVerifiedSuccess] = useState(false);
  const [isResendingFromLogin, setIsResendingFromLogin] = useState(false);
  const [showResendOnLogin, setShowResendOnLogin] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Detect and handle email verification link redirect from Gmail (e.g. /login?mode=verifyEmail&oobCode=...)
  useEffect(() => {
    const handleUrlVerification = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const modeParam = urlParams.get('mode');
        const oobCode = urlParams.get('oobCode');

        if (modeParam === 'verifyEmail' && oobCode) {
          setIsLoading(true);
          try {
            await applyActionCode(auth, oobCode);
            setEmailVerifiedSuccess(true);
            setSuccessMsg('Email verified! You can now log in.');
            setMode('login');
            // Clean URL query parameters smoothly without page reload
            if (window.history && window.history.replaceState) {
              const cleanUrl = window.location.origin + window.location.pathname;
              window.history.replaceState({}, document.title, cleanUrl);
            }
          } catch (codeErr: any) {
            console.warn('Action code verification note:', codeErr);
            setError(codeErr?.message || 'Email verification link may have expired. Please log in or request a new link.');
          } finally {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('URL verification error:', err);
      }
    };

    handleUrlVerification();
  }, []);

  const handleForgotPassword = () => {
    setError('');
    setSuccessMsg('');
    setShowResendOnLogin(false);
    setMode('forgot');
  };

  // Resend verification link directly from login screen if unverified
  const handleResendVerificationFromLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password above to resend the verification link.');
      return;
    }

    setIsResendingFromLogin(true);
    setError('');
    setSuccessMsg('');

    try {
      // Authenticate temporarily to get user object
      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const fbUser = userCred.user;

      if (fbUser.emailVerified) {
        setSuccessMsg('Your email is already verified! You can now sign in.');
        setShowResendOnLogin(false);
        setIsResendingFromLogin(false);
        return;
      }

      const actionCodeSettings = {
        url: typeof window !== 'undefined' ? `${window.location.origin}/login` : 'https://dreampath.ai/login',
        handleCodeInApp: true
      };

      await sendEmailVerification(fbUser, actionCodeSettings);
      await signOut(auth);

      setSuccessMsg('Verification link sent! We have sent a verification email to your address. Please check your Inbox, Spam, and Junk folders.');
      setShowResendOnLogin(false);
    } catch (err: any) {
      console.error('Resend verification error:', err);
      if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a minute before requesting another verification email.');
      } else {
        setError(err.message || 'Failed to resend verification link. Please check your credentials.');
      }
    } finally {
      setIsResendingFromLogin(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setShowResendOnLogin(false);

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (mode === 'signup') {
      if (!fullName) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        // 1. Create user in Firebase Auth
        const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const fbUser = userCred.user;
        await updateProfile(fbUser, { displayName: fullName.trim() });

        // 2. Configure actionCodeSettings to redirect students back to login route
        const actionCodeSettings = {
          url: typeof window !== 'undefined' ? `${window.location.origin}/login` : 'https://dreampath.ai/login',
          handleCodeInApp: true
        };

        // 3. Send email verification ONLY for newly created accounts
        await sendEmailVerification(fbUser, actionCodeSettings);

        const userInfo = {
          uid: fbUser.uid,
          name: fullName.trim(),
          email: fbUser.email || email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          educationLevel,
          emailVerified: false,
          createdAt: serverTimestamp()
        };

        try {
          await setDoc(doc(db, 'users', fbUser.uid), userInfo, { merge: true });
        } catch (dbErr) {
          console.warn('Saving profile to Firestore skipped:', dbErr);
        }

        // Safely sign out the user until they verify their email link
        await signOut(auth);

        setPendingUserData({
          uid: fbUser.uid,
          name: fullName.trim(),
          phone: phone.trim(),
          city: city.trim(),
          educationLevel
        });

        setIsNewAccount(true);
        setIsLoading(false);
        // Switch to dedicated post-signup verification UI confirmation screen
        setMode('verify');

      } else {
        // Existing User Login: DO NOT trigger or send verification emails automatically
        const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
        const fbUser = userCred.user;

        // Check if email is verified
        if (!fbUser.emailVerified) {
          // Block entry, sign out unverified user, keep on login screen, show resend link
          await signOut(auth);
          setIsLoading(false);
          setShowResendOnLogin(true);
          setError('Your email is not verified yet. Please check your Inbox, Spam, and Junk folders to verify your account.');
          return;
        }

        // Email IS verified -> grant immediate access
        let fetchedProfile: any = {};
        try {
          const storedLocal = localStorage.getItem('dreampath_user');
          if (storedLocal) {
            fetchedProfile = JSON.parse(storedLocal);
          }
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDoc.exists()) {
            fetchedProfile = { ...fetchedProfile, ...userDoc.data() };
          }
        } catch (err) {
          console.warn('Fetching user profile from Firestore note:', err);
        }

        const authenticatedUser = {
          uid: fbUser.uid,
          name: fetchedProfile.name || fbUser.displayName || (email.split('@')[0] || 'Student'),
          email: fbUser.email || email.trim(),
          phone: fetchedProfile.phone || '',
          city: fetchedProfile.city || ''
        };

        localStorage.setItem('dreampath_user', JSON.stringify(authenticatedUser));

        // Save/update global registered users list for Admin view
        try {
          const storedUsers = localStorage.getItem('dreampath_all_registered_users');
          const usersArr = storedUsers ? JSON.parse(storedUsers) : [];
          const idx = usersArr.findIndex((u: any) => u.email === authenticatedUser.email);
          if (idx >= 0) {
            usersArr[idx] = { ...usersArr[idx], ...authenticatedUser, emailVerified: true, lastLoginAt: new Date().toLocaleDateString('en-PK') };
          } else {
            usersArr.unshift({ ...authenticatedUser, emailVerified: true, registeredAt: new Date().toLocaleDateString('en-PK') });
          }
          localStorage.setItem('dreampath_all_registered_users', JSON.stringify(usersArr));
        } catch (e) {
          console.error(e);
        }

        setSuccessMsg('Login successful! Welcome back.');
        setTimeout(() => {
          setIsLoading(false);
          onSuccessLogin(authenticatedUser);
        }, 400);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.warn('Firebase Auth notice:', err?.code || err?.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered. Please sign in instead.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. If you do not have an account yet, please select "Create Account" above.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please click "Create Account" to sign up.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Authentication failed. Please check your credentials or try creating a new account.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    setShowResendOnLogin(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      const authenticatedUser = {
        uid: fbUser.uid,
        name: fbUser.displayName || 'Pakistani Student',
        email: fbUser.email || '',
        phone: fbUser.phoneNumber || '',
        city: 'Lahore'
      };

      try {
        await setDoc(doc(db, 'users', fbUser.uid), {
          uid: fbUser.uid,
          name: authenticatedUser.name,
          email: authenticatedUser.email,
          emailVerified: true,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('Error updating user in Firestore:', err);
      }

      localStorage.setItem('dreampath_user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      onSuccessLogin(authenticatedUser);
    } catch (err: any) {
      setIsLoading(false);
      console.error('Google Sign-In error:', err);
      setError(err.message || 'Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden"
        >
          {/* Dedicated Return Screen for Verified Email from Gmail Link */}
          {emailVerifiedSuccess && mode === 'login' ? (
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-inner">
                <CheckCircle2 size={40} className="text-emerald-600 animate-bounce" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
                  Email Verified!
                </h2>
                <p className="text-slate-600 text-sm md:text-base font-semibold mt-2">
                  Email verified! You can now log in.
                </p>
              </div>
              <button
                type="button"
                id="proceed-to-login-btn"
                onClick={() => {
                  setEmailVerifiedSuccess(false);
                  setError('');
                }}
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn size={18} />
                <span>Proceed to Login</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : mode === 'verify' ? (
            <EmailVerificationScreen
              email={email}
              pendingPassword={password}
              isNewAccount={isNewAccount}
              userData={pendingUserData}
              isModal={false}
              onSuccessLogin={onSuccessLogin}
              onBackToLogin={() => {
                setMode('login');
                setError('');
                setSuccessMsg('');
                setShowResendOnLogin(false);
              }}
            />
          ) : mode === 'forgot' ? (
            <ForgotPasswordScreen
              initialEmail={email}
              onBackToLogin={() => {
                setMode('login');
                setError('');
                setSuccessMsg('');
                setShowResendOnLogin(false);
              }}
              isModal={false}
            />
          ) : (
            <>
              {/* Header */}
              <div className="p-8 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
                <div className="flex justify-center mb-4">
                  <LogoImage className="h-16 md:h-20 w-auto object-contain" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
                  {mode === 'login' ? 'Welcome Back' : 'Create Student Account'}
                </h2>
                <p className="text-slate-500 text-xs md:text-sm mt-1 font-medium max-w-md mx-auto">
                  {mode === 'login' 
                    ? 'Sign in to access your saved career roadmaps, AI guidance chats, and appointment bookings.' 
                    : 'Join Dreampath AI to save your assessment reports, track university blueprints, and schedule counseling sessions.'}
                </p>

                {/* Mode Switcher Tabs */}
                <div className="grid grid-cols-2 p-1.5 bg-slate-100/80 rounded-2xl max-w-xs mx-auto mt-6">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); setShowResendOnLogin(false); }}
                    className={`py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      mode === 'login' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <LogIn size={14} />
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); setShowResendOnLogin(false); }}
                    className={`py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      mode === 'signup' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <UserPlus size={14} />
                    <span>Create Account</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Google Sign In Option */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xs hover:border-slate-300 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 absolute">or email credentials</span>
                </div>

                {/* Error Banner with Resend Button if unverified */}
                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-medium space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle size={18} className="shrink-0 text-rose-600 mt-0.5" />
                      <span className="leading-relaxed">{error}</span>
                    </div>
                    {showResendOnLogin && (
                      <button
                        type="button"
                        onClick={handleResendVerificationFromLogin}
                        disabled={isResendingFromLogin}
                        className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <Send size={14} className={isResendingFromLogin ? 'animate-bounce' : ''} />
                        <span>{isResendingFromLogin ? 'Sending Verification Link...' : 'Resend Verification Link'}</span>
                      </button>
                    )}
                  </div>
                )}

                {successMsg && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-medium flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Muhammad Ali"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="03001234567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="e.g. Lahore, Karachi, Islamabad"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Current Education Level</label>
                      <div className="relative">
                        <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                        >
                          <option value="Matric / O-Levels">Matric / O-Levels</option>
                          <option value="FSc Pre-Medical">FSc Pre-Medical</option>
                          <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
                          <option value="ICS (Computer Science)">ICS (Computer Science)</option>
                          <option value="I.Com / Commerce">I.Com / Commerce</option>
                          <option value="A-Levels">A-Levels</option>
                          <option value="Undergraduate / Bachelor">Undergraduate / Bachelor</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-1.5 text-slate-600 font-medium cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span>Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-indigo-600 font-bold hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
                  >
                    {isLoading ? (
                      <span>Authenticating...</span>
                    ) : (
                      <>
                        <span>{mode === 'login' ? 'Sign In to Account' : 'Create Account & Verify'}</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500">
                    {mode === 'login' ? "Don't have a student account?" : "Already registered?"}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode(mode === 'login' ? 'signup' : 'login');
                        setError('');
                        setSuccessMsg('');
                        setShowResendOnLogin(false);
                      }}
                      className="font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      {mode === 'login' ? 'Create an account now' : 'Sign in here'}
                    </button>
                  </p>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

