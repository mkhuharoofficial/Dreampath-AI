import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, CheckCircle2, AlertCircle, Upload, ShieldAlert, 
  User, Mail, Phone, MapPin, GraduationCap, DollarSign, FileText, Sparkles, 
  ArrowRight, LogIn, Lock, Download, Copy, Check, Eye, Trash2, HelpCircle, FileCheck2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { db, collection, addDoc, doc, setDoc, serverTimestamp, auth } from '../services/firebase';
import { LogoImage } from './LogoImage';
import { getLogoDataUrl } from '../utils/logoHelper';

interface BookAppointmentProps {
  onOpenAssessment: () => void;
  onSuccessSubmitted?: () => void;
  user?: { uid?: string; name: string; email: string; phone?: string; city?: string } | null;
  onOpenAuthModal?: () => void;
}

export interface CounselingSessionRecord {
  id: string;
  userId: string;
  studentEmail: string;
  email?: string; // Legacy compatibility
  sessionType: string;
  selfAssessmentData: string; // Base64 Data URL
  receiptData: string; // Base64 Data URL
  paymentProofDataUrl?: string; // Legacy compatibility
  status: 'pending_verification' | 'Confirmed' | 'Rejected' | 'Completed' | 'Pending Payment Review';
  createdAt: any;
  fullName: string;
  phone: string;
  education: string;
  academicPercentage: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  purpose: string;
  additionalQuestions?: string;
  hasCompletedAssessment?: boolean;
  transactionId: string;
  amount: string;
  googleMeetLink?: string;
  adminNotes?: string;
  selfAssessmentFileName?: string;
  receiptFileName?: string;
  paymentProofFileName?: string;
}

// Alias for backward compatibility
export type AppointmentRecord = CounselingSessionRecord;

export default function BookAppointment({ 
  onOpenAssessment, 
  onSuccessSubmitted, 
  user, 
  onOpenAuthModal 
}: BookAppointmentProps) {
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState<boolean | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [education, setEducation] = useState('FSc Pre-Engineering');
  const [academicPercentage, setAcademicPercentage] = useState('75%');
  const [city, setCity] = useState(user?.city || '');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('04:00 PM');
  const [purpose, setPurpose] = useState('Choosing the right degree & university in Pakistan');
  const [additionalQuestions, setAdditionalQuestions] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Base64 File States
  const [selfAssessmentFile, setSelfAssessmentFile] = useState<File | null>(null);
  const [selfAssessmentBase64, setSelfAssessmentBase64] = useState<string>('');
  const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null);
  const [receiptBase64, setReceiptBase64] = useState<string>('');

  // UI States
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<CounselingSessionRecord | null>(null);
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name || '');
      if (!email) setEmail(user.email || '');
      if (!phone && user.phone) setPhone(user.phone);
      if (!city && user.city) setCity(user.city);
    }
  }, [user]);

  const availableTimeSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM',
    '08:00 PM'
  ];

  // Helper to convert any file to Base64 Data URL via FileReader API
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to Base64'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handle Self-Assessment File Upload
  const handleSelfAssessmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid Self-Assessment file format. Please upload PDF, PNG, JPG, or JPEG.');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        setError('Self-Assessment file size exceeds 8MB. Please upload a smaller document.');
        return;
      }
      setError('');
      setSelfAssessmentFile(file);

      try {
        const base64String = await fileToBase64(file);
        setSelfAssessmentBase64(base64String);
      } catch (err) {
        console.error('Self-assessment Base64 conversion error:', err);
        setError('Failed to process self-assessment document. Please try again.');
      }
    }
  };

  // Handle Payment Receipt File Upload
  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid Payment Receipt file format. Please upload JPG, PNG, or PDF.');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        setError('Payment receipt size exceeds 8MB. Please upload a smaller image.');
        return;
      }
      setError('');
      setPaymentReceiptFile(file);

      try {
        const base64String = await fileToBase64(file);
        setReceiptBase64(base64String);
      } catch (err) {
        console.error('Receipt Base64 conversion error:', err);
        setError('Failed to process payment receipt image. Please try again.');
      }
    }
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText('03293690697');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  // Dynamic zero-reload submission to Firebase Firestore
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const currentAuthUser = auth.currentUser;
    const resolvedUserId = currentAuthUser?.uid || user?.uid || '';
    const resolvedEmail = currentAuthUser?.email || user?.email || email;

    if (!resolvedUserId) {
      setError('You must be signed in to submit a 1-to-1 Career Counseling session. Please sign in or create an account.');
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }

    if (!fullName.trim() || !resolvedEmail.trim() || !phone.trim() || !city.trim()) {
      setError('Please fill in all mandatory contact information (Name, Email, WhatsApp, City).');
      return;
    }

    if (!transactionId || transactionId.trim().length < 5) {
      setError('Please enter a valid payment Transaction ID (TRX ID / TID) from your JazzCash/EasyPaisa app.');
      return;
    }

    if (!receiptBase64 && !paymentReceiptFile) {
      setError('Please upload your JazzCash/EasyPaisa payment receipt screenshot.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Ensure Base64 strings are generated if not ready
      let finalReceiptData = receiptBase64;
      if (!finalReceiptData && paymentReceiptFile) {
        finalReceiptData = await fileToBase64(paymentReceiptFile);
      }

      let finalSelfAssessmentData = selfAssessmentBase64;
      if (!finalSelfAssessmentData && selfAssessmentFile) {
        finalSelfAssessmentData = await fileToBase64(selfAssessmentFile);
      }

      const sessionId = 'SESSION-' + Math.floor(100000 + Math.random() * 900000);
      const sessionDateFormatted = new Date().toLocaleDateString('en-PK', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });

      // Strict required payload structure for Firestore
      const sessionRecordPayload = {
        id: sessionId,
        userId: resolvedUserId,
        studentEmail: resolvedEmail,
        sessionType: '1-to-1 Career Counseling',
        selfAssessmentData: finalSelfAssessmentData || '',
        receiptData: finalReceiptData || '',
        status: 'pending_verification' as const,
        createdAt: serverTimestamp(),
        // Full context fields for counselor & student dashboard
        fullName: fullName.trim(),
        phone: phone.trim(),
        education,
        academicPercentage: academicPercentage.trim(),
        city: city.trim(),
        preferredDate,
        preferredTime,
        purpose: purpose.trim(),
        additionalQuestions: additionalQuestions.trim(),
        hasCompletedAssessment: Boolean(hasCompletedAssessment || finalSelfAssessmentData),
        transactionId: transactionId.trim(),
        amount: 'PKR 500',
        selfAssessmentFileName: selfAssessmentFile?.name || (finalSelfAssessmentData ? 'self_assessment.pdf' : ''),
        receiptFileName: paymentReceiptFile?.name || 'payment_receipt.jpg',
        createdDateString: sessionDateFormatted
      };

      // Local persistence instantly first for zero-wait UI response
      const fullRecord: CounselingSessionRecord = {
        ...sessionRecordPayload,
        createdAt: sessionDateFormatted
      };

      try {
        const stored = localStorage.getItem('dreampath_counseling_sessions');
        const existing = stored ? JSON.parse(stored) : [];
        localStorage.setItem('dreampath_counseling_sessions', JSON.stringify([fullRecord, ...existing]));

        const storedApts = localStorage.getItem('dreampath_appointments');
        const existingApts = storedApts ? JSON.parse(storedApts) : [];
        localStorage.setItem('dreampath_appointments', JSON.stringify([fullRecord, ...existingApts]));
      } catch (storageErr) {
        console.error('LocalStorage save note:', storageErr);
      }

      // Execute Firestore writes concurrently in the background without blocking the UI
      Promise.allSettled([
        addDoc(collection(db, 'counseling_sessions'), sessionRecordPayload),
        addDoc(collection(db, 'book_appointment'), sessionRecordPayload),
        addDoc(collection(db, 'appointments'), {
          ...sessionRecordPayload,
          paymentProofDataUrl: finalReceiptData || undefined,
          paymentProofFileName: paymentReceiptFile?.name || 'receipt.jpg'
        }),
        resolvedUserId ? setDoc(doc(db, 'users', resolvedUserId), {
          lastCounselingSession: {
            sessionId,
            preferredDate,
            preferredTime,
            purpose,
            status: 'pending_verification',
            transactionId,
            submittedAt: serverTimestamp()
          }
        }, { merge: true }) : Promise.resolve()
      ]).catch(err => {
        console.warn('Background sync note:', err);
      });

      setIsSubmitting(false);
      setSubmittedRecord(fullRecord);

      if (onSuccessSubmitted) {
        onSuccessSubmitted();
      }
    } catch (err: any) {
      console.error('Counseling submission error:', err);
      setIsSubmitting(false);
      setError(err?.message || 'An unexpected error occurred while submitting your session. Please try again.');
    }
  };

  // Generate Official PDF Receipt / Voucher
  const handleDownloadReceiptPDF = async (record: CounselingSessionRecord) => {
    setIsGeneratingReceipt(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 14;

      // Navy Top Header Bar
      doc.setFillColor(15, 23, 42); // Slate 900
      doc.rect(0, 0, pageWidth, 36, 'F');
      doc.setFillColor(13, 148, 136); // Teal 600 line accent
      doc.rect(0, 35, pageWidth, 1.2, 'F');

      // Add Official Logo
      const logoUrl = await getLogoDataUrl();
      if (logoUrl) {
        try {
          doc.addImage(logoUrl, 'PNG', 14, 5, 26, 26);
        } catch {
          // fallback text
        }
      }

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('DREAMPATH AI', 46, 14);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(203, 213, 225);
      doc.text('1-to-1 Career Counseling • Official Verification Voucher', 46, 21);

      doc.setFontSize(8.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Personal Video Session with Certified Career Counselor • 2026 Edition', 46, 27);

      // Receipt Box Card
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, 44, pageWidth - (margin * 2), 125, 3, 3, 'FD');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('1-to-1 Career Counseling Confirmation', margin + 6, 54);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Issued: ${new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}`, pageWidth - margin - 6, 54, { align: 'right' });

      // Divider Line
      doc.setDrawColor(226, 232, 240);
      doc.line(margin + 6, 58, pageWidth - margin - 6, 58);

      const items = [
        ['Session Reference ID:', record.id],
        ['Service Type:', '1-to-1 Career Counseling (Video Guidance)'],
        ['Student Name:', record.fullName],
        ['Student Email:', record.studentEmail],
        ['WhatsApp / Phone:', record.phone],
        ['City:', record.city],
        ['Academic Background:', `${record.education} (${record.academicPercentage || 'N/A'})`],
        ['Scheduled Slot:', `${record.preferredDate} at ${record.preferredTime}`],
        ['Counseling Topic:', record.purpose || 'Career & Degree Selection Guidance'],
        ['Payment Account:', 'JazzCash / EasyPaisa (03293690697 - Muhammad Khan)'],
        ['Fee Amount:', 'PKR 500 (Verified Fee Voucher)'],
        ['Transaction ID (TRX):', record.transactionId],
        ['Self-Assessment Status:', record.selfAssessmentData ? 'Attached / Uploaded' : 'Online Form'],
        ['Verification Status:', 'PENDING VERIFICATION (Confirmation via Email & WhatsApp)']
      ];

      let rowY = 65;
      items.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text(label, margin + 6, rowY);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        doc.text(value, margin + 68, rowY);

        rowY += 6.8;
      });

      // Verification Notice Box
      doc.setFillColor(238, 242, 255);
      doc.setDrawColor(199, 210, 254);
      doc.roundedRect(margin, 175, pageWidth - (margin * 2), 36, 3, 3, 'FD');

      doc.setTextColor(49, 46, 129);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('Important Instructions:', margin + 6, 183);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(67, 56, 202);
      const noticeLines = [
        '• Your payment receipt and self-assessment have been stored in Firestore and will be verified by the Dreampath AI administrative desk.',
        '• Upon verification, your counselor will share the Google Meet private video link via email and WhatsApp.',
        '• Please ensure you join punctually with your academic marks sheet and university preference list ready.'
      ];
      let noticeY = 189;
      noticeLines.forEach(line => {
        doc.text(line, margin + 6, noticeY);
        noticeY += 5.5;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Dreampath AI • Founded by Muhammad Khan Khuharo • Account: 03293690697 (Muhammad Khan)', pageWidth / 2, 285, { align: 'center' });

      doc.save(`Dreampath_Counseling_Receipt_${record.id}.pdf`);
    } catch (pdfErr) {
      console.error('PDF receipt generation error:', pdfErr);
    } finally {
      setIsGeneratingReceipt(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-5xl mx-auto font-sans">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex justify-center mb-4">
          <LogoImage className="h-16 md:h-20 w-auto object-contain" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 font-extrabold text-xs uppercase tracking-widest mb-3 shadow-xs"
        >
          <Sparkles size={14} className="text-teal-600" />
          <span>1-to-1 Career Counseling</span>
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-display mb-3">
          1-to-1 Career <span className="bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Counseling</span>
        </h1>

        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
          Book a personalized 1-to-1 video counseling session with a Dreampath AI career mentor to finalize your degree, university admissions, and scholarship roadmap.
        </p>

        <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-2xl shadow-md mt-4">
          <span className="text-xs uppercase font-extrabold text-slate-400">Session Fee:</span>
          <span className="text-lg font-black text-teal-400">PKR 500</span>
          <span className="text-xs text-slate-400 font-bold">• 20 to 30 Minutes Video Session</span>
        </div>
      </div>

      {/* Confirmation State - Zero Reload UI */}
      {submittedRecord ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-teal-200 shadow-xl p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6"
        >
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider rounded-full inline-block">
              Submission Successful
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display">
              1-to-1 Career Counseling Submitted!
            </h2>
            <p className="text-emerald-700 font-bold text-sm bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              &quot;Your 1-to-1 Career Counseling session and payment receipt have been submitted for verification.&quot;
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs space-y-2.5 text-slate-700">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Session Reference:</span>
              <span className="font-mono font-extrabold text-slate-900">{submittedRecord.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Session Type:</span>
              <span className="font-extrabold text-indigo-700">{submittedRecord.sessionType}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Student Name & Email:</span>
              <span className="font-bold text-slate-900">{submittedRecord.fullName} ({submittedRecord.studentEmail})</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Scheduled Date & Time:</span>
              <span className="font-bold text-slate-900">{submittedRecord.preferredDate} at {submittedRecord.preferredTime}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Transaction ID (TRX):</span>
              <span className="font-mono font-bold text-indigo-600">{submittedRecord.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-slate-500">Self-Assessment Document:</span>
              <span className="font-bold text-emerald-700">
                {submittedRecord.selfAssessmentData ? 'Uploaded & Encoded in Firestore' : 'Completed Online'}
              </span>
            </div>
          </div>

          <div className="bg-indigo-50/80 p-4 rounded-xl border border-indigo-100 text-xs text-slate-700 leading-relaxed text-left space-y-1">
            <p className="font-bold text-indigo-900 flex items-center gap-1.5">
              <FileCheck2 size={15} className="text-indigo-600 shrink-0" />
              What Happens Next?
            </p>
            <p className="text-slate-600">
              Our administrative desk will verify your payment receipt transfer of PKR 500 to <strong>Muhammad Khan (03293690697)</strong>. Once verified, your status will be confirmed and you will receive your personal Google Meet video room link via WhatsApp and email.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleDownloadReceiptPDF(submittedRecord)}
              disabled={isGeneratingReceipt}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Download size={16} />
              <span>{isGeneratingReceipt ? 'Generating Official Voucher...' : 'Download Official Voucher PDF'}</span>
            </button>
            <button
              onClick={() => {
                setSubmittedRecord(null);
                setSelfAssessmentFile(null);
                setSelfAssessmentBase64('');
                setPaymentReceiptFile(null);
                setReceiptBase64('');
                setTransactionId('');
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer"
            >
              Schedule Another 1-to-1 Session
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Account Authentication Banner */}
          {!user ? (
            <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-teal-500/10 border-2 border-indigo-600/30 rounded-3xl p-6 md:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                  <Lock size={28} />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] uppercase font-black rounded-md inline-block mb-1">
                    Sign In Required
                  </span>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    Sign In to Schedule 1-to-1 Counseling
                  </h3>
                  <p className="text-slate-600 text-xs mt-1 font-medium">
                    Please sign in or create an account so we can link your 1-to-1 session, receipt data, and Google Meet access to your student profile.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAuthModal}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <LogIn size={16} />
                <span>Sign In / Register</span>
              </button>
            </div>
          ) : (
            <div className="bg-teal-50/90 border border-teal-200 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-800 block">Authenticated Student</span>
                  <span className="text-xs font-black text-slate-900">{user.name} ({user.email})</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase bg-teal-200/70 text-teal-950 px-2.5 py-1 rounded-md shrink-0">
                1-to-1 Counseling Ready
              </span>
            </div>
          )}

          {/* Assessment Check Banner */}
          {hasCompletedAssessment === null && (
            <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-500/20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="px-3 py-1 bg-teal-400/20 text-teal-300 text-[10px] uppercase font-extrabold tracking-widest rounded-md inline-block mb-2">
                  Recommended Preparation
                </span>
                <h3 className="text-xl font-black font-display">Have you completed your Self-Assessment Test?</h3>
                <p className="text-slate-300 text-xs mt-1 max-w-xl">
                  You can upload your completed self-assessment form below, or take our interactive 12-question online test before your counseling session.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  onClick={() => setHasCompletedAssessment(true)}
                  className="w-full sm:w-auto px-5 py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  I have my assessment ready
                </button>
                <button
                  onClick={onOpenAssessment}
                  className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  Take 12-Question Test
                </button>
              </div>
            </div>
          )}

          {/* Topics Covered Box */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" />
              What You Get in 1-to-1 Career Counseling
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'Degree selection based on your personality',
                'Top Pakistani university merit analysis',
                'Entry test strategy (NUST NET, FAST, MDCAT, ECAT)',
                'Scholarship planning (HEC, Ehsaas, PEEF, Need-based)',
                'High-paying IT, Medical, and Engineering career roadmap',
                'Direct Q&A with experienced Pakistani Career Counselor'
              ].map((topic, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-500 shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main 1-to-1 Career Counseling Form */}
          <form onSubmit={handleSubmitBooking} className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-xl space-y-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold flex items-center gap-2">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Student Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <User size={16} className="text-indigo-600" />
                Step 1: Student Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ali Raza"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Contact Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sukkur, Karachi, Lahore, Islamabad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Academic Level</label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="Matric Science">Matric Science</option>
                    <option value="FSc Pre-Engineering">FSc Pre-Engineering</option>
                    <option value="FSc Pre-Medical">FSc Pre-Medical</option>
                    <option value="ICS / Computer Science">ICS / Computer Science</option>
                    <option value="Commerce / I.Com">Commerce / I.Com</option>
                    <option value="FA / Humanities">FA / Humanities</option>
                    <option value="A-Levels / O-Levels">A-Levels / O-Levels</option>
                    <option value="Undergraduate Student">Undergraduate Student</option>
                    <option value="Graduated / Career Switcher">Graduated / Career Switcher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Percentage / Marks / GPA</label>
                  <input
                    type="text"
                    placeholder="e.g. 82% or 950/1100 or 3.6 CGPA"
                    value={academicPercentage}
                    onChange={(e) => setAcademicPercentage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Schedule Slot & Discussion Goal */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                Step 2: Preferred Slot & Discussion Goal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTime(slot)}
                        className={`py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                          preferredTime === slot
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Counseling Goal</label>
                <input
                  type="text"
                  placeholder="e.g. Need advice on CS vs Software Engineering at FAST vs NUST"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Specific Questions / Concerns for Counselor</label>
                <textarea
                  rows={2}
                  placeholder="Mention any universities, budget constraints, or future career doubts..."
                  value={additionalQuestions}
                  onChange={(e) => setAdditionalQuestions(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Step 3: Self-Assessment Document Upload (Base64 into Firestore) */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileText size={16} className="text-indigo-600" />
                  Step 3: Self-Assessment Test Document (Optional / Recommended)
                </h3>
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-bold underline cursor-pointer text-left"
                >
                  Take Free Online Assessment
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Upload your completed Self-Assessment report or academic document (<code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">.pdf, .png, .jpg</code>). Files are encoded directly to Base64 in Firestore without external storage requirements.
                </p>

                <div className="relative border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-4 text-center transition-all bg-white">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleSelfAssessmentUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Upload size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-extrabold text-slate-800">
                        {selfAssessmentFile ? selfAssessmentFile.name : 'Choose Self-Assessment Document (.pdf, .png, .jpg)'}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {selfAssessmentFile 
                          ? `${(selfAssessmentFile.size / 1024).toFixed(1)} KB • Base64 Encoded Ready`
                          : 'Drag and drop or browse from your device (Max 8MB)'}
                      </p>
                    </div>
                  </div>
                </div>

                {selfAssessmentFile && (
                  <div className="mt-3 flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                    <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      Document Attached: {selfAssessmentFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelfAssessmentFile(null);
                        setSelfAssessmentBase64('');
                      }}
                      className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Payment Details & Receipt Upload */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-600" />
                Step 4: Fee Payment & Receipt Upload (PKR 500)
              </h3>

              {/* Verified Payment Account Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs uppercase font-extrabold tracking-wider text-teal-300">
                      Official Payment Account Details
                    </span>
                  </div>
                  <span className="text-[11px] bg-teal-950/90 text-teal-300 border border-teal-800/80 px-2.5 py-0.5 rounded-full font-bold">
                    JazzCash / EasyPaisa / Raast
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Account Title:</span>
                    <span className="text-sm font-black text-white">Muhammad Khan</span>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">JazzCash Account Number:</span>
                      <span className="text-base font-black font-mono text-teal-300">03293690697</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccountNumber}
                      className="p-2 rounded-xl bg-slate-700 hover:bg-teal-500 hover:text-slate-950 text-white transition-all cursor-pointer shrink-0"
                      title="Copy Account Number"
                    >
                      {copiedAccount ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Session Fee Amount:</span>
                    <span className="text-base font-black text-emerald-400">PKR 500</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Send <strong className="text-white">PKR 500</strong> to JazzCash / EasyPaisa Number <strong className="text-teal-300 font-mono">03293690697</strong> (Title: <strong className="text-white">Muhammad Khan</strong>). Note your Transaction ID (TRX ID) and attach your payment receipt screenshot below.
                </p>
              </div>

              {/* Transaction ID & Receipt Upload Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Transaction ID (TRX ID / TID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 202684910293 or 03293690697-TRX"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">
                    Enter the exact numeric TID / Reference number generated by your JazzCash or EasyPaisa app.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload Payment Receipt Proof (.jpg, .png, .pdf) *
                  </label>
                  <div className="relative border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-3 bg-slate-50 hover:bg-slate-100/80 transition-all text-center">
                    <input
                      type="file"
                      required={!receiptBase64}
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleReceiptUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-slate-700">
                      <Upload size={16} className="text-teal-600" />
                      <span>{paymentReceiptFile ? paymentReceiptFile.name : 'Attach Receipt Screenshot or PDF'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receipt Preview Thumbnail */}
              {receiptBase64 && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {receiptBase64.startsWith('data:image') ? (
                      <img 
                        src={receiptBase64} 
                        alt="Receipt preview" 
                        className="w-14 h-14 object-cover rounded-xl border border-slate-300 shadow-2xs"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl border border-red-200 flex items-center justify-center font-bold text-xs">
                        PDF
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-black text-slate-800">
                        {paymentReceiptFile?.name || 'Payment Receipt Document'}
                      </p>
                      <p className="text-[11px] text-teal-700 font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Base64 encoded directly for Firestore (No storage bucket needed)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentReceiptFile(null);
                      setReceiptBase64('');
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Remove Receipt"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Submission Button with Zero-Reload Behavior */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-900 hover:from-slate-800 hover:to-teal-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} className="animate-spin text-teal-300" />
                    <span>Processing & Submitting 1-to-1 Counseling...</span>
                  </span>
                ) : (
                  <>
                    <span>Submit 1-to-1 Career Counseling (PKR 500)</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                🔒 Safe & secure submission. Records and Base64 receipt data are stored directly inside Firestore.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
