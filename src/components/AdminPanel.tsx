import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Check, X, Video, FileText, Calendar, Clock, User, 
  Search, RefreshCw, AlertCircle, Sparkles, CheckCircle2, Plus, Lock, LogIn, Mail, Key,
  Eye, Users, ImageIcon
} from 'lucide-react';
import { AppointmentRecord } from './BookAppointment';
import { db, collection, getDocs, addDoc, serverTimestamp } from '../services/firebase';

export interface RegisteredUser {
  uid?: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  educationLevel?: string;
  registeredAt?: string;
  lastLoginAt?: string;
}

export default function AdminPanel({ user }: { user?: any }) {
  const ADMIN_EMAIL = "dreampathai.official@gmail.com";
  const ADMIN_UID = "qwUnad3ZkZhqb2DQu8RnbSVsv3X2";
  const isAdmin = user && (user.email === ADMIN_EMAIL || user.uid === ADMIN_UID);

  // Active Tab: 'appointments' | 'users'
  const [activeTab, setActiveTab] = useState<'appointments' | 'users'>('appointments');

  // Appointments state
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApt, setSelectedApt] = useState<AppointmentRecord | null>(null);
  const [isLoadingFs, setIsLoadingFs] = useState(false);

  // Registered Users state
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // Image Lightbox Modal
  const [viewImageModal, setViewImageModal] = useState<string | null>(null);

  // Edit fields
  const [meetLinkInput, setMeetLinkInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  // Add New Booking Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
  const [newTransactionId, setNewTransactionId] = useState('ADMIN-MANUAL-' + Math.floor(1000 + Math.random() * 9000));
  const [newStatus, setNewStatus] = useState<AppointmentRecord['status']>('Confirmed');
  const [newMeetLink, setNewMeetLink] = useState('');
  const [newAdminNotes, setNewAdminNotes] = useState('Added manually by Admin');
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');



  const loadUsers = async () => {
    let fsUsers: RegisteredUser[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.email) {
          fsUsers.push(data as RegisteredUser);
        }
      });
    } catch (e) {
      console.warn('Could not fetch users from Firestore:', e);
    }

    try {
      const stored = localStorage.getItem('dreampath_all_registered_users');
      const localUsers: RegisteredUser[] = stored ? JSON.parse(stored) : [];

      const userMap = new Map<string, RegisteredUser>();
      [...fsUsers, ...localUsers].forEach(u => {
        if (u && u.email) {
          userMap.set(u.email.toLowerCase(), u);
        }
      });

      // Also check active logged session
      const activeStored = localStorage.getItem('dreampath_user');
      if (activeStored) {
        const parsed = JSON.parse(activeStored);
        if (parsed && parsed.email) {
          if (!userMap.has(parsed.email.toLowerCase())) {
            userMap.set(parsed.email.toLowerCase(), {
              ...parsed,
              registeredAt: 'Active Session User'
            });
          }
        }
      }

      setRegisteredUsers(Array.from(userMap.values()));
    } catch (e) {
      console.error('Failed to load registered users:', e);
    }
  };

  const loadAppointments = async () => {
    setIsLoadingFs(true);
    let firestoreList: AppointmentRecord[] = [];

    // Fetch from counseling_sessions
    try {
      const counselingSnap = await getDocs(collection(db, 'counseling_sessions'));
      counselingSnap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.id || docSnap.id) {
          firestoreList.push({
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
            receiptFileName: data.receiptFileName || data.paymentProofFileName || '',
            paymentProofDataUrl: data.receiptData || data.paymentProofDataUrl
          } as AppointmentRecord);
        }
      });
    } catch (fsErr) {
      console.warn('Could not load counseling_sessions from Firestore:', fsErr);
    }

    // Fetch legacy appointments
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.id || docSnap.id) {
          firestoreList.push({
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
            receiptFileName: data.receiptFileName || data.paymentProofFileName || '',
            paymentProofDataUrl: data.receiptData || data.paymentProofDataUrl
          } as AppointmentRecord);
        }
      });
    } catch (fsErr) {
      console.warn('Could not load appointments from Firestore:', fsErr);
    }

    try {
      const storedCounseling = localStorage.getItem('dreampath_counseling_sessions');
      const localCounseling: AppointmentRecord[] = storedCounseling ? JSON.parse(storedCounseling) : [];

      const stored = localStorage.getItem('dreampath_appointments');
      const localList: AppointmentRecord[] = stored ? JSON.parse(stored) : [];

      // Merge unique by ID while preserving image data URLs
      const mergedMap = new Map<string, AppointmentRecord>();
      [...firestoreList, ...localCounseling, ...localList].forEach(apt => {
        if (apt && apt.id) {
          const existing = mergedMap.get(apt.id);
          if (existing) {
            mergedMap.set(apt.id, {
              ...existing,
              ...apt,
              paymentProofDataUrl: apt.receiptData || apt.paymentProofDataUrl || existing.paymentProofDataUrl,
              receiptData: apt.receiptData || existing.receiptData,
              selfAssessmentData: apt.selfAssessmentData || existing.selfAssessmentData
            });
          } else {
            mergedMap.set(apt.id, {
              ...apt,
              paymentProofDataUrl: apt.receiptData || apt.paymentProofDataUrl
            });
          }
        }
      });

      let combined = Array.from(mergedMap.values());

      if (combined.length === 0) {
        // Sample default
        const sample: AppointmentRecord[] = [
          {
            id: 'SESSION-849201',
            userId: 'sample-student-uid',
            studentEmail: 'zainab.fatima@example.com',
            email: 'zainab.fatima@example.com',
            sessionType: '1-to-1 Career Counseling',
            selfAssessmentData: '',
            receiptData: '',
            fullName: 'Zainab Fatima',
            phone: '0300-9876543',
            education: 'FSc Pre-Medical',
            academicPercentage: '82%',
            city: 'Lahore',
            preferredDate: '2026-08-15',
            preferredTime: '04:00 PM',
            purpose: 'Guidance for MDCAT vs Pharm-D and Biotechnology options',
            additionalQuestions: 'Can I apply for scholarships at DUHS?',
            hasCompletedAssessment: true,
            transactionId: 'TRX940281920',
            paymentProofFileName: 'easypaisa_receipt_zainab.jpg',
            amount: 'PKR 500',
            status: 'Confirmed',
            createdAt: 'Aug 10, 2026'
          }
        ];
        combined = sample;
        localStorage.setItem('dreampath_appointments', JSON.stringify(sample));
      }

      setAppointments(combined);
      if (combined.length > 0 && !selectedApt) {
        setSelectedApt(combined[0]);
        setMeetLinkInput(combined[0].googleMeetLink || '');
        setNotesInput(combined[0].adminNotes || '');
      }
    } catch (e) {
      console.error('Failed to parse appointments:', e);
    } finally {
      setIsLoadingFs(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAppointments();
      loadUsers();
    }
  }, [isAdmin]);

  const handleUpdateStatus = (id: string, newStatusVal: AppointmentRecord['status']) => {
    const updated = appointments.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: newStatusVal,
          googleMeetLink: meetLinkInput || a.googleMeetLink,
          adminNotes: notesInput || a.adminNotes
        };
      }
      return a;
    });
    setAppointments(updated);
    try {
      localStorage.setItem('dreampath_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt({
        ...selectedApt,
        status: newStatusVal,
        googleMeetLink: meetLinkInput || selectedApt.googleMeetLink,
        adminNotes: notesInput || selectedApt.adminNotes
      });
    }
  };

  const handleCreateNewBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    setAddSuccess('');

    if (!newFullName || !newEmail || !newPhone || !newCity) {
      setAddError('Please fill in all student contact details.');
      return;
    }

    const bookingRefId = 'SESSION-' + Math.floor(100000 + Math.random() * 900000);
    const newRecord: AppointmentRecord = {
      id: bookingRefId,
      userId: 'admin-created',
      studentEmail: newEmail,
      email: newEmail,
      sessionType: '1-to-1 Career Counseling',
      selfAssessmentData: '',
      receiptData: '',
      fullName: newFullName,
      phone: newPhone,
      education: newEducation,
      academicPercentage: newAcademicPercentage,
      city: newCity,
      preferredDate: newPreferredDate,
      preferredTime: newPreferredTime,
      purpose: newPurpose,
      additionalQuestions: '',
      hasCompletedAssessment: true,
      transactionId: newTransactionId || ('ADM-' + Math.floor(10000 + Math.random() * 90000)),
      paymentProofFileName: 'Admin Verified Receipt',
      amount: 'PKR 500',
      status: newStatus,
      googleMeetLink: newMeetLink || undefined,
      adminNotes: newAdminNotes || undefined,
      createdAt: new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    try {
      await addDoc(collection(db, 'appointments'), {
        ...newRecord,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('Saving new admin booking to Firestore skipped:', err);
    }

    const updated = [newRecord, ...appointments];
    setAppointments(updated);
    try {
      localStorage.setItem('dreampath_appointments', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setAddSuccess(`Booking ${bookingRefId} created successfully!`);
    setTimeout(() => {
      setIsAddModalOpen(false);
      setAddSuccess('');
      setNewFullName('');
      setNewEmail('');
      setNewPhone('');
      setNewCity('');
      setSelectedApt(newRecord);
      setMeetLinkInput(newRecord.googleMeetLink || '');
      setNotesInput(newRecord.adminNotes || '');
    }, 1000);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center font-sans bg-slate-900">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShieldCheck size={36} />
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              Access Denied
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-display mt-2">
              Unauthorized
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              You do not have administrator privileges to view this portal.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredAppointments = appointments.filter(a => 
    a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = registeredUsers.filter(u =>
    u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    (u.phone && u.phone.includes(userSearchQuery)) ||
    (u.city && u.city.toLowerCase().includes(userSearchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      {/* Admin Panel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-teal-400 text-xs font-black uppercase tracking-wider mb-2">
            <ShieldCheck size={14} />
            <span>Dreampath AI Admin Console</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-display">
            Admin Management Portal
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage appointments, verify payment proof screenshots, view registered student users, and set Google Meet links.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Booking</span>
          </button>

          <button
            onClick={() => {
              loadAppointments();
              loadUsers();
            }}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw size={14} className={isLoadingFs ? 'animate-spin' : ''} />
            <span>Refresh All Data</span>
          </button>

          <button
            onClick={() => {
              // Now handled by layout/app logout
              window.location.hash = '';
            }}
            className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>

      {/* Admin Section Tabs Bar */}
      <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl mb-6 max-w-md">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'appointments'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar size={15} />
          <span>Bookings ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'users'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users size={15} />
          <span>Registered Users ({registeredUsers.length})</span>
        </button>
      </div>

      {/* TAB 1: Appointments & Bookings View */}
      {activeTab === 'appointments' && (
        <>
          {/* Search Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student name, email, transaction ID, or booking ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          {/* Main Appointments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Appointments Sidebar List */}
            <div className="lg:col-span-1 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                  <p className="text-xs text-slate-500 font-bold">No appointment requests found.</p>
                </div>
              ) : (
                filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => {
                      setSelectedApt(apt);
                      setMeetLinkInput(apt.googleMeetLink || '');
                      setNotesInput(apt.adminNotes || '');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedApt?.id === apt.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-white/20">
                        {apt.id}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        apt.status === 'Confirmed' ? 'bg-emerald-500 text-white' :
                        apt.status === 'Rejected' ? 'bg-red-500 text-white' :
                        'bg-amber-400 text-slate-950'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm">{apt.fullName}</h4>
                    <p className="text-xs opacity-75">{apt.education} ({apt.city})</p>
                    
                    <div className="mt-3 pt-2 border-t border-slate-200/20 text-[11px] flex justify-between opacity-80 font-mono">
                      <span>TRX: {apt.transactionId}</span>
                      <span>{apt.preferredDate}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

        {/* Selected Appointment Details Panel */}
        <div className="lg:col-span-2">
          {selectedApt ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono text-indigo-600 font-bold">{selectedApt.id}</span>
                  <h3 className="text-xl font-black text-slate-900 font-display">{selectedApt.fullName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-bold">Created On</span>
                  <span className="text-xs font-bold text-slate-700">{selectedApt.createdAt}</span>
                </div>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                  <span className="font-bold text-slate-900">{selectedApt.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone / WhatsApp</span>
                  <span className="font-bold text-slate-900">{selectedApt.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">City</span>
                  <span className="font-bold text-slate-900">{selectedApt.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Education</span>
                  <span className="font-bold text-slate-900">{selectedApt.education} ({selectedApt.academicPercentage})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Slot</span>
                  <span className="font-bold text-slate-900">{selectedApt.preferredDate} @ {selectedApt.preferredTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Assessment Status</span>
                  <span className={`font-bold ${selectedApt.hasCompletedAssessment ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {selectedApt.hasCompletedAssessment ? 'Completed ✓' : 'Not Taken'}
                  </span>
                </div>
              </div>

              {/* Student Purpose */}
              <div>
                <h5 className="text-xs uppercase font-extrabold text-slate-500 mb-1">Student Purpose / Notes</h5>
                <p className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 font-medium leading-relaxed">
                  {selectedApt.purpose} {selectedApt.additionalQuestions ? `| Note: ${selectedApt.additionalQuestions}` : ''}
                </p>
              </div>

              {/* Payment Proof Verification */}
              <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs uppercase font-extrabold text-indigo-900 flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-indigo-600" />
                    <span>Payment Proof Verification</span>
                  </h5>
                  {selectedApt.paymentProofDataUrl && (
                    <button
                      type="button"
                      onClick={() => setViewImageModal(selectedApt.paymentProofDataUrl || null)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 hover:bg-indigo-700 transition-all cursor-pointer shadow-xs"
                    >
                      <Eye size={12} />
                      <span>View Full Receipt</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs">
                  <div>
                    <span className="text-indigo-600 font-bold">Transaction ID: </span>
                    <span className="font-mono font-extrabold text-indigo-950">{selectedApt.transactionId}</span>
                  </div>
                  <div>
                    <span className="text-indigo-600 font-bold">Uploaded File: </span>
                    <span className="font-semibold text-indigo-950">{selectedApt.paymentProofFileName || 'N/A'}</span>
                  </div>
                </div>

                {/* Payment Proof Image Thumbnail Preview */}
                {selectedApt.paymentProofDataUrl ? (
                  <div className="mt-2 bg-white p-2.5 rounded-xl border border-indigo-100 shadow-2xs">
                    <p className="text-[10px] text-slate-500 font-bold mb-1.5 uppercase tracking-wider">
                      Uploaded Payment Screenshot / Receipt:
                    </p>
                    <div 
                      onClick={() => setViewImageModal(selectedApt.paymentProofDataUrl || null)}
                      className="relative max-h-52 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center group cursor-pointer"
                    >
                      <img 
                        src={selectedApt.paymentProofDataUrl} 
                        alt="Payment Proof Screenshot" 
                        className="max-h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black gap-2 backdrop-blur-xs">
                        <Eye size={18} />
                        <span>Click to Enlarge Full Receipt</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-white/80 rounded-xl border border-indigo-100 text-xs text-slate-500 font-medium flex items-center gap-2">
                    <AlertCircle size={14} className="text-amber-500 shrink-0" />
                    <span>File name recorded: {selectedApt.paymentProofFileName || 'Receipt'}. Screenshot binary preview is available for new bookings.</span>
                  </div>
                )}
              </div>

              {/* Admin Actions & Google Meet Link */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h5 className="text-xs uppercase font-extrabold text-slate-900">Admin Actions & Google Meet Link</h5>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google Meet Link</label>
                  <div className="relative">
                    <Video size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="https://meet.google.com/abc-defg-hij"
                      value={meetLinkInput}
                      onChange={(e) => setMeetLinkInput(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admin Internal Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Payment verified via Easypaisa statement"
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleUpdateStatus(selectedApt.id, 'Confirmed')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Check size={16} />
                    <span>Approve Payment & Confirm Appointment</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedApt.id, 'Rejected')}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <X size={16} />
                    <span>Reject Payment</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center text-slate-400 space-y-2">
              <FileText size={48} className="mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-600">Select an appointment from the left to manage.</p>
            </div>
          )}
        </div>
      </div>
      </>
      )}

      {/* TAB 2: Registered Student Users View */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Search Filter Bar for Users */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search registered student by name, email, city, or phone..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>
            <div className="text-xs text-slate-500 font-bold">
              Total Logged & Registered Accounts: <span className="text-slate-900 font-black">{registeredUsers.length}</span>
            </div>
          </div>

          {/* Registered Users Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Email Address</th>
                    <th className="py-3.5 px-4">Phone / City</th>
                    <th className="py-3.5 px-4">Education</th>
                    <th className="py-3.5 px-4">Registration Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400 font-bold">
                        No registered student accounts matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u, idx) => (
                      <tr key={u.uid || u.email || idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black shrink-0">
                            {u.name ? u.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <span>{u.name || 'Student Account'}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                          {u.email}
                        </td>
                        <td className="py-3.5 px-4">
                          <div>{u.phone || 'N/A'}</div>
                          <div className="text-[10px] text-slate-400 font-bold">{u.city || 'Pakistan'}</div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {u.educationLevel || 'High School / FSc'}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                          {u.registeredAt || 'Active Session'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {viewImageModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setViewImageModal(null)}
              className="absolute -top-12 right-0 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all cursor-pointer"
            >
              <X size={24} />
            </button>
            <img
              src={viewImageModal}
              alt="Full Payment Proof Receipt"
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <p className="text-white text-xs font-semibold mt-3">
              Uploaded Student Payment Proof Screenshot / Receipt
            </p>
          </div>
        </div>
      )}

      {/* Add New Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-6 my-8"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                  Admin Control
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-1">
                  Add New Manual Booking
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateNewBooking} className="space-y-4">
              {addError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-bold">
                  {addError}
                </div>
              )}
              {addSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold">
                  {addSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ali Hassan"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="0300-1234567"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Islamabad"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={newPreferredDate}
                    onChange={(e) => setNewPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={newPreferredTime}
                    onChange={(e) => setNewPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Purpose / Notes</label>
                <input
                  type="text"
                  placeholder="e.g.FAST Entry test guidance"
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending Payment Review">Pending Payment Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transaction ID</label>
                  <input
                    type="text"
                    value={newTransactionId}
                    onChange={(e) => setNewTransactionId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Meet Link (Optional)</label>
                <input
                  type="text"
                  placeholder="https://meet.google.com/xyz-abc-def"
                  value={newMeetLink}
                  onChange={(e) => setNewMeetLink(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-extrabold"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
