const fs = require('fs');

const healthDegrees = `
  // MEDICAL AND HEALTH SCIENCES
  {
    id: 'mlt-cert',
    title: 'Medical Laboratory Technology (MLT Certificate)',
    domain: DomainType.HEALTH,
    duration: '1-2 Year Skill / Fast Track',
    category: 'Skill',
    description: [
      'An entry-level allied health qualification that trains students to collect and process lab samples and run basic diagnostic tests.',
      'Covers hematology, clinical chemistry and microbiology at a technician level, under the Allied Health Professionals Council (AHPC).',
      'The fastest, lowest-cost route into Pakistan\\'s fast-growing diagnostics industry.'
    ],
    subjects: [
      'Basic hematology and blood counts',
      'Clinical chemistry testing',
      'Microbiology and specimen handling',
      'Blood banking basics',
      'Phlebotomy (blood drawing)',
      'Lab safety and quality control',
      'Histopathology sample preparation',
      'Basic lab equipment operation'
    ],
    marketReality: [
      'Private diagnostic chains (Chughtai Lab, Excel Labs, Islamabad Diagnostic Centre) are expanding rapidly across cities.',
      'AHPC registration became mandatory for all lab staff in 2026, formalizing the profession and its pay scales.',
      'Entry demand is strong in hospitals, blood banks and small-town diagnostic labs.',
      'Certificate holders with a few years of experience can bridge into BS MLT for higher pay.'
    ],
    jobRoles: [
      'Lab Technician',
      'Phlebotomist',
      'Blood Bank Assistant',
      'Histo-Technician Assistant',
      'Quality Control Assistant'
    ],
    keySectors: [
      'Diagnostic labs',
      'Hospitals',
      'Blood banks',
      'Research labs',
      'Gulf healthcare (with attestation)'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '25,000 – 40,000 PKR' },
      { level: 'Mid Level', salary: '40,000 – 70,000 PKR' },
      { level: 'Senior / Supervisor', salary: '70,000 – 120,000 PKR' },
      { level: 'Gulf / International', salary: '$700 – $1,200/month' }
    ],
    skills: [
      'Sample collection and phlebotomy',
      'Lab instrument handling',
      'Basic hematology and chemistry procedures',
      'Quality control protocols',
      'Attention to detail',
      'Teamwork under hospital pressure'
    ],
    universities: [
      'University of Health Sciences Lahore (Paramedical Institute)',
      'Dow University of Health Sciences Karachi',
      'King Edward Medical University Paramedical Institute',
      'Jinnah Postgraduate Medical Centre Paramedical Institute',
      'Services Institute of Medical Sciences Lahore',
      'Allama Iqbal Medical College Paramedical Institute',
      'Provincial Health Department training schools'
    ],
    strategy: [
      'MLT Certificate → Lab Technician → Lab Supervisor',
      'MLT Certificate → BS MLT (bridging) → Lab Manager',
      'MLT Certificate → AHPC registration → Gulf lab job'
    ],
    chooseIf: [
      'You want the fastest, cheapest entry into healthcare',
      'You enjoy precise, hands-on lab work',
      'You are comfortable with routine, detail-heavy tasks'
    ],
    avoidIf: [
      'You want a high starting salary immediately',
      'You dislike repetitive daily procedures',
      'You want direct, ongoing patient interaction'
    ],
    roadmap: [
      { year: 'Year 1-2', milestone: 'Complete MLT Certificate and AHPC registration' }
    ],
    startupOps: [
      'Home sample-collection service',
      'Small diagnostic lab franchise',
      'Mobile blood-testing service for housing societies'
    ],
    summary: 'MLT is the fastest bridge into Pakistan\\'s healthcare sector — use it as a stepping stone toward a BS and AHPC registration.'
  },
  {
    id: 'htc-cert',
    title: 'Health Technician (HTC)',
    domain: DomainType.HEALTH,
    duration: '1-2 Year Skill / Fast Track',
    category: 'Skill',
    description: [
      'A generalist allied health qualification for community-level care, vaccination and basic diagnostics.',
      'Trains staff for Basic Health Units (BHUs) and Rural Health Centres (RHCs), especially outside major cities.',
      'A key pillar of Pakistan\\'s public rural healthcare network.'
    ],
    subjects: [
      'Community health basics',
      'First aid and emergency care',
      'Vaccination and EPI programs',
      'Maternal and child health',
      'Basic pharmacology',
      'Vital signs monitoring',
      'Health education and awareness',
      'Disease prevention and control'
    ],
    marketReality: [
      'High and steady demand in Basic Health Units and Rural Health Centres across Punjab, Sindh and KP.',
      'Recruitment mainly runs through provincial health department government scales (BPS).',
      'NGO and public health vaccination campaigns regularly hire trained health technicians.',
      'Pay is modest but the job is stable and government-backed.'
    ],
    jobRoles: [
      'Health Technician',
      'BHU Technician',
      'Vaccinator / EPI Technician',
      'Community Health Officer',
      'Facility Records Assistant'
    ],
    keySectors: [
      'Basic Health Units',
      'Rural Health Centres',
      'NGOs and vaccination programs',
      'Provincial health departments',
      'Community clinics'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '25,000 – 35,000 PKR' },
      { level: 'Mid Level (BPS scale)', salary: '35,000 – 55,000 PKR' },
      { level: 'Senior Technician', salary: '55,000 – 90,000 PKR' },
      { level: 'Facility In-Charge', salary: '90,000 – 150,000 PKR' }
    ],
    skills: [
      'Basic patient assessment',
      'Vaccination technique',
      'Health record keeping',
      'Community communication',
      'First aid response',
      'Basic diagnostic support'
    ],
    universities: [
      'Provincial Health Department Training Schools',
      'University of Health Sciences Lahore',
      'Khyber Medical University Peshawar (allied programs)',
      'Peoples Medical University Nawabshah',
      'District Health Training Institutes',
      'Bolan Medical College Quetta'
    ],
    strategy: [
      'HTC → BHU Technician → Charge Technician',
      'HTC → Charge Technician → Health Facility In-Charge',
      'HTC → Further diploma → Allied Health BS bridging'
    ],
    chooseIf: [
      'You want to serve rural or underserved communities',
      'You want a fast, secure route into government service',
      'You are interested in public health work'
    ],
    avoidIf: [
      'You want urban private-sector pay',
      'You want an advanced clinical scope of practice',
      'You are unwilling to work in remote postings'
    ],
    roadmap: [
      { year: 'Year 1-2', milestone: 'Complete Health Technician diploma and secure government or NGO placement' }
    ],
    startupOps: [
      'Private clinic assistant services in villages',
      'Community health awareness NGO',
      'Mobile vaccination and screening camps'
    ],
    summary: 'HTC offers one of the most stable, service-oriented routes into government healthcare for rural Pakistan.'
  },
  {
    id: 'pharmacy-assistant',
    title: 'Pharmacy Assistant',
    domain: DomainType.HEALTH,
    duration: '1-2 Year Skill / Fast Track',
    category: 'Skill',
    description: [
      'A technical qualification for supporting licensed pharmacists in dispensing and retail pharmacy operations.',
      'Focuses on drug store management rather than clinical prescribing, which requires a Pharm.D.',
      'The most accessible entry point into Pakistan\\'s booming retail pharmacy sector.'
    ],
    subjects: [
      'Basic pharmacology',
      'Dispensing procedures',
      'Drug store management',
      'Inventory and billing',
      'Prescription reading',
      'Basic drug interactions',
      'Customer service',
      'Pharmacy law basics'
    ],
    marketReality: [
      'Retail pharmacy chains (D.Watson, Servaid, Fazal Din\\'s) are expanding into most major cities.',
      'This is one of the easiest entry-level jobs in the pharmaceutical retail sector.',
      'Hospital pharmacies and medical stores also hire assistants for daily operations.',
      'Experienced assistants often move into store management roles.'
    ],
    jobRoles: [
      'Pharmacy Assistant',
      'Retail Store Manager',
      'Medical Store Salesperson',
      'Drug Inventory Clerk',
      'Hospital Pharmacy Assistant'
    ],
    keySectors: [
      'Retail pharmacy chains',
      'Hospital pharmacies',
      'Medical stores',
      'Pharmaceutical distribution companies',
      'Wholesale drug suppliers'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '25,000 – 35,000 PKR' },
      { level: 'Mid Level', salary: '35,000 – 55,000 PKR' },
      { level: 'Store Manager', salary: '55,000 – 90,000 PKR' },
      { level: 'Multi-Store / Regional', salary: '90,000 – 150,000 PKR' }
    ],
    skills: [
      'Drug and product knowledge',
      'Customer service',
      'Cash handling',
      'Inventory management',
      'Attention to detail',
      'Basic prescription literacy'
    ],
    universities: [
      'TEVTA Punjab Technical Institutes',
      'STEVTA Sindh Technical Institutes',
      'Punjab Vocational Training Council institutes',
      'Private pharmacy technician institutes',
      'Aga Khan allied health short programs'
    ],
    strategy: [
      'Pharmacy Assistant → Store Manager → Regional Retail Manager',
      'Pharmacy Assistant → Save capital → Own Medical Store',
      'Pharmacy Assistant → Bridge study → Pharm.D (Licensed Pharmacist)'
    ],
    chooseIf: [
      'You want a quick job in the growing retail health sector',
      'You enjoy customer-facing, sales-oriented work',
      'You want a realistic path to eventually owning a store'
    ],
    avoidIf: [
      'You want to prescribe or clinically counsel patients',
      'You want a high starting salary',
      'You want a purely clinical career'
    ],
    roadmap: [
      { year: 'Year 1-2', milestone: 'Complete Pharmacy Assistant diploma and enter retail pharmacy' }
    ],
    startupOps: [
      'Own small medical store (with a licensed pharmacist on record)',
      'Online medicine delivery service',
      'Health and wellness product retail'
    ],
    summary: 'Pharmacy Assistant is a low-cost, fast entry into Pakistan\\'s growing pharma retail sector, with a realistic path to ownership.'
  },
  {
    id: 'bs-nursing',
    title: 'BS Nursing',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'A professional nursing degree covering clinical and community-based patient care, regulated by the Pakistan Nursing Council (PNC).',
      'Prepares graduates as Registered Nurses eligible to work in hospitals worldwide.',
      'One of the most reliable degrees for guaranteed employment and international migration in 2026.'
    ],
    subjects: [
      'Anatomy and physiology',
      'Medical-surgical nursing',
      'Community health nursing',
      'Pharmacology',
      'Maternal and child health nursing',
      'Psychiatric nursing',
      'Nursing research',
      'Supervised clinical practicum'
    ],
    marketReality: [
      'Pakistan faces a severe nursing shortage, keeping local demand consistently high.',
      'Huge overseas demand in the UK, Gulf and Ireland through NMC and DataFlow verification.',
      'Private hospital chains are expanding ICU, ER and specialty nursing roles.',
      'Nursing is one of the very few Pakistani degrees with a nearly guaranteed international migration path.'
    ],
    jobRoles: [
      'Registered Nurse',
      'ICU / ER Nurse',
      'Community Health Nurse',
      'Nurse Educator',
      'Nurse Manager'
    ],
    keySectors: [
      'Public and private hospitals',
      'Armed Forces Nursing Service',
      'NGOs and community health programs',
      'Overseas hospitals (UK / Gulf / Ireland)'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '40,000 – 70,000 PKR' },
      { level: 'Mid Level', salary: '70,000 – 150,000 PKR' },
      { level: 'Senior / Head Nurse', salary: '150,000 – 300,000 PKR' },
      { level: 'Gulf / UK International', salary: '$900 – $2,500/month' }
    ],
    skills: [
      'Clinical patient assessment',
      'Medication administration',
      'Emergency response',
      'Documentation and reporting',
      'Communication and empathy',
      'Working under pressure'
    ],
    universities: [
      'Aga Khan University School of Nursing and Midwifery',
      'Shifa College of Nursing Islamabad',
      'University of Health Sciences Lahore',
      'Dow University of Health Sciences Karachi',
      'Fatima Memorial College of Nursing Lahore',
      'Ziauddin University College of Nursing',
      'Lahore School of Nursing'
    ],
    strategy: [
      'BS Nursing → Registered Nurse → Charge Nurse → Nursing Superintendent',
      'BS Nursing → PNC license → OET/NCLEX → migrate abroad',
      'BS Nursing → MSN → Nurse Educator or Nurse Practitioner'
    ],
    chooseIf: [
      'You want stable, in-demand work with strong migration options',
      'You genuinely enjoy hands-on patient care',
      'You can handle physically and emotionally demanding shifts'
    ],
    avoidIf: [
      'You are uncomfortable with night shifts or physical work',
      'You are squeamish around blood or illness',
      'You want a purely desk-based career'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS Nursing and clinical practicum' },
      { year: 'Year 5', milestone: 'PNC Registration and begin hospital practice or international licensing (OET/NCLEX)' }
    ],
    startupOps: [
      'Home nursing care service',
      'Nursing training and coaching academy',
      'Elderly/post-surgical home care agency'
    ],
    summary: 'BS Nursing is Pakistan\\'s most reliable route to guaranteed employment and international migration in 2026.'
  },
  {
    id: 'bs-mlt',
    title: 'BS Medical Laboratory Technology',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'An advanced diagnostic-science degree with far greater scope than the MLT certificate, regulated by AHPC.',
      'Trains graduates to run and manage complex hematology, microbiology and molecular diagnostic testing.',
      'Positioned to benefit directly from Pakistan\\'s expanding diagnostic-lab industry.'
    ],
    subjects: [
      'Clinical biochemistry',
      'Hematology and blood banking',
      'Microbiology and parasitology',
      'Histopathology and cytology',
      'Molecular diagnostics (PCR)',
      'Immunology',
      'Laboratory quality management',
      'Research methodology'
    ],
    marketReality: [
      'Diagnostic chains are expanding fast and need degree-level lab scientists, not just technicians.',
      'Molecular/PCR testing demand grew sharply after COVID-19 and remains strong.',
      'AHPC registration is now mandatory, formalizing pay scales and career structure.',
      'Gulf diagnostic labs actively recruit AHPC-registered Pakistani lab scientists.'
    ],
    jobRoles: [
      'Medical Lab Scientist',
      'Molecular Diagnostics Technologist',
      'Histopathology Technologist',
      'Lab Quality Manager',
      'Lab Supervisor'
    ],
    keySectors: [
      'Diagnostic lab chains',
      'Hospital laboratories',
      'Research institutes',
      'Pharmaceutical QC labs',
      'Gulf diagnostic labs'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '40,000 – 60,000 PKR' },
      { level: 'Mid Level', salary: '70,000 – 130,000 PKR' },
      { level: 'Senior / Lab Manager', salary: '130,000 – 220,000 PKR' },
      { level: 'Gulf / International', salary: '$1,000 – $2,000/month' }
    ],
    skills: [
      'PCR, ELISA and analyzer operation',
      'Quality control protocols',
      'Data analysis and reporting',
      'Sample handling procedures',
      'Result interpretation',
      'Attention to detail'
    ],
    universities: [
      'University of Health Sciences Lahore',
      'Dow University of Health Sciences Karachi',
      'Khyber Medical University Peshawar',
      'Aga Khan University',
      'Ziauddin University Karachi',
      'Isra University Hyderabad',
      'Sargodha Medical College'
    ],
    strategy: [
      'BS MLT → AHPC registration → Lab Scientist → Lab Manager',
      'BS MLT → MPhil/MS → Research Scientist',
      'BS MLT → Gulf certification → Overseas Lab Scientist'
    ],
    chooseIf: [
      'You enjoy precise, scientific lab work',
      'You are interested in diagnostics and pathology',
      'You want the option of research later'
    ],
    avoidIf: [
      'You want direct, ongoing patient interaction',
      'You dislike spending years in a lab environment',
      'You want a quick, low-study entry job'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS MLT, clinical rotations and AHPC registration' }
    ],
    startupOps: [
      'Independent diagnostic laboratory',
      'Mobile sample-collection network',
      'Lab quality consultancy for smaller clinics'
    ],
    summary: 'BS MLT rides Pakistan\\'s diagnostic-testing boom with a strong, AHPC-backed career structure.'
  },
  {
    id: 'bs-microbiology',
    title: 'BS Microbiology',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'A science degree studying bacteria, viruses and fungi — the foundation for research, diagnostics, pharma QC and food safety.',
      'Strong pipeline into postgraduate study (MPhil/PhD) both locally and abroad.',
      'Directly feeds Pakistan\\'s growing biotech, pharma and food-industry quality sectors.'
    ],
    subjects: [
      'Bacteriology',
      'Virology',
      'Mycology',
      'Immunology',
      'Molecular biology',
      'Food and industrial microbiology',
      'Environmental microbiology',
      'Biostatistics and research methods'
    ],
    marketReality: [
      'Pharmaceutical companies need microbiologists for quality control and assurance.',
      'Food safety regulation is expanding, creating new QA roles in the food industry.',
      'HEC-funded research institutes (NIH, PCSIR) regularly hire research assistants.',
      'A strong stepping stone into local and international postgraduate programs.'
    ],
    jobRoles: [
      'Microbiologist',
      'QC/QA Analyst (pharma or food)',
      'Research Assistant',
      'Lab Scientist',
      'Food Safety Officer'
    ],
    keySectors: [
      'Pharmaceutical companies',
      'Food industry',
      'Research institutes (NIH, PCSIR)',
      'Diagnostic labs',
      'Academia'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '35,000 – 55,000 PKR' },
      { level: 'Mid Level', salary: '55,000 – 100,000 PKR' },
      { level: 'Senior / QA Manager', salary: '100,000 – 180,000 PKR' },
      { level: 'Research Abroad / PhD track', salary: '200,000 – 450,000 PKR' }
    ],
    skills: [
      'Microbial culture techniques',
      'Molecular biology methods',
      'Laboratory safety',
      'Data analysis',
      'Scientific writing',
      'Critical thinking'
    ],
    universities: [
      'Quaid-i-Azam University Islamabad',
      'University of the Punjab',
      'University of Karachi',
      'COMSATS University Islamabad',
      'GC University Lahore',
      'University of Agriculture Faisalabad',
      'NUST Islamabad'
    ],
    strategy: [
      'BS Microbiology → MPhil/MS → PhD / Research Scientist',
      'BS Microbiology → QC Analyst → QA Manager (pharma)',
      'BS Microbiology → Food Safety Officer → Regulatory Consultant'
    ],
    chooseIf: [
      'You are fascinated by microorganisms and lab science',
      'You want a research or academic career path',
      'You are interested in pharma or food-industry QC'
    ],
    avoidIf: [
      'You want a quick, clinical, patient-facing job',
      'You don\\'t enjoy long hours of lab or research work',
      'You need immediate high income after graduation'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS Microbiology and senior research project' }
    ],
    startupOps: [
      'Independent microbiology testing/consultancy lab',
      'Food safety certification consultancy',
      'Water quality testing service'
    ],
    summary: 'BS Microbiology best suits students aiming at research, pharma QC or further postgraduate study.'
  },
  {
    id: 'bs-nutrition',
    title: 'BS Nutrition and Food Science',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'A degree covering human nutrition, dietetics and food science, riding Pakistan\\'s growing wellness industry.',
      'Prepares graduates for both clinical dietitian roles and food-industry positions.',
      'Combines science with client-facing counseling work.'
    ],
    subjects: [
      'Human nutrition',
      'Dietetics and meal planning',
      'Food science and technology',
      'Clinical nutrition',
      'Community nutrition',
      'Food microbiology and safety',
      'Biochemistry',
      'Sports nutrition'
    ],
    marketReality: [
      'Rising health and wellness awareness is driving demand for qualified dietitians.',
      'Food and beverage companies are expanding QA and product development teams.',
      'Hospitals are increasingly hiring dedicated clinical dietitians.',
      'Social-media nutrition coaching has opened a large new private-practice market.'
    ],
    jobRoles: [
      'Clinical Dietitian',
      'Nutrition Consultant',
      'Food Product Developer',
      'Community Nutrition Officer',
      'Quality Assurance Officer (food)'
    ],
    keySectors: [
      'Hospitals',
      'Food and beverage companies',
      'NGOs and public health programs',
      'Fitness and wellness industry',
      'Government nutrition programs'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '30,000 – 50,000 PKR' },
      { level: 'Mid Level', salary: '50,000 – 90,000 PKR' },
      { level: 'Senior / Chief Dietitian', salary: '90,000 – 160,000 PKR' },
      { level: 'Private Practice / Consulting', salary: '150,000 – 350,000 PKR' }
    ],
    skills: [
      'Diet planning and assessment',
      'Food science knowledge',
      'Client counseling',
      'Food safety standards',
      'Communication',
      'Data-based meal design'
    ],
    universities: [
      'University of Home Economics Lahore',
      'National University of Medical Sciences',
      'University of Agriculture Faisalabad',
      'University of Karachi',
      'Government College University Faisalabad',
      'Fatima Jinnah Women University',
      'Riphah International University'
    ],
    strategy: [
      'BS Nutrition → Clinical Dietitian → Chief Dietitian (hospital)',
      'BS Nutrition → Food Industry QA → Product Development Manager',
      'BS Nutrition → Private Practice → Online Coaching Brand'
    ],
    chooseIf: [
      'You are passionate about health and wellness',
      'You are interested in food science and product development',
      'You enjoy counseling and working with clients'
    ],
    avoidIf: [
      'You want a strictly clinical/medical scope',
      'You are uninterested in the food industry',
      'You dislike client-facing counseling work'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS degree and mandatory clinical internship' }
    ],
    startupOps: [
      'Private nutrition consulting practice',
      'Healthy meal-prep delivery business',
      'Online diet-coaching brand'
    ],
    summary: 'BS Nutrition rides Pakistan\\'s rising wellness wave, with doors open in both hospitals and the food industry.'
  },
  {
    id: 'bs-pe-sport-science',
    title: 'BS Physical Education, Health and Sport Science',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'A degree preparing professionals for sports coaching, PE teaching, fitness training and sports management.',
      'Combines exercise science with practical teaching and coaching skills.',
      'Benefits from expanding private-school and fitness-industry demand.'
    ],
    subjects: [
      'Exercise physiology',
      'Sports psychology',
      'Biomechanics',
      'Sports coaching and training methods',
      'Health and fitness management',
      'Sports injury and first aid',
      'Sports management and administration',
      'PE curriculum and pedagogy'
    ],
    marketReality: [
      'Private schools increasingly require qualified, degree-holding PE teachers.',
      'The urban gym and fitness industry is growing steadily in major cities.',
      'Sports federations need certified coaches and administrators.',
      'Government schools also require certified PE teachers on official pay scales.'
    ],
    jobRoles: [
      'PE Teacher',
      'Sports Coach',
      'Fitness Trainer',
      'Sports Administrator',
      'Athletic Programs Coordinator'
    ],
    keySectors: [
      'Schools and colleges',
      'Gyms and fitness centres',
      'Sports federations',
      'Corporate wellness programs',
      'Sports academies'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '30,000 – 50,000 PKR' },
      { level: 'Mid Level', salary: '50,000 – 90,000 PKR' },
      { level: 'Senior / Head of Department', salary: '90,000 – 150,000 PKR' },
      { level: 'Private Academy / Federation', salary: '150,000 – 300,000 PKR' }
    ],
    skills: [
      'Coaching technique',
      'Fitness program design',
      'Sports injury first response',
      'Leadership and communication',
      'Event management',
      'Knowledge of sports rules and regulations'
    ],
    universities: [
      'University of the Punjab (Sports Sciences)',
      'Gomal University Dera Ismail Khan',
      'University of Education Lahore',
      'Government College University Lahore',
      'University of Sargodha',
      'Islamia University Bahawalpur',
      'National College of Physical Education Lahore'
    ],
    strategy: [
      'BS PE → School PE Teacher → Head of Sports Department',
      'BS PE → Sports Coach → National Federation Coach',
      'BS PE → Fitness Trainer → Own Fitness Academy'
    ],
    chooseIf: [
      'You are passionate about sports and physical fitness',
      'You enjoy teaching or coaching others',
      'You lead an active, physically engaged lifestyle'
    ],
    avoidIf: [
      'You prefer purely desk-based work',
      'You are uninterested in physical training or teaching',
      'You want a strictly clinical healthcare role'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS PE degree and specialized coaching certifications' }
    ],
    startupOps: [
      'Private fitness academy',
      'Sports coaching centre for children',
      'Online fitness coaching brand'
    ],
    summary: 'This degree suits sports-passionate individuals who want to combine teaching, coaching and fitness into one career.'
  },
  {
    id: 'bs-physiology',
    title: 'BS Physiology',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'A science degree studying how the body\\'s systems function, feeding into research, academia and pharma research careers.',
      'Provides a strong foundation for postgraduate study (MPhil/PhD).',
      'Less clinical than MBBS, but scientifically closely related to medicine.'
    ],
    subjects: [
      'Cardiovascular, renal, nervous and endocrine physiology',
      'Biochemistry',
      'Cell and molecular biology',
      'Pathophysiology',
      'Research methodology and biostatistics',
      'Basic pharmacology',
      'Exercise physiology',
      'Laboratory practicals'
    ],
    marketReality: [
      'Most graduates move into academia or research via MPhil/PhD rather than direct industry jobs.',
      'Pharmaceutical research and clinical research organizations occasionally hire at the BS level.',
      'Expanding medical and allied health colleges are creating steady demand for physiology lecturers.',
      'Best treated as a stepping stone rather than a terminal professional qualification.'
    ],
    jobRoles: [
      'Research Assistant',
      'Physiology Lecturer (after MPhil)',
      'Clinical Research Associate',
      'Pharma Research Assistant',
      'Lab Instructor'
    ],
    keySectors: [
      'Universities and medical colleges',
      'Pharmaceutical research companies',
      'Clinical research organizations (CROs)',
      'Research institutes'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '30,000 – 50,000 PKR' },
      { level: 'Mid Level', salary: '50,000 – 90,000 PKR' },
      { level: 'Senior (post-MPhil)', salary: '90,000 – 160,000 PKR' },
      { level: 'PhD / Academic Abroad', salary: '200,000 – 400,000 PKR' }
    ],
    skills: [
      'Physiological experimentation',
      'Data analysis',
      'Scientific writing',
      'Laboratory techniques',
      'Critical thinking',
      'Teaching ability'
    ],
    universities: [
      'University of Karachi',
      'University of the Punjab',
      'Quaid-i-Azam University Islamabad',
      'Government College University Lahore',
      'University of Health Sciences Lahore',
      'Bahauddin Zakariya University Multan',
      'University of Peshawar'
    ],
    strategy: [
      'BS Physiology → MPhil Physiology → PhD / Lecturer',
      'BS Physiology → Clinical Research Associate → CRO Project Manager',
      'BS Physiology → Research Assistant → Academic Career'
    ],
    chooseIf: [
      'You are interested in how the human body works at a systems level',
      'You want an academic or research-oriented career',
      'You are planning further postgraduate study'
    ],
    avoidIf: [
      'You want direct clinical practice',
      'You want quick entry into industry without further study',
      'You need a terminal degree with immediate high pay'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS Physiology and research practicum' }
    ],
    startupOps: [
      'Freelance science tutoring or content creation',
      'Physiology/biology exam-prep coaching'
    ],
    summary: 'BS Physiology is a research and academia-oriented degree, best paired with postgraduate study.'
  },
  {
    id: 'bs-public-health',
    title: 'BS Public Health',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'A degree focused on population-level health, disease prevention, and health policy and program management.',
      'Feeds directly into Pakistan\\'s large NGO and international-donor-funded health sector.',
      'Complements clinical fields by working on health at the community and system level.'
    ],
    subjects: [
      'Epidemiology',
      'Biostatistics',
      'Health policy and management',
      'Environmental health',
      'Community health',
      'Maternal and child health',
      'Health promotion and education',
      'Research methods'
    ],
    marketReality: [
      'Pakistan\\'s NGO and international donor sector (WHO, UNICEF, USAID-funded projects) hires steadily.',
      'Government public health programs (EPI, TB and malaria control) need trained staff.',
      'Post-COVID awareness has increased demand for epidemiology and public health roles.',
      'Career growth is strongly boosted by an MPH after the BS.'
    ],
    jobRoles: [
      'Public Health Officer',
      'Monitoring & Evaluation (M&E) Officer',
      'Health Program Coordinator',
      'Health Policy Analyst',
      'Epidemiologist (with further study)'
    ],
    keySectors: [
      'NGOs and INGOs',
      'Government health departments',
      'UN agencies',
      'Research institutes',
      'Donor-funded health projects'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '35,000 – 60,000 PKR' },
      { level: 'Mid Level', salary: '60,000 – 120,000 PKR' },
      { level: 'Senior', salary: '120,000 – 220,000 PKR' },
      { level: 'INGO / International', salary: '250,000 – 500,000 PKR' }
    ],
    skills: [
      'Epidemiological analysis',
      'Statistical software (SPSS/Stata)',
      'Report and proposal writing',
      'Program management',
      'Community engagement',
      'Grant writing'
    ],
    universities: [
      'Health Services Academy Islamabad',
      'Aga Khan University',
      'Dow University of Health Sciences',
      'Rehman Medical College Peshawar',
      'University of Health Sciences Lahore',
      'Ziauddin University Karachi',
      'Isra University Hyderabad'
    ],
    strategy: [
      'BS Public Health → M&E Officer → Program Manager (NGO)',
      'BS Public Health → MPH → Epidemiologist / WHO Consultant',
      'BS Public Health → Government Health Department → Policy Analyst'
    ],
    chooseIf: [
      'You are interested in population-level health rather than individual patients',
      'You want a career in NGOs or international development',
      'You enjoy data-driven policy and program work'
    ],
    avoidIf: [
      'You want direct clinical patient care',
      'You dislike fieldwork or travel to remote areas',
      'You need a degree with quick, high starting pay'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS Public Health and secure an NGO or government internship' }
    ],
    startupOps: [
      'Public health consultancy',
      'Health-awareness social enterprise',
      'Community screening and outreach service'
    ],
    summary: 'BS Public Health opens the door to Pakistan\\'s large NGO and donor-funded health sector — an MPH accelerates it further.'
  },
  {
    id: 'bs-radiologic-tech',
    title: 'BS Radiologic Technology / Medical Imaging',
    domain: DomainType.HEALTH,
    duration: '4-Year Professional Degree',
    category: 'Professional Health Career',
    description: [
      'A technical degree for operating imaging equipment — X-ray, CT, MRI and ultrasound — for diagnosis, regulated by AHPC.',
      'One of the fastest-growing allied health fields as private diagnostic imaging expands.',
      'Offers strong Gulf migration prospects for trained radiographers.'
    ],
    subjects: [
      'Radiographic anatomy and positioning',
      'Radiation physics and safety',
      'CT and MRI technology',
      'Ultrasound principles',
      'Radiographic pathology',
      'Patient care in imaging',
      'Digital imaging and PACS systems',
      'Quality control procedures'
    ],
    marketReality: [
      'Private diagnostic imaging centres are expanding rapidly in major cities.',
      'Tertiary-care hospitals need dedicated CT and MRI technologists as scanner numbers grow.',
      'AHPC registration plus radiation-safety certification is now required to practice.',
      'Gulf hospitals actively recruit trained, registered Pakistani radiographers.'
    ],
    jobRoles: [
      'X-ray Technologist / Radiographer',
      'CT Technologist',
      'MRI Technologist',
      'Ultrasound Technician',
      'Imaging Department Supervisor'
    ],
    keySectors: [
      'Diagnostic imaging centres',
      'Hospitals',
      'Cancer and radiotherapy centres',
      'Gulf healthcare',
      'Research imaging labs'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '40,000 – 60,000 PKR' },
      { level: 'Mid Level', salary: '70,000 – 130,000 PKR' },
      { level: 'Senior / Supervisor', salary: '130,000 – 220,000 PKR' },
      { level: 'Gulf / International', salary: '$1,200 – $2,200/month' }
    ],
    skills: [
      'X-ray, CT and MRI equipment operation',
      'Radiation safety protocols',
      'Patient positioning',
      'Image quality assessment',
      'PACS / digital imaging systems',
      'Attention to detail'
    ],
    universities: [
      'University of Health Sciences Lahore',
      'Dow University of Health Sciences Karachi',
      'Aga Khan University',
      'Ziauddin University Karachi',
      'Shifa Tameer-e-Millat University Islamabad',
      'Khyber Medical University Peshawar',
      'Isra University Hyderabad'
    ],
    strategy: [
      'BS Radiologic Technology → CT/MRI Technologist → Imaging Supervisor',
      'BS Radiologic Technology → AHPC + Gulf certification → Overseas Radiographer',
      'BS Radiologic Technology → Specialize in Ultrasound → Sonographer'
    ],
    chooseIf: [
      'You are interested in medical technology and imaging science',
      'You are comfortable following strict radiation-safety protocols',
      'You are detail-oriented and technically minded'
    ],
    avoidIf: [
      'You are uncomfortable in hospital/clinical settings',
      'You prefer non-technical, purely administrative roles',
      'You are concerned about radiation exposure environments'
    ],
    roadmap: [
      { year: 'Year 1-4', milestone: 'Complete BS Radiologic Tech and mandatory radiation safety training' }
    ],
    startupOps: [
      'Independent diagnostic imaging centre (with a partner radiologist)',
      'Mobile ultrasound or X-ray service',
      'Imaging equipment maintenance consultancy'
    ],
    summary: 'BS Radiologic Technology combines cutting-edge medical technology with strong Gulf migration potential.'
  },
  {
    id: 'mbbs',
    title: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    domain: DomainType.HEALTH,
    duration: '5-Year Doctor-Level Degree',
    category: 'Doctor level Career',
    description: [
      'The primary medical degree qualifying graduates as licensed physicians, regulated by the Pakistan Medical and Dental Council (PM&DC).',
      'Covers the full breadth of medicine and surgery through classroom study and supervised clinical rotations.',
      'Pakistan\\'s most prestigious and globally portable professional degree.'
    ],
    subjects: [
      'Anatomy, physiology and biochemistry',
      'Pathology and pharmacology',
      'Medicine and surgery (clinical rotations)',
      'Gynecology and obstetrics',
      'Pediatrics',
      'Community medicine',
      'Clinical clerkships across specialties',
      'Emergency and critical care basics'
    ],
    marketReality: [
      'There is an oversupply of general MBBS graduates in some cities, but a genuine shortage in rural and underserved areas.',
      'Demand for specialists remains very high, making the FCPS route almost essential for strong earnings.',
      'A well-established overseas migration pipeline exists via USMLE (USA), PLAB (UK) and Gulf licensing exams.',
      'It remains one of the most respected professions in Pakistani society.'
    ],
    jobRoles: [
      'General Physician / Medical Officer',
      'Specialist (after FCPS, e.g. Surgeon, Cardiologist)',
      'Medical Officer Abroad',
      'Public Health Physician',
      'Medical Researcher'
    ],
    keySectors: [
      'Public and private hospitals',
      'Armed Forces Medical Corps',
      'Private clinics',
      'International hospitals (Gulf / UK / US)',
      'Pharmaceutical and research industry'
    ],
    salaryTable: [
      { level: 'House Officer (Entry)', salary: '40,000 – 60,000 PKR' },
      { level: 'Medical Officer / Early Specialist', salary: '100,000 – 250,000 PKR' },
      { level: 'Senior Specialist / Consultant', salary: '300,000 – 800,000 PKR' },
      { level: 'Gulf / International Consultant', salary: '$2,000 – $8,000/month' }
    ],
    skills: [
      'Clinical diagnosis',
      'Patient management',
      'Procedural and surgical skills (specialty-dependent)',
      'Bedside communication',
      'Decision-making under pressure',
      'Continuous medical education'
    ],
    universities: [
      'King Edward Medical University Lahore',
      'Aga Khan University',
      'Dow University of Health Sciences Karachi',
      'Allama Iqbal Medical College Lahore',
      'Khyber Medical College Peshawar',
      'Nishtar Medical University Multan',
      'Services Institute of Medical Sciences Lahore'
    ],
    strategy: [
      'MBBS → House Job → FCPS Specialization → Consultant',
      'MBBS → PLAB / USMLE → Practice Abroad',
      'MBBS → Public Health / Research Track → Policy or Academic Role'
    ],
    chooseIf: [
      'You are deeply committed to a career in medicine',
      'You can commit to many years of demanding study and training',
      'You want a globally portable, highly respected profession'
    ],
    avoidIf: [
      'You are not prepared for a very long, demanding training path',
      'You want a quicker return on your educational investment',
      'You cannot handle sustained high-pressure environments'
    ],
    roadmap: [
      { year: 'Year 1-5', milestone: 'Complete MBBS coursework and clinical rotations' },
      { year: 'Year 6', milestone: 'Complete House Job for full PM&DC licensure' }
    ],
    startupOps: [
      'Private clinic',
      'Telemedicine practice',
      'Medical training or exam-prep academy'
    ],
    summary: 'MBBS remains Pakistan\\'s most prestigious and globally portable degree, but real financial success now depends heavily on specialization.'
  },
  {
    id: 'pharm-d',
    title: 'Doctor of Pharmacy (Pharm.D)',
    domain: DomainType.HEALTH,
    duration: '5-Year Doctor-Level Degree',
    category: 'Doctor level Career',
    description: [
      'A professional pharmacy degree covering drug therapy, clinical pharmacy and pharmaceutical sciences, regulated by the Pharmacy Council of Pakistan (PCP).',
      'Qualifies graduates as licensed pharmacists able to work clinically, in industry, or in retail.',
      'Offers one of the widest career spreads of any health science degree.'
    ],
    subjects: [
      'Pharmaceutical chemistry',
      'Pharmacology and therapeutics',
      'Clinical pharmacy',
      'Pharmaceutics and drug formulation',
      'Pharmacognosy',
      'Hospital and community pharmacy practice',
      'Pharmacoeconomics',
      'Supervised clinical rotations'
    ],
    marketReality: [
      'Pakistan\\'s pharmaceutical industry (multinational and local manufacturers) continues to expand steadily.',
      'Hospital clinical-pharmacist roles are slowly growing as hospitals modernize.',
      'Retail pharmacy chains are opening rapidly, creating strong management-track demand.',
      'Regulatory affairs, sales and marketing roles in pharma companies pay well above entry clinical roles.'
    ],
    jobRoles: [
      'Clinical Pharmacist',
      'Hospital Pharmacist',
      'Pharmaceutical Sales / Marketing Executive',
      'Regulatory Affairs Officer',
      'Quality Assurance Pharmacist'
    ],
    keySectors: [
      'Pharmaceutical manufacturing companies',
      'Hospitals',
      'Retail pharmacy chains',
      'Drug Regulatory Authority of Pakistan (DRAP)',
      'Gulf pharmacy practice'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '50,000 – 80,000 PKR' },
      { level: 'Mid Level', salary: '80,000 – 150,000 PKR' },
      { level: 'Senior', salary: '150,000 – 300,000 PKR' },
      { level: 'Gulf / Pharma Executive', salary: '300,000 – 700,000 PKR' }
    ],
    skills: [
      'Drug therapy knowledge',
      'Patient counseling',
      'Regulatory compliance',
      'Quality control',
      'Sales and negotiation (industry roles)',
      'Attention to detail'
    ],
    universities: [
      'University of Karachi (Faculty of Pharmacy)',
      'Punjab University College of Pharmacy',
      'Aga Khan University',
      'Dow University of Health Sciences',
      'Bahauddin Zakariya University Multan',
      'Riphah International University',
      'Islamia University Bahawalpur'
    ],
    strategy: [
      'Pharm.D → Hospital/Clinical Pharmacist → Chief Pharmacist',
      'Pharm.D → Pharma Industry → Regulatory Affairs Manager',
      'Pharm.D → Retail Pharmacy → Own Pharmacy Chain'
    ],
    chooseIf: [
      'You are interested in drug science and patient therapy',
      'You want strong private-sector and industry career options',
      'You enjoy chemistry-heavy, detail-oriented coursework'
    ],
    avoidIf: [
      'You only want a purely retail role without industry ambition',
      'You dislike heavy chemistry and pharmacology content',
      'You want a shorter training path'
    ],
    roadmap: [
      { year: 'Year 1-5', milestone: 'Complete Pharm.D degree and secure PCP registration' }
    ],
    startupOps: [
      'Own retail pharmacy',
      'Pharmaceutical consultancy',
      'Compounding or specialty pharmacy service'
    ],
    summary: 'Pharm.D offers one of the widest career spreads in health sciences, from hospital wards to pharma boardrooms.'
  },
  {
    id: 'dpt',
    title: 'Doctor of Physical Therapy (DPT)',
    domain: DomainType.HEALTH,
    duration: '5-Year Doctor-Level Degree',
    category: 'Doctor level Career',
    description: [
      'A professional degree for diagnosing and treating movement and musculoskeletal disorders, regulated by AHPC.',
      'Combines hands-on treatment with exercise-based rehabilitation science.',
      'One of the fastest-growing hands-on healthcare careers in Pakistan.'
    ],
    subjects: [
      'Musculoskeletal and neuro-rehabilitation',
      'Orthopedic physical therapy',
      'Cardiopulmonary rehabilitation',
      'Pediatric and geriatric physiotherapy',
      'Sports physiotherapy',
      'Therapeutic exercise and modalities',
      'Clinical rotations',
      'Patient assessment and treatment planning'
    ],
    marketReality: [
      'Rising awareness of physiotherapy for chronic pain, sports injuries and post-surgical recovery is expanding demand.',
      'Hospitals are increasingly setting up dedicated physiotherapy departments.',
      'Strong Gulf and UK demand exists for licensed, registered physiotherapists.',
      'Private clinics and sports teams offer growing independent-practice opportunities.'
    ],
    jobRoles: [
      'Physiotherapist',
      'Sports Physiotherapist',
      'Rehabilitation Specialist',
      'Pediatric Physiotherapist',
      'Clinic Owner'
    ],
    keySectors: [
      'Hospitals and rehab centres',
      'Sports teams and academies',
      'Private physiotherapy clinics',
      'Gulf / UK healthcare',
      'Special education and pediatric centres'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '40,000 – 60,000 PKR' },
      { level: 'Mid Level', salary: '60,000 – 120,000 PKR' },
      { level: 'Senior / Own Clinic', salary: '120,000 – 300,000 PKR' },
      { level: 'Gulf / International', salary: '$1,000 – $2,500/month' }
    ],
    skills: [
      'Manual therapy techniques',
      'Exercise prescription',
      'Patient assessment',
      'Rehabilitation planning',
      'Communication and empathy',
      'Use of therapeutic equipment'
    ],
    universities: [
      'Riphah International University',
      'Aga Khan University',
      'Ziauddin University Karachi',
      'Isra University Hyderabad',
      'University of Lahore',
      'Superior University Lahore',
      'Dow University of Health Sciences'
    ],
    strategy: [
      'DPT → Hospital Physiotherapist → Senior Rehab Specialist',
      'DPT → Own Clinic → Sports Team Physiotherapist',
      'DPT → Gulf/UK Registration → Overseas Physiotherapist'
    ],
    chooseIf: [
      'You are interested in helping people recover movement and function',
      'You enjoy hands-on, physical patient care',
      'You want strong private-practice and overseas potential'
    ],
    avoidIf: [
      'You are uncomfortable with hands-on physical work',
      'You want a purely diagnostic, non-treatment role',
      'You want a shorter training timeline'
    ],
    roadmap: [
      { year: 'Year 1-5', milestone: 'Complete DPT, clinical rotations, and AHPC registration' }
    ],
    startupOps: [
      'Private physiotherapy clinic',
      'Mobile home-visit physiotherapy service',
      'Sports rehabilitation centre'
    ],
    summary: 'DPT is a fast-growing, hands-on healthcare career with strong private-practice and overseas potential.'
  },
  {
    id: 'dvm',
    title: 'DVM (Doctor of Veterinary Medicine)',
    domain: DomainType.HEALTH,
    duration: '5-Year Doctor-Level Degree',
    category: 'Doctor level Career',
    description: [
      'A professional degree for diagnosing and treating diseases in animals, regulated by the Pakistan Veterinary Medical Council (PVMC).',
      'Covers livestock, companion animals and veterinary public health.',
      'Directly tied to Pakistan\\'s massive agricultural and livestock economy.'
    ],
    subjects: [
      'Veterinary anatomy and physiology',
      'Animal pathology and pharmacology',
      'Livestock production and management',
      'Veterinary surgery',
      'Animal reproduction',
      'Veterinary public health',
      'Clinical rotations (large and small animals)',
      'Poultry and dairy health management'
    ],
    marketReality: [
      'Pakistan\\'s massive livestock economy creates steady, ongoing demand for veterinary officers.',
      'The growing urban pet-care industry is opening new small-animal clinic opportunities.',
      'Government livestock departments regularly hire veterinary officers across all provinces.',
      'Export-oriented meat and dairy industries require veterinary quality oversight.'
    ],
    jobRoles: [
      'Veterinary Officer',
      'Livestock Farm Manager',
      'Small Animal Veterinarian',
      'Veterinary Public Health Officer',
      'Poultry / Dairy Consultant'
    ],
    keySectors: [
      'Government livestock and dairy departments',
      'Private veterinary clinics',
      'Poultry and dairy industry',
      'Research institutes',
      'International livestock and agri organizations'
    ],
    salaryTable: [
      { level: 'Entry Level', salary: '35,000 – 55,000 PKR' },
      { level: 'Mid Level', salary: '55,000 – 100,000 PKR' },
      { level: 'Senior', salary: '100,000 – 200,000 PKR' },
      { level: 'Private Practice / Consultancy', salary: '200,000 – 450,000 PKR' }
    ],
    skills: [
      'Animal handling and examination',
      'Surgical skills',
      'Disease diagnosis',
      'Livestock management knowledge',
      'Communication with farmers and pet owners',
      'Record-keeping'
    ],
    universities: [
      'University of Veterinary and Animal Sciences Lahore',
      'University of Agriculture Faisalabad',
      'Sindh Agriculture University Tandojam',
      'Shaheed Benazir Bhutto University of Veterinary Sciences Sakrand',
      'Bahauddin Zakariya University Multan',
      'Gomal University Dera Ismail Khan',
      'The University of Poonch Rawalakot (Vet Sciences)'
    ],
    strategy: [
      'DVM → Government Veterinary Officer → District Livestock Officer',
      'DVM → Private Practice → Pet Clinic Owner',
      'DVM → Poultry/Dairy Consultant → Agri-Business Advisor'
    ],
    chooseIf: [
      'You are passionate about animals and animal welfare',
      'You are interested in the agriculture and livestock economy',
      'You are comfortable working outdoors and on farms'
    ],
    avoidIf: [
      'You are uncomfortable around animals in distress',
      'You want purely urban, desk-based work',
      'You dislike unpredictable field conditions'
    ],
    roadmap: [
      { year: 'Year 1-5', milestone: 'Complete DVM and secure PVMC registration' }
    ],
    startupOps: [
      'Private veterinary clinic',
      'Livestock health consultancy',
      'Pet grooming and care business'
    ],
    summary: 'DVM combines Pakistan\\'s agricultural backbone with a growing urban pet-care niche, offering both rural and urban career paths.'
  },
`

const dataPath = 'src/data.ts';
let dataContent = fs.readFileSync(dataPath, 'utf8');

// The original health degrees start at "// HEALTH - 1-2 years Skills" (line 55ish)
// and end just before "// TECHNOLOGY - 1-2 year Skill Route"
const startMarker = "// HEALTH - 1-2 years Skills";
const endMarker = "// TECHNOLOGY - 1-2 year Skill Route";

const startIndex = dataContent.indexOf(startMarker);
const endIndex = dataContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = dataContent.substring(0, startIndex) + healthDegrees + dataContent.substring(endIndex);
  fs.writeFileSync(dataPath, newContent, 'utf8');
  console.log("Successfully replaced HEALTH degrees.");
} else {
  console.log("Could not find markers.");
}
