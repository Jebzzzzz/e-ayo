import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BAYBAY_BARANGAYS } from '../data/facilitiesData';

export const FindClinicPage: React.FC = () => {
  const {
    facilities,
    directoryFilters,
    setDirectoryFilters,
    resetDirectoryFilters,
    viewClinicDetails,
    startBooking,
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(true);

  const filteredFacilities = facilities.filter((fac) => {
    const query = directoryFilters.searchQuery.trim().toLowerCase();
    if (query) {
      const matchesName = fac.name.toLowerCase().includes(query);
      const matchesShort = fac.shortName.toLowerCase().includes(query);
      const matchesBrgy = fac.barangay.toLowerCase().includes(query);
      const matchesService = fac.servicesSummary.toLowerCase().includes(query);
      const matchesTag = fac.displayTags.some((t) => t.toLowerCase().includes(query));
      const matchesDoc = fac.doctors.some((d) => d.name.toLowerCase().includes(query));
      if (
        !matchesName &&
        !matchesShort &&
        !matchesBrgy &&
        !matchesService &&
        !matchesTag &&
        !matchesDoc
      ) {
        return false;
      }
    }

    if (directoryFilters.ownership !== 'All') {
      if (directoryFilters.ownership === 'Public' && fac.ownership !== 'Public') return false;
      if (directoryFilters.ownership === 'Private' && fac.ownership !== 'Private') return false;
    }

    if (directoryFilters.category !== 'All Categories') {
      if (
        directoryFilters.category === 'Hospitals' &&
        fac.category !== 'Hospitals and Infirmaries'
      ) {
        return false;
      }
      if (
        directoryFilters.category === 'Public Health Centers' &&
        fac.homeCategory !== 'Public Health Centers'
      ) {
        return false;
      }
      if (
        directoryFilters.category === 'Diagnostic & Dialysis' &&
        fac.homeCategory !== 'Diagnostic and Dialysis'
      ) {
        return false;
      }
      if (
        directoryFilters.category === 'Pediatric & Maternal' &&
        fac.homeCategory !== 'Pediatric and Maternal'
      ) {
        return false;
      }
    }

    if (directoryFilters.barangay !== 'All Barangays') {
      if (!fac.barangay.toLowerCase().includes(directoryFilters.barangay.toLowerCase())) {
        return false;
      }
    }

    if (directoryFilters.onlyAvailableAppointments && !fac.acceptsOnlineBooking) {
      return false;
    }

    if (directoryFilters.only24Hours && !fac.is24Hours) {
      return false;
    }

    return true;
  });

  return (
    <main className="flex-1 max-w-5xl lg:max-w-7xl w-full mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline text-headline-md lg:text-headline-lg text-on-surface">
            Find a Clinic in Baybay City
          </h1>
          <p className="font-body text-body-md lg:text-body-lg text-on-surface-variant">
            Browse verified public hospitals, city health centers, diagnostic labs, and private
            clinics.
          </p>
        </div>

        {/* Search & Mobile Filter Button */}
        <div className="flex items-center gap-2 w-full md:w-96">
          <div className="relative flex-1 flex items-center">
            <span
              className="material-symbols-outlined absolute left-4 text-on-surface-variant pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              type="search"
              value={directoryFilters.searchQuery}
              onChange={(e) =>
                setDirectoryFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              placeholder="Search clinic, doctor, or Brgy..."
              className="min-h-[48px] w-full rounded-full bg-surface-container-high border border-outline pl-12 pr-4 py-3 font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="lg:hidden min-h-[48px] px-4 py-2.5 rounded-full bg-secondary border border-outline text-on-surface font-label text-label-md inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              filter_list
            </span>
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Filters Panel */}
      {mobileFilterOpen && (
        <div
          id="filter-drawer"
          className="lg:hidden rounded-lg bg-surface-container-high border border-outline p-4 flex flex-col gap-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-on-surface-variant">
                Facility Type
              </span>
              <select
                value={directoryFilters.ownership}
                onChange={(e) =>
                  setDirectoryFilters((prev) => ({
                    ...prev,
                    ownership: e.target.value as 'All' | 'Public' | 'Private',
                  }))
                }
                className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
              >
                <option value="All">All (Public &amp; Private)</option>
                <option value="Public">Public Facilities</option>
                <option value="Private">Private Clinics</option>
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-on-surface-variant">Category</span>
              <select
                value={directoryFilters.category}
                onChange={(e) =>
                  setDirectoryFilters((prev) => ({ ...prev, category: e.target.value }))
                }
                className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
              >
                <option value="All Categories">All Categories</option>
                <option value="Hospitals">Hospitals</option>
                <option value="Public Health Centers">Public Health Centers</option>
                <option value="Diagnostic & Dialysis">Diagnostic &amp; Dialysis</option>
                <option value="Pediatric & Maternal">Pediatric &amp; Maternal</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setDirectoryFilters((prev) => ({
                  ...prev,
                  onlyAvailableAppointments: !prev.onlyAvailableAppointments,
                }))
              }
              className={`px-3 py-1.5 rounded-full font-label text-label-sm cursor-pointer ${
                directoryFilters.onlyAvailableAppointments
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low border border-outline text-on-surface'
              }`}
            >
              Available Appointments
            </button>
            <button
              type="button"
              onClick={() =>
                setDirectoryFilters((prev) => ({
                  ...prev,
                  onlyOpenNow: !prev.onlyOpenNow,
                }))
              }
              className={`px-3 py-1.5 rounded-full font-label text-label-sm cursor-pointer ${
                directoryFilters.onlyOpenNow
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low border border-outline text-on-surface'
              }`}
            >
              Open Now
            </button>
            <button
              type="button"
              onClick={() =>
                setDirectoryFilters((prev) => ({
                  ...prev,
                  only24Hours: !prev.only24Hours,
                }))
              }
              className={`px-3 py-1.5 rounded-full font-label text-label-sm cursor-pointer ${
                directoryFilters.only24Hours
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low border border-outline text-on-surface'
              }`}
            >
              24 Hours
            </button>
          </div>
        </div>
      )}

      {/* Desktop 2-Column Layout: Filters Sidebar + Provider Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="hidden lg:flex lg:col-span-3 rounded-xl bg-surface-container-high border border-outline p-5 flex-col gap-4 sticky top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-title-md text-on-surface">Filter Providers</h2>
            <button
              type="button"
              onClick={resetDirectoryFilters}
              className="font-label text-label-sm text-on-surface underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-sm text-on-surface-variant">Facility Type</span>
            <select
              value={directoryFilters.ownership}
              onChange={(e) =>
                setDirectoryFilters((prev) => ({
                  ...prev,
                  ownership: e.target.value as 'All' | 'Public' | 'Private',
                }))
              }
              className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
            >
              <option value="All">All (Public &amp; Private)</option>
              <option value="Public">Public Facilities</option>
              <option value="Private">Private Clinics</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-sm text-on-surface-variant">Category</span>
            <select
              value={directoryFilters.category}
              onChange={(e) =>
                setDirectoryFilters((prev) => ({ ...prev, category: e.target.value }))
              }
              className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
            >
              <option value="All Categories">All Categories</option>
              <option value="Hospitals">Hospitals</option>
              <option value="Public Health Centers">Public Health Centers</option>
              <option value="Diagnostic & Dialysis">Diagnostic &amp; Dialysis</option>
              <option value="Pediatric & Maternal">Pediatric &amp; Maternal</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-sm text-on-surface-variant">Barangay</span>
            <select
              value={directoryFilters.barangay}
              onChange={(e) =>
                setDirectoryFilters((prev) => ({ ...prev, barangay: e.target.value }))
              }
              className="min-h-[48px] rounded-DEFAULT bg-surface-container-low border border-outline px-3 py-2 font-body text-body-md text-on-surface"
            >
              {BAYBAY_BARANGAYS.map((brgy) => (
                <option key={brgy} value={brgy}>
                  {brgy}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant">
            <span className="font-label text-label-sm text-on-surface-variant">Availability</span>
            <label className="flex items-center gap-2 font-body text-body-md text-on-surface cursor-pointer">
              <input
                type="checkbox"
                checked={directoryFilters.onlyAvailableAppointments}
                onChange={(e) =>
                  setDirectoryFilters((prev) => ({
                    ...prev,
                    onlyAvailableAppointments: e.target.checked,
                  }))
                }
                className="rounded text-on-surface w-4 h-4"
              />
              <span>Available Appointments</span>
            </label>
            <label className="flex items-center gap-2 font-body text-body-md text-on-surface cursor-pointer">
              <input
                type="checkbox"
                checked={directoryFilters.only24Hours}
                onChange={(e) =>
                  setDirectoryFilters((prev) => ({
                    ...prev,
                    only24Hours: e.target.checked,
                  }))
                }
                className="rounded text-on-surface w-4 h-4"
              />
              <span>Open 24 Hours</span>
            </label>
          </div>
        </aside>

        {/* Provider Cards List */}
        <section className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
          {filteredFacilities.length === 0 ? (
            <div className="md:col-span-2 rounded-xl bg-surface-container-high border border-outline p-8 text-center flex flex-col items-center gap-3">
              <span
                className="material-symbols-outlined text-[36px] text-on-surface-variant"
                aria-hidden="true"
              >
                search_off
              </span>
              <h2 className="font-headline text-title-md text-on-surface">
                No matching facilities found
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Try clearing your filters or searching for another barangay or service in Baybay
                City.
              </p>
              <button
                type="button"
                onClick={resetDirectoryFilters}
                className="min-h-[48px] px-6 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md cursor-pointer"
              >
                Show All Facilities
              </button>
            </div>
          ) : (
            filteredFacilities.map((fac) => {
              const isPrivate = fac.ownership === 'Private';
              return (
                <article
                  key={fac.id}
                  data-component-id="card-action"
                  className="h-full rounded-lg bg-surface-container-high border border-outline p-4 md:p-5 flex flex-col justify-between gap-3.5 md:gap-4 shadow-2xs"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 md:gap-3.5">
                      <img
                        src={fac.imageUrl}
                        alt={fac.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-DEFAULT object-cover shrink-0 border border-outline-variant"
                      />
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full border border-outline font-label text-label-sm text-on-surface ${
                              isPrivate ? 'bg-tertiary/40' : 'bg-secondary'
                            }`}
                          >
                            {fac.ownershipBadge}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full border border-outline font-label text-label-sm text-on-surface ${
                              isPrivate ? 'bg-secondary' : 'bg-tertiary/40'
                            }`}
                          >
                            {fac.statusBadge}
                          </span>
                        </div>
                        <h2 className="font-headline text-title-md text-on-surface">{fac.name}</h2>
                        <p className="font-body text-body-md text-on-surface-variant flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-[18px] shrink-0"
                            aria-hidden="true"
                          >
                            location_on
                          </span>
                          <span className="truncate">{fac.barangay}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {fac.displayTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-sm bg-surface-container-low border border-outline-variant font-label text-label-sm text-on-surface"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-body-md">
                      <span className="inline-flex items-center gap-1.5 font-label text-label-md text-on-surface">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          aria-hidden="true"
                        >
                          schedule
                        </span>
                        <span>{fac.shortHours}</span>
                      </span>
                      <a
                        href={`tel:${fac.contact.replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center gap-1 font-label text-label-md text-on-surface underline tabular-nums"
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          aria-hidden="true"
                        >
                          call
                        </span>
                        <span>{fac.contact}</span>
                      </a>
                    </div>
                  </div>

                  <footer className="flex items-center gap-3 pt-2.5 md:pt-3 border-t border-outline-variant">
                    <button
                      type="button"
                      onClick={() => viewClinicDetails(fac.id)}
                      className="flex-1 min-h-[48px] px-4 py-2.5 rounded-full bg-surface-container border border-outline text-on-surface font-label text-label-md inline-flex items-center justify-center hover:bg-secondary/70 transition-colors duration-state-change cursor-pointer"
                    >
                      <span>View Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => startBooking(fac.id)}
                      className="flex-1 min-h-[48px] px-4 py-2.5 rounded-full bg-primary text-on-primary font-label text-label-md inline-flex items-center justify-center hover:bg-primary-deep transition-colors duration-state-change cursor-pointer"
                    >
                      <span>Book Appointment</span>
                    </button>
                  </footer>
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
};
