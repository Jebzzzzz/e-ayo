import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STITCH_IMAGES } from '../data/facilitiesData';
import { HOME_FACILITY_CHIPS, HOME_POPULAR_SERVICES } from '../data/servicesData';

export const HomePage: React.FC = () => {
  const {
    facilities,
    setActivePage,
    setDirectoryFilters,
    resetDirectoryFilters,
    viewClinicDetails,
    startBooking,
    setSelectedServiceCategory,
  } = useApp();

  const [activeChip, setActiveChip] = useState<string>('Public Health Centers');

  const featuredFacilities = facilities.filter((f) => f.featured).slice(0, 3);

  const handleChipClick = (chipLabel: string) => {
    setActiveChip(chipLabel);
    resetDirectoryFilters();
    if (chipLabel === 'Public Health Centers') {
      setDirectoryFilters((prev) => ({
        ...prev,
        ownership: 'Public',
        category: 'Public Health Centers',
      }));
    } else if (chipLabel === 'Diagnostic and Dialysis') {
      setDirectoryFilters((prev) => ({
        ...prev,
        category: 'Diagnostic & Dialysis',
      }));
    } else if (chipLabel === 'Pediatric and Maternal') {
      setDirectoryFilters((prev) => ({
        ...prev,
        category: 'Pediatric & Maternal',
      }));
    } else if (chipLabel === 'General Clinics') {
      setDirectoryFilters((prev) => ({
        ...prev,
        category: 'All Categories',
      }));
    }
    setActivePage('find-clinic');
  };

  const handlePopularServiceClick = (categoryTag: string) => {
    setSelectedServiceCategory(categoryTag);
    setActivePage('services');
  };

  return (
    <main className="flex-1 max-w-5xl lg:max-w-7xl w-full mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-7 md:gap-10">
      {/* Welcome Hero & Search (Mobile single column / Desktop 12-column split) */}
      <section className="rounded-xl bg-secondary border border-outline p-5 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
          <span className="hidden lg:inline-flex items-center gap-1.5 self-start px-3.5 py-1 rounded-full bg-surface-container-high border border-outline font-label text-label-sm text-on-surface">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              location_on
            </span>
            <span>Exclusively for Baybay City, Leyte</span>
          </span>

          <div className="flex flex-col gap-1.5">
            <h1 className="lg:hidden font-headline text-headline-md text-on-surface text-balance">
              Maayong adlaw, Baybayanon!
            </h1>
            <h1 className="hidden lg:block font-display text-display-lg text-on-surface text-balance">
              Your Health, Within Your City.
            </h1>
            <p className="font-body text-body-md lg:text-body-lg text-on-surface text-pretty max-w-prose">
              Healthcare made easier for every Baybayanon. Find trusted healthcare providers,
              explore medical services, and book your consultation in Baybay City.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                resetDirectoryFilters();
                setActivePage('find-clinic');
              }}
              className="flex-1 min-h-[48px] w-full rounded-full bg-surface-container-high border border-outline px-4 md:px-5 py-3 flex items-center gap-3 text-on-surface-variant hover:border-on-surface transition-colors duration-state-change text-left cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-[22px] text-on-surface"
                aria-hidden="true"
              >
                search
              </span>
              <span className="font-body text-body-md">
                Search clinic, hospital, doctor, or barangay...
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetDirectoryFilters();
                setActivePage('find-clinic');
              }}
              className="hidden lg:inline-flex min-h-[48px] px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep items-center justify-center shadow-2xs shrink-0 transition-colors duration-state-change cursor-pointer"
            >
              <span>Find a Clinic</span>
            </button>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2.5 lg:gap-3">
            <button
              type="button"
              onClick={() => {
                resetDirectoryFilters();
                setActivePage('find-clinic');
              }}
              className="lg:hidden min-h-[48px] px-4 py-3 rounded-full bg-primary text-on-primary font-label text-label-md inline-flex items-center justify-center gap-2 shadow-2xs hover:bg-primary-deep transition-colors duration-state-change cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                local_hospital
              </span>
              <span>Find a Clinic</span>
            </button>

            <button
              type="button"
              onClick={() => startBooking()}
              className="min-h-[48px] px-4 lg:px-5 py-3 lg:py-2.5 rounded-full bg-surface-container-high border border-outline text-on-surface font-label text-label-md inline-flex items-center justify-center gap-2 hover:bg-primary/30 transition-colors duration-state-change cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                calendar_add_on
              </span>
              <span>Book an Appointment</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePage('services')}
              className="min-h-[48px] px-4 lg:px-5 py-3 lg:py-2.5 rounded-full bg-surface-container-high border border-outline text-on-surface font-label text-label-md inline-flex items-center justify-center gap-2 hover:bg-primary/30 transition-colors duration-state-change cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                medical_services
              </span>
              <span>Explore Services</span>
            </button>
          </div>
        </div>

        {/* Desktop Hero Illustration */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="rounded-xl overflow-hidden bg-surface-container-high border border-outline p-3 shadow-2xs">
            <img
              src={STITCH_IMAGES.heroFamily}
              alt="Friendly Baybay City healthcare worker welcoming a local family"
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Horizontal Scrollable Category Chips */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-title-md lg:text-headline-md text-on-surface">
          Browse by Facility Type
        </h2>
        <div className="flex items-center gap-2.5 lg:gap-3 overflow-x-auto pb-1">
          {HOME_FACILITY_CHIPS.map((chip) => {
            const isSelected = activeChip === chip.label;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleChipClick(chip.label)}
                className={`min-h-[48px] shrink-0 px-4 lg:px-5 py-2.5 rounded-full font-label text-label-md inline-flex items-center gap-2 transition-colors duration-state-change cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high border border-outline text-on-surface hover:bg-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] lg:text-[20px]" aria-hidden="true">
                  {chip.iconName}
                </span>
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Clinics and Hospitals */}
      <section className="flex flex-col gap-3 lg:gap-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-headline text-title-md lg:text-headline-md text-on-surface">
            Featured Clinics &amp; Hospitals
          </h2>
          <button
            type="button"
            onClick={() => {
              resetDirectoryFilters();
              setActivePage('find-clinic');
            }}
            className="font-label text-label-md lg:text-label-lg text-on-surface underline cursor-pointer"
          >
            <span className="lg:hidden">See all</span>
            <span className="hidden lg:inline">View all providers</span>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible items-stretch">
          {featuredFacilities.map((fac) => {
            const isPediatric = fac.id === 'kidzklinika';
            return (
              <button
                key={fac.id}
                type="button"
                onClick={() => viewClinicDetails(fac.id)}
                className="w-72 md:w-auto h-full shrink-0 text-left rounded-lg bg-surface-container-high border border-outline p-3.5 md:p-4 flex flex-col gap-3 hover:bg-secondary/60 transition-colors duration-state-change cursor-pointer"
              >
                <img
                  src={fac.imageUrl}
                  alt={fac.name}
                  className="w-full h-32 md:h-44 object-cover rounded-DEFAULT"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full border border-outline font-label text-label-sm text-on-surface ${
                        isPediatric ? 'bg-tertiary/40' : 'bg-secondary'
                      }`}
                    >
                      {fac.ownershipBadge}
                    </span>
                    <span className="font-label text-label-sm text-on-surface-variant">
                      {fac.id === 'bcich'
                        ? '24 Hours'
                        : fac.id === 'baybay-cho'
                        ? 'Mon–Sat 8AM–5PM'
                        : 'Open Today'}
                    </span>
                  </div>
                  <h3 className="font-headline text-title-md text-on-surface">{fac.shortName}</h3>
                  <p className="font-body text-body-md text-on-surface-variant">{fac.barangay}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Popular Services & How E-Ayo Works */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-7 flex flex-col gap-3 lg:gap-4">
          <h2 className="font-headline text-title-md lg:text-headline-md text-on-surface">
            Popular Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-3.5">
            {HOME_POPULAR_SERVICES.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => handlePopularServiceClick(srv.categoryTag)}
                className="text-left rounded-lg bg-surface-container-high border border-outline p-4 flex flex-col gap-2 hover:bg-secondary transition-colors duration-state-change cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[28px] text-on-surface"
                  aria-hidden="true"
                >
                  {srv.iconName}
                </span>
                <span className="font-headline text-label-lg text-on-surface">{srv.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* How E-Ayo Works */}
        <section className="lg:col-span-5 rounded-xl bg-surface-container-high border border-outline p-5 lg:p-6 flex flex-col gap-4 lg:gap-5">
          <h2 className="font-headline text-title-md lg:text-headline-md text-on-surface">
            How E-Ayo Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  search
                </span>
              </div>
              <div>
                <h3 className="font-headline text-label-lg text-on-surface">
                  1. Find a Provider
                </h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  Search clinics, hospitals, or services near your barangay.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary border border-outline text-on-surface flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  edit_calendar
                </span>
              </div>
              <div>
                <h3 className="font-headline text-label-lg text-on-surface">
                  2. Request a Schedule
                </h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  Pick your service and preferred date and time slot.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  check_circle
                </span>
              </div>
              <div>
                <h3 className="font-headline text-label-lg text-on-surface">3. Get Confirmed</h3>
                <p className="font-body text-body-md text-on-surface-variant">
                  Receive confirmation from the clinic before your visit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
