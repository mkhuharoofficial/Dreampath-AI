import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Share2, Info, BookOpen, TrendingUp, 
  MapPin, DollarSign, HelpCircle, AlertCircle, Target, 
  Calendar, CheckCircle2, Factory, Briefcase, Check, Bookmark, MessageCircle,
  Printer
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

export default function DegreeBlueprint({ degree, onBack, isFavorite, onToggleFavorite }: DegreeBlueprintProps) {
  const [copied, setCopied] = useState(false);

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
    const summaryLines = doc.splitTextToSize(summaryText, pageWidth - 70);
    const headerHeight = Math.max(50, 34 + (summaryLines.length * 4.5));

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
    doc.text(titleLines[0], 22, y + 12);
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(56, 189, 248); // Cyan 400
    doc.text(`${degree.domain.toUpperCase()} DOMAIN  |  ${degree.duration.toUpperCase()} PROGRAM`, 22, y + 19);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(226, 232, 240); // Slate 200
    doc.text(summaryLines, 22, y + 26);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Dreampath AI Guidance Edition • Muhammad Khan Khuharo', 22, y + headerHeight - 5);
    
    y += headerHeight + 8;

    // Helper for Section Headers
    const addSectionHeader = (title: string) => {
      checkSpace(16);
      doc.setFillColor(241, 245, 249);
      doc.rect(15, y, pageWidth - 30, 6.5, 'F');

      doc.setFillColor(37, 99, 235);
      doc.rect(15, y, 3.5, 6.5, 'F');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9.5);
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
      const wrappedDesc = doc.splitTextToSize(`•  ${desc}`, pageWidth - 32);
      const height = wrappedDesc.length * 4.3;
      checkSpace(height + 2);
      doc.text(wrappedDesc, 16, y);
      y += height + 2;
    });
    
    y += 3;

    // --- 3. CORE SUBJECTS & COMPETENCIES ---
    addSectionHeader('Core Subjects & Key Skills');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    
    let colWidth = (pageWidth - 32) / 2;
    for (let i = 0; i < degree.subjects.length; i += 2) {
      checkSpace(7.5);
      const sub1 = degree.subjects[i];
      const sub2 = degree.subjects[i + 1] || '';
      
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y - 3.5, colWidth - 2, 6, 'F');
      doc.setTextColor(79, 70, 229);
      doc.setFont('Helvetica', 'bold');
      doc.text(`[ ]  ${sub1}`, 18, y + 0.5);
      
      if (sub2) {
        doc.setFillColor(248, 250, 252);
        doc.rect(15 + colWidth, y - 3.5, colWidth - 2, 6, 'F');
        doc.text(`[ ]  ${sub2}`, 18 + colWidth, y + 0.5);
      }
      y += 7.5;
    }
    
    y += 3;

    // --- 4. JOB MARKET REALITY (PAKISTAN 2026) ---
    addSectionHeader('Job Market Reality (Pakistan 2026)');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    
    degree.marketReality.forEach((mr) => {
      const wrappedMr = doc.splitTextToSize(`•  ${mr}`, pageWidth - 36);
      const height = wrappedMr.length * 4.3;
      checkSpace(height + 4);
      doc.setFillColor(254, 243, 199); // Amber 100
      doc.roundedRect(15, y - 3, pageWidth - 30, height + 4, 1.5, 1.5, 'F');
      doc.setTextColor(146, 64, 14); // Amber 800
      doc.text(wrappedMr, 18, y + 1);
      y += height + 5;
    });

    y += 3;

    // --- 5. KEY JOB ROLES & WORK SECTORS ---
    checkSpace(35);
    const midPoint = (pageWidth - 30) / 2;
    
    addSectionHeader('Job Roles & Work Sectors');
    
    let leftY = y;
    let rightY = y;
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('KEY JOB ROLES', 16, y);
    doc.text('WORK SECTORS', 16 + midPoint, y);
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(203, 213, 225);
    doc.line(16, y + 2, 16 + midPoint - 5, y + 2);
    doc.line(16 + midPoint, y + 2, pageWidth - 16, y + 2);
    
    leftY += 7;
    rightY += 7;
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    
    degree.jobRoles.forEach((role) => {
      const wrapped = doc.splitTextToSize(`•  ${role}`, midPoint - 6);
      doc.text(wrapped, 16, leftY);
      leftY += (wrapped.length * 4.2) + 1.5;
    });
    
    degree.keySectors.forEach((sector) => {
      const wrapped = doc.splitTextToSize(`•  ${sector}`, midPoint - 6);
      doc.text(wrapped, 16 + midPoint, rightY);
      rightY += (wrapped.length * 4.2) + 1.5;
    });
    
    y = Math.max(leftY, rightY) + 5;

    // --- 6. SALARY TRAJECTORY ---
    addSectionHeader('Salary Trajectory (Pakistan)');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    
    checkSpace(12);
    doc.setFillColor(241, 245, 249);
    doc.rect(15, y - 3, pageWidth - 30, 7, 'F');
    doc.text('CAREER LEVEL', 18, y + 1.5);
    doc.text('TYPICAL MONTHLY SALARY', pageWidth - 18, y + 1.5, { align: 'right' });
    y += 7.5;
    
    degree.salaryTable.forEach((row, idx) => {
      checkSpace(7.5);
      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, y - 3, pageWidth - 30, 7, 'F');
      }

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(row.level, 18, y + 1);

      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(13, 148, 136); // Teal 600
      doc.text(row.salary, pageWidth - 18, y + 1, { align: 'right' });

      y += 7.5;
    });

    y += 4;

    // --- 7. GUIDED ROADMAP JOURNEY ---
    addSectionHeader('Guided Roadmap Journey');
    
    degree.roadmap.forEach((step) => {
      const milestoneWrapped = doc.splitTextToSize(step.milestone, pageWidth - 55);
      const height = milestoneWrapped.length * 4.3;
      checkSpace(height + 6);
      
      doc.setDrawColor(99, 102, 241);
      doc.setLineWidth(1.2);
      doc.circle(20, y - 0.5, 1.8, 'D');
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(79, 70, 229);
      doc.text(step.year.toUpperCase(), 28, y);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(milestoneWrapped, 28, y + 4.5);
      
      y += height + 7;
    });

    y += 3;

    // --- 8. TOP PAKISTANI INSTITUTES ---
    addSectionHeader('Top Pakistani Institutes');
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    
    degree.universities.forEach((uni) => {
      const wrappedUni = doc.splitTextToSize(`•  ${uni}`, pageWidth - 32);
      const height = wrappedUni.length * 4.3;
      checkSpace(height + 2);
      doc.text(wrappedUni, 16, y);
      y += height + 2;
    });

    y += 3;

    // --- 9. RECOMMENDED STRATEGY & ENTREPRENEURIAL OPPORTUNITIES ---
    addSectionHeader('Strategic Advice & Opportunities');
    
    checkSpace(30);
    const sideColWidth = (pageWidth - 30) / 2;
    let strategyLeftY = y;
    let strategyRightY = y;
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(22, 101, 52); // Green 800
    doc.text('SUITABLE FOR YOU IF:', 16, y);
    
    doc.setTextColor(153, 27, 27); // Red 800
    doc.text('AVOID THIS IF:', 16 + sideColWidth, y);
    
    strategyLeftY += 6;
    strategyRightY += 6;
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    
    degree.chooseIf.forEach((item) => {
      const wrappedItem = doc.splitTextToSize(`+ ${item}`, sideColWidth - 4);
      doc.text(wrappedItem, 16, strategyLeftY);
      strategyLeftY += (wrappedItem.length * 4.2) + 2;
    });
    
    degree.avoidIf.forEach((item) => {
      const wrappedItem = doc.splitTextToSize(`- ${item}`, sideColWidth - 4);
      doc.text(wrappedItem, 16 + sideColWidth, strategyRightY);
      strategyRightY += (wrappedItem.length * 4.2) + 2;
    });
    
    y = Math.max(strategyLeftY, strategyRightY) + 6;
    
    // Recommended Strategy
    checkSpace(18);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('CORE STRATEGY:', 16, y);
    y += 4.5;
    
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(79, 70, 229);
    const wrappedStrategy = doc.splitTextToSize(degree.strategy.join('  ➔  '), pageWidth - 32);
    doc.text(wrappedStrategy, 16, y);
    y += (wrappedStrategy.length * 4.3) + 6;

    // Entrepreneurial opportunities
    checkSpace(16);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('ENTREPRENEURIAL & FREELANCING PATHS:', 16, y);
    y += 4.5;
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const wrappedOps = doc.splitTextToSize(degree.startupOps.join(' • '), pageWidth - 32);
    doc.text(wrappedOps, 16, y);
    
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
