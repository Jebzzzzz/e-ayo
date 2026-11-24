import React, { useState } from 'react';
import { useApp, AppointmentRecord } from '../context/AppContext';

type StatusTab = 'Upcoming' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'History';

export const AppointmentsPage: React.FC = () => {
  const {
    appointments,
    startBooking,
    cancelPatientAppointment,
  } = useApp();

  const [activeTab, setActiveTab] = useState<StatusTab>('Upcoming');

  const upcomingCount = appointments.filter(
    (a) => a.status === 'Pending' || a.status === 'Confirmed'
  ).length;

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === 'Upcoming') {
      return apt.status === 'Pending' || apt.status === 'Confirmed';
    }
    if (activeTab === 'Pending') return apt.status === 'Pending';
    if (activeTab === 'Confirmed') return apt.status === 'Confirmed';
    if (activeTab === 'Completed') return apt.status === 'Completed';
    if (activeTab === 'Cancelled') return apt.status === 'Cancelled';
    return true; // History shows all
  });

  const renderStatusBadge = (status: AppointmentRecord['status']) => {
    if (status === 'Pending') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-status-pending-bg text-status-pending-text font-label text-label-sm">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            schedule
          </span>
          <span>Pending Confirmation</span>
        </span>
      );
    }
    if (status === 'Confirmed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-status-confirmed-bg text-status-confirmed-text font-label text-label-sm">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            check_circle
          </span>
          <span>Confirmed</span>
        </span>
      );
    }
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-status-completed-bg text-status-completed-text font-label text-label-sm">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            task_alt
          </span>
          <span>Completed</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-status-cancelled-bg text-status-cancelled-text font-label text-label-sm">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          cancel
        </span>
        <span>Cancelled</span>
      </span>
    );
  };

  const tabs: StatusTab[] = [
    'Upcoming',
    'Pending',
    'Confirmed',
    'Completed',
    'Cancelled',
    'History',
  ];

  return (
    <main className="flex-1 max-w-5xl lg:max-w-7xl w-full mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <h1 className="font-headline text-headline-md lg:text-headline-lg text-on-surface">
          My Appointments
        </h1>
        <button
          type="button"
          onClick={() => startBooking()}
          className="min-h-[48px] px-4 md:px-6 py-2 md:py-3 rounded-full bg-primary text-on-primary font-label text-label-md hover:bg-primary-deep inline-flex items-center gap-1.5 md:gap-2 shrink-0 shadow-2xs transition-colors duration-state-change cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] md:text-[20px]" aria-hidden="true">
            add
          </span>
          <span className="lg:hidden">New Request</span>
          <span className="hidden lg:inline">Book New Appointment</span>
        </button>
      </div>

      {/* Mobile Notifications Panel */}
      <section
        id="notifications-panel"
        className="lg:hidden rounded-lg bg-secondary border border-outline p-4 flex flex-col gap-2.5"
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-headline text-label-lg text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              notifications_active
            </span>
            <span>Notifications</span>
          </h2>
          <span className="font-label text-label-sm text-on-surface">2 updates</span>
        </div>
        <div className="rounded-DEFAULT bg-surface-container-high border border-outline-variant p-3 flex items-start gap-2.5">
          <span
            className="material-symbols-outlined text-[20px] text-status-confirmed-text shrink-0 mt-0.5"
            aria-hidden="true"
          >
            check_circle
          </span>
          <p className="font-body text-body-md text-on-surface">
            <strong>Your appointment was confirmed</strong> — Kidzklinika approved your visit for
            Nov 26, 2026 at 10:00 AM.
          </p>
        </div>
      </section>

      {/* Scrollable Status Tabs */}
      <div
        role="tablist"
        aria-label="Appointment status filters"
        className="flex items-center gap-2 overflow-x-auto pb-1"
      >
        {tabs.map((tab) => {
          const isSelected = activeTab === tab;
          const label = tab === 'Upcoming' ? `Upcoming (${upcomingCount})` : tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveTab(tab)}
              className={`min-h-[48px] shrink-0 px-4 md:px-5 py-2 rounded-full font-label text-label-md transition-colors duration-state-change cursor-pointer ${
                isSelected
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high border border-outline text-on-surface hover:bg-secondary'
              }`}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Appointment Cards */}
        <section className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
          {filteredAppointments.length === 0 ? (
            <div className="md:col-span-2 rounded-xl bg-surface-container-high border border-outline p-8 text-center flex flex-col items-center gap-3">
              <span
                className="material-symbols-outlined text-[36px] text-on-surface-variant"
                aria-hidden="true"
              >
                event_busy
              </span>
              <h2 className="font-headline text-title-md text-on-surface">
                No {activeTab.toLowerCase()} appointments
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Need to see a doctor in Baybay City? Request a schedule in just a few taps.
              </p>
              <button
                type="button"
                onClick={() => startBooking()}
                className="min-h-[48px] px-6 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md cursor-pointer"
              >
                Book an Appointment
              </button>
            </div>
          ) : (
            filteredAppointments.map((apt) => (
              <article
                key={apt.id}
                data-component-id="card-action"
                className="h-full rounded-lg bg-surface-container-high border border-outline p-4 md:p-5 flex flex-col justify-between gap-3 md:gap-4 shadow-2xs"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-mono-md text-on-surface-variant tabular-nums">
                      {apt.referenceNo}
                    </span>
                    {renderStatusBadge(apt.status)}
                  </div>

                  <div>
                    <h2 className="font-headline text-title-md text-on-surface">
                      {apt.facilityName}
                    </h2>
                    <p className="font-body text-body-md text-on-surface-variant">
                      {apt.service}
                      {apt.requestedDoctor && apt.requestedDoctor !== 'Any available doctor'
                        ? ` • ${apt.requestedDoctor}`
                        : ''}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-body-md text-on-surface">
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        calendar_today
                      </span>
                      <span>{apt.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        schedule
                      </span>
                      <span>{apt.time}</span>
                    </span>
                  </div>
                </div>

                {apt.status !== 'Cancelled' && apt.status !== 'Completed' ? (
                  <footer className="flex items-center gap-3 pt-2.5 md:pt-3 border-t border-outline-variant">
                    <button
                      type="button"
                      onClick={() =>
                        startBooking(apt.facilityId, apt.service, apt.requestedDoctor)
                      }
                      className="flex-1 min-h-[48px] px-4 py-2.5 rounded-full bg-surface-container border border-outline text-on-surface font-label text-label-md inline-flex items-center justify-center gap-1.5 hover:bg-secondary/70 transition-colors duration-state-change cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        event_repeat
                      </span>
                      <span>Reschedule</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => cancelPatientAppointment(apt.id)}
                      className="flex-1 min-h-[48px] px-4 py-2.5 rounded-full bg-surface-container-low border border-status-cancelled-text text-status-cancelled-text font-label text-label-md inline-flex items-center justify-center gap-1.5 hover:bg-status-cancelled-bg transition-colors duration-state-change cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        cancel
                      </span>
                      <span>Cancel</span>
                    </button>
                  </footer>
                ) : (
                  <footer className="flex items-center pt-2.5 md:pt-3 border-t border-outline-variant">
                    <button
                      type="button"
                      onClick={() =>
                        startBooking(apt.facilityId, apt.service, apt.requestedDoctor)
                      }
                      className="w-full min-h-[48px] px-4 py-2.5 rounded-full bg-surface-container border border-outline text-on-surface font-label text-label-md inline-flex items-center justify-center gap-1.5 hover:bg-secondary/70 transition-colors duration-state-change cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        event_repeat
                      </span>
                      <span>Book Again</span>
                    </button>
                  </footer>
                )}
              </article>
            ))
          )}
        </section>

        {/* Right 4 Cols (Desktop Notifications Panel) */}
        <aside className="hidden lg:flex lg:col-span-4 rounded-xl bg-secondary border border-outline p-5 flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-headline text-title-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                notifications_active
              </span>
              <span>Notifications</span>
            </h2>
            <span className="font-label text-label-sm text-on-surface">2 updates</span>
          </div>

          <div className="rounded-DEFAULT bg-surface-container-high border border-outline-variant p-3.5 flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-[20px] text-status-confirmed-text shrink-0 mt-0.5"
              aria-hidden="true"
            >
              check_circle
            </span>
            <p className="font-body text-body-md text-on-surface">
              <strong>Your appointment was confirmed</strong> — Kidzklinika approved your visit for
              Nov 26, 2026 at 10:00 AM.
            </p>
          </div>

          <div className="rounded-DEFAULT bg-surface-container-high border border-outline-variant p-3.5 flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-[20px] text-status-pending-text shrink-0 mt-0.5"
              aria-hidden="true"
            >
              schedule
            </span>
            <p className="font-body text-body-md text-on-surface">
              <strong>Request received</strong> — EAYO-2026-0001 is waiting for hospital
              confirmation.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};
