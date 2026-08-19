import { DomainType, Degree, DomainInfo } from './types';
import { ARTS_DEGREES } from './artsDegrees';
import { LAW_DEGREES } from './lawDegrees';
import { BUSINESS_DEGREES } from './businessDegrees';

export const DOMAINS: DomainInfo[] = [
  {
    type: DomainType.HEALTH,
    color: 'emerald',
    icon: 'Stethoscope',
    description: 'Health, Medical, Pharmacy & Clinical Specialties',
  },
  {
    type: DomainType.TECHNOLOGY,
    color: 'blue',
    icon: 'Laptop',
    description: 'Computing, IT, AI, Software & Digital Technologies',
  },
  {
    type: DomainType.ENGINEERING,
    color: 'orange',
    icon: 'Settings',
    description: 'Electrical, Mechanical, Civil & Specialized Engineering',
  },
  {
    type: DomainType.BUSINESS,
    color: 'purple',
    icon: 'Briefcase',
    description: 'Management, Accounting, Finance & Corporate Business',
  },
  {
    type: DomainType.LAW,
    color: 'slate',
    icon: 'Scale',
    description: 'Legal Studies, Corporate Law & Public Policies',
  },
  {
    type: DomainType.NATURAL_SCIENCES,
    color: 'teal',
    icon: 'FlaskConical',
    description: 'Chemistry, Biotech, Physics, Math & Life Sciences',
  },
  {
    type: DomainType.SOCIAL_SCIENCES,
    color: 'indigo',
    icon: 'Users',
    description: 'Economics, Psychology, Media & Sociological Studies',
  },
  {
    type: DomainType.ARTS,
    color: 'rose',
    icon: 'Palette',
    description: 'Design, Fine Arts, Humanities & Languages',
  },
];

export const DEGREES: Degree[] = [
  {
    "id": "mlt-cert",
    "title": "Medical Laboratory Technology (MLT Certificate)",
    "domain": DomainType.HEALTH,
    "duration": "1-2 Year Skill / Fast Track",
    "category": "Skill",
    "description": [
      "An entry-level allied health qualification that trains students to collect and process lab samples and run basic diagnostic tests.",
      "Covers hematology, clinical chemistry and microbiology at a technician level, under the Allied Health Professionals Council (AHPC).",
      "The fastest, lowest-cost route into Pakistan's fast-growing diagnostics industry."
    ],
    "subjects": [
      "Basic hematology and blood counts",
      "Clinical chemistry testing",
      "Microbiology and specimen handling",
      "Blood banking basics",
      "Phlebotomy (blood drawing)",
      "Lab safety and quality control",
      "Histopathology sample preparation",
      "Basic lab equipment operation"
    ],
    "marketReality": [
      "Private diagnostic chains (Chughtai Lab, Excel Labs, Islamabad Diagnostic Centre) are expanding rapidly across cities.",
      "AHPC registration became mandatory for all lab staff in 2026, formalizing the profession and its pay scales.",
      "Entry demand is strong in hospitals, blood banks and small-town diagnostic labs.",
      "Certificate holders with a few years of experience can bridge into BS MLT for higher pay."
    ],
    "jobRoles": [
      "Lab Technician",
      "Phlebotomist",
      "Blood Bank Assistant",
      "Histo-Technician Assistant",
      "Quality Control Assistant"
    ],
    "keySectors": [
      "Diagnostic labs",
      "Hospitals",
      "Blood banks",
      "Research labs",
      "Gulf healthcare (with attestation)"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "25,000 – 40,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "40,000 – 70,000 PKR"
      },
      {
        "level": "Senior / Supervisor",
        "salary": "70,000 – 120,000 PKR"
      },
      {
        "level": "Gulf / International",
        "salary": "$700 – $1,200/month"
      }
    ],
    "skills": [
      "Sample collection and phlebotomy",
      "Lab instrument handling",
      "Basic hematology and chemistry procedures",
      "Quality control protocols",
      "Attention to detail",
      "Teamwork under hospital pressure"
    ],
    "universities": [
      "University of Health Sciences Lahore (Paramedical Institute)",
      "Dow University of Health Sciences Karachi",
      "King Edward Medical University Paramedical Institute",
      "Jinnah Postgraduate Medical Centre Paramedical Institute",
      "Services Institute of Medical Sciences Lahore",
      "Allama Iqbal Medical College Paramedical Institute",
      "Provincial Health Department training schools"
    ],
    "strategy": [
      "MLT Certificate → Lab Technician → Lab Supervisor",
      "MLT Certificate → BS MLT (bridging) → Lab Manager",
      "MLT Certificate → AHPC registration → Gulf lab job"
    ],
    "chooseIf": [
      "You want the fastest, cheapest entry into healthcare",
      "You enjoy precise, hands-on lab work",
      "You are comfortable with routine, detail-heavy tasks"
    ],
    "avoidIf": [
      "You want a high starting salary immediately",
      "You dislike repetitive daily procedures",
      "You want direct, ongoing patient interaction"
    ],
    "roadmap": [
      {
        "year": "Year 1-2",
        "milestone": "Complete MLT Certificate and AHPC registration"
      }
    ],
    "startupOps": [
      "Home sample-collection service",
      "Small diagnostic lab franchise",
      "Mobile blood-testing service for housing societies"
    ],
    "summary": "MLT is the fastest bridge into Pakistan's healthcare sector — use it as a stepping stone toward a BS and AHPC registration."
  },
  {
    "id": "htc-cert",
    "title": "Health Technician (HTC)",
    "domain": DomainType.HEALTH,
    "duration": "1-2 Year Skill / Fast Track",
    "category": "Skill",
    "description": [
      "A generalist allied health qualification for community-level care, vaccination and basic diagnostics.",
      "Trains staff for Basic Health Units (BHUs) and Rural Health Centres (RHCs), especially outside major cities.",
      "A key pillar of Pakistan's public rural healthcare network."
    ],
    "subjects": [
      "Community health basics",
      "First aid and emergency care",
      "Vaccination and EPI programs",
      "Maternal and child health",
      "Basic pharmacology",
      "Vital signs monitoring",
      "Health education and awareness",
      "Disease prevention and control"
    ],
    "marketReality": [
      "High and steady demand in Basic Health Units and Rural Health Centres across Punjab, Sindh and KP.",
      "Recruitment mainly runs through provincial health department government scales (BPS).",
      "NGO and public health vaccination campaigns regularly hire trained health technicians.",
      "Pay is modest but the job is stable and government-backed."
    ],
    "jobRoles": [
      "Health Technician",
      "BHU Technician",
      "Vaccinator / EPI Technician",
      "Community Health Officer",
      "Facility Records Assistant"
    ],
    "keySectors": [
      "Basic Health Units",
      "Rural Health Centres",
      "NGOs and vaccination programs",
      "Provincial health departments",
      "Community clinics"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "25,000 – 35,000 PKR"
      },
      {
        "level": "Mid Level (BPS scale)",
        "salary": "35,000 – 55,000 PKR"
      },
      {
        "level": "Senior Technician",
        "salary": "55,000 – 90,000 PKR"
      },
      {
        "level": "Facility In-Charge",
        "salary": "90,000 – 150,000 PKR"
      }
    ],
    "skills": [
      "Basic patient assessment",
      "Vaccination technique",
      "Health record keeping",
      "Community communication",
      "First aid response",
      "Basic diagnostic support"
    ],
    "universities": [
      "Provincial Health Department Training Schools",
      "University of Health Sciences Lahore",
      "Khyber Medical University Peshawar (allied programs)",
      "Peoples Medical University Nawabshah",
      "District Health Training Institutes",
      "Bolan Medical College Quetta"
    ],
    "strategy": [
      "HTC → BHU Technician → Charge Technician",
      "HTC → Charge Technician → Health Facility In-Charge",
      "HTC → Further diploma → Allied Health BS bridging"
    ],
    "chooseIf": [
      "You want to serve rural or underserved communities",
      "You want a fast, secure route into government service",
      "You are interested in public health work"
    ],
    "avoidIf": [
      "You want urban private-sector pay",
      "You want an advanced clinical scope of practice",
      "You are unwilling to work in remote postings"
    ],
    "roadmap": [
      {
        "year": "Year 1-2",
        "milestone": "Complete Health Technician diploma and secure government or NGO placement"
      }
    ],
    "startupOps": [
      "Private clinic assistant services in villages",
      "Community health awareness NGO",
      "Mobile vaccination and screening camps"
    ],
    "summary": "HTC offers one of the most stable, service-oriented routes into government healthcare for rural Pakistan."
  },
  {
    "id": "pharmacy-assistant",
    "title": "Pharmacy Assistant",
    "domain": DomainType.HEALTH,
    "duration": "1-2 Year Skill / Fast Track",
    "category": "Skill",
    "description": [
      "A technical qualification for supporting licensed pharmacists in dispensing and retail pharmacy operations.",
      "Focuses on drug store management rather than clinical prescribing, which requires a Pharm.D.",
      "The most accessible entry point into Pakistan's booming retail pharmacy sector."
    ],
    "subjects": [
      "Basic pharmacology",
      "Dispensing procedures",
      "Drug store management",
      "Inventory and billing",
      "Prescription reading",
      "Basic drug interactions",
      "Customer service",
      "Pharmacy law basics"
    ],
    "marketReality": [
      "Retail pharmacy chains (D.Watson, Servaid, Fazal Din's) are expanding into most major cities.",
      "This is one of the easiest entry-level jobs in the pharmaceutical retail sector.",
      "Hospital pharmacies and medical stores also hire assistants for daily operations.",
      "Experienced assistants often move into store management roles."
    ],
    "jobRoles": [
      "Pharmacy Assistant",
      "Retail Store Manager",
      "Medical Store Salesperson",
      "Drug Inventory Clerk",
      "Hospital Pharmacy Assistant"
    ],
    "keySectors": [
      "Retail pharmacy chains",
      "Hospital pharmacies",
      "Medical stores",
      "Pharmaceutical distribution companies",
      "Wholesale drug suppliers"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "25,000 – 35,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "35,000 – 55,000 PKR"
      },
      {
        "level": "Store Manager",
        "salary": "55,000 – 90,000 PKR"
      },
      {
        "level": "Multi-Store / Regional",
        "salary": "90,000 – 150,000 PKR"
      }
    ],
    "skills": [
      "Drug and product knowledge",
      "Customer service",
      "Cash handling",
      "Inventory management",
      "Attention to detail",
      "Basic prescription literacy"
    ],
    "universities": [
      "TEVTA Punjab Technical Institutes",
      "STEVTA Sindh Technical Institutes",
      "Punjab Vocational Training Council institutes",
      "Private pharmacy technician institutes",
      "Aga Khan allied health short programs"
    ],
    "strategy": [
      "Pharmacy Assistant → Store Manager → Regional Retail Manager",
      "Pharmacy Assistant → Save capital → Own Medical Store",
      "Pharmacy Assistant → Bridge study → Pharm.D (Licensed Pharmacist)"
    ],
    "chooseIf": [
      "You want a quick job in the growing retail health sector",
      "You enjoy customer-facing, sales-oriented work",
      "You want a realistic path to eventually owning a store"
    ],
    "avoidIf": [
      "You want to prescribe or clinically counsel patients",
      "You want a high starting salary",
      "You want a purely clinical career"
    ],
    "roadmap": [
      {
        "year": "Year 1-2",
        "milestone": "Complete Pharmacy Assistant diploma and enter retail pharmacy"
      }
    ],
    "startupOps": [
      "Own small medical store (with a licensed pharmacist on record)",
      "Online medicine delivery service",
      "Health and wellness product retail"
    ],
    "summary": "Pharmacy Assistant is a low-cost, fast entry into Pakistan's growing pharma retail sector, with a realistic path to ownership."
  },
  {
    "id": "bs-nursing",
    "title": "BS Nursing",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "A professional nursing degree covering clinical and community-based patient care, regulated by the Pakistan Nursing Council (PNC).",
      "Prepares graduates as Registered Nurses eligible to work in hospitals worldwide.",
      "One of the most reliable degrees for guaranteed employment and international migration in 2026."
    ],
    "subjects": [
      "Anatomy and physiology",
      "Medical-surgical nursing",
      "Community health nursing",
      "Pharmacology",
      "Maternal and child health nursing",
      "Psychiatric nursing",
      "Nursing research",
      "Supervised clinical practicum"
    ],
    "marketReality": [
      "Pakistan faces a severe nursing shortage, keeping local demand consistently high.",
      "Huge overseas demand in the UK, Gulf and Ireland through NMC and DataFlow verification.",
      "Private hospital chains are expanding ICU, ER and specialty nursing roles.",
      "Nursing is one of the very few Pakistani degrees with a nearly guaranteed international migration path."
    ],
    "jobRoles": [
      "Registered Nurse",
      "ICU / ER Nurse",
      "Community Health Nurse",
      "Nurse Educator",
      "Nurse Manager"
    ],
    "keySectors": [
      "Public and private hospitals",
      "Armed Forces Nursing Service",
      "NGOs and community health programs",
      "Overseas hospitals (UK / Gulf / Ireland)"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 70,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 150,000 PKR"
      },
      {
        "level": "Senior / Head Nurse",
        "salary": "150,000 – 300,000 PKR"
      },
      {
        "level": "Gulf / UK International",
        "salary": "$900 – $2,500/month"
      }
    ],
    "skills": [
      "Clinical patient assessment",
      "Medication administration",
      "Emergency response",
      "Documentation and reporting",
      "Communication and empathy",
      "Working under pressure"
    ],
    "universities": [
      "Aga Khan University School of Nursing and Midwifery",
      "Shifa College of Nursing Islamabad",
      "University of Health Sciences Lahore",
      "Dow University of Health Sciences Karachi",
      "Fatima Memorial College of Nursing Lahore",
      "Ziauddin University College of Nursing",
      "Lahore School of Nursing"
    ],
    "strategy": [
      "BS Nursing → Registered Nurse → Charge Nurse → Nursing Superintendent",
      "BS Nursing → PNC license → OET/NCLEX → migrate abroad",
      "BS Nursing → MSN → Nurse Educator or Nurse Practitioner"
    ],
    "chooseIf": [
      "You want stable, in-demand work with strong migration options",
      "You genuinely enjoy hands-on patient care",
      "You can handle physically and emotionally demanding shifts"
    ],
    "avoidIf": [
      "You are uncomfortable with night shifts or physical work",
      "You are squeamish around blood or illness",
      "You want a purely desk-based career"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS Nursing and clinical practicum"
      },
      {
        "year": "Year 5",
        "milestone": "PNC Registration and begin hospital practice or international licensing (OET/NCLEX)"
      }
    ],
    "startupOps": [
      "Home nursing care service",
      "Nursing training and coaching academy",
      "Elderly/post-surgical home care agency"
    ],
    "summary": "BS Nursing is Pakistan's most reliable route to guaranteed employment and international migration in 2026."
  },
  {
    "id": "bs-mlt",
    "title": "BS Medical Laboratory Technology",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "An advanced diagnostic-science degree with far greater scope than the MLT certificate, regulated by AHPC.",
      "Trains graduates to run and manage complex hematology, microbiology and molecular diagnostic testing.",
      "Positioned to benefit directly from Pakistan's expanding diagnostic-lab industry."
    ],
    "subjects": [
      "Clinical biochemistry",
      "Hematology and blood banking",
      "Microbiology and parasitology",
      "Histopathology and cytology",
      "Molecular diagnostics (PCR)",
      "Immunology",
      "Laboratory quality management",
      "Research methodology"
    ],
    "marketReality": [
      "Diagnostic chains are expanding fast and need degree-level lab scientists, not just technicians.",
      "Molecular/PCR testing demand grew sharply after COVID-19 and remains strong.",
      "AHPC registration is now mandatory, formalizing pay scales and career structure.",
      "Gulf diagnostic labs actively recruit AHPC-registered Pakistani lab scientists."
    ],
    "jobRoles": [
      "Medical Lab Scientist",
      "Molecular Diagnostics Technologist",
      "Histopathology Technologist",
      "Lab Quality Manager",
      "Lab Supervisor"
    ],
    "keySectors": [
      "Diagnostic lab chains",
      "Hospital laboratories",
      "Research institutes",
      "Pharmaceutical QC labs",
      "Gulf diagnostic labs"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 130,000 PKR"
      },
      {
        "level": "Senior / Lab Manager",
        "salary": "130,000 – 220,000 PKR"
      },
      {
        "level": "Gulf / International",
        "salary": "$1,000 – $2,000/month"
      }
    ],
    "skills": [
      "PCR, ELISA and analyzer operation",
      "Quality control protocols",
      "Data analysis and reporting",
      "Sample handling procedures",
      "Result interpretation",
      "Attention to detail"
    ],
    "universities": [
      "University of Health Sciences Lahore",
      "Dow University of Health Sciences Karachi",
      "Khyber Medical University Peshawar",
      "Aga Khan University",
      "Ziauddin University Karachi",
      "Isra University Hyderabad",
      "Sargodha Medical College"
    ],
    "strategy": [
      "BS MLT → AHPC registration → Lab Scientist → Lab Manager",
      "BS MLT → MPhil/MS → Research Scientist",
      "BS MLT → Gulf certification → Overseas Lab Scientist"
    ],
    "chooseIf": [
      "You enjoy precise, scientific lab work",
      "You are interested in diagnostics and pathology",
      "You want the option of research later"
    ],
    "avoidIf": [
      "You want direct, ongoing patient interaction",
      "You dislike spending years in a lab environment",
      "You want a quick, low-study entry job"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS MLT, clinical rotations and AHPC registration"
      }
    ],
    "startupOps": [
      "Independent diagnostic laboratory",
      "Mobile sample-collection network",
      "Lab quality consultancy for smaller clinics"
    ],
    "summary": "BS MLT rides Pakistan's diagnostic-testing boom with a strong, AHPC-backed career structure."
  },
  {
    "id": "bs-microbiology",
    "title": "BS Microbiology",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "A science degree studying bacteria, viruses and fungi — the foundation for research, diagnostics, pharma QC and food safety.",
      "Strong pipeline into postgraduate study (MPhil/PhD) both locally and abroad.",
      "Directly feeds Pakistan's growing biotech, pharma and food-industry quality sectors."
    ],
    "subjects": [
      "Bacteriology",
      "Virology",
      "Mycology",
      "Immunology",
      "Molecular biology",
      "Food and industrial microbiology",
      "Environmental microbiology",
      "Biostatistics and research methods"
    ],
    "marketReality": [
      "Pharmaceutical companies need microbiologists for quality control and assurance.",
      "Food safety regulation is expanding, creating new QA roles in the food industry.",
      "HEC-funded research institutes (NIH, PCSIR) regularly hire research assistants.",
      "A strong stepping stone into local and international postgraduate programs."
    ],
    "jobRoles": [
      "Microbiologist",
      "QC/QA Analyst (pharma or food)",
      "Research Assistant",
      "Lab Scientist",
      "Food Safety Officer"
    ],
    "keySectors": [
      "Pharmaceutical companies",
      "Food industry",
      "Research institutes (NIH, PCSIR)",
      "Diagnostic labs",
      "Academia"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 55,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "55,000 – 100,000 PKR"
      },
      {
        "level": "Senior / QA Manager",
        "salary": "100,000 – 180,000 PKR"
      },
      {
        "level": "Research Abroad / PhD track",
        "salary": "200,000 – 450,000 PKR"
      }
    ],
    "skills": [
      "Microbial culture techniques",
      "Molecular biology methods",
      "Laboratory safety",
      "Data analysis",
      "Scientific writing",
      "Critical thinking"
    ],
    "universities": [
      "Quaid-i-Azam University Islamabad",
      "University of the Punjab",
      "University of Karachi",
      "COMSATS University Islamabad",
      "GC University Lahore",
      "University of Agriculture Faisalabad",
      "NUST Islamabad"
    ],
    "strategy": [
      "BS Microbiology → MPhil/MS → PhD / Research Scientist",
      "BS Microbiology → QC Analyst → QA Manager (pharma)",
      "BS Microbiology → Food Safety Officer → Regulatory Consultant"
    ],
    "chooseIf": [
      "You are fascinated by microorganisms and lab science",
      "You want a research or academic career path",
      "You are interested in pharma or food-industry QC"
    ],
    "avoidIf": [
      "You want a quick, clinical, patient-facing job",
      "You don't enjoy long hours of lab or research work",
      "You need immediate high income after graduation"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS Microbiology and senior research project"
      }
    ],
    "startupOps": [
      "Independent microbiology testing/consultancy lab",
      "Food safety certification consultancy",
      "Water quality testing service"
    ],
    "summary": "BS Microbiology best suits students aiming at research, pharma QC or further postgraduate study."
  },
  {
    "id": "bs-nutrition",
    "title": "BS Nutrition and Food Science",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "A degree covering human nutrition, dietetics and food science, riding Pakistan's growing wellness industry.",
      "Prepares graduates for both clinical dietitian roles and food-industry positions.",
      "Combines science with client-facing counseling work."
    ],
    "subjects": [
      "Human nutrition",
      "Dietetics and meal planning",
      "Food science and technology",
      "Clinical nutrition",
      "Community nutrition",
      "Food microbiology and safety",
      "Biochemistry",
      "Sports nutrition"
    ],
    "marketReality": [
      "Rising health and wellness awareness is driving demand for qualified dietitians.",
      "Food and beverage companies are expanding QA and product development teams.",
      "Hospitals are increasingly hiring dedicated clinical dietitians.",
      "Social-media nutrition coaching has opened a large new private-practice market."
    ],
    "jobRoles": [
      "Clinical Dietitian",
      "Nutrition Consultant",
      "Food Product Developer",
      "Community Nutrition Officer",
      "Quality Assurance Officer (food)"
    ],
    "keySectors": [
      "Hospitals",
      "Food and beverage companies",
      "NGOs and public health programs",
      "Fitness and wellness industry",
      "Government nutrition programs"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "30,000 – 50,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "50,000 – 90,000 PKR"
      },
      {
        "level": "Senior / Chief Dietitian",
        "salary": "90,000 – 160,000 PKR"
      },
      {
        "level": "Private Practice / Consulting",
        "salary": "150,000 – 350,000 PKR"
      }
    ],
    "skills": [
      "Diet planning and assessment",
      "Food science knowledge",
      "Client counseling",
      "Food safety standards",
      "Communication",
      "Data-based meal design"
    ],
    "universities": [
      "University of Home Economics Lahore",
      "National University of Medical Sciences",
      "University of Agriculture Faisalabad",
      "University of Karachi",
      "Government College University Faisalabad",
      "Fatima Jinnah Women University",
      "Riphah International University"
    ],
    "strategy": [
      "BS Nutrition → Clinical Dietitian → Chief Dietitian (hospital)",
      "BS Nutrition → Food Industry QA → Product Development Manager",
      "BS Nutrition → Private Practice → Online Coaching Brand"
    ],
    "chooseIf": [
      "You are passionate about health and wellness",
      "You are interested in food science and product development",
      "You enjoy counseling and working with clients"
    ],
    "avoidIf": [
      "You want a strictly clinical/medical scope",
      "You are uninterested in the food industry",
      "You dislike client-facing counseling work"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS degree and mandatory clinical internship"
      }
    ],
    "startupOps": [
      "Private nutrition consulting practice",
      "Healthy meal-prep delivery business",
      "Online diet-coaching brand"
    ],
    "summary": "BS Nutrition rides Pakistan's rising wellness wave, with doors open in both hospitals and the food industry."
  },
  {
    "id": "bs-pe-sport-science",
    "title": "BS Physical Education, Health and Sport Science",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "A degree preparing professionals for sports coaching, PE teaching, fitness training and sports management.",
      "Combines exercise science with practical teaching and coaching skills.",
      "Benefits from expanding private-school and fitness-industry demand."
    ],
    "subjects": [
      "Exercise physiology",
      "Sports psychology",
      "Biomechanics",
      "Sports coaching and training methods",
      "Health and fitness management",
      "Sports injury and first aid",
      "Sports management and administration",
      "PE curriculum and pedagogy"
    ],
    "marketReality": [
      "Private schools increasingly require qualified, degree-holding PE teachers.",
      "The urban gym and fitness industry is growing steadily in major cities.",
      "Sports federations need certified coaches and administrators.",
      "Government schools also require certified PE teachers on official pay scales."
    ],
    "jobRoles": [
      "PE Teacher",
      "Sports Coach",
      "Fitness Trainer",
      "Sports Administrator",
      "Athletic Programs Coordinator"
    ],
    "keySectors": [
      "Schools and colleges",
      "Gyms and fitness centres",
      "Sports federations",
      "Corporate wellness programs",
      "Sports academies"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "30,000 – 50,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "50,000 – 90,000 PKR"
      },
      {
        "level": "Senior / Head of Department",
        "salary": "90,000 – 150,000 PKR"
      },
      {
        "level": "Private Academy / Federation",
        "salary": "150,000 – 300,000 PKR"
      }
    ],
    "skills": [
      "Coaching technique",
      "Fitness program design",
      "Sports injury first response",
      "Leadership and communication",
      "Event management",
      "Knowledge of sports rules and regulations"
    ],
    "universities": [
      "University of the Punjab (Sports Sciences)",
      "Gomal University Dera Ismail Khan",
      "University of Education Lahore",
      "Government College University Lahore",
      "University of Sargodha",
      "Islamia University Bahawalpur",
      "National College of Physical Education Lahore"
    ],
    "strategy": [
      "BS PE → School PE Teacher → Head of Sports Department",
      "BS PE → Sports Coach → National Federation Coach",
      "BS PE → Fitness Trainer → Own Fitness Academy"
    ],
    "chooseIf": [
      "You are passionate about sports and physical fitness",
      "You enjoy teaching or coaching others",
      "You lead an active, physically engaged lifestyle"
    ],
    "avoidIf": [
      "You prefer purely desk-based work",
      "You are uninterested in physical training or teaching",
      "You want a strictly clinical healthcare role"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS PE degree and specialized coaching certifications"
      }
    ],
    "startupOps": [
      "Private fitness academy",
      "Sports coaching centre for children",
      "Online fitness coaching brand"
    ],
    "summary": "This degree suits sports-passionate individuals who want to combine teaching, coaching and fitness into one career."
  },
  {
    "id": "bs-physiology",
    "title": "BS Physiology",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "A science degree studying how the body's systems function, feeding into research, academia and pharma research careers.",
      "Provides a strong foundation for postgraduate study (MPhil/PhD).",
      "Less clinical than MBBS, but scientifically closely related to medicine."
    ],
    "subjects": [
      "Cardiovascular, renal, nervous and endocrine physiology",
      "Biochemistry",
      "Cell and molecular biology",
      "Pathophysiology",
      "Research methodology and biostatistics",
      "Basic pharmacology",
      "Exercise physiology",
      "Laboratory practicals"
    ],
    "marketReality": [
      "Most graduates move into academia or research via MPhil/PhD rather than direct industry jobs.",
      "Pharmaceutical research and clinical research organizations occasionally hire at the BS level.",
      "Expanding medical and allied health colleges are creating steady demand for physiology lecturers.",
      "Best treated as a stepping stone rather than a terminal professional qualification."
    ],
    "jobRoles": [
      "Research Assistant",
      "Physiology Lecturer (after MPhil)",
      "Clinical Research Associate",
      "Pharma Research Assistant",
      "Lab Instructor"
    ],
    "keySectors": [
      "Universities and medical colleges",
      "Pharmaceutical research companies",
      "Clinical research organizations (CROs)",
      "Research institutes"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "30,000 – 50,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "50,000 – 90,000 PKR"
      },
      {
        "level": "Senior (post-MPhil)",
        "salary": "90,000 – 160,000 PKR"
      },
      {
        "level": "PhD / Academic Abroad",
        "salary": "200,000 – 400,000 PKR"
      }
    ],
    "skills": [
      "Physiological experimentation",
      "Data analysis",
      "Scientific writing",
      "Laboratory techniques",
      "Critical thinking",
      "Teaching ability"
    ],
    "universities": [
      "University of Karachi",
      "University of the Punjab",
      "Quaid-i-Azam University Islamabad",
      "Government College University Lahore",
      "University of Health Sciences Lahore",
      "Bahauddin Zakariya University Multan",
      "University of Peshawar"
    ],
    "strategy": [
      "BS Physiology → MPhil Physiology → PhD / Lecturer",
      "BS Physiology → Clinical Research Associate → CRO Project Manager",
      "BS Physiology → Research Assistant → Academic Career"
    ],
    "chooseIf": [
      "You are interested in how the human body works at a systems level",
      "You want an academic or research-oriented career",
      "You are planning further postgraduate study"
    ],
    "avoidIf": [
      "You want direct clinical practice",
      "You want quick entry into industry without further study",
      "You need a terminal degree with immediate high pay"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS Physiology and research practicum"
      }
    ],
    "startupOps": [
      "Freelance science tutoring or content creation",
      "Physiology/biology exam-prep coaching"
    ],
    "summary": "BS Physiology is a research and academia-oriented degree, best paired with postgraduate study."
  },
  {
    "id": "bs-public-health",
    "title": "BS Public Health",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "A degree focused on population-level health, disease prevention, and health policy and program management.",
      "Feeds directly into Pakistan's large NGO and international-donor-funded health sector.",
      "Complements clinical fields by working on health at the community and system level."
    ],
    "subjects": [
      "Epidemiology",
      "Biostatistics",
      "Health policy and management",
      "Environmental health",
      "Community health",
      "Maternal and child health",
      "Health promotion and education",
      "Research methods"
    ],
    "marketReality": [
      "Pakistan's NGO and international donor sector (WHO, UNICEF, USAID-funded projects) hires steadily.",
      "Government public health programs (EPI, TB and malaria control) need trained staff.",
      "Post-COVID awareness has increased demand for epidemiology and public health roles.",
      "Career growth is strongly boosted by an MPH after the BS."
    ],
    "jobRoles": [
      "Public Health Officer",
      "Monitoring & Evaluation (M&E) Officer",
      "Health Program Coordinator",
      "Health Policy Analyst",
      "Epidemiologist (with further study)"
    ],
    "keySectors": [
      "NGOs and INGOs",
      "Government health departments",
      "UN agencies",
      "Research institutes",
      "Donor-funded health projects"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Senior",
        "salary": "120,000 – 220,000 PKR"
      },
      {
        "level": "INGO / International",
        "salary": "250,000 – 500,000 PKR"
      }
    ],
    "skills": [
      "Epidemiological analysis",
      "Statistical software (SPSS/Stata)",
      "Report and proposal writing",
      "Program management",
      "Community engagement",
      "Grant writing"
    ],
    "universities": [
      "Health Services Academy Islamabad",
      "Aga Khan University",
      "Dow University of Health Sciences",
      "Rehman Medical College Peshawar",
      "University of Health Sciences Lahore",
      "Ziauddin University Karachi",
      "Isra University Hyderabad"
    ],
    "strategy": [
      "BS Public Health → M&E Officer → Program Manager (NGO)",
      "BS Public Health → MPH → Epidemiologist / WHO Consultant",
      "BS Public Health → Government Health Department → Policy Analyst"
    ],
    "chooseIf": [
      "You are interested in population-level health rather than individual patients",
      "You want a career in NGOs or international development",
      "You enjoy data-driven policy and program work"
    ],
    "avoidIf": [
      "You want direct clinical patient care",
      "You dislike fieldwork or travel to remote areas",
      "You need a degree with quick, high starting pay"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS Public Health and secure an NGO or government internship"
      }
    ],
    "startupOps": [
      "Public health consultancy",
      "Health-awareness social enterprise",
      "Community screening and outreach service"
    ],
    "summary": "BS Public Health opens the door to Pakistan's large NGO and donor-funded health sector — an MPH accelerates it further."
  },
  {
    "id": "bs-radiologic-tech",
    "title": "BS Radiologic Technology / Medical Imaging",
    "domain": DomainType.HEALTH,
    "duration": "4-Year Professional Degree",
    "category": "Professional Health Career",
    "description": [
      "A technical degree for operating imaging equipment — X-ray, CT, MRI and ultrasound — for diagnosis, regulated by AHPC.",
      "One of the fastest-growing allied health fields as private diagnostic imaging expands.",
      "Offers strong Gulf migration prospects for trained radiographers."
    ],
    "subjects": [
      "Radiographic anatomy and positioning",
      "Radiation physics and safety",
      "CT and MRI technology",
      "Ultrasound principles",
      "Radiographic pathology",
      "Patient care in imaging",
      "Digital imaging and PACS systems",
      "Quality control procedures"
    ],
    "marketReality": [
      "Private diagnostic imaging centres are expanding rapidly in major cities.",
      "Tertiary-care hospitals need dedicated CT and MRI technologists as scanner numbers grow.",
      "AHPC registration plus radiation-safety certification is now required to practice.",
      "Gulf hospitals actively recruit trained, registered Pakistani radiographers."
    ],
    "jobRoles": [
      "X-ray Technologist / Radiographer",
      "CT Technologist",
      "MRI Technologist",
      "Ultrasound Technician",
      "Imaging Department Supervisor"
    ],
    "keySectors": [
      "Diagnostic imaging centres",
      "Hospitals",
      "Cancer and radiotherapy centres",
      "Gulf healthcare",
      "Research imaging labs"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 130,000 PKR"
      },
      {
        "level": "Senior / Supervisor",
        "salary": "130,000 – 220,000 PKR"
      },
      {
        "level": "Gulf / International",
        "salary": "$1,200 – $2,200/month"
      }
    ],
    "skills": [
      "X-ray, CT and MRI equipment operation",
      "Radiation safety protocols",
      "Patient positioning",
      "Image quality assessment",
      "PACS / digital imaging systems",
      "Attention to detail"
    ],
    "universities": [
      "University of Health Sciences Lahore",
      "Dow University of Health Sciences Karachi",
      "Aga Khan University",
      "Ziauddin University Karachi",
      "Shifa Tameer-e-Millat University Islamabad",
      "Khyber Medical University Peshawar",
      "Isra University Hyderabad"
    ],
    "strategy": [
      "BS Radiologic Technology → CT/MRI Technologist → Imaging Supervisor",
      "BS Radiologic Technology → AHPC + Gulf certification → Overseas Radiographer",
      "BS Radiologic Technology → Specialize in Ultrasound → Sonographer"
    ],
    "chooseIf": [
      "You are interested in medical technology and imaging science",
      "You are comfortable following strict radiation-safety protocols",
      "You are detail-oriented and technically minded"
    ],
    "avoidIf": [
      "You are uncomfortable in hospital/clinical settings",
      "You prefer non-technical, purely administrative roles",
      "You are concerned about radiation exposure environments"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS Radiologic Tech and mandatory radiation safety training"
      }
    ],
    "startupOps": [
      "Independent diagnostic imaging centre (with a partner radiologist)",
      "Mobile ultrasound or X-ray service",
      "Imaging equipment maintenance consultancy"
    ],
    "summary": "BS Radiologic Technology combines cutting-edge medical technology with strong Gulf migration potential."
  },
  {
    "id": "mbbs",
    "title": "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
    "domain": DomainType.HEALTH,
    "duration": "5-Year Doctor-Level Degree",
    "category": "Doctor level Career",
    "description": [
      "The primary medical degree qualifying graduates as licensed physicians, regulated by the Pakistan Medical and Dental Council (PM&DC).",
      "Covers the full breadth of medicine and surgery through classroom study and supervised clinical rotations.",
      "Pakistan's most prestigious and globally portable professional degree."
    ],
    "subjects": [
      "Anatomy, physiology and biochemistry",
      "Pathology and pharmacology",
      "Medicine and surgery (clinical rotations)",
      "Gynecology and obstetrics",
      "Pediatrics",
      "Community medicine",
      "Clinical clerkships across specialties",
      "Emergency and critical care basics"
    ],
    "marketReality": [
      "There is an oversupply of general MBBS graduates in some cities, but a genuine shortage in rural and underserved areas.",
      "Demand for specialists remains very high, making the FCPS route almost essential for strong earnings.",
      "A well-established overseas migration pipeline exists via USMLE (USA), PLAB (UK) and Gulf licensing exams.",
      "It remains one of the most respected professions in Pakistani society."
    ],
    "jobRoles": [
      "General Physician / Medical Officer",
      "Specialist (after FCPS, e.g. Surgeon, Cardiologist)",
      "Medical Officer Abroad",
      "Public Health Physician",
      "Medical Researcher"
    ],
    "keySectors": [
      "Public and private hospitals",
      "Armed Forces Medical Corps",
      "Private clinics",
      "International hospitals (Gulf / UK / US)",
      "Pharmaceutical and research industry"
    ],
    "salaryTable": [
      {
        "level": "House Officer (Entry)",
        "salary": "40,000 – 60,000 PKR"
      },
      {
        "level": "Medical Officer / Early Specialist",
        "salary": "100,000 – 250,000 PKR"
      },
      {
        "level": "Senior Specialist / Consultant",
        "salary": "300,000 – 800,000 PKR"
      },
      {
        "level": "Gulf / International Consultant",
        "salary": "$2,000 – $8,000/month"
      }
    ],
    "skills": [
      "Clinical diagnosis",
      "Patient management",
      "Procedural and surgical skills (specialty-dependent)",
      "Bedside communication",
      "Decision-making under pressure",
      "Continuous medical education"
    ],
    "universities": [
      "King Edward Medical University Lahore",
      "Aga Khan University",
      "Dow University of Health Sciences Karachi",
      "Allama Iqbal Medical College Lahore",
      "Khyber Medical College Peshawar",
      "Nishtar Medical University Multan",
      "Services Institute of Medical Sciences Lahore"
    ],
    "strategy": [
      "MBBS → House Job → FCPS Specialization → Consultant",
      "MBBS → PLAB / USMLE → Practice Abroad",
      "MBBS → Public Health / Research Track → Policy or Academic Role"
    ],
    "chooseIf": [
      "You are deeply committed to a career in medicine",
      "You can commit to many years of demanding study and training",
      "You want a globally portable, highly respected profession"
    ],
    "avoidIf": [
      "You are not prepared for a very long, demanding training path",
      "You want a quicker return on your educational investment",
      "You cannot handle sustained high-pressure environments"
    ],
    "roadmap": [
      {
        "year": "Year 1-5",
        "milestone": "Complete MBBS coursework and clinical rotations"
      },
      {
        "year": "Year 6",
        "milestone": "Complete House Job for full PM&DC licensure"
      }
    ],
    "startupOps": [
      "Private clinic",
      "Telemedicine practice",
      "Medical training or exam-prep academy"
    ],
    "summary": "MBBS remains Pakistan's most prestigious and globally portable degree, but real financial success now depends heavily on specialization."
  },
  {
    "id": "pharm-d",
    "title": "Doctor of Pharmacy (Pharm.D)",
    "domain": DomainType.HEALTH,
    "duration": "5-Year Doctor-Level Degree",
    "category": "Doctor level Career",
    "description": [
      "A professional pharmacy degree covering drug therapy, clinical pharmacy and pharmaceutical sciences, regulated by the Pharmacy Council of Pakistan (PCP).",
      "Qualifies graduates as licensed pharmacists able to work clinically, in industry, or in retail.",
      "Offers one of the widest career spreads of any health science degree."
    ],
    "subjects": [
      "Pharmaceutical chemistry",
      "Pharmacology and therapeutics",
      "Clinical pharmacy",
      "Pharmaceutics and drug formulation",
      "Pharmacognosy",
      "Hospital and community pharmacy practice",
      "Pharmacoeconomics",
      "Supervised clinical rotations"
    ],
    "marketReality": [
      "Pakistan's pharmaceutical industry (multinational and local manufacturers) continues to expand steadily.",
      "Hospital clinical-pharmacist roles are slowly growing as hospitals modernize.",
      "Retail pharmacy chains are opening rapidly, creating strong management-track demand.",
      "Regulatory affairs, sales and marketing roles in pharma companies pay well above entry clinical roles."
    ],
    "jobRoles": [
      "Clinical Pharmacist",
      "Hospital Pharmacist",
      "Pharmaceutical Sales / Marketing Executive",
      "Regulatory Affairs Officer",
      "Quality Assurance Pharmacist"
    ],
    "keySectors": [
      "Pharmaceutical manufacturing companies",
      "Hospitals",
      "Retail pharmacy chains",
      "Drug Regulatory Authority of Pakistan (DRAP)",
      "Gulf pharmacy practice"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "50,000 – 80,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "80,000 – 150,000 PKR"
      },
      {
        "level": "Senior",
        "salary": "150,000 – 300,000 PKR"
      },
      {
        "level": "Gulf / Pharma Executive",
        "salary": "300,000 – 700,000 PKR"
      }
    ],
    "skills": [
      "Drug therapy knowledge",
      "Patient counseling",
      "Regulatory compliance",
      "Quality control",
      "Sales and negotiation (industry roles)",
      "Attention to detail"
    ],
    "universities": [
      "University of Karachi (Faculty of Pharmacy)",
      "Punjab University College of Pharmacy",
      "Aga Khan University",
      "Dow University of Health Sciences",
      "Bahauddin Zakariya University Multan",
      "Riphah International University",
      "Islamia University Bahawalpur"
    ],
    "strategy": [
      "Pharm.D → Hospital/Clinical Pharmacist → Chief Pharmacist",
      "Pharm.D → Pharma Industry → Regulatory Affairs Manager",
      "Pharm.D → Retail Pharmacy → Own Pharmacy Chain"
    ],
    "chooseIf": [
      "You are interested in drug science and patient therapy",
      "You want strong private-sector and industry career options",
      "You enjoy chemistry-heavy, detail-oriented coursework"
    ],
    "avoidIf": [
      "You only want a purely retail role without industry ambition",
      "You dislike heavy chemistry and pharmacology content",
      "You want a shorter training path"
    ],
    "roadmap": [
      {
        "year": "Year 1-5",
        "milestone": "Complete Pharm.D degree and secure PCP registration"
      }
    ],
    "startupOps": [
      "Own retail pharmacy",
      "Pharmaceutical consultancy",
      "Compounding or specialty pharmacy service"
    ],
    "summary": "Pharm.D offers one of the widest career spreads in health sciences, from hospital wards to pharma boardrooms."
  },
  {
    "id": "dpt",
    "title": "Doctor of Physical Therapy (DPT)",
    "domain": DomainType.HEALTH,
    "duration": "5-Year Doctor-Level Degree",
    "category": "Doctor level Career",
    "description": [
      "A professional degree for diagnosing and treating movement and musculoskeletal disorders, regulated by AHPC.",
      "Combines hands-on treatment with exercise-based rehabilitation science.",
      "One of the fastest-growing hands-on healthcare careers in Pakistan."
    ],
    "subjects": [
      "Musculoskeletal and neuro-rehabilitation",
      "Orthopedic physical therapy",
      "Cardiopulmonary rehabilitation",
      "Pediatric and geriatric physiotherapy",
      "Sports physiotherapy",
      "Therapeutic exercise and modalities",
      "Clinical rotations",
      "Patient assessment and treatment planning"
    ],
    "marketReality": [
      "Rising awareness of physiotherapy for chronic pain, sports injuries and post-surgical recovery is expanding demand.",
      "Hospitals are increasingly setting up dedicated physiotherapy departments.",
      "Strong Gulf and UK demand exists for licensed, registered physiotherapists.",
      "Private clinics and sports teams offer growing independent-practice opportunities."
    ],
    "jobRoles": [
      "Physiotherapist",
      "Sports Physiotherapist",
      "Rehabilitation Specialist",
      "Pediatric Physiotherapist",
      "Clinic Owner"
    ],
    "keySectors": [
      "Hospitals and rehab centres",
      "Sports teams and academies",
      "Private physiotherapy clinics",
      "Gulf / UK healthcare",
      "Special education and pediatric centres"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Senior / Own Clinic",
        "salary": "120,000 – 300,000 PKR"
      },
      {
        "level": "Gulf / International",
        "salary": "$1,000 – $2,500/month"
      }
    ],
    "skills": [
      "Manual therapy techniques",
      "Exercise prescription",
      "Patient assessment",
      "Rehabilitation planning",
      "Communication and empathy",
      "Use of therapeutic equipment"
    ],
    "universities": [
      "Riphah International University",
      "Aga Khan University",
      "Ziauddin University Karachi",
      "Isra University Hyderabad",
      "University of Lahore",
      "Superior University Lahore",
      "Dow University of Health Sciences"
    ],
    "strategy": [
      "DPT → Hospital Physiotherapist → Senior Rehab Specialist",
      "DPT → Own Clinic → Sports Team Physiotherapist",
      "DPT → Gulf/UK Registration → Overseas Physiotherapist"
    ],
    "chooseIf": [
      "You are interested in helping people recover movement and function",
      "You enjoy hands-on, physical patient care",
      "You want strong private-practice and overseas potential"
    ],
    "avoidIf": [
      "You are uncomfortable with hands-on physical work",
      "You want a purely diagnostic, non-treatment role",
      "You want a shorter training timeline"
    ],
    "roadmap": [
      {
        "year": "Year 1-5",
        "milestone": "Complete DPT, clinical rotations, and AHPC registration"
      }
    ],
    "startupOps": [
      "Private physiotherapy clinic",
      "Mobile home-visit physiotherapy service",
      "Sports rehabilitation centre"
    ],
    "summary": "DPT is a fast-growing, hands-on healthcare career with strong private-practice and overseas potential."
  },
  {
    "id": "dvm",
    "title": "DVM (Doctor of Veterinary Medicine)",
    "domain": DomainType.HEALTH,
    "duration": "5-Year Doctor-Level Degree",
    "category": "Doctor level Career",
    "description": [
      "A professional degree for diagnosing and treating diseases in animals, regulated by the Pakistan Veterinary Medical Council (PVMC).",
      "Covers livestock, companion animals and veterinary public health.",
      "Directly tied to Pakistan's massive agricultural and livestock economy."
    ],
    "subjects": [
      "Veterinary anatomy and physiology",
      "Animal pathology and pharmacology",
      "Livestock production and management",
      "Veterinary surgery",
      "Animal reproduction",
      "Veterinary public health",
      "Clinical rotations (large and small animals)",
      "Poultry and dairy health management"
    ],
    "marketReality": [
      "Pakistan's massive livestock economy creates steady, ongoing demand for veterinary officers.",
      "The growing urban pet-care industry is opening new small-animal clinic opportunities.",
      "Government livestock departments regularly hire veterinary officers across all provinces.",
      "Export-oriented meat and dairy industries require veterinary quality oversight."
    ],
    "jobRoles": [
      "Veterinary Officer",
      "Livestock Farm Manager",
      "Small Animal Veterinarian",
      "Veterinary Public Health Officer",
      "Poultry / Dairy Consultant"
    ],
    "keySectors": [
      "Government livestock and dairy departments",
      "Private veterinary clinics",
      "Poultry and dairy industry",
      "Research institutes",
      "International livestock and agri organizations"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 55,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "55,000 – 100,000 PKR"
      },
      {
        "level": "Senior",
        "salary": "100,000 – 200,000 PKR"
      },
      {
        "level": "Private Practice / Consultancy",
        "salary": "200,000 – 450,000 PKR"
      }
    ],
    "skills": [
      "Animal handling and examination",
      "Surgical skills",
      "Disease diagnosis",
      "Livestock management knowledge",
      "Communication with farmers and pet owners",
      "Record-keeping"
    ],
    "universities": [
      "University of Veterinary and Animal Sciences Lahore",
      "University of Agriculture Faisalabad",
      "Sindh Agriculture University Tandojam",
      "Shaheed Benazir Bhutto University of Veterinary Sciences Sakrand",
      "Bahauddin Zakariya University Multan",
      "Gomal University Dera Ismail Khan",
      "The University of Poonch Rawalakot (Vet Sciences)"
    ],
    "strategy": [
      "DVM → Government Veterinary Officer → District Livestock Officer",
      "DVM → Private Practice → Pet Clinic Owner",
      "DVM → Poultry/Dairy Consultant → Agri-Business Advisor"
    ],
    "chooseIf": [
      "You are passionate about animals and animal welfare",
      "You are interested in the agriculture and livestock economy",
      "You are comfortable working outdoors and on farms"
    ],
    "avoidIf": [
      "You are uncomfortable around animals in distress",
      "You want purely urban, desk-based work",
      "You dislike unpredictable field conditions"
    ],
    "roadmap": [
      {
        "year": "Year 1-5",
        "milestone": "Complete DVM and secure PVMC registration"
      }
    ],
    "startupOps": [
      "Private veterinary clinic",
      "Livestock health consultancy",
      "Pet grooming and care business"
    ],
    "summary": "DVM combines Pakistan's agricultural backbone with a growing urban pet-care niche, offering both rural and urban career paths."
  },
  ...BUSINESS_DEGREES,
  {
    "id": "llb",
    "title": "LLB – Bachelor of Laws",
    "domain": DomainType.LAW,
    "duration": "5 Years Degree (LAT entry)",
    "category": "Degree",
    "description": [
      "Primary professional degree qualifying graduates as licensed lawyers in Pakistan",
      "Covers civil, criminal, corporate, constitutional and international law",
      "Requires passing the Law Admission Test (LAT) for university entry"
    ],
    "subjects": [
      "Jurisprudence and legal theory",
      "Constitutional law of Pakistan, UK and USA",
      "Civil Law — contract, tort, property, family law",
      "Criminal Law and procedure code",
      "Mercantile and corporate law",
      "Law of evidence (Qanun-e-Shahadat)",
      "Public international law"
    ],
    "marketReality": [
      "Vast demand in litigation, corporate legal departments and government judiciary",
      "Pakistan legal market is massive — every business and individual needs legal help",
      "Corporate law is the highest-paying civilian legal track in 2026",
      "LAT and Bar Council exams (GAT) are mandatory for professional practice"
    ],
    "jobRoles": [
      "Advocate (High Court / Lower Court)",
      "Corporate Lawyer / Legal Counsel",
      "Legal Consultant",
      "Public Prosecutor",
      "Research Associate (Law)"
    ],
    "keySectors": [
      "Law Firms (Litigation and Corporate)",
      "Corporate companies legal departments",
      "Government judiciary and prosecution",
      "NGOs and human rights organizations",
      "Banking and insurance legal cells"
    ],
    "salaryTable": [
      {
        "level": "Junior Advocate (L-Court)",
        "salary": "20,000 – 50,000 PKR"
      },
      {
        "level": "Corporate Counsel",
        "salary": "80,000 – 250,000 PKR"
      },
      {
        "level": "Mid-Level High Court",
        "salary": "150,000 – 400,000 PKR"
      },
      {
        "level": "Top Senior Advocate",
        "salary": "1,000,000 – 10,000,000+ per case"
      }
    ],
    "skills": [
      "Critical thinking and logical reasoning",
      "Public speaking and persuasive advocacy",
      "Legal research and professional writing",
      "Negotiation and mediation",
      "Detailed study and memory for case laws",
      "Client relationship and professional ethics"
    ],
    "universities": [
      "Punjab University (LUMS and Punjab Law College)",
      "Quadi-i-Azam University",
      "Liaquat University of Medical & Health Sciences (Law tracks)",
      "International Islamic University Islamabad",
      "Bahria University Law dept",
      "S.M. Law College Karachi"
    ],
    "strategy": [
      "LLB → Senior Law firm associate → Partner → Senior Advocate High Court → SC",
      "LLB → Corporate legal officer → General Counsel → Legal Director",
      "LLB → Bar vocational tracks abroad (e.g. UK Bar) → Barrister"
    ],
    "chooseIf": [
      "You are passionate about justice, law and have strong analytical and verbal skills",
      "You enjoy research, reading complex documents and logical argumentation",
      "You want a profession with high social impact and respected status"
    ],
    "avoidIf": [
      "You dislike reading long texts, research or public speaking",
      "You want quick high income (civilian litigation takes years to build reputation)",
      "You struggle with rigorous logical systems and ethics"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "Clear LAT and 5-year LLB degree"
      },
      {
        "year": "Phase 2",
        "milestone": "Pass Law GAT, 6-month apprenticeship and get Bar License"
      }
    ],
    "startupOps": [
      "Private law firm (Law Chambers)",
      "Legal research and documentation service",
      "Online legal consultancy platform"
    ],
    "summary": "LLB is the foundation of justice. Build your reputation through character and legal depth to win!"
  },
  {
    "id": "llm-specialist",
    "title": "LLM & Advanced Law Career",
    "domain": DomainType.LAW,
    "duration": "2 Years (After LLB)",
    "category": "Professional",
    "description": [
      "Master of Laws degree for specialized legal depth and academic career",
      "Covers advanced specialization like Corporate law, Tax law, AI law or International law",
      "Essential for academic teaching and prestigious international legal practices"
    ],
    "subjects": [
      "Advanced research methodology",
      "Specialized law track (Corporate, Criminal, Human Rights etc.)",
      "International legal frameworks",
      "Thesis and legal publication",
      "Comparative law studies"
    ],
    "marketReality": [
      "Valued for high-level corporate roles and international law firms",
      "Mandatory for those wishing to teach at law colleges or universities",
      "Prestige multiplier for practicing advocates in High Court and Supreme Court"
    ],
    "jobRoles": [
      "Senior Corporate Lawyer",
      "Law Professor / Lecturer",
      "International Legal Consultant",
      "Legal Researcher / Policy Analyst"
    ],
    "keySectors": [
      "Prestigious corporate law firms",
      "Universities and law colleges",
      "International courts and organizations (abroad)",
      "Government policy think tanks"
    ],
    "salaryTable": [
      {
        "level": "Professor / Head",
        "salary": "200,000 – 500,000 PKR"
      },
      {
        "level": "Senior Consultant",
        "salary": "300,000 – 800,000 PKR"
      },
      {
        "level": "International Remote",
        "salary": "$3,000 – $10,000+/month"
      }
    ],
    "skills": [
      "Expert level legal research and writing",
      "Thematic legal analysis",
      "Academic teaching and mentorship",
      "Specialized sectoral legal knowledge"
    ],
    "universities": [
      "LUMS (SAHSOL)",
      "Punjab University",
      "Quadi-i-Azam University",
      "International Universities (UK/USA/EU are preferred for LLM)"
    ],
    "strategy": [
      "LLM → Specialization → Expert in specific law (e.g. AI or Tax) → Top-tier Consultant"
    ],
    "chooseIf": [
      "You want to specialize deeply in a niche legal area",
      "You are interested in academia or international legal careers"
    ],
    "avoidIf": [
      "You prefer frontline litigation and courtroom practice over academic depth"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "Complete 2-year LLM after 5-year LLB"
      }
    ],
    "startupOps": [
      "Legal consultancy for specific niche",
      "Continuing legal education provider"
    ],
    "summary": "LLM takes your legal career from local advocate to global expert."
  },
  {
    "id": "judiciary-path",
    "title": "Judge Preparation Path",
    "domain": DomainType.LAW,
    "duration": "2-3 years practice (Post LLB)",
    "category": "Professional",
    "description": [
      "Competitive career track leading to becoming a Civil Judge or Judicial Magistrate",
      "Involves rigorous competitive exams held by High Courts of Pakistan",
      "A career of extreme authority, respect and public service"
    ],
    "subjects": [
      "All major Pakistan Laws (CPC, PPC, CrPC)",
      "Judgement writing techniques",
      "General knowledge and Pakistan history",
      "English and Urdu proficiency",
      "Psychological and personality testing"
    ],
    "marketReality": [
      "Extremely competitive — only the highest-tier performers succeed",
      "One of the most powerful and secure government career paths",
      "Offers high salary, government housing, security and ultimate respect"
    ],
    "jobRoles": [
      "Civil Judge",
      "Judicial Magistrate",
      "Judge High Court (after long career and elevation)"
    ],
    "keySectors": [
      "Pakistan Judiciary (Provincial High Courts)",
      "Government districts and sessions courts"
    ],
    "salaryTable": [
      {
        "level": "Civil Judge / Mag.",
        "salary": "200,000 – 350,000 + benefits"
      }
    ],
    "skills": [
      "Impartial decision-making and ethical judgment",
      "Command over all procedural and substantive laws",
      "Concise and precise judgement writing",
      "High level of integrity and character"
    ],
    "strategy": [
      "Practice 2 years → Clear Judiciary Exam → Interview → Become Civil Judge"
    ],
    "universities": [
      "Provincial High Courts (Registry)",
      "Punjab Judicial Academy",
      "Federal Judicial Academy"
    ],
    "chooseIf": [
      "You are interested in public service, justice and long-term stability",
      "You have high integrity and enjoy high-authority decision making"
    ],
    "avoidIf": [
      "You want the freedom of private practice and high-stake litigation income",
      "You dislike highly regulated and restricted lifestyle"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "2 years of legal practice in lower courts after LLB"
      },
      {
        "year": "Phase 2",
        "milestone": "Clear competitive judicial examination and interview"
      }
    ],
    "startupOps": [
      "Not applicable for judicial roles"
    ],
    "summary": "Becoming a Judge is the ultimate honour in the legal world. Prepare specifically for the competitive exams!"
  },
  {
    "id": "css-path",
    "title": "CSS – Central Superior Services",
    "domain": DomainType.LAW,
    "duration": "1-2 Years Preparation (Post Graduation)",
    "category": "Professional",
    "description": [
      "Elite competitive exam to join the civil bureaucracy of Pakistan",
      "Graduates join groups like Police Service (PSP), District Management (PAS) or Foreign Service (FSP)",
      "The most powerful and influential non-elected positions in the country"
    ],
    "subjects": [
      "English Essay and Composition",
      "General Science & Ability",
      "Pakistan Affairs and Current Affairs",
      "Islamic Studies",
      "Optional Subjects (Accountancy, Law, History, etc.)"
    ],
    "marketReality": [
      "Extremely low success rate (2-3%) — requires massive dedication",
      "Ultimate power and social status in Pakistan society",
      "Lifetime security and influence over national policy and administration"
    ],
    "jobRoles": [
      "Assistant Commissioner (PAS)",
      "Assistant Superintendent Police (PSP)",
      "Diplomat / Third Secretary (FSP)",
      "Tax Officer (IRS)",
      "Customs Officer"
    ],
    "keySectors": [
      "Government of Pakistan (Federal and Provincial bureaucracy)"
    ],
    "salaryTable": [
      {
        "level": "Grade 17 (Entry)",
        "salary": "100,000 – 180,000 + Govt Benefits"
      },
      {
        "level": "Grade 18-20",
        "salary": "200,000 – 400,000 + Authority"
      }
    ],
    "skills": [
      "Exceptional analytical and communication skills",
      "Deep knowledge of history, policy and current affairs",
      "Leadership and administrative decision making",
      "Resilience and high intelligence under pressure"
    ],
    "strategy": [
      "Degree → Dedicated CSS prep → Pass exams → Pass Interview → Join Civil Service"
    ],
    "universities": [
      "National School of Public Policy",
      "Civil Services Academy Lahore"
    ],
    "chooseIf": [
      "You want to lead the administration of the country and have high social status",
      "You are versatile and can handle high-pressure administrative roles in any city"
    ],
    "avoidIf": [
      "You want to earn a massive corporate salary (CSS is more about power/status)",
      "You dislike government bureaucracy or frequent transfers"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "Complete graduation and prepare for 12 written subjects"
      },
      {
        "year": "Phase 2",
        "milestone": "Clear written exams, medical, psychological and final interview"
      }
    ],
    "startupOps": [
      "Not applicable for government service"
    ],
    "summary": "CSS is for those who want to run the country. It is a test of character as much as intelligence!"
  },
  {
    "id": "web-development",
    "title": "Web Development",
    "domain": DomainType.TECHNOLOGY,
    "duration": "1–2 Years Skill Course",
    "category": "Skill",
    "description": [
      "Practical skill track for building websites and web applications without a full degree",
      "Web development is the most employable digital skill globally and in Pakistan",
      "Can be learned through bootcamps, online courses, YouTube and self-paced study"
    ],
    "subjects": [
      "HTML5 — structure and content of web pages",
      "CSS3 — styling, layouts, animations and responsive design",
      "JavaScript — interactive behaviour and web app logic",
      "React.js or Vue.js — modern front-end frameworks",
      "Node.js — back-end web server development",
      "Databases — MySQL, PostgreSQL, MongoDB",
      "Git/GitHub version control and deployment"
    ],
    "marketReality": [
      "Highest demand digital skill on Upwork, Fiverr and Freelancer.com",
      "Pakistani web developers earning $500-$5,000/month freelancing from home",
      "Every business from small shop to multinational needs a website",
      "Remote work for international companies from Pakistan is completely normal in 2026"
    ],
    "jobRoles": [
      "Front-End Developer",
      "Back-End Developer",
      "Full-Stack Developer",
      "WordPress Developer",
      "Shopify / E-commerce Developer",
      "Freelance Web Developer"
    ],
    "keySectors": [
      "IT companies and software houses",
      "Digital marketing and creative agencies",
      "E-commerce companies",
      "Freelancing platforms (Upwork, Fiverr)",
      "Startups and established businesses needing websites"
    ],
    "salaryTable": [
      {
        "level": "Beginner Freelance",
        "salary": "$200 – $800/month"
      },
      {
        "level": "Mid-Level Freelance",
        "salary": "$1,000 – $3,000/month"
      },
      {
        "level": "Senior Freelance",
        "salary": "$3,000 – $8,000+/month"
      },
      {
        "level": "Pakistan Company",
        "salary": "60,000 – 250,000 PKR"
      }
    ],
    "skills": [
      "HTML, CSS and responsive design (Bootstrap, Tailwind)",
      "JavaScript fundamentals and DOM manipulation",
      "React.js or Vue.js front-end framework",
      "Node.js and Express.js for back-end",
      "REST API integration and database queries",
      "Git and GitHub",
      "Deployment — cPanel, Vercel, Netlify, DigitalOcean"
    ],
    "universities": [
      "Coursera (Google, Meta certifications)",
      "freeCodeCamp (free complete curriculum)",
      "Udemy (paid courses at low price)",
      "YouTube (Traversy Media, The Odin Project)",
      "NAVTTC and PSEB skill development programmes (Pakistan government)"
    ],
    "strategy": [
      "Learn HTML/CSS -> JavaScript -> React -> Node -> Full Stack Developer",
      "Web Dev skills -> Fiverr/Upwork profile -> First client -> Scale to agency",
      "Web Dev -> Join software house -> Senior developer -> Team lead"
    ],
    "chooseIf": [
      "You want to start earning online quickly without a 4-year degree",
      "You are creative AND technical and love building visual digital products",
      "You want the flexibility to work from anywhere and be your own boss"
    ],
    "avoidIf": [
      "You dislike sitting at a computer for long hours coding and debugging",
      "You want a formal degree credential before starting work",
      "You are not interested in continuous learning as web technology changes fast"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "Learn core front-end and back-end skills"
      },
      {
        "year": "Phase 2",
        "milestone": "Build 3 portfolio projects and launch freelance profile"
      }
    ],
    "startupOps": [
      "Freelance web development agency",
      "Niche website builder for local businesses",
      "SaaS web product",
      "E-commerce store development service"
    ],
    "summary": "Web development is the fastest path from zero to earning online in Pakistan. Build 3 portfolio projects, create Upwork/Fiverr profile and land your first $100 project. The internet never sleeps — and neither does your income potential!"
  },
  {
    "id": "app-development",
    "title": "App Development",
    "domain": DomainType.TECHNOLOGY,
    "duration": "1–2 Years Skill Course",
    "category": "Skill",
    "description": [
      "Mobile app development for Android and iOS smartphones and tablets",
      "With 5.5 billion smartphone users globally, mobile apps are essential digital products",
      "App developers in Pakistan are earning internationally competitive income from home"
    ],
    "subjects": [
      "Flutter (Google cross-platform — build for Android and iOS from one codebase)",
      "React Native (JavaScript-based cross-platform app development)",
      "Android development with Kotlin (native Android)",
      "iOS development with Swift (native Apple)",
      "UI/UX design principles for mobile apps",
      "API integration and mobile back-end (Firebase, Supabase)",
      "App Store (Apple) and Google Play Store publishing"
    ],
    "marketReality": [
      "App economy globally worth over $500 billion — huge opportunity",
      "Pakistani app developers winning international clients on Upwork",
      "Pakistan government e-services expansion creating local app development jobs",
      "Fintech, health-tech and e-commerce apps in massive demand in 2026"
    ],
    "jobRoles": [
      "Android Developer",
      "iOS Developer",
      "Flutter Developer",
      "React Native Developer",
      "Mobile UI Developer",
      "App Project Manager"
    ],
    "keySectors": [
      "Software houses and IT companies",
      "Freelancing platforms",
      "Fintech startups",
      "E-commerce apps (Daraz, Careem, etc.)",
      "Health-tech startups",
      "Government digital projects"
    ],
    "salaryTable": [
      {
        "level": "Beginner Freelance",
        "salary": "$300 – $1,000/month"
      },
      {
        "level": "Mid-Level Freelance",
        "salary": "$1,500 – $4,000/month"
      },
      {
        "level": "Senior Freelance",
        "salary": "$4,000 – $10,000+/month"
      },
      {
        "level": "Pakistan Company",
        "salary": "80,000 – 300,000 PKR"
      }
    ],
    "skills": [
      "Flutter or React Native cross-platform development",
      "Dart or JavaScript programming",
      "State management (Provider, Riverpod, Redux)",
      "REST API and GraphQL integration",
      "Firebase real-time database and authentication",
      "App Store and Google Play submission and optimization",
      "UI/UX design thinking for mobile interfaces"
    ],
    "universities": [
      "Google Flutter documentation and codelabs (free)",
      "Udemy Flutter bootcamps",
      "YouTube (Robert Brunhage, Fireship, Mitch Koko)",
      "NAVTTC mobile app development courses",
      "PSEB freelancing programme"
    ],
    "strategy": [
      "Learn Flutter -> Build 2-3 portfolio apps -> Upwork/Fiverr -> First client",
      "App Developer -> Software house job -> Senior developer -> Tech lead",
      "App Developer -> Own app product -> Monetize via subscriptions / ads"
    ],
    "chooseIf": [
      "You use and love mobile apps and want to build them yourself",
      "You want a high-income skill that works for freelancing and employment",
      "You are detail-oriented and enjoy building smooth user interfaces"
    ],
    "avoidIf": [
      "You dislike programming logic or debugging code for hours",
      "You expect quick results without months of practice and project-building",
      "You are not motivated to stay updated with rapidly evolving mobile tech"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "Learn Flutter/React Native and build portfolio apps"
      },
      {
        "year": "Phase 2",
        "milestone": "Publish app to stores and secure freelance clients"
      }
    ],
    "startupOps": [
      "Build your own app and publish on Play Store / App Store",
      "App development agency for local businesses",
      "Niche app solution for Pakistan market (transport, health, food)"
    ],
    "summary": "App development is one of the highest-income freelance skills from Pakistan in 2026. Flutter is the best starting point — one language, two platforms. Build an app, publish it and watch it change your life!"
  },
  {
    "id": "ui-ux-design",
    "title": "Design & UI/UX",
    "domain": DomainType.TECHNOLOGY,
    "duration": "1–2 Years Skill Course",
    "category": "Skill",
    "description": [
      "Design discipline focused on creating visual interfaces and user experiences for digital products",
      "UI (User Interface) = how things look. UX (User Experience) = how things work and feel",
      "Every app, website and digital product needs skilled UI/UX designers to succeed"
    ],
    "subjects": [
      "Principles of visual design — typography, colour theory, spacing and layout",
      "Figma — industry-standard UI design tool",
      "Adobe XD and Photoshop for design work",
      "Wireframing and prototyping for apps and websites",
      "User research methods — user interviews, usability testing, surveys",
      "Information architecture — how to organize and structure digital content",
      "Responsive design — designing for mobile, tablet and desktop screens"
    ],
    "marketReality": [
      "Massive demand — every software company needs UI/UX designers",
      "Pakistani designers on Fiverr and 99designs earning strong international income",
      "Social media content design and branding also under this skillset",
      "UX Research roles growing rapidly in mature tech companies"
    ],
    "jobRoles": [
      "UI Designer",
      "UX Designer / UX Researcher",
      "Product Designer",
      "Visual Designer",
      "Graphic Designer",
      "Brand Identity Designer",
      "Motion Designer"
    ],
    "keySectors": [
      "Software and tech companies",
      "Digital marketing agencies",
      "E-commerce brands",
      "Advertising and media agencies",
      "Freelancing platforms (Fiverr, 99designs, Toptal)"
    ],
    "salaryTable": [
      {
        "level": "Beginner Freelance",
        "salary": "$200 – $800/month"
      },
      {
        "level": "Mid-Level Designer",
        "salary": "$1,000 – $3,500/month"
      },
      {
        "level": "Senior Designer",
        "salary": "$3,500 – $8,000+/month"
      },
      {
        "level": "Pakistan Company",
        "salary": "50,000 – 200,000 PKR"
      }
    ],
    "skills": [
      "Figma (essential — master this first)",
      "Adobe Photoshop and Illustrator",
      "Visual design principles and design systems",
      "Wireframing and clickable prototyping",
      "User research and usability testing",
      "Design handoff for developers (Zeplin, Inspect)",
      "Portfolio building and design presentation skills"
    ],
    "universities": [
      "Google UX Design Certificate (Coursera — highly recommended)",
      "CareerFoundry UX Design Bootcamp",
      "YouTube (DesignCourse, AJ&Smart)",
      "Figma official tutorials and community resources",
      "Interaction Design Foundation (IxDF) — affordable global UX education"
    ],
    "strategy": [
      "Learn Figma -> Build 3-5 portfolio case studies -> Fiverr/Upwork -> First client",
      "UI/UX -> Junior designer at software house -> Senior designer -> Design lead",
      "UI/UX -> Product design -> Head of Design / VP Product Design"
    ],
    "chooseIf": [
      "You are creative, visual and love how beautiful design impacts user experience",
      "You want a skill that combines creativity with technology and psychology",
      "You want strong freelancing income from creative digital work"
    ],
    "avoidIf": [
      "You are purely technical and dislike subjective creative decisions",
      "You want purely coding-based work without visual and creative thinking",
      "You cannot accept design feedback and criticism as part of improving"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "Learn Figma and design fundamentals"
      },
      {
        "year": "Phase 2",
        "milestone": "Build 3-5 case studies and secure freelance clients"
      }
    ],
    "startupOps": [
      "Freelance design studio for startups and businesses",
      "Branding and identity design agency",
      "Design system and component library service"
    ],
    "summary": "UI/UX design is the most human part of technology — you make technology feel intuitive and beautiful. Build a stunning Figma portfolio with 3-5 case studies and you will land international clients. Good design is not just pretty — it saves users time and money!"
  },
  {
    "id": "cyber-security-skill",
    "title": "Cyber Security",
    "domain": DomainType.TECHNOLOGY,
    "duration": "1–2 Years Skill / 4 Years Degree",
    "category": "Skill",
    "description": [
      "Field dedicated to protecting computers, networks, systems and data from attacks and breaches",
      "As Pakistan goes digital with e-banking, e-government and e-commerce, cyber security demand explodes",
      "One of the fastest growing and highest paying technology fields globally in 2026"
    ],
    "subjects": [
      "Network fundamentals and TCP/IP",
      "Linux operating system and command line",
      "Ethical hacking and penetration testing",
      "Vulnerability assessment and scanning",
      "Cryptography and encryption principles",
      "Security Operations Centre (SOC) analyst skills",
      "Cloud security (AWS, Azure security services)",
      "CEH, CompTIA Security+, OSCP certifications"
    ],
    "marketReality": [
      "Pakistan cyber attacks increasing — urgency for security professionals is real",
      "Banks, telcos, government departments all building cyber security teams",
      "Remote work for international cyber security companies from Pakistan is possible",
      "Bug bounty programmes: Pakistani hackers earning $10,000+ in single bug reports"
    ],
    "jobRoles": [
      "Ethical Hacker / Penetration Tester",
      "SOC Analyst (Security Operations Centre)",
      "Incident Response Analyst",
      "Cloud Security Engineer",
      "Information Security Manager / CISO"
    ],
    "keySectors": [
      "Banks and financial institutions",
      "Telecom companies (Jazz, Telenor, Zong)",
      "Government cyber security agencies (PECA, NR3C)",
      "International cybersecurity firms (remote)",
      "Startups and e-commerce platforms"
    ],
    "salaryTable": [
      {
        "level": "Entry SOC Analyst",
        "salary": "60,000 – 100,000 PKR"
      },
      {
        "level": "Mid-Level Pentester",
        "salary": "150,000 – 350,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "400,000 – 700,000 PKR"
      },
      {
        "level": "International Remote",
        "salary": "$3,000 – $12,000+/month"
      }
    ],
    "skills": [
      "Kali Linux and Metasploit for penetration testing",
      "Nmap, Burp Suite and vulnerability scanners",
      "Python scripting for security automation",
      "Network packet analysis (Wireshark)",
      "SIEM tools — Splunk, IBM QRadar",
      "ISO 27001 and security frameworks",
      "Analytical mindset and ethical hacker thinking"
    ],
    "universities": [
      "TryHackMe.com (best beginner cyber security learning platform)",
      "HackTheBox — advanced practical hacking labs",
      "Cybrary.it — free cyber security courses",
      "CompTIA Security+ / CEH certifications",
      "EC-Council and SANS Institute courses",
      "COMSATS, NUST, Air University (for formal degree in Pakistan)"
    ],
    "strategy": [
      "TryHackMe / HTB -> CEH/Security+ -> SOC Analyst -> Senior Security Engineer",
      "Pentesting -> OSCP certification -> Senior Penetration Tester -> Red Team Lead",
      "Cyber Security -> Bug Bounty hunting -> High income independently",
      "CISM/CISSP -> Information Security Manager -> CISO"
    ],
    "chooseIf": [
      "You love understanding how systems work and finding their weaknesses",
      "You are ethical, trustworthy and want to protect people and organizations",
      "You enjoy continuous challenge as attack techniques evolve constantly"
    ],
    "avoidIf": [
      "You are uncomfortable with legal and ethical boundaries of hacking",
      "You want stable, repetitive routine work without constant learning",
      "You expect fast high income without building deep technical skills first"
    ],
    "roadmap": [
      {
        "year": "Phase 1",
        "milestone": "Learn networking, Linux, and complete TryHackMe pathways"
      },
      {
        "year": "Phase 2",
        "milestone": "Acquire certifications (CEH, Security+) and enter SOC or bug bounty"
      }
    ],
    "startupOps": [
      "Cyber security consultancy for SMEs",
      "Penetration testing service",
      "Security awareness training company",
      "Bug bounty hunting as independent income"
    ],
    "summary": "Cyber security is one of the highest-income and most needed fields in Pakistan 2026. Start with TryHackMe today — it is free and addictive. Every organization in the world needs defenders. Become the guardian they are searching for!"
  },
  {
    "id": "bs-cs",
    "title": "BS Computer Science",
    "domain": DomainType.TECHNOLOGY,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Foundational computing degree covering algorithms, theory and software development",
      "Bridges mathematics, logic and practical programming for solving complex real-world problems",
      "The gateway to the highest-paying technical careers in Pakistan and globally"
    ],
    "subjects": [
      "Programming — C++, Java, Python",
      "Data structures and algorithm design",
      "Operating systems internals",
      "Database design and SQL/NoSQL",
      "Computer networks and distributed systems",
      "Software engineering methodology",
      "Artificial intelligence and machine learning basics",
      "Discrete mathematics and theory of computation"
    ],
    "marketReality": [
      "Highest demand technical degree in Pakistan — every sector needs CS graduates",
      "Remote freelancing allows earning in USD/GBP without leaving Pakistan at all",
      "Startups, tech companies and multinationals actively compete for CS graduates",
      "AI, cloud and blockchain creating entirely new CS career tracks in 2026"
    ],
    "jobRoles": [
      "Software Engineer (Backend / Frontend / Full Stack)",
      "AI/ML Engineer",
      "DevOps / Cloud Engineer",
      "Data Scientist / Data Engineer",
      "System Architect / Principal Engineer"
    ],
    "keySectors": [
      "Software development companies and software houses",
      "IT multinationals (Google, Microsoft, Amazon, Meta — remote)",
      "Fintech and banking IT departments",
      "Freelancing platforms (Upwork, Toptal)",
      "Government digital transformation projects (NADRA, FBR, etc.)"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "150,000 – 400,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "500,000 – 1,200,000 PKR"
      },
      {
        "level": "Freelance (beginner)",
        "salary": "$500 – $1,500/month"
      },
      {
        "level": "Freelance (senior)",
        "salary": "$5,000 – $15,000+/month"
      }
    ],
    "skills": [
      "Python, JavaScript and Java proficiency",
      "Data structures and algorithms (DSA)",
      "Database design — SQL (PostgreSQL) and NoSQL (MongoDB)",
      "Git/GitHub version control",
      "Cloud platforms (AWS, Azure, GCP)",
      "System design for scalable distributed applications",
      "Problem solving mindset and continuous self-learning discipline"
    ],
    "universities": [
      "FAST-NU (top-ranked for CS in Pakistan)",
      "NUST SEECS Islamabad",
      "LUMS Lahore",
      "COMSATS University",
      "UET Lahore CS department",
      "IBA Karachi",
      "Air University Islamabad"
    ],
    "strategy": [
      "BS CS -> Junior Dev -> Senior Dev -> Tech Lead -> Engineering Manager -> CTO",
      "BS CS -> Upwork/Fiverr profile -> Freelance -> Agency / Consultancy owner",
      "BS CS -> AI/ML specialization -> ML Engineer -> AI Researcher",
      "BS CS -> MS CS abroad -> Global tech company -> Silicon Valley career"
    ],
    "chooseIf": [
      "You genuinely enjoy problem solving, logical thinking and mathematics",
      "You are excited by technology and love building real things from scratch",
      "You want one of the highest income career paths available from Pakistan"
    ],
    "avoidIf": [
      "You dislike mathematics, algorithms or sitting for hours debugging code",
      "You expect easy grades without deep rigorous problem-solving effort",
      "You want a non-technical career path after graduation"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS CS degree, master DSA, and build strong open-source portfolio"
      }
    ],
    "startupOps": [
      "Software product or SaaS startup",
      "AI-powered tools for Pakistan industries",
      "Tech consultancy and software development agency",
      "Open source product and monetize"
    ],
    "summary": "BS Computer Science is the golden ticket of Pakistan digital economy in 2026. Build a GitHub portfolio, solve 200+ LeetCode problems and contribute to open source. The world runs on code — you are learning to write its future!"
  },
  {
    "id": "bs-se",
    "title": "BS Software Engineering",
    "domain": DomainType.TECHNOLOGY,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Engineering-focused computing degree centered on designing, building, and maintaining large-scale software systems",
      "Emphasizes structured processes, quality assurance, and team-based development over pure theory",
      "PEC-recognized track for students who want to build and ship production-grade software professionally"
    ],
    "subjects": [
      "Programming fundamentals — C++, Java, Python",
      "Software requirements engineering and analysis",
      "Software design patterns and architecture",
      "Software project management and Agile/Scrum",
      "Software testing and quality assurance",
      "Database systems and enterprise application development",
      "Human-computer interaction and UI/UX basics",
      "DevOps, CI/CD and cloud deployment"
    ],
    "marketReality": [
      "Software houses across Pakistan actively recruit SE graduates for structured, process-driven development roles",
      "PEC registration adds credibility for engineering-titled roles in regulated industries and government projects",
      "Demand for QA/testing and DevOps specialists is rising alongside pure development roles",
      "Export-oriented software houses (serving US/UK/EU clients) remain the top-paying local employers"
    ],
    "jobRoles": [
      "Software Engineer",
      "QA / Test Engineer",
      "DevOps Engineer",
      "Project Coordinator (Tech)",
      "Systems Analyst"
    ],
    "keySectors": [
      "Software houses",
      "IT export companies",
      "Banking & fintech IT",
      "Telecom",
      "Government IT projects"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "55,000 – 110,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "150,000 – 350,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "400,000 – 900,000 PKR"
      },
      {
        "level": "Freelance / Remote",
        "salary": "$1,000 – $8,000+/month"
      }
    ],
    "skills": [
      "Strong programming fundamentals (C++, Java, Python)",
      "Software design and architecture patterns",
      "Testing frameworks and QA methodology",
      "Agile/Scrum project workflows",
      "Version control and CI/CD pipelines",
      "Communication and cross-functional teamwork"
    ],
    "universities": [
      "NUST SEECS Islamabad",
      "FAST-NUCES",
      "UET Lahore (Software Engineering Department)",
      "COMSATS University",
      "Bahria University",
      "Mehran University of Engineering & Technology, Jamshoro",
      "Air University Islamabad"
    ],
    "strategy": [
      "BS SE -> Junior Software Engineer -> Senior Engineer -> Engineering Manager",
      "BS SE -> QA Engineer -> Automation Lead -> QA Manager",
      "BS SE -> DevOps Engineer -> Cloud Architect -> Infrastructure Lead"
    ],
    "chooseIf": [
      "You like structured, process-driven building of large systems",
      "You enjoy both coding and planning/managing how software gets built",
      "You want an engineering-recognized (PEC) technical credential"
    ],
    "avoidIf": [
      "You dislike documentation, planning, and process overhead",
      "You want to focus purely on algorithms/theory over applied engineering",
      "You prefer fast, unstructured solo coding over team workflows"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS SE degree, focus on team projects and CI/CD"
      }
    ],
    "startupOps": [
      "Software development agency serving international clients",
      "SaaS product for a niche local industry problem",
      "QA/testing-as-a-service for smaller software houses"
    ],
    "summary": "BS Software Engineering trains you to ship reliable software at scale — the PEC-recognized bridge between coding skill and professional engineering discipline."
  },
  {
    "id": "bs-it",
    "title": "BS Information Technology",
    "domain": DomainType.TECHNOLOGY,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Applied computing degree focused on deploying, managing, and securing IT systems and infrastructure for organizations",
      "More hands-on and business-application-focused than BS Computer Science degree approach",
      "Prepares graduates for roles that keep an organization digital infrastructure running smoothly"
    ],
    "subjects": [
      "Programming fundamentals — Java, Python, web technologies",
      "Networking and system administration",
      "Database administration and management",
      "IT infrastructure and cloud computing",
      "Information security fundamentals",
      "Web and enterprise application development",
      "IT project management",
      "Business process and enterprise systems (ERP basics)"
    ],
    "marketReality": [
      "Every mid-to-large Pakistani organization needs IT staff to manage networks, systems, and support — steady, broad-based demand",
      "Cloud migration (AWS/Azure adoption) is creating strong demand for IT infrastructure and cloud support roles",
      "IT graduates often move fluidly between system administration, support, and junior development roles",
      "Government digitization projects (NADRA, FBR, provincial e-governance) are major IT-sector employers"
    ],
    "jobRoles": [
      "IT Support Specialist",
      "System Administrator",
      "Network Administrator",
      "Database Administrator",
      "IT Project Coordinator"
    ],
    "keySectors": [
      "Corporate IT departments",
      "Banks & financial institutions",
      "Telecom",
      "Government e-governance projects",
      "Cloud/managed service providers"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "45,000 – 90,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "120,000 – 280,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "300,000 – 700,000 PKR"
      },
      {
        "level": "Freelance / Remote",
        "salary": "$500 – $4,000+/month"
      }
    ],
    "skills": [
      "Networking (TCP/IP, routing, switching)",
      "System administration (Windows/Linux server)",
      "Database management (SQL)",
      "Cloud platforms (AWS, Azure, GCP)",
      "IT security basics",
      "Troubleshooting and vendor/stakeholder coordination"
    ],
    "universities": [
      "NUST SEECS Islamabad",
      "COMSATS University",
      "FAST-NUCES",
      "Punjab University College of IT",
      "Sindh Madressatul Islam University",
      "Mehran University of Engineering & Technology, Jamshoro",
      "Air University Islamabad"
    ],
    "strategy": [
      "BS IT -> IT Support -> System Administrator -> IT Infrastructure Manager",
      "BS IT -> Network Administrator -> Network Engineer -> Network Architect",
      "BS IT -> Cloud Support -> Cloud Engineer -> Cloud Solutions Architect"
    ],
    "chooseIf": [
      "You want a broad, business-applicable IT skill set rather than deep theory",
      "You enjoy troubleshooting, systems, and keeping things running",
      "You want steady demand across almost every industry sector"
    ],
    "avoidIf": [
      "You want to specialize deeply in algorithms, AI, or software architecture",
      "You are not interested in networking/infrastructure-type work",
      "You want the highest-ceiling software engineering salaries specifically"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS IT and acquire industry certifications (CCNA, AWS)"
      }
    ],
    "startupOps": [
      "Managed IT services for small and medium businesses",
      "Cloud migration and infrastructure consulting",
      "IT support and helpdesk outsourcing service"
    ],
    "summary": "BS IT is the practical backbone degree — every organization in Pakistan needs someone who keeps its systems, networks, and data running."
  },
  {
    "id": "bs-ai",
    "title": "BS Artificial Intelligence",
    "domain": DomainType.TECHNOLOGY,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Specialized computing degree focused on machine learning, deep learning, and intelligent systems",
      "Combines strong mathematics and statistics with applied programming for building AI-driven products",
      "One of the fastest-growing and most future-oriented degree tracks in Pakistan tech landscape"
    ],
    "subjects": [
      "Programming — Python, and ML frameworks (PyTorch, TensorFlow)",
      "Linear algebra, probability, and statistics for AI",
      "Machine learning algorithms and model evaluation",
      "Deep learning and neural networks",
      "Natural language processing",
      "Computer vision",
      "Data structures and algorithms",
      "AI ethics and responsible AI deployment"
    ],
    "marketReality": [
      "Global and local demand for AI/ML talent is rising sharply as companies embed AI into products",
      "Pakistani AI graduates increasingly compete for remote roles at international AI-focused startups",
      "Local fintech, e-commerce, and telecom companies are building in-house AI/ML teams",
      "AI specialization commands a clear salary premium over general CS/SE roles at similar experience levels"
    ],
    "jobRoles": [
      "Machine Learning Engineer",
      "AI Research Assistant",
      "Data Scientist",
      "NLP Engineer",
      "Computer Vision Engineer"
    ],
    "keySectors": [
      "AI startups",
      "Research labs & universities",
      "Fintech & e-commerce",
      "Global tech companies (remote)",
      "Telecom AI divisions"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "70,000 – 140,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "180,000 – 450,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "500,000 – 1,300,000 PKR"
      },
      {
        "level": "Freelance / Remote",
        "salary": "$1,500 – $10,000+/month"
      }
    ],
    "skills": [
      "Python and ML frameworks (PyTorch/TensorFlow)",
      "Strong mathematics — linear algebra, probability, statistics",
      "Data preprocessing and feature engineering",
      "Model training, tuning, and evaluation",
      "Cloud ML deployment (AWS SageMaker, GCP Vertex AI)",
      "Research reading and staying current with fast-moving AI literature"
    ],
    "universities": [
      "NUST SEECS Islamabad",
      "FAST-NUCES",
      "LUMS SBASSE",
      "Information Technology University (ITU) Lahore",
      "COMSATS University",
      "Air University Islamabad",
      "GIK Institute of Engineering Sciences & Technology"
    ],
    "strategy": [
      "BS AI -> ML Engineer -> Senior ML Engineer -> AI Team Lead",
      "BS AI -> Research Assistant -> MS/PhD abroad -> AI Researcher",
      "BS AI -> Data Scientist -> Applied Scientist -> Head of AI"
    ],
    "chooseIf": [
      "You are genuinely strong in math and statistics, not just coding",
      "You want to work on the most in-demand, fastest-evolving tech field",
      "You are comfortable with continuous learning as the field moves quickly"
    ],
    "avoidIf": [
      "You dislike heavy math and probability/statistics coursework",
      "You want quick, predictable career outcomes without research-style uncertainty",
      "You are not prepared to keep learning constantly as techniques evolve"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS AI, focus on advanced mathematics and publish ML projects"
      }
    ],
    "startupOps": [
      "AI-powered tool for a specific Pakistani industry (agriculture, healthcare, retail)",
      "Custom ML model consulting for local businesses",
      "AI automation / chatbot service for SMEs"
    ],
    "summary": "BS Artificial Intelligence puts you at the center of the most transformative technology of this decade — but it demands real strength in math, not just code."
  },
  {
    "id": "bs-data-science",
    "title": "BS Data Science",
    "domain": DomainType.TECHNOLOGY,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Interdisciplinary degree combining statistics, programming, and business analytics to extract insight from data",
      "Focuses on turning raw data into decisions — analysis, visualization, and predictive modeling",
      "Bridges technical data skills with the business context needed to make data useful"
    ],
    "subjects": [
      "Programming — Python and R",
      "Statistics and probability",
      "Data wrangling and cleaning",
      "Data visualization (Tableau, Power BI, matplotlib)",
      "Machine learning fundamentals",
      "Big data tools (Spark, Hadoop basics)",
      "SQL and database querying",
      "Business analytics and storytelling with data"
    ],
    "marketReality": [
      "Every data-generating business — banks, telecoms, e-commerce, retail — increasingly needs data analysts and scientists",
      "Data science roles combine strong local demand with excellent remote/freelance opportunities",
      "Companies increasingly value data scientists who can also communicate findings to non-technical stakeholders",
      "Overlap with AI/ML means data science graduates can move into ML engineering roles with further specialization"
    ],
    "jobRoles": [
      "Data Analyst",
      "Data Scientist",
      "Business Intelligence Analyst",
      "Data Engineer",
      "Analytics Consultant"
    ],
    "keySectors": [
      "Banking & fintech",
      "E-commerce & retail",
      "Telecom",
      "Consulting firms",
      "Freelance/remote analytics roles"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "55,000 – 110,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "150,000 – 380,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "400,000 – 1,000,000 PKR"
      },
      {
        "level": "Freelance / Remote",
        "salary": "$800 – $6,000+/month"
      }
    ],
    "skills": [
      "Python and/or R proficiency",
      "SQL and data querying",
      "Statistical analysis and hypothesis testing",
      "Data visualization tools (Tableau, Power BI)",
      "Machine learning fundamentals",
      "Communicating insights to non-technical audiences"
    ],
    "universities": [
      "FAST-NUCES",
      "NUST SEECS Islamabad",
      "LUMS SBASSE",
      "Information Technology University (ITU) Lahore",
      "COMSATS University",
      "IBA Karachi",
      "Air University Islamabad"
    ],
    "strategy": [
      "BS Data Science -> Data Analyst -> Data Scientist -> Lead Data Scientist",
      "BS Data Science -> Business Intelligence Analyst -> Analytics Manager -> Head of Analytics",
      "BS Data Science -> Data Engineer -> Senior Data Engineer -> Data Platform Lead"
    ],
    "chooseIf": [
      "You enjoy working with numbers, patterns, and telling stories through data",
      "You want a career that blends technical skill with business impact",
      "You want strong remote/freelance analytics opportunities"
    ],
    "avoidIf": [
      "You want purely theoretical or research-only work",
      "You dislike statistics and quantitative reasoning",
      "You prefer building software products over analyzing data"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS Data Science, build data visualization portfolio"
      }
    ],
    "startupOps": [
      "Data analytics consultancy for SMEs",
      "Custom dashboard/reporting service for local businesses",
      "Niche data product (market insights, pricing analytics)"
    ],
    "summary": "BS Data Science turns raw information into decisions — one of the most business-relevant, broadly hireable tech degrees available today."
  },
  {
    "id": "bs-cyber-security",
    "title": "BS Cyber Security",
    "domain": DomainType.TECHNOLOGY,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Dedicated degree focused on protecting systems, networks, and data from cyber threats at a professional level",
      "Combines networking, systems, cryptography, and ethical hacking into a structured 4-year curriculum",
      "Increasingly critical as Pakistan banks, telecoms, and government systems face rising cyber threats"
    ],
    "subjects": [
      "Networking and network security",
      "Operating systems and system security",
      "Cryptography and secure communications",
      "Ethical hacking and penetration testing",
      "Digital forensics and incident response",
      "Security governance, risk, and compliance",
      "Web and application security",
      "Cloud and infrastructure security"
    ],
    "marketReality": [
      "Cyberattacks on Pakistani financial and government systems are pushing organizations to build dedicated security teams",
      "State Bank of Pakistan regulations increasingly require banks to maintain formal cybersecurity capacity",
      "Certified, degree-holding security professionals are preferred for senior/regulated roles over certificate-only candidates",
      "International remote security and bug-bounty work offers a strong income path alongside local employment"
    ],
    "jobRoles": [
      "Security Analyst",
      "Penetration Tester",
      "Security Engineer",
      "Digital Forensics Analyst",
      "Security Consultant"
    ],
    "keySectors": [
      "Banks & financial institutions",
      "Telecom",
      "Government cyber agencies",
      "IT security firms",
      "International remote security teams"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "150,000 – 400,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "450,000 – 1,000,000 PKR"
      },
      {
        "level": "Freelance / Remote",
        "salary": "$1,000 – $8,000+/month"
      }
    ],
    "skills": [
      "Networking and network security protocols",
      "Penetration testing tools and methodology",
      "Cryptography fundamentals",
      "Digital forensics and incident response",
      "Security compliance frameworks (ISO 27001, NIST)",
      "Analytical thinking and ethical judgment"
    ],
    "universities": [
      "NUST SEECS Islamabad",
      "Air University Islamabad",
      "COMSATS University",
      "FAST-NUCES",
      "National University of Computer & Emerging Sciences (Peshawar campus)",
      "Bahria University",
      "Mehran University of Engineering & Technology, Jamshoro"
    ],
    "strategy": [
      "BS Cyber Security -> SOC Analyst -> Security Engineer -> Security Architect",
      "BS Cyber Security -> Penetration Tester -> Senior Pen Tester -> Red Team Lead",
      "BS Cyber Security -> Compliance Analyst -> GRC Manager -> CISO"
    ],
    "chooseIf": [
      "You are drawn to investigation, risk, and defending critical systems",
      "You want a degree with strong regulated-industry (banking/government) demand",
      "You are willing to hold certifications and keep learning throughout your career"
    ],
    "avoidIf": [
      "You are uncomfortable with high-stakes, high-responsibility work",
      "You dislike compliance, documentation, and formal governance processes",
      "You want a purely creative or product-building tech career"
    ],
    "roadmap": [
      {
        "year": "Year 1-4",
        "milestone": "Complete BS Cyber Security, acquire OSCP/CISSP certs"
      }
    ],
    "startupOps": [
      "Security auditing and compliance consultancy",
      "Managed security services for SMEs and startups",
      "Cybersecurity training and awareness programs for local businesses"
    ],
    "summary": "BS Cyber Security is Pakistan most regulation-backed, highest-trust tech degree — the formal path into a field where demand only grows as threats do."
  },
  {
    "id": "dae-civil",
    "title": "DAE Civil Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "3 Years (After Matric)",
    "category": "Diploma",
    "description": [
      "A technical diploma focused on practical construction, surveying and site supervision skills",
      "Regulated by the Punjab/Sindh Boards of Technical Education (PBTE/SBTE) under TEVTA/NAVTTC",
      "A fast, low-cost entry route into the construction industry for students from rural and technical backgrounds"
    ],
    "subjects": [
      "Building construction and materials",
      "Surveying and levelling",
      "Concrete technology and structural drawing",
      "Estimating, costing and quantity surveying",
      "AutoCAD for civil drafting",
      "Highway and irrigation engineering basics",
      "Soil mechanics fundamentals",
      "Workshop practice and site supervision"
    ],
    "marketReality": [
      "Consistent demand from Pakistan's construction and housing boom, especially in Punjab and Sindh",
      "DAE holders commonly work as site supervisors, draftsmen and surveyors on private and government projects",
      "PEC now allows DAE holders limited registration as Associate Engineers under revised bylaws",
      "A strong stepping-stone toward BS Civil Engineering via 2nd-year lateral entry"
    ],
    "jobRoles": [
      "Site Supervisor",
      "Civil Draftsman",
      "Surveyor",
      "Estimator / Quantity Surveyor",
      "Junior Site Engineer"
    ],
    "keySectors": [
      "Construction companies",
      "Government works departments (C&W, PHED)",
      "Real estate developers",
      "Consulting/design firms",
      "Irrigation and public works agencies"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "30,000 – 50,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "55,000 – 90,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "100,000 – 180,000 PKR"
      },
      {
        "level": "Site Supervisor (large projects)",
        "salary": "150,000 – 250,000 PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$800 – $2,000/month"
      }
    ],
    "skills": [
      "AutoCAD and basic civil drafting",
      "Site measurement and surveying instruments",
      "Basic estimating and costing",
      "Understanding of building codes",
      "Physical stamina for site work",
      "Communication with labour and contractors"
    ],
    "universities": [
      "Govt. College of Technology, Karachi",
      "Sindh Board of Technical Education affiliated institutes",
      "Punjab Board of Technical Education affiliated polytechnics",
      "TEVTA Punjab Institutes of Technology",
      "Mehran University College of Technology, Jamshoro",
      "Govt. Technical Training Institutes (Hyderabad, Sukkur)",
      "Balochistan/KPK Boards of Technical Education institutes"
    ],
    "strategy": [
      "DAE Civil → Site Supervisor → Junior Site Engineer → Project Coordinator",
      "DAE Civil → 2nd-year lateral entry into BS Civil Engineering → Licensed Civil Engineer",
      "DAE Civil → Gulf construction job → Site Foreman → Site Manager"
    ],
    "chooseIf": [
      "You want to start earning quickly without a 4-year degree",
      "You prefer hands-on, practical site work over heavy theory",
      "You plan to later upgrade to a BS degree through lateral entry"
    ],
    "avoidIf": [
      "You want a PEC-chartered engineering title immediately",
      "You want a purely office-based, design-heavy career",
      "You are aiming directly for high-paying corporate engineering roles"
    ],
    "roadmap": [],
    "startupOps": [
      "Small-scale construction contracting business",
      "Home renovation and interior fit-out services",
      "Building material supply and estimation consultancy"
    ],
    "summary": "DAE Civil Engineering is the fastest practical route into Pakistan's construction industry — a great launchpad if you later upgrade to a full BS Civil degree."
  },
  {
    "id": "dae-electrical",
    "title": "DAE Electrical Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "3 Years (After Matric)",
    "category": "Diploma",
    "description": [
      "A technical diploma covering electrical wiring, machines, and power distribution basics",
      "Prepares students for hands-on technician and supervisory roles in the power and industrial sector",
      "Offered through PBTE/SBTE-affiliated polytechnics under TEVTA/NAVTTC oversight"
    ],
    "subjects": [
      "Basic electrical circuits and wiring",
      "Electrical machines (motors, generators, transformers)",
      "Power distribution and switchgear",
      "Industrial control and PLC basics",
      "Electrical drawing and estimating",
      "Domestic and industrial wiring practice",
      "Electrical safety and maintenance",
      "Workshop and lab practicals"
    ],
    "marketReality": [
      "Strong demand for electrical technicians in factories, housing societies, and utility companies",
      "K-Electric, WAPDA and industrial units regularly hire DAE Electrical graduates as line/technical staff",
      "Growing solar installation industry is a fast-expanding hiring sector for this diploma",
      "Lateral entry into BS Electrical Engineering keeps a bachelor's pathway open"
    ],
    "jobRoles": [
      "Electrical Technician",
      "Maintenance Supervisor",
      "Wireman/Line Supervisor",
      "Solar Installation Technician",
      "Junior Electrical Draftsman"
    ],
    "keySectors": [
      "Power distribution companies (K-Electric, WAPDA DISCOs)",
      "Textile and manufacturing plants",
      "Solar energy companies",
      "Construction and real estate",
      "Oil, gas and industrial plants"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "28,000 – 45,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "50,000 – 85,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "90,000 – 160,000 PKR"
      },
      {
        "level": "Solar Technician (skilled)",
        "salary": "70,000 – 140,000 PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$700 – $1,800/month"
      }
    ],
    "skills": [
      "Electrical wiring and circuit troubleshooting",
      "Reading electrical drawings",
      "Basic PLC and control panel handling",
      "Safety compliance",
      "Multimeter and testing equipment use",
      "Team coordination on-site"
    ],
    "universities": [
      "Govt. College of Technology, Karachi",
      "Sindh Board of Technical Education institutes",
      "Punjab TEVTA Institutes of Technology",
      "Mehran University College of Technology, Jamshoro",
      "Govt. Polytechnic Institutes (Hyderabad, Larkana, Sukkur)",
      "Balochistan Board of Technical Education institutes",
      "NAVTTC-affiliated training centers"
    ],
    "strategy": [
      "DAE Electrical → Electrical Technician → Maintenance Supervisor → Plant Electrical Head",
      "DAE Electrical → Lateral entry into BS Electrical Engineering → Design/Power Engineer",
      "DAE Electrical → Solar installation trade → Solar business owner"
    ],
    "chooseIf": [
      "You want quick, practical entry into electrical trades",
      "You are interested in the growing solar/renewable energy sector",
      "You want the option to upgrade later into a full BS degree"
    ],
    "avoidIf": [
      "You need an immediately PEC-chartered engineer title",
      "You dislike hands-on physical/technical work",
      "You want a purely research-oriented career"
    ],
    "roadmap": [],
    "startupOps": [
      "Home and commercial solar installation service",
      "Electrical maintenance and repair contracting",
      "Electrical fittings and equipment trading business"
    ],
    "summary": "DAE Electrical Engineering opens fast, practical career doors — and the booming solar energy sector makes it more valuable in 2026 than ever before."
  },
  {
    "id": "dae-mechanical",
    "title": "DAE Mechanical Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "3 Years (After Matric)",
    "category": "Diploma",
    "description": [
      "A technical diploma covering machines, manufacturing processes and mechanical maintenance",
      "Builds practical workshop and factory-floor skills valued across Pakistan's industrial sector",
      "Offered by PBTE/SBTE-affiliated polytechnics under TEVTA/NAVTTC"
    ],
    "subjects": [
      "Workshop technology and machine shop practice",
      "Engineering drawing and AutoCAD",
      "Thermodynamics and heat engines basics",
      "Machine design fundamentals",
      "Automobile engineering basics",
      "Industrial maintenance and fitting",
      "Welding and fabrication",
      "Manufacturing processes"
    ],
    "marketReality": [
      "Textile, cement, automobile and manufacturing sectors regularly hire DAE Mechanical technicians",
      "Automobile assembly plants (Suzuki, Toyota Indus, Honda) hire diploma holders for production lines",
      "Strong overseas demand, particularly Gulf industrial and maintenance jobs",
      "Lateral entry pathway into BS Mechanical Engineering remains available"
    ],
    "jobRoles": [
      "Maintenance Technician",
      "Production Supervisor",
      "CAD/CAM Draftsman",
      "Quality Control Inspector",
      "Workshop Foreman"
    ],
    "keySectors": [
      "Automobile manufacturing plants",
      "Textile and cement industries",
      "Oil, gas and power plants",
      "Manufacturing and fabrication units",
      "Gulf industrial/maintenance contractors"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "28,000 – 48,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "55,000 – 90,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "95,000 – 170,000 PKR"
      },
      {
        "level": "Production Supervisor",
        "salary": "120,000 – 200,000 PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$700 – $1,900/month"
      }
    ],
    "skills": [
      "Machine shop and workshop practice",
      "AutoCAD mechanical drafting",
      "Welding and fabrication basics",
      "Maintenance troubleshooting",
      "Quality inspection techniques",
      "Team supervision on the shop floor"
    ],
    "universities": [
      "Govt. College of Technology, Karachi",
      "Sindh Board of Technical Education institutes",
      "Punjab TEVTA Institutes of Technology",
      "Mehran University College of Technology, Jamshoro",
      "Govt. Polytechnic Institutes (Hyderabad, Sukkur, Larkana)",
      "NED University Affiliated Technical College",
      "NAVTTC-affiliated training centers"
    ],
    "strategy": [
      "DAE Mechanical → Maintenance Technician → Production Supervisor → Plant Manager",
      "DAE Mechanical → Lateral entry into BS Mechanical Engineering → Design Engineer",
      "DAE Mechanical → Gulf industrial job → Senior Technician → Workshop Manager"
    ],
    "chooseIf": [
      "You enjoy hands-on machine and workshop work",
      "You want quick entry into Pakistan's manufacturing sector",
      "You want an affordable path with a later upgrade option"
    ],
    "avoidIf": [
      "You want an immediately chartered PEC engineer title",
      "You are more interested in software or pure theory",
      "You want a purely design/research based career"
    ],
    "roadmap": [],
    "startupOps": [
      "Workshop and fabrication service business",
      "Automobile repair and maintenance garage",
      "CNC/CAD-CAM job work service"
    ],
    "summary": "DAE Mechanical Engineering is a proven, practical route into Pakistan's factories and workshops — with strong Gulf demand for skilled technicians."
  },
  {
    "id": "eng-bs-civil",
    "title": "BS / BE Civil Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The engineering discipline behind Pakistan's buildings, roads, bridges, dams and water systems",
      "Combines structural design, construction management and infrastructure planning",
      "PEC-regulated degree required for licensed practice as a professional Civil Engineer"
    ],
    "subjects": [
      "Structural analysis and design",
      "Concrete and steel structures",
      "Surveying and geomatics",
      "Geotechnical (soil) engineering",
      "Transportation and highway engineering",
      "Hydraulics and water resources engineering",
      "Construction management and estimating",
      "Engineering drawing and AutoCAD/Revit"
    ],
    "marketReality": [
      "Consistently high demand due to Pakistan's ongoing housing, CPEC infrastructure, and irrigation projects",
      "PEC registration (as Engineer, then Professional Engineer) is mandatory for signing off major projects",
      "Public sector recruitment (WAPDA, NHA, C&W, NESPAK) remains a major stable employer",
      "Gulf infrastructure booms continue to absorb large numbers of Pakistani civil engineers"
    ],
    "jobRoles": [
      "Structural Engineer",
      "Site/Project Engineer",
      "Construction Manager",
      "Design Engineer",
      "Water Resources Engineer"
    ],
    "keySectors": [
      "Construction and real estate developers",
      "Government infrastructure agencies (NHA, WAPDA, C&W)",
      "Consulting engineering firms (NESPAK, etc.)",
      "CPEC and mega infrastructure projects",
      "Gulf construction and contracting firms"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "55,000 – 100,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "120,000 – 250,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "280,000 – 600,000 PKR"
      },
      {
        "level": "Project/Design Director",
        "salary": "600,000 – 1,000,000+ PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$1,500 – $5,000/month"
      }
    ],
    "skills": [
      "AutoCAD, Revit and structural design software (ETABS, STAAD.Pro)",
      "Structural analysis and load calculations",
      "Project and construction management",
      "Site supervision and surveying",
      "Cost estimating and quantity surveying",
      "PEC code compliance knowledge"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi",
      "UET Lahore",
      "Mehran University of Engineering & Technology, Jamshoro",
      "NUST Islamabad",
      "UET Taxila",
      "COMSATS University",
      "Quaid-e-Awam University, Nawabshah"
    ],
    "strategy": [
      "BS Civil → Site Engineer → Project Manager → Construction Director",
      "BS Civil → Structural Design Engineer → Senior Structural Consultant → Principal Engineer",
      "BS Civil → MS Civil/Structural abroad → International infrastructure consultant"
    ],
    "chooseIf": [
      "You enjoy math, physics and designing real physical structures",
      "You want a PEC-chartered, universally respected engineering title",
      "You want strong, stable public and private sector demand"
    ],
    "avoidIf": [
      "You dislike lengthy site visits and outdoor fieldwork",
      "You want fast-changing, purely software-based work",
      "You are not comfortable with technical drawing and structural calculations"
    ],
    "roadmap": [],
    "startupOps": [
      "Construction and contracting company",
      "Structural design and consultancy firm",
      "Real estate development venture"
    ],
    "summary": "BS Civil Engineering remains one of Pakistan's most in-demand and respected engineering degrees, backed by continuous infrastructure growth and Gulf opportunities."
  },
  {
    "id": "eng-bs-mechanical",
    "title": "BS / BE Mechanical Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The broadest engineering discipline, covering machines, energy systems, and manufacturing",
      "Applies physics and materials science to design, build, and maintain mechanical systems",
      "PEC-regulated; opens doors across automotive, energy, textile, and manufacturing industries"
    ],
    "subjects": [
      "Thermodynamics and heat transfer",
      "Fluid mechanics",
      "Machine design",
      "Manufacturing processes and CNC/CAD-CAM",
      "Materials science and strength of materials",
      "Automobile engineering",
      "HVAC and energy systems",
      "Robotics and mechatronics basics"
    ],
    "marketReality": [
      "Textile, cement, automobile and power sectors are Pakistan's largest employers of mechanical engineers",
      "Energy sector growth (thermal, solar, and industrial) continues to create new mechanical roles",
      "PEC registration is required for design authority on regulated mechanical projects",
      "Strong Gulf demand for mechanical/maintenance/HVAC engineers"
    ],
    "jobRoles": [
      "Design Engineer",
      "Maintenance/Plant Engineer",
      "Production Engineer",
      "HVAC Engineer",
      "Automobile/Manufacturing Engineer"
    ],
    "keySectors": [
      "Textile and cement industries",
      "Automobile manufacturing (Suzuki, Toyota Indus, Honda)",
      "Power and energy companies",
      "Oil and gas sector",
      "Gulf industrial and HVAC contractors"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "50,000 – 95,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "110,000 – 230,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "250,000 – 550,000 PKR"
      },
      {
        "level": "Plant/Engineering Manager",
        "salary": "500,000 – 900,000+ PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$1,400 – $4,500/month"
      }
    ],
    "skills": [
      "SolidWorks, AutoCAD, and CAD/CAM software",
      "Thermodynamics and fluid mechanics application",
      "Manufacturing and production planning",
      "Maintenance and troubleshooting",
      "Project management basics",
      "PEC code and safety standards knowledge"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi",
      "UET Lahore",
      "Mehran University of Engineering & Technology, Jamshoro",
      "NUST Islamabad",
      "GIK Institute",
      "UET Taxila",
      "COMSATS University"
    ],
    "strategy": [
      "BS Mechanical → Production Engineer → Plant Manager → Operations Director",
      "BS Mechanical → Design Engineer → Senior Design Lead → R&D Head",
      "BS Mechanical → MS abroad → International energy/manufacturing engineer"
    ],
    "chooseIf": [
      "You enjoy understanding how machines and systems work",
      "You want the widest range of industries to work in",
      "You want a stable, PEC-chartered engineering career"
    ],
    "avoidIf": [
      "You want a purely software/desk-based career",
      "You dislike factory floors and industrial environments",
      "You are not comfortable with heavy math and physics"
    ],
    "roadmap": [],
    "startupOps": [
      "Manufacturing or fabrication workshop",
      "HVAC installation and maintenance business",
      "Product design and prototyping consultancy"
    ],
    "summary": "BS Mechanical Engineering's versatility across textiles, automobiles, energy and manufacturing makes it one of Pakistan's most broadly employable engineering degrees."
  },
  {
    "id": "eng-bs-electrical",
    "title": "BS / BE Electrical Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Covers power generation, transmission, distribution, and electrical systems design",
      "Foundational to Pakistan's energy sector, industry, and growing renewable energy market",
      "PEC-regulated degree required for chartered Electrical Engineer status"
    ],
    "subjects": [
      "Circuit analysis and electronics",
      "Power systems and transmission",
      "Electrical machines and drives",
      "Control systems",
      "Renewable energy systems (solar/wind)",
      "Power electronics",
      "Electrical machine design",
      "High-voltage engineering"
    ],
    "marketReality": [
      "Pakistan's energy shortage and grid expansion create ongoing demand for power engineers",
      "Rapid growth of the solar energy industry has opened a major new career track for EE graduates",
      "WAPDA, K-Electric, NTDC and IPPs remain large stable employers",
      "PEC registration required for design sign-off on regulated power projects"
    ],
    "jobRoles": [
      "Power System Engineer",
      "Design/Protection Engineer",
      "Solar/Renewable Energy Engineer",
      "Electrical Maintenance Engineer",
      "Control Systems Engineer"
    ],
    "keySectors": [
      "Power distribution companies (K-Electric, WAPDA DISCOs)",
      "Independent Power Producers (IPPs)",
      "Solar energy companies",
      "Manufacturing and textile plants",
      "Gulf power and utility contractors"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "55,000 – 100,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "120,000 – 260,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "280,000 – 600,000 PKR"
      },
      {
        "level": "Power Systems Manager",
        "salary": "550,000 – 950,000+ PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$1,500 – $4,800/month"
      }
    ],
    "skills": [
      "MATLAB/Simulink and power systems software",
      "Circuit and power system analysis",
      "Solar/renewable energy system design",
      "PLC and control systems",
      "Electrical safety and PEC codes",
      "Project execution and maintenance planning"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi",
      "UET Lahore",
      "Mehran University of Engineering & Technology, Jamshoro",
      "NUST Islamabad",
      "GIK Institute",
      "UET Taxila",
      "COMSATS University"
    ],
    "strategy": [
      "BS EE → Power System Engineer → Senior Protection Engineer → Grid Operations Head",
      "BS EE → Solar Design Engineer → Renewable Energy Project Lead → Energy Consultant",
      "BS EE → MS Power/Electrical abroad → International utility engineer"
    ],
    "chooseIf": [
      "You are interested in power, energy, and electrical systems",
      "You want to work in Pakistan's fast-growing solar/renewable sector",
      "You want a PEC-chartered, industry-critical engineering career"
    ],
    "avoidIf": [
      "You want a purely software-only career (consider Computer/Software Engineering instead)",
      "You dislike heavy circuit theory and mathematics",
      "You are not comfortable with field/site electrical work"
    ],
    "roadmap": [],
    "startupOps": [
      "Solar EPC (installation) company",
      "Electrical design and consultancy firm",
      "Energy auditing and efficiency consultancy"
    ],
    "summary": "BS Electrical Engineering sits at the center of Pakistan's energy future — the booming solar industry makes 2026 an especially strong time to enter this field."
  },
  {
    "id": "eng-bs-chemical",
    "title": "BS / BE Chemical Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Applies chemistry, physics and math to design large-scale industrial and process plants",
      "Central to Pakistan's oil & gas, fertilizer, textile-chemical, and pharmaceutical industries",
      "PEC-regulated degree; a smaller but highly specialized and well-paid engineering field"
    ],
    "subjects": [
      "Chemical process principles",
      "Fluid mechanics and heat transfer",
      "Mass transfer operations",
      "Reaction engineering",
      "Process plant design",
      "Petroleum and petrochemical engineering",
      "Process safety and instrumentation",
      "Environmental engineering basics"
    ],
    "marketReality": [
      "Oil & gas, fertilizer (Engro, Fauji) and cement sectors are the largest employers",
      "A smaller graduating pool than civil/mechanical means less market saturation and strong pay for skilled graduates",
      "Growing pharmaceutical and FMCG manufacturing sectors add new opportunities",
      "PEC registration required for plant design and process safety sign-off"
    ],
    "jobRoles": [
      "Process Engineer",
      "Plant/Production Engineer",
      "Quality Control Engineer",
      "Petroleum/Refinery Engineer",
      "Process Safety Engineer"
    ],
    "keySectors": [
      "Oil, gas and refinery companies (PSO, PPL, OGDCL)",
      "Fertilizer companies (Engro, Fauji Fertilizer)",
      "Cement and petrochemical plants",
      "Pharmaceutical and FMCG manufacturers",
      "Gulf oil, gas and petrochemical firms"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "60,000 – 110,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "130,000 – 280,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "300,000 – 650,000 PKR"
      },
      {
        "level": "Plant/Process Manager",
        "salary": "600,000 – 1,100,000+ PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$2,000 – $6,000/month"
      }
    ],
    "skills": [
      "Process simulation (Aspen HYSYS, Aspen Plus)",
      "Process and plant design",
      "Mass and energy balance calculations",
      "Process safety (HAZOP) knowledge",
      "Instrumentation and control basics",
      "Regulatory and environmental compliance"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi",
      "UET Lahore",
      "Mehran University of Engineering & Technology, Jamshoro",
      "NUST Islamabad",
      "GIK Institute",
      "COMSATS University",
      "Dawood University of Engineering & Technology"
    ],
    "strategy": [
      "BS Chemical → Process Engineer → Senior Process Engineer → Plant Manager",
      "BS Chemical → Refinery/Petroleum Engineer → Operations Lead → Technical Director",
      "BS Chemical → MS abroad → International oil & gas/process engineer"
    ],
    "chooseIf": [
      "You enjoy chemistry and process-based problem solving",
      "You want a specialized, high-paying industrial engineering career",
      "You are interested in oil, gas, fertilizer or pharmaceutical industries"
    ],
    "avoidIf": [
      "You dislike heavy chemistry and thermodynamics coursework",
      "You want a large number of local job openings (fewer plants exist compared to construction)",
      "You want a purely design/software career with no industrial exposure"
    ],
    "roadmap": [],
    "startupOps": [
      "Process/plant safety consultancy",
      "Specialty chemical or FMCG small-batch manufacturing",
      "Environmental and effluent treatment consultancy"
    ],
    "summary": "BS Chemical Engineering is a smaller, specialized field — but its role in Pakistan's oil, gas and fertilizer industries makes it one of the highest-paying engineering degrees available."
  },
  {
    "id": "eng-bs-industrial",
    "title": "BS / BE Industrial Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Focuses on optimizing processes, systems, and operations across manufacturing and services",
      "Blends engineering, management, and data analysis to improve efficiency and reduce cost",
      "A rising field in Pakistan as textile, manufacturing and logistics companies modernize operations"
    ],
    "subjects": [
      "Operations research and optimization",
      "Production planning and control",
      "Quality control and Six Sigma",
      "Supply chain and logistics management",
      "Ergonomics and facility layout",
      "Engineering economics",
      "Lean manufacturing",
      "Statistics and data analysis for engineers"
    ],
    "marketReality": [
      "Textile, FMCG, and manufacturing sectors increasingly hire industrial engineers for process improvement",
      "Growing e-commerce and logistics sector (Daraz, TCS, Leopards) creates supply-chain-focused roles",
      "Overlaps well with management and consulting career tracks, widening job options beyond pure engineering",
      "Fewer graduates compared to civil/mechanical mean less market saturation"
    ],
    "jobRoles": [
      "Process/Industrial Engineer",
      "Quality Assurance Engineer",
      "Supply Chain Analyst",
      "Production Planner",
      "Operations Manager"
    ],
    "keySectors": [
      "Textile and garment manufacturing",
      "FMCG companies (Unilever, P&G, Nestlé)",
      "Logistics and e-commerce (Daraz, TCS)",
      "Automobile and manufacturing plants",
      "Management consulting firms"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "50,000 – 90,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "110,000 – 230,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "250,000 – 500,000 PKR"
      },
      {
        "level": "Operations/Supply Chain Manager",
        "salary": "500,000 – 900,000+ PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$1,300 – $4,000/month"
      }
    ],
    "skills": [
      "Process mapping and optimization tools",
      "Six Sigma and lean manufacturing methods",
      "Data analysis (Excel, Minitab, Power BI)",
      "Supply chain and inventory management",
      "Project management",
      "Communication and cross-functional coordination"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi",
      "UET Lahore",
      "NUST Islamabad",
      "Mehran University of Engineering & Technology, Jamshoro",
      "GIK Institute",
      "COMSATS University",
      "University of Engineering & Technology, Peshawar"
    ],
    "strategy": [
      "BS Industrial → Process Engineer → Operations Manager → Plant Director",
      "BS Industrial → Supply Chain Analyst → Logistics Manager → Head of Supply Chain",
      "BS Industrial → MBA/MS abroad → Management consultant"
    ],
    "chooseIf": [
      "You enjoy optimizing systems and solving efficiency problems",
      "You want an engineering degree that blends into management/business",
      "You are interested in manufacturing, logistics, or supply chains"
    ],
    "avoidIf": [
      "You want a purely hands-on, hardware-focused engineering role",
      "You want maximum name recognition among traditional engineering fields",
      "You dislike statistics and process-analysis work"
    ],
    "roadmap": [],
    "startupOps": [
      "Process/operations consultancy for SMEs",
      "Supply chain and logistics tech startup",
      "Quality and Six Sigma training/consulting service"
    ],
    "summary": "BS Industrial Engineering is Pakistan's rising 'efficiency' degree — perfect for those who want an engineering foundation with a clear path into operations and management."
  },
  {
    "id": "eng-bs-mechatronics",
    "title": "BS / BE Mechatronics & Robotics Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "A hybrid field combining mechanical, electrical, and computer engineering to build automated and robotic systems",
      "One of the fastest-growing engineering disciplines as Pakistani industry moves toward automation",
      "Offered by top universities as a modern, PEC-recognized specialization"
    ],
    "subjects": [
      "Robotics and automation systems",
      "Microcontrollers and embedded systems",
      "Control systems engineering",
      "Sensors and actuators",
      "Machine design and CAD",
      "Industrial automation (PLC, SCADA)",
      "Artificial intelligence for robotics",
      "Programming (C/C++, Python)"
    ],
    "marketReality": [
      "Industrial automation is expanding across textile, pharmaceutical, and FMCG manufacturing in Pakistan",
      "A newer field with fewer graduates, creating strong demand relative to supply",
      "Global robotics and automation companies increasingly hire remote engineers from Pakistan",
      "Overlaps with AI/ML, opening additional software-side career options"
    ],
    "jobRoles": [
      "Robotics Engineer",
      "Automation Engineer",
      "Embedded Systems Engineer",
      "Control Systems Engineer",
      "R&D Engineer"
    ],
    "keySectors": [
      "Manufacturing automation companies",
      "Textile and FMCG plants (automation lines)",
      "Robotics and drone startups",
      "Defense and aerospace-related R&D",
      "International remote robotics/automation firms"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "60,000 – 110,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "130,000 – 280,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "300,000 – 650,000 PKR"
      },
      {
        "level": "Automation/R&D Lead",
        "salary": "600,000 – 1,000,000+ PKR"
      },
      {
        "level": "Remote/International",
        "salary": "$1,500 – $5,000/month"
      }
    ],
    "skills": [
      "Embedded C/C++ and microcontroller programming",
      "PLC/SCADA industrial automation",
      "Robotics simulation (ROS, MATLAB)",
      "CAD design (SolidWorks)",
      "Sensor integration and control theory",
      "Problem solving across mechanical and electrical domains"
    ],
    "universities": [
      "NUST Islamabad (SMME)",
      "GIK Institute",
      "Air University Islamabad",
      "UET Lahore",
      "NED University of Engineering & Technology, Karachi",
      "PIEAS Islamabad",
      "FAST-NUCES (Mechatronics track)"
    ],
    "strategy": [
      "BS Mechatronics → Automation Engineer → Senior Automation Lead → Head of Manufacturing Automation",
      "BS Mechatronics → Robotics R&D Engineer → Robotics Product Lead → Robotics Startup Founder",
      "BS Mechatronics → MS Robotics/AI abroad → International robotics engineer"
    ],
    "chooseIf": [
      "You are fascinated by robots, automation, and combining hardware with software",
      "You want to be at the intersection of mechanical, electrical, and AI fields",
      "You want a future-focused degree with growing global demand"
    ],
    "avoidIf": [
      "You want a field with abundant, well-established local job listings today",
      "You dislike juggling multiple engineering disciplines at once",
      "You want a purely software-only path (consider CS instead)"
    ],
    "roadmap": [],
    "startupOps": [
      "Industrial automation solutions company",
      "Drone/robotics product startup",
      "Custom embedded systems and IoT consultancy"
    ],
    "summary": "BS Mechatronics & Robotics Engineering positions you at the frontier of Pakistan's automation future — a smaller field today, but one with outsized long-term potential."
  },
  {
    "id": "eng-bs-automotive",
    "title": "BS / BE Automotive Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Specialized engineering focused on the design, manufacturing, and maintenance of vehicles",
      "Directly tied to Pakistan's growing automobile assembly and auto-parts manufacturing industry",
      "A newer, more specialized alternative to general mechanical engineering"
    ],
    "subjects": [
      "Automobile design and vehicle dynamics",
      "Internal combustion and electric vehicle engines",
      "Automotive electronics",
      "Manufacturing and assembly processes",
      "Materials for automotive applications",
      "Vehicle safety and emissions standards",
      "CAD/CAM for automotive design",
      "Electric and hybrid vehicle technology"
    ],
    "marketReality": [
      "Growth of assembly plants (Suzuki, Toyota Indus, Honda, KIA, Hyundai) sustains steady hiring",
      "Government incentives for electric vehicles (EVs) are opening a new specialization track",
      "Local auto-parts vendor industry offers additional manufacturing-focused roles",
      "A niche but growing field with less competition than general mechanical engineering"
    ],
    "jobRoles": [
      "Automotive Design Engineer",
      "Production/Assembly Engineer",
      "Quality Engineer",
      "EV Systems Engineer",
      "After-Sales/Service Engineer"
    ],
    "keySectors": [
      "Automobile assembly plants",
      "Auto-parts and vendor manufacturing companies",
      "Electric vehicle startups",
      "Automotive R&D centers",
      "Gulf and international auto industry contractors"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "50,000 – 95,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "110,000 – 230,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "250,000 – 500,000 PKR"
      },
      {
        "level": "Design/Production Manager",
        "salary": "500,000 – 900,000+ PKR"
      },
      {
        "level": "Gulf/Middle East (contract)",
        "salary": "$1,300 – $4,000/month"
      }
    ],
    "skills": [
      "CAD/CAM automotive design software",
      "Vehicle dynamics and engine systems knowledge",
      "Manufacturing and quality control processes",
      "Electric vehicle systems understanding",
      "Automotive electronics basics",
      "Problem solving under production timelines"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi (Automotive & Marine)",
      "UET Lahore",
      "GIK Institute",
      "NUST Islamabad",
      "Ghulam Ishaq Khan Institute",
      "PAF-KIET",
      "University of Engineering & Technology, Taxila"
    ],
    "strategy": [
      "BS Automotive → Production Engineer → Quality Manager → Plant Head",
      "BS Automotive → Design Engineer → Senior R&D Engineer → Automotive R&D Director",
      "BS Automotive → EV Systems Engineer → EV startup lead"
    ],
    "chooseIf": [
      "You are passionate about cars, engines, and vehicle technology",
      "You want to be part of Pakistan's growing EV transition",
      "You want a specialized niche within the mechanical engineering family"
    ],
    "avoidIf": [
      "You want the broadest possible job market (general Mechanical Engineering offers more options)",
      "You are not interested in manufacturing/assembly-line environments",
      "You dislike keeping up with fast-changing automotive technology"
    ],
    "roadmap": [],
    "startupOps": [
      "Auto-parts manufacturing or vendor business",
      "EV conversion/retrofit service",
      "Automobile diagnostics and service center"
    ],
    "summary": "BS Automotive Engineering rides the wave of Pakistan's expanding auto industry and emerging EV market — a focused path for genuine car and engine enthusiasts."
  },
  {
    "id": "eng-bs-aerospace",
    "title": "BS / BE Aerospace Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The engineering discipline behind aircraft, spacecraft, and aviation systems design",
      "A prestigious, highly specialized field closely tied to Pakistan's aviation and defense sectors",
      "Offered at a limited number of top-tier institutions due to its technical depth"
    ],
    "subjects": [
      "Aerodynamics",
      "Aircraft structures and materials",
      "Propulsion systems",
      "Flight mechanics and control",
      "Avionics systems",
      "Spacecraft design basics",
      "Computational fluid dynamics (CFD)",
      "Aircraft manufacturing processes"
    ],
    "marketReality": [
      "PIA, PAF, and defense/aerospace organizations (PAC Kamra, SUPARCO) are the primary local employers",
      "A small, highly competitive field with limited seats and limited local industry compared to civil/mechanical",
      "Strong international demand for aerospace engineers in Gulf aviation and global aerospace firms",
      "Growing interest in Pakistan's space and satellite programs (SUPARCO) adds new opportunities"
    ],
    "jobRoles": [
      "Aircraft Design Engineer",
      "Avionics Engineer",
      "Aerospace Structures Engineer",
      "Maintenance/MRO Engineer",
      "Flight Systems Engineer"
    ],
    "keySectors": [
      "Pakistan Air Force (PAF) and defense organizations",
      "Pakistan Aeronautical Complex (PAC Kamra)",
      "SUPARCO (space program)",
      "Commercial airlines (PIA and others)",
      "International aerospace and aviation MRO companies"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "130,000 – 280,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "300,000 – 650,000 PKR"
      },
      {
        "level": "Chief/Lead Engineer",
        "salary": "600,000 – 1,200,000+ PKR"
      },
      {
        "level": "International/Gulf aviation",
        "salary": "$2,000 – $6,000/month"
      }
    ],
    "skills": [
      "CFD and aerospace simulation software",
      "Aerodynamics and structural analysis",
      "CAD design (CATIA, SolidWorks)",
      "Materials science for aerospace applications",
      "Systems thinking and precision engineering",
      "Regulatory/safety standards knowledge"
    ],
    "universities": [
      "Institute of Space Technology (IST), Islamabad",
      "NUST Islamabad (SMME/CAE)",
      "Air University Islamabad",
      "PAF-KIET Karachi",
      "GIK Institute",
      "University of Engineering & Technology, Taxila",
      "COMSATS University (Aerospace track)"
    ],
    "strategy": [
      "BS Aerospace → Design Engineer (PAC/SUPARCO) → Senior Systems Engineer → Program Lead",
      "BS Aerospace → Avionics/MRO Engineer → Airline Engineering Manager → Chief Engineer",
      "BS Aerospace → MS Aerospace abroad → International aerospace R&D engineer"
    ],
    "chooseIf": [
      "You are deeply passionate about aircraft, flight, or space systems",
      "You are comfortable pursuing a career mostly in defense, government or select private employers",
      "You want one of Pakistan's most technically prestigious engineering degrees"
    ],
    "avoidIf": [
      "You want abundant local private-sector job openings",
      "You are not prepared for a highly competitive, seat-limited admission process",
      "You want quick entry into freelance/remote-friendly work"
    ],
    "roadmap": [],
    "startupOps": [
      "Drone design and manufacturing venture",
      "Aerospace/aviation consulting and MRO support services",
      "Aviation training and simulation services"
    ],
    "summary": "BS Aerospace Engineering is Pakistan's most prestigious and selective engineering path — best suited to those committed to a career in aviation, defense, or space."
  },
  {
    "id": "eng-bs-biomedical",
    "title": "BS / BE Biomedical Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Merges engineering principles with medicine to design medical devices, imaging systems, and healthcare technology",
      "A rapidly emerging field as Pakistan's hospitals and medtech sector modernize",
      "Ideal for students interested in both engineering and healthcare impact"
    ],
    "subjects": [
      "Human anatomy and physiology for engineers",
      "Biomedical instrumentation",
      "Medical imaging systems (X-ray, MRI, ultrasound)",
      "Biomaterials",
      "Signal processing for biomedical data",
      "Rehabilitation and prosthetic engineering",
      "Hospital equipment design and maintenance",
      "Regulatory standards for medical devices"
    ],
    "marketReality": [
      "Growing private hospital sector (Aga Khan, Shifa, Indus) increasingly needs biomedical equipment engineers",
      "Medical device import/maintenance companies are a steady local employer base",
      "A newer field in Pakistan with limited graduates, reducing competition for early movers",
      "Global medtech and health-tech companies offer strong remote/international opportunities"
    ],
    "jobRoles": [
      "Biomedical Equipment Engineer",
      "Clinical Engineer",
      "Medical Device R&D Engineer",
      "Imaging Systems Technologist",
      "Regulatory/Quality Engineer"
    ],
    "keySectors": [
      "Private and government hospitals",
      "Medical device manufacturing/import companies",
      "Health-tech startups",
      "Pharmaceutical and diagnostics companies",
      "International medtech and research organizations"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "50,000 – 95,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "110,000 – 220,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "240,000 – 480,000 PKR"
      },
      {
        "level": "Clinical Engineering Head",
        "salary": "450,000 – 800,000+ PKR"
      },
      {
        "level": "International/Remote medtech",
        "salary": "$1,500 – $4,500/month"
      }
    ],
    "skills": [
      "Medical instrumentation and equipment maintenance",
      "Signal processing (MATLAB/Python)",
      "Understanding of medical imaging technology",
      "Regulatory compliance (FDA/ISO medical device standards)",
      "Basic clinical/anatomical knowledge",
      "Problem solving in hospital environments"
    ],
    "universities": [
      "NUST Islamabad (SMME)",
      "Ziauddin University, Karachi",
      "Bahria University",
      "Riphah International University",
      "University of Engineering & Technology, Taxila",
      "COMSATS University (Biomedical track)",
      "Sir Syed University of Engineering & Technology"
    ],
    "strategy": [
      "BS Biomedical → Clinical/Hospital Engineer → Biomedical Department Head → Hospital Technical Director",
      "BS Biomedical → Medical Device R&D Engineer → Product Lead → Health-tech Founder",
      "BS Biomedical → MS Biomedical abroad → International medtech researcher"
    ],
    "chooseIf": [
      "You want to combine an engineering career with healthcare impact",
      "You are interested in medical devices, imaging, or health-tech innovation",
      "You want a growing, less saturated engineering niche"
    ],
    "avoidIf": [
      "You want a field with abundant, well-established job openings today in Pakistan",
      "You are uncomfortable around hospital/clinical environments",
      "You want the widest possible range of core industrial employers"
    ],
    "roadmap": [],
    "startupOps": [
      "Medical device maintenance and calibration service",
      "Health-tech / assistive device startup",
      "Hospital equipment import and support business"
    ],
    "summary": "BS Biomedical Engineering blends engineering with healthcare purpose — a smaller but meaningful field, especially suited to students who want technology to directly improve lives."
  },
  {
    "id": "eng-bs-computer",
    "title": "BS Computer Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "A hybrid discipline combining computer science software skills with electrical/hardware engineering",
      "Focuses on designing computer hardware, embedded systems, and the software that runs on them",
      "PEC-regulated engineering degree distinct from (but related to) BS Computer Science"
    ],
    "subjects": [
      "Digital logic design",
      "Computer architecture and organization",
      "Embedded systems and microprocessors",
      "Operating systems",
      "VLSI and hardware design",
      "Programming (C/C++, Python, assembly)",
      "Computer networks",
      "FPGA and digital systems design"
    ],
    "marketReality": [
      "Strong demand from embedded systems, IoT, and semiconductor-adjacent industries",
      "Overlaps with software roles, so graduates can also compete for standard software engineering jobs",
      "Telecom, defense electronics, and hardware-focused startups actively hire Computer Engineers",
      "PEC registration adds a formal engineering credential beyond a typical CS degree"
    ],
    "jobRoles": [
      "Embedded Systems Engineer",
      "Hardware Design Engineer",
      "FPGA/VLSI Engineer",
      "IoT Systems Engineer",
      "Software Engineer (hardware-adjacent)"
    ],
    "keySectors": [
      "Telecom companies (Jazz, Zong, PTCL)",
      "Semiconductor and embedded systems firms",
      "Defense electronics organizations",
      "IoT and hardware startups",
      "International remote embedded/hardware companies"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "140,000 – 300,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "320,000 – 700,000 PKR"
      },
      {
        "level": "Principal Hardware/Embedded Engineer",
        "salary": "600,000 – 1,100,000+ PKR"
      },
      {
        "level": "Remote/International",
        "salary": "$1,800 – $6,000/month"
      }
    ],
    "skills": [
      "Embedded C/C++ programming",
      "Digital logic and hardware design (VHDL/Verilog)",
      "Microcontroller and FPGA development",
      "Operating systems and computer architecture knowledge",
      "PCB design basics",
      "Debugging hardware-software integration"
    ],
    "universities": [
      "NUST Islamabad (SEECS)",
      "UET Lahore",
      "NED University of Engineering & Technology, Karachi",
      "GIK Institute",
      "COMSATS University",
      "FAST-NUCES",
      "PIEAS Islamabad"
    ],
    "strategy": [
      "BS Computer Engineering → Embedded Systems Engineer → Senior Firmware Engineer → Hardware Architect",
      "BS Computer Engineering → Software Engineer → Full-Stack/Backend Engineer → Tech Lead",
      "BS Computer Engineering → MS Computer Engineering abroad → Semiconductor/chip industry engineer"
    ],
    "chooseIf": [
      "You want the flexibility to work in both hardware and software",
      "You are interested in embedded systems, IoT, or chip-level design",
      "You want a PEC-chartered engineering credential with strong tech-sector pay"
    ],
    "avoidIf": [
      "You want a purely software career with no hardware exposure (consider Software/CS instead)",
      "You dislike low-level programming and circuit-level thinking",
      "You want the absolute broadest software job market (plain BS CS is broader)"
    ],
    "roadmap": [],
    "startupOps": [
      "IoT product development company",
      "Embedded systems consultancy",
      "Hardware prototyping and PCB design service"
    ],
    "summary": "BS Computer Engineering gives you the rare combination of hardware and software skills — ideal if you want to build the physical devices that power tomorrow's technology."
  },
  {
    "id": "eng-bs-telecom",
    "title": "BS / BE Telecommunication Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Focuses on the design and operation of communication networks — mobile, fiber, satellite, and internet infrastructure",
      "Directly tied to Pakistan's telecom industry and ongoing 4G/5G network expansion",
      "PEC-regulated degree, often housed within Electrical Engineering departments"
    ],
    "subjects": [
      "Signals and systems",
      "Analog and digital communication",
      "Wireless and mobile networks (4G/5G)",
      "Fiber optic communication",
      "Antenna and RF engineering",
      "Network protocols and switching",
      "Satellite communication",
      "Telecom regulation and standards"
    ],
    "marketReality": [
      "Ongoing 4G expansion and future 5G rollout keep telecom engineers in steady demand",
      "Jazz, Zong, Telenor/Ufone, and PTCL are major stable employers of telecom engineers",
      "Fiber-to-the-home (FTTH) expansion by ISPs is creating new network engineering roles",
      "PTA and other regulatory bodies also hire telecom engineering graduates"
    ],
    "jobRoles": [
      "Network/RF Engineer",
      "Telecom Systems Engineer",
      "Fiber Optics Engineer",
      "Wireless Network Planner",
      "Telecom Field Engineer"
    ],
    "keySectors": [
      "Mobile network operators (Jazz, Zong, Ufone)",
      "PTCL and fixed-line/fiber ISPs",
      "Telecom equipment vendors (Huawei, Nokia, Ericsson)",
      "PTA and regulatory bodies",
      "International telecom and network consultancy firms"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "55,000 – 100,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "120,000 – 260,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "280,000 – 550,000 PKR"
      },
      {
        "level": "Network Operations Manager",
        "salary": "500,000 – 900,000+ PKR"
      },
      {
        "level": "Gulf/International telecom",
        "salary": "$1,500 – $4,500/month"
      }
    ],
    "skills": [
      "RF/network planning tools",
      "Fiber optic installation and testing",
      "4G/5G network protocols",
      "Signal processing fundamentals",
      "Network troubleshooting",
      "Telecom regulatory knowledge"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi",
      "UET Lahore",
      "NUST Islamabad (SEECS)",
      "Mehran University of Engineering & Technology, Jamshoro",
      "COMSATS University",
      "GIK Institute",
      "Sir Syed University of Engineering & Technology"
    ],
    "strategy": [
      "BS Telecom → RF/Network Engineer → Senior Network Planner → Network Operations Head",
      "BS Telecom → Fiber Optics Engineer → ISP Infrastructure Manager → Telecom Consultant",
      "BS Telecom → MS Telecom/Networks abroad → International telecom engineer"
    ],
    "chooseIf": [
      "You are interested in how mobile networks, internet, and communication systems work",
      "You want steady demand tied to Pakistan's ongoing telecom infrastructure growth",
      "You enjoy a mix of fieldwork and technical network planning"
    ],
    "avoidIf": [
      "You want a purely office/software-based career",
      "You dislike RF/field measurement and site visits",
      "You are looking for the broadest possible engineering job market"
    ],
    "roadmap": [],
    "startupOps": [
      "Internet Service Provider (ISP) / FTTH business",
      "Telecom infrastructure consultancy",
      "Network security and monitoring services"
    ],
    "summary": "BS Telecommunication Engineering keeps you connected to Pakistan's expanding mobile and internet infrastructure — a stable, essential engineering track for the connected era."
  },
  {
    "id": "eng-bs-electronic",
    "title": "BS / BE Electronic Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Focuses on electronic circuits, devices, and systems — from consumer electronics to industrial control",
      "A close cousin of Electrical Engineering, with more emphasis on circuits, devices, and embedded electronics",
      "PEC-regulated degree with broad application across telecom, embedded, and industrial sectors"
    ],
    "subjects": [
      "Electronic circuit design",
      "Analog and digital electronics",
      "Microprocessors and microcontrollers",
      "Signal processing",
      "Communication systems",
      "Control systems",
      "PCB design and embedded systems",
      "Power electronics"
    ],
    "marketReality": [
      "Overlaps with computer, electrical, and telecom sectors, giving graduates a wide range of employers",
      "Consumer electronics assembly and embedded product companies are growing local employers",
      "Instrumentation and industrial control roles remain in steady demand across manufacturing",
      "Strong compatibility with remote/international embedded and IoT product companies"
    ],
    "jobRoles": [
      "Electronics Design Engineer",
      "Embedded Systems Engineer",
      "Instrumentation Engineer",
      "Control Systems Engineer",
      "R&D/Product Engineer"
    ],
    "keySectors": [
      "Consumer electronics and appliance manufacturers",
      "Telecom and embedded systems companies",
      "Industrial automation and instrumentation firms",
      "Defense electronics organizations",
      "International remote electronics/IoT firms"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "55,000 – 100,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "120,000 – 250,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "270,000 – 550,000 PKR"
      },
      {
        "level": "Principal Electronics/R&D Engineer",
        "salary": "500,000 – 900,000+ PKR"
      },
      {
        "level": "Remote/International",
        "salary": "$1,500 – $4,500/month"
      }
    ],
    "skills": [
      "Circuit design and simulation (Proteus, Multisim)",
      "Embedded C/C++ programming",
      "PCB design tools (Altium, Eagle)",
      "Microcontroller programming",
      "Signal processing fundamentals",
      "Troubleshooting and prototyping"
    ],
    "universities": [
      "NED University of Engineering & Technology, Karachi",
      "UET Lahore",
      "NUST Islamabad (SEECS)",
      "Mehran University of Engineering & Technology, Jamshoro",
      "GIK Institute",
      "COMSATS University",
      "PAF-KIET"
    ],
    "strategy": [
      "BS Electronic → Electronics Design Engineer → Senior Hardware Engineer → R&D Lead",
      "BS Electronic → Embedded Systems Engineer → IoT Product Engineer → Technical Product Manager",
      "BS Electronic → MS Electronics abroad → International semiconductor/electronics engineer"
    ],
    "chooseIf": [
      "You enjoy building and designing circuits and electronic devices",
      "You want a versatile degree spanning telecom, embedded, and industrial sectors",
      "You want strong compatibility with remote/international hardware jobs"
    ],
    "avoidIf": [
      "You want a purely software-only career path",
      "You dislike detailed circuit-level troubleshooting",
      "You want maximum overlap with power/grid-focused electrical work (choose EE instead)"
    ],
    "roadmap": [],
    "startupOps": [
      "Consumer electronics product startup",
      "Embedded/IoT device design consultancy",
      "Electronics repair and prototyping service"
    ],
    "summary": "BS Electronic Engineering offers broad versatility across telecom, embedded, and industrial electronics — a strong choice for students who love hands-on circuit and device design."
  },
  {
    "id": "eng-bs-software",
    "title": "BS Software Engineering",
    "domain": DomainType.ENGINEERING,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "A PEC-regulated engineering degree focused on the systematic design, development, and management of large-scale software systems",
      "Distinct from BS Computer Science through its greater emphasis on software process, quality, and project engineering",
      "Combines programming skills with formal engineering discipline and project management"
    ],
    "subjects": [
      "Software requirements engineering",
      "Software design and architecture",
      "Software project management",
      "Software quality assurance and testing",
      "Object-oriented programming (Java, C++, Python)",
      "Database systems",
      "Software construction and DevOps",
      "Human-computer interaction"
    ],
    "marketReality": [
      "In equally high demand as BS CS across Pakistan's software houses and IT companies",
      "PEC registration gives an additional formal engineering credential valued by government/regulated projects",
      "Strong overlap with BS CS job roles, so graduates compete for the same wide software job market",
      "Quality assurance, project management, and DevOps roles are especially well-suited to this degree's process-focused training"
    ],
    "jobRoles": [
      "Software Engineer (Backend / Frontend / Full Stack)",
      "QA/Test Automation Engineer",
      "Software Project Manager",
      "DevOps Engineer",
      "Systems Analyst"
    ],
    "keySectors": [
      "Software houses and IT companies",
      "Fintech and banking IT departments",
      "Government digital transformation projects",
      "IT multinationals (remote)",
      "Freelancing platforms (Upwork, Fiverr, Toptal)"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "150,000 – 400,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "500,000 – 1,200,000 PKR"
      },
      {
        "level": "Freelance (beginner)",
        "salary": "$500 – $1,500/month"
      },
      {
        "level": "Freelance (senior)",
        "salary": "$5,000 – $15,000+/month"
      }
    ],
    "skills": [
      "Python, Java, and JavaScript proficiency",
      "Software design patterns and architecture",
      "Agile/Scrum project management",
      "Git/GitHub version control",
      "Automated testing and QA tools",
      "Cloud platforms (AWS, Azure, GCP)"
    ],
    "universities": [
      "FAST-NUCES",
      "NUST Islamabad (SEECS)",
      "UET Lahore",
      "NED University of Engineering & Technology, Karachi",
      "COMSATS University",
      "Mehran University of Engineering & Technology, Jamshoro",
      "Bahria University"
    ],
    "strategy": [
      "BS SE → Junior Developer → Senior Developer → Software Architect",
      "BS SE → QA Engineer → Test Automation Lead → QA Manager",
      "BS SE → Project Coordinator → Software Project Manager → Head of Engineering"
    ],
    "chooseIf": [
      "You want a PEC-chartered engineering title with software career pay",
      "You are interested in formal software process, quality, and project management",
      "You want the same wide software job market as BS CS with an engineering credential"
    ],
    "avoidIf": [
      "You want the absolute deepest theoretical CS/AI research track (BS CS is stronger)",
      "You dislike documentation and process-heavy work",
      "You are not interested in structured software development methodology"
    ],
    "roadmap": [],
    "startupOps": [
      "Software product or SaaS startup",
      "Software quality assurance/testing agency",
      "Tech consultancy and software development agency"
    ],
    "summary": "BS Software Engineering offers the same lucrative software career market as BS CS, plus a PEC-chartered engineering credential — ideal for those who value structured, process-driven development."
  },
  {
    "id": "sci-bs-physics",
    "title": "BS Physics",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The fundamental science of matter, energy, motion and the laws governing the universe",
      "Builds strong analytical and mathematical problem-solving skills applicable across science and technology",
      "A foundational degree for careers in research, education, energy, and emerging tech fields like quantum computing"
    ],
    "subjects": [
      "Classical mechanics",
      "Electromagnetism",
      "Quantum mechanics",
      "Thermodynamics and statistical mechanics",
      "Nuclear and particle physics",
      "Solid state and condensed matter physics",
      "Mathematical methods for physics",
      "Computational physics and simulation"
    ],
    "marketReality": [
      "Growing demand in renewable energy, telecom, and semiconductor-adjacent industries for physics graduates",
      "PAEC, SUPARCO, and national research institutes actively recruit physics graduates for R&D roles",
      "Teaching and academia remain a large, stable employer through school, college and university positions",
      "Strong pathway into data science and quantum computing for graduates who add programming skills"
    ],
    "jobRoles": [
      "Research Officer",
      "Physics Lecturer/Teacher",
      "Data Analyst",
      "Lab/R&D Scientist",
      "Medical Physicist"
    ],
    "keySectors": [
      "National research institutes (PAEC, PINSTECH, SUPARCO)",
      "Universities and colleges (teaching)",
      "Telecom and semiconductor companies",
      "Energy and power sector",
      "Data science and tech companies"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 70,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "80,000 – 160,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "180,000 – 350,000 PKR"
      },
      {
        "level": "PhD/Research Scientist",
        "salary": "300,000 – 600,000+ PKR"
      },
      {
        "level": "Data Science pivot (skilled)",
        "salary": "150,000 – 400,000 PKR"
      }
    ],
    "skills": [
      "Strong mathematical and analytical reasoning",
      "Python/MATLAB for computational physics",
      "Laboratory and instrumentation skills",
      "Statistical data analysis",
      "Scientific writing and research methodology",
      "Problem-solving under abstract, theoretical conditions"
    ],
    "universities": [
      "Quaid-i-Azam University, Islamabad",
      "University of Karachi",
      "Government College University, Lahore",
      "LUMS (Physics track)",
      "University of the Punjab, Lahore",
      "COMSATS University",
      "University of Sindh, Jamshoro"
    ],
    "strategy": [
      "BS Physics → MPhil/MS Physics → Research Officer → Senior Scientist (PAEC/SUPARCO)",
      "BS Physics → Teaching/Lecturer → Assistant Professor → Professor",
      "BS Physics → Programming/Data skills → Data Scientist → ML Engineer"
    ],
    "chooseIf": [
      "You enjoy deep theoretical and mathematical thinking",
      "You are interested in research, academia, or national science institutes",
      "You want a strong foundation that transfers well into data science or engineering"
    ],
    "avoidIf": [
      "You want a degree with abundant private-sector entry-level jobs immediately after BS",
      "You dislike heavy, abstract mathematics",
      "You need fast financial returns right after graduation"
    ],
    "roadmap": [],
    "startupOps": [
      "STEM tuition/coaching academy",
      "Scientific instrumentation consultancy",
      "Ed-tech content platform for physics learners"
    ],
    "summary": "BS Physics builds one of the strongest analytical foundations in science — most rewarding when paired with further study, teaching, or a pivot into data science."
  },
  {
    "id": "sci-bs-biochemistry",
    "title": "BS Biochemistry",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The study of chemical processes within living organisms, bridging biology and chemistry",
      "Core to Pakistan's growing pharmaceutical, diagnostics, and biotech industries",
      "A strong foundation for both clinical laboratory careers and research pathways"
    ],
    "subjects": [
      "Molecular biology",
      "Metabolism and enzymology",
      "Cell biology",
      "Clinical biochemistry",
      "Genetics and molecular diagnostics",
      "Immunology",
      "Analytical biochemical techniques (chromatography, spectroscopy)",
      "Research methodology and biostatistics"
    ],
    "marketReality": [
      "Pharmaceutical and diagnostic laboratory sectors are steady, growing employers in urban Pakistan",
      "Rising demand for clinical lab scientists as private diagnostic chains expand nationwide",
      "Biotech and pharma R&D roles are increasing as local companies invest in formulation and QA/QC",
      "A common and respected pathway for students originally on the pre-medical track"
    ],
    "jobRoles": [
      "Clinical Lab Scientist",
      "QA/QC Analyst (Pharma)",
      "Research Assistant",
      "Biochemistry Lecturer",
      "Medical/Diagnostic Sales & Support"
    ],
    "keySectors": [
      "Pharmaceutical companies (GSK, Getz Pharma, Abbott)",
      "Diagnostic laboratories (Chughtai, Excel, Aga Khan Labs)",
      "Hospitals and clinical labs",
      "Biotech/research institutes",
      "Universities and colleges"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 140,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "150,000 – 300,000 PKR"
      },
      {
        "level": "Pharma QA/QC Manager",
        "salary": "280,000 – 500,000+ PKR"
      },
      {
        "level": "Research Scientist (PhD)",
        "salary": "250,000 – 500,000+ PKR"
      }
    ],
    "skills": [
      "Laboratory and analytical techniques",
      "Molecular biology lab methods",
      "Attention to detail and record-keeping",
      "Basic biostatistics",
      "Regulatory/GMP compliance awareness",
      "Scientific report writing"
    ],
    "universities": [
      "University of Karachi",
      "Aga Khan University",
      "Quaid-i-Azam University, Islamabad",
      "University of the Punjab, Lahore",
      "University of Health Sciences, Lahore",
      "Dow University of Health Sciences",
      "University of Sindh, Jamshoro"
    ],
    "strategy": [
      "BS Biochemistry → Clinical Lab Scientist → Lab Supervisor → Lab Director",
      "BS Biochemistry → QA/QC Analyst → QA Manager → Head of Quality (Pharma)",
      "BS Biochemistry → MPhil/PhD → Research Scientist → Principal Investigator"
    ],
    "chooseIf": [
      "You are interested in biology and chemistry at the molecular level",
      "You want laboratory and diagnostic-based career options",
      "You are considering a research or pharma-industry pathway"
    ],
    "avoidIf": [
      "You want field-based or outdoor scientific work",
      "You dislike detailed lab protocols and repetitive analytical work",
      "You need a degree with very high starting salaries immediately"
    ],
    "roadmap": [],
    "startupOps": [
      "Independent diagnostic testing lab",
      "Nutraceutical/supplement small-batch manufacturing",
      "Biochemistry tutoring and MCAT/entry-test coaching"
    ],
    "summary": "BS Biochemistry is a reliable bridge between biology and chemistry, well suited to Pakistan's expanding pharma and diagnostics industry."
  },
  {
    "id": "sci-bs-biotechnology",
    "title": "BS Biotechnology",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Applies biological systems and organisms to develop products in medicine, agriculture and industry",
      "One of the fastest-growing applied life sciences fields globally and increasingly in Pakistan",
      "Combines molecular biology, genetics, and bioprocessing with real-world industrial application"
    ],
    "subjects": [
      "Genetic engineering",
      "Molecular biology and genomics",
      "Bioprocess technology",
      "Fermentation technology",
      "Plant and agricultural biotechnology",
      "Immunobiotechnology",
      "Bioinformatics basics",
      "Industrial and environmental biotechnology"
    ],
    "marketReality": [
      "Agricultural biotech is especially relevant given Pakistan's large agriculture-based economy",
      "Pharmaceutical and vaccine manufacturing sector is a growing employer of biotech graduates",
      "Seed and agri-input companies increasingly hire biotech graduates for crop improvement work",
      "Strong pathway into international MS/PhD programs and biotech research careers abroad"
    ],
    "jobRoles": [
      "Biotechnologist/Research Associate",
      "QA/QC Analyst (Biopharma)",
      "Agricultural Biotech Officer",
      "Bioprocess Technician",
      "Lecturer/Academic Researcher"
    ],
    "keySectors": [
      "Pharmaceutical and vaccine companies",
      "Seed and agri-biotech companies (agriculture research institutes)",
      "Food and fermentation industry",
      "Environmental/biotech research labs",
      "Universities and research institutes"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 140,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "150,000 – 300,000 PKR"
      },
      {
        "level": "Biotech R&D Manager",
        "salary": "280,000 – 500,000+ PKR"
      },
      {
        "level": "International/Remote research",
        "salary": "$1,000 – $3,000/month"
      }
    ],
    "skills": [
      "Molecular biology and genetic engineering techniques",
      "Bioprocess and fermentation methods",
      "Lab safety and GMP standards",
      "Basic bioinformatics tools",
      "Data analysis and scientific writing",
      "Research project design"
    ],
    "universities": [
      "National University of Sciences & Technology (NUST), Islamabad",
      "University of Karachi",
      "Quaid-i-Azam University, Islamabad",
      "University of Agriculture, Faisalabad",
      "Sindh Agriculture University, Tandojam",
      "University of the Punjab, Lahore",
      "COMSATS University"
    ],
    "strategy": [
      "BS Biotechnology → Research Associate → Senior Scientist → R&D Lead",
      "BS Biotechnology → Agri-biotech Officer → Agricultural Research Scientist → Program Director",
      "BS Biotechnology → MS/PhD abroad → International biotech researcher"
    ],
    "chooseIf": [
      "You want to apply biology to real industrial and agricultural problems",
      "You are interested in pharma, vaccines, or agricultural innovation",
      "You want a strong platform for higher research studies abroad"
    ],
    "avoidIf": [
      "You want fast, high local salaries immediately after a bachelor's degree",
      "You dislike lab-intensive, protocol-heavy coursework",
      "You are looking for a widely available job market across all cities"
    ],
    "roadmap": [],
    "startupOps": [
      "Agricultural biotech/seed improvement venture",
      "Biotech testing and consultancy lab",
      "Fermentation-based food/beverage product startup"
    ],
    "summary": "BS Biotechnology positions you at the intersection of biology and industry — especially promising given Pakistan's agricultural base and growing pharma sector."
  },
  {
    "id": "sci-bs-botany",
    "title": "BS Botany",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The scientific study of plants — their structure, genetics, ecology, and economic uses",
      "Directly relevant to Pakistan's agriculture-based economy and environmental conservation needs",
      "A foundational degree for research, teaching, agriculture, and environmental careers"
    ],
    "subjects": [
      "Plant taxonomy and systematics",
      "Plant physiology",
      "Plant genetics and breeding",
      "Mycology and plant pathology",
      "Ecology and environmental botany",
      "Economic botany and horticulture",
      "Molecular plant biology",
      "Research methods and field botany"
    ],
    "marketReality": [
      "Agriculture research institutes and extension departments are steady public-sector employers",
      "Seed companies and agri-input businesses hire botany graduates for crop and quality roles",
      "Environmental NGOs and conservation projects increasingly hire plant scientists",
      "Teaching remains a large and stable employment route at school, college and university level"
    ],
    "jobRoles": [
      "Agricultural/Plant Research Officer",
      "Botany Lecturer/Teacher",
      "Herbarium/Taxonomy Specialist",
      "Environmental/Conservation Officer",
      "Horticulture Officer"
    ],
    "keySectors": [
      "Agriculture research institutes (PARC, provincial ag departments)",
      "Seed and agri-input companies",
      "Environmental NGOs and conservation bodies",
      "Forestry and parks departments",
      "Schools, colleges and universities"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "30,000 – 55,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "130,000 – 250,000 PKR"
      },
      {
        "level": "Research Scientist (PhD)",
        "salary": "220,000 – 450,000+ PKR"
      },
      {
        "level": "NGO/Conservation Project Lead",
        "salary": "150,000 – 300,000 PKR"
      }
    ],
    "skills": [
      "Plant identification and taxonomy",
      "Field research and sample collection",
      "Laboratory techniques (microscopy, tissue culture)",
      "Data analysis and scientific reporting",
      "Knowledge of local flora and agro-ecology",
      "Patience for long-term field studies"
    ],
    "universities": [
      "University of Karachi",
      "University of the Punjab, Lahore",
      "Government College University, Lahore",
      "University of Agriculture, Faisalabad",
      "University of Sindh, Jamshoro",
      "Quaid-i-Azam University, Islamabad",
      "Shah Abdul Latif University, Khairpur"
    ],
    "strategy": [
      "BS Botany → Research Officer (agriculture) → Senior Scientist → Program Director",
      "BS Botany → Teaching → Lecturer → Assistant/Associate Professor",
      "BS Botany → Environmental/Conservation Officer → NGO Project Manager → Conservation Director"
    ],
    "chooseIf": [
      "You are interested in plants, agriculture, or environmental science",
      "You enjoy fieldwork alongside lab-based research",
      "You want a stable pathway into teaching or public-sector research"
    ],
    "avoidIf": [
      "You want a fast-growing, high-paying private-sector career track",
      "You dislike fieldwork in outdoor/rural conditions",
      "You need immediate high salaries right after graduation"
    ],
    "roadmap": [],
    "startupOps": [
      "Nursery and horticulture business",
      "Organic farming/agri-consultancy",
      "Herbal/medicinal plant products venture"
    ],
    "summary": "BS Botany connects directly to Pakistan's agricultural backbone — a meaningful choice for those drawn to plant science, conservation, or agricultural research."
  },
  {
    "id": "sci-bs-chemistry",
    "title": "BS Chemistry",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The study of matter, its properties, and the reactions that transform one substance into another",
      "A core science degree feeding into pharmaceuticals, petrochemicals, textiles, and education",
      "Offers strong versatility across industrial, research, and teaching career paths"
    ],
    "subjects": [
      "Organic chemistry",
      "Inorganic chemistry",
      "Physical chemistry",
      "Analytical chemistry",
      "Industrial and petrochemical chemistry",
      "Polymer and materials chemistry",
      "Environmental chemistry",
      "Instrumental analysis techniques"
    ],
    "marketReality": [
      "Pharmaceutical, textile-dye, and petrochemical industries are steady employers of chemistry graduates",
      "Quality control and quality assurance roles in manufacturing are consistently in demand",
      "Teaching at school, college, and university levels remains a large, stable employment route",
      "Fertilizer and chemical manufacturing companies (Engro, Fauji, ICI Pakistan) regularly hire chemists"
    ],
    "jobRoles": [
      "QA/QC Chemist",
      "Research/Lab Chemist",
      "Chemistry Lecturer/Teacher",
      "Process/Production Chemist",
      "Environmental Analyst"
    ],
    "keySectors": [
      "Pharmaceutical companies",
      "Textile and dye industries",
      "Fertilizer and petrochemical companies (Engro, ICI, Fauji)",
      "Environmental and testing laboratories",
      "Schools, colleges and universities"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 150,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "160,000 – 320,000 PKR"
      },
      {
        "level": "QA/QC Manager (Pharma/Industry)",
        "salary": "280,000 – 500,000+ PKR"
      },
      {
        "level": "Research Scientist (PhD)",
        "salary": "250,000 – 500,000+ PKR"
      }
    ],
    "skills": [
      "Laboratory and instrumental analysis skills",
      "Organic/inorganic synthesis techniques",
      "Quality control and GMP standards knowledge",
      "Data analysis and scientific documentation",
      "Safety and chemical handling protocols",
      "Attention to detail"
    ],
    "universities": [
      "University of Karachi",
      "University of the Punjab, Lahore",
      "Government College University, Lahore",
      "Quaid-i-Azam University, Islamabad",
      "University of Sindh, Jamshoro",
      "COMSATS University",
      "NED University (Applied Chemistry)"
    ],
    "strategy": [
      "BS Chemistry → QA/QC Chemist → QA Manager → Head of Quality",
      "BS Chemistry → Teaching → Lecturer → Professor",
      "BS Chemistry → MPhil/PhD → Research Scientist → Principal Investigator"
    ],
    "chooseIf": [
      "You enjoy laboratory work and understanding chemical reactions",
      "You want versatile options across pharma, textile, and industrial sectors",
      "You are considering teaching or further research studies"
    ],
    "avoidIf": [
      "You want a degree with the highest possible immediate private-sector salaries",
      "You dislike detailed lab safety protocols and repetitive testing work",
      "You want a career with minimal laboratory time"
    ],
    "roadmap": [],
    "startupOps": [
      "Chemical testing and quality control lab",
      "Cosmetics/cleaning product small-batch manufacturing",
      "Chemistry tutoring and entry-test coaching academy"
    ],
    "summary": "BS Chemistry remains one of the most versatile natural science degrees in Pakistan, opening doors across pharma, textiles, industry, and education."
  },
  {
    "id": "sci-bs-coastal-marine",
    "title": "BS Coastal and Marine Science",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The study of ocean and coastal ecosystems, marine life, and coastal resource management",
      "Especially relevant to Pakistan's coastal provinces (Sindh and Balochistan) with over 1,000 km of coastline",
      "A niche but strategically important field tied to fisheries, ports, and marine conservation"
    ],
    "subjects": [
      "Oceanography",
      "Marine ecology and biodiversity",
      "Coastal zone management",
      "Fisheries and aquaculture science",
      "Marine pollution and environmental impact",
      "Marine geology",
      "Remote sensing and GIS for coastal systems",
      "Blue economy and marine resource management"
    ],
    "marketReality": [
      "Growing government focus on Pakistan's 'blue economy' is opening new marine science roles",
      "Ports, fisheries departments, and coastal development authorities are key public-sector employers",
      "International marine conservation NGOs occasionally recruit locally trained marine scientists",
      "A small, specialized field with limited graduates and correspondingly less local competition"
    ],
    "jobRoles": [
      "Marine Research Officer",
      "Fisheries Officer",
      "Coastal Zone Management Officer",
      "Environmental/Marine Consultant",
      "GIS/Remote Sensing Analyst (Marine)"
    ],
    "keySectors": [
      "Fisheries and marine departments (Sindh/Balochistan)",
      "Port authorities and maritime organizations",
      "Marine environmental NGOs",
      "National Institute of Oceanography",
      "Research and academic institutions"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "30,000 – 55,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "130,000 – 250,000 PKR"
      },
      {
        "level": "Research Scientist (PhD)",
        "salary": "220,000 – 400,000+ PKR"
      },
      {
        "level": "International project/NGO roles",
        "salary": "$800 – $2,500/month"
      }
    ],
    "skills": [
      "Marine field sampling and survey techniques",
      "GIS and remote sensing tools",
      "Data analysis for ecological studies",
      "Understanding of coastal policy and regulation",
      "Scuba/field research readiness",
      "Scientific writing and reporting"
    ],
    "universities": [
      "University of Karachi (Institute of Marine Science)",
      "Lasbela University of Agriculture, Water & Marine Sciences",
      "University of Sindh, Jamshoro",
      "Shah Abdul Latif University, Khairpur",
      "National Institute of Oceanography (affiliated research)",
      "Sindh Agriculture University, Tandojam",
      "Balochistan University of IT, Engineering & Management Sciences"
    ],
    "strategy": [
      "BS Coastal & Marine Science → Research Officer → Senior Marine Scientist → Program Director",
      "BS Coastal & Marine Science → Fisheries Officer → Fisheries Department Head",
      "BS Coastal & Marine Science → MS/PhD abroad → International marine researcher"
    ],
    "chooseIf": [
      "You are fascinated by oceans, marine life, and coastal ecosystems",
      "You are based in or interested in Sindh/Balochistan's coastal regions",
      "You want a specialized field tied to Pakistan's emerging blue economy"
    ],
    "avoidIf": [
      "You want a field with abundant jobs across all of Pakistan's cities",
      "You are not comfortable with fieldwork near coastal/marine environments",
      "You need a well-established private-sector job market immediately"
    ],
    "roadmap": [],
    "startupOps": [
      "Sustainable aquaculture/fish farming venture",
      "Marine eco-tourism consultancy",
      "Coastal environmental impact assessment services"
    ],
    "summary": "BS Coastal and Marine Science is a niche but strategically valuable degree for Pakistan's underexplored coastal and blue-economy potential."
  },
  {
    "id": "sci-bs-environmental",
    "title": "BS Environmental Science",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The interdisciplinary study of the environment, pollution, climate, and sustainable resource management",
      "Increasingly critical given Pakistan's high vulnerability to climate change and environmental degradation",
      "Combines biology, chemistry, geography, and policy for real-world environmental problem-solving"
    ],
    "subjects": [
      "Environmental chemistry and pollution studies",
      "Ecology and biodiversity conservation",
      "Climate change science",
      "Environmental impact assessment (EIA)",
      "Waste and water management",
      "GIS and remote sensing",
      "Environmental policy and law",
      "Sustainable development"
    ],
    "marketReality": [
      "Growing regulatory pressure (EPA compliance, EIA requirements) is increasing demand for environmental professionals",
      "International climate funding and NGO projects are a significant and growing employer base",
      "Industrial and manufacturing companies increasingly need in-house environmental compliance officers",
      "Government environmental protection agencies (EPAs) hire at federal and provincial levels"
    ],
    "jobRoles": [
      "Environmental Officer/Analyst",
      "EIA Consultant",
      "Sustainability/Compliance Officer",
      "Climate/Conservation Project Officer",
      "GIS Analyst (Environmental)"
    ],
    "keySectors": [
      "Environmental Protection Agencies (federal/provincial)",
      "International NGOs and climate projects (UNDP, WWF)",
      "Industrial/manufacturing compliance departments",
      "Environmental consulting firms",
      "Research and academic institutions"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 150,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "160,000 – 320,000 PKR"
      },
      {
        "level": "NGO/International Project Manager",
        "salary": "250,000 – 500,000+ PKR"
      },
      {
        "level": "International/Remote consulting",
        "salary": "$1,200 – $3,500/month"
      }
    ],
    "skills": [
      "Environmental impact assessment methodology",
      "GIS and remote sensing tools",
      "Data analysis and environmental modeling",
      "Knowledge of environmental law and policy",
      "Report writing and stakeholder communication",
      "Field sampling and monitoring techniques"
    ],
    "universities": [
      "Quaid-i-Azam University, Islamabad",
      "University of Karachi",
      "COMSATS University",
      "University of the Punjab, Lahore",
      "NED University (Environmental Engineering)",
      "University of Sindh, Jamshoro",
      "Bahauddin Zakariya University, Multan"
    ],
    "strategy": [
      "BS Environmental Science → Environmental Officer → EIA Consultant → Senior Environmental Manager",
      "BS Environmental Science → NGO Project Officer → Program Manager → Country Director",
      "BS Environmental Science → MS/PhD abroad → International climate researcher/policy expert"
    ],
    "chooseIf": [
      "You care about climate change, pollution, and sustainability",
      "You want interdisciplinary work spanning science, policy, and fieldwork",
      "You are interested in NGO, government, or corporate compliance careers"
    ],
    "avoidIf": [
      "You want a narrowly technical, lab-only science career",
      "You need very high starting private-sector salaries immediately",
      "You dislike work involving regulatory and policy documentation"
    ],
    "roadmap": [],
    "startupOps": [
      "Environmental consulting and EIA services firm",
      "Waste management/recycling venture",
      "Sustainability advisory for SMEs and industries"
    ],
    "summary": "BS Environmental Science equips graduates to tackle Pakistan's mounting climate and pollution challenges — a purpose-driven degree with rising institutional demand."
  },
  {
    "id": "sci-bs-freshwater-fisheries",
    "title": "BS Freshwater Biology and Fisheries",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The study of freshwater ecosystems, aquatic organisms, and sustainable fisheries management",
      "Directly relevant to Pakistan's river systems (Indus basin), lakes, and inland fisheries industry",
      "A specialized applied biology degree with strong ties to food security and rural livelihoods"
    ],
    "subjects": [
      "Ichthyology (study of fish)",
      "Limnology (freshwater ecosystems)",
      "Aquaculture and fish farming",
      "Fisheries management and policy",
      "Water quality and pollution assessment",
      "Aquatic ecology and biodiversity",
      "Fish nutrition and disease management",
      "Research methods in aquatic biology"
    ],
    "marketReality": [
      "Sindh and Punjab fisheries departments are stable public-sector employers given the Indus basin's importance",
      "Growing aquaculture (fish farming) industry is creating private-sector technical and management roles",
      "Food security and rural livelihood programs by NGOs and government increasingly involve fisheries specialists",
      "A small, specialized field with limited graduates and comparatively low competition"
    ],
    "jobRoles": [
      "Fisheries Officer",
      "Aquaculture Farm Manager",
      "Water Quality/Environmental Analyst",
      "Research Officer (Fisheries)",
      "Fisheries Extension Officer"
    ],
    "keySectors": [
      "Provincial fisheries departments (Sindh, Punjab)",
      "Aquaculture and fish farming companies",
      "Water and environmental research institutes",
      "Food security NGOs and rural development projects",
      "Universities and research institutions"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "28,000 – 50,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "55,000 – 110,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "120,000 – 230,000 PKR"
      },
      {
        "level": "Research Scientist (PhD)",
        "salary": "200,000 – 400,000+ PKR"
      },
      {
        "level": "Aquaculture Farm Manager (large scale)",
        "salary": "150,000 – 300,000 PKR"
      }
    ],
    "skills": [
      "Fish identification and aquatic sampling techniques",
      "Aquaculture and pond management practices",
      "Water quality testing and analysis",
      "Fisheries policy and regulation knowledge",
      "Fieldwork along rivers, lakes and farms",
      "Scientific data recording and reporting"
    ],
    "universities": [
      "Sindh Agriculture University, Tandojam",
      "University of Agriculture, Faisalabad",
      "University of Veterinary & Animal Sciences, Lahore",
      "University of Karachi",
      "Shah Abdul Latif University, Khairpur",
      "University of Sindh, Jamshoro",
      "Lasbela University of Agriculture, Water & Marine Sciences"
    ],
    "strategy": [
      "BS Freshwater Biology & Fisheries → Fisheries Officer → Fisheries Department Head",
      "BS Freshwater Biology & Fisheries → Aquaculture Farm Manager → Aquaculture Business Owner",
      "BS Freshwater Biology & Fisheries → MS/PhD → Research Scientist/Academic"
    ],
    "chooseIf": [
      "You are interested in rivers, lakes, and aquatic life",
      "You want a specialized field tied to Pakistan's Indus basin economy",
      "You are comfortable with fieldwork in rural and riverine areas"
    ],
    "avoidIf": [
      "You want a field with jobs concentrated in major cities",
      "You are not comfortable with outdoor, water-based fieldwork",
      "You want abundant private-sector job openings across all provinces"
    ],
    "roadmap": [],
    "startupOps": [
      "Fish farming/aquaculture business",
      "Fisheries consultancy and extension services",
      "Ornamental/aquarium fish breeding venture"
    ],
    "summary": "BS Freshwater Biology and Fisheries connects science directly to Pakistan's rivers and food security — a focused, practical path for aquatic biology enthusiasts."
  },
  {
    "id": "sci-bs-genetics",
    "title": "BS Genetics",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The study of heredity, genes, and genetic variation in living organisms",
      "A specialized molecular biology field increasingly relevant to medicine, agriculture, and forensics",
      "Provides strong foundations for research, diagnostics, and genetic counseling-related careers"
    ],
    "subjects": [
      "Molecular genetics",
      "Human genetics",
      "Population and quantitative genetics",
      "Genomics and bioinformatics",
      "Genetic engineering techniques",
      "Cytogenetics",
      "Forensic genetics basics",
      "Research methodology and biostatistics"
    ],
    "marketReality": [
      "Growing genetic and molecular diagnostic labs are creating new specialized testing roles",
      "Agricultural genetics (crop and livestock breeding) remains relevant to Pakistan's agri-economy",
      "Forensic science departments occasionally recruit genetics graduates for DNA analysis roles",
      "A niche field with strong potential for graduates who pursue further specialization abroad"
    ],
    "jobRoles": [
      "Genetics/Molecular Lab Analyst",
      "Research Assistant",
      "Genetic Counselor (with further training)",
      "Forensic DNA Analyst",
      "Lecturer/Academic Researcher"
    ],
    "keySectors": [
      "Molecular diagnostic laboratories",
      "Agricultural research institutes (crop/livestock breeding)",
      "Forensic science laboratories",
      "Pharmaceutical and biotech R&D",
      "Universities and research institutions"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "32,000 – 58,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "65,000 – 130,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "140,000 – 280,000 PKR"
      },
      {
        "level": "Research Scientist (PhD)",
        "salary": "250,000 – 500,000+ PKR"
      },
      {
        "level": "International/Remote research",
        "salary": "$1,200 – $3,500/month"
      }
    ],
    "skills": [
      "Molecular biology and DNA analysis techniques",
      "Bioinformatics tools (BLAST, genome databases)",
      "Laboratory precision and protocol adherence",
      "Statistical and population genetics analysis",
      "Scientific writing and research design",
      "Ethical handling of genetic data"
    ],
    "universities": [
      "University of Karachi",
      "Quaid-i-Azam University, Islamabad",
      "University of the Punjab, Lahore",
      "National University of Sciences & Technology (NUST)",
      "University of Agriculture, Faisalabad",
      "Shaheed Zulfiqar Ali Bhutto Medical University",
      "University of Health Sciences, Lahore"
    ],
    "strategy": [
      "BS Genetics → Molecular Lab Analyst → Senior Diagnostic Scientist → Lab Director",
      "BS Genetics → Research Assistant → MS/PhD → Genetics Research Scientist",
      "BS Genetics → Forensic DNA Analyst → Senior Forensic Scientist"
    ],
    "chooseIf": [
      "You are fascinated by DNA, heredity, and molecular biology",
      "You want a specialized path toward research, diagnostics, or forensics",
      "You are considering further study (MS/PhD) in genetics or genomics"
    ],
    "avoidIf": [
      "You want a degree with a large number of immediate local job openings",
      "You dislike highly detailed, protocol-driven laboratory work",
      "You want a career without further postgraduate specialization"
    ],
    "roadmap": [],
    "startupOps": [
      "Genetic testing/diagnostic lab",
      "Agricultural genetics/seed improvement consultancy",
      "Bioinformatics service/consulting startup"
    ],
    "summary": "BS Genetics offers a highly specialized entry into molecular biology — most valuable when paired with postgraduate study or diagnostic-sector specialization."
  },
  {
    "id": "sci-bs-mathematics",
    "title": "BS Mathematics",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The study of numbers, structures, patterns, and logical reasoning applied across science and technology",
      "A foundational degree that opens doors into finance, data science, actuarial work, and academia",
      "Builds some of the strongest analytical and quantitative reasoning skills of any bachelor's program"
    ],
    "subjects": [
      "Calculus and real analysis",
      "Linear algebra",
      "Abstract algebra",
      "Differential equations",
      "Probability and statistics",
      "Numerical analysis and computational mathematics",
      "Discrete mathematics",
      "Mathematical modeling"
    ],
    "marketReality": [
      "Banking, finance, and actuarial sectors increasingly value strong quantitative graduates",
      "Data science and analytics roles are a fast-growing destination for math graduates who add programming skills",
      "Teaching at school, college, and university level remains a stable, large-scale employment route",
      "Competitive exam preparation (CSS, banking, etc.) benefits strongly from a mathematics background"
    ],
    "jobRoles": [
      "Data Analyst/Data Scientist",
      "Actuarial Analyst",
      "Mathematics Lecturer/Teacher",
      "Quantitative/Financial Analyst",
      "Research Assistant"
    ],
    "keySectors": [
      "Banks and financial institutions",
      "Insurance companies (actuarial roles)",
      "Tech and data analytics companies",
      "Schools, colleges and universities",
      "Government and competitive-exam-based civil service"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 75,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "90,000 – 200,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "220,000 – 450,000 PKR"
      },
      {
        "level": "Data Scientist/Quant (skilled)",
        "salary": "250,000 – 600,000+ PKR"
      },
      {
        "level": "Remote/International (data roles)",
        "salary": "$1,500 – $5,000/month"
      }
    ],
    "skills": [
      "Strong abstract and logical reasoning",
      "Programming (Python, R, MATLAB) for applied math",
      "Statistical modeling and data analysis",
      "Problem-solving under rigorous proof-based conditions",
      "Numerical computation tools",
      "Clear mathematical communication"
    ],
    "universities": [
      "Quaid-i-Azam University, Islamabad",
      "Government College University, Lahore",
      "University of the Punjab, Lahore",
      "LUMS (Mathematics track)",
      "University of Karachi",
      "COMSATS University",
      "University of Sindh, Jamshoro"
    ],
    "strategy": [
      "BS Mathematics → Data Analyst → Data Scientist → Lead Data Scientist",
      "BS Mathematics → Teaching → Lecturer → Professor",
      "BS Mathematics → Actuarial trainee → Associate/Fellow Actuary"
    ],
    "chooseIf": [
      "You genuinely enjoy abstract problem-solving and logical proofs",
      "You want a flexible degree that can pivot into finance, data science, or academia",
      "You are considering competitive exams or further quantitative study"
    ],
    "avoidIf": [
      "You want a degree tied to one specific, well-defined career path",
      "You dislike proof-based, abstract theoretical coursework",
      "You need clear vocational training rather than pure theory"
    ],
    "roadmap": [],
    "startupOps": [
      "Math/entry-test tutoring academy",
      "Data analytics consultancy for SMEs",
      "Ed-tech platform for math learning"
    ],
    "summary": "BS Mathematics builds a rare, highly transferable analytical skill set — increasingly valuable as data-driven roles across finance and technology continue to grow."
  },
  {
    "id": "sci-bs-statistics",
    "title": "BS Statistics",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The science of collecting, analyzing, and interpreting data to inform decisions",
      "A highly practical quantitative degree directly feeding into Pakistan's growing data economy",
      "Applies across government planning, business, healthcare research, and technology sectors"
    ],
    "subjects": [
      "Probability theory",
      "Statistical inference",
      "Regression analysis",
      "Sampling techniques and survey design",
      "Time series analysis",
      "Statistical computing (R, SPSS, Python)",
      "Biostatistics",
      "Econometrics basics"
    ],
    "marketReality": [
      "Government bodies (PBS, planning commissions) rely heavily on statisticians for census and survey work",
      "Data analytics and business intelligence roles are a major growing destination across all industries",
      "Pharmaceutical and clinical research organizations need biostatisticians for trial data analysis",
      "Banking and market research firms consistently hire statistics graduates for analytical roles"
    ],
    "jobRoles": [
      "Data Analyst/Statistician",
      "Biostatistician",
      "Market Research Analyst",
      "Business Intelligence Analyst",
      "Government Statistical Officer"
    ],
    "keySectors": [
      "Pakistan Bureau of Statistics and government planning bodies",
      "Banks and financial institutions",
      "Pharmaceutical/clinical research organizations",
      "Market research and consulting firms",
      "Tech and data analytics companies"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 75,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "90,000 – 200,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "220,000 – 450,000 PKR"
      },
      {
        "level": "Senior Data Scientist/Analyst",
        "salary": "250,000 – 600,000+ PKR"
      },
      {
        "level": "Remote/International (data roles)",
        "salary": "$1,500 – $5,000/month"
      }
    ],
    "skills": [
      "Statistical software proficiency (R, SPSS, Python, Excel)",
      "Survey design and sampling methodology",
      "Data visualization and reporting",
      "Regression and predictive modeling",
      "Critical thinking about data quality",
      "Clear communication of quantitative findings"
    ],
    "universities": [
      "Government College University, Lahore",
      "University of Karachi",
      "University of the Punjab, Lahore",
      "Quaid-i-Azam University, Islamabad",
      "COMSATS University",
      "University of Sindh, Jamshoro",
      "Sindh Madressatul Islam University"
    ],
    "strategy": [
      "BS Statistics → Data Analyst → Senior Data Analyst → Data Science Manager",
      "BS Statistics → Government Statistical Officer → Senior Officer → Chief Statistician",
      "BS Statistics → Biostatistician → Clinical Research Data Lead"
    ],
    "chooseIf": [
      "You enjoy working with data, numbers, and drawing insights from them",
      "You want one of the most directly employable natural science degrees in the data economy",
      "You are interested in government, research, or business analytics"
    ],
    "avoidIf": [
      "You dislike detailed, methodical data work",
      "You want a purely theoretical, proof-based mathematics career (consider BS Mathematics)",
      "You want a career with no software/computing component"
    ],
    "roadmap": [],
    "startupOps": [
      "Data analytics and market research consultancy",
      "Survey design and research services firm",
      "Statistics/data science tutoring and training academy"
    ],
    "summary": "BS Statistics is one of the most directly employable natural science degrees today — data skills are in demand across nearly every sector of Pakistan's economy."
  },
  {
    "id": "sci-bs-zoology",
    "title": "BS Zoology",
    "domain": DomainType.NATURAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "The scientific study of animals — their biology, behavior, classification, and ecology",
      "Relevant to wildlife conservation, veterinary-adjacent fields, and biological research in Pakistan",
      "A foundational life science degree for research, teaching, and environmental careers"
    ],
    "subjects": [
      "Animal taxonomy and systematics",
      "Animal physiology",
      "Genetics and evolution",
      "Wildlife ecology and conservation biology",
      "Entomology and parasitology",
      "Comparative anatomy",
      "Animal behavior (ethology)",
      "Research methods in zoology"
    ],
    "marketReality": [
      "Wildlife and forestry departments are steady public-sector employers for zoology graduates",
      "Environmental NGOs and conservation organizations (WWF-Pakistan, IUCN) recruit zoology-trained researchers",
      "Teaching remains a large and stable employment route across schools, colleges and universities",
      "A useful foundation for students pivoting toward veterinary sciences or public health research"
    ],
    "jobRoles": [
      "Wildlife/Conservation Officer",
      "Zoology Lecturer/Teacher",
      "Research Assistant",
      "Zoo/Wildlife Park Biologist",
      "Environmental Field Researcher"
    ],
    "keySectors": [
      "Wildlife and forestry departments",
      "Environmental conservation NGOs (WWF-Pakistan, IUCN)",
      "Zoos and wildlife parks",
      "Research and academic institutions",
      "Public health/vector-control programs"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "28,000 – 55,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "60,000 – 120,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "130,000 – 260,000 PKR"
      },
      {
        "level": "Research Scientist (PhD)",
        "salary": "220,000 – 450,000+ PKR"
      },
      {
        "level": "International NGO/Conservation roles",
        "salary": "$800 – $2,500/month"
      }
    ],
    "skills": [
      "Field research and animal survey techniques",
      "Laboratory and dissection/anatomical skills",
      "Data analysis for ecological studies",
      "Knowledge of wildlife law and conservation policy",
      "Scientific writing and reporting",
      "Patience for long-term field observation"
    ],
    "universities": [
      "University of Karachi",
      "University of the Punjab, Lahore",
      "Government College University, Lahore",
      "Quaid-i-Azam University, Islamabad",
      "University of Sindh, Jamshoro",
      "University of Agriculture, Faisalabad",
      "Shah Abdul Latif University, Khairpur"
    ],
    "strategy": [
      "BS Zoology → Research Assistant → Wildlife/Conservation Officer → Program Director",
      "BS Zoology → Teaching → Lecturer → Professor",
      "BS Zoology → MS/PhD → Research Scientist → Academic/Conservation Leader"
    ],
    "chooseIf": [
      "You are passionate about animals, wildlife, and conservation",
      "You enjoy fieldwork combined with laboratory-based biology",
      "You want a pathway into conservation, teaching, or biological research"
    ],
    "avoidIf": [
      "You want a degree with abundant private-sector jobs immediately after graduation",
      "You dislike outdoor fieldwork and long observational studies",
      "You need high starting salaries right after your bachelor's degree"
    ],
    "roadmap": [],
    "startupOps": [
      "Wildlife/eco-tourism consultancy",
      "Pet care, breeding, or animal welfare venture",
      "Science education content for conservation awareness"
    ],
    "summary": "BS Zoology connects science to Pakistan's wildlife and conservation needs — a meaningful path for animal-focused students drawn to fieldwork and research."
  },
  {
    "id": "soc-bs-disaster-management",
    "title": "BS Disaster Management",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Interdisciplinary study of risk reduction, emergency response, and post-disaster recovery for a country highly exposed to floods, earthquakes, and climate shocks",
      "Combines geography, environmental science, sociology, and public policy to plan for hazards before, during, and after they strike",
      "A growing priority field as Pakistan faces recurring floods (2010, 2022) and sits on active seismic fault lines"
    ],
    "subjects": [
      "Fundamentals of disaster risk reduction (DRR)",
      "Climate change and environmental hazards",
      "Emergency planning and crisis management",
      "GIS and remote sensing for hazard mapping",
      "Humanitarian logistics and relief operations",
      "Community-based disaster preparedness",
      "Public health in emergencies",
      "Disaster policy, law, and governance in Pakistan"
    ],
    "marketReality": [
      "NDMA/PDMA and international NGOs (UNDP, UNICEF, WFP) regularly hire disaster management graduates in Pakistan",
      "Climate-linked flooding has made this a national priority sector with rising government and donor funding",
      "Still a niche field compared to mainstream social sciences, so competition is lower but total job volume is smaller",
      "Strong overlap with environmental and development sectors opens cross-field opportunities"
    ],
    "jobRoles": [
      "Disaster Risk Reduction Officer",
      "Emergency Response Coordinator",
      "GIS/Hazard Mapping Analyst",
      "Humanitarian Program Officer",
      "Climate Resilience Consultant"
    ],
    "keySectors": [
      "NDMA / Provincial PDMAs",
      "UN agencies (UNDP, OCHA, WFP)",
      "International NGOs (IRC, Save the Children)",
      "Local NGOs and relief organizations",
      "Research think tanks on climate policy"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "45,000 – 80,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "90,000 – 180,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "200,000 – 400,000 PKR"
      },
      {
        "level": "Top Tier / INGO",
        "salary": "400,000 – 800,000+ PKR"
      }
    ],
    "skills": [
      "GIS and mapping software (ArcGIS, QGIS)",
      "Crisis communication and coordination",
      "Data analysis for risk assessment",
      "Project management under pressure",
      "Report writing for donors and government",
      "Field resilience and community engagement"
    ],
    "universities": [
      "University of Peshawar (Disaster Management Dept.)",
      "NUML Islamabad",
      "University of Balochistan",
      "Sindh University Jamshoro",
      "Shaheed Benazir Bhutto University",
      "COMSATS University Islamabad",
      "Karakoram International University"
    ],
    "strategy": [
      "Field Officer → Program Coordinator → DRR Manager → NDMA/Policy Advisor",
      "Field Officer → INGO Program Officer → Regional Emergency Manager → Country Director",
      "Field Officer → GIS Specialist → Climate Resilience Consultant → Independent Researcher"
    ],
    "chooseIf": [
      "You want mission-driven work that directly saves lives and communities",
      "You're comfortable working in the field, sometimes in difficult conditions",
      "You're interested in the intersection of climate change, policy, and humanitarian aid"
    ],
    "avoidIf": [
      "You want a purely desk-based, predictable 9-to-5 job",
      "You are uncomfortable with fieldwork in disaster-hit or remote areas",
      "You want the highest possible starting salary in Pakistan"
    ],
    "roadmap": [],
    "startupOps": [
      "Disaster-preparedness training and consultancy for schools/businesses",
      "GIS-based hazard mapping services for local governments",
      "Climate resilience advisory for construction and real estate"
    ],
    "summary": "BS Disaster Management turns Pakistan's climate vulnerability into a career of impact — a specialist field with growing government and international demand."
  },
  {
    "id": "soc-bs-gender-studies",
    "title": "BS Gender Studies",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Examines how gender shapes social, economic, political, and cultural life, with a strong focus on South Asian and Pakistani contexts",
      "Draws on sociology, law, economics, and public policy to analyze inequality and design interventions",
      "Directly feeds Pakistan's expanding development, NGO, and human-rights sectors"
    ],
    "subjects": [
      "Introduction to gender theory and feminist thought",
      "Gender, law, and human rights in Pakistan",
      "Women, work, and the economy",
      "Gender-based violence and protection frameworks",
      "Masculinities and social identity",
      "Gender and development policy",
      "Research methods in social sciences",
      "Media, culture, and gender representation"
    ],
    "marketReality": [
      "Development and donor-funded organizations (UN Women, USAID-funded projects) actively recruit gender specialists",
      "Government bodies increasingly require gender-mainstreaming expertise for policy compliance",
      "Corporate diversity, equity, and inclusion (DEI) roles are a newer but growing hiring channel",
      "Job volume is smaller than mainstream fields, so graduates often pair this degree with law, public policy, or an MPhil"
    ],
    "jobRoles": [
      "Gender & Development Officer",
      "Policy Research Associate",
      "GBV/Protection Officer",
      "DEI/HR Specialist",
      "Program Manager (NGO)"
    ],
    "keySectors": [
      "UN Women / UNFPA",
      "International & local NGOs",
      "Government social welfare departments",
      "Media and advocacy organizations",
      "Corporate HR/DEI teams"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "45,000 – 80,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "90,000 – 180,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "200,000 – 400,000 PKR"
      },
      {
        "level": "Top Tier / INGO",
        "salary": "400,000 – 700,000+ PKR"
      }
    ],
    "skills": [
      "Research and qualitative analysis",
      "Policy writing and advocacy",
      "Facilitation and community engagement",
      "Understanding of law and human rights frameworks",
      "Cross-cultural sensitivity",
      "Report and grant writing"
    ],
    "universities": [
      "Fatima Jinnah Women University",
      "Quaid-i-Azam University (Gender Studies Dept.)",
      "University of Karachi",
      "Punjab University Lahore",
      "Kinnaird College for Women",
      "Lahore College for Women University",
      "AJK University"
    ],
    "strategy": [
      "Research Assistant → Gender Officer → Program Manager → Policy Advisor",
      "NGO Officer → GBV Specialist → INGO Protection Lead → International Consultant",
      "Graduate → MPhil/MA Gender Studies abroad → Academic/Researcher"
    ],
    "chooseIf": [
      "You're passionate about social justice and equality issues",
      "You enjoy research, writing, and policy analysis",
      "You want to work in Pakistan's development and human-rights sector"
    ],
    "avoidIf": [
      "You need a degree with guaranteed high corporate salaries",
      "You prefer purely technical or quantitative work",
      "You're not interested in advocacy-driven careers"
    ],
    "roadmap": [],
    "startupOps": [
      "DEI training and consultancy for corporates",
      "Women-focused vocational training initiatives",
      "Research and advocacy consultancy for donor projects"
    ],
    "summary": "BS Gender Studies equips graduates to shape policy and practice in one of Pakistan's fastest-growing development priorities."
  },
  {
    "id": "soc-bs-geography",
    "title": "BS Geography",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Studies the physical earth and human societies together — from climate and landforms to urbanization and migration",
      "Provides the spatial-analysis backbone (GIS, remote sensing) increasingly used across planning, agriculture, and environment sectors",
      "A practical science degree with applications in urban planning, environment, and disaster management in Pakistan"
    ],
    "subjects": [
      "Physical geography (climatology, geomorphology)",
      "Human and economic geography",
      "GIS and remote sensing applications",
      "Urban and regional planning",
      "Environmental geography and climate change",
      "Cartography and spatial data analysis",
      "Population and settlement geography",
      "Fieldwork and survey techniques"
    ],
    "marketReality": [
      "Urban planning authorities (LDA, CDA, DHA) and survey departments hire GIS-trained geography graduates",
      "Growing demand from environmental consultancies and climate-focused NGOs",
      "Telecom, real estate, and logistics companies use GIS analysts for site and route planning",
      "Government Survey of Pakistan and provincial planning departments remain steady public-sector employers"
    ],
    "jobRoles": [
      "GIS Analyst",
      "Urban/Town Planner",
      "Environmental Surveyor",
      "Remote Sensing Specialist",
      "Cartographer"
    ],
    "keySectors": [
      "Development authorities (LDA, CDA, DHA)",
      "Survey of Pakistan",
      "Environmental consultancies",
      "Telecom & real estate firms",
      "Research institutes and universities"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "50,000 – 90,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "100,000 – 200,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "220,000 – 450,000 PKR"
      },
      {
        "level": "Top Tier / Consultant",
        "salary": "450,000 – 800,000+ PKR"
      }
    ],
    "skills": [
      "GIS software (ArcGIS, QGIS)",
      "Remote sensing and satellite imagery analysis",
      "Statistical and spatial data analysis",
      "Fieldwork and surveying",
      "Report writing and mapping presentation",
      "Basic programming (Python for GIS)"
    ],
    "universities": [
      "Punjab University Lahore",
      "University of Karachi",
      "University of Peshawar",
      "Quaid-i-Azam University Islamabad",
      "University of Sargodha",
      "Government College University Lahore",
      "University of Balochistan"
    ],
    "strategy": [
      "GIS Trainee → GIS Analyst → Senior Planner → Head of Planning",
      "Surveyor → Remote Sensing Specialist → Environmental Consultant → Project Director",
      "Graduate → MS in Urban Planning/GIS → Academic or Government Policy Role"
    ],
    "chooseIf": [
      "You enjoy maps, spatial thinking, and understanding how places work",
      "You want a science degree with strong fieldwork and technology components",
      "You're interested in urban planning or environmental careers"
    ],
    "avoidIf": [
      "You dislike fieldwork or outdoor data collection",
      "You want a degree strictly focused on social theory only",
      "You need very high entry-level salaries immediately"
    ],
    "roadmap": [],
    "startupOps": [
      "GIS mapping and consultancy services for real estate developers",
      "Environmental impact assessment consultancy",
      "Location-intelligence services for logistics companies"
    ],
    "summary": "BS Geography blends science and society, giving graduates practical GIS skills that open doors across planning, environment, and tech-adjacent sectors."
  },
  {
    "id": "soc-bs-international-relations",
    "title": "BS International Relations",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Studies how states, international organizations, and global markets interact — diplomacy, security, trade, and foreign policy",
      "Highly relevant to Pakistan's geopolitical position between South Asia, Central Asia, China, and the Middle East",
      "A gateway degree for foreign service, diplomacy, international organizations, and global affairs careers"
    ],
    "subjects": [
      "Theories of international relations",
      "Pakistan's foreign policy and regional politics",
      "International law and organizations (UN, WTO)",
      "Diplomacy and negotiation",
      "Global political economy",
      "Security studies and conflict resolution",
      "South Asian and Middle Eastern politics",
      "Research methods in political science"
    ],
    "marketReality": [
      "Competitive but prestigious pathway into the Foreign Service of Pakistan (FSP) via CSS exam",
      "UN agencies, embassies, and international organizations based in Islamabad regularly hire local IR graduates",
      "Media houses and think tanks value IR graduates for geopolitical and defense analysis roles",
      "Corporate sector increasingly hires IR graduates for government-relations and policy-advocacy roles"
    ],
    "jobRoles": [
      "Foreign Service Officer (via CSS)",
      "Policy/Research Analyst",
      "Diplomatic/Embassy Staff",
      "International NGO Program Officer",
      "Government Relations Specialist"
    ],
    "keySectors": [
      "Ministry of Foreign Affairs",
      "UN agencies and embassies",
      "Think tanks (ISSI, IPRI)",
      "Media and journalism",
      "Corporate government-affairs teams"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "50,000 – 90,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "100,000 – 220,000 PKR"
      },
      {
        "level": "Senior Level (CSS/Grade)",
        "salary": "250,000 – 500,000 PKR"
      },
      {
        "level": "Top Tier / UN",
        "salary": "500,000 – 1,000,000+ PKR"
      }
    ],
    "skills": [
      "Analytical and geopolitical reasoning",
      "Diplomatic writing and negotiation",
      "Public speaking and debate",
      "Research and policy analysis",
      "Foreign language proficiency (an asset)",
      "Networking and relationship-building"
    ],
    "universities": [
      "Quaid-i-Azam University Islamabad",
      "National Defence University Islamabad",
      "LUMS Lahore",
      "Punjab University Lahore",
      "NUML Islamabad",
      "Bahria University",
      "University of Karachi"
    ],
    "strategy": [
      "Graduate → CSS Exam → Foreign Service Officer → Ambassador",
      "Research Assistant → Think Tank Analyst → Policy Advisor → Director",
      "Graduate → MA/MPhil IR abroad → UN/International Organization Career"
    ],
    "chooseIf": [
      "You're fascinated by global politics, diplomacy, and current affairs",
      "You're aiming for the CSS exam or a foreign-service career",
      "You enjoy debate, writing, and strategic analysis"
    ],
    "avoidIf": [
      "You want a guaranteed, non-competitive career path",
      "You dislike reading dense policy and history texts",
      "You need quick, high private-sector salaries right after graduation"
    ],
    "roadmap": [],
    "startupOps": [
      "Geopolitical risk consultancy for businesses",
      "Policy research and advocacy consultancy",
      "Content/analysis platform on regional affairs"
    ],
    "summary": "BS International Relations is the classic route into diplomacy and global affairs — high prestige, competitive entry, and long-term influence."
  },
  {
    "id": "soc-bs-library-information-science",
    "title": "BS Library and Information Science",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Focuses on organizing, managing, and providing access to information in libraries, archives, and digital systems",
      "Has evolved from traditional book cataloguing into digital information management and data curation",
      "A stable, specialized field with consistent demand across education, government, and corporate sectors"
    ],
    "subjects": [
      "Library classification and cataloguing systems",
      "Information retrieval and database management",
      "Digital libraries and archiving",
      "Reference and information services",
      "Records and knowledge management",
      "Research methods and information literacy",
      "Library automation software",
      "Academic and public library administration"
    ],
    "marketReality": [
      "Universities, schools, and public-sector libraries maintain steady, if modest, hiring demand",
      "Growing digital-archiving and knowledge-management roles in corporations and research organizations",
      "HEC and university libraries require qualified LIS professionals, creating academic-sector stability",
      "Overseas library and information-management roles (Gulf countries) are a common route for experienced graduates"
    ],
    "jobRoles": [
      "Librarian",
      "Information/Knowledge Manager",
      "Archivist",
      "Documentation Officer",
      "Digital Content Curator"
    ],
    "keySectors": [
      "Universities and colleges",
      "Public and school libraries",
      "Research organizations and think tanks",
      "Corporate knowledge-management teams",
      "Government archives and records departments"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 60,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "65,000 – 120,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "130,000 – 250,000 PKR"
      },
      {
        "level": "Top Tier / Overseas",
        "salary": "250,000 – 500,000+ PKR"
      }
    ],
    "skills": [
      "Library management software (Koha, ILS)",
      "Cataloguing and classification (DDC, LC)",
      "Digital archiving and metadata",
      "Information research skills",
      "Organizational and administrative skills",
      "User service and communication"
    ],
    "universities": [
      "University of the Punjab",
      "University of Karachi",
      "Allama Iqbal Open University",
      "University of Peshawar",
      "Islamia University Bahawalpur",
      "Bahauddin Zakariya University",
      "PMAS Arid Agriculture University"
    ],
    "strategy": [
      "Library Assistant → Librarian → Chief Librarian → Director of Libraries",
      "Documentation Officer → Knowledge Manager → Information Systems Head",
      "Graduate → MLIS/MPhil → University Faculty or Research Librarian"
    ],
    "chooseIf": [
      "You're detail-oriented and enjoy organizing information systems",
      "You want a stable career in education or public-sector institutions",
      "You're interested in the shift toward digital archiving and data curation"
    ],
    "avoidIf": [
      "You want a high-growth, high-salary private-sector career",
      "You dislike administrative and cataloguing work",
      "You're looking for a fast-paced corporate environment"
    ],
    "roadmap": [],
    "startupOps": [
      "Digital archiving and document-management consultancy",
      "Corporate knowledge-management systems setup",
      "E-library and content-curation platforms for schools"
    ],
    "summary": "BS Library and Information Science offers a stable, specialized career managing the growing world of digital and physical information."
  },
  {
    "id": "soc-bs-political-science",
    "title": "BS Political Science",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Studies government systems, political behavior, public policy, and power structures at local, national, and global levels",
      "Central to understanding Pakistan's constitutional, electoral, and administrative systems",
      "A foundational degree for civil service, law, journalism, and public-policy careers"
    ],
    "subjects": [
      "Political theory and ideologies",
      "Pakistan's constitution and political system",
      "Comparative politics",
      "Public administration and policy",
      "International politics",
      "Local government and electoral systems",
      "Research methods in political science",
      "Political economy"
    ],
    "marketReality": [
      "A primary feeder degree for the CSS (Central Superior Services) exam and provincial civil services",
      "Political parties, media houses, and think tanks regularly hire political science graduates for analysis roles",
      "Growing demand for policy researchers as governance and public-policy institutes expand",
      "Law schools and journalism programs commonly accept political science graduates for further specialization"
    ],
    "jobRoles": [
      "Civil Servant (via CSS/PMS)",
      "Policy Research Analyst",
      "Political Journalist/Commentator",
      "Campaign/Political Strategist",
      "Public Affairs Officer"
    ],
    "keySectors": [
      "Federal and provincial government",
      "Think tanks and research institutes",
      "Media and news organizations",
      "Political parties and campaigns",
      "NGOs working on governance"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "45,000 – 80,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "90,000 – 200,000 PKR"
      },
      {
        "level": "Senior Level (Civil Service)",
        "salary": "220,000 – 450,000 PKR"
      },
      {
        "level": "Top Tier / Grade 20+",
        "salary": "450,000 – 900,000+ PKR"
      }
    ],
    "skills": [
      "Analytical and critical thinking",
      "Political and policy writing",
      "Public speaking and debate",
      "Research methodology",
      "Understanding of law and governance",
      "Networking and negotiation"
    ],
    "universities": [
      "Punjab University Lahore",
      "University of Karachi",
      "Quaid-i-Azam University Islamabad",
      "Government College University Lahore",
      "University of Peshawar",
      "Forman Christian College",
      "Bahauddin Zakariya University"
    ],
    "strategy": [
      "Graduate → CSS/PMS Exam → District Officer → Senior Bureaucrat",
      "Research Assistant → Policy Analyst → Think Tank Director",
      "Graduate → Law/Journalism specialization → Political Analyst or Lawyer"
    ],
    "chooseIf": [
      "You're interested in governance, elections, and public policy",
      "You're preparing for CSS or civil service exams",
      "You enjoy debate, current affairs, and political analysis"
    ],
    "avoidIf": [
      "You want a technical, quantitative-focused career",
      "You're not interested in government or policy work",
      "You need guaranteed employment right after graduation"
    ],
    "roadmap": [],
    "startupOps": [
      "Political and policy consultancy for campaigns",
      "Public-opinion polling and research firm",
      "Governance-focused media/content platform"
    ],
    "summary": "BS Political Science remains one of Pakistan's most trusted routes into civil service, governance, and public-policy careers."
  },
  {
    "id": "soc-bs-psychology-arts",
    "title": "BS Psychology (Arts)",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Studies human behavior, cognition, and emotion through a social-science lens, offered under the Arts/Humanities faculty",
      "Provides the same core psychology foundation as the Science track but with a humanities-based admission route",
      "Rapidly growing field in Pakistan as mental-health awareness and demand for counseling services rise"
    ],
    "subjects": [
      "Introduction to psychology and human development",
      "Abnormal and clinical psychology",
      "Social and personality psychology",
      "Counseling theories and techniques",
      "Research methods and statistics in psychology",
      "Cognitive and behavioral psychology",
      "Educational psychology",
      "Psychological assessment and testing"
    ],
    "marketReality": [
      "Mental-health awareness is rising sharply in Pakistan, increasing demand for counselors and therapists in schools and clinics",
      "HR departments increasingly value psychology graduates for talent assessment and organizational behavior roles",
      "Clinical practice generally requires further postgraduate qualification (MS/MPhil Clinical Psychology) for licensure",
      "NGOs and schools are major employers for graduates without postgraduate specialization"
    ],
    "jobRoles": [
      "School Counselor",
      "HR/Talent Assessment Officer",
      "Research Assistant (Psychology)",
      "Community Mental Health Worker",
      "Assistant Psychologist"
    ],
    "keySectors": [
      "Schools and educational institutions",
      "Corporate HR departments",
      "NGOs and mental-health organizations",
      "Hospitals and clinics (under supervision)",
      "Research institutes"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 65,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 140,000 PKR"
      },
      {
        "level": "Senior Level (post MS/MPhil)",
        "salary": "150,000 – 350,000 PKR"
      },
      {
        "level": "Top Tier / Private Practice",
        "salary": "350,000 – 700,000+ PKR"
      }
    ],
    "skills": [
      "Active listening and empathy",
      "Psychological assessment tools",
      "Research and statistical analysis (SPSS)",
      "Communication and counseling techniques",
      "Confidentiality and ethical practice",
      "Report writing"
    ],
    "universities": [
      "Punjab University Lahore",
      "University of Karachi",
      "Kinnaird College for Women",
      "Forman Christian College",
      "Government College University Lahore",
      "University of Peshawar",
      "National University of Modern Languages"
    ],
    "strategy": [
      "Graduate → MS/MPhil Clinical Psychology → Licensed Clinical Psychologist",
      "Graduate → School Counselor → Head Counselor → Educational Consultant",
      "Graduate → HR Assistant → Talent/OD Specialist → HR Manager"
    ],
    "chooseIf": [
      "You're genuinely interested in understanding human behavior and emotions",
      "You want to eventually pursue counseling or clinical psychology",
      "You're comfortable pursuing postgraduate study for full clinical practice"
    ],
    "avoidIf": [
      "You expect to practice clinically with only a bachelor's degree",
      "You want a technical/quantitative-heavy science career",
      "You need a high starting salary immediately after graduation"
    ],
    "roadmap": [],
    "startupOps": [
      "Online counseling and mental-health platforms",
      "Corporate wellness and training consultancy",
      "Educational assessment and career-counseling services"
    ],
    "summary": "BS Psychology (Arts) opens the door to Pakistan's fast-growing mental-health and HR sectors, especially when paired with postgraduate clinical training."
  },
  {
    "id": "soc-bs-psychology-science",
    "title": "BS Psychology (Science)",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Studies the biological, cognitive, and behavioral basis of the human mind through a science-track admission route",
      "Places greater emphasis on neuroscience, statistics, and experimental methods than the Arts-track program",
      "Preferred pathway for students planning to pursue clinical, neuro-, or research psychology at postgraduate level"
    ],
    "subjects": [
      "Biological psychology and neuroscience",
      "Cognitive psychology and experimental methods",
      "Statistics and research design",
      "Abnormal and clinical psychology",
      "Psychological testing and psychometrics",
      "Health and behavioral psychology",
      "Developmental psychology",
      "Applied and forensic psychology"
    ],
    "marketReality": [
      "Science-track graduates are generally preferred for competitive MS/MPhil Clinical Psychology programs",
      "Hospitals and rehabilitation centers increasingly hire psychology graduates as assistant clinicians under supervision",
      "Growing demand for psychometric and research roles in ed-tech, HR-tech, and healthcare startups",
      "Neuropsychology and behavioral-science roles are emerging but still niche in Pakistan's job market"
    ],
    "jobRoles": [
      "Research Assistant (Clinical/Neuro)",
      "Psychometrician/Test Developer",
      "Assistant Clinical Psychologist",
      "Rehabilitation Support Specialist",
      "Behavioral Health Coordinator"
    ],
    "keySectors": [
      "Hospitals and rehabilitation centers",
      "Research and academic institutions",
      "Ed-tech and HR-tech companies",
      "NGOs in mental health",
      "Government health departments"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 70,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "75,000 – 150,000 PKR"
      },
      {
        "level": "Senior Level (post MS/MPhil)",
        "salary": "160,000 – 380,000 PKR"
      },
      {
        "level": "Top Tier / Private Practice",
        "salary": "380,000 – 800,000+ PKR"
      }
    ],
    "skills": [
      "Statistical software (SPSS, R)",
      "Experimental design and research methods",
      "Psychological testing and assessment",
      "Clinical observation skills",
      "Scientific writing",
      "Attention to ethical research standards"
    ],
    "universities": [
      "Punjab University Lahore",
      "University of Karachi",
      "COMSATS University Islamabad",
      "Government College University Lahore",
      "National University of Sciences and Technology",
      "University of Peshawar",
      "Fatima Jinnah Women University"
    ],
    "strategy": [
      "Graduate → MS/MPhil Clinical Psychology → PhD → Licensed Clinical Psychologist",
      "Research Assistant → Psychometrician → Research Lead in Ed-tech/HR-tech",
      "Graduate → Rehabilitation Support Role → Specialist Therapist (post-certification)"
    ],
    "chooseIf": [
      "You have a strong science background and enjoy research and statistics",
      "You plan to pursue clinical or neuropsychology at postgraduate level",
      "You're interested in the biological basis of behavior"
    ],
    "avoidIf": [
      "You dislike statistics or lab-based experimental work",
      "You expect to practice clinically with just a bachelor's degree",
      "You prefer a purely humanities-based approach to psychology"
    ],
    "roadmap": [],
    "startupOps": [
      "Psychometric testing platforms for schools and companies",
      "Tele-therapy and mental-health tech startups",
      "Cognitive-training and ed-tech products"
    ],
    "summary": "BS Psychology (Science) is the stronger foundation for students aiming at clinical, research, or neuropsychology careers in Pakistan and abroad."
  },
  {
    "id": "soc-bs-public-administration",
    "title": "BS Public Administration",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Studies how government and public organizations are managed — policy implementation, governance, and public-sector operations",
      "Directly prepares students for careers in Pakistan's civil service, local government, and public-policy institutions",
      "Combines management, economics, and political science to train future administrators and policy implementers"
    ],
    "subjects": [
      "Principles of public administration",
      "Public policy analysis and implementation",
      "Local government and governance systems",
      "Public financial management and budgeting",
      "Human resource management in the public sector",
      "Administrative law",
      "Development administration",
      "E-governance and public-sector reform"
    ],
    "marketReality": [
      "A core feeder degree for CSS, PMS, and other public-sector recruitment exams in Pakistan",
      "Local government bodies and development authorities recruit administration graduates for planning roles",
      "NGOs and donor-funded governance projects hire public-administration graduates for program-management roles",
      "Corporate sector increasingly values public-administration training for regulatory-affairs and compliance roles"
    ],
    "jobRoles": [
      "Civil Servant (via CSS/PMS)",
      "Program/Project Manager (Public Sector)",
      "Policy Implementation Officer",
      "Local Government Administrator",
      "Regulatory Affairs Officer"
    ],
    "keySectors": [
      "Federal and provincial government",
      "Local government and development authorities",
      "NGOs and donor-funded governance programs",
      "Public-sector enterprises",
      "Corporate regulatory-affairs teams"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "45,000 – 85,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "90,000 – 200,000 PKR"
      },
      {
        "level": "Senior Level (Civil Service)",
        "salary": "220,000 – 450,000 PKR"
      },
      {
        "level": "Top Tier / Grade 20+",
        "salary": "450,000 – 900,000+ PKR"
      }
    ],
    "skills": [
      "Policy analysis and administrative writing",
      "Public financial management basics",
      "Leadership and decision-making",
      "Understanding of law and governance structures",
      "Project management",
      "Negotiation and stakeholder management"
    ],
    "universities": [
      "Punjab University Lahore",
      "University of Karachi",
      "Quaid-i-Azam University Islamabad",
      "National University of Modern Languages",
      "Government College University Lahore",
      "University of Sindh",
      "Bahauddin Zakariya University"
    ],
    "strategy": [
      "Graduate → CSS/PMS Exam → Assistant Commissioner → Senior Bureaucrat",
      "Program Officer → Project Manager → Director (NGO/Government Program)",
      "Graduate → MPA/MPhil Public Policy → Policy Advisor or Academic"
    ],
    "chooseIf": [
      "You want a structured path toward civil service or public-sector leadership",
      "You're interested in how policies are implemented on the ground",
      "You enjoy management, governance, and administrative work"
    ],
    "avoidIf": [
      "You want a fast-moving private-sector or tech career",
      "You dislike bureaucratic processes and structured hierarchies",
      "You need high pay immediately without competitive exams"
    ],
    "roadmap": [],
    "startupOps": [
      "Governance and public-policy consultancy",
      "E-governance/digital-service solutions for local government",
      "Training institute for CSS/PMS exam preparation"
    ],
    "summary": "BS Public Administration is the practical, management-focused route into Pakistan's civil service and public-governance careers."
  },
  {
    "id": "soc-bs-rural-development",
    "title": "BS Rural Development",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Focuses on improving living standards, infrastructure, and livelihoods in Pakistan's rural and agrarian communities",
      "Combines sociology, economics, and agriculture-extension knowledge to design community-development programs",
      "Directly relevant given that a majority of Pakistan's population still lives in rural areas dependent on agriculture"
    ],
    "subjects": [
      "Principles of rural sociology",
      "Community development and mobilization",
      "Agricultural economics and rural livelihoods",
      "Microfinance and rural entrepreneurship",
      "Rural infrastructure and planning",
      "Gender and development in rural contexts",
      "Monitoring and evaluation of development projects",
      "Research methods in development studies"
    ],
    "marketReality": [
      "Rural-development NGOs, donor agencies (World Bank, USAID-funded projects) and microfinance institutions are key employers",
      "Government rural-support programs (RSPN network, BISP) regularly need field and program staff",
      "Agricultural and livestock departments hire graduates for extension and community-liaison roles",
      "Job availability is concentrated in project-based NGO work, so contract-based employment is common"
    ],
    "jobRoles": [
      "Community Development Officer",
      "Field/Program Officer (NGO)",
      "Microfinance/Livelihoods Officer",
      "Monitoring & Evaluation Officer",
      "Agricultural Extension Liaison"
    ],
    "keySectors": [
      "Rural Support Programs (RSPN network)",
      "Microfinance institutions",
      "International donor agencies",
      "Government agriculture & livestock departments",
      "Local development NGOs"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 70,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "75,000 – 150,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "160,000 – 320,000 PKR"
      },
      {
        "level": "Top Tier / INGO",
        "salary": "320,000 – 600,000+ PKR"
      }
    ],
    "skills": [
      "Community mobilization and facilitation",
      "Monitoring and evaluation (M&E) methods",
      "Basic financial and microfinance literacy",
      "Field research and data collection",
      "Report and proposal writing",
      "Cross-cultural and rural community communication"
    ],
    "universities": [
      "University of Agriculture Faisalabad",
      "Sindh Agriculture University",
      "University of Peshawar",
      "PMAS Arid Agriculture University Rawalpindi",
      "Shah Abdul Latif University",
      "Gomal University",
      "University of Swat"
    ],
    "strategy": [
      "Field Officer → Program Coordinator → Project Manager → Country Director (NGO)",
      "Field Officer → Microfinance Officer → Branch/Regional Manager",
      "Graduate → MS Development Studies → M&E Specialist or Policy Researcher"
    ],
    "chooseIf": [
      "You want to work directly with rural communities and grassroots development",
      "You're comfortable with field-based, sometimes remote, work locations",
      "You care about poverty alleviation and agricultural livelihoods"
    ],
    "avoidIf": [
      "You want an urban, office-based corporate career",
      "You prefer permanent salaried roles over project-based NGO contracts",
      "You dislike frequent travel to rural areas"
    ],
    "roadmap": [],
    "startupOps": [
      "Rural microfinance or agri-fintech initiative",
      "Agricultural value-chain and market-linkage consultancy",
      "Community-based tourism or handicraft enterprise"
    ],
    "summary": "BS Rural Development channels graduates into hands-on, community-facing careers tackling poverty and livelihoods in Pakistan's vast rural economy."
  },
  {
    "id": "soc-bs-social-work",
    "title": "BS Social Work",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Trains students to support individuals, families, and communities facing poverty, abuse, illness, and social exclusion",
      "Blends sociology, psychology, and casework methods to deliver direct social services and case management",
      "A practice-oriented degree with strong ties to Pakistan's NGO, healthcare, and child-protection sectors"
    ],
    "subjects": [
      "Principles and methods of social work",
      "Casework and group work techniques",
      "Social welfare policy in Pakistan",
      "Child protection and family welfare",
      "Community organization and mobilization",
      "Human behavior and social environment",
      "Medical and psychiatric social work",
      "Research methods in social work"
    ],
    "marketReality": [
      "Child-protection, healthcare, and welfare NGOs are the largest and most consistent employers",
      "Hospitals increasingly employ medical social workers to support patients and families",
      "Government social-welfare departments and Zakat/Bait-ul-Maal programs offer public-sector openings",
      "International humanitarian agencies hire social workers for protection and case-management roles during crises"
    ],
    "jobRoles": [
      "Caseworker / Social Worker",
      "Medical Social Worker",
      "Child Protection Officer",
      "Community Organizer",
      "NGO Program Officer"
    ],
    "keySectors": [
      "Hospitals and healthcare NGOs",
      "Child-protection organizations (SOS, Sahil)",
      "Government social-welfare departments",
      "International humanitarian agencies",
      "Community-based organizations"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "35,000 – 65,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "70,000 – 140,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "150,000 – 300,000 PKR"
      },
      {
        "level": "Top Tier / INGO",
        "salary": "300,000 – 550,000+ PKR"
      }
    ],
    "skills": [
      "Casework and counseling techniques",
      "Empathy and active listening",
      "Crisis intervention",
      "Report and case-file documentation",
      "Community mobilization",
      "Knowledge of welfare law and referral systems"
    ],
    "universities": [
      "Punjab University Lahore",
      "University of Karachi",
      "University of Peshawar",
      "University of Sindh",
      "Government College University Faisalabad",
      "Islamia University Bahawalpur",
      "University of Malakand"
    ],
    "strategy": [
      "Caseworker → Senior Social Worker → Program Manager → Director of Services",
      "Medical Social Worker → Hospital Welfare Coordinator → Head of Social Services",
      "Graduate → MS/MPhil Social Work → Academic or Clinical Social Work Specialist"
    ],
    "chooseIf": [
      "You're driven by helping vulnerable individuals and families directly",
      "You're emotionally resilient and comfortable with sensitive cases",
      "You want hands-on, people-centered work rather than desk research"
    ],
    "avoidIf": [
      "You find emotionally difficult casework draining or overwhelming",
      "You want a high-paying corporate career track",
      "You prefer purely theoretical or research-based work"
    ],
    "roadmap": [],
    "startupOps": [
      "Community-based child- or elder-care services",
      "Tele-counseling and case-referral platforms",
      "Training and capacity-building consultancy for NGOs"
    ],
    "summary": "BS Social Work prepares graduates for direct, people-centered careers protecting Pakistan's most vulnerable communities."
  },
  {
    "id": "soc-bs-sociology",
    "title": "BS Sociology",
    "domain": DomainType.SOCIAL_SCIENCES,
    "duration": "4 Years Bachelor Degree",
    "category": "Degree",
    "description": [
      "Studies society, social relationships, institutions, and the forces that shape human behavior at scale",
      "Provides analytical tools used across research, development, media, and public-policy careers",
      "A flexible foundation degree that pairs well with journalism, HR, development studies, and civil service preparation"
    ],
    "subjects": [
      "Introduction to sociological theory",
      "Social stratification and class",
      "Sociology of family and gender",
      "Urban and rural sociology",
      "Research methods and statistics",
      "Sociology of religion and culture",
      "Social change and development",
      "Criminology and deviance"
    ],
    "marketReality": [
      "Research organizations, survey firms, and think tanks value sociology graduates for qualitative and quantitative fieldwork",
      "NGOs and development-sector employers hire sociology graduates for community and social-research roles",
      "Sociology remains a strong CSS/PMS optional subject, feeding directly into civil-service careers",
      "Media and market-research companies hire sociology graduates for audience and consumer-behavior research"
    ],
    "jobRoles": [
      "Research Associate",
      "Social/Market Research Analyst",
      "Development Program Officer",
      "Civil Servant (via CSS/PMS)",
      "Policy Research Assistant"
    ],
    "keySectors": [
      "Research and survey organizations",
      "Development NGOs",
      "Government and civil service",
      "Media and market-research firms",
      "Academic and think-tank institutions"
    ],
    "salaryTable": [
      {
        "level": "Entry Level",
        "salary": "40,000 – 70,000 PKR"
      },
      {
        "level": "Mid Level",
        "salary": "75,000 – 160,000 PKR"
      },
      {
        "level": "Senior Level",
        "salary": "170,000 – 350,000 PKR"
      },
      {
        "level": "Top Tier / Civil Service",
        "salary": "350,000 – 800,000+ PKR"
      }
    ],
    "skills": [
      "Qualitative and quantitative research methods",
      "Statistical software (SPSS)",
      "Report and academic writing",
      "Survey design and fieldwork",
      "Critical and analytical thinking",
      "Interviewing and data-collection skills"
    ],
    "universities": [
      "Punjab University Lahore",
      "University of Karachi",
      "Quaid-i-Azam University Islamabad",
      "Government College University Lahore",
      "University of Peshawar",
      "University of Sindh",
      "Fatima Jinnah Women University"
    ],
    "strategy": [
      "Research Assistant → Research Analyst → Senior Researcher → Research Director",
      "Graduate → CSS/PMS Exam → Civil Servant → Senior Bureaucrat",
      "Graduate → MPhil/PhD Sociology → Academic and Policy Researcher"
    ],
    "chooseIf": [
      "You're curious about why societies and communities behave the way they do",
      "You enjoy research, surveys, and data-driven social analysis",
      "You want a flexible degree that opens research, media, or civil-service paths"
    ],
    "avoidIf": [
      "You want a narrowly technical or highly quantitative-only career",
      "You need a degree with one clearly defined single job title",
      "You dislike reading and writing extensively"
    ],
    "roadmap": [],
    "startupOps": [
      "Market and social-research consultancy",
      "Survey and data-collection agency for NGOs/businesses",
      "Social-impact content and media platform"
    ],
    "summary": "BS Sociology gives graduates versatile research and analytical skills that open doors across research, development, media, and civil service."
  },
  ...ARTS_DEGREES,
  ...LAW_DEGREES
];
