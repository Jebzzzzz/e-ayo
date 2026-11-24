import React from 'react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <main className="flex-1 px-4 py-6 flex flex-col gap-5 max-w-2xl mx-auto w-full">
      <section className="rounded-xl bg-secondary border border-outline p-6 flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-surface-container-high border border-outline font-label text-label-sm text-on-surface">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            favorite
          </span>
          <span>About E-Ayo</span>
        </span>
        <h1 className="font-headline text-headline-md text-on-surface text-balance">
          Healthcare Made Easier for Every Baybayanon
        </h1>
        <p className="font-body text-body-lg text-on-surface text-pretty">
          E-Ayo is Baybay City’s centralized digital healthcare platform—built exclusively for
          residents across all barangays of Baybay City, Leyte.
        </p>
      </section>

      <section className="rounded-xl bg-surface-container-high border border-outline p-5 flex flex-col gap-3">
        <h2 className="font-headline text-title-md text-on-surface">Our Mission</h2>
        <p className="font-body text-body-md text-on-surface-variant text-pretty">
          Finding the right clinic, checking operating hours, and waiting in long lines should never
          stand in the way of your family’s health. E-Ayo connects Baybayanons directly with local
          public hospitals, city health centers, diagnostic laboratories, and private clinics in one
          simple app.
        </p>
      </section>

      <section className="rounded-xl bg-surface-container-high border border-outline p-5 flex flex-col gap-3">
        <h2 className="font-headline text-title-md text-on-surface">Contact &amp; Support</h2>
        <p className="font-body text-body-md text-on-surface-variant">
          Baybay City Health Network Desk
          <br />
          Brgy. Poblacion, Baybay City, Leyte 6521
          <br />
          Phone: (053) 563-9120 • Email: support@e-ayo.baybay.ph
        </p>
      </section>

      <button
        type="button"
        onClick={() => setActivePage('find-clinic')}
        className="min-h-[48px] w-full px-6 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
      >
        <span>Find a Clinic Near You</span>
      </button>
    </main>
  );
};
