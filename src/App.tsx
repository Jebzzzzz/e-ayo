import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import {
  InstallBanner,
  TopHeader,
  BottomNavigation,
  StitchFooter,
} from './components/Navbar';
import { SplashOnboardingPage } from './pages/SplashOnboardingPage';
import { LoginRegisterPage } from './pages/LoginRegisterPage';
import { HomePage } from './pages/HomePage';
import { FindClinicPage } from './pages/FindClinicPage';
import { ClinicDetailPage } from './pages/ClinicDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { RequestSubmittedPage } from './pages/RequestSubmittedPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { ProviderPortalPage } from './pages/ProviderPortalPage';
import { AboutPage } from './pages/AboutPage';

const MainContent: React.FC = () => {
  const { activePage, toastMessage } = useApp();

  // Standalone full-bleed task/onboarding screens vs standard shell screens
  const isStandaloneScreen =
    activePage === 'splash' ||
    activePage === 'login-register' ||
    activePage === 'book-appointment' ||
    activePage === 'request-submitted' ||
    activePage === 'provider-portal';

  const showInstallBanner =
    activePage === 'home' ||
    activePage === 'find-clinic' ||
    activePage === 'services' ||
    activePage === 'appointments';

  const showStandardTopHeader = !isStandaloneScreen;
  const showBottomNav =
    activePage === 'home' ||
    activePage === 'find-clinic' ||
    activePage === 'services' ||
    activePage === 'appointments' ||
    activePage === 'about';

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body antialiased">
      {/* Live Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-6 right-4 z-50 max-w-md rounded-lg bg-surface-container-high text-on-surface px-4 py-3.5 shadow-md border-2 border-on-surface flex items-center gap-2.5 font-label text-label-md"
        >
          <span
            className="material-symbols-outlined text-status-confirmed-text text-[22px] material-symbols-filled shrink-0"
            aria-hidden="true"
          >
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {showInstallBanner && <InstallBanner />}
      {showStandardTopHeader && <TopHeader />}

      <div className="flex-1 flex flex-col">
        {activePage === 'splash' && <SplashOnboardingPage />}
        {activePage === 'login-register' && <LoginRegisterPage />}
        {activePage === 'home' && <HomePage />}
        {activePage === 'find-clinic' && <FindClinicPage />}
        {activePage === 'clinic-detail' && <ClinicDetailPage />}
        {activePage === 'services' && <ServicesPage />}
        {activePage === 'book-appointment' && <BookAppointmentPage />}
        {activePage === 'request-submitted' && <RequestSubmittedPage />}
        {activePage === 'appointments' && <AppointmentsPage />}
        {activePage === 'provider-portal' && <ProviderPortalPage />}
        {activePage === 'about' && <AboutPage />}
      </div>

      {!isStandaloneScreen && activePage !== 'clinic-detail' && <StitchFooter />}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
