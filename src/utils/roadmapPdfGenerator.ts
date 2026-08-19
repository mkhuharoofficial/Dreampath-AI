import { jsPDF } from 'jspdf';
import { DEGREES } from '../data';
import { getLogoDataUrl } from './logoHelper';

/**
 * Generates a clean, professional, high-contrast 2026 Career Roadmaps PDF handbook
 * with zero text overlapping, explicit line heights, and consistent margins.
 */
export const generate2026RoadmapsPDF = async (): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2); // 182mm
  const printableBottom = pageHeight - 18; // safe zone before footer

  // Load logo data URL
  let logoDataUrl: string | null = null;
  try {
    logoDataUrl = await getLogoDataUrl();
  } catch {
    logoDataUrl = null;
  }

  // Header & Footer helper
  const addHeaderFooter = (pageNum: number, totalPages: number, pageTitle: string = 'Dreampath AI 2026 Career Roadmaps') => {
    // Watermark (subtle high-contrast readable opacity)
    try {
      doc.saveGraphicsState();
      doc.setTextColor(241, 245, 249); // slate-100
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(42);
      doc.text('DREAMPATH AI', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
      doc.restoreGraphicsState();
    } catch {
      // safe fallback
    }

    // Top Header Bar
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 16, 'F');
    doc.setFillColor(37, 99, 235); // blue-600 accent
    doc.rect(0, 15.2, pageWidth, 0.8, 'F');

    if (logoDataUrl) {
      try {
        doc.addImage(logoDataUrl, 'PNG', margin, 2.5, 11, 11);
      } catch {
        // ignored
      }
    }

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('DREAMPATH AI — 2026 CAREER ROADMAPS', logoDataUrl ? margin + 14 : margin, 10.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225); // slate-300
    const safeTitle = doc.splitTextToSize(pageTitle, 75)[0] || pageTitle;
    doc.text(safeTitle, pageWidth - margin, 10.5, { align: 'right' });

    // Bottom Footer Bar
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(0, pageHeight - 14, pageWidth, pageHeight - 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text('Dreampath AI Career Guidance System | Founder: Muhammad Khan Khuharo', margin, pageHeight - 6);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(30, 41, 59); // Slate 800 top panel
  doc.rect(0, 0, pageWidth, 90, 'F');

  doc.setFillColor(37, 99, 235); // Blue 600 accent stripe
  doc.rect(0, 95, pageWidth, 3, 'F');

  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, 'PNG', margin, 20, 28, 28);
    } catch {
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.text('DREAMPATH AI', margin, 38);
    }
  } else {
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text('DREAMPATH AI', margin, 38);
  }

  // Cover Main Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.text('2026 CAREER', margin, 125);
  
  doc.setTextColor(56, 189, 248); // Electric Cyan
  doc.text('ROADMAPS', margin, 138);

  doc.setTextColor(226, 232, 240); // Slate 200
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.text('Comprehensive Degree & Career Pathways for Students in Pakistan', margin, 152);

  // Description Card
  doc.setFillColor(30, 41, 59);
  doc.setDrawColor(51, 65, 85);
  doc.roundedRect(margin, 168, contentWidth, 32, 3, 3, 'FD');

  doc.setTextColor(241, 245, 249);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('OFFICIAL CAREER GUIDANCE HANDBOOK', margin + 6, 178);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(203, 213, 225);
  doc.text('Structured 21-point career pathways covering Technology, Healthcare, Engineering,', margin + 6, 186);
  doc.text('Business, Emerging AI fields, and Legal professions in Pakistan.', margin + 6, 192);

  // Founder & Edition Metadata Box
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(37, 99, 235);
  doc.roundedRect(margin, 235, contentWidth, 34, 3, 3, 'FD');

  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Founder & Platform Architect:', margin + 6, 244);
  
  doc.setTextColor(56, 189, 248);
  doc.setFontSize(12);
  doc.text('Muhammad Khan Khuharo', margin + 6, 252);

  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Dreampath AI Career Guidance Platform • 2026 Official Student Edition', margin + 6, 260);

  // ==========================================
  // PAGE 2: TABLE OF CONTENTS
  // ==========================================
  doc.addPage();
  let pageNumCounter = 2;
  addHeaderFooter(pageNumCounter, 0, 'Table of Contents');

  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Table of Contents', margin, 26);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('Comprehensive list of degree blueprints and career roadmaps included in this handbook:', margin, 33);

  let y = 41;

  DEGREES.forEach((deg, idx) => {
    if (y > printableBottom - 14) {
      doc.addPage();
      pageNumCounter++;
      addHeaderFooter(pageNumCounter, 0, 'Table of Contents (Contd.)');
      y = 26;
    }

    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(margin, y, contentWidth, 11, 2, 2, 'FD');

    // Number tag
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(`#${idx + 1}`, margin + 4, y + 7);

    // Degree Title
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.setFont('helvetica', 'bold');
    const splitTitle = doc.splitTextToSize(deg.title, contentWidth - 65);
    doc.text(splitTitle[0], margin + 15, y + 7);

    // Domain & Duration
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // Slate 600
    doc.setFontSize(8.5);
    doc.text(`${deg.domain} • ${deg.duration}`, pageWidth - margin - 4, y + 7, { align: 'right' });

    y += 13.5;
  });

  // ==========================================
  // PAGES 3+: INDIVIDUAL ROADMAP BLUEPRINTS
  // ==========================================
  DEGREES.forEach((deg) => {
    doc.addPage();
    pageNumCounter++;
    addHeaderFooter(pageNumCounter, 0, deg.title);

    let curY = 24;

    // Header Banner
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.roundedRect(margin, curY, contentWidth, 22, 2.5, 2.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    const degreeTitleWrapped = doc.splitTextToSize(deg.title, contentWidth - 12);
    doc.text(degreeTitleWrapped[0], margin + 6, curY + 8);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(56, 189, 248); // Cyan
    doc.text(`Domain: ${deg.domain}   |   Category: ${deg.category}   |   Duration: ${deg.duration}`, margin + 6, curY + 16);

    curY += 26;

    // Structured Section Block Renderer with Strict Line Heights & Break Prevention
    const addSectionBlock = (title: string, items: string[] | string) => {
      if (!items || (Array.isArray(items) && items.length === 0)) return;

      // Ensure space for section header + initial content lines
      if (curY > printableBottom - 20) {
        doc.addPage();
        pageNumCounter++;
        addHeaderFooter(pageNumCounter, 0, deg.title);
        curY = 24;
      }

      // Section Header Banner
      doc.setFillColor(241, 245, 249); // slate-100
      doc.rect(margin, curY, contentWidth, 6.5, 'F');
      
      doc.setFillColor(37, 99, 235); // blue-600 accent bar
      doc.rect(margin, curY, 3.5, 6.5, 'F');

      doc.setTextColor(15, 23, 42); // slate-900
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(title, margin + 6, curY + 4.5);

      curY += 9;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59); // slate-800 (high contrast)

      const lineHeight = 4.3; // mm

      if (Array.isArray(items)) {
        items.forEach((item) => {
          if (!item) return;
          const splitLines = doc.splitTextToSize(`•  ${item}`, contentWidth - 8);
          const blockHeight = splitLines.length * lineHeight;

          if (curY + blockHeight > printableBottom) {
            doc.addPage();
            pageNumCounter++;
            addHeaderFooter(pageNumCounter, 0, deg.title);
            curY = 24;
          }

          doc.text(splitLines, margin + 4, curY);
          curY += blockHeight + 1.2;
        });
      } else {
        const splitLines = doc.splitTextToSize(items, contentWidth - 8);
        const blockHeight = splitLines.length * lineHeight;

        if (curY + blockHeight > printableBottom) {
          doc.addPage();
          pageNumCounter++;
          addHeaderFooter(pageNumCounter, 0, deg.title);
          curY = 24;
        }

        doc.text(splitLines, margin + 4, curY);
        curY += blockHeight + 1.5;
      }

      curY += 2.5; // Gap before next section
    };

    // 21 Structured Roadmap Attributes
    addSectionBlock('1. Career Overview & Summary', deg.summary || (Array.isArray(deg.description) ? deg.description.join(' ') : ''));
    addSectionBlock('2. Who Is This Career Suitable For?', deg.chooseIf);
    addSectionBlock('3. Important Challenges & Who Should Avoid', deg.avoidIf);
    addSectionBlock('4. Recommended Academic Background & Core Subjects', deg.subjects);
    addSectionBlock('5. Essential Technical & Professional Skills Required', deg.skills);
    addSectionBlock('6. Beginner Skills (Phase 1)', deg.skills.slice(0, Math.ceil(deg.skills.length / 2)));
    addSectionBlock('7. Advanced Skills (Phase 2 & Beyond)', deg.skills.slice(Math.ceil(deg.skills.length / 2)));
    addSectionBlock('8. Recommended Degree / Diploma Pathways', `${deg.title} (${deg.duration})`);
    addSectionBlock('9. Top Universities & Institutes in Pakistan', deg.universities);
    addSectionBlock('10. Relevant Entry Tests & Merit Considerations', ['MDCAT / ECAT / NTS / FAST / NUST / GIKI Entrance Tests where applicable']);
    addSectionBlock('11. Possible Job Roles & Career Titles', deg.jobRoles);
    addSectionBlock('12. Primary Work Environments & Hiring Sectors', deg.keySectors);
    addSectionBlock('13. Pakistani Market Reality & Hiring Demand', deg.marketReality);
    addSectionBlock('14. Freelancing & Remote Opportunities', deg.startupOps);
    addSectionBlock('15. Entrepreneurship & Startup Opportunities', deg.startupOps);
    addSectionBlock('16. Recommended Portfolio & Practical Project Ideas', deg.subjects.map(s => `Build practical real-world projects applying: ${s}`));
    addSectionBlock('17. 6-Month Actionable Learning Roadmap', deg.roadmap.slice(0, 1).map(r => `${r.year}: ${r.milestone}`));
    addSectionBlock('18. 1-Year Academic & Skill Roadmap', deg.roadmap.slice(1, 2).map(r => `${r.year}: ${r.milestone}`));
    addSectionBlock('19. Long-Term Career Progression Roadmap', deg.roadmap.map(r => `${r.year}: ${r.milestone}`));
    addSectionBlock('20. International & Overseas Market Opportunities', deg.marketReality.filter(m => /gulf|abroad|international|demand|global|remote/i.test(m)));
    addSectionBlock('21. Next Steps for Students (Strategic Advice)', deg.strategy);
  });

  // Download PDF
  doc.save('Dreampath_AI_2026_Career_Roadmaps.pdf');
};
