import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICE_CATEGORIES } from '../data/servicesData';

export const ServicesPage: React.FC = () => {
  const {
    facilities,
    selectedServiceCategory,
    setSelectedServiceCategory,
    setActivePage,
    viewClinicDetails,
    startBooking,
  } = useApp();

  const matchingDrawerRef = useRef<HTMLElement | null>(null);

  const activeCategory =
    SERVICE_CATEGORIES.find((c) => c.title === selectedServiceCategory) ||
    SERVICE_CATEGORIES[0];

  const matchingFacilities = facilities.filter((f) =>
    f.serviceTags.includes(activeCategory.matchingTag)
  );

  const handleSelectService = (title: string) => {
    setSelectedServiceCategory(title);
    if (matchingDrawerRef.current) {
      matchingDrawerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <main className="flex-1 max-w-5xl lg:max-w-7xl w-full mx-auto px-4 md:px-6 py-5 md:py-8 flex flex-col gap-5 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-headline text-headline-md lg:text-headline-lg text-on-surface">
          Medical Services in Baybay City
        </h1>
        <p className="font-body text-body-md lg:text-body-lg text-on-surface-variant">
          Select any service category to view local clinics and hospitals that offer it.
        </p>
      </div>

      {/* Services Category Grid (Mobile row list / Desktop 4-col grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4 items-stretch">
        {SERVICE_CATEGORIES.map((srv) => {
          const isSelected = activeCategory.id === srv.id;
          return (
            <button
              key={srv.id}
              type="button"
              onClick={() => handleSelectService(srv.title)}
              className={`h-full min-h-[48px] text-left rounded-lg border border-outline p-4 lg:p-5 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3 transition-colors duration-state-change cursor-pointer ${
                isSelected
                  ? 'bg-secondary hover:bg-primary/40'
                  : 'bg-surface-container-high hover:bg-secondary'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-DEFAULT flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-secondary border border-outline text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                  {srv.iconName}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <h2 className="font-headline text-title-md text-on-surface">{srv.title}</h2>
                <p
                  className={`font-body text-body-md ${
                    isSelected ? 'text-on-surface' : 'text-on-surface-variant'
                  }`}
                >
                  {srv.shortDesc}
                </p>
              </div>

              <span
                className={`lg:hidden material-symbols-outlined ${
                  isSelected ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
                aria-hidden="true"
              >
                chevron_right
              </span>
            </button>
          );
        })}
      </div>

      {/* Matching Providers Drawer (Shown for Selected Category) */}
      <section
        ref={matchingDrawerRef}
        id="matching-providers"
        className="rounded-xl bg-surface-container-high border border-outline p-4 md:p-6 flex flex-col gap-4 shadow-2xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <h2
                id="selected-service-title"
                className="font-headline text-title-md text-on-surface"
              >
                Providers for {activeCategory.title}
              </h2>
              <button
                type="button"
                onClick={() => setActivePage('find-clinic')}
                className="font-label text-label-md text-on-surface underline cursor-pointer"
              >
                View all
              </button>
            </div>
            <p
              id="selected-service-list"
              className="font-body text-body-md text-on-surface"
            >
              {activeCategory.providersSummary}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              startBooking(
                matchingFacilities[0]?.id || 'bcich',
                matchingFacilities[0]?.detailedServices.find(
                  (s) => s.category === activeCategory.matchingTag
                )?.name || activeCategory.title
              )
            }
            className="min-h-[48px] px-5 md:px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-md hover:bg-primary-deep inline-flex items-center justify-center gap-2 self-start sm:self-center shrink-0 transition-colors duration-state-change cursor-pointer"
          >
            <span>Book This Service</span>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Clickable Matching Facility Chips */}
        {matchingFacilities.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant">
            {matchingFacilities.map((fac) => (
              <button
                key={fac.id}
                type="button"
                onClick={() => viewClinicDetails(fac.id)}
                className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-surface-container-low border border-outline font-label text-label-sm text-on-surface hover:bg-secondary inline-flex items-center gap-1.5 transition-colors duration-state-change cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  local_hospital
                </span>
                <span>{fac.name}</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
