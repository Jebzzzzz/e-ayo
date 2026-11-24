import React from 'react';
import { useApp, PageView } from '../context/AppContext';

export const InstallBanner: React.FC = () => {
  const { installBannerDismissed, setInstallBannerDismissed, showToast } = useApp();

  if (installBannerDismissed) return null;

  return (
    <div
      id="install-banner"
      className="bg-secondary border-b border-outline px-4 md:px-6 py-2"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="material-symbols-outlined text-on-surface text-[20px] shrink-0"
            aria-hidden="true"
          >
            install_mobile
          </span>
          <span className="font-body text-label-md text-on-surface truncate md:hidden">
            Install E-Ayo on your phone
          </span>
          <span className="font-body text-label-md text-on-surface hidden md:inline">
            Install E-Ayo as a web app for faster, offline-ready access across Baybay City
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setInstallBannerDismissed(true);
              showToast('E-Ayo PWA is ready to be added to your home screen!');
            }}
            className="min-h-[36px] px-3.5 py-1 rounded-full bg-primary text-on-primary font-label text-label-sm hover:bg-primary-deep transition-colors duration-state-change cursor-pointer"
          >
            Install App
          </button>
          <button
            type="button"
            onClick={() => setInstallBannerDismissed(true)}
            aria-label="Dismiss install banner"
            className="min-h-[36px] min-w-[36px] rounded-full inline-flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors duration-state-change cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const TopHeader: React.FC = () => {
  const {
    activePage,
    setActivePage,
    appointments,
    currentUser,
    openAuthPage,
  } = useApp();

  const unreadCount = Math.max(
    appointments.filter((a) => a.status === 'Pending' || a.status === 'Confirmed').length,
    1
  );

  const navItems: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'find-clinic', label: 'Find a Clinic' },
    { id: 'services', label: 'Services' },
    { id: 'appointments', label: 'My Appointments' },
    { id: 'provider-portal', label: 'Provider Portal' },
  ];

  const isNavActive = (id: PageView) => {
    if (id === 'find-clinic' && activePage === 'clinic-detail') return true;
    return activePage === id;
  };

  return (
    <header className="sticky top-0 z-30 bg-surface-container-high border-b border-outline px-4 md:px-6 py-2.5 md:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6">
        {/* Brand Logo & Offline Ready Pill */}
        <div className="flex items-center gap-2.5 md:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-DEFAULT bg-primary flex items-center justify-center border border-outline shadow-2xs">
              <span
                className="material-symbols-outlined text-on-primary text-[22px]"
                aria-hidden="true"
              >
                health_and_safety
              </span>
            </div>
            <span className="font-headline text-title-md md:text-headline-sm text-on-surface">
              E-Ayo
            </span>
          </button>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary border border-outline font-label text-label-sm text-on-surface">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              cloud_done
            </span>
            <span>Offline Ready</span>
          </span>
        </div>

        {/* Desktop Primary Pill Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePage(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`min-h-[48px] px-4 py-2 rounded-full font-label text-label-md inline-flex items-center gap-1.5 transition-colors duration-state-change cursor-pointer ${
                  active
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-secondary'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Notifications Bell + Log In / Profile */}
        <div className="flex items-center gap-2.5 md:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActivePage('splash')}
            className="hidden sm:inline-flex min-h-[48px] px-3.5 py-2 rounded-full bg-surface-container-low border border-outline text-on-surface font-label text-label-sm hover:bg-secondary items-center gap-1.5 transition-colors duration-state-change cursor-pointer"
            title="View Splash / Onboarding Screen"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              waving_hand
            </span>
            <span>Welcome</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePage('appointments')}
            aria-label={`Notifications, ${unreadCount} unread`}
            className="relative min-h-[48px] min-w-[48px] rounded-full bg-surface-container-low border border-outline inline-flex items-center justify-center text-on-surface hover:bg-secondary transition-colors duration-state-change cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              notifications
            </span>
            <span
              data-component-id="badge-numeric"
              aria-hidden="true"
              className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-tertiary text-on-tertiary font-label text-label-sm flex items-center justify-center tabular-nums"
            >
              {unreadCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => openAuthPage('patient')}
            className="hidden md:inline-flex min-h-[48px] px-5 py-2.5 rounded-full bg-surface-container-low border border-outline text-on-surface font-label text-label-md hover:bg-secondary items-center gap-2 transition-colors duration-state-change cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              person
            </span>
            <span>{currentUser.name ? currentUser.name.split(' ')[0] : 'Log In'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export const BottomNavigation: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const bottomTabs: { id: PageView; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'find-clinic', label: 'Find a Clinic', icon: 'local_hospital' },
    { id: 'services', label: 'Services', icon: 'medical_services' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar_month' },
    { id: 'login-register', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="lg:hidden sticky bottom-0 z-30 bg-surface-container-high border-t border-outline px-1 py-2"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-1">
        {bottomTabs.map((tab) => {
          const isActive =
            activePage === tab.id ||
            (tab.id === 'find-clinic' && activePage === 'clinic-detail');
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePage(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-auto min-h-[48px] px-2 py-1.5 rounded-full flex flex-col items-center justify-center gap-0.5 transition-colors duration-state-change cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'material-symbols-filled' : ''
                }`}
                aria-hidden="true"
              >
                {tab.icon}
              </span>
              <span className="font-label text-label-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export const StitchFooter: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-secondary border-t border-outline px-4 md:px-6 py-6 md:py-8 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-headline text-title-md text-on-surface block">
            E-Ayo Baybay City Health Network
          </span>
          <p className="font-body text-body-md text-on-surface">
            Brgy. Poblacion, Baybay City, Leyte 6521 • (053) 563-9120 • support@e-ayo.baybay.ph
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setActivePage('splash')}
            className="font-label text-label-md text-on-surface underline hover:text-on-surface-variant cursor-pointer"
          >
            Welcome
          </button>
          <button
            type="button"
            onClick={() => setActivePage('find-clinic')}
            className="font-label text-label-md text-on-surface underline hover:text-on-surface-variant cursor-pointer"
          >
            Find a Clinic
          </button>
          <button
            type="button"
            onClick={() => setActivePage('services')}
            className="font-label text-label-md text-on-surface underline hover:text-on-surface-variant cursor-pointer"
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => setActivePage('provider-portal')}
            className="font-label text-label-md text-on-surface underline hover:text-on-surface-variant cursor-pointer"
          >
            Provider Portal
          </button>
          <button
            type="button"
            onClick={() => setActivePage('about')}
            className="font-label text-label-md text-on-surface underline hover:text-on-surface-variant cursor-pointer"
          >
            About Us
          </button>
        </div>
      </div>
    </footer>
  );
};
