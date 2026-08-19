import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ExternalLink, 
  RefreshCw, 
  LogIn, 
  Sparkles,
  Send
} from 'lucide-react';
import { auth, sendPasswordResetEmail } from '../services/firebase';

interface ForgotPasswordScreenProps {
  initialEmail?: string;
  onBackToLogin: () => void;
  isModal?: boolean;
}

export default function ForgotPasswordScreen({
  initialEmail = '',
  onBackToLogin,
  isModal = false
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleGetResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const targetEmail = email.trim();
    if (!targetEmail) {
      setError('Please enter your registered email address.');
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, targetEmail);
      setIsSent(true);
      setResendCooldown(45);
    } catch (err: any) {
      console.warn('Password reset error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address. Please verify your email or create a new account.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a moment before trying again.');
      } else {
        setError(err.message || 'Failed to send password reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendLink = async () => {
    if (resendCooldown > 0 || isLoading) return;
    setError('');
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResendCooldown(45);
    } catch (err: any) {
      console.warn('Resend password reset error:', err);
      setError(err.message || 'Failed to resend reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to open student email provider
  const getEmailProviderUrl = (emailStr: string) => {
    const domain = emailStr.split('@')[1]?.toLowerCase() || '';
    if (domain.includes('gmail') || domain.includes('google')) return 'https://mail.google.com';
    if (domain.includes('outlook') || domain.includes('hotmail') || domain.includes('live')) return 'https://outlook.live.com';
    if (domain.includes('yahoo')) return 'https://mail.yahoo.com';
    return null;
  };

  const emailProviderUrl = getEmailProviderUrl(email);

  return (
    <div className={`w-full ${isModal ? 'p-6 sm:p-8' : 'p-6 md:p-10'} font-sans text-slate-800`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-3 shadow-xs text-indigo-600">
          <Key size={30} className="text-indigo-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
          {isSent ? 'Password Reset Link Sent' : 'Reset Your Password'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-sm mx-auto">
          {isSent
            ? 'A password change link has been sent to your email address.'
            : 'Enter your registered email address and click "Get Reset Link" to change your password.'}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2.5 font-medium shadow-xs">
          <AlertCircle size={16} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {!isSent ? (
        /* Form: Enter Email & Click "Get Reset Link" */
        <form onSubmit={handleGetResetLink} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Registered Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              We will send you a secure Firebase link to configure your new password.
            </p>
          </div>

          {/* "Get Reset Link" Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Get Reset Link</span>
              </>
            )}
          </button>

          {/* Sign In Button / Back */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-xs font-extrabold text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <ArrowLeft size={14} />
              <span>Back to Sign In</span>
            </button>
          </div>
        </form>
      ) : (
        /* Success Screen after clicking "Get Reset Link" */
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200/90 rounded-2xl text-emerald-900 text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-emerald-800">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Password change link dispatched!</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs">
              We have sent a password change link to: <br />
              <strong className="font-mono text-indigo-700 break-all text-xs sm:text-sm bg-white/70 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                {email}
              </strong>
            </p>
            <p className="text-[11px] text-slate-500">
              Please open your inbox, click the password reset link, set your new password, and then return here to sign in.
            </p>
          </div>

          {/* Quick Email Shortcuts */}
          {emailProviderUrl && (
            <a
              href={emailProviderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Open Your Mailbox</span>
              <ExternalLink size={14} />
            </a>
          )}

          {/* Resend Action with countdown */}
          <div className="text-center pt-1">
            <button
              type="button"
              disabled={resendCooldown > 0 || isLoading}
              onClick={handleResendLink}
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 disabled:text-slate-400 transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
              <span>
                {resendCooldown > 0
                  ? `Resend link in ${resendCooldown}s`
                  : "Didn't receive email? Click to resend"}
              </span>
            </button>
          </div>

          {/* Primary Clickable Sign-In Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn size={16} />
              <span>Click to Sign In</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
