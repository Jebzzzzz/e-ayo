export type FacilityOwnership = 'Public' | 'Private' | 'Institutional';

export type FacilityCategory =
  | 'Hospitals and Infirmaries'
  | 'Government Health Centers'
  | 'Private Medical Clinics'
  | 'Birthing and Maternity Facilities'
  | 'Diagnostic Laboratories';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: string;
  consultationFee: string;
  available: boolean;
}

export interface FacilityServiceItem {
  name: string;
  category: string;
  fee: string;
  duration?: string;
  description: string;
}

export interface HealthcareFacility {
  id: string;
  number: number;
  name: string;
  shortName: string;
  ownership: FacilityOwnership;
  facilityType: string;
  category: FacilityCategory;
  homeCategory: string;
  barangay: string;
  location: string;
  distanceNote?: string;
  imageUrl: string;
  mapImageUrl: string;
  servicesSummary: string;
  serviceTags: string[];
  displayTags: string[];
  detailedServices: FacilityServiceItem[];
  operatingHours: string;
  shortHours: string;
  is24Hours: boolean;
  contact: string;
  email?: string;
  website?: string;
  appointmentPolicy: 'Online Booking Available' | 'Coordinate Required' | 'Confirm with Facility';
  acceptsOnlineBooking: boolean;
  featured: boolean;
  priorityProvider: boolean;
  ownershipBadge: string;
  statusBadge: string;
  description: string;
  doctors: Doctor[];
}

export const STITCH_IMAGES = {
  heroFamily: '/images/splash-onboarding-family.png',
  mapPreview: '/images/map-baybay.svg',
  bcich: '/images/bcich.png',
  cho: '/images/cho.png',
  bcmddc: '/images/bcmddc.svg',
  kidzklinika: '/images/kidzklinika.svg',
  familyCare: '/images/family-care.svg',
};

export const INITIAL_FACILITIES: HealthcareFacility[] = [
  {
    id: 'bcich',
    number: 1,
    name: 'Baybay City Immaculate Conception Hospital',
    shortName: 'Immaculate Conception Hospital',
    ownership: 'Public',
    facilityType: 'Level 1 Hospital',
    category: 'Hospitals and Infirmaries',
    homeCategory: 'Public Health Centers',
    barangay: 'Brgy. Cogon, Baybay City',
    location: 'National Highway, Brgy. Cogon, Baybay City, Leyte 6521',
    distanceNote: 'Brgy. Cogon • 1.2 km from City Plaza',
    imageUrl: STITCH_IMAGES.bcich,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary:
      'General hospital care, emergency services, inpatient care, diagnostic imaging, laboratory and maternity-related services',
    serviceTags: [
      'General Consultation',
      'Diagnostic Services',
      'Laboratory Services',
      'Maternal and Child Care',
      'Chronic Disease Care',
    ],
    displayTags: ['Emergency Care', 'General Medicine', 'Laboratory'],
    detailedServices: [
      {
        name: 'General Outpatient Consultation',
        category: 'General Consultation',
        fee: '₱150',
        duration: '30 mins',
        description: 'Adult & senior medical check-up',
      },
      {
        name: 'Pediatric Check-up',
        category: 'Maternal and Child Care',
        fee: '₱200',
        duration: '30 mins',
        description: 'Infant and child consultation',
      },
      {
        name: 'Complete Blood Count (CBC)',
        category: 'Laboratory Services',
        fee: '₱250',
        duration: '15 mins',
        description: 'Results within 2 hours',
      },
      {
        name: 'Chest X-Ray',
        category: 'Diagnostic Services',
        fee: '₱450',
        duration: '20 mins',
        description: 'Digital diagnostic imaging',
      },
    ],
    operatingHours: 'Emergency & Admissions: Open 24/7 • Outpatient Clinic: Mon–Sat, 8:00 AM – 4:00 PM',
    shortHours: 'Open 24 Hours',
    is24Hours: true,
    contact: '(053) 563-9100',
    website: 'https://baybaycity.gov.ph/offices/bcich/',
    appointmentPolicy: 'Online Booking Available',
    acceptsOnlineBooking: true,
    featured: true,
    priorityProvider: true,
    ownershipBadge: 'Public • Level 1',
    statusBadge: 'Appointments Open',
    description:
      'Baybay City’s flagship public Level 1 hospital situated along National Highway in Brgy. Cogon, delivering 24/7 emergency medical services, inpatient care, maternal deliveries, and clinical diagnostics to all Baybayanons.',
    doctors: [
      {
        id: 'doc-bcich-1',
        name: 'Dr. Maria Elena Santos',
        specialty: 'Internal Medicine',
        schedule: 'Mon–Fri',
        consultationFee: '₱150',
        available: true,
      },
      {
        id: 'doc-bcich-2',
        name: 'Dr. Roberto Villanueva',
        specialty: 'Family Medicine',
        schedule: 'Tue–Sat',
        consultationFee: '₱150',
        available: true,
      },
    ],
  },
  {
    id: 'baybay-cho',
    number: 2,
    name: 'Baybay City Health Office',
    shortName: 'Baybay City Health Office',
    ownership: 'Public',
    facilityType: 'City Health Office',
    category: 'Government Health Centers',
    homeCategory: 'Public Health Centers',
    barangay: 'Brgy. Poblacion, Baybay City',
    location: 'Ramon Magsaysay Avenue, Brgy. Poblacion, Baybay City, Leyte 6521',
    distanceNote: 'Brgy. Poblacion • 0.4 km from City Plaza',
    imageUrl: STITCH_IMAGES.cho,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary:
      'Primary care, medical consultation, immunization, dental services, TB-DOTS, animal bite treatment, and mental health wellness unit',
    serviceTags: [
      'General Consultation',
      'Laboratory Services',
      'Diagnostic Services',
      'Dental Services',
      'Immunization',
      'Chronic Disease Care',
      'Mental Health',
    ],
    displayTags: ['Primary Care', 'Immunization', 'Dental'],
    detailedServices: [
      {
        name: 'General Outpatient Consultation',
        category: 'General Consultation',
        fee: 'Free',
        duration: '30 mins',
        description: 'Everyday check-ups, fever, blood pressure, and medical certificates',
      },
      {
        name: 'Routine & Anti-Rabies Immunization',
        category: 'Immunization',
        fee: 'Free',
        duration: '20 mins',
        description: 'Childhood vaccines, flu shots, and anti-rabies vaccination',
      },
      {
        name: 'Public Dental Check-up & Extraction',
        category: 'Dental Services',
        fee: 'Free',
        duration: '30 mins',
        description: 'Tooth extraction, oral prophylaxis, and routine dental check-ups',
      },
      {
        name: 'Mental Health & Wellness Counseling',
        category: 'Mental Health',
        fee: 'Free',
        duration: '45 mins',
        description: 'Confidential counseling, stress support, and psychiatric referrals',
      },
    ],
    operatingHours: 'Open now • Mon–Sat, 8:00 AM – 5:00 PM',
    shortHours: 'Mon–Sat 8AM–5PM',
    is24Hours: false,
    contact: '(053) 563-9211',
    email: 'baybaycho1@gmail.com',
    appointmentPolicy: 'Online Booking Available',
    acceptsOnlineBooking: true,
    featured: true,
    priorityProvider: true,
    ownershipBadge: 'Public',
    statusBadge: 'Walk-in & Booking',
    description:
      'The primary public health center of the City Government of Baybay, providing free outpatient medical consultations, childhood & anti-rabies immunization, dental care, and mental health support.',
    doctors: [
      {
        id: 'doc-cho-1',
        name: 'Dr. Nelson G. Cariño, MD, MPH',
        specialty: 'City Health Officer • Public Health',
        schedule: 'Mon–Fri',
        consultationFee: 'Free',
        available: true,
      },
      {
        id: 'doc-cho-2',
        name: 'Dr. Marites L. Avila, MD',
        specialty: 'Primary Care & Wellness Unit',
        schedule: 'Mon–Sat',
        consultationFee: 'Free',
        available: true,
      },
    ],
  },
  {
    id: 'bcmddc',
    number: 3,
    name: 'Baybay City Medical Diagnostic & Dialysis Center',
    shortName: 'Baybay Diagnostic & Dialysis Center',
    ownership: 'Public',
    facilityType: 'Diagnostic / Dialysis Center',
    category: 'Diagnostic Laboratories',
    homeCategory: 'Diagnostic and Dialysis',
    barangay: 'Brgy. Gaas, Baybay City',
    location: 'Brgy. Gaas / Zone 4 Medical Complex, Baybay City, Leyte 6521',
    distanceNote: 'Brgy. Gaas • 1.8 km from City Plaza',
    imageUrl: STITCH_IMAGES.bcmddc,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary: 'Hemodialysis, digital X-ray, abdominal & OB ultrasound, 12-lead ECG, and diagnostic laboratory',
    serviceTags: [
      'Diagnostic Services',
      'Laboratory Services',
      'Chronic Disease Care',
    ],
    displayTags: ['Hemodialysis', 'X-Ray & Ultrasound'],
    detailedServices: [
      {
        name: 'Scheduled Hemodialysis Session',
        category: 'Chronic Disease Care',
        fee: 'PhilHealth Covered',
        duration: '4 hours',
        description: 'Kidney dialysis treatment with nephrologist monitoring',
      },
      {
        name: 'Digital X-Ray & Abdominal Ultrasound',
        category: 'Diagnostic Services',
        fee: '₱350',
        duration: '30 mins',
        description: 'Digital chest X-ray, renal & abdominal ultrasound',
      },
      {
        name: '12-Lead ECG & Renal Blood Panel',
        category: 'Laboratory Services',
        fee: '₱300',
        duration: '20 mins',
        description: 'Creatinine, BUN, electrolytes, CBC, and cardiac ECG',
      },
    ],
    operatingHours: 'Open now • Mon–Sat, 6:00 AM – 6:00 PM',
    shortHours: 'Open now • 6AM–6PM',
    is24Hours: false,
    contact: '(053) 563-9450',
    appointmentPolicy: 'Coordinate Required',
    acceptsOnlineBooking: true,
    featured: false,
    priorityProvider: true,
    ownershipBadge: 'Public',
    statusBadge: 'Appointment Required',
    description:
      'Baybay City’s dedicated renal care and modern diagnostic center providing scheduled hemodialysis sessions, digital X-ray, ultrasound, 12-lead ECG, and clinical laboratory services.',
    doctors: [
      {
        id: 'doc-bcmddc-1',
        name: 'Dr. Arthur L. Cañete, MD, FPSN',
        specialty: 'Internal Medicine – Nephrology',
        schedule: 'Mon / Wed / Fri',
        consultationFee: 'PhilHealth Covered',
        available: true,
      },
      {
        id: 'doc-bcmddc-2',
        name: 'Dr. Hannah Grace S. Alkuino, MD',
        specialty: 'Dialysis & Diagnostic Imaging',
        schedule: 'Mon–Sat',
        consultationFee: '₱300',
        available: true,
      },
    ],
  },
  {
    id: 'kidzklinika',
    number: 4,
    name: 'Kidzklinika',
    shortName: 'Kidzklinika',
    ownership: 'Private',
    facilityType: 'Pediatric Clinic',
    category: 'Private Medical Clinics',
    homeCategory: 'Pediatric and Maternal',
    barangay: 'Brgy. Poblacion, Baybay City',
    location: 'A. Bonifacio St., Brgy. Poblacion, Baybay City, Leyte 6521',
    distanceNote: 'A. Bonifacio St., Brgy. Poblacion • 0.5 km from City Plaza',
    imageUrl: STITCH_IMAGES.kidzklinika,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary: 'Pediatric check-ups, well-baby consultations, and childhood immunization',
    serviceTags: ['Maternal and Child Care', 'Immunization', 'General Consultation'],
    displayTags: ['Pediatric Check-up', 'Child Immunization'],
    detailedServices: [
      {
        name: 'Pediatric Check-up',
        category: 'Maternal and Child Care',
        fee: '₱350',
        duration: '30 mins',
        description: 'Well-baby milestone check-up and sick-child consultation',
      },
      {
        name: 'Child Immunization & Catch-Up Vaccines',
        category: 'Immunization',
        fee: '₱500',
        duration: '20 mins',
        description: 'Childhood vaccines, booster shots, and pediatric immunization',
      },
      {
        name: 'Pediatric Nebulization & School Clearance',
        category: 'General Consultation',
        fee: '₱300',
        duration: '20 mins',
        description: 'Respiratory care and school health certification',
      },
    ],
    operatingHours: 'Open now • Mon–Sat, 9:00 AM – 5:00 PM',
    shortHours: 'Open Today • 9AM–5PM',
    is24Hours: false,
    contact: '0917 845 2210',
    appointmentPolicy: 'Online Booking Available',
    acceptsOnlineBooking: true,
    featured: true,
    priorityProvider: false,
    ownershipBadge: 'Private • Pediatric',
    statusBadge: 'Slots Today',
    description:
      'Baybay City’s friendly pediatric clinic along A. Bonifacio Street in Brgy. Poblacion, specializing in newborn wellness, infant vaccinations, and child medical consultations.',
    doctors: [
      {
        id: 'doc-kidz-1',
        name: 'Dr. Liza Tan',
        specialty: 'Pediatrics • Child Wellness',
        schedule: 'Mon–Sat',
        consultationFee: '₱350',
        available: true,
      },
      {
        id: 'doc-kidz-2',
        name: 'Dr. Maria Lourdes C. Sy, MD, FPPS',
        specialty: 'Pediatric Specialist',
        schedule: 'Mon–Fri',
        consultationFee: '₱400',
        available: true,
      },
    ],
  },
  {
    id: 'baybay-family-care',
    number: 5,
    name: 'Baybay Family Care and Maternity Clinic',
    shortName: 'Baybay Family Care Clinic',
    ownership: 'Private',
    facilityType: 'Birthing / Maternity Clinic',
    category: 'Birthing and Maternity Facilities',
    homeCategory: 'Pediatric and Maternal',
    barangay: 'Brgy. Galenzoga, Baybay City',
    location: '242-A Bonifacio Street, Brgy. Galenzoga, Baybay City, Leyte 6521',
    distanceNote: 'Brgy. Galenzoga • 0.8 km from City Plaza',
    imageUrl: STITCH_IMAGES.familyCare,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary: 'Prenatal check-ups, 24/7 safe maternity delivery, family medicine, and OB ultrasound',
    serviceTags: ['Maternal and Child Care', 'Diagnostic Services', 'General Consultation'],
    displayTags: ['Prenatal & Maternity', 'Family Medicine', 'Ultrasound'],
    detailedServices: [
      {
        name: 'Prenatal & Postnatal Check-up',
        category: 'Maternal and Child Care',
        fee: '₱350',
        duration: '30 mins',
        description: 'Trimester maternal check-up and fetal heart monitoring',
      },
      {
        name: 'OB & Pelvic Ultrasound',
        category: 'Diagnostic Services',
        fee: '₱600',
        duration: '30 mins',
        description: 'Fetal wellness scan and maternal imaging',
      },
      {
        name: '24/7 Safe Maternity Delivery Package',
        category: 'Maternal and Child Care',
        fee: 'PhilHealth MCP',
        duration: '24/7 Admission',
        description: 'Safe normal delivery and newborn screening',
      },
      {
        name: 'Family Medicine Consultation',
        category: 'General Consultation',
        fee: '₱300',
        duration: '30 mins',
        description: 'General check-up for mothers, adults, and families',
      },
    ],
    operatingHours: 'Open 24 Hours (Delivery) • Outpatient Clinic: Mon–Sat, 8:00 AM – 5:00 PM',
    shortHours: 'Open 24 Hours (Delivery)',
    is24Hours: true,
    contact: '0918 332 9044',
    appointmentPolicy: 'Online Booking Available',
    acceptsOnlineBooking: true,
    featured: false,
    priorityProvider: false,
    ownershipBadge: 'Private',
    statusBadge: 'Delivery 24/7',
    description:
      'Trusted community family and maternity clinic in Brgy. Galenzoga offering prenatal check-ups, OB ultrasound, family medicine consultations, and 24/7 safe delivery services.',
    doctors: [
      {
        id: 'doc-bfc-1',
        name: 'Dr. Clarissa Mae Loreto, MD',
        specialty: 'Obstetrics & Maternal Care',
        schedule: 'Mon–Sat',
        consultationFee: '₱350',
        available: true,
      },
      {
        id: 'doc-bfc-2',
        name: 'Norma T. Galenzoga, RM, BSM',
        specialty: 'Lead Midwife & Family Planning',
        schedule: 'Daily 24/7',
        consultationFee: '₱300',
        available: true,
      },
    ],
  },
  {
    id: 'baybay-doctors',
    number: 6,
    name: 'Baybay Doctors Hospital',
    shortName: 'Baybay Doctors Hospital',
    ownership: 'Private',
    facilityType: 'Infirmary / Hospital',
    category: 'Hospitals and Infirmaries',
    homeCategory: 'General Clinics',
    barangay: 'Brgy. Poblacion (Zone 18)',
    location: 'C.M. Recto Street corner 30 de Deciembre Street, Zone 18, Baybay City',
    distanceNote: 'Zone 18, Brgy. Poblacion • 0.6 km from City Plaza',
    imageUrl: STITCH_IMAGES.bcich,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary: '24-hour private hospital care, internal medicine, cardiac ECG, and clinical laboratory',
    serviceTags: [
      'General Consultation',
      'Diagnostic Services',
      'Laboratory Services',
      'Chronic Disease Care',
    ],
    displayTags: ['General Medicine', '12-Lead ECG', '24/7 Infirmary'],
    detailedServices: [
      {
        name: 'General & Specialist Outpatient Consultation',
        category: 'General Consultation',
        fee: '₱450',
        duration: '30 mins',
        description: 'Adult medical check-up and specialist evaluation',
      },
      {
        name: '12-Lead ECG & Cardiac Screening',
        category: 'Diagnostic Services',
        fee: '₱400',
        duration: '20 mins',
        description: 'Electrocardiogram tracing with physician interpretation',
      },
      {
        name: 'Hypertension & Diabetes Maintenance Care',
        category: 'Chronic Disease Care',
        fee: '₱450',
        duration: '30 mins',
        description: 'Chronic disease monitoring and prescription management',
      },
    ],
    operatingHours: 'Open 24 Hours • Outpatient Clinic: Mon–Sat, 8:30 AM – 5:00 PM',
    shortHours: 'Open 24 Hours',
    is24Hours: true,
    contact: '(053) 556-2890',
    appointmentPolicy: 'Online Booking Available',
    acceptsOnlineBooking: true,
    featured: false,
    priorityProvider: true,
    ownershipBadge: 'Private • Hospital',
    statusBadge: 'Open 24 Hours',
    description:
      'A 24-hour private healthcare facility at the heart of Brgy. Poblacion Zone 18, offering specialist consultations, inpatient admission, cardiac ECG, and diagnostic laboratory workups.',
    doctors: [
      {
        id: 'doc-bdh-1',
        name: 'Dr. Eduardo S. Veloso, MD, FPCP',
        specialty: 'Internal Medicine – Cardiology',
        schedule: 'Mon–Sat',
        consultationFee: '₱500',
        available: true,
      },
      {
        id: 'doc-bdh-2',
        name: 'Dr. Regina Carmela Tan, MD',
        specialty: 'Family & General Medicine',
        schedule: 'Mon–Fri',
        consultationFee: '₱450',
        available: true,
      },
    ],
  },
  {
    id: 'vsu-hospital',
    number: 7,
    name: 'VSU Hospital',
    shortName: 'VSU Hospital',
    ownership: 'Public',
    facilityType: 'University Hospital',
    category: 'Hospitals and Infirmaries',
    homeCategory: 'Public Health Centers',
    barangay: 'Brgy. Pangasugan, Baybay City',
    location: 'Visca Campus, Brgy. Pangasugan, Baybay City, Leyte 6521',
    distanceNote: 'Brgy. Pangasugan • 8.0 km north of City Proper',
    imageUrl: STITCH_IMAGES.cho,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary: 'General medical consultation, digital X-ray, ECG, and clinical laboratory services',
    serviceTags: [
      'General Consultation',
      'Diagnostic Services',
      'Laboratory Services',
      'Immunization',
    ],
    displayTags: ['Primary Care', 'Chest X-Ray', 'Laboratory'],
    detailedServices: [
      {
        name: 'General Medical & Campus Health Consultation',
        category: 'General Consultation',
        fee: '₱200',
        duration: '30 mins',
        description: 'Outpatient check-up for Brgy. Pangasugan and Baybay residents',
      },
      {
        name: 'Chest & Extremity X-Ray',
        category: 'Diagnostic Services',
        fee: '₱350',
        duration: '20 mins',
        description: 'Radiographic imaging with radiologist report',
      },
      {
        name: 'Routine Clinical Laboratory (CBC, Urinalysis)',
        category: 'Laboratory Services',
        fee: '₱180',
        duration: '15 mins',
        description: 'Laboratory tests for medical clearance and diagnosis',
      },
    ],
    operatingHours: 'Mon–Sat, 8:00 AM – 5:00 PM',
    shortHours: 'Mon–Sat 8AM–5PM',
    is24Hours: false,
    contact: '(053) 335-2607',
    appointmentPolicy: 'Online Booking Available',
    acceptsOnlineBooking: true,
    featured: false,
    priorityProvider: false,
    ownershipBadge: 'Public • Institutional',
    statusBadge: 'Appointments Open',
    description:
      'Located inside the Visayas State University campus in Brgy. Pangasugan, serving both the academic community and northern barangays of Baybay City with medical, X-ray, ECG, and lab care.',
    doctors: [
      {
        id: 'doc-vsu-1',
        name: 'Dr. Elvira P. Parac, MD',
        specialty: 'General & Community Medicine',
        schedule: 'Mon–Fri',
        consultationFee: '₱200',
        available: true,
      },
    ],
  },
  {
    id: 'punzalan-clinic',
    number: 8,
    name: 'Punzalan Family Medical Clinic',
    shortName: 'Punzalan Clinic',
    ownership: 'Private',
    facilityType: 'General Medical Clinic',
    category: 'Private Medical Clinics',
    homeCategory: 'General Clinics',
    barangay: 'Brgy. Poblacion, Baybay City',
    location: 'M.L. Quezon Street, Brgy. Poblacion, Baybay City, Leyte 6521',
    distanceNote: 'Brgy. Poblacion • 0.5 km from City Plaza',
    imageUrl: STITCH_IMAGES.familyCare,
    mapImageUrl: STITCH_IMAGES.mapPreview,
    servicesSummary: 'Outpatient adult and family medicine consultations, medical clearances, and chronic care',
    serviceTags: ['General Consultation', 'Chronic Disease Care'],
    displayTags: ['General Medicine', 'Medical Certificates', 'Chronic Care'],
    detailedServices: [
      {
        name: 'Adult & Family Outpatient Consultation',
        category: 'General Consultation',
        fee: '₱350',
        duration: '30 mins',
        description: 'Check-up for fever, cough, blood pressure, and medical clearance',
      },
      {
        name: 'Hypertension & Diabetes Follow-up',
        category: 'Chronic Disease Care',
        fee: '₱350',
        duration: '30 mins',
        description: 'Maintenance medication review and monitoring',
      },
    ],
    operatingHours: 'Mon–Sat, 9:00 AM – 4:00 PM',
    shortHours: 'Mon–Sat 9AM–4PM',
    is24Hours: false,
    contact: '0905 253 8117',
    appointmentPolicy: 'Online Booking Available',
    acceptsOnlineBooking: true,
    featured: false,
    priorityProvider: false,
    ownershipBadge: 'Private',
    statusBadge: 'Slots Today',
    description:
      'Established private outpatient clinic in Brgy. Poblacion delivering personalized primary care, family medicine consultations, and maintenance check-ups.',
    doctors: [
      {
        id: 'doc-punzalan-1',
        name: 'Dr. Roberto M. Punzalan, MD',
        specialty: 'General & Family Medicine',
        schedule: 'Mon–Sat',
        consultationFee: '₱350',
        available: true,
      },
    ],
  },
];

export const FACILITY_CATEGORIES: FacilityCategory[] = [
  'Hospitals and Infirmaries',
  'Government Health Centers',
  'Private Medical Clinics',
  'Birthing and Maternity Facilities',
  'Diagnostic Laboratories',
];

export const BAYBAY_BARANGAYS = [
  'All Barangays',
  'Brgy. Cogon',
  'Brgy. Poblacion',
  'Brgy. Gaas',
  'Brgy. Galenzoga',
  'Brgy. Guadalupe',
  'Brgy. Pangasugan',
];
