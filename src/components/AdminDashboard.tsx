import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  Clock, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Video, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  ExternalLink, 
  Copy, 
  Check, 
  Eye, 
  X, 
  Plus, 
  Sparkles, 
  UserCheck, 
  Lock, 
  CalendarCheck, 
  ArrowUpRight,
  Filter,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { db, collection, getDocs, doc, updateDoc, serverTimestamp, addDoc } from '../services/firebase';
import { AppointmentRecord } from './BookAppointment';

export interface FirestoreUserRecord {
  uid?: string;
  name?: string;
  email: string;
  phone?: string;
  city?: string;
  educationLevel?: string;
  emailVerified?: boolean;
  createdAt?: any;
  registeredAt?: string;
  lastLoginAt?: string;
  updatedAt?: any;
}

interface AdminDashboardProps {
  user?: any;
  onSelectDegree?: (degree: any) => void;
  onSwitchToStudentView?: () => void;
}

export default function AdminDashboard({ user, onSwitchToStudentView }: AdminDashboardProps) {
  const ADMIN_UID = "qwUnad3ZkZhqb2DQu8RnbSVsv3X2";
  const ADMIN_EMAIL = "dreampathai.official@gmail.com";
  const isAdmin = user && (user.uid === ADMIN_UID || user.email === ADMIN_EMAIL);

  const [activeTab, setActiveTab] = useState<'users' | 'appointments'>('users');
  const [users, setUsers] = useState<FirestoreUserRecord[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  // Search & Filter State
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [appointmentSearchQuery, setAppointmentSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedUserFilter, setSelectedUserFilter] = useState<string | null>(null);

  // Selected User Detail Modal
  const [inspectUser, setInspectUser] = useState<FirestoreUserRecord | null>(null);
  const [inspectAppointment, setInspectAppointment] = useState<AppointmentRecord | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Edit fields for selected appointment
  const [meetLinkInput, setMeetLinkInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Image Lightbox for Payment Slip
  const [viewImageModal, setViewImageModal] = useState<string | null>(null);

  // Manual Appointment Add Modal
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newEducation, setNewEducation] = useState('FSc Pre-Engineering');
  const [newAcademicPercentage, setNewAcademicPercentage] = useState('75%');
  const [newPreferredDate, setNewPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [newPreferredTime, setNewPreferredTime] = useState('04:00 PM');
  const [newPurpose, setNewPurpose] = useState('1-on-1 Career Guidance');
  const [newStatus, setNewStatus] = useState<AppointmentRecord['status']>('Confirmed');
  const [newMeetLink, setNewMeetLink] = useState('');
  const [newAdminNotes, setNewAdminNotes] = useState('Added by System Admin');

  // Format Date Helper
  const formatTimestamp = (val: any) => {
    if (!val) return 'Recent';
    if (typeof val === 'object' && val.seconds) {
      return new Date(val.seconds * 1000).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    if (typeof val === 'string') {
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      return val;
    }
    return String(val);
  };

  // Helper to open payment receipt image with permanent access token
  const handleOpenReceipt = (receiptData: string) => {
    if (!receiptData) return;
    if (receiptData.startsWith('data:')) {
      const win = window.open();
      if (win) {
        win.document.write(`<iframe src="${receiptData}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`);
      }
    } else {
      let url = receiptData;
      if (url.includes('firebasestorage.googleapis.com') && !url.includes('token=')) {
        url += (url.includes('?') ? '&' : '?') + 'alt=media&token=dreampath-permanent-token';
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Fetch all users from Firestore with merge from localStorage
  const loadUsersFromFirestore = async () => {
    setIsLoadingUsers(true);
    let fsList: FirestoreUserRecord[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.email) {
          fsList.push({
            uid: docSnap.id,
            ...data
          } as FirestoreUserRecord);
        }
      });
    } catch (e) {
      console.warn('Firestore users collection load note:', e);
    }

    try {
      const stored = localStorage.getItem('dreampath_all_registered_users');
      const localUsers: FirestoreUserRecord[] = stored ? JSON.parse(stored) : [];

      const map = new Map<string, FirestoreUserRecord>();
      [...fsList, ...localUsers].forEach(u => {
        if (u && u.email) {
          map.set(u.email.toLowerCase(), u);
        }
      });

      // Active logged user
      const activeStored = localStorage.getItem('dreampath_user');
      if (activeStored) {
        const parsed = JSON.parse(activeStored);
        if (parsed && parsed.email && !map.has(parsed.email.toLowerCase())) {
          map.set(parsed.email.toLowerCase(), {
            ...parsed,
            createdAt: 'Active Session'
          });
        }
      }

      setUsers(Array.from(map.values()));
    } catch (e) {
      console.error('Error loading users:', e);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Fetch all counseling sessions & appointments from Firestore
  const loadAppointmentsFromFirestore = async () => {
    setIsLoadingAppointments(true);
    let fsList: AppointmentRecord[] = [];

    // 1. Fetch from counseling_sessions collection
    try {
      const counselingSnap = await getDocs(collection(db, 'counseling_sessions'));
      counselingSnap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.id || docSnap.id) {
          fsList.push({
            id: data.id || docSnap.id,
            userId: data.userId || '',
            studentEmail: data.studentEmail || data.email || '',
            sessionType: data.sessionType || '1-to-1 Career Counseling',
            selfAssessmentData: data.selfAssessmentData || '',
            receiptData: data.receiptData || data.paymentProofDataUrl || '',
            status: data.status || 'pending_verification',
            createdAt: data.createdAt || data.createdDateString || 'Recent',
            fullName: data.fullName || 'Student',
            phone: data.phone || '',
            education: data.education || 'FSc Pre-Engineering',
            academicPercentage: data.academicPercentage || '',
            city: data.city || '',
            preferredDate: data.preferredDate || '',
            preferredTime: data.preferredTime || '',
            purpose: data.purpose || '1-to-1 Career Counseling',
            additionalQuestions: data.additionalQuestions || '',
            hasCompletedAssessment: data.hasCompletedAssessment || Boolean(data.selfAssessmentData),
            transactionId: data.transactionId || 'N/A',
            amount: data.amount || 'PKR 500',
            googleMeetLink: data.googleMeetLink || '',
            adminNotes: data.adminNotes || '',
            selfAssessmentFileName: data.selfAssessmentFileName || '',
            receiptFileName: data.receiptFileName || data.paymentProofFileName || ''
          } as AppointmentRecord);
        }
      });
    } catch (e) {
      console.warn('Firestore counseling_sessions load note:', e);
    }

    // 2. Fetch from legacy appointments collection
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.id || docSnap.id) {
          fsList.push({
            id: data.id || docSnap.id,
            userId: data.userId || '',
            studentEmail: data.studentEmail || data.email || '',
            sessionType: data.sessionType || '1-to-1 Career Counseling',
            selfAssessmentData: data.selfAssessmentData || '',
            receiptData: data.receiptData || data.paymentProofDataUrl || '',
            status: data.status || 'pending_verification',
            createdAt: data.createdAt || data.createdDateString || 'Recent',
            fullName: data.fullName || 'Student',
            phone: data.phone || '',
            education: data.education || 'FSc Pre-Engineering',
            academicPercentage: data.academicPercentage || '',
            city: data.city || '',
            preferredDate: data.preferredDate || '',
            preferredTime: data.preferredTime || '',
            purpose: data.purpose || '1-to-1 Career Counseling',
            additionalQuestions: data.additionalQuestions || '',
            hasCompletedAssessment: data.hasCompletedAssessment || Boolean(data.selfAssessmentData),
            transactionId: data.transactionId || 'N/A',
            amount: data.amount || 'PKR 500',
            googleMeetLink: data.googleMeetLink || '',
            adminNotes: data.adminNotes || '',
            selfAssessmentFileName: data.selfAssessmentFileName || '',
            receiptFileName: data.receiptFileName || data.paymentProofFileName || ''
          } as AppointmentRecord);
        }
      });
    } catch (e) {
      console.warn('Firestore appointments load note:', e);
    }

    try {
      const storedCounseling = localStorage.getItem('dreampath_counseling_sessions');
      const localCounseling: AppointmentRecord[] = storedCounseling ? JSON.parse(storedCounseling) : [];

      const stored = localStorage.getItem('dreampath_appointments');
      const localList: AppointmentRecord[] = stored ? JSON.parse(stored) : [];

      const map = new Map<string, AppointmentRecord>();
      [...fsList, ...localCounseling, ...localList].forEach(a => {
        if (a && a.id) {
          const prev = map.get(a.id);
          if (prev) {
            map.set(a.id, {
              ...prev,
              ...a,
              receiptData: a.receiptData || prev.receiptData,
              selfAssessmentData: a.selfAssessmentData || prev.selfAssessmentData
            });
          } else {
            map.set(a.id, a);
          }
        }
      });

      let finalArr = Array.from(map.values());
      if (finalArr.length === 0) {
        finalArr = [
          {
            id: 'SESSION-849201',
            userId: 'sample-student-uid',
            studentEmail: 'zainab.fatima@example.com',
            sessionType: '1-to-1 Career Counseling',
            selfAssessmentData: '',
            receiptData: '',
            fullName: 'Zainab Fatima',
            phone: '0300-9876543',
            education: 'FSc Pre-Medical',
            academicPercentage: '82%',
            city: 'Lahore',
            preferredDate: '2026-08-20',
            preferredTime: '04:00 PM',
            purpose: 'Guidance for MDCAT vs Biotechnology vs MBBS in Pakistan',
            additionalQuestions: 'Can I apply for scholarships at DUHS or AKU?',
            hasCompletedAssessment: true,
            transactionId: 'TRX940281920',
            amount: 'PKR 500',
            status: 'Confirmed',
            googleMeetLink: 'https://meet.google.com/abc-defg-hij',
            createdAt: 'Aug 17, 2026'
          }
        ];
      }

      setAppointments(finalArr);
    } catch (e) {
      console.error('Error parsing appointments:', e);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  useEffect(() => {
    loadUsersFromFirestore();
    loadAppointmentsFromFirestore();
  }, []);

  const handleCopyEmail = (emailText: string) => {
    navigator.clipboard.writeText(emailText);
    setCopiedEmail(emailText);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Get appointments for a specific user
  const getUserAppointments = (userEmail: string, userUid?: string) => {
    return appointments.filter(a => {
      const emailMatch = a.email && a.email.toLowerCase() === userEmail.toLowerCase();
      const uidMatch = userUid && (a as any).userId === userUid;
      return emailMatch || uidMatch;
    });
  };

  const handleInspectUserAppointments = (targetUser: FirestoreUserRecord) => {
    setSelectedUserFilter(targetUser.email);
    setActiveTab('appointments');
    setAppointmentSearchQuery(targetUser.email);
  };

  // Update appointment status and meet link
  const handleUpdateAppointment = async (aptId: string, newStatusVal: AppointmentRecord['status']) => {
    setIsUpdatingStatus(true);
    try {
      // Update local state
      const updated = appointments.map(a => {
        if (a.id === aptId) {
          return {
            ...a,
            status: newStatusVal,
            googleMeetLink: meetLinkInput !== undefined ? meetLinkInput : a.googleMeetLink,
            adminNotes: notesInput !== undefined ? notesInput : a.adminNotes
          };
        }
        return a;
      });
      setAppointments(updated);
      localStorage.setItem('dreampath_appointments', JSON.stringify(updated));

      // Attempt Firestore update
      try {
        await updateDoc(doc(db, 'appointments', aptId), {
          status: newStatusVal,
          googleMeetLink: meetLinkInput || '',
          adminNotes: notesInput || '',
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Firestore update skipped:', err);
      }

      if (inspectAppointment && inspectAppointment.id === aptId) {
        setInspectAppointment({
          ...inspectAppointment,
          status: newStatusVal,
          googleMeetLink: meetLinkInput || inspectAppointment.googleMeetLink,
          adminNotes: notesInput || inspectAppointment.adminNotes
        });
      }

      setActionSuccessMsg('Appointment status updated successfully!');
      setTimeout(() => setActionSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Create manual appointment
  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail || !newPhone) return;

    const newId = 'SESSION-' + Math.floor(100000 + Math.random() * 900000);
    const newRecord: AppointmentRecord = {
      id: newId,
      userId: 'admin-created',
      studentEmail: newEmail,
      email: newEmail,
      sessionType: '1-to-1 Career Counseling',
      selfAssessmentData: '',
      receiptData: '',
      fullName: newFullName,
      phone: newPhone,
      city: newCity || 'Pakistan',
      education: newEducation,
      academicPercentage: newAcademicPercentage,
      preferredDate: newPreferredDate,
      preferredTime: newPreferredTime,
      purpose: newPurpose,
      additionalQuestions: '',
      hasCompletedAssessment: true,
      transactionId: 'ADMIN-DIRECT-' + Math.floor(1000 + Math.random() * 9000),
      paymentProofFileName: 'Admin Authorized',
      amount: 'PKR 500',
      status: newStatus,
      googleMeetLink: newMeetLink || undefined,
      adminNotes: newAdminNotes,
      createdAt: new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    try {
      await addDoc(collection(db, 'appointments'), {
        ...newRecord,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore add booking note:', err);
    }

    const updated = [newRecord, ...appointments];
    setAppointments(updated);
    localStorage.setItem('dreampath_appointments', JSON.stringify(updated));

    setIsAddBookingOpen(false);
    setActionSuccessMsg(`Booking ${newId} created for ${newFullName}`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  // Filtered Users
  const filteredUsers = users.filter(u => {
    if (!userSearchQuery) return true;
    const q = userSearchQuery.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.city && u.city.toLowerCase().includes(q)) ||
      (u.educationLevel && u.educationLevel.toLowerCase().includes(q))
    );
  });

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = !appointmentSearchQuery || 
      a.fullName.toLowerCase().includes(appointmentSearchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(appointmentSearchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(appointmentSearchQuery.toLowerCase()) ||
      a.phone.includes(appointmentSearchQuery);
    
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchesUser = !selectedUserFilter || a.email.toLowerCase() === selectedUserFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesUser;
  });

  // Calculate high-level stats
  const totalUsersCount = users.length;
  const totalAppointmentsCount = appointments.length;
  const confirmedAppointmentsCount = appointments.filter(a => a.status === 'Confirmed').length;
  const pendingAppointmentsCount = appointments.filter(a => a.status.toLowerCase().includes('pending')).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-24">
      {/* Top Admin Status Banner */}
      <div className="bg-indigo-950/80 border-b border-indigo-500/30 px-4 py-2.5 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black tracking-wider uppercase text-[10px]">
              <ShieldCheck size={13} className="text-amber-400" />
              ADMINISTRATOR VIEW
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              User ID: <code className="text-indigo-300 font-mono font-bold bg-indigo-900/50 px-1.5 py-0.5 rounded">{user?.uid || ADMIN_UID}</code>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                loadUsersFromFirestore();
                loadAppointmentsFromFirestore();
              }}
              disabled={isLoadingUsers || isLoadingAppointments}
              className="px-3 py-1 bg-indigo-800/60 hover:bg-indigo-700/80 border border-indigo-500/40 rounded-xl text-indigo-200 font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={13} className={isLoadingUsers || isLoadingAppointments ? 'animate-spin' : ''} />
              <span>Sync Firestore</span>
            </button>

            {onSwitchToStudentView && (
              <button
                onClick={onSwitchToStudentView}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Preview Student View</span>
                <ArrowUpRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Main Header & Metric Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles size={14} />
              Dreampath AI Admin Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-display">
              System Administration &amp; Management
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Real-time Firestore records of registered students, account creation timestamps, and complete appointment counseling sessions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddBookingOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Counseling Session</span>
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {actionSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-3 shadow-lg"
          >
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </motion.div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-extrabold uppercase tracking-wider">Registered Users</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display">{totalUsersCount}</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">From Firestore Database</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-extrabold uppercase tracking-wider">1-to-1 Sessions</span>
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Calendar size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-teal-300 font-display">{totalAppointmentsCount}</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">1-to-1 Counseling Sessions</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-extrabold uppercase tracking-wider">Confirmed</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">{confirmedAppointmentsCount}</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Ready with Meet Link</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-extrabold uppercase tracking-wider">Pending Review</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-display">{pendingAppointmentsCount}</div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Requires Payment Verification</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-800/90 border border-slate-700/90 rounded-2xl w-fit mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users size={16} />
            <span>Firestore Users ({filteredUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalendarCheck size={16} />
            <span>1-to-1 Counseling Sessions ({filteredAppointments.length})</span>
          </button>
        </div>

        {/* Tab 1: Users List from Firestore */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search and Action Bar */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name, email, city, or education..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {userSearchQuery && (
                  <button
                    onClick={() => setUserSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Showing {filteredUsers.length} of {users.length} registered accounts</span>
              </div>
            </div>

            {/* Users Table / Grid */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-700 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Student &amp; Email</th>
                      <th className="py-3.5 px-4">Account Creation Date</th>
                      <th className="py-3.5 px-4">Education Level</th>
                      <th className="py-3.5 px-4">City / Contact</th>
                      <th className="py-3.5 px-4 text-center">Booked Appointments</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredUsers.map((u, idx) => {
                      const userApts = getUserAppointments(u.email, u.uid);
                      const isCurrentUserAdmin = u.uid === ADMIN_UID || u.email === ADMIN_EMAIL;

                      return (
                        <tr key={u.uid || u.email || idx} className="hover:bg-slate-750/50 transition-colors">
                          {/* Student Info & Email */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-300 shrink-0">
                                {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="font-black text-white text-xs flex items-center gap-1.5">
                                  <span>{u.name || 'Student Account'}</span>
                                  {isCurrentUserAdmin && (
                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold border border-amber-500/30">
                                      Admin
                                    </span>
                                  )}
                                  {u.emailVerified && (
                                    <span title="Verified Email">
                                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px] mt-0.5">
                                  <span className="truncate max-w-[180px] sm:max-w-[240px]">{u.email}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyEmail(u.email)}
                                    title="Copy Email"
                                    className="text-slate-500 hover:text-indigo-300 cursor-pointer"
                                  >
                                    {copiedEmail === u.email ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Account Creation Date */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                              <Calendar size={13} className="text-slate-400 shrink-0" />
                              <span>{formatTimestamp(u.createdAt || u.registeredAt)}</span>
                            </div>
                            {u.lastLoginAt && (
                              <div className="text-[10px] text-slate-500 mt-0.5">
                                Last active: {u.lastLoginAt}
                              </div>
                            )}
                          </td>

                          {/* Education Level */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-300 font-medium text-[11px]">
                              <GraduationCap size={12} className="text-indigo-400" />
                              {u.educationLevel || 'Not Specified'}
                            </span>
                          </td>

                          {/* City & Contact */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="text-slate-300 font-medium flex items-center gap-1">
                              <MapPin size={12} className="text-slate-400" />
                              <span>{u.city || 'Pakistan'}</span>
                            </div>
                            {u.phone && (
                              <div className="text-slate-400 text-[11px] font-mono mt-0.5 flex items-center gap-1">
                                <Phone size={11} />
                                <span>{u.phone}</span>
                              </div>
                            )}
                          </td>

                          {/* User Appointments Count & Action */}
                          <td className="py-4 px-4 text-center whitespace-nowrap">
                            {userApts.length > 0 ? (
                              <button
                                onClick={() => handleInspectUserAppointments(u)}
                                className="px-3 py-1 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 font-extrabold rounded-xl text-[11px] transition-all cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <Calendar size={12} />
                                <span>See Appointments ({userApts.length})</span>
                              </button>
                            ) : (
                              <span className="text-slate-500 text-[11px]">No bookings</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => setInspectUser(u)}
                              className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 font-bold rounded-xl text-xs transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye size={13} />
                              <span>Details</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          <Users size={32} className="mx-auto text-slate-600 mb-2" />
                          <p className="font-bold text-sm">No users found matching your search</p>
                          <p className="text-xs text-slate-500 mt-1">Try searching by another term or clear the filter</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: All Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search bookings by student name, email, ID, or phone..."
                  value={appointmentSearchQuery}
                  onChange={(e) => setAppointmentSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                {appointmentSearchQuery && (
                  <button
                    onClick={() => setAppointmentSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {selectedUserFilter && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-medium">
                    <span>Filtering: {selectedUserFilter}</span>
                    <button
                      onClick={() => {
                        setSelectedUserFilter(null);
                        setAppointmentSearchQuery('');
                      }}
                      className="text-teal-300 hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700 text-xs">
                  {['All', 'Confirmed', 'Pending Payment Review', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg font-extrabold text-[11px] transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointments Grid / Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredAppointments.map((apt) => {
                const isConfirmed = apt.status === 'Confirmed';
                const isPending = apt.status.toLowerCase().includes('pending');

                return (
                  <div
                    key={apt.id}
                    className={`bg-slate-800/90 border rounded-3xl p-5 transition-all shadow-lg hover:border-indigo-500/50 ${
                      isConfirmed
                        ? 'border-emerald-500/40'
                        : isPending
                        ? 'border-amber-500/40'
                        : 'border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-800">
                            {apt.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isConfirmed
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : isPending
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                        <h3 className="text-base font-black text-white font-display mt-1.5">
                          {apt.fullName}
                        </h3>
                      </div>

                      <button
                        onClick={() => {
                          setInspectAppointment(apt);
                          setMeetLinkInput(apt.googleMeetLink || '');
                          setNotesInput(apt.adminNotes || '');
                        }}
                        className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-bold rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>Manage</span>
                      </button>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Email Address</span>
                        <span className="font-mono text-[11px] truncate block text-indigo-300">{apt.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone Number</span>
                        <span className="font-mono text-[11px] block">{apt.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Date &amp; Time</span>
                        <span className="font-medium text-emerald-300 block">{apt.preferredDate} at {apt.preferredTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">City / Education</span>
                        <span className="font-medium truncate block">{apt.city} • {apt.education}</span>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="text-xs text-slate-300 mb-3">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Guidance Purpose:</span>
                      <p className="text-slate-300 line-clamp-2 mt-0.5">{apt.purpose}</p>
                    </div>

                    {/* View / Download Receipt Button */}
                    {apt.receiptData && (
                      <div className="mb-3">
                        <button
                          type="button"
                          onClick={() => handleOpenReceipt(apt.receiptData)}
                          className="w-full py-2.5 px-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-300 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <FileText size={14} />
                          <span>View / Download Payment Receipt (TRX: {apt.transactionId || 'N/A'})</span>
                        </button>
                      </div>
                    )}

                    {/* Google Meet Link Status */}
                    {apt.googleMeetLink ? (
                      <div className="flex items-center justify-between p-2.5 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-xs">
                        <div className="flex items-center gap-2 text-indigo-300 min-w-0">
                          <Video size={14} className="shrink-0 text-indigo-400" />
                          <span className="font-mono text-[11px] truncate">{apt.googleMeetLink}</span>
                        </div>
                        <a
                          href={apt.googleMeetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-[10px] shrink-0 flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-2.5 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                        <span className="text-[11px] font-medium">Google Meet link pending</span>
                        <button
                          onClick={() => {
                            setInspectAppointment(apt);
                            setMeetLinkInput(apt.googleMeetLink || '');
                            setNotesInput(apt.adminNotes || '');
                          }}
                          className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                        >
                          + Assign Link
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredAppointments.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-400 bg-slate-800/80 rounded-3xl border border-slate-700">
                  <Calendar size={36} className="mx-auto text-slate-600 mb-3" />
                  <p className="font-bold text-base text-white">No appointments found</p>
                  <p className="text-xs text-slate-400 mt-1">Adjust your search parameters or check another status filter.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {inspectUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setInspectUser(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-black text-xl text-indigo-300">
                  {inspectUser.name ? inspectUser.name.charAt(0).toUpperCase() : inspectUser.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-black text-white font-display">{inspectUser.name || 'Student User'}</h2>
                  <p className="text-xs font-mono text-indigo-300">{inspectUser.email}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs mb-6">
                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Firestore UID:</span>
                  <code className="text-indigo-300 font-mono">{inspectUser.uid || 'Local/Auth Record'}</code>
                </div>

                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Account Creation Date:</span>
                  <span className="text-white font-medium">{formatTimestamp(inspectUser.createdAt || inspectUser.registeredAt)}</span>
                </div>

                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Email Verified:</span>
                  <span className={`font-bold ${inspectUser.emailVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {inspectUser.emailVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>

                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Education Level:</span>
                  <span className="text-white font-medium">{inspectUser.educationLevel || 'Not specified'}</span>
                </div>

                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-400 font-bold">City:</span>
                  <span className="text-white font-medium">{inspectUser.city || 'Pakistan'}</span>
                </div>

                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-400 font-bold">Phone:</span>
                  <span className="text-white font-mono">{inspectUser.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const target = inspectUser;
                    setInspectUser(null);
                    handleInspectUserAppointments(target);
                  }}
                  className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Calendar size={15} />
                  <span>View All User Appointments</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Appointment Manage & Review Modal */}
      <AnimatePresence>
        {inspectAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setInspectAppointment(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-black text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                  {inspectAppointment.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  {inspectAppointment.status}
                </span>
              </div>

              <h2 className="text-xl font-black text-white font-display mb-4">
                Counseling Session for {inspectAppointment.fullName}
              </h2>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
                  <div>
                    <span className="text-slate-500 font-bold block text-[10px] uppercase">Student Email</span>
                    <span className="text-indigo-300 font-mono">{inspectAppointment.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block text-[10px] uppercase">Phone</span>
                    <span className="text-white font-mono">{inspectAppointment.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block text-[10px] uppercase">Preferred Slot</span>
                    <span className="text-emerald-300 font-medium">{inspectAppointment.preferredDate} at {inspectAppointment.preferredTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block text-[10px] uppercase">Education / %</span>
                    <span className="text-white font-medium">{inspectAppointment.education} ({inspectAppointment.academicPercentage || 'N/A'})</span>
                  </div>
                </div>

                {/* Payment & Documents Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Payment Receipt Box */}
                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Payment Receipt (JazzCash / EasyPaisa)</span>
                      <span className="font-mono text-[10px] text-teal-300 font-bold">TRX: {inspectAppointment.transactionId}</span>
                    </div>
                    {inspectAppointment.receiptData ? (
                      <div className="space-y-2">
                        <div className="relative group cursor-pointer" onClick={() => setViewImageModal(inspectAppointment.receiptData)}>
                          <img 
                            src={inspectAppointment.receiptData} 
                            alt="Payment Receipt" 
                            className="w-full h-28 object-cover rounded-xl border border-slate-600 hover:opacity-90 transition-opacity"
                          />
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/80 text-white rounded text-[10px] font-bold flex items-center gap-1">
                            <Eye size={11} /> View Full Slip
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenReceipt(inspectAppointment.receiptData)}
                          className="w-full py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <FileText size={14} />
                          <span>Open / Download Receipt in New Tab</span>
                        </button>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic">No receipt image attached.</p>
                    )}
                  </div>

                  {/* Self-Assessment Document Box */}
                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Self-Assessment Document</span>
                      <span className="font-mono text-[10px] text-indigo-300 font-bold">
                        {inspectAppointment.selfAssessmentData ? 'Attached' : 'Online Test'}
                      </span>
                    </div>
                    {inspectAppointment.selfAssessmentData ? (
                      <div>
                        {inspectAppointment.selfAssessmentData.startsWith('data:image') ? (
                          <div className="relative group cursor-pointer" onClick={() => setViewImageModal(inspectAppointment.selfAssessmentData)}>
                            <img 
                              src={inspectAppointment.selfAssessmentData} 
                              alt="Self Assessment Document" 
                              className="w-full h-28 object-cover rounded-xl border border-slate-600 hover:opacity-90 transition-opacity"
                            />
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/80 text-white rounded text-[10px] font-bold flex items-center gap-1">
                              <Eye size={11} /> View Test
                            </span>
                          </div>
                        ) : (
                          <a
                            href={inspectAppointment.selfAssessmentData}
                            download={inspectAppointment.selfAssessmentFileName || 'self_assessment.pdf'}
                            className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-indigo-300 hover:underline flex items-center justify-center gap-1.5 font-bold text-xs"
                          >
                            <FileText size={15} />
                            <span>Download Assessment PDF</span>
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic">Completed via interactive online assessment.</p>
                    )}
                  </div>
                </div>

                {/* Purpose */}
                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
                  <span className="text-slate-500 font-bold block text-[10px] uppercase mb-1">Purpose &amp; Questions</span>
                  <p className="text-slate-200">{inspectAppointment.purpose}</p>
                  {inspectAppointment.additionalQuestions && (
                    <p className="text-slate-400 mt-1 italic">&quot;{inspectAppointment.additionalQuestions}&quot;</p>
                  )}
                </div>

                {/* Google Meet Link Field */}
                <div>
                  <label className="block text-slate-400 font-bold text-xs mb-1 uppercase tracking-wider">
                    Google Meet Meeting Link:
                  </label>
                  <div className="relative">
                    <Video size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <input
                      type="url"
                      placeholder="https://meet.google.com/xyz-abcd-efg"
                      value={meetLinkInput}
                      onChange={(e) => setMeetLinkInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <label className="block text-slate-400 font-bold text-xs mb-1 uppercase tracking-wider">
                    Admin Counselor Notes:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Private session notes..."
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Action Buttons for Status */}
                <div className="pt-2">
                  <span className="block text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-2">
                    Update Appointment Status:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateAppointment(inspectAppointment.id, 'Confirmed')}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <CheckCircle2 size={14} />
                      <span>Confirm</span>
                    </button>
                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateAppointment(inspectAppointment.id, 'Completed')}
                      className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <CalendarCheck size={14} />
                      <span>Completed</span>
                    </button>
                    <button
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateAppointment(inspectAppointment.id, 'Rejected')}
                      className="py-2.5 px-3 bg-rose-600/80 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <X size={14} />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Booking Modal */}
      <AnimatePresence>
        {isAddBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsAddBookingOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>

              <h2 className="text-xl font-black text-white font-display mb-1">Create Counseling Booking</h2>
              <p className="text-xs text-slate-400 mb-5">Manually record a counseling appointment into Firestore database.</p>

              <form onSubmit={handleCreateManualBooking} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmad Khan"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="0300-1234567"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={newPreferredDate}
                      onChange={(e) => setNewPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Preferred Time</label>
                    <input
                      type="text"
                      value={newPreferredTime}
                      onChange={(e) => setNewPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Purpose of Session</label>
                  <input
                    type="text"
                    value={newPurpose}
                    onChange={(e) => setNewPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Google Meet Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={newMeetLink}
                    onChange={(e) => setNewMeetLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all cursor-pointer mt-4"
                >
                  Save Booking to Firestore
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
