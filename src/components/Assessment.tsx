import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ArrowLeft, RotateCcw, Download, Copy, Check, 
  User, MapPin, GraduationCap, Award, HelpCircle, CheckCircle2, 
  Brain, FileText, Share2, Compass, AlertCircle, Building2, Lightbulb, MessageSquare, Mail
} from 'lucide-react';
import jsPDF from 'jspdf';
import { db, collection, addDoc, doc as firestoreDoc, setDoc, serverTimestamp, auth } from '../services/firebase';
import { DEGREES } from '../data';
import { Degree } from '../types';
import { getLogoDataUrl } from '../utils/logoHelper';
import { LogoImage } from './LogoImage';

export interface StudentInfo {
  fullName: string;
  email: string;
  city: string;
  province: string;
  educationLevel: string;
  academicPercentage: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Academic Background",
    subtitle: "Which academic background best describes you?",
    options: [
      {
        id: 'A',
        label: "FSc Pre-Engineering",
        description: "I studied Mathematics, Physics and Chemistry and enjoy technical or engineering subjects."
      },
      {
        id: 'B',
        label: "FSc Pre-Medical",
        description: "I studied Biology, Chemistry and Physics and am interested in health, science or biology-related fields."
      },
      {
        id: 'C',
        label: "ICS / Computer Science",
        description: "I studied computer science and/or mathematics and am interested in technology and computing."
      },
      {
        id: 'D',
        label: "I.Com / Commerce",
        description: "I am interested in accounting, finance, business and commerce."
      },
      {
        id: 'E',
        label: "Humanities / Arts / A-Levels",
        description: "I am more interested in humanities, communication, social sciences, creative subjects or related areas."
      }
    ]
  },
  {
    id: 2,
    title: "Academic Performance",
    subtitle: "What is your approximate current academic percentage?",
    options: [
      {
        id: 'A',
        label: "80% or above",
        description: "Strong academic performance and potentially competitive for many universities and scholarships."
      },
      {
        id: 'B',
        label: "70% to 79%",
        description: "Good academic performance with many degree and university options."
      },
      {
        id: 'C',
        label: "60% to 69%",
        description: "Moderate academic performance. Degree selection and entry requirements should be considered carefully."
      },
      {
        id: 'D',
        label: "Below 60%",
        description: "I may need flexible admission routes, skill-based education, diplomas, foundation programs or suitable universities."
      }
    ]
  },
  {
    id: 3,
    title: "Main Interest and Strength",
    subtitle: "Which area interests you the most?",
    options: [
      {
        id: 'A',
        label: "Coding, Logic, AI and Technology",
        description: "I enjoy computers, programming, problem-solving, software and artificial intelligence."
      },
      {
        id: 'B',
        label: "Medicine, Biology and Healthcare",
        description: "I enjoy biology, health sciences, patient care and medical subjects."
      },
      {
        id: 'C',
        label: "Mathematics, Physics and Engineering",
        description: "I enjoy mathematics, physics, machines, electronics, construction or technical problem-solving."
      },
      {
        id: 'D',
        label: "Business, Finance and Entrepreneurship",
        description: "I enjoy business ideas, money management, leadership, marketing and entrepreneurship."
      },
      {
        id: 'E',
        label: "UI/UX, Graphic Design and Digital Media",
        description: "I enjoy creativity, visual design, websites, videos, graphics and digital content."
      },
      {
        id: 'F',
        label: "Law, Social Impact and Policy",
        description: "I enjoy communication, society, law, public policy, leadership and helping communities."
      },
      {
        id: 'G',
        label: "Environment and Natural Sciences",
        description: "I am interested in nature, environment, agriculture, climate and scientific research."
      }
    ]
  },
  {
    id: 4,
    title: "Preferred Work Environment",
    subtitle: "Where would you feel most comfortable working?",
    options: [
      {
        id: 'A',
        label: "Laptop / Desk / Remote Work",
        description: "I prefer computers, software offices, remote work or flexible digital careers."
      },
      {
        id: 'B',
        label: "Hospital / Clinic / Laboratory",
        description: "I prefer healthcare, medical environments, laboratories or direct patient-related work."
      },
      {
        id: 'C',
        label: "Engineering / Industrial / Field Environment",
        description: "I prefer construction sites, machines, factories, engineering projects or outdoor fieldwork."
      },
      {
        id: 'D',
        label: "Corporate Office / Business Environment",
        description: "I prefer meetings, clients, management, finance, sales or business environments."
      },
      {
        id: 'E',
        label: "Creative Studio / Digital Environment",
        description: "I prefer design, media, content, branding or creative technology environments."
      }
    ]
  },
  {
    id: 5,
    title: "Career Priority",
    subtitle: "What is your most important career goal?",
    options: [
      {
        id: 'A',
        label: "High earning potential",
        description: "I want a career with strong earning potential."
      },
      {
        id: 'B',
        label: "Remote jobs and freelancing",
        description: "I want flexibility and the possibility of earning online or internationally."
      },
      {
        id: 'C',
        label: "Study or work abroad",
        description: "I want a career that can provide opportunities for international education or employment."
      },
      {
        id: 'D',
        label: "Build my own company",
        description: "I want to become an entrepreneur or build a startup/business."
      },
      {
        id: 'E',
        label: "Social impact",
        description: "I want my career to help people or improve society."
      },
      {
        id: 'F',
        label: "Job stability",
        description: "I prefer a stable and predictable career path."
      }
    ]
  },
  {
    id: 6,
    title: "Mathematics and Logical Thinking",
    subtitle: "How comfortable are you with mathematics and logical problem-solving?",
    options: [
      {
        id: 'A',
        label: "Advanced Math & Logic",
        description: "I love advanced mathematics, statistics and complex logic."
      },
      {
        id: 'B',
        label: "Practical Mathematics",
        description: "I am comfortable with basic or practical mathematics."
      },
      {
        id: 'C',
        label: "Learn If Necessary",
        description: "I can learn mathematics if necessary, but I do not prefer it."
      },
      {
        id: 'D',
        label: "Minimal Math Preferred",
        description: "I strongly prefer careers with little mathematics."
      }
    ]
  },
  {
    id: 7,
    title: "Technology and AI",
    subtitle: "How interested are you in using or building technology?",
    options: [
      {
        id: 'A',
        label: "Build AI & Software",
        description: "I want to build AI models, software, cloud systems and technical products."
      },
      {
        id: 'B',
        label: "Apply AI in Business/Design",
        description: "I want to use AI and digital tools in business, education, design or other fields."
      },
      {
        id: 'C',
        label: "Basic Technology Usage",
        description: "I am interested in basic technology but do not want a highly technical career."
      },
      {
        id: 'D',
        label: "Non-Technical Focus",
        description: "I prefer biological, medical, social or non-technical fields."
      }
    ]
  },
  {
    id: 8,
    title: "Degree Duration",
    subtitle: "What type of education path do you prefer?",
    options: [
      {
        id: 'A',
        label: "Short course / diploma / skill-based training",
        description: "I want to start learning practical skills quickly."
      },
      {
        id: 'B',
        label: "Standard 4-year BS degree",
        description: "I want a traditional undergraduate university degree."
      },
      {
        id: 'C',
        label: "Professional 5-year degree",
        description: "I am interested in careers such as MBBS, BDS, DPT, Pharm-D or similar professional programs."
      },
      {
        id: 'D',
        label: "I am not sure yet",
        description: "I am open to exploring different durations."
      }
    ]
  },
  {
    id: 9,
    title: "Goal After Graduation",
    subtitle: "What would you most likely want to do immediately after graduation?",
    options: [
      {
        id: 'A',
        label: "Get a job in Pakistan",
        description: "Direct entry into the domestic job market."
      },
      {
        id: 'B',
        label: "Work remotely or freelance internationally",
        description: "Global client work and remote technology/creative positions."
      },
      {
        id: 'C',
        label: "Apply for a Master's degree abroad",
        description: "Higher education scholarships and international universities."
      },
      {
        id: 'D',
        label: "Start my own company or business",
        description: "Entrepreneurship, tech startups, or agency ownership."
      },
      {
        id: 'E',
        label: "Prepare for CSS / civil services / government employment",
        description: "Public sector leadership and civil services examinations."
      },
      {
        id: 'F',
        label: "Continue into research or higher education",
        description: "Academia, scientific research, or specialized PhD tracks."
      }
    ]
  },
  {
    id: 10,
    title: "University Location",
    subtitle: "Where are you willing to study?",
    options: [
      {
        id: 'A',
        label: "In my current city",
        description: "I prefer local universities close to home."
      },
      {
        id: 'B',
        label: "Major Pakistani Cities",
        description: "I can relocate to major Pakistani cities such as Karachi, Lahore or Islamabad."
      },
      {
        id: 'C',
        label: "Anywhere in Pakistan",
        description: "I am flexible to move to any top university campus nationwide."
      },
      {
        id: 'D',
        label: "Universities Abroad",
        description: "I want to apply directly to universities abroad."
      },
      {
        id: 'E',
        label: "Both Pakistan and Abroad",
        description: "Open to both top domestic institutions and international options."
      }
    ]
  },
  {
    id: 11,
    title: "University Budget",
    subtitle: "What is your preferred university funding situation?",
    options: [
      {
        id: 'A',
        label: "Public / Government University",
        description: "I prefer affordable merit-based public tuition."
      },
      {
        id: 'B',
        label: "Private University",
        description: "I can consider higher tuition if the university is a good fit."
      },
      {
        id: 'C',
        label: "Scholarship-Dependent",
        description: "I need financial assistance or a fully/partially funded opportunity."
      },
      {
        id: 'D',
        label: "I am not sure yet",
        description: "Exploring all financial options."
      }
    ]
  },
  {
    id: 12,
    title: "Work Style",
    subtitle: "Which type of work sounds most attractive to you?",
    options: [
      {
        id: 'A',
        label: "Solving technical problems independently",
        description: "I enjoy programming, analysis, systems and technical problem-solving."
      },
      {
        id: 'B',
        label: "Leading teams and managing business",
        description: "I enjoy leadership, communication, strategy and entrepreneurship."
      },
      {
        id: 'C',
        label: "Helping people directly",
        description: "I enjoy healthcare, counseling, education or other people-focused work."
      },
      {
        id: 'D',
        label: "Designing and creating",
        description: "I enjoy graphics, UI/UX, content, media and creative work."
      },
      {
        id: 'E',
        label: "Researching and discovering",
        description: "I enjoy scientific research, experiments, analysis and learning."
      }
    ]
  }
];

const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa (KPK)',
  'Balochistan',
  'Islamabad Capital Territory (ICT)',
  'Gilgit-Baltistan',
  'Azad Jammu & Kashmir (AJK)'
];

const EDUCATION_LEVELS = [
  'FSc Pre-Engineering',
  'FSc Pre-Medical',
  'ICS / Computer Science',
  'I.Com / Commerce',
  'Humanities / Arts',
  'A-Levels',
  'Other'
];

const ACADEMIC_PERCENTAGES = [
  '80% or above',
  '70% to 79%',
  '60% to 69%',
  'Below 60%'
];

interface AssessmentProps {
  user?: { uid?: string; name: string; email: string; phone?: string; city?: string } | null;
  onBackToMain?: () => void;
  onSelectDegree?: (degree: Degree) => void;
  onOpenChatWithPrompt?: (promptText: string) => void;
}

const getUserStorageKey = (u: { uid?: string; email?: string } | null | undefined, prefix: string) => {
  if (!u) return `dreampath_guest_${prefix}`;
  const id = u.uid || (u.email ? u.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'user');
  return `dreampath_user_${id}_${prefix}`;
};

export default function Assessment({ user, onBackToMain, onSelectDegree, onOpenChatWithPrompt }: AssessmentProps) {
  const getUserDefaultInfo = (u: typeof user): StudentInfo => ({
    fullName: u?.name || '',
    email: u?.email || '',
    city: u?.city || '',
    province: 'Sindh',
    educationLevel: 'ICS / Computer Science',
    academicPercentage: '70% to 79%'
  });

  const loadUserData = (u: typeof user) => {
    try {
      const stepKey = getUserStorageKey(u, 'step');
      const infoKey = getUserStorageKey(u, 'info');
      const ansKey = getUserStorageKey(u, 'answers');

      const savedStep = localStorage.getItem(stepKey);
      const parsedStep = savedStep ? parseInt(savedStep, 10) : 0;

      const savedInfo = localStorage.getItem(infoKey);
      const defaultInfo = getUserDefaultInfo(u);
      const parsedInfo: StudentInfo = savedInfo ? { ...defaultInfo, ...JSON.parse(savedInfo) } : defaultInfo;
      
      // Keep student name, email, city populated from active user if empty
      if (u?.name && !parsedInfo.fullName) parsedInfo.fullName = u.name;
      if (u?.email && !parsedInfo.email) parsedInfo.email = u.email;
      if (u?.city && !parsedInfo.city) parsedInfo.city = u.city;

      const savedAns = localStorage.getItem(ansKey);
      const parsedAns = savedAns ? JSON.parse(savedAns) : {};

      return {
        step: isNaN(parsedStep) ? 0 : parsedStep,
        info: parsedInfo,
        answers: parsedAns
      };
    } catch {
      return {
        step: 0,
        info: getUserDefaultInfo(u),
        answers: {}
      };
    }
  };

  const initialData = loadUserData(user);
  const [currentStep, setCurrentStep] = useState<number>(initialData.step);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(initialData.info);
  const [answers, setAnswers] = useState<Record<number, string>>(initialData.answers);

  const [validationError, setValidationError] = useState<string>('');
  const [showRestartModal, setShowRestartModal] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [emailStatusMessage, setEmailStatusMessage] = useState<string>('');

  // Clean legacy global unsynced keys on mount so old shared assessment data never leaks
  useEffect(() => {
    try {
      localStorage.removeItem('dreampath_assessment_step');
      localStorage.removeItem('dreampath_student_info');
      localStorage.removeItem('dreampath_assessment_answers');
    } catch {}
  }, []);

  // Sync state whenever the active user changes (switching account or login/logout)
  const prevUserKeyRef = React.useRef<string>(getUserStorageKey(user, 'key'));
  useEffect(() => {
    const newUserKey = getUserStorageKey(user, 'key');
    if (prevUserKeyRef.current !== newUserKey) {
      prevUserKeyRef.current = newUserKey;
      const data = loadUserData(user);
      setCurrentStep(data.step);
      setStudentInfo(data.info);
      setAnswers(data.answers);
      setValidationError('');
      setShowRestartModal(false);
    }
  }, [user]);

  // Sync state to User-Scoped LocalStorage
  useEffect(() => {
    try {
      const stepKey = getUserStorageKey(user, 'step');
      const infoKey = getUserStorageKey(user, 'info');
      const ansKey = getUserStorageKey(user, 'answers');

      localStorage.setItem(stepKey, currentStep.toString());
      localStorage.setItem(infoKey, JSON.stringify(studentInfo));
      localStorage.setItem(ansKey, JSON.stringify(answers));
    } catch (e) {
      console.error('Failed to store assessment progress', e);
    }
  }, [user, currentStep, studentInfo, answers]);

  const handleStudentInfoChange = (field: keyof StudentInfo, value: string) => {
    setStudentInfo(prev => ({ ...prev, [field]: value }));
    if (validationError) setValidationError('');
  };

  const handleSelectAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    if (validationError) setValidationError('');
  };

  const handleNextStep = () => {
    if (currentStep === 0) {
      // Validate student info
      if (!studentInfo.fullName.trim()) {
        setValidationError('Please enter your full name to proceed.');
        return;
      }
      if (!studentInfo.city.trim()) {
        setValidationError('Please enter your city.');
        return;
      }
      setValidationError('');
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep >= 1 && currentStep <= 12) {
      if (!answers[currentStep]) {
        setValidationError('Please select an option to continue.');
        return;
      }
      setValidationError('');
      const next = currentStep + 1;
      setCurrentStep(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setValidationError('');
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Start a fresh new assessment test for the current user
  const handleStartNewAssessment = () => {
    const stepKey = getUserStorageKey(user, 'step');
    const infoKey = getUserStorageKey(user, 'info');
    const ansKey = getUserStorageKey(user, 'answers');

    try {
      localStorage.removeItem(stepKey);
      localStorage.removeItem(infoKey);
      localStorage.removeItem(ansKey);
    } catch {}

    setAnswers({});
    setCurrentStep(0);
    setStudentInfo(getUserDefaultInfo(user));
    setValidationError('');
    setShowRestartModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic to calculate top recommendations
  const getTopMatches = (): Degree[] => {
    let scores: Record<string, number> = {};
    DEGREES.forEach(deg => { scores[deg.id] = 0; });

    const q1 = answers[1]; // Background
    const q3 = answers[3]; // Main interest
    const q4 = answers[4]; // Work env
    const q7 = answers[7]; // Tech & AI

    // Q1 Background weight
    if (q1 === 'A') { scores['bs-cs'] += 2; scores['bs-se'] += 2; scores['bs-ai'] += 2; }
    if (q1 === 'B') { scores['mbbs'] += 3; scores['bds'] += 3; scores['dpt'] += 3; }
    if (q1 === 'C') { scores['bs-cs'] += 4; scores['bs-se'] += 4; scores['bs-ai'] += 4; scores['bs-ds'] += 4; }
    if (q1 === 'D') { scores['bba'] += 4; scores['bs-fintech'] += 4; }
    if (q1 === 'E') { scores['llb'] += 3; scores['bs-uiux'] += 3; scores['bba'] += 2; }

    // Q3 Main Interest
    if (q3 === 'A') { scores['bs-cs'] += 5; scores['bs-se'] += 5; scores['bs-ai'] += 5; scores['bs-ds'] += 5; }
    if (q3 === 'B') { scores['mbbs'] += 5; scores['bds'] += 5; scores['dpt'] += 5; }
    if (q3 === 'C') { scores['bs-cs'] += 2; scores['bs-se'] += 2; }
    if (q3 === 'D') { scores['bba'] += 5; scores['bs-fintech'] += 5; }
    if (q3 === 'E') { scores['bs-uiux'] += 5; }
    if (q3 === 'F') { scores['llb'] += 5; }

    // Q4 Work Env
    if (q4 === 'A') { scores['bs-cs'] += 3; scores['bs-se'] += 3; scores['bs-uiux'] += 3; }
    if (q4 === 'B') { scores['mbbs'] += 3; scores['bds'] += 3; }
    if (q4 === 'D') { scores['bba'] += 3; scores['bs-fintech'] += 3; }

    // Sort DEGREES by scores
    const sorted = [...DEGREES].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));
    return sorted.slice(0, 3);
  };

  const generateAIPrompt = (): string => {
    const qSummary = ASSESSMENT_QUESTIONS.map(q => {
      const selectedOptId = answers[q.id];
      const selectedOpt = q.options.find(o => o.id === selectedOptId);
      return `- ${q.title}: ${selectedOpt ? selectedOpt.label + ' (' + selectedOpt.description + ')' : 'Not answered'}`;
    }).join('\n');

    return `Assalam-o-Alaikum Dreampath AI! Here is my completed 12-question Career Self-Assessment profile:

STUDENT PROFILE:
- Name: ${studentInfo.fullName}
- City: ${studentInfo.city}, ${studentInfo.province}
- Current Education: ${studentInfo.educationLevel}
- Academic Percentage: ${studentInfo.academicPercentage}

ASSESSMENT ANSWERS:
${qSummary}

Based on my background, goals, and answers, please provide:
1. Detailed analysis of my top 3 recommended career pathways in Pakistan.
2. Recommended entrance tests (e.g., NUST NET, FAST NUCES, MDCAT, ECAT, LAT) and key preparation timeline for 2026/2027.
3. Top public and private universities suited for my city/province and budget.
4. Actionable next steps for the next 6 months to build high-demand skills.`;
  };

  const handleCopyPrompt = () => {
    const promptText = generateAIPrompt();
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  const handleSendSummaryEmail = async () => {
    const targetEmail = studentInfo.email || (user?.email);
    if (!targetEmail || !targetEmail.includes('@')) {
      setValidationError('Please provide a valid email address in your student info before sending.');
      return;
    }
    setValidationError('');
    setIsSendingEmail(true);
    setEmailStatusMessage('');
    try {
      const topMatches = getTopMatches();
      const res = await fetch('/api/send-assessment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          studentInfo,
          topMatches
        })
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatusMessage(`Summary email successfully sent to ${targetEmail}!`);
      } else {
        setEmailStatusMessage(data.error || 'Failed to send summary email.');
      }
    } catch (err: any) {
      setEmailStatusMessage('Network error while sending email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    let logoDataUrl: string | null = null;
    try {
      logoDataUrl = await getLogoDataUrl();
    } catch {
      logoDataUrl = null;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const topMatches = getTopMatches();
      const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
      const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
      const margin = 14;
      const contentWidth = pageWidth - (margin * 2);
      const printableBottom = pageHeight - 18;

      let currentPage = 1;

      // Header & Running Footer helper
      const addHeaderAndFooter = (pageNum: number) => {
        // Watermark
        try {
          doc.saveGraphicsState();
          if (typeof (doc as any).setGState === 'function') {
            (doc as any).setGState(new (doc as any).GState({ opacity: 0.07 }));
          }
          doc.setTextColor(15, 23, 42);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(38);
          doc.text('DREAM PATHWAY', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
          doc.restoreGraphicsState();
        } catch {}

        // Top Header
        doc.setFillColor(15, 23, 42); // Navy Slate 900
        doc.rect(0, 0, pageWidth, 16, 'F');
        doc.setFillColor(37, 99, 235); // Blue 600 line accent
        doc.rect(0, 15.2, pageWidth, 0.8, 'F');

        if (logoDataUrl) {
          try {
            doc.addImage(logoDataUrl, 'PNG', margin, 2.5, 11, 11);
          } catch {}
        }

        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('DREAM PATHWAY AI — CAREER ASSESSMENT REPORT', logoDataUrl ? margin + 14 : margin, 10.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(203, 213, 225);
        doc.text('2026 Student Guidance Edition', pageWidth - margin, 10.5, { align: 'right' });

        // Bottom Footer
        doc.setFillColor(248, 250, 252);
        doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.line(0, pageHeight - 14, pageWidth, pageHeight - 14);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text('Dream Pathway Career Guidance System | Founder: Muhammad Khan Khuharo', margin, pageHeight - 6);
        doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
      };

      // PAGE 1: Start
      addHeaderAndFooter(currentPage);

      let yPos = 24;

      // Title Card
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(margin, yPos, contentWidth, 22, 2.5, 2.5, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('CAREER SELF-ASSESSMENT REPORT', margin + 6, yPos + 8.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(56, 189, 248);
      doc.text('Tailored Academic Pathways & Degree Fit Analysis for Students in Pakistan', margin + 6, yPos + 15.5);

      yPos += 26;

      // Student Profile Card
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, yPos, contentWidth, 28, 2.5, 2.5, 'FD');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`Student: ${studentInfo.fullName}`, margin + 5, yPos + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`Location: ${studentInfo.city}, ${studentInfo.province}`, margin + 5, yPos + 14);
      doc.text(`Education Level: ${studentInfo.educationLevel}`, margin + 5, yPos + 21);

      doc.text(`Academic Marks: ${studentInfo.academicPercentage}`, margin + 95, yPos + 14);
      if (studentInfo.email) {
        doc.text(`Email: ${studentInfo.email}`, margin + 95, yPos + 21);
      }

      yPos += 34;

      // Section: Top Recommended Pathways
      if (yPos > printableBottom - 35) {
        doc.addPage();
        currentPage++;
        addHeaderAndFooter(currentPage);
        yPos = 24;
      }

      doc.setFillColor(241, 245, 249);
      doc.rect(margin, yPos, contentWidth, 7, 'F');
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, yPos, 3.5, 7, 'F');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('TOP RECOMMENDED DEGREE & CAREER PATHWAYS', margin + 6, yPos + 5);

      yPos += 11;

      topMatches.forEach((deg, idx) => {
        if (yPos > printableBottom - 24) {
          doc.addPage();
          currentPage++;
          addHeaderAndFooter(currentPage);
          yPos = 24;
        }

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(79, 70, 229);
        doc.text(`#${idx + 1}  ${deg.title} (${deg.category})`, margin + 5, yPos + 6);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59); // Slate 800 for high contrast
        const startingSal = deg.salaryTable?.[0] ? `${deg.salaryTable[0].level}: ${deg.salaryTable[0].salary}` : 'High Demand';
        doc.text(`Duration: ${deg.duration}  |  Domain: ${deg.domain}`, margin + 5, yPos + 11.5);
        doc.text(`Category: ${deg.category}  |  Starting Salary: ${startingSal}`, margin + 5, yPos + 16.5);

        yPos += 23;
      });

      yPos += 3;

      // Section: 12-Question Breakdown
      if (yPos > printableBottom - 30) {
        doc.addPage();
        currentPage++;
        addHeaderAndFooter(currentPage);
        yPos = 24;
      }

      doc.setFillColor(241, 245, 249);
      doc.rect(margin, yPos, contentWidth, 7, 'F');
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, yPos, 3.5, 7, 'F');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('12-QUESTION SELF-ASSESSMENT RESPONSES', margin + 6, yPos + 5);

      yPos += 11;

      ASSESSMENT_QUESTIONS.forEach((q) => {
        const selectedOptId = answers[q.id];
        const selectedOpt = q.options.find(o => o.id === selectedOptId);
        const ansText = selectedOpt ? `${selectedOpt.label} — ${selectedOpt.description || ''}` : 'Not answered';

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        const splitAnswer = doc.splitTextToSize(ansText, contentWidth - 14);
        const itemBlockHeight = 5 + (splitAnswer.length * 4.3) + 3;

        if (yPos + itemBlockHeight > printableBottom) {
          doc.addPage();
          currentPage++;
          addHeaderAndFooter(currentPage);
          yPos = 24;
        }

        // Question Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`Q${q.id}.  ${q.title}:`, margin + 2, yPos + 4);

        // Answer Text (Line-by-line render)
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 41, 59); // Slate 800
        for (let li = 0; li < splitAnswer.length; li++) {
          doc.text(splitAnswer[li], margin + 8, yPos + 8.5 + (li * 4.3));
        }

        yPos += itemBlockHeight;
      });

      // Save report
      const pdfBase64Data = doc.output('datauristring');

      try {
        const currentUserId = auth.currentUser?.uid || user?.uid || '';
        const userEmail = auth.currentUser?.email || user?.email || studentInfo.email || '';
        const assessmentRecord = {
          studentName: studentInfo.fullName,
          studentEmail: userEmail,
          city: studentInfo.city,
          province: studentInfo.province,
          educationLevel: studentInfo.educationLevel,
          academicPercentage: studentInfo.academicPercentage,
          answers,
          topRecommendations: topMatches.map(m => ({ id: m.id, title: m.title, domain: m.domain, category: m.category })),
          reportBase64: pdfBase64Data,
          userId: currentUserId,
          createdAt: serverTimestamp()
        };

        await addDoc(collection(db, 'self_assessment'), assessmentRecord);

        if (currentUserId) {
          await setDoc(firestoreDoc(db, 'users', currentUserId), {
            latestSelfAssessment: {
              completedAt: serverTimestamp(),
              topMatches: topMatches.slice(0, 3).map(m => m.title),
              studentInfo
            }
          }, { merge: true });
        }
      } catch (saveErr) {
        console.warn('Firestore self_assessment record note:', saveErr);
      }

      doc.save(`Dreampath_AI_Report_${studentInfo.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Calculate Progress Percentage
  const progressPercent = currentStep === 0 ? 0 : Math.round((currentStep / 12) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 relative">
      {/* Top Utility / Action Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          {onBackToMain && (
            <button
              onClick={onBackToMain}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
          {user && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-700 text-xs font-semibold">
              <User size={13} className="text-indigo-600" />
              <span>Assessment for: <strong className="text-slate-900 font-extrabold">{user.name || user.email}</strong></span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentStep > 0) {
                setShowRestartModal(true);
              } else {
                handleStartNewAssessment();
              }
            }}
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-900 border border-indigo-200/90 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            title="Start a new assessment test"
          >
            <RotateCcw size={14} className="text-indigo-600" />
            <span>New Assessment Test</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <div className="flex justify-center mb-4">
          <LogoImage className="h-20 md:h-24 w-auto object-contain" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-600 font-extrabold text-xs uppercase tracking-widest mb-4 shadow-xs">
          <Sparkles size={14} className="text-indigo-500 animate-spin" /> Career Self-Assessment System
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-display mb-3">
          DREAMPATH <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">AI</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
          Answer 12 simple questions to discover the degree and career paths that may fit you best.
        </p>
      </motion.div>

      {/* Progress Card (When on Question steps 1..12) */}
      {currentStep >= 1 && currentStep <= 12 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-4 md:p-5 mb-8 shadow-xs relative overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600 font-black text-xs">
                Question {currentStep} of 12
              </span>
              <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                {ASSESSMENT_QUESTIONS[currentStep - 1]?.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-indigo-600 tracking-wider">
                [{'█'.repeat(Math.floor((currentStep / 12) * 8))}{'░'.repeat(8 - Math.floor((currentStep / 12) * 8))}] {currentStep}/12 ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* Validation Error Alert */}
      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-3 shadow-xs"
        >
          <AlertCircle size={18} className="text-rose-500 shrink-0" />
          <span>{validationError}</span>
        </motion.div>
      )}

      {/* STEP 0: Student Information Collection */}
      {currentStep === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xl shadow-indigo-600/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500" />

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <User size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">Student Profile Information</h2>
              <p className="text-xs text-slate-400 font-medium">Please provide your academic background to help us tailor recommendations.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Muhammad Ali"
                value={studentInfo.fullName}
                onChange={(e) => handleStudentInfoChange('fullName', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-medium"
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="e.g. student@example.com"
                value={studentInfo.email}
                onChange={(e) => handleStudentInfoChange('email', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-medium"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Karachi, Lahore, Islamabad, Quetta, Sukkur"
                value={studentInfo.city}
                onChange={(e) => handleStudentInfoChange('city', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-medium"
              />
            </div>

            {/* Province */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Province <span className="text-rose-500">*</span>
              </label>
              <select
                value={studentInfo.province}
                onChange={(e) => handleStudentInfoChange('province', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-medium"
              >
                {PROVINCES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Current Education Level */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Current Education Level <span className="text-rose-500">*</span>
              </label>
              <select
                value={studentInfo.educationLevel}
                onChange={(e) => handleStudentInfoChange('educationLevel', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-medium"
              >
                {EDUCATION_LEVELS.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            {/* Academic Percentage */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                Academic Percentage <span className="text-rose-500">*</span>
              </label>
              <select
                value={studentInfo.academicPercentage}
                onChange={(e) => handleStudentInfoChange('academicPercentage', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-medium"
              >
                {ACADEMIC_PERCENTAGES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end items-center pt-4 border-t border-slate-100">
            <button
              onClick={handleNextStep}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/15 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
            >
              Start 12-Question Assessment <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEPS 1..12: Individual Assessment Questions */}
      {currentStep >= 1 && currentStep <= 12 && (
        <AnimatePresence mode="wait">
          {(() => {
            const question = ASSESSMENT_QUESTIONS[currentStep - 1];
            if (!question) return null;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xl shadow-indigo-600/5 relative overflow-hidden"
              >
                <div className="mb-8">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest block mb-1">
                    QUESTION {question.id} OF 12
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display mb-2">
                    {question.title}
                  </h2>
                  <p className="text-slate-500 text-base md:text-lg font-medium">
                    "{question.subtitle}"
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-3.5 mb-10">
                  {question.options.map((opt) => {
                    const isSelected = answers[question.id] === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectAnswer(question.id, opt.id)}
                        className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all flex items-start gap-4 group relative overflow-hidden ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-500 text-slate-900 ring-2 ring-indigo-500/20 shadow-sm'
                            : 'bg-slate-50/50 hover:bg-white border-slate-200/80 text-slate-700 hover:border-indigo-200 hover:shadow-xs'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-500 group-hover:border-indigo-300 group-hover:text-indigo-600'
                        }`}>
                          {opt.id}
                        </div>

                        <div className="flex-1 pr-4">
                          <h3 className={`font-bold text-base leading-snug mb-1 ${
                            isSelected ? 'text-indigo-950 font-extrabold' : 'text-slate-800'
                          }`}>
                            {opt.label}
                          </h3>
                          {opt.description && (
                            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                              {opt.description}
                            </p>
                          )}
                        </div>

                        <div className="self-center shrink-0">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <Check size={14} className="stroke-[3]" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation Controls */}
                <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-slate-600 disabled:hover:border-slate-200"
                  >
                    <ArrowLeft size={16} /> Previous
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/15 transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
                  >
                    {currentStep === 12 ? (
                      <>🎯 Complete My Assessment</>
                    ) : (
                      <>Next Question <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      )}

      {/* STEP 13: Results Summary & Action Hub */}
      {currentStep > 12 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Main Title Badge */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-indigo-500/20 text-center">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 font-extrabold text-xs uppercase tracking-widest mb-6">
              <Sparkles size={14} className="text-teal-400 animate-spin" /> Assessment Complete
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-display mb-3 tracking-tight">
              🎉 Your Dreampath AI Profile Is Ready
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
              Your 12-question career self-assessment has been completed and analyzed.
            </p>
          </div>

          {/* Student Profile Overview Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
              <User size={16} /> Student Information Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs font-medium">
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Name</span>
                <span className="text-slate-800 font-extrabold text-sm">{studentInfo.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Location</span>
                <span className="text-slate-800 font-bold">{studentInfo.city}, {studentInfo.province}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Education</span>
                <span className="text-slate-800 font-bold">{studentInfo.educationLevel}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Academic Marks</span>
                <span className="text-indigo-600 font-extrabold">{studentInfo.academicPercentage}</span>
              </div>
            </div>
          </div>

          {/* Top Matches Recommendation Grid */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-teal-600 block">
                  ALGORITHM RESULTS
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 font-display">
                  Top Matched Career Pathways
                </h3>
              </div>
              <Compass size={24} className="text-indigo-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {getTopMatches().map((deg, idx) => (
                <div
                  key={deg.id}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-300 transition-all hover:shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-black text-[10px] uppercase">
                        #{idx + 1} Recommendation
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                        {deg.domain}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                      {deg.title}
                    </h4>

                    <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">
                      {deg.summary}
                    </p>

                    <div className="space-y-1.5 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-200/60 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span>{deg.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="text-indigo-600 font-bold">{deg.category}</span>
                      </div>
                    </div>
                  </div>

                  {onSelectDegree && (
                    <button
                      onClick={() => onSelectDegree(deg)}
                      className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-xl font-bold text-xs transition-all"
                    >
                      View Blueprint
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Action Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Download Official Report */}
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="p-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-2xl shadow-lg shadow-indigo-600/15 font-black text-sm flex items-center justify-center gap-3 transition-all border border-indigo-400/20 disabled:opacity-50"
            >
              <Download size={18} />
              <span>{isGeneratingPDF ? 'Generating PDF...' : '1. Download Report'}</span>
            </button>

            {/* 2. Send Summary Email */}
            <button
              onClick={handleSendSummaryEmail}
              disabled={isSendingEmail}
              className="p-5 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-600 hover:to-teal-500 text-white rounded-2xl shadow-lg shadow-blue-600/15 font-black text-sm flex items-center justify-center gap-3 transition-all border border-blue-400/20 disabled:opacity-50"
            >
              <Mail size={18} />
              <span>{isSendingEmail ? 'Sending Email...' : '2. Email Summary'}</span>
            </button>

            {/* 3. Copy AI Prompt */}
            <button
              onClick={handleCopyPrompt}
              className="p-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-lg font-black text-sm flex items-center justify-center gap-3 transition-all border border-slate-700"
            >
              {copiedPrompt ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              <span>{copiedPrompt ? 'Copied Prompt!' : '3. Copy AI Prompt'}</span>
            </button>

            {/* 4. Start New Assessment Test */}
            <button
              onClick={() => setShowRestartModal(true)}
              className="p-5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-2xl shadow-lg shadow-teal-600/15 font-black text-sm flex items-center justify-center gap-3 transition-all border border-teal-400/20"
            >
              <RotateCcw size={18} />
              <span>4. New Test</span>
            </button>
          </div>

          {/* Email Status Message Banner */}
          {emailStatusMessage && (
            <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs ${emailStatusMessage.includes('successfully') ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'}`}>
              <Mail size={16} />
              <span>{emailStatusMessage}</span>
            </div>
          )}

          {/* Continue with AI Integration Option */}
          {onOpenChatWithPrompt && (
            <div className="bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-purple-500/10 border border-teal-200 rounded-3xl p-6 text-center flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h4 className="font-black text-slate-900 text-lg flex items-center gap-2">
                  <Brain className="text-teal-600" size={20} /> Continue with AI Career Assistant
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Ask follow-up questions about admissions, MDCAT/NET test dates, fee structures, and scholarship options.
                </p>
              </div>

              <button
                onClick={() => onOpenChatWithPrompt(generateAIPrompt())}
                className="shrink-0 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare size={16} /> Continue with AI
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Start New Assessment Test Confirmation Modal */}
      <AnimatePresence>
        {showRestartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center relative overflow-hidden"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100 shadow-xs">
                <RotateCcw size={26} />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-display mb-2">
                Start New Assessment Test?
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">
                Starting a new assessment will clear your current answers and let you start a fresh 12-question career evaluation for your profile.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowRestartModal(false)}
                  className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleStartNewAssessment}
                  className="w-1/2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} /> Yes, Start New
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
