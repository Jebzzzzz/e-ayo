import React from 'react';
import { useApp } from '../context/AppContext';

export const RequestSubmittedPage: React.FC = () => {
  const { latestSubmittedAppointment, appointments, setActivePage } = useApp();

  const apt = latestSubmittedAppointment || appointments[0];

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-md mx-auto w-full px-gutter-md py-gutter-lg gap-6">
      <main className="flex-1 flex flex-col justify-center gap-5">
        {/* Success Checkmark & Status Badge */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-status-confirmed-bg text-status-confirmed-text flex items-center justify-center border border-outline">
            <span
              className="material-symbols-outlined text-[36px] material-symbols-filled"
              aria-hidden="true"
            >
              check_circle
            </span>
          </div>
          <h1 className="font-headline text-headline-md text-on-surface">Request Submitted</h1>
          <span
            data-component-id="badge-status-pending"
            role="status"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-status-pending-bg text-status-pending-text font-label text-label-md"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              schedule
            </span>
            <span>Pending Confirmation</span>
          </span>
        </div>

        {/* Important Notice */}
        <div className="rounded-lg bg-secondary border border-outline p-4 flex items-start gap-3">
          <span
            className="material-symbols-outlined text-[22px] text-on-surface shrink-0 mt-0.5"
            aria-hidden="true"
          >
            info
          </span>
          <p className="font-body text-body-md text-on-surface text-pretty">
            Please wait for the clinic to confirm your appointment. Your requested schedule is not
            yet guaranteed.
          </p>
        </div>

        {/* Appointment Details Table */}
        <section className="rounded-xl bg-surface-container-high border border-outline overflow-hidden shadow-2xs">
          <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant">
            <h2 className="font-headline text-title-md text-on-surface">Appointment Details</h2>
          </div>
          <dl className="divide-y divide-outline-variant">
            <div className="px-4 py-3 flex items-center justify-between gap-2">
              <dt className="font-body text-body-md text-on-surface-variant">Reference No.</dt>
              <dd className="font-mono text-mono-md text-on-surface tabular-nums">
                {apt.referenceNo}
              </dd>
            </div>
            <div className="px-4 py-3 flex items-start justify-between gap-4">
              <dt className="font-body text-body-md text-on-surface-variant shrink-0">Facility</dt>
              <dd className="font-label text-label-md text-on-surface text-right">
                {apt.facilityName}
              </dd>
            </div>
            <div className="px-4 py-3 flex items-start justify-between gap-4">
              <dt className="font-body text-body-md text-on-surface-variant shrink-0">Service</dt>
              <dd className="font-label text-label-md text-on-surface text-right">{apt.service}</dd>
            </div>
            <div className="px-4 py-3 flex items-center justify-between gap-2">
              <dt className="font-body text-body-md text-on-surface-variant">Date</dt>
              <dd className="font-label text-label-md text-on-surface tabular-nums">{apt.date}</dd>
            </div>
            <div className="px-4 py-3 flex items-center justify-between gap-2">
              <dt className="font-body text-body-md text-on-surface-variant">Time</dt>
              <dd className="font-label text-label-md text-on-surface tabular-nums">{apt.time}</dd>
            </div>
            <div className="px-4 py-3 flex items-center justify-between gap-2">
              <dt className="font-body text-body-md text-on-surface-variant">Status</dt>
              <dd>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-status-pending-bg text-status-pending-text font-label text-label-sm">
                  {apt.status}
                </span>
              </dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setActivePage('appointments')}
          className="min-h-[48px] w-full px-6 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
        >
          <span>Go to My Appointments</span>
        </button>
        <button
          type="button"
          onClick={() => setActivePage('home')}
          className="min-h-[48px] w-full px-6 py-3.5 rounded-full bg-surface-container-high border border-outline text-on-surface font-label text-label-lg hover:bg-secondary transition-colors duration-state-change inline-flex items-center justify-center cursor-pointer"
        >
          <span>Back to Home</span>
        </button>
      </footer>
    </div>
  );
};
