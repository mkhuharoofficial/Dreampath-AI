import { DEGREES } from '../data';
import { Degree, DomainType } from '../types';
import { StudentCareerContext } from '../services/geminiService';

function getUserStorageKey(u: { uid?: string; email?: string } | null | undefined, prefix: string): string {
  if (!u) return `dreampath_guest_${prefix}`;
  const id = u.uid || (u.email ? u.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'user');
  return `dreampath_user_${id}_${prefix}`;
}

function inferDomainFromAnswers(answers: Record<number, string>): string | undefined {
  const q3 = answers[3];
  const q1 = answers[1];

  if (q3 === 'A') return DomainType.TECHNOLOGY;
  if (q3 === 'B') return DomainType.HEALTH;
  if (q3 === 'C') return DomainType.ENGINEERING;
  if (q3 === 'D') return DomainType.BUSINESS;
  if (q3 === 'E') return DomainType.ARTS;
  if (q3 === 'F') return DomainType.LAW;
  if (q3 === 'G') return DomainType.NATURAL_SCIENCES;

  if (q1 === 'A') return DomainType.ENGINEERING;
  if (q1 === 'B') return DomainType.HEALTH;
  if (q1 === 'C') return DomainType.TECHNOLOGY;
  if (q1 === 'D') return DomainType.BUSINESS;
  if (q1 === 'E') return DomainType.SOCIAL_SCIENCES;

  return undefined;
}

function describeCareerStage(
  screen: string | undefined,
  assessmentStep: number,
  answeredCount: number,
  selectedDegree: Degree | null | undefined,
  hasCounselingBooking: boolean
): string {
  if (screen === 'degree' && selectedDegree) {
    return `Inspecting Degree Blueprint: ${selectedDegree.title} (${selectedDegree.domain})`;
  }
  if (screen === 'assessment') {
    if (assessmentStep >= 13) return 'Completed 12-Question Self-Assessment (Reviewing Results)';
    if (assessmentStep >= 1) return `In-Progress Self-Assessment (Question ${assessmentStep} of 12, ${answeredCount} answered)`;
    return 'Starting Self-Assessment (Entering Academic Profile)';
  }
  if (screen === 'appointment') {
    return hasCounselingBooking
      ? '1-to-1 Career Counseling (Session Submitted / Pending Verification)'
      : 'Booking 1-to-1 Career Counseling Session';
  }
  if (screen === 'bridge') return 'Onboarding Career Transition Guide';
  if (screen === 'guide') return 'Reading Full Pakistan Higher Education Career Guide';
  if (screen === 'blog') return 'Reading Career & Admission Articles';
  if (screen === 'dashboard') {
    return assessmentStep >= 13
      ? 'Exploring Career Dashboard (Post-Assessment)'
      : 'Exploring Career Domains & Degree Blueprints on Dashboard';
  }
  return 'Exploring Dreampath AI Platform';
}

export function buildStudentCareerContext(params: {
  user: { uid?: string; name: string; email: string; phone?: string; city?: string } | null;
  currentScreen?: string;
  currentContext: string;
  selectedDegree?: Degree | null;
  favoriteIds?: string[];
}): StudentCareerContext {
  const { user, currentScreen, currentContext, selectedDegree, favoriteIds = [] } = params;

  let assessmentStep = 0;
  let answeredCount = 0;
  let studentInfo: Record<string, string> = {};
  let answers: Record<number, string> = {};

  try {
    const savedStep = localStorage.getItem(getUserStorageKey(user, 'step'));
    if (savedStep) {
      const parsed = parseInt(savedStep, 10);
      if (!isNaN(parsed)) assessmentStep = parsed;
    }

    const savedInfo = localStorage.getItem(getUserStorageKey(user, 'info'));
    if (savedInfo) {
      studentInfo = JSON.parse(savedInfo) || {};
    }

    const savedAns = localStorage.getItem(getUserStorageKey(user, 'answers'));
    if (savedAns) {
      answers = JSON.parse(savedAns) || {};
      answeredCount = Object.keys(answers).length;
    }
  } catch {
    // ignore storage parse issues
  }

  let hasCounselingBooking = false;
  let counselingStatus: string | undefined;
  let counselingSlot: string | undefined;

  try {
    if (user?.email || user?.uid) {
      const rawCounseling = localStorage.getItem('dreampath_counseling_sessions');
      const rawApts = localStorage.getItem('dreampath_appointments');
      const list = [
        ...(rawCounseling ? JSON.parse(rawCounseling) : []),
        ...(rawApts ? JSON.parse(rawApts) : []),
      ];
      const userMatch = list.find((item: any) =>
        (item?.studentEmail && user.email && item.studentEmail.toLowerCase() === user.email.toLowerCase()) ||
        (item?.email && user.email && item.email.toLowerCase() === user.email.toLowerCase()) ||
        (item?.userId && user.uid && item.userId === user.uid)
      );
      if (userMatch) {
        hasCounselingBooking = true;
        counselingStatus = userMatch.status || 'pending_verification';
        if (userMatch.preferredDate && userMatch.preferredTime) {
          counselingSlot = `${userMatch.preferredDate} at ${userMatch.preferredTime}`;
        }
      }
    }
  } catch {
    // ignore storage parse issues
  }

  const favoriteDegrees = favoriteIds
    .map((id) => DEGREES.find((d) => d.id === id))
    .filter((d): d is Degree => Boolean(d))
    .slice(0, 6)
    .map((d) => `${d.title} (${d.domain})`);

  const assessmentCompleted = assessmentStep >= 13 || answeredCount >= 12;
  const targetDomain = inferDomainFromAnswers(answers);
  const preferredTrack =
    answers[8] === 'A'
      ? 'Short Skill Courses / Fast-Track Practical Programs'
      : answers[8]
        ? 'Full Undergraduate Degree Track'
        : undefined;

  const careerStage = describeCareerStage(
    currentScreen,
    assessmentStep,
    answeredCount,
    selectedDegree,
    hasCounselingBooking
  );

  return {
    studentName: studentInfo.fullName || user?.name || undefined,
    city: studentInfo.city || user?.city || undefined,
    province: studentInfo.province || undefined,
    educationLevel: studentInfo.educationLevel || undefined,
    academicPercentage: studentInfo.academicPercentage || undefined,
    careerStage,
    currentScreen: currentScreen || 'unknown',
    pageDescription: currentContext,
    assessmentProgress: {
      step: assessmentStep,
      answeredCount,
      totalQuestions: 12,
      completed: assessmentCompleted,
      targetDomain,
      preferredTrack,
    },
    selectedDegree: selectedDegree
      ? {
          id: selectedDegree.id,
          title: selectedDegree.title,
          domain: selectedDegree.domain,
          category: selectedDegree.category,
          duration: selectedDegree.duration,
          summary: selectedDegree.summary,
          universities: selectedDegree.universities?.slice(0, 6) || [],
          salaryBenchmarks: (selectedDegree.salaryTable || []).map((s) => `${s.level}: ${s.salary}`),
          keySkills: selectedDegree.skills?.slice(0, 6) || [],
        }
      : undefined,
    savedDegrees: favoriteDegrees,
    counselingBooking: hasCounselingBooking
      ? {
          booked: true,
          status: counselingStatus,
          slot: counselingSlot,
        }
      : undefined,
  };
}
