export interface ServiceCategoryItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  providersSummary: string;
  matchingTag: string;
}

export interface PopularHomeService {
  id: string;
  name: string;
  iconName: string;
  categoryTag: string;
}

export const SERVICE_CATEGORIES: ServiceCategoryItem[] = [
  {
    id: 'general-consultation',
    title: 'General Consultation',
    shortDesc: 'Everyday check-ups, fever, blood pressure, and medical certificates.',
    iconName: 'stethoscope',
    providersSummary: 'Baybay City Health Office, Immaculate Conception Hospital, Punzalan Family Medical Clinic',
    matchingTag: 'General Consultation',
  },
  {
    id: 'maternal-child-care',
    title: 'Maternal and Child Care',
    shortDesc: 'Prenatal check-ups, 24/7 safe delivery, and pediatric wellness.',
    iconName: 'pregnant_woman',
    providersSummary: 'Baybay Family Care and Maternity Clinic, Kidzklinika, Immaculate Conception Hospital',
    matchingTag: 'Maternal and Child Care',
  },
  {
    id: 'laboratory-services',
    title: 'Laboratory Services',
    shortDesc: 'CBC, urinalysis, blood sugar, lipid profile, and drug testing.',
    iconName: 'science',
    providersSummary: 'Immaculate Conception Hospital, Baybay City Medical Diagnostic & Dialysis Center',
    matchingTag: 'Laboratory Services',
  },
  {
    id: 'diagnostic-services',
    title: 'Diagnostic Services',
    shortDesc: 'Digital X-ray, abdominal & OB ultrasound, and 12-lead ECG.',
    iconName: 'radiology',
    providersSummary: 'Baybay City Medical Diagnostic & Dialysis Center, Immaculate Conception Hospital',
    matchingTag: 'Diagnostic Services',
  },
  {
    id: 'dental-services',
    title: 'Dental Services',
    shortDesc: 'Tooth extraction, oral prophylaxis, and routine dental check-ups.',
    iconName: 'dentistry',
    providersSummary: 'Baybay City Health Office',
    matchingTag: 'Dental Services',
  },
  {
    id: 'immunization',
    title: 'Immunization',
    shortDesc: 'Childhood vaccines, flu shots, and anti-rabies vaccination.',
    iconName: 'vaccines',
    providersSummary: 'Baybay City Health Office, Kidzklinika',
    matchingTag: 'Immunization',
  },
  {
    id: 'chronic-disease-care',
    title: 'Chronic Disease Care',
    shortDesc: 'Diabetes, hypertension management, and scheduled hemodialysis.',
    iconName: 'monitor_heart',
    providersSummary: 'Baybay City Medical Diagnostic & Dialysis Center, Immaculate Conception Hospital',
    matchingTag: 'Chronic Disease Care',
  },
  {
    id: 'mental-health',
    title: 'Mental Health',
    shortDesc: 'Confidential counseling, stress support, and psychiatric referrals.',
    iconName: 'psychology',
    providersSummary: 'Baybay City Health Office Wellness Unit',
    matchingTag: 'Mental Health',
  },
];

export const HOME_POPULAR_SERVICES: PopularHomeService[] = [
  {
    id: 'pop-dialysis',
    name: 'Kidney Dialysis',
    iconName: 'water_drop',
    categoryTag: 'Chronic Disease Care',
  },
  {
    id: 'pop-diagnostics',
    name: 'Diagnostics',
    iconName: 'radiology',
    categoryTag: 'Diagnostic Services',
  },
  {
    id: 'pop-primary',
    name: 'Primary Care',
    iconName: 'stethoscope',
    categoryTag: 'General Consultation',
  },
  {
    id: 'pop-pt',
    name: 'Physical Therapy',
    iconName: 'accessibility_new',
    categoryTag: 'General Consultation',
  },
  {
    id: 'pop-maternity',
    name: 'Maternity Care',
    iconName: 'pregnant_woman',
    categoryTag: 'Maternal and Child Care',
  },
  {
    id: 'pop-aesthetic',
    name: 'Aesthetic Treatments',
    iconName: 'spa',
    categoryTag: 'Dental Services',
  },
];

export const HOME_FACILITY_CHIPS = [
  {
    id: 'chip-public',
    label: 'Public Health Centers',
    iconName: 'account_balance',
    homeCategory: 'Public Health Centers',
  },
  {
    id: 'chip-diagnostic',
    label: 'Diagnostic and Dialysis',
    iconName: 'biotech',
    homeCategory: 'Diagnostic and Dialysis',
  },
  {
    id: 'chip-pediatric',
    label: 'Pediatric and Maternal',
    iconName: 'child_care',
    homeCategory: 'Pediatric and Maternal',
  },
  {
    id: 'chip-general',
    label: 'General Clinics',
    iconName: 'stethoscope',
    homeCategory: 'General Clinics',
  },
];
