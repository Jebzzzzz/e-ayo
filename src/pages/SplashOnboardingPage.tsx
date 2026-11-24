import React from 'react';
import { useApp } from '../context/AppContext';
import { STITCH_IMAGES } from '../data/facilitiesData';

export const SplashOnboardingPage: React.FC = () => {
  const { setActivePage, openAuthPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-md mx-auto w-full px-gutter-md py-gutter-lg">
      {/* Top Brand & Offline Indicator */}
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-md bg-primary flex items-center justify-center border border-outline shadow-2xs">
            <span
              className="material-symbols-outlined text-on-primary text-[26px]"
              aria-hidden="true"
            >
              health_and_safety
            </span>
          </div>
          <div>
            <span className="font-headline text-headline-sm text-on-surface block leading-none">
              E-Ayo
            </span>
            <span className="font-body text-label-sm text-on-surface-variant">
              Baybay City, Leyte
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-outline font-label text-label-sm text-on-surface">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            cloud_done
          </span>
          <span>Offline Ready</span>
        </span>
      </header>

      {/* Onboarding Hero */}
      <main className="flex-1 flex flex-col justify-center gap-6 py-gutter-lg">
        <div className="rounded-xl overflow-hidden bg-surface-container-high border border-outline p-3 shadow-2xs">
          <img
            src={STITCH_IMAGES.heroFamily}
            alt="Friendly Baybay City healthcare worker welcoming a local family"
            className="w-full h-56 object-contain bg-[#FAF2E7] rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-3 text-center">
          <span className="inline-flex items-center justify-center gap-1.5 self-center px-3 py-1 rounded-full bg-secondary border border-outline font-label text-label-sm text-on-surface">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              location_on
            </span>
            <span>Exclusively for Baybayanons</span>
          </span>
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface text-balance">
            Your Health, Within Your City.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant text-pretty max-w-prose mx-auto">
            Healthcare made easier for every Baybayanon. Find trusted local clinics, hospitals, and
            health centers in Baybay City and request appointments in minutes.
          </p>
        </div>

        {/* 3 Quick Value Highlights */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="rounded-DEFAULT bg-surface-container-high border border-outline p-3 flex flex-col items-center gap-1.5">
            <span
              className="material-symbols-outlined text-on-surface text-[24px]"
              aria-hidden="true"
            >
              local_hospital
            </span>
            <span className="font-label text-label-sm text-on-surface">Local Clinics</span>
          </div>
          <div className="rounded-DEFAULT bg-surface-container-high border border-outline p-3 flex flex-col items-center gap-1.5">
            <span
              className="material-symbols-outlined text-on-surface text-[24px]"
              aria-hidden="true"
            >
              calendar_month
            </span>
            <span className="font-label text-label-sm text-on-surface">Easy Requests</span>
          </div>
          <div className="rounded-DEFAULT bg-surface-container-high border border-outline p-3 flex flex-col items-center gap-1.5">
            <span
              className="material-symbols-outlined text-on-surface text-[24px]"
              aria-hidden="true"
            >
              verified_user
            </span>
            <span className="font-label text-label-sm text-on-surface">Verified Care</span>
          </div>
        </div>
      </main>

      {/* Primary & Secondary Actions */}
      <footer className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setActivePage('home')}
          data-component-id="button-primary"
          className="min-h-[48px] w-full px-6 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change ease-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
        >
          <span>Get Started</span>
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            arrow_forward
          </span>
        </button>

        <button
          type="button"
          onClick={() => openAuthPage('patient')}
          data-component-id="button-secondary"
          className="min-h-[48px] w-full px-6 py-3.5 rounded-full bg-surface-container-high border border-outline text-on-surface font-label text-label-lg hover:bg-secondary transition-colors duration-state-change ease-state-change inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Log In or Register</span>
        </button>
      </footer>
    </div>
  );
};
