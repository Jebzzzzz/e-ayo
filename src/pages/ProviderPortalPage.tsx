import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

type ProviderSection =
  | 'dashboard'
  | 'doctors'
  | 'services'
  | 'hours'
  | 'availability';

export const ProviderPortalPage: React.FC = () => {
  const {
    facilities,
    managedFacilityId,
    setManagedFacilityId,
    appointments,
    acceptAppointment,
    suggestNewSchedule,
    declineAppointment,
    addDoctorToFacility,
    addServiceToFacility,
    updateFacilityProfile,
    viewClinicDetails,
    setActivePage,
    openAuthPage,
  } = useApp();

  const [activeSection, setActiveSection] = useState<ProviderSection>('dashboard');
  const [rescheduleAptId, setRescheduleAptId] = useState<string | null>(null);
  const [suggestedDate, setSuggestedDate] = useState<string>('November 26, 2026');
  const [suggestedTime, setSuggestedTime] = useState<string>('10:30 AM');

  // Forms for Doctors / Services / Hours
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpec, setNewDocSpec] = useState('General Medicine');
  const [newDocSched, setNewDocSched] = useState('Mon–Fri');

  const [newSrvName, setNewSrvName] = useState('');
  const [newSrvFee, setNewSrvFee] = useState('₱250');
  const [newSrvDesc, setNewSrvDesc] = useState('Outpatient evaluation');

  const managedFacility =
    facilities.find((f) => f.id === managedFacilityId) || facilities[0];

  const [hoursInput, setHoursInput] = useState(managedFacility.operatingHours);
  const [contactInput, setContactInput] = useState(managedFacility.contact);

  const pendingRequests = appointments.filter((a) => a.status === 'Pending');
  const confirmedCount = Math.max(
    appointments.filter((a) => a.status === 'Confirmed').length + 11,
    12
  );
  const pendingDisplayCount = Math.max(pendingRequests.length, 4);

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    addDoctorToFacility(managedFacility.id, {
      name: newDocName.trim(),
      specialty: newDocSpec,
      schedule: newDocSched,
      consultationFee: '₱300',
      available: true,
    });
    setNewDocName('');
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvName.trim()) return;
    addServiceToFacility(managedFacility.id, {
      name: newSrvName.trim(),
      category: 'General Consultation',
      fee: newSrvFee || '₱250',
      duration: '30 mins',
      description: newSrvDesc || 'Clinical consultation',
    });
    setNewSrvName('');
  };

  const menuItems: {
    id: ProviderSection | 'clinic-profile';
    label: string;
    icon: string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'clinic-profile', label: 'Clinic Profile', icon: 'storefront' },
    { id: 'doctors', label: 'Doctors and Staff', icon: 'groups' },
    { id: 'services', label: 'Services and Fees', icon: 'payments' },
    { id: 'hours', label: 'Operating Hours', icon: 'schedule' },
    { id: 'availability', label: 'Availability', icon: 'event_available' },
  ];

  const handleMenuClick = (id: ProviderSection | 'clinic-profile') => {
    if (id === 'clinic-profile') {
      viewClinicDetails(managedFacility.id);
    } else {
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Provider Top Header */}
      <header className="sticky top-0 z-30 bg-surface-container-high border-b border-outline px-4 md:px-6 py-2.5 md:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className="w-10 h-10 rounded-DEFAULT bg-primary flex items-center justify-center border border-outline shrink-0 cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-on-primary text-[22px]"
                aria-hidden="true"
              >
                local_hospital
              </span>
            </button>
            <div className="min-w-0">
              <span className="font-headline text-title-md text-on-surface block leading-tight">
                E-Ayo Provider Portal
              </span>
              <select
                aria-label="Select managed clinic"
                value={managedFacility.id}
                onChange={(e) => {
                  setManagedFacilityId(e.target.value);
                  const f = facilities.find((fac) => fac.id === e.target.value);
                  if (f) {
                    setHoursInput(f.operatingHours);
                    setContactInput(f.contact);
                  }
                }}
                className="font-label text-label-sm text-on-surface-variant bg-transparent border-0 p-0 pr-4 focus:outline-none truncate max-w-[210px] sm:max-w-none cursor-pointer"
              >
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className="hidden sm:inline-flex min-h-[48px] px-4 py-2 rounded-full bg-surface-container-low border border-outline text-on-surface font-label text-label-md items-center gap-1.5 hover:bg-secondary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                public
              </span>
              <span>Patient Site</span>
            </button>
            <button
              type="button"
              onClick={() => openAuthPage('provider')}
              className="min-h-[48px] px-3.5 md:px-4 py-2 rounded-full bg-secondary border border-outline font-label text-label-sm md:text-label-md text-on-surface inline-flex items-center gap-1.5 hover:bg-primary/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                swap_horiz
              </span>
              <span className="sm:hidden">Switch</span>
              <span className="hidden sm:inline">Switch Account</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl lg:max-w-7xl w-full mx-auto px-4 md:px-6 py-5 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Desktop Left Sidebar Menu */}
        <aside className="hidden lg:block lg:col-span-3 rounded-xl bg-surface-container-high border border-outline overflow-hidden divide-y divide-outline-variant">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMenuClick(item.id)}
                className={`w-full min-h-[48px] px-4 py-3.5 flex items-center gap-3 font-headline text-label-lg text-left transition-colors duration-state-change cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-secondary/60'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right 9 Cols: Metrics + Requests + Facility Management */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Summary Counts */}
          <section className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="rounded-lg bg-status-pending-bg border border-outline p-3.5 md:p-5 text-center lg:text-left flex flex-col gap-1">
              <span className="font-headline text-headline-md lg:text-headline-lg text-status-pending-text tabular-nums">
                {pendingDisplayCount}
              </span>
              <span className="font-label text-label-sm lg:text-label-md text-status-pending-text">
                <span className="lg:hidden">Pending</span>
                <span className="hidden lg:inline">Pending Requests</span>
              </span>
            </div>

            <div className="rounded-lg bg-status-confirmed-bg border border-outline p-3.5 md:p-5 text-center lg:text-left flex flex-col gap-1">
              <span className="font-headline text-headline-md lg:text-headline-lg text-status-confirmed-text tabular-nums">
                {confirmedCount}
              </span>
              <span className="font-label text-label-sm lg:text-label-md text-status-confirmed-text">
                <span className="lg:hidden">Confirmed</span>
                <span className="hidden lg:inline">Confirmed Today</span>
              </span>
            </div>

            <div className="rounded-lg bg-surface-container-high border border-outline p-3.5 md:p-5 text-center lg:text-left flex flex-col gap-1">
              <span className="font-headline text-headline-md lg:text-headline-lg text-on-surface tabular-nums">
                28
              </span>
              <span className="font-label text-label-sm lg:text-label-md text-on-surface-variant">
                <span className="lg:hidden">This Week</span>
                <span className="hidden lg:inline">Total This Week</span>
              </span>
            </div>
          </section>

          {/* Active Management Sub-Sections */}
          {activeSection === 'doctors' && (
            <section className="rounded-xl bg-surface-container-high border border-outline p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-headline-md text-on-surface">
                  Doctors and Staff — {managedFacility.shortName}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveSection('dashboard')}
                  className="font-label text-label-md text-on-surface underline cursor-pointer"
                >
                  Back to Requests
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {managedFacility.doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-lg bg-surface-container-low border border-outline p-4 flex items-center gap-3"
                  >
                    <div className="w-11 h-11 rounded-full bg-secondary border border-outline flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-[22px] text-on-surface"
                        aria-hidden="true"
                      >
                        person
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline text-label-lg text-on-surface">{doc.name}</h3>
                      <p className="font-body text-body-md text-on-surface-variant">
                        {doc.specialty} • {doc.schedule}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleAddDoctor}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-outline-variant"
              >
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Dr. Full Name"
                  className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
                />
                <input
                  type="text"
                  value={newDocSpec}
                  onChange={(e) => setNewDocSpec(e.target.value)}
                  placeholder="Specialty"
                  className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
                />
                <button
                  type="submit"
                  className="min-h-[48px] px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md cursor-pointer"
                >
                  Add Doctor
                </button>
              </form>
            </section>
          )}

          {activeSection === 'services' && (
            <section className="rounded-xl bg-surface-container-high border border-outline p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-headline-md text-on-surface">
                  Services and Fees — {managedFacility.shortName}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveSection('dashboard')}
                  className="font-label text-label-md text-on-surface underline cursor-pointer"
                >
                  Back to Requests
                </button>
              </div>
              <div className="rounded-lg bg-surface-container-low border border-outline divide-y divide-outline-variant">
                {managedFacility.detailedServices.map((srv) => (
                  <div
                    key={srv.name}
                    className="p-3.5 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-headline text-label-lg text-on-surface">{srv.name}</h3>
                      <p className="font-body text-body-md text-on-surface-variant">
                        {srv.description}
                      </p>
                    </div>
                    <span className="font-headline text-title-md text-on-surface tabular-nums">
                      {srv.fee}
                    </span>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleAddService}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-outline-variant"
              >
                <input
                  type="text"
                  value={newSrvName}
                  onChange={(e) => setNewSrvName(e.target.value)}
                  placeholder="Service name"
                  className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
                />
                <input
                  type="text"
                  value={newSrvFee}
                  onChange={(e) => setNewSrvFee(e.target.value)}
                  placeholder="Fee (e.g. ₱250)"
                  className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
                />
                <button
                  type="submit"
                  className="min-h-[48px] px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md cursor-pointer"
                >
                  Add Service
                </button>
              </form>
            </section>
          )}

          {(activeSection === 'hours' || activeSection === 'availability') && (
            <section className="rounded-xl bg-surface-container-high border border-outline p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-headline-md text-on-surface">
                  Operating Hours &amp; Availability
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveSection('dashboard')}
                  className="font-label text-label-md text-on-surface underline cursor-pointer"
                >
                  Back to Requests
                </button>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-md text-on-surface">Operating Hours</span>
                <input
                  type="text"
                  value={hoursInput}
                  onChange={(e) => setHoursInput(e.target.value)}
                  className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-md text-on-surface">Contact Number</span>
                <input
                  type="text"
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface tabular-nums"
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  updateFacilityProfile(managedFacility.id, {
                    operatingHours: hoursInput,
                    contact: contactInput,
                  })
                }
                className="min-h-[48px] px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-md self-start cursor-pointer"
              >
                Save Clinic Schedule
              </button>
            </section>
          )}

          {/* New Appointment Request Cards */}
          <section className="flex flex-col gap-3">
            <h1 className="font-headline text-headline-md text-on-surface">
              New Appointment Request
            </h1>

            {pendingRequests.length === 0 ? (
              <div className="rounded-xl bg-surface-container-high border border-outline p-6 text-center flex flex-col items-center gap-2">
                <span
                  className="material-symbols-outlined text-[32px] text-status-confirmed-text"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <h2 className="font-headline text-title-md text-on-surface">
                  All appointment requests have been reviewed!
                </h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  New patient booking requests will appear here immediately.
                </p>
              </div>
            ) : (
              pendingRequests.map((req) => (
                <article
                  key={req.id}
                  className="rounded-xl bg-surface-container-high border border-outline p-5 md:p-6 flex flex-col gap-4 md:gap-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-outline-variant">
                    <div>
                      <span className="font-mono text-mono-md text-on-surface-variant tabular-nums">
                        {req.referenceNo}
                      </span>
                      <h2 className="font-headline text-title-md text-on-surface">
                        {req.patientName}
                      </h2>
                    </div>
                    <span className="px-3 md:px-3.5 py-1 rounded-full bg-status-pending-bg text-status-pending-text font-label text-label-sm">
                      Pending
                    </span>
                  </div>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div>
                      <dt className="font-label text-label-sm text-on-surface-variant">Service</dt>
                      <dd className="font-body text-body-md text-on-surface">{req.service}</dd>
                    </div>
                    <div>
                      <dt className="font-label text-label-sm text-on-surface-variant">
                        Requested Doctor
                      </dt>
                      <dd className="font-body text-body-md text-on-surface">
                        {req.requestedDoctor}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-label text-label-sm text-on-surface-variant">
                        Date &amp; Time
                      </dt>
                      <dd className="font-body text-body-md text-on-surface tabular-nums">
                        {req.date} • {req.time}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-label text-label-sm text-on-surface-variant">Reason</dt>
                      <dd className="font-body text-body-md text-on-surface">{req.reason}</dd>
                    </div>
                  </dl>

                  {rescheduleAptId === req.id && (
                    <div className="rounded-lg bg-secondary border border-outline p-4 flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                      <label className="flex-1 flex flex-col gap-1">
                        <span className="font-label text-label-sm text-on-surface">
                          New Date
                        </span>
                        <select
                          value={suggestedDate}
                          onChange={(e) => setSuggestedDate(e.target.value)}
                          className="min-h-[44px] rounded-DEFAULT bg-surface-container-high border border-outline px-3 py-2 font-body text-body-md text-on-surface"
                        >
                          <option>November 25, 2026</option>
                          <option>November 26, 2026</option>
                          <option>November 27, 2026</option>
                        </select>
                      </label>
                      <label className="flex-1 flex flex-col gap-1">
                        <span className="font-label text-label-sm text-on-surface">
                          New Time
                        </span>
                        <select
                          value={suggestedTime}
                          onChange={(e) => setSuggestedTime(e.target.value)}
                          className="min-h-[44px] rounded-DEFAULT bg-surface-container-high border border-outline px-3 py-2 font-body text-body-md text-on-surface"
                        >
                          <option>9:00 AM</option>
                          <option>10:30 AM</option>
                          <option>2:30 PM</option>
                          <option>4:00 PM</option>
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          suggestNewSchedule(
                            req.id,
                            suggestedDate,
                            suggestedTime,
                            'Confirmed with updated clinic time slot.'
                          );
                          setRescheduleAptId(null);
                        }}
                        className="min-h-[44px] px-5 py-2 rounded-full bg-primary text-on-primary font-label text-label-md cursor-pointer"
                      >
                        Send Schedule
                      </button>
                    </div>
                  )}

                  <footer className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 md:gap-3 pt-2 border-t border-outline-variant">
                    <button
                      type="button"
                      onClick={() => acceptAppointment(req.id)}
                      className="flex-1 lg:flex-initial min-h-[48px] px-4 lg:px-6 py-3 rounded-full bg-status-confirmed-bg border border-status-confirmed-text text-status-confirmed-text font-label text-label-md inline-flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        check_circle
                      </span>
                      <span>Accept Appointment</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setRescheduleAptId((prev) => (prev === req.id ? null : req.id))
                      }
                      className="flex-1 lg:flex-initial min-h-[48px] px-4 lg:px-6 py-3 rounded-full bg-surface-container-low border border-outline text-on-surface font-label text-label-md inline-flex items-center justify-center gap-1.5 hover:bg-secondary transition-colors duration-state-change cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        schedule
                      </span>
                      <span>Suggest Another Schedule</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => declineAppointment(req.id)}
                      className="flex-1 lg:flex-initial min-h-[48px] px-4 lg:px-6 py-3 rounded-full bg-surface-container-low border border-status-cancelled-text text-status-cancelled-text font-label text-label-md inline-flex items-center justify-center gap-1.5 hover:bg-status-cancelled-bg transition-colors duration-state-change cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        cancel
                      </span>
                      <span>Decline Request</span>
                    </button>
                  </footer>
                </article>
              ))
            )}
          </section>

          {/* Mobile Clinic Management Menu */}
          <section className="lg:hidden flex flex-col gap-3">
            <h2 className="font-headline text-title-md text-on-surface">Manage Your Facility</h2>
            <div className="rounded-xl bg-surface-container-high border border-outline divide-y divide-outline-variant overflow-hidden">
              {menuItems
                .filter((m) => m.id !== 'dashboard')
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMenuClick(item.id)}
                    className="w-full min-h-[48px] px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-secondary/60 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-[22px] text-on-surface"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="font-headline text-label-lg text-on-surface">
                        {item.label}
                      </span>
                    </div>
                    <span
                      className="material-symbols-outlined text-on-surface-variant"
                      aria-hidden="true"
                    >
                      chevron_right
                    </span>
                  </button>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
