import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  HealthcareFacility,
  INITIAL_FACILITIES,
  Doctor,
  FacilityServiceItem,
} from '../data/facilitiesData';

export type PageView =
  | 'splash'
  | 'login-register'
  | 'home'
  | 'find-clinic'
  | 'clinic-detail'
  | 'services'
  | 'book-appointment'
  | 'request-submitted'
  | 'appointments'
  | 'provider-portal'
  | 'about';

export type RoleMode = 'patient' | 'provider';

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface AppointmentRecord {
  id: string;
  referenceNo: string;
  facilityId: string;
  facilityName: string;
  service: string;
  fee?: string;
  requestedDoctor: string;
  date: string;
  time: string;
  patientName: string;
  contactNumber: string;
  barangay: string;
  reason: string;
  paymentMethod: 'Cash at Clinic' | 'Online Payment';
  status: AppointmentStatus;
  createdAt: string;
  providerNote?: string;
  suggestedSchedule?: {
    date: string;
    time: string;
    note: string;
  };
}

export interface DirectoryFilters {
  searchQuery: string;
  ownership: 'All' | 'Public' | 'Private';
  category: string;
  barangay: string;
  onlyAvailableAppointments: boolean;
  onlyOpenNow: boolean;
  only24Hours: boolean;
}

export interface BookingDraft {
  facilityId: string;
  service: string;
  requestedDoctor: string;
  date: string;
  time: string;
}

interface AppContextType {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  roleMode: RoleMode;
  setRoleMode: (role: RoleMode) => void;
  facilities: HealthcareFacility[];
  selectedFacilityId: string;
  setSelectedFacilityId: (id: string) => void;
  managedFacilityId: string;
  setManagedFacilityId: (id: string) => void;
  appointments: AppointmentRecord[];
  directoryFilters: DirectoryFilters;
  setDirectoryFilters: React.Dispatch<React.SetStateAction<DirectoryFilters>>;
  resetDirectoryFilters: () => void;
  selectedServiceCategory: string;
  setSelectedServiceCategory: (title: string) => void;
  bookingDraft: BookingDraft;
  setBookingDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  startBooking: (facilityId?: string, service?: string, doctor?: string) => void;
  latestSubmittedAppointment: AppointmentRecord | null;
  setLatestSubmittedAppointment: (apt: AppointmentRecord | null) => void;
  authDefaultTab: 'patient' | 'provider';
  openAuthPage: (tab?: 'patient' | 'provider') => void;
  installBannerDismissed: boolean;
  setInstallBannerDismissed: (dismissed: boolean) => void;
  currentUser: {
    name: string;
    contact: string;
    barangay: string;
    accountType: 'patient' | 'provider';
  };
  setCurrentUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      contact: string;
      barangay: string;
      accountType: 'patient' | 'provider';
    }>
  >;
  createAppointment: (input: {
    facilityId: string;
    service: string;
    fee?: string;
    requestedDoctor: string;
    date: string;
    time: string;
    patientName: string;
    contactNumber: string;
    barangay: string;
    reason: string;
    paymentMethod: 'Cash at Clinic' | 'Online Payment';
  }) => AppointmentRecord;
  acceptAppointment: (id: string, note?: string) => void;
  suggestNewSchedule: (id: string, newDate: string, newTime: string, note: string) => void;
  declineAppointment: (id: string, reason?: string) => void;
  cancelPatientAppointment: (id: string) => void;
  markAppointmentCompleted: (id: string) => void;
  updateFacilityProfile: (
    facilityId: string,
    updates: Partial<
      Pick<
        HealthcareFacility,
        'operatingHours' | 'shortHours' | 'contact' | 'acceptsOnlineBooking' | 'appointmentPolicy'
      >
    >
  ) => void;
  addDoctorToFacility: (facilityId: string, doctor: Omit<Doctor, 'id'>) => void;
  addServiceToFacility: (facilityId: string, serviceItem: FacilityServiceItem) => void;
  viewClinicDetails: (facilityId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_FILTERS: DirectoryFilters = {
  searchQuery: '',
  ownership: 'All',
  category: 'All Categories',
  barangay: 'All Barangays',
  onlyAvailableAppointments: false,
  onlyOpenNow: false,
  only24Hours: false,
};

const INITIAL_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'apt-stitch-1',
    referenceNo: 'EAYO-2026-0001',
    facilityId: 'bcich',
    facilityName: 'Baybay City Immaculate Conception Hospital',
    service: 'General Outpatient Consultation',
    fee: '₱150',
    requestedDoctor: 'Any available doctor',
    date: 'November 25, 2026',
    time: '9:00 AM',
    patientName: 'Elena M. Reyes',
    contactNumber: '0917 458 2219',
    barangay: 'Brgy. Cogon',
    reason: 'Recurring headache and blood pressure check-up',
    paymentMethod: 'Cash at Clinic',
    status: 'Pending',
    createdAt: '2026-11-24T08:30:00',
  },
  {
    id: 'apt-stitch-2',
    referenceNo: 'EAYO-2026-0002',
    facilityId: 'kidzklinika',
    facilityName: 'Kidzklinika',
    service: 'Pediatric Check-up',
    fee: '₱350',
    requestedDoctor: 'Dr. Liza Tan',
    date: 'November 26, 2026',
    time: '10:00 AM',
    patientName: 'Elena M. Reyes',
    contactNumber: '0917 458 2219',
    barangay: 'Brgy. Poblacion',
    reason: 'Childhood wellness check-up and immunization update',
    paymentMethod: 'Cash at Clinic',
    status: 'Confirmed',
    createdAt: '2026-11-23T14:15:00',
    providerNote: 'Your appointment was confirmed — Kidzklinika approved your visit for Nov 26, 2026 at 10:00 AM.',
  },
  {
    id: 'apt-stitch-3',
    referenceNo: 'EAYO-2026-0003',
    facilityId: 'baybay-family-care',
    facilityName: 'Baybay Family Care and Maternity Clinic',
    service: 'Prenatal & Postnatal Check-up',
    fee: '₱350',
    requestedDoctor: 'Any available doctor',
    date: 'November 27, 2026',
    time: '10:30 AM',
    patientName: 'Elena M. Reyes',
    contactNumber: '0917 458 2219',
    barangay: 'Brgy. Galenzoga',
    reason: 'Second trimester prenatal monitoring and ultrasound check',
    paymentMethod: 'Cash at Clinic',
    status: 'Pending',
    createdAt: '2026-11-24T09:10:00',
  },
  {
    id: 'apt-stitch-4',
    referenceNo: 'EAYO-2026-0004',
    facilityId: 'baybay-cho',
    facilityName: 'Baybay City Health Office',
    service: 'General Outpatient Consultation',
    fee: 'Free',
    requestedDoctor: 'Dr. Nelson G. Cariño, MD, MPH',
    date: 'November 18, 2026',
    time: '2:30 PM',
    patientName: 'Elena M. Reyes',
    contactNumber: '0917 458 2219',
    barangay: 'Brgy. Cogon',
    reason: 'Blood pressure maintenance check-up and medical certificate',
    paymentMethod: 'Cash at Clinic',
    status: 'Completed',
    createdAt: '2026-11-16T11:00:00',
    providerNote: 'Consultation completed at Baybay CHO.',
  },
  {
    id: 'apt-stitch-5',
    referenceNo: 'EAYO-2026-0005',
    facilityId: 'bcmddc',
    facilityName: 'Baybay City Medical Diagnostic & Dialysis Center',
    service: 'Digital X-Ray & Abdominal Ultrasound',
    fee: '₱350',
    requestedDoctor: 'Dr. Hannah Grace S. Alkuino, MD',
    date: 'November 20, 2026',
    time: '4:00 PM',
    patientName: 'Elena M. Reyes',
    contactNumber: '0917 458 2219',
    barangay: 'Brgy. Cogon',
    reason: 'Diagnostic ultrasound check',
    paymentMethod: 'Online Payment',
    status: 'Cancelled',
    createdAt: '2026-11-19T10:00:00',
    providerNote: 'Rescheduled per patient request.',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_APTS = 'eayo_stitch_appointments_v2';
const STORAGE_KEY_FACILITIES = 'eayo_stitch_facilities_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<PageView>('home');
  const [roleMode, setRoleMode] = useState<RoleMode>('patient');
  const [installBannerDismissed, setInstallBannerDismissed] = useState<boolean>(false);

  const [facilities, setFacilities] = useState<HealthcareFacility[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FACILITIES);
      return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
    } catch {
      return INITIAL_FACILITIES;
    }
  });

  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('bcich');
  const [managedFacilityId, setManagedFacilityId] = useState<string>('bcich');
  const [directoryFilters, setDirectoryFilters] = useState<DirectoryFilters>(DEFAULT_FILTERS);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('General Consultation');

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    facilityId: 'bcich',
    service: 'General Outpatient Consultation',
    requestedDoctor: 'Any available doctor',
    date: 'November 25, 2026',
    time: '9:00 AM',
  });

  const [latestSubmittedAppointment, setLatestSubmittedAppointment] = useState<AppointmentRecord | null>(
    INITIAL_APPOINTMENTS[0]
  );

  const [authDefaultTab, setAuthDefaultTab] = useState<'patient' | 'provider'>('patient');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    contact: string;
    barangay: string;
    accountType: 'patient' | 'provider';
  }>({
    name: 'Elena M. Reyes',
    contact: '0917 458 2219',
    barangay: 'Brgy. Cogon',
    accountType: 'patient',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APTS, JSON.stringify(appointments));
    } catch {
      // ignore storage errors
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FACILITIES, JSON.stringify(facilities));
    } catch {
      // ignore storage errors
    }
  }, [facilities]);

  const setActivePage = (page: PageView) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4200);
  };

  const resetDirectoryFilters = () => {
    setDirectoryFilters(DEFAULT_FILTERS);
  };

  const startBooking = (facilityId?: string, service?: string, doctor?: string) => {
    const targetFacId = facilityId || selectedFacilityId || 'bcich';
    const fac = facilities.find((f) => f.id === targetFacId) || facilities[0];
    const defaultService =
      service || fac.detailedServices[0]?.name || 'General Outpatient Consultation';

    setSelectedFacilityId(fac.id);
    setBookingDraft({
      facilityId: fac.id,
      service: defaultService,
      requestedDoctor: doctor || 'Any available doctor',
      date: 'November 25, 2026',
      time: '9:00 AM',
    });
    setActivePage('book-appointment');
  };

  const openAuthPage = (tab: 'patient' | 'provider' = 'patient') => {
    setAuthDefaultTab(tab);
    setActivePage('login-register');
  };

  const viewClinicDetails = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
    setActivePage('clinic-detail');
  };

  const createAppointment = (input: {
    facilityId: string;
    service: string;
    fee?: string;
    requestedDoctor: string;
    date: string;
    time: string;
    patientName: string;
    contactNumber: string;
    barangay: string;
    reason: string;
    paymentMethod: 'Cash at Clinic' | 'Online Payment';
  }): AppointmentRecord => {
    const facility = facilities.find((f) => f.id === input.facilityId) || facilities[0];
    const nextNumber = appointments.length + 1;
    const referenceNo = `EAYO-2026-${String(nextNumber).padStart(4, '0')}`;

    const newRecord: AppointmentRecord = {
      id: `apt-${Date.now()}`,
      referenceNo,
      facilityId: facility.id,
      facilityName: facility.name,
      service: input.service,
      fee: input.fee || '₱150',
      requestedDoctor: input.requestedDoctor || 'Any available doctor',
      date: input.date,
      time: input.time,
      patientName: input.patientName,
      contactNumber: input.contactNumber,
      barangay: input.barangay,
      reason: input.reason || 'General check-up',
      paymentMethod: input.paymentMethod,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newRecord, ...prev]);
    setManagedFacilityId(facility.id);
    setLatestSubmittedAppointment(newRecord);
    showToast(`Request ${referenceNo} submitted! Pending confirmation from ${facility.shortName}.`);
    return newRecord;
  };

  const acceptAppointment = (id: string, note?: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: 'Confirmed',
              providerNote:
                note ||
                `Your appointment was confirmed — ${apt.facilityName} approved your visit for ${apt.date} at ${apt.time}.`,
            }
          : apt
      )
    );
    showToast('Appointment accepted and confirmed!');
  };

  const suggestNewSchedule = (id: string, newDate: string, newTime: string, note: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              date: newDate,
              time: newTime,
              status: 'Confirmed',
              suggestedSchedule: {
                date: newDate,
                time: newTime,
                note,
              },
              providerNote: `Suggested schedule by clinic: ${newDate} at ${newTime}. ${note}`,
            }
          : apt
      )
    );
    showToast(`Suggested new schedule (${newDate} • ${newTime}) sent to patient.`);
  };

  const declineAppointment = (id: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: 'Cancelled',
              providerNote:
                reason || 'Declined by clinic due to schedule conflict. Please choose another date.',
            }
          : apt
      )
    );
    showToast('Appointment request declined.');
  };

  const cancelPatientAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: 'Cancelled',
              providerNote: 'Cancelled by patient.',
            }
          : apt
      )
    );
    showToast('Appointment cancelled.');
  };

  const markAppointmentCompleted = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: 'Completed',
              providerNote: 'Consultation completed.',
            }
          : apt
      )
    );
    showToast('Appointment marked as Completed.');
  };

  const updateFacilityProfile = (
    facilityId: string,
    updates: Partial<
      Pick<
        HealthcareFacility,
        'operatingHours' | 'shortHours' | 'contact' | 'acceptsOnlineBooking' | 'appointmentPolicy'
      >
    >
  ) => {
    setFacilities((prev) => prev.map((f) => (f.id === facilityId ? { ...f, ...updates } : f)));
    showToast('Clinic profile updated.');
  };

  const addDoctorToFacility = (facilityId: string, doctor: Omit<Doctor, 'id'>) => {
    const newDoc: Doctor = {
      ...doctor,
      id: `doc-${Date.now()}`,
    };
    setFacilities((prev) =>
      prev.map((f) => (f.id === facilityId ? { ...f, doctors: [...f.doctors, newDoc] } : f))
    );
    showToast(`Added ${doctor.name} to clinic doctors.`);
  };

  const addServiceToFacility = (facilityId: string, serviceItem: FacilityServiceItem) => {
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === facilityId
          ? {
              ...f,
              detailedServices: [...f.detailedServices, serviceItem],
              serviceTags: f.serviceTags.includes(serviceItem.category)
                ? f.serviceTags
                : [...f.serviceTags, serviceItem.category],
            }
          : f
      )
    );
    showToast(`Added "${serviceItem.name}" to clinic services.`);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        roleMode,
        setRoleMode,
        facilities,
        selectedFacilityId,
        setSelectedFacilityId,
        managedFacilityId,
        setManagedFacilityId,
        appointments,
        directoryFilters,
        setDirectoryFilters,
        resetDirectoryFilters,
        selectedServiceCategory,
        setSelectedServiceCategory,
        bookingDraft,
        setBookingDraft,
        startBooking,
        latestSubmittedAppointment,
        setLatestSubmittedAppointment,
        authDefaultTab,
        openAuthPage,
        installBannerDismissed,
        setInstallBannerDismissed,
        currentUser,
        setCurrentUser,
        createAppointment,
        acceptAppointment,
        suggestNewSchedule,
        declineAppointment,
        cancelPatientAppointment,
        markAppointmentCompleted,
        updateFacilityProfile,
        addDoctorToFacility,
        addServiceToFacility,
        viewClinicDetails,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
