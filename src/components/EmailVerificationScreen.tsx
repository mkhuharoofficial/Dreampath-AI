import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Send,
  LogIn,
  ArrowLeft,
  Inbox,
  AlertTriangle
} from 'lucide-react';
import { 
  auth, 
  db, 
  reload, 
  sendEmailVerification, 
  signOut, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp,
  signInWithEmailAndPassword
} from '../services/firebase';

interface EmailVerificationScreenProps {
  email: string;
  pendingPassword?: string;
  isNewAccount?: boolean;
  userData?: {
    uid?: string;
    name?: string;
    phone?: string;
    city?: string;
    educationLevel?: string;
  };
  onSuccessLogin: (user: { uid?: string; name: string; email: string; phone?: string; city?: string }) => void;
  onBackToLogin: () => void;
  isModal?: boolean;
}

export default function EmailVerificationScreen({
  email,
  pendingPassword,
  isNewAccount = true,
  userData,
  onSuccessLogin,
  onBackToLogin,
  isModal = false
}: EmailVerificationScreenProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'info' | 'success' | 'error'; text: string } | null>(null);

  // Handle countdown for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Check email verification status
  const handleCheckVerification = async () => {
    setIsChecking(true);
    setStatusMessage(null);

    try {
      let currentUser = auth.currentUser;

      // If no active currentUser in memory (since we safely sign out after registration), sign in to inspect token
      if (!currentUser && pendingPassword && email) {
        try {
          const cred = await signInWithEmailAndPassword(auth, email, pendingPassword);
          currentUser = cred.user;
        } catch (authErr: any) {
          console.warn('Re-auth verification check note:', authErr);
        }
      }

      if (!currentUser) {
        setStatusMessage({
          type: 'error',
          text: 'Please click "Go to Login" to sign in with your email and password once you have clicked the verification link.'
        });
        setIsChecking(false);
        return;
      }

      // Force refresh user token and state from Firebase servers
      await reload(currentUser);
      
      if (currentUser.emailVerified) {
        setStatusMessage({
          type: 'success',
          text: 'Email verified successfully! Logging you in...'
        });

        // Retrieve or prepare user profile
        let name = userData?.name || currentUser.displayName || email.split('@')[0] || 'Student';
        let phone = userData?.phone || '';
        let city = userData?.city || '';
        let educationLevel = userData?.educationLevel || 'Matric / O-Levels';

        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            name = data.name || name;
            phone = data.phone || phone;
            city = data.city || city;
            educationLevel = data.educationLevel || educationLevel;
          } else {
            await setDoc(doc(db, 'users', currentUser.uid), {
              uid: currentUser.uid,
              name,
              email: currentUser.email || email,
              phone,
              city,
              educationLevel,
              emailVerified: true,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        } catch (err) {
          console.warn('Firestore update note:', err);
        }

        const authenticatedUser = {
          uid: currentUser.uid,
          name,
          email: currentUser.email || email,
          phone,
          city,
          educationLevel
        };

        localStorage.setItem('dreampath_user', JSON.stringify(authenticatedUser));

        // Update all registered users in localStorage for admin
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

        setTimeout(() => {
          setIsChecking(false);
          onSuccessLogin(authenticatedUser);
        }, 600);
      } else {
        // Still not verified - sign out safely
        try {
          await signOut(auth);
        } catch {
          // Ignore
        }
        setIsChecking(false);
        setStatusMessage({
          type: 'error',
          text: 'Your account is not verified yet. Please open your email inbox, check Spam/Junk/Promotions folders, click the verification link, and then try again.'
        });
      }
    } catch (err: any) {
      setIsChecking(false);
      console.error('Error verifying email:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Could not verify status. Please ensure you clicked the link in your email and try logging in.'
      });
    }
  };

  // Resend verification email
  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;
    setIsResending(true);
    setStatusMessage(null);

    try {
      let currentUser = auth.currentUser;
      if (!currentUser && pendingPassword && email) {
        try {
          const cred = await signInWithEmailAndPassword(auth, email, pendingPassword);
          currentUser = cred.user;
        } catch {
          // Ignore
        }
      }

      if (currentUser) {
        const actionCodeSettings = {
          url: typeof window !== 'undefined' ? `${window.location.origin}/login` : 'https://dreampath.ai/login',
          handleCodeInApp: true
        };
        await sendEmailVerification(currentUser, actionCodeSettings);
        // Ensure user remains signed out after sending
        await signOut(auth);
        setResendCooldown(60);
        setStatusMessage({
          type: 'success',
          text: 'A fresh verification link has been sent to your Gmail/email address! Please check your Inbox, Spam, and Junk folders.'
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Please go to the Login screen, enter your password, and click "Resend Link" to receive a fresh verification email.'
        });
      }
    } catch (err: any) {
      console.error('Error resending email:', err);
      if (err.code === 'auth/too-many-requests') {
        setStatusMessage({
          type: 'error',
          text: 'Too many requests. Please wait a minute before requesting another verification email.'
        });
        setResendCooldown(60);
      } else {
        setStatusMessage({
          type: 'error',
          text: err.message || 'Failed to resend verification email. Please try again.'
        });
      }
    } finally {
      setIsResending(false);
    }
  };

  const openWebmail = (provider: 'gmail' | 'outlook' | 'yahoo') => {
    const urls = {
      gmail: 'https://mail.google.com',
      outlook: 'https://outlook.live.com',
      yahoo: 'https://mail.yahoo.com'
    };
    window.open(urls[provider], '_blank', 'noopener,noreferrer');
  };

  const handleReturn = async () => {
    try {
      await signOut(auth);
    } catch {
      // Ignore
    }
    onBackToLogin();
  };

  const isGmail = email.toLowerCase().includes('@gmail.com');

  return (
    <div className={`w-full ${isModal ? 'p-6' : 'p-6 md:p-8'}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Animated Icon */}
        <div className="relative inline-flex items-center justify-center mb-5">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-inner">
            <Mail size={36} className="animate-pulse text-emerald-600" />
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white shadow-sm">
            <CheckCircle2 size={18} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
          Verification Link Sent!
        </h2>

        {/* Target Email Badge */}
        <div className="my-3.5 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-slate-800 text-xs font-mono font-bold max-w-full overflow-hidden text-ellipsis shadow-2xs">
          <Mail size={14} className="text-indigo-600 shrink-0" />
          <span className="truncate">{email}</span>
        </div>

        {/* Primary Prominent Verification Notification Box */}
        <div className="bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/80 border border-indigo-200/80 rounded-3xl p-5 md:p-6 text-left my-4 shadow-sm space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Inbox size={18} />
            </div>
            <div>
              <p className="text-slate-800 text-sm md:text-base font-semibold leading-relaxed">
                We have sent a verification email to your {isGmail ? 'Gmail' : 'email'} address. Please check your <strong className="text-slate-900">Inbox, Spam, and Junk</strong> folders to verify your account.
              </p>
            </div>
          </div>

          {/* Important Spam / Junk / Promotions Folder Alert */}
          <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-900 text-xs md:text-sm font-medium leading-snug">
              <strong className="font-extrabold text-amber-950">Important:</strong> Once you click the verification link in your email, return here and click <strong className="text-indigo-900 underline">"Go to Login"</strong> to sign in.
            </p>
          </div>
        </div>

        {/* Feedback Message (if user triggered check or resend) */}
        {statusMessage && (
          <div 
            className={`p-3.5 rounded-2xl text-xs font-medium flex items-start gap-2.5 text-left mb-4 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 border border-rose-200 text-rose-800'
                : 'bg-amber-50/80 border border-amber-200/80 text-amber-900'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600 mt-0.5" />
            ) : statusMessage.type === 'error' ? (
              <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
            ) : (
              <ShieldCheck size={16} className="shrink-0 text-amber-600 mt-0.5" />
            )}
            <span className="leading-relaxed">{statusMessage.text}</span>
          </div>
        )}

        {/* Direct Email Provider Shortcuts */}
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider w-full mb-1">
            Quick Open Email Provider:
          </span>
          <button
            type="button"
            onClick={() => openWebmail('gmail')}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs cursor-pointer transition-all hover:border-indigo-300"
          >
            <span>Open Gmail</span>
            <ExternalLink size={12} className="text-slate-400" />
          </button>
          <button
            type="button"
            onClick={() => openWebmail('outlook')}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs cursor-pointer transition-all hover:border-indigo-300"
          >
            <span>Open Outlook</span>
            <ExternalLink size={12} className="text-slate-400" />
          </button>
          <button
            type="button"
            onClick={() => openWebmail('yahoo')}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs cursor-pointer transition-all hover:border-indigo-300"
          >
            <span>Open Yahoo</span>
            <ExternalLink size={12} className="text-slate-400" />
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-3">
          {/* Prominent Go to Login button */}
          <button
            type="button"
            id="go-to-login-btn"
            onClick={handleReturn}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn size={16} />
            <span>Go to Login</span>
            <ArrowRight size={16} />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            {/* Resend Verification Link */}
            <button
              type="button"
              id="resend-verification-btn"
              onClick={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
              className="w-full sm:w-1/2 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send size={14} className={isResending ? 'animate-bounce text-indigo-600' : 'text-slate-500'} />
              <span>
                {isResending 
                  ? 'Sending Link...' 
                  : resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s` 
                  : 'Resend Verification Link'}
              </span>
            </button>

            {/* Check Verification Status */}
            <button
              type="button"
              id="verify-status-btn"
              onClick={handleCheckVerification}
              disabled={isChecking}
              className="w-full sm:w-1/2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isChecking ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} className="text-teal-400" />
                  <span>I Have Verified</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
