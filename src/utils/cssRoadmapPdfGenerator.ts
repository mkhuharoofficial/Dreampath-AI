import { jsPDF } from 'jspdf';
import { getLogoDataUrl } from './logoHelper';

/**
 * Generates the official 10-page CSS Roadmap Handbook PDF ("CSS ROADMAP — From MPT to Final Allocation")
 * with professional layout, high contrast styling, watermarks, running headers/footers, and detailed roadmap breakdown.
 */
export const generateCssRoadmapPDF = async (): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2); // 182mm

  let logoDataUrl: string | null = null;
  try {
    logoDataUrl = await getLogoDataUrl();
  } catch {
    logoDataUrl = null;
  }

  const addHeaderFooter = (pageNum: number, pageTitle: string) => {
    // Watermark
    try {
      doc.saveGraphicsState();
      doc.setTextColor(241, 245, 249);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(36);
      doc.text('DREAMPATH AI - CSS ROADMAP', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
      doc.restoreGraphicsState();
    } catch {
      // safe fallback
    }

    // Top Header
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 15, 'F');
    doc.setFillColor(220, 38, 38); // red-600 accent for CSS
    doc.rect(0, 14.2, pageWidth, 0.8, 'F');

    if (logoDataUrl) {
      try {
        doc.addImage(logoDataUrl, 'PNG', margin, 2, 11, 11);
      } catch {
        // ignored
      }
    }

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('CSS ROADMAP — From MPT to Final Allocation', logoDataUrl ? margin + 14 : margin, 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    doc.text(pageTitle, pageWidth - margin, 10, { align: 'right' });

    // Bottom Footer
    doc.setFillColor(248, 250, 252);
    doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(0, pageHeight - 14, pageWidth, pageHeight - 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('Dreampath AI Career Guidance System | Founder: Muhammad Khan Khuharo', margin, pageHeight - 6);
    doc.text(`Page ${pageNum} of 10`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: COVER & WHAT IS CSS
  // ==========================================
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(127, 29, 29); // red-900 top banner
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setFillColor(239, 68, 68); // red-500 accent stripe
  doc.rect(0, 40, pageWidth, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('CSS ROADMAP — From MPT to Final Allocation', margin, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(254, 202, 202);
  doc.text('THE ULTIMATE BEGINNER-TO-OFFICER GUIDE', pageWidth - margin, 20, { align: 'right' });

  // What is CSS Box
  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(239, 68, 68);
  doc.roundedRect(margin, 52, contentWidth, 38, 2, 2, 'FD');

  doc.setTextColor(239, 68, 68);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('What is CSS?', margin + 6, 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text('CSS (Central Superior Services) is Pakistan\'s most prestigious competitive examination, conducted by the', margin + 6, 70);
  doc.text('Federal Public Service Commission (FPSC). Through CSS, candidates are recruited into top federal services.', margin + 6, 77);

  // Federal Services
  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(51, 65, 85);
  doc.roundedRect(margin, 96, contentWidth, 54, 2, 2, 'FD');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Federal Services You Can Join Through CSS:', margin + 6, 106);

  const services = [
    '• Pakistan Administrative Service (PAS)',
    '• Police Service of Pakistan (PSP)',
    '• Foreign Service of Pakistan (FSP)',
    '• Inland Revenue Service (IRS)',
    '• Customs Service',
    '• Audit & Accounts',
    '• Information Service',
    '• Commerce & Trade',
    '• Postal Group, Railways, and more'
  ];

  let servY = 114;
  services.forEach((srv, idx) => {
    const col = idx >= 5 ? 1 : 0;
    const row = idx >= 5 ? idx - 5 : idx;
    const x = margin + 6 + (col * 90);
    const y = servY + (row * 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(226, 232, 240);
    doc.text(srv, x, y);
  });

  // Quote Box
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, 156, contentWidth, 16, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('"CSS is not just an exam. It is a complete career transformation process."', margin + 6, 166);

  // The Complete CSS Journey
  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(239, 68, 68);
  doc.roundedRect(margin, 178, contentWidth, 75, 2, 2, 'FD');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('The Complete CSS Journey', margin + 6, 188);

  const journeySteps = [
    '1. MPT (MCQ-Based Preliminary Test)',
    '2. Written Examination (1200 Marks)',
    '3. Medical Examination',
    '4. Psychological Assessment',
    '5. Viva Voce / Interview (300 Marks)',
    '6. Final Merit List & Allocation',
    '7. Training at CSA Academy Lahore'
  ];

  let jY = 196;
  journeySteps.forEach((step) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text(`• ${step}`, margin + 8, jY);
    jY += 7;
  });

  // Page 1 footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('CSS Roadmap Guide 2026 | Dreampath AI', margin, pageHeight - 8);
  doc.text('Page 1 of 10', pageWidth - margin, pageHeight - 8, { align: 'right' });


  // ==========================================
  // PAGE 2: STEP 1 - CSS MPT
  // ==========================================
  doc.addPage();
  addHeaderFooter(2, 'Step 1 - CSS MPT Screening Test');

  let curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Step 1 - CSS MPT (MCQ-Based Preliminary Screening Test)', margin + 4, curY + 8);

  curY += 18;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, curY, contentWidth, 14, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('⚠️ Purpose: MPT is only a screening test. Its marks are NOT counted in the final merit.', margin + 4, curY + 9);

  curY += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Key Facts About MPT', margin, curY);

  curY += 6;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, curY, contentWidth, 34, 2, 2, 'F');
  const mptFacts = [
    '• MCQ-based paper conducted before the written examination',
    '• Mandatory to qualify before appearing in the main written exam',
    '• Around 200 MCQs in 3 hours duration',
    '• No negative marking in MPT',
    '• Passing marks approximately 33% (varies slightly by year)'
  ];
  let fY = curY + 7;
  mptFacts.forEach(fact => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(fact, margin + 6, fY);
    fY += 6;
  });

  curY += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Main Areas Covered in MPT', margin, curY);

  curY += 6;
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(margin, curY, contentWidth, 52, 2, 2, 'F');
  const mptAreas = [
    '• English (Vocabulary, Grammar, Comprehension)',
    '• Pakistan Affairs & Islamic Studies',
    '• Current Affairs (National & International)',
    '• Everyday Science & Basic Mathematics',
    '• Logical Reasoning & Analytical Ability',
    '• Urdu (Grammar, Vocabulary & Translation)'
  ];
  let aY = curY + 8;
  mptAreas.forEach(area => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(area, margin + 6, aY);
    aY += 7;
  });

  curY += 60;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('"MPT is easier than written CSS. The real competition starts afterward."', margin + 6, curY + 10);


  // ==========================================
  // PAGE 3: STEP 2 - CSS WRITTEN EXAM
  // ==========================================
  doc.addPage();
  addHeaderFooter(3, 'Step 2 - CSS Written Examination');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Step 2 - CSS Written Examination (Total Marks: 1200)', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Compulsory Subjects (600 Marks total)', margin, curY);

  curY += 6;
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, curY, contentWidth, 34, 2, 2, 'FD');
  const comps = [
    '1. English Essay (100 Marks)',
    '2. English Precis & Composition (100 Marks)',
    '3. General Science & Ability (100 Marks)',
    '4. Current Affairs (100 Marks) | 5. Pakistan Affairs (100 Marks)',
    '6. Islamiat or Comparative Religion (100 Marks)'
  ];
  let cY = curY + 7;
  comps.forEach(c => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(22, 101, 52);
    doc.text(c, margin + 6, cY);
    cY += 6;
  });

  curY += 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Optional Subjects (600 Marks total)', margin, curY);

  curY += 6;
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, curY, contentWidth, 20, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(49, 46, 129);
  doc.text('Candidates choose subjects according to FPSC-approved groups (Groups 1 to 7),', margin + 6, curY + 8);
  doc.text('selecting 100 or 200 marks subjects to total exactly 600 marks based on strength.', margin + 6, curY + 14);

  curY += 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Passing Criteria & Failure Points', margin, curY);

  curY += 6;
  doc.setFillColor(254, 226, 226);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, curY, contentWidth, 44, 2, 2, 'FD');
  const failurePoints = [
    '• Passing Criteria: 40% in compulsory subjects, 33% in optional subjects, 50% overall aggregate (600/1200).',
    '• Essay & Precis Failure: Over 70-80% candidates fail in English Essay or Precis due to poor grammar & structure.',
    '• Time Management: Writing 3,000+ words of coherent analytical answers under strict 3-hour exam pressure.',
    '• Lack of Depth: Relying on surface-level cramming instead of deep critical analysis and international perspective.'
  ];
  let fzY = curY + 7;
  failurePoints.forEach(fp => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(153, 27, 27);
    doc.text(fp, margin + 6, fzY);
    fzY += 8;
  });


  // ==========================================
  // PAGE 4: MOST IMPORTANT CSS SKILLS
  // ==========================================
  doc.addPage();
  addHeaderFooter(4, 'Most Important CSS Skills');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Most Important CSS Skills (CSS is NOT a Rote-Learning Exam)', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text('CSS does not reward memorization. FPSC is testing how you think, argue, and communicate — not just what you know.', margin, curY);

  curY += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('What FPSC Actually Checks', margin, curY);

  curY += 6;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, curY, contentWidth, 42, 2, 2, 'F');
  const fpscChecks = [
    '• Analytical thinking & problem dissection',
    '• Structured argument building with factual evidence',
    '• Exceptional writing quality, vocabulary & coherence',
    '• National & international socio-economic awareness',
    '• Administrative decision-making ability under pressure',
    '• Personality, composure & confidence'
  ];
  let chY = curY + 7;
  fpscChecks.forEach(ch => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(ch, margin + 6, chY);
    chY += 6.5;
  });

  curY += 50;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('How to Build These Skills', margin, curY);

  curY += 6;
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(margin, curY, contentWidth, 42, 2, 2, 'F');
  const howToBuild = [
    '• Read reputable editorials (Dawn, Economist) daily to absorb structured arguments',
    '• Practice timed essay & precis writing every single week with rigorous peer review',
    '• Discuss current affairs actively in study circles rather than just reading passively',
    '• Take mock interviews and panel discussions to build composure',
    '• Study answer-writing presentation techniques (headings, outlines, maps, data points)'
  ];
  let hbY = curY + 7;
  howToBuild.forEach(hb => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(hb, margin + 6, hbY);
    hbY += 6.5;
  });

  curY += 50;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('"Success in CSS comes from consistent practice of thinking and writing — not last-minute cramming."', margin + 6, curY + 10);


  // ==========================================
  // PAGE 5: BEST DEGREE CHOICES FOR CSS
  // ==========================================
  doc.addPage();
  addHeaderFooter(5, 'Best Degree Choices for CSS Aspirants');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Best Degree Choices for CSS Aspirants', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Top Undergraduate Degrees That Feed Into CSS:', margin, curY);

  curY += 6;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'F');
  const topDegs = [
    '1. BS Political Science (Government, Constitution, IR)',
    '2. BS International Relations (Global Diplomacy & Geopolitics)',
    '3. BS Economics (Macroeconomics, Public Finance & Planning)',
    '4. BS Public Administration (Governance & Bureaucracy)',
    '5. BS Law / LLB (Constitutional Law, Jurisprudence & Criminal Justice)',
    '6. BS Criminology & Sociology (Social structures, Policing & Reforms)'
  ];
  let tdY = curY + 7;
  topDegs.forEach(td => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(td, margin + 6, tdY);
    tdY += 6.5;
  });

  curY += 46;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Best Degree Match for Each CSS Occupational Group', margin, curY);

  curY += 6;
  const tableHeaders = ['CSS Occupational Area', 'Recommended Undergraduate Degrees'];
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, curY, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(tableHeaders[0], margin + 4, curY + 5.5);
  doc.text(tableHeaders[1], margin + 65, curY + 5.5);

  const groupRows = [
    ['PAS / District Management', 'Political Science, Public Administration, Economics'],
    ['Foreign Service (FSP)', 'International Relations, English Literature, Political Science'],
    ['Police Service (PSP)', 'Any degree works — confidence, physical fitness & personality matter most'],
    ['IRS / Customs Service', 'Economics, Commerce, Accounting & Finance'],
    ['Information Group', 'Mass Communication, English, International Relations'],
    ['Audit & Accounts', 'Accounting, Finance, Economics, Mathematics']
  ];

  let rY = curY + 8;
  groupRows.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, rY, contentWidth, 10, 'FD');
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, rY + 10, margin + contentWidth, rY + 10);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(row[0], margin + 4, rY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(row[1], margin + 65, rY + 6.5);

    rY += 10;
  });


  // ==========================================
  // PAGE 6: CSS EXAM TIMELINE & ANNUAL CYCLE
  // ==========================================
  doc.addPage();
  addHeaderFooter(6, 'CSS Exam Timeline & Annual Cycle');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('CSS Exam Timeline (Annual Cycle at a Glance)', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('Plan your preparation around these fixed annual FPSC milestones:', margin, curY);

  curY += 8;
  const timelineEvents = [
    { month: 'August', desc: 'MPT (Preliminary Test) applications open on FPSC website' },
    { month: 'October / November', desc: 'MPT Screening Test conducted nationwide' },
    { month: 'December', desc: 'Written examination detailed applications open for qualified candidates' },
    { month: 'February', desc: 'Main CSS Written Examination starts across major cities' },
    { month: 'After 6-8 Months', desc: 'Written exam results announced by FPSC' },
    { month: 'Subsequent Months', desc: 'Medical Examination, Psychological Assessment, and Viva Voce' },
    { month: 'Final Stage', desc: 'Final Merit List compilation and Occupational Group Allocation' }
  ];

  let tY = curY;
  timelineEvents.forEach(ev => {
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, tY, contentWidth, 12, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(185, 28, 28);
    doc.text(ev.month, margin + 4, tY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(ev.desc, margin + 50, tY + 7.5);

    tY += 15;
  });

  tY += 4;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, tY, contentWidth, 16, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.text('"CSS preparation is a marathon, not a sprint. Start early, and each month has a clear purpose."', margin + 6, tY + 10);


  // ==========================================
  // PAGE 7: STEP 3 - PSYCHOLOGICAL ASSESSMENT
  // ==========================================
  doc.addPage();
  addHeaderFooter(7, 'Step 3 - Psychological Assessment');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Step 3 — Psychological Assessment (The Most Underestimated Phase)', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('What This Phase Checks', margin, curY);

  curY += 6;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, curY, contentWidth, 32, 2, 2, 'F');
  const psychChecks = [
    '• Core Personality Traits & Emotional Stability',
    '• Leadership Potential & Command Presence',
    '• Communication, Empathy & Interpersonal Skill',
    '• Decision-Making Under Stress & Group Behavior'
  ];
  let pY = curY + 7;
  psychChecks.forEach(pc => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(pc, margin + 6, pY);
    pY += 6.5;
  });

  curY += 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Activities Included in Psychological Assessment', margin, curY);

  curY += 6;
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(margin, curY, contentWidth, 32, 2, 2, 'F');
  const activities = [
    '• Group Discussions (GD) & Interactive Tasks',
    '• Command Tasks & Outdoor Problem Solving',
    '• Story Writing (TAT) & Sentence Completion Tests',
    '• Comprehensive In-depth Psychological Interview'
  ];
  let actY = curY + 7;
  activities.forEach(act => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(act, margin + 6, actY);
    actY += 6.5;
  });

  curY += 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('How to Prepare & Succeed', margin, curY);

  curY += 6;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'F');
  const psychTips = [
    '• Practice speaking clearly and confidently in group settings without dominating',
    '• Stay calm and composed under observation — assessors watch behavior, not just answers',
    '• Be genuine rather than rehearsed; consistency across all tests matters most',
    '• Work on active listening and respectful disagreement during group tasks'
  ];
  let ptY = curY + 7;
  psychTips.forEach(pt => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(22, 101, 52);
    doc.text(pt, margin + 6, ptY);
    ptY += 7;
  });

  curY += 46;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('"It is not about being the loudest in the room — it is about being the most balanced and mature."', margin + 6, curY + 10);


  // ==========================================
  // PAGE 8: STEP 4 - VIVA VOCE / INTERVIEW
  // ==========================================
  doc.addPage();
  addHeaderFooter(8, 'Step 4 - Viva Voce / Interview');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Step 4 — Viva Voce / Interview (Total Marks: 300)', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('What the FPSC Panel Checks', margin, curY);

  curY += 6;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, curY, contentWidth, 34, 2, 2, 'F');
  const panelChecks = [
    '• Confidence, Poise & Articulation',
    '• General Knowledge, National & International Awareness',
    '• Opinions, Balance, Objectivity & Emotional Maturity',
    '• Personality, Integrity & Suitability for Civil Service'
  ];
  let pcY = curY + 7;
  panelChecks.forEach(pc => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(pc, margin + 6, pcY);
    pcY += 6.5;
  });

  curY += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Common Areas Covered', margin, curY);

  curY += 6;
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(margin, curY, contentWidth, 34, 2, 2, 'F');
  const commonAreas = [
    '• Degree Subjects & Academic Background (Deep technical grilling)',
    '• Current Affairs, Foreign Policy & National Economy',
    '• Pakistan Affairs, History & Constitutional Framework',
    '• Optional Subjects & Personal Background'
  ];
  let caY = curY + 7;
  commonAreas.forEach(ca => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(ca, margin + 6, caY);
    caY += 6.5;
  });

  curY += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Preparation Tips for Viva', margin, curY);

  curY += 6;
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'F');
  const vivaTips = [
    '• Know your degree and optional subjects deeply — panel often starts from your background',
    '• Stay updated on daily national and international current affairs',
    '• Practice mock interviews to reduce nervousness and improve articulation',
    '• Form balanced, well-reasoned opinions rather than aggressive or one-sided views'
  ];
  let vtY = curY + 7;
  vivaTips.forEach(vt => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(22, 101, 52);
    doc.text(vt, margin + 6, vtY);
    vtY += 7;
  });

  curY += 46;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('"The viva is a conversation, not an interrogation. Panels test how you think under pressure."', margin + 6, curY + 10);


  // ==========================================
  // PAGE 9: FINAL MERIT & ALLOCATION
  // ==========================================
  doc.addPage();
  addHeaderFooter(9, 'Final Merit & Allocation');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Final Merit Formula & Occupational Group Allocation', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Final Merit Calculation', margin, curY);

  curY += 6;
  const meritRows = [
    ['Written Examination', '1200 Marks'],
    ['Viva Voce (Interview)', '300 Marks'],
    ['Total Final Merit', 'Written Marks + Viva Marks (1500 Total)']
  ];

  doc.setFillColor(15, 23, 42);
  doc.rect(margin, curY, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Examination Component', margin + 4, curY + 5.5);
  doc.text('Maximum Weightage', margin + 110, curY + 5.5);

  let mY = curY + 8;
  meritRows.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, mY, contentWidth, 9, 'FD');
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, mY + 9, margin + contentWidth, mY + 9);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(row[0], margin + 4, mY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(row[1], margin + 110, mY + 6);

    mY += 9;
  });

  mY += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Allocation Depends On:', margin, mY);

  mY += 6;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, mY, contentWidth, 28, 2, 2, 'F');
  const allocFactors = [
    '• Overall Merit Number (Rank in Pakistan)',
    '• Provincial / Regional Quota allocation rules',
    '• Group Preferences submitted by the candidate',
    '• Vacancies available in each service that year'
  ];
  let afY = mY + 6;
  allocFactors.forEach(af => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(af, margin + 6, afY);
    afY += 5.5;
  });

  mY += 34;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, mY, contentWidth, 16, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.text('"Passing CSS does not equal getting your top group. High merit is required for PAS, PSP, and FSP."', margin + 6, mY + 10);


  // ==========================================
  // PAGE 10: AFTER CSS & TRAINING
  // ==========================================
  doc.addPage();
  addHeaderFooter(10, 'After CSS — Training & Career');

  curY = 24;
  doc.setFillColor(185, 28, 28);
  doc.rect(margin, curY, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('After CSS — Training at Civil Services Academy (CSA) Lahore', margin + 4, curY + 8);

  curY += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Foundational & Specialized Training', margin, curY);

  curY += 6;
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, curY, contentWidth, 42, 2, 2, 'FD');
  const trainingPoints = [
    '• Common Training Program (CTP): Selected officers undergo joint foundational training at Civil Services Academy (CSA) Lahore, building camaraderie, leadership & administrative ethics.',
    '• Specialized Training Program (STP): Officers move to their respective departmental academies (e.g., National Police Academy, Foreign Service Academy, Directorate General Training)',
    '• Field Attachments & Postings: Hands-on district administration and federal postings as Assistant Commissioners or Assistant Superintendent of Police.'
  ];
  let trY = curY + 7;
  trainingPoints.forEach(tp => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(22, 101, 52);
    doc.text(tp, margin + 6, trY);
    trY += 11;
  });

  curY += 52;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(220, 38, 38);
  doc.roundedRect(margin, curY, contentWidth, 38, 3, 3, 'FD');

  doc.setTextColor(56, 189, 248);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Founder\'s Message to Aspirants:', margin + 6, curY + 10);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('"Every officer serving Pakistan today once sat exactly where you are now — uncertain, but willing', margin + 6, curY + 20);
  doc.text('to begin. Start today, stay consistent, and let the rigorous process transform you into a leader."', margin + 6, curY + 27);

  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('— Muhammad Khan Khuharo (Founder, Dreampath AI)', margin + 6, curY + 34);

  // Save the 10-page PDF
  doc.save('Dreampath_AI_CSS_Roadmap_Handbook.pdf');
};
