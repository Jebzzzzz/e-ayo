import React from 'react';
import { useApp } from '../context/AppContext';

export const ClinicDetailPage: React.FC = () => {
  const { facilities, selectedFacilityId, setActivePage, startBooking } = useApp();

  const facility =
    facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  return (
    <div className="flex-1 flex flex-col">
      {/* Mobile Contextual Top Header */}
      <header className="lg:hidden sticky top-0 z-30 bg-surface-container-high border-b border-outline px-4 py-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setActivePage('find-clinic')}
          aria-label="Back to Find a Clinic"
          className="min-h-[48px] min-w-[48px] rounded-full bg-surface-container-low border border-outline inline-flex items-center justify-center text-on-surface hover:bg-secondary cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            arrow_back
          </span>
        </button>
        <span className="font-headline text-title-md text-on-surface">Clinic Profile</span>
        <a
          href={`tel:${facility.contact.replace(/[^0-9]/g, '')}`}
          aria-label="Call clinic"
          className="min-h-[48px] min-w-[48px] rounded-full bg-surface-container-low border border-outline inline-flex items-center justify-center text-on-surface hover:bg-secondary"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            call
          </span>
        </a>
      </header>

      <main className="flex-1 max-w-5xl lg:max-w-7xl w-full mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col gap-5 md:gap-6 pb-8">
        {/* Desktop Back Link */}
        <button
          type="button"
          onClick={() => setActivePage('find-clinic')}
          className="hidden lg:inline-flex self-start items-center gap-2 font-label text-label-md text-on-surface hover:underline cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            arrow_back
          </span>
          <span>Back to Find a Clinic</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left 8 Cols: Cover, Mobile Hours/Map, Services, Doctors */}
          <div className="lg:col-span-8 flex flex-col gap-5 md:gap-6">
            {/* Cover Image & Clinic Header */}
            <div className="rounded-xl overflow-hidden border border-outline bg-surface-container-high shadow-2xs">
              <img
                src={facility.imageUrl}
                alt={`${facility.name} exterior`}
                className="w-full h-48 sm:h-64 lg:h-72 object-cover"
              />
              <div className="p-4 md:p-6 flex flex-col gap-2.5 md:gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-secondary border border-outline font-label text-label-sm text-on-surface">
                    {facility.ownership} • {facility.facilityType}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-tertiary/40 border border-outline font-label text-label-sm text-on-surface">
                    {facility.shortHours}
                  </span>
                </div>
                <h1 className="font-headline text-headline-md lg:text-headline-lg text-on-surface">
                  {facility.name}
                </h1>
                <p className="font-body text-body-md lg:text-body-lg text-on-surface-variant">
                  {facility.location}
                </p>
              </div>
            </div>

            {/* Mobile Hours, Contact & Map Preview */}
            <section className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-surface-container-high border border-outline p-4 flex flex-col gap-3">
                <h2 className="font-headline text-title-md text-on-surface">Hours &amp; Contact</h2>
                <div className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-[22px] text-on-surface mt-0.5"
                    aria-hidden="true"
                  >
                    schedule
                  </span>
                  <div>
                    <p className="font-label text-label-md text-on-surface">
                      {facility.is24Hours
                        ? 'Emergency & Admissions: Open 24/7'
                        : facility.shortHours}
                    </p>
                    <p className="font-body text-body-md text-on-surface-variant">
                      {facility.operatingHours}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-[22px] text-on-surface"
                    aria-hidden="true"
                  >
                    call
                  </span>
                  <a
                    href={`tel:${facility.contact.replace(/[^0-9]/g, '')}`}
                    className="font-label text-label-lg text-on-surface underline tabular-nums"
                  >
                    {facility.contact}
                  </a>
                </div>
              </div>

              <div className="rounded-lg bg-surface-container-high border border-outline p-3 flex flex-col gap-2">
                <img
                  src={facility.mapImageUrl}
                  alt={`Map location of ${facility.barangay}`}
                  className="w-full h-32 object-cover rounded-DEFAULT border border-outline-variant"
                />
                <div className="flex items-center justify-between px-1">
                  <span className="font-body text-body-md text-on-surface-variant">
                    {facility.distanceNote || facility.barangay}
                  </span>
                  <span className="font-label text-label-md text-on-surface underline">
                    Directions
                  </span>
                </div>
              </div>
            </section>

            {/* Services & Consultation Fees */}
            <section className="flex flex-col gap-3">
              <h2 className="font-headline text-title-md lg:text-headline-md text-on-surface">
                Services &amp; Consultation Fees
              </h2>
              <div className="rounded-lg lg:rounded-xl bg-surface-container-high border border-outline divide-y divide-outline-variant">
                {facility.detailedServices.map((srv) => (
                  <div
                    key={srv.name}
                    className="p-4 flex items-center justify-between gap-3 md:gap-4 hover:bg-surface-container-low transition-colors duration-state-change"
                  >
                    <div>
                      <h3 className="font-headline text-label-lg lg:text-title-md text-on-surface">
                        {srv.name}
                      </h3>
                      <p className="font-body text-body-md text-on-surface-variant">
                        {srv.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-headline text-title-md text-on-surface tabular-nums">
                        {srv.fee}
                      </span>
                      <button
                        type="button"
                        onClick={() => startBooking(facility.id, srv.name)}
                        className="hidden sm:inline-flex min-h-[40px] px-3.5 py-1.5 rounded-full bg-secondary border border-outline font-label text-label-sm text-on-surface hover:bg-primary transition-colors duration-state-change cursor-pointer"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Available Doctors List */}
            <section className="flex flex-col gap-3">
              <h2 className="font-headline text-title-md lg:text-headline-md text-on-surface">
                Available Doctors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {facility.doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-lg bg-surface-container-high border border-outline p-4 flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary border border-outline flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-[24px] text-on-surface"
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
            </section>
          </div>

          {/* Right 4 Cols (Desktop Sticky Booking Card & Map) */}
          <aside className="hidden lg:flex lg:col-span-4 flex-col gap-5 sticky top-24">
            <div className="rounded-xl bg-surface-container-high border border-outline p-6 flex flex-col gap-4 shadow-2xs">
              <h2 className="font-headline text-title-md text-on-surface">
                Request an Appointment
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Select a service and preferred time slot. The clinic will confirm your schedule.
              </p>
              <button
                type="button"
                onClick={() => startBooking(facility.id)}
                className="min-h-[48px] w-full px-6 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep inline-flex items-center justify-center gap-2 shadow-2xs transition-colors duration-state-change cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  calendar_add_on
                </span>
                <span>Book Appointment</span>
              </button>
              <a
                href={`tel:${facility.contact.replace(/[^0-9]/g, '')}`}
                className="min-h-[48px] w-full px-6 py-3 rounded-full bg-secondary border border-outline text-on-surface font-label text-label-md inline-flex items-center justify-center gap-2 tabular-nums hover:bg-primary/40 transition-colors duration-state-change"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  call
                </span>
                <span>Call {facility.contact}</span>
              </a>
            </div>

            <div className="rounded-xl bg-surface-container-high border border-outline p-4 flex flex-col gap-3">
              <h3 className="font-headline text-title-md text-on-surface">Hours &amp; Location</h3>
              <p className="font-body text-body-md text-on-surface">{facility.operatingHours}</p>
              <img
                src={facility.mapImageUrl}
                alt={`Map location of ${facility.barangay}`}
                className="w-full h-40 object-cover rounded-DEFAULT border border-outline-variant"
              />
              <span className="font-body text-body-md text-on-surface-variant">
                {facility.distanceNote || facility.barangay}
              </span>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Sticky Bottom Book Appointment CTA */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-surface-container-high border-t border-outline px-4 py-3">
        <button
          type="button"
          onClick={() => startBooking(facility.id)}
          className="min-h-[48px] w-full px-6 py-3.5 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            calendar_add_on
          </span>
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
};
