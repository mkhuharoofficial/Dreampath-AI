import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, MapPin, GraduationCap, ArrowRight, CheckCircle2, AlertCircle, Send } from 'lucide-react';
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
  signOut, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from '../services/firebase';
import EmailVerificationScreen from './EmailVerificationScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: { uid?: string; name: string; email: string; phone?: string; city?: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccessLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify' | 'forgot'>('login');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingFromLogin, setIsResendingFromLogin] = useState(false);
  const [showResendOnLogin, setShowResendOnLogin] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [educationLevel, setEducationLevel] = useState('Matric / O-Levels');
  
  // Pending unverified user data
  const [pendingUserData, setPendingUserData] = useState<{
    uid?: string;
    name?: string;
    phone?: string;
    city?: string;
    educationLevel?: string;
  } | undefined>(undefined);
  const [isNewAccount, setIsNewAccount] = useState(true);

  const handleForgotPassword = () => {
    setError('');
    setSuccessMsg('');
    setShowResendOnLogin(false);
    setMode('forgot');
  };

  const handleResendFromLoginModal = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password above to resend the verification link.');
      return;
    }

    setIsResendingFromLogin(true);
    setError('');
    setSuccessMsg('');

    try {
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
      console.error('Resend error:', err);
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
      setError('Please fill in all required fields.');
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

        // 2. Configure actionCodeSettings for email link
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

        // Save preliminary profile to Firestore
        try {
          await setDoc(doc(db, 'users', fbUser.uid), userInfo, { merge: true });
        } catch (dbErr) {
          console.warn('Saving profile to Firestore skipped:', dbErr);
        }

        // Safely sign out the user until they verify via the email link
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
        // Switch to email verification screen dynamically without page reload
        setMode('verify');

      } else {
        // Existing user login: DO NOT trigger or send verification emails automatically
        const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
        const fbUser = userCred.user;

        // Check if email is verified
        if (!fbUser.emailVerified) {
          await signOut(auth);
          setIsLoading(false);
          setShowResendOnLogin(true);
          setError('Your email is not verified yet. Please check your Inbox, Spam, and Junk folders to verify your account.');
          return;
        }

        // Email IS verified -> proceed with login
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
          console.warn('Fetching user profile note:', err);
        }

        const authenticatedUser = {
          uid: fbUser.uid,
          name: fetchedProfile.name || fbUser.displayName || (email.split('@')[0] || 'Student'),
          email: fbUser.email || email.trim(),
          phone: fetchedProfile.phone || '',
          city: fetchedProfile.city || ''
        };

        localStorage.setItem('dreampath_user', JSON.stringify(authenticatedUser));
        setSuccessMsg('Login successful! Welcome back.');
        setTimeout(() => {
          setIsLoading(false);
          onSuccessLogin(authenticatedUser);
          onClose();
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
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error('Google Sign-In error:', err);
      setError(err.message || 'Google sign-in failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer z-10"
          >
            <X size={18} />
          </button>

          {mode === 'verify' ? (
            <EmailVerificationScreen
              email={email}
              pendingPassword={password}
              isNewAccount={isNewAccount}
              userData={pendingUserData}
              isModal={true}
              onSuccessLogin={(user) => {
                onSuccessLogin(user);
                onClose();
              }}
              onBackToLogin={() => {
                setMode('login');
                setError('');
                setSuccessMsg('');
              }}
            />
          ) : mode === 'forgot' ? (
            <ForgotPasswordScreen
              initialEmail={email}
              onBackToLogin={() => {
                setMode('login');
                setError('');
                setSuccessMsg('');
              }}
              isModal={true}
            />
          ) : (
            <>
              {/* Header with Logo */}
              <div className="p-6 text-center bg-slate-50 border-b border-slate-100">
                <div className="flex justify-center mb-2">
                  <LogoImage className="h-16 md:h-20 w-auto object-contain" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight font-display">
                  Dreampath <span className="text-indigo-600">AI</span> Account
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Access your personalized career reports, roadmaps, and appointments.
                </p>

                {/* Mode Switch Tabs */}
                <div className="flex bg-slate-200/80 p-1 rounded-2xl mt-4 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); }}
                    className={`flex-1 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                      mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); }}
                    className={`flex-1 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                      mode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              {/* Body Form */}
              <form onSubmit={handleAuthSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {error && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
                      <span>{error}</span>
                    </div>
                    {showResendOnLogin && (
                      <button
                        type="button"
                        onClick={handleResendFromLoginModal}
                        disabled={isResendingFromLogin}
                        className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 text-xs"
                      >
                        <Send size={12} className={isResendingFromLogin ? 'animate-bounce' : ''} />
                        <span>{isResendingFromLogin ? 'Sending Verification Link...' : 'Resend Verification Link'}</span>
                      </button>
                    )}
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-bold">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Muhammad Ali"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                          Phone Number (Optional)
                        </label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="0300-1234567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                          City
                        </label>
                        <div className="relative">
                          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="e.g. Lahore"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between text-xs">
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
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In' : 'Create Account & Verify'}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                  <span className="relative bg-white px-3 text-[11px] uppercase tracking-wider font-extrabold text-slate-400">Or continue with</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl border border-slate-200/80 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
