import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Share2, Info, BookOpen, TrendingUp, 
  MapPin, DollarSign, HelpCircle, AlertCircle, Target, 
  Calendar, CheckCircle2, Factory, Briefcase, Check, Bookmark, MessageCircle,
  Printer, Building2, Search, Award, ExternalLink, Compass
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { LOGO_BASE64 } from '../assets/logoBase64';
import { getLogoDataUrl } from '../utils/logoHelper';
import { Degree } from '../types';
import { LogoImage } from './LogoImage';

interface DegreeBlueprintProps {
  degree: Degree;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

interface ParsedUniversity {
  name: string;
  city: string;
  province: string;
  type: 'Public' | 'Private';
  testRequired: string;
}

const parseUniversityDetails = (uniName: string): ParsedUniversity => {
  const lower = uniName.toLowerCase();
  let city = 'Islamabad';
  let province = 'Federal / Punjab';
  let type: 'Public' | 'Private' = 'Public';
  let testRequired = 'Entry Test / NTS';

  if (lower.includes('lahore') || lower.includes('lums') || lower.includes('uet') || lower.includes('fast-nu') || lower.includes('comsats') && lower.includes('lahore') || lower.includes('gcu') || lower.includes('pucit') || lower.includes('lse') || lower.includes('fc college')) {
    city = 'Lahore';
    province = 'Punjab';
  } else if (lower.includes('karachi') || lower.includes('iba') || lower.includes('nust') && lower.includes('karachi') || lower.includes('ned') || lower.includes('aku') || lower.includes('szabist') || lower.includes('dawood')) {
    city = 'Karachi';
    province = 'Sindh';
  } else if (lower.includes('islamabad') || lower.includes('nust') || lower.includes('pieas') || lower.includes('quia') || lower.includes('iiu') || lower.includes('comsats') && !lower.includes('lahore')) {
    city = 'Islamabad';
    province = 'Federal (ICT)';
  } else if (lower.includes('peshawar') || lower.includes('uett') || lower.includes('imt') || lower.includes('giki') || lower.includes('swabi') || lower.includes('iqra') && lower.includes('peshawar')) {
    city = lower.includes('giki') ? 'Topi (Swabi)' : 'Peshawar';
    province = 'Khyber Pakhtunkhwa';
  } else if (lower.includes('faisalabad') || lower.includes('uaf') || lower.includes('ntu')) {
    city = 'Faisalabad';
    province = 'Punjab';
  } else if (lower.includes('jamshoro') || lower.includes('muet') || lower.includes('sindh') || lower.includes('liaquat')) {
    city = 'Jamshoro / Hyderabad';
    province = 'Sindh';
  } else if (lower.includes('quetta') || lower.includes('bzu') || lower.includes('balochistan')) {
    city = 'Quetta / Multan';
    province = 'Balochistan / Punjab';
  }

  if (lower.includes('lums') || lower.includes('aga khan') || lower.includes('giki') || lower.includes('fast') || lower.includes('iba') || lower.includes('lse') || lower.includes('iqra') || lower.includes('szabist') || lower.includes('superior') || lower.includes('university of lahore')) {
    type = 'Private';
  } else {
    type = 'Public';
  }

  if (lower.includes('medical') || lower.includes('mbbs') || lower.includes('health') || lower.includes('dental')) {
    testRequired = 'MDCAT Mandatory';
  } else if (lower.includes('engineering') || lower.includes('uet') || lower.includes('nust') || lower.includes('pieas') || lower.includes('giki') || lower.includes('ned')) {
    testRequired = 'ECAT / NET / GAT';
  } else if (lower.includes('business') || lower.includes('iba') || lower.includes('lums') || lower.includes('lse')) {
    testRequired = 'SAT / IBA Test / Nu-Test';
  } else {
    testRequired = 'HEC / University Entry Test';
  }

  return { name: uniName, city, province, type, testRequired };
};

export default function DegreeBlueprint({ degree, onBack, isFavorite, onToggleFavorite }: DegreeBlueprintProps) {
  const [copied, setCopied] = useState(false);
  const [selectedUniRegion, setSelectedUniRegion] = useState<string>('All');
  const [searchUni, setSearchUni] = useState<string>('');

  const parsedUniversities = degree.universities.map(parseUniversityDetails);
  const filteredUniversities = parsedUniversities.filter(u => {
    const matchesRegion = selectedUniRegion === 'All' || u.city.toLowerCase().includes(selectedUniRegion.toLowerCase()) || u.province.toLowerCase().includes(selectedUniRegion.toLowerCase());
    const matchesSearch = searchUni === '' || u.name.toLowerCase().includes(searchUni.toLowerCase()) || u.city.toLowerCase().includes(searchUni.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#degree=${degree.id}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy share link: ', err);
          fallbackCopyTextToClipboard(shareUrl);
        });
    } else {
      fallbackCopyTextToClipboard(shareUrl);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback: Couldn\'t copy text', err);
    }
    document.body.removeChild(textArea);
  };

  const handleWhatsAppShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#degree=${degree.id}`;
    const message = `Check out this 2026 Career Roadmap & Blueprint for *${degree.title}* on Dreampath! 🚀\n\nExplore subjects, salaries, job market realities, and top institutes here: ${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPDF = async () => {
    let logoData = LOGO_BASE64;
    try {
      const fetchedLogo = await getLogoDataUrl();
      if (fetchedLogo) logoData = fetchedLogo;
    } catch (e) {
      console.warn('Using fallback base64 logo');
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
    const printableBottom = pageHeight - 18;
    
    // Draw page borders, headers, footers and subtle watermark
    const drawPageBorders = (pageNum: number) => {
      const centerX = pageWidth / 2;
      const centerY = pageHeight / 2;

      // Centered transparent watermark
      try {
        if (typeof (doc as any).saveGraphicsState === 'function') {
          (doc as any).saveGraphicsState();
        }
        if (typeof (doc as any).setGState === 'function') {
          (doc as any).setGState(new (doc as any).GState({ opacity: 0.08 }));
        }
        
        const logoWMSize = 85;
        doc.addImage(
          logoData, 
          logoData.startsWith('data:image/svg') ? 'SVG' : 'PNG', 
          centerX - (logoWMSize / 2), 
          centerY - (logoWMSize / 2) - 10, 
          logoWMSize, 
          logoWMSize
        );

        if (typeof (doc as any).restoreGraphicsState === 'function') {
          (doc as any).restoreGraphicsState();
        }
      } catch (err) {
        console.warn('PDF watermark render fallback:', err);
      }

      // Top Running Header
      doc.setFillColor(15, 23, 42); // Slate 900
      doc.rect(0, 0, pageWidth, 15, 'F');
      doc.setFillColor(37, 99, 235); // Blue 600 line accent
      doc.rect(0, 14.2, pageWidth, 0.8, 'F');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text('DREAMPATH AI — 2026 CAREER BLUEPRINT', 15, 9.5);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(203, 213, 225);
      doc.text(`PAGE ${pageNum}`, pageWidth - 15, 9.5, { align: 'right' });
      
      // Bottom Footer
      doc.setFillColor(248, 250, 252);
      doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(0, pageHeight - 14, pageWidth, pageHeight - 14);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text('Founded by Muhammad Khan Khuharo | Dreampath AI Career Guidance Platform', 15, pageHeight - 6);
      doc.text('dreampath.ai', pageWidth - 15, pageHeight - 6, { align: 'right' });
    };

    let currentPageNum = 1;
    drawPageBorders(currentPageNum);
    
    let y = 22;

    const checkSpace = (neededHeight: number) => {
      if (y + neededHeight > printableBottom) {
        doc.addPage();
        currentPageNum++;
        drawPageBorders(currentPageNum);
        y = 22;
      }
    };

    // --- 1. COVER / HEADER SECTION ---
    const summaryText = `"${degree.summary}"`;
    const summaryLines = doc.splitTextToSize(summaryText, pageWidth - 72);
    const headerHeight = Math.max(50, 36 + (summaryLines.length * 4.4));

    doc.setFillColor(15, 23, 42); // Slate 900
    doc.roundedRect(15, y, pageWidth - 30, headerHeight, 3, 3, 'F');
    
    // Top Right Logo Image
    try {
      const topLogoW = 24;
      const topLogoH = 24;
      doc.addImage(logoData, 'PNG', pageWidth - 20 - topLogoW, y + 6, topLogoW, topLogoH);
    } catch (e) {
      console.warn('Cover header logo render:', e);
    }

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    const titleLines = doc.splitTextToSize(degree.title.toUpperCase(), pageWidth - 75);
    doc.text(titleLines[0], 22, y + 11);
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(56, 189, 248); // Cyan 400
    doc.text(`${degree.domain.toUpperCase()} DOMAIN  |  ${degree.duration.toUpperCase()} PROGRAM`, 22, y + 18);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(226, 232, 240); // Slate 200
    for (let li = 0; li < summaryLines.length; li++) {
      doc.text(summaryLines[li], 22, y + 25 + (li * 4.2));
    }

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Dreampath AI Guidance Edition • Muhammad Khan Khuharo', 22, y + headerHeight - 4);
    
    y += headerHeight + 8;

    // Helper for Section Headers
    const addSectionHeader = (title: string) => {
      checkSpace(18);
      doc.setFillColor(241, 245, 249);
      doc.rect(15, y, pageWidth - 30, 6.5, 'F');

      doc.setFillColor(37, 99, 235);
      doc.rect(15, y, 3.5, 6.5, 'F');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42); // Slate 900
      doc.text(title.toUpperCase(), 22, y + 4.5);
      
      y += 9.5;
    };

    // --- 2. WHAT IS THIS FIELD ---
    addSectionHeader('What is this Field?');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59); // Slate 800
    
    degree.description.forEach((desc) => {
      const wrappedDesc = doc.splitTextToSize(`•  ${desc}`, pageWidth - 34);
      const height = (wrappedDesc.length * 4.3) + 2;
      checkSpace(height);
      for (let li = 0; li < wrappedDesc.length; li++) {
        doc.text(wrappedDesc[li], 16, y + 3.2 + (li * 4.3));
      }
      y += height;
    });
    
    y += 3;

    // --- 3. CORE SUBJECTS & COMPETENCIES ---
    addSectionHeader('Core Subjects & Key Skills');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    
    let colWidth = (pageWidth - 34) / 2;
    for (let i = 0; i < degree.subjects.length; i += 2) {
      checkSpace(8);
      const sub1 = degree.subjects[i];
      const sub2 = degree.subjects[i + 1] || '';
      
      const wrappedSub1 = doc.splitTextToSize(sub1, colWidth - 10);
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, colWidth - 2, 7, 'F');
      doc.setTextColor(79, 70, 229);
      doc.setFont('Helvetica', 'bold');
      doc.text(`[ ]  ${wrappedSub1[0]}`, 18, y + 4.5);
      
      if (sub2) {
        const wrappedSub2 = doc.splitTextToSize(sub2, colWidth - 10);
        doc.setFillColor(248, 250, 252);
        doc.rect(15 + colWidth, y, colWidth - 2, 7, 'F');
        doc.text(`[ ]  ${wrappedSub2[0]}`, 18 + colWidth, y + 4.5);
      }
      y += 8.5;
    }
    
    y += 3;

    // --- 4. JOB MARKET REALITY (PAKISTAN 2026) ---
    addSectionHeader('Job Market Reality (Pakistan 2026)');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    
    degree.marketReality.forEach((mr) => {
      const wrappedMr = doc.splitTextToSize(`•  ${mr}`, pageWidth - 40);
      const blockHeight = (wrappedMr.length * 4.3) + 5;
      checkSpace(blockHeight + 2);
      doc.setFillColor(254, 243, 199); // Amber 100
      doc.roundedRect(15, y, pageWidth - 30, blockHeight, 1.5, 1.5, 'F');
      doc.setTextColor(146, 64, 14); // Amber 800
      for (let li = 0; li < wrappedMr.length; li++) {
        doc.text(wrappedMr[li], 18, y + 4 + (li * 4.3));
      }
      y += blockHeight + 3;
    });

    y += 3;

    // --- 5. KEY JOB ROLES & WORK SECTORS ---
    checkSpace(35);
    const midPoint = (pageWidth - 32) / 2;
    
    addSectionHeader('Job Roles & Work Sectors');
    
    let leftY = y;
    let rightY = y;
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('KEY JOB ROLES', 16, y + 4);
    doc.text('WORK SECTORS', 16 + midPoint, y + 4);
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(203, 213, 225);
    doc.line(16, y + 6, 16 + midPoint - 5, y + 6);
    doc.line(16 + midPoint, y + 6, pageWidth - 16, y + 6);
    
    leftY += 10;
    rightY += 10;
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    
    degree.jobRoles.forEach((role) => {
      const wrapped = doc.splitTextToSize(`•  ${role}`, midPoint - 8);
      for (let li = 0; li < wrapped.length; li++) {
        doc.text(wrapped[li], 16, leftY + 3.2 + (li * 4.2));
      }
      leftY += (wrapped.length * 4.2) + 2;
    });
    
    degree.keySectors.forEach((sector) => {
      const wrapped = doc.splitTextToSize(`•  ${sector}`, midPoint - 8);
      for (let li = 0; li < wrapped.length; li++) {
        doc.text(wrapped[li], 16 + midPoint, rightY + 3.2 + (li * 4.2));
      }
      rightY += (wrapped.length * 4.2) + 2;
    });
    
    y = Math.max(leftY, rightY) + 5;

    // --- 6. SALARY TRAJECTORY ---
    addSectionHeader('Salary Trajectory (Pakistan)');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    
    checkSpace(14);
    doc.setFillColor(241, 245, 249);
    doc.rect(15, y, pageWidth - 30, 7, 'F');
    doc.text('CAREER LEVEL', 18, y + 4.5);
    doc.text('TYPICAL MONTHLY SALARY', pageWidth - 18, y + 4.5, { align: 'right' });
    y += 8;
    
    degree.salaryTable.forEach((row, idx) => {
      checkSpace(8);
      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, y, pageWidth - 30, 7, 'F');
      }

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(row.level, 18, y + 4.5);

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(13, 148, 136); // Teal 600
      doc.text(row.salary, pageWidth - 18, y + 4.5, { align: 'right' });

      y += 7.5;
    });

    y += 4;

    // --- 7. GUIDED ROADMAP JOURNEY ---
    addSectionHeader('Guided Roadmap Journey');
    
    degree.roadmap.forEach((step) => {
      const milestoneWrapped = doc.splitTextToSize(step.milestone, pageWidth - 55);
      const height = (milestoneWrapped.length * 4.3) + 7;
      checkSpace(height);
      
      doc.setDrawColor(99, 102, 241);
      doc.setLineWidth(1.2);
      doc.circle(20, y + 3.5, 1.8, 'D');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(79, 70, 229);
      doc.text(step.year.toUpperCase(), 28, y + 4);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      for (let li = 0; li < milestoneWrapped.length; li++) {
        doc.text(milestoneWrapped[li], 28, y + 8.5 + (li * 4.3));
      }
      
      y += height;
    });

    y += 3;

    // --- 8. TOP PAKISTANI INSTITUTES ---
    addSectionHeader('Top Pakistani Institutes');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    
    degree.universities.forEach((uni) => {
      const wrappedUni = doc.splitTextToSize(`•  ${uni}`, pageWidth - 34);
      const height = (wrappedUni.length * 4.3) + 2;
      checkSpace(height);
      for (let li = 0; li < wrappedUni.length; li++) {
        doc.text(wrappedUni[li], 16, y + 3.2 + (li * 4.3));
      }
      y += height;
    });

    y += 3;

    // --- 9. RECOMMENDED STRATEGY & ENTREPRENEURIAL OPPORTUNITIES ---
    addSectionHeader('Strategic Advice & Opportunities');
    
    checkSpace(35);
    const sideColWidth = (pageWidth - 32) / 2;
    let strategyLeftY = y;
    let strategyRightY = y;
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(22, 101, 52); // Green 800
    doc.text('SUITABLE FOR YOU IF:', 16, y + 4);
    
    doc.setTextColor(153, 27, 27); // Red 800
    doc.text('AVOID THIS IF:', 16 + sideColWidth, y + 4);
    
    strategyLeftY += 8;
    strategyRightY += 8;
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    
    degree.chooseIf.forEach((item) => {
      const wrappedItem = doc.splitTextToSize(`+ ${item}`, sideColWidth - 6);
      for (let li = 0; li < wrappedItem.length; li++) {
        doc.text(wrappedItem[li], 16, strategyLeftY + 3.2 + (li * 4.2));
      }
      strategyLeftY += (wrappedItem.length * 4.2) + 2;
    });
    
    degree.avoidIf.forEach((item) => {
      const wrappedItem = doc.splitTextToSize(`- ${item}`, sideColWidth - 6);
      for (let li = 0; li < wrappedItem.length; li++) {
        doc.text(wrappedItem[li], 16 + sideColWidth, strategyRightY + 3.2 + (li * 4.2));
      }
      strategyRightY += (wrappedItem.length * 4.2) + 2;
    });
    
    y = Math.max(strategyLeftY, strategyRightY) + 6;
    
    // Recommended Strategy
    const wrappedStrategy = doc.splitTextToSize(degree.strategy.join('  ➔  '), pageWidth - 34);
    const strategyBlockHeight = (wrappedStrategy.length * 4.3) + 8;
    checkSpace(strategyBlockHeight);
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('CORE STRATEGY:', 16, y + 4);
    y += 6;
    
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(79, 70, 229);
    for (let li = 0; li < wrappedStrategy.length; li++) {
      doc.text(wrappedStrategy[li], 16, y + 3.2 + (li * 4.3));
    }
    y += (wrappedStrategy.length * 4.3) + 6;

    // Entrepreneurial opportunities
    const wrappedOps = doc.splitTextToSize(degree.startupOps.join(' • '), pageWidth - 34);
    const opsBlockHeight = (wrappedOps.length * 4.3) + 8;
    checkSpace(opsBlockHeight);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('ENTREPRENEURIAL & FREELANCING PATHS:', 16, y + 4);
    y += 6;
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    for (let li = 0; li < wrappedOps.length; li++) {
      doc.text(wrappedOps[li], 16, y + 3.2 + (li * 4.3));
    }
    
    // Save the PDF
    doc.save(`${degree.title.toLowerCase().replace(/\s+/g, '_')}_roadmap_2026.pdf`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-6 py-12 text-slate-800"
    >
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-10 gap-4">
        <button 
          onClick={onBack}
          className="group flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 font-extrabold transition-all uppercase tracking-widest text-xs py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-indigo-600" />
          Back to Dashboard
        </button>
        <div className="flex flex-wrap gap-2.5 items-center justify-center sm:justify-end">
          <button 
            onClick={onToggleFavorite}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-extrabold uppercase tracking-widest text-[10px] border ${
              isFavorite 
                ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100/50 shadow-sm' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
            }`}
            title={isFavorite ? "Remove from Bookmarks" : "Save to Bookmarks"}
          >
            <Bookmark size={14} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-amber-500" : "text-slate-400"} />
            {isFavorite ? 'Saved' : 'Save'}
          </button>
          
          <div className="relative">
            <button 
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-extrabold uppercase tracking-widest text-[10px] border ${
                copied 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="Copy share link for this career roadmap to clipboard"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  Copied Link!
                </>
              ) : (
                <>
                  <Share2 size={14} className="text-slate-400" />
                  Share Roadmap
                </>
              )}
            </button>
            {copied && (
              <div className="absolute top-full mt-2 right-0 bg-slate-900 text-[10px] text-white font-extrabold uppercase tracking-widest py-1.5 px-3 rounded-lg shadow-xl z-50 whitespace-nowrap">
                Roadmap Link Copied!
              </div>
            )}
          </div>

          <button 
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100/50 rounded-xl transition-all font-extrabold uppercase tracking-widest text-[10px] shadow-sm"
            title="Share via WhatsApp"
          >
            <MessageCircle size={14} className="fill-emerald-600/10 text-emerald-600" />
            WhatsApp
          </button>

          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-3 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all font-extrabold uppercase tracking-widest text-[10px] shadow-sm"
            title="Print Blueprint / Save as Full PDF"
          >
            <Printer size={14} className="text-slate-400" />
            Print Roadmap
          </button>

          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-extrabold rounded-xl shadow-md shadow-indigo-600/10 hover:from-indigo-500 hover:to-teal-500 transition-all uppercase tracking-widest text-[10px]"
            title="Download compact offline PDF document"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </div>

      {/* PDF Header Style Block */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-teal-50/20 text-slate-800 rounded-[2.5rem] p-8 md:p-12 mb-10 relative overflow-hidden shadow-sm border border-indigo-100/60">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 text-left">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-indigo-100/80">
            <LogoImage className="h-14 md:h-16 w-auto object-contain" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Dreampath AI Career Blueprint</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-indigo-100/55 border border-indigo-200/50 text-indigo-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
              {degree.domain} Domain
            </span>
            <span className="px-4 py-1.5 bg-slate-100/85 border border-slate-200 text-slate-600 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
              {degree.duration} Program
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase font-display text-slate-900">
            {degree.title}
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-3xl leading-relaxed italic">
            &quot;{degree.summary}&quot;
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content (Left 2/3) */}
        <div className="lg:col-span-2 space-y-12 text-left">
          
          {/* Section: Description */}
          <section id="what-is-field">
            <h2 className="flex items-center gap-3 text-lg font-extrabold text-slate-800 mb-5 uppercase tracking-wider font-display border-b border-slate-100 pb-2">
              <Info className="text-indigo-600" size={18} /> What Is This Field?
            </h2>
            <div className="space-y-3">
              {degree.description.map((point, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-350 transition-all shadow-sm">
                  <div className="mt-1 shrink-0"><CheckCircle2 size={16} className="text-indigo-600" /></div>
                  <p className="text-slate-600 font-semibold text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Study */}
          <section id="what-you-study">
            <h2 className="flex items-center gap-3 text-lg font-extrabold text-slate-800 mb-5 uppercase tracking-wider font-display border-b border-slate-100 pb-2">
              <BookOpen className="text-indigo-600" size={18} /> Core Subjects & Skill Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {degree.subjects.map((sub, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 text-xs shadow-sm">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full shrink-0 shadow-md shadow-indigo-500/50" />
                  {sub}
                </div>
              ))}
            </div>
          </section>

          {/* Section: Job Market */}
          <section id="job-market">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/30 border border-amber-200/60 text-slate-800 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
              <h2 className="flex items-center gap-3 text-lg font-extrabold mb-5 uppercase tracking-wider font-display text-amber-700">
                <TrendingUp size={20} className="text-amber-600" /> Job Market Reality (Pakistan 2026)
              </h2>
              <div className="space-y-3.5 relative z-10">
                {degree.marketReality.map((point, i) => (
                  <p key={i} className="text-amber-900/90 font-semibold text-sm leading-relaxed border-b border-amber-200/40 pb-4 last:border-0 italic">
                    • {point}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Split Roles / Sectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <section>
              <h3 className="flex items-center gap-2.5 text-sm font-extrabold text-slate-800 mb-4 uppercase tracking-wider font-display border-b border-slate-100 pb-1.5">
                <Briefcase size={16} className="text-indigo-600" /> Key Job Roles
              </h3>
              <ul className="space-y-2.5">
                {degree.jobRoles.map((role, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold text-xs bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    {role}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="flex items-center gap-2.5 text-sm font-extrabold text-slate-800 mb-4 uppercase tracking-wider font-display border-b border-slate-100 pb-1.5">
                <Factory size={16} className="text-indigo-600" /> Work Sectors
              </h3>
              <ul className="space-y-2.5">
                {degree.keySectors.map((sector, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold text-xs bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    {sector}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Salary Table */}
          <section id="salaries">
            <h2 className="flex items-center gap-3 text-lg font-extrabold text-slate-800 mb-5 uppercase tracking-wider font-display border-b border-slate-100 pb-2">
              <DollarSign className="text-indigo-600" size={18} /> Salary Trajectory
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Career Level</th>
                    <th className="px-8 py-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Typical Salary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {degree.salaryTable.map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-4.5 font-bold text-slate-600 text-xs">{row.level}</td>
                      <td className="px-8 py-4.5 font-extrabold text-indigo-600 text-xs tracking-wide">{row.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Pakistani Universities Interactive Map & Campus Locator */}
          <section id="pakistan-universities-map">
            <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-[2.5rem] p-6 md:p-8 shadow-xl relative overflow-hidden border border-indigo-500/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 relative z-10">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-400/30">
                    Pakistan Campus Locator
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white font-display mt-2 flex items-center gap-2.5">
                    <Building2 className="text-teal-400" size={22} /> Top-Rated Universities in Pakistan
                  </h2>
                </div>
                <div className="relative w-full md:w-64">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search university or city..."
                    value={searchUni}
                    onChange={(e) => setSearchUni(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Region Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-6 relative z-10">
                {['All', 'Islamabad', 'Lahore', 'Karachi', 'Faisalabad', 'Peshawar'].map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedUniRegion(region)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                      selectedUniRegion === region
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {region === 'All' ? '🇵🇰 All Pakistan Hubs' : region}
                  </button>
                ))}
              </div>

              {/* Interactive University List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 relative z-10 max-h-[480px] overflow-y-auto pr-1">
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map((uni, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-4 rounded-2xl transition-all shadow-sm flex flex-col justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="font-extrabold text-sm text-white group-hover:text-indigo-300 transition-colors">
                            {uni.name}
                          </h4>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                            uni.type === 'Public' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {uni.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                          <MapPin size={12} className="text-teal-400 shrink-0" />
                          <span>{uni.city}, {uni.province}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-[11px]">
                        <span className="text-indigo-300 font-bold flex items-center gap-1">
                          <Award size={12} className="text-amber-400" /> {uni.testRequired}
                        </span>
                        <span className="text-slate-400 font-semibold text-[10px] bg-slate-800/80 px-2.5 py-1 rounded-lg">
                          HEC W4 Recognized
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-10 text-center text-slate-400 text-xs font-semibold">
                    No universities found matching &quot;{searchUni}&quot; in {selectedUniRegion}. Try selecting &quot;All Pakistan Hubs&quot;.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Vertical Roadmap */}
          <section id="roadmap">
            <h2 className="flex items-center gap-3 text-lg font-extrabold text-slate-800 mb-8 uppercase tracking-wider font-display border-b border-slate-100 pb-2">
              <Calendar className="text-indigo-600" size={18} /> Guided Roadmap Journey
            </h2>
            <div className="relative pl-10 border-l-2 border-slate-200 ml-6 space-y-8 pb-2">
              {degree.roadmap.map((step, i) => (
                <div key={i} className="relative">
                  {/* Outer glowing timeline node */}
                  <div className="absolute -left-[51px] top-1 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full z-10 shadow-sm" />
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-slate-350 transition-all text-left">
                    <span className="text-indigo-600 font-extrabold text-[10px] uppercase tracking-widest mb-1.5 block">{step.year}</span>
                    <p className="text-slate-700 font-bold text-sm tracking-wide">{step.milestone}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar (Right 1/3) */}
        <div className="space-y-8 text-left">
          
          {/* Universities */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="flex items-center gap-2.5 text-sm font-extrabold text-slate-800 mb-4 uppercase tracking-wider font-display border-b border-slate-100 pb-2">
              <MapPin size={16} className="text-indigo-600" /> Top Pakistani Institutes
            </h3>
            <ul className="space-y-3">
              {degree.universities.map((uni, i) => (
                <li key={i} className="flex gap-3 text-slate-600 text-xs font-semibold leading-relaxed border-b border-slate-100 pb-2.5 last:border-0">
                   {uni}
                </li>
              ))}
            </ul>
          </div>

          {/* Choose / Avoid */}
          <div className="space-y-6">
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-3xl p-6 relative overflow-hidden shadow-sm">
               <h4 className="flex items-center gap-2 text-emerald-700 font-extrabold mb-4 uppercase tracking-wider text-xs font-display">
                  <HelpCircle size={15} /> Choose this if...
               </h4>
               <ul className="space-y-3">
                 {degree.chooseIf.map((item, i) => (
                   <li key={i} className="flex gap-2.5 text-slate-600 text-xs font-semibold leading-relaxed">
                     <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5 text-emerald-500" />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="bg-rose-50/50 border border-rose-200 rounded-3xl p-6 relative overflow-hidden shadow-sm">
               <h4 className="flex items-center gap-2 text-rose-700 font-extrabold mb-4 uppercase tracking-wider text-xs font-display">
                  <AlertCircle size={15} /> Avoid this if...
               </h4>
               <ul className="space-y-3">
                 {degree.avoidIf.map((item, i) => (
                   <li key={i} className="flex gap-2.5 text-slate-600 text-xs font-semibold leading-relaxed">
                     <AlertCircle size={13} className="flex-shrink-0 mt-0.5 text-rose-500" />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Strategy Block */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-teal-500" />
            <h3 className="flex items-center gap-2 text-sm font-extrabold mb-5 uppercase tracking-wider font-display border-b border-slate-100 pb-2">
              <Target size={16} className="text-indigo-600" /> Recommended Strategy
            </h3>
            <div className="space-y-4">
              {degree.strategy.map((s, i) => (
                <div key={i} className="flex flex-col gap-2 relative">
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-wide leading-relaxed italic border-l-2 border-indigo-500 pl-3.5 py-0.5">
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Startup section */}
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-800 font-extrabold mb-4 uppercase tracking-widest text-[10px] text-center font-display border-b border-dashed border-slate-200 pb-2">
              Entrepreneurial Opportunities
            </h3>
            <div className="space-y-2.5">
              {degree.startupOps.map((op, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-slate-700 text-xs font-bold uppercase tracking-tight text-center shadow-sm">
                  {op}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
