import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, ArrowRight, X, Sparkles, Tag, Share2, Bookmark, CheckCircle, GraduationCap } from 'lucide-react';
import { LogoImage } from './LogoImage';

export interface BlogComment {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content: string[];
  keyTakeaways: string[];
  comments?: BlogComment[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '5-simple-steps-to-choose-the-right-career',
    title: '5 Simple Steps to Choose the Right Career',
    category: 'Career Guidance',
    readTime: '6 min read',
    date: 'August 2026',
    author: 'Dreampath Career Advisory',
    excerpt: 'A simple guide for students after Matric, Intermediate, FSc, O-Level or A-Level to choose the right career step-by-step.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Know your interests and explore fields like Medical, Technology, Business, Law, and Sciences',
      'Check your budget, family support, and when you can realistically start earning',
      'Think about the daily lifestyle, work environment, and routine you want',
      'Understand study time: Technology & Business take ~4 years, MBBS is a long pathway',
      'Research future opportunities, universities, market demand, and remote work'
    ],
    comments: [
      {
        id: 'c3',
        author: 'Bilal Ahmed',
        role: 'Intermediate Student',
        text: 'Step 4 about study time and roadmap is super helpful. It really puts things into perspective!',
        date: 'August 19, 2026 at 4:20 PM'
      }
    ],
    content: [
      'A simple guide for students after Matric, Intermediate, FSc, O-Level or A-Level',
      'STEP 1: Know Your Interests\nBefore choosing a degree, ask yourself:\n• What subjects do I enjoy?\n• What type of work do I enjoy?\n• Do I like helping people?\n• Do I like technology and computers?\n• Do I like business and entrepreneurship?\n• Do I like science and research?\n• Do I like law, society, or communication?\n\nExplore areas such as:\n• Medical & Health (Interested in biology, healthcare and helping patients)\n• Technology & Engineering (Enjoy computers, mathematics, problem-solving and building things)\n• Business & Finance (Interested in business, money, marketing and entrepreneurship)\n• Law & Public Policy (Enjoy communication, critical thinking, justice and public service)\n• Natural Sciences (Interested in science, experiments and research)\n• Social Sciences & Humanities (Interested in people, society, psychology, history and communication)',
      'STEP 2: Check Your Budget\nBefore choosing a degree, find out:\n• How much will it cost?\n• Can my family afford it?\n• How many years will I study?\n• When can I realistically start earning?\n• Are scholarships available?\n• Can I work, freelance, or do internships while studying?',
      'STEP 3: Think About the Life You Want\nThink about your future daily life. Do you prefer hospitals and patient care, computer and desk work, business and offices, laboratories and research, courtrooms and law, or working with people and communities?\nAlso ask:\n• Do I want a fixed schedule or a flexible career?\n• Am I comfortable with long study and training?\n• Do I want to work in Pakistan or possibly abroad?',
      'STEP 4: Check the Study Time\nBefore choosing a degree, find out how long you will study, when you can graduate, when you can realistically start working, and whether you will need further study or training.\n\nUse this simple roadmap:\n• Technology: Usually around 4 years for a bachelor\'s degree.\n• Allied Health: Often around 4 years, depending on the program.\n• Business: Usually around 4 years for a bachelor\'s degree.\n• MBBS: A long study and training pathway.\n• CA / ACCA: Depends on the qualification, exams, and completion.',
      'STEP 5: Check Future Opportunities\nBefore choosing a degree, research:\n• Which universities offer it?\n• What skills will I need?\n• What jobs can I get after graduation?\n• Is there demand for this career?\n• Can I work remotely?\n• Are there opportunities in Pakistan or abroad?\n• Can I get scholarships?',
      'YOUR CAREER CHECK\nBefore making your final choice, ask yourself:\n✓ Does this career match my interests?\n✓ Does it match my strengths and abilities?\n✓ Can I manage the cost and study time?\n✓ Do I like the kind of work this career involves?\n✓ Have I checked universities, skills, and career opportunities?',
      'DON\'T CHOOSE ONLY BECAUSE SOMEONE TOLD YOU TO\nParents, teachers, and friends can give useful advice. But your career should also match your interests, abilities, goals, and situation.\n• Don\'t choose a degree only because it is popular.\n• Don\'t choose a degree only because your friends are choosing it.\n• Don\'t choose a career only because someone else wants you to.\nUnderstand yourself and the career before making your decision.',
      'NEED HELP CHOOSING?\nDreamPath AI helps students explore their options through a Free Self-Assessment Test.\nThe platform can help students explore:\n✓ Career suggestions based on their answers\n✓ Degree roadmaps\n✓ Required practical skills\n✓ University information\n✓ Career opportunities',
      'Don\'t guess your future. Explore it.\n\nDreamPath AI\ndreampathai.pk'
    ]
  },
  {
    id: 'how-to-choose-right-career-in-pakistan',
    title: 'How to Choose the Right Career in Pakistan: A Simple Guide',
    category: 'Career Guidance',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Dreampath Career Advisory',
    excerpt: 'Choosing a career after intermediate or school is a huge decision. Here is a simple step-by-step guide to help Pakistani students pick the right path without getting confused.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Pick one main domain first before comparing individual degrees (avoid comparing apples to oranges)',
      'Align your degree path with your personality (Extrovert vs Introvert strengths)',
      'Be realistic about your timeline & financial situation (Long Path e.g. MBBS vs Fast Path e.g. IT)',
      'Focus on learning practical, in-demand skills rather than relying solely on paper degrees'
    ],
    comments: [
      {
        id: 'c1',
        author: 'Ayesha Malik',
        role: 'FSc Pre-Medical Student',
        text: 'This step-by-step guide is so helpful! Step 1 cleared up my confusion between Pharmacy and AI. Thank you Dreampath AI!',
        date: 'August 11, 2026 at 10:15 AM'
      },
      {
        id: 'c2',
        author: 'Counselor Hamza Khan',
        role: 'Senior Career Advisor',
        text: 'Excellent breakdown for Pakistani students. Step 3 about financial timeline is crucial. I always recommend students consider their family support window before committing to long medical paths.',
        date: 'August 11, 2026 at 11:30 AM'
      }
    ],
    content: [
      'Choosing a career after intermediate or school is a very big decision. In Pakistan, students often get confused because they get advice from everyone and try to compare completely different fields.',
      'Here is a very simple, step-by-step guide to help you find your right path:',
      'Step 1: Pick Your Domain First\nThe biggest mistake Pakistani students make is comparing unrelated fields. For example, they ask: "Should I choose Pharmacy or Artificial Intelligence?". This is like comparing apples to oranges.\nBefore choosing a degree, you must pick one main domain:\n• Medical & Health\n• IT & Computers\n• Business & Finance\n• Law\n• Arts & Creative Design\nOnce you pick one domain, you only look at degrees inside that area. This makes your choice much easier.',
      'Step 2: Understand Your Personality\nYour career must match your natural strengths:\n• If you are outgoing (Extrovert): If you love talking to people, sharing ideas, and convincing others, you will do great in Business, Sales, Marketing, or Law.\n• If you are quiet (Introvert): If you like to work alone, solve math problems, write, or do deep research, you will thrive in IT, Software Engineering, or Analytics.',
      'Step 3: Be Real About Time and Money\nAsk yourself how much time and money you can invest:\n• The Long Path: Becoming a doctor (MBBS) takes 10 to 12 years of hard study, house jobs, and specializations before you become financially stable. Ask yourself if your family can support you for this long.\n• The Fast Path: If your family needs financial support quickly, classical medical paths are not for you. Instead, choose IT, computer skills, or technical education. In IT, if you have good skills, you can start earning online even during your college years.',
      'Step 4: Look for "Real Market Need" (Scope)\nIn Pakistan, people always ask: "Is there scope in this degree?". Scope simply means need. If the society needs a service, a job will always exist.\nYou also have to think about where you live. For example, a clinical psychologist can have a great career in a big city, but they might struggle to find customers in a small village where there is no awareness. Be ready to move where the need is.',
      'Step 5: Stop Chasing "Job Security"\nMany parents force children into fields because they think government or medical jobs are 100% secure. But today, absolute job security does not exist in any profession.\nRemember: "Your degree is just the starting line — your skills and action will take you to the finish". Focus on learning real, practical skills rather than just getting a piece of paper.',
      'Simple Checklist for You:\n• Choose one main field (like IT, Business, or Health).\n• Check your personality (do you love talking to people or working alone?).\n• Decide your timeline (do you need to earn in 3 years or can you wait 10 years?).\n• Learn a practical skill alongside your degree.',
      'and then after that, add these words.\nhappy\nand it is on the understanding and the beautiful end of the disclosure.\nYou can invite me to write the first post.'
    ]
  },
  {
    id: 'nust-fast-mdcat-prep-2026',
    title: 'How to Prepare for NUST NET, FAST, MDCAT & ECAT Entry Tests in 2026',
    category: 'Entry Tests',
    readTime: '6 min read',
    date: 'August 2026',
    author: 'Dreampath Education Team',
    excerpt: 'A comprehensive, step-by-step strategy for Pakistani students preparing for top engineering, medical, and computing entrance exams.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Focus 70% of study time on Textbook MCQs (Punjab / Sindh / KPK boards)',
      'Practice past papers under strict exam timer conditions',
      'Understand negative marking rules for FAST and NUST tests'
    ],
    content: [
      'Entry tests in Pakistan decide university admissions for over 300,000 students every year. Whether you are targeting NUST, FAST-NUCES, GIKI, UET, or MDCAT, a structured study timeline is essential.',
      '1. Master Textbook Fundamentals: Board textbook lines are the source of over 80% of entry test MCQs. Avoid relying solely on academy guidebooks without reading your official provincial textbooks first.',
      '2. Time Management & Speed Drills: NUST NET gives you 180 minutes for 200 MCQs. You have less than 54 seconds per question. Train your mental math for basic physics and chemistry calculations.',
      '3. Negative Marking Awareness: FAST deducts marks for incorrect answers in math and analytical sections. Never blind-guess when negative marking is enforced.',
      '4. Mock Test Simulation: Take at least 10 full-length timed mock tests in the final two weeks leading up to your exam date.'
    ]
  },
  {
    id: 'top-10-high-paying-cs-ai-degrees',
    title: 'Top 10 High-Paying Computer Science & AI Degrees in Pakistan for 2026',
    category: 'Computer Science',
    readTime: '8 min read',
    date: 'July 2026',
    author: 'Tech Career Desk',
    excerpt: 'Detailed comparison of BS Computer Science, Software Engineering, Artificial Intelligence, Cybersecurity, and Data Science scope and salary expectations.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'BS CS offers the broadest versatility across global tech markets',
      'AI & Data Science graduates are seeing 35% higher starting salaries in foreign remote roles',
      'Hands-on portfolio projects matter more than GPA when landing your first software job'
    ],
    content: [
      'The Pakistani IT sector exported over $3 Billion in services in 2025. Selecting the right computing degree sets the trajectory for your software engineering or tech career.',
      '1. BS Computer Science (BS CS): The gold standard. Teaches theoretical foundations, algorithms, systems design, and problem solving applicable to any tech domain.',
      '2. BS Software Engineering (BS SE): Focuses heavily on the software development lifecycle, testing, architecture, and project management.',
      '3. BS Artificial Intelligence & Data Science: Specializes in Machine Learning, Deep Learning, MLOps, Big Data pipelines, and predictive analytics.',
      '4. Salary Trends: Entry-level software developers in Lahore, Karachi, and Islamabad start at PKR 80,000 to 180,000/month, while remote foreign developers earn $1,000 to $3,500/month.'
    ]
  },
  {
    id: 'hec-ehsaas-scholarships-guide',
    title: 'Complete Guide to HEC, Ehsaas & PEEF Scholarships in Pakistan',
    category: 'Scholarships',
    readTime: '7 min read',
    date: 'August 2026',
    author: 'Financial Aid Advisory',
    excerpt: 'Learn how to secure fully-funded undergraduate scholarships, tuition fee waivers, and monthly stipends at public and private Pakistani universities.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Ehsaas Undergraduate Scholarship covers 100% tuition + PKR 4,000 monthly stipend',
      'PEEF (Punjab Educational Endowment Fund) offers need-plus-merit aid across all provinces',
      'Apply early before official university admission deadline closes'
    ],
    content: [
      'Financial constraints should never stop a talented student from pursuing higher education in Pakistan. Millions of Rupees in government and institutional scholarships go unclaimed every year.',
      '1. HEC Need-Based Scholarships: Available at over 60 public universities across Pakistan. Covers full tuition and living expenses for deserving families.',
      '2. PEEF Master & Undergraduate Programs: Special quota for orphans, children of grade 1-4 government employees, and minority students.',
      '3. University Financial Aid Offices: NUST (NEED Initiative), FAST (Financial Assistance), IBA Karachi (National Talent Hunt Program), and LUMS (NOP) offer up to 100% financial aid.'
    ]
  },
  {
    id: 'fsc-pre-medical-options-beyond-mbbs',
    title: 'FSc Pre-Medical Career Paths Beyond MBBS: BDS, Pharm-D, DPT & Biotech',
    category: 'Medical',
    readTime: '9 min read',
    date: 'July 2026',
    author: 'Health Sciences Wing',
    excerpt: 'Couldn’t get into MBBS? Discover lucrative and high-impact health science degrees like Pharmacy, Physiotherapy, MLT, and Bioinformatics.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Pharm-D graduates have massive global opportunities in pharma R&D and hospital clinical roles',
      'DPT (Doctor of Physical Therapy) is seeing explosive growth in sports medicine and rehabilitation',
      'Biotechnology & Bioinformatics bridge biology with high-paying data science'
    ],
    content: [
      'Over 180,000 students take MDCAT annually in Pakistan, but only ~18,000 MBBS/BDS seats exist nationwide. Missing an MBBS seat is not the end of a successful medical career.',
      '1. Doctor of Pharmacy (Pharm-D): 5-year professional degree. Career options include industrial pharmaceutical manufacturing, drug inspection, clinical hospital pharmacy, and regulatory affairs.',
      '2. Doctor of Physical Therapy (DPT): 5-year clinical degree. Physical therapists run independent private clinics, work in orthopedic hospitals, and guide sports teams.',
      '3. BS Medical Laboratory Technology (MLT) & Radiology: 4-year allied health degrees with instant job placement in diagnostic centers and hospitals.',
      '4. BS Biotechnology & Genetics: Prepares students for international scientific research, gene editing, vaccine manufacturing, and agricultural science.'
    ]
  },
  {
    id: 'freelancing-skills-for-pakistani-students',
    title: 'Top 5 Freelancing & Tech Skills Pakistani Students Can Learn in College',
    category: 'Skills & Freelancing',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Digital Skills Team',
    excerpt: 'How to earn $300 to $1,500/month while studying by mastering UI/UX design, Web Development, Copywriting, Video Editing, or Digital Marketing.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'UI/UX design with Figma offers quick client acquisition on Upwork and Fiverr',
      'Web development with React & Tailwind CSS enables high-ticket freelance projects',
      'Consistent daily practice for 90 days is required before taking client orders'
    ],
    content: [
      'Pakistan ranks among the top 4 freelancing nations globally. For university students, acquiring a marketable skill provides financial independence and real-world experience.',
      '1. Front-End Web Development (HTML/CSS, Tailwind, React, Next.js): Build responsive websites for local businesses and foreign clients.',
      '2. UI/UX Design (Figma): Design web and mobile app interfaces. Highly sought after by tech startups.',
      '3. Video Editing & Motion Graphics (Premiere Pro, After Effects): YouTube content creators and TikTok brands constantly hire video editors.',
      '4. Python & AI Automation: Build web scrapers, chatbots, and automated workflows for businesses.'
    ]
  },
  {
    id: 'study-abroad-scholarships-pakistani-students',
    title: 'How to Win Fully Funded Scholarships to Study Abroad in 2026',
    category: 'Study Abroad',
    readTime: '10 min read',
    date: 'June 2026',
    author: 'Global Mobility Desk',
    excerpt: 'Step-by-step roadmap for Erasmus Mundus, Chevening, Fulbright, Turkiye Burslari, and Chinese Government Scholarships (CSC).',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Start preparing your Statement of Purpose (SOP) 6 months before application deadlines',
      'Maintain CGPA above 3.2 for Master scholarship eligibility',
      'Secure strong recommendation letters from university professors'
    ],
    content: [
      'Studying abroad on a full scholarship is a dream for thousands of Pakistani graduates. Foreign governments award thousands of all-inclusive grants annually.',
      '1. Erasmus Mundus (Europe): Fully funded Master program allowing you to study across 2-3 European countries.',
      '2. Turkiye Burslari Scholarship: Covers 100% tuition, monthly stipend, accommodation, Turkish language course, and return flight tickets.',
      '3. Chinese Government Scholarship (CSC): Fully funded undergraduate and postgraduate seats in top ranked Chinese universities.',
      '4. Fulbright Scholarship (USA): Premier award for Master’s and PhD studies in the United States.'
    ]
  }
];

export const BLOG_CATEGORIES = [
  'All',
  'Career Guidance',
  'Computer Science',
  'Engineering',
  'Medical',
  'Business',
  'Scholarships',
  'Universities',
  'Entry Tests',
  'Study Abroad',
  'Skills & Freelancing'
];

interface BlogProps {
  onOpenAssessment: () => void;
  onBookAppointment: () => void;
}

export default function Blog({ onOpenAssessment, onBookAppointment }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Custom comments state per post
  const [commentsMap, setCommentsMap] = useState<Record<string, BlogComment[]>>(() => {
    const initial: Record<string, BlogComment[]> = {};
    BLOG_POSTS.forEach(p => {
      if (p.comments) {
        initial[p.id] = [...p.comments];
      }
    });
    return initial;
  });

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentText.trim()) return;

    const newComment: BlogComment = {
      id: Date.now().toString(),
      author: commentName.trim() || 'Guest Student',
      role: 'Community Reader',
      text: commentText.trim(),
      date: 'Just now'
    };

    setCommentsMap(prev => ({
      ...prev,
      [activePost.id]: [...(prev[activePost.id] || []), newComment]
    }));

    setCommentName('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex justify-center mb-4">
          <LogoImage className="h-16 md:h-20 w-auto object-contain" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-extrabold text-xs uppercase tracking-widest mb-4 shadow-xs"
        >
          <BookOpen size={14} className="text-indigo-600" />
          <span>Dreampath AI Knowledge Hub</span>
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight font-display mb-4">
          Dreampath AI <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">Career & Education Blog</span>
        </h1>
        
        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
          Practical guidance about degrees, universities, scholarships, entry tests, careers, technology, and studying in Pakistan and abroad.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200/80 shadow-md mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search articles, entry tests, scholarships, CS degrees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <BookOpen className="mx-auto text-slate-300 mb-3" size={48} />
          <h3 className="text-lg font-bold text-slate-700">No articles found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your search query or choosing another category filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-extrabold rounded-lg">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">{post.author}</span>
                  <button
                    onClick={() => setActivePost(post)}
                    className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-extrabold text-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* CTA Box inside Blog */}
      <div className="mt-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden border border-indigo-500/20">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-black uppercase tracking-widest inline-block mb-3">
            Free Career Guidance
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white mb-2">
            Ready to find your ideal career degree?
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Take our free 12-question self-assessment test to receive a personalized report matching your academic marks and career goals in Pakistan.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onOpenAssessment}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🎯 Start Free Assessment</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onBookAppointment}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📅 1-to-1 Career Counseling</span>
          </button>
        </div>
      </div>

      {/* Full Article Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8 relative max-h-[90vh] flex flex-col"
            >
              <div className="relative h-64 md:h-80 bg-slate-900 shrink-0">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-all cursor-pointer z-20"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] uppercase font-extrabold tracking-wider rounded-md inline-block mb-2">
                    {activePost.category}
                  </span>
                  <h2 className="text-xl md:text-3xl font-black leading-tight font-display">
                    {activePost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-slate-300 text-xs font-semibold mt-2">
                    <span>{activePost.author}</span>
                    <span>•</span>
                    <span>{activePost.date}</span>
                    <span>•</span>
                    <span>{activePost.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
                {/* Key Takeaways Box */}
                <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-5">
                  <h4 className="font-extrabold text-indigo-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles size={16} className="text-indigo-600" />
                    Key Takeaways for Students
                  </h4>
                  <ul className="space-y-2">
                    {activePost.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-indigo-950 font-medium">
                        <CheckCircle size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Roadmap for 5 Simple Steps */}
                {activePost.id === '5-simple-steps-to-choose-the-right-career' && (
                  <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-indigo-500/30">
                    <h4 className="text-xs font-black uppercase tracking-widest text-teal-400 mb-4 text-center font-display">
                      🧭 Clean Visual Career Decision Roadmap
                    </h4>
                    <div className="flex flex-col items-center max-w-xs mx-auto space-y-2">
                      {[
                        { title: 'Interests', desc: 'Know what you enjoy' },
                        { title: 'Budget', desc: 'Check family support & costs' },
                        { title: 'Lifestyle', desc: 'Think about daily life' },
                        { title: 'Study Time', desc: 'Check degree duration' },
                        { title: 'Future Opportunities', desc: 'Research market demand' },
                        { title: 'Make Your Decision', desc: 'Choose with confidence' }
                      ].map((step, idx, arr) => (
                        <React.Fragment key={step.title}>
                          <div className="w-full bg-slate-800/90 border border-slate-700/80 px-4 py-3 rounded-2xl text-center shadow-sm">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 block mb-0.5">Step {idx + 1}</span>
                            <h5 className="font-bold text-sm text-white">{step.title}</h5>
                            <p className="text-[11px] text-slate-400 font-medium">{step.desc}</p>
                          </div>
                          {idx < arr.length - 1 && (
                            <div className="text-teal-400 font-bold text-sm my-0.5">↓</div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Body Content */}
                <div className="space-y-4">
                  {activePost.content.map((para, i) => (
                    <p key={i} className="text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Article Footer CTA */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Need help choosing your degree?</h5>
                    <p className="text-slate-500 text-xs">Let Dreampath AI analyze your academic background in 2 minutes.</p>
                  </div>
                  <button
                    onClick={() => { setActivePost(null); onOpenAssessment(); }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer shrink-0"
                  >
                    Take Free Assessment
                  </button>
                </div>

                {/* Reader Comments Section */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-extrabold text-slate-900 text-base font-display">
                      Community Discussion & Comments ({commentsMap[activePost.id]?.length || 0})
                    </h4>
                    <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full">
                      Join the Conversation
                    </span>
                  </div>

                  {/* List of Comments */}
                  <div className="space-y-3 mb-6">
                    {(commentsMap[activePost.id] || []).length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl">
                        No comments yet. Be the first to share your thoughts on this guide!
                      </p>
                    ) : (
                      (commentsMap[activePost.id] || []).map((comment, index) => (
                        <div key={comment.id} className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                                {comment.author.charAt(0)}
                              </span>
                              <div>
                                <span className="font-bold text-slate-900 text-xs">{comment.author}</span>
                                <span className="text-[10px] text-slate-400 block font-medium">{comment.role}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{comment.date}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed mt-2 pl-9">
                            {comment.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment} className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-3">
                    <h5 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Leave a Comment</h5>
                    
                    {commentSubmitted && (
                      <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
                        ✓ Your comment has been posted!
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Ali Ahmed)"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <input
                        type="text"
                        placeholder="Your Student Role / City (e.g. FSc Student)"
                        readOnly
                        value="Dreampath Community Student"
                        className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed"
                      />
                    </div>

                    <textarea
                      rows={3}
                      required
                      placeholder="Write your question, feedback, or thoughts on this article..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />

                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>

                {/* Discover Other Blogs Section */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base font-display">
                        Discover Other Career Articles & Guides
                      </h4>
                      <p className="text-xs text-slate-500">Explore more guides on entry tests, scholarships, and degree choices:</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BLOG_POSTS.filter(p => p.id !== activePost.id).slice(0, 4).map((post) => (
                      <div
                        key={post.id}
                        onClick={() => { setActivePost(post); }}
                        className="bg-slate-50 hover:bg-indigo-50/50 p-3.5 rounded-2xl border border-slate-200/80 transition-all cursor-pointer group flex gap-3 items-center"
                      >
                        <img src={post.image} alt={post.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-wider block">{post.category}</span>
                          <h5 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 line-clamp-2 leading-snug transition-colors">
                            {post.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 mt-1 block">{post.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
