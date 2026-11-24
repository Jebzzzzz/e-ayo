import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BAYBAY_BARANGAYS, STITCH_IMAGES } from '../data/facilitiesData';

export const LoginRegisterPage: React.FC = () => {
  const {
    setActivePage,
    authDefaultTab,
    currentUser,
    setCurrentUser,
    setRoleMode,
    facilities,
    managedFacilityId,
    setManagedFacilityId,
    showToast,
  } = useApp();

  const [role, setRole] = useState<'patient' | 'provider'>(authDefaultTab);
  const [contact, setContact] = useState(currentUser.contact || '0917 458 2219');
  const [barangay, setBarangay] = useState(currentUser.barangay || 'Brgy. Cogon');
  const [password, setPassword] = useState('••••••••');

  const [providerClinicName, setProviderClinicName] = useState(
    'Baybay Family Care and Maternity Clinic'
  );
  const [providerFacilityType, setProviderFacilityType] = useState('Private Clinic');
  const [providerEmail, setProviderEmail] = useState('admin@baybayclinic.ph');

  useEffect(() => {
    setRole(authDefaultTab);
  }, [authDefaultTab]);

  const handlePatientLogin = (isNewAccount = false) => {
    setCurrentUser({
      name: currentUser.name || 'Elena M. Reyes',
      contact: contact.trim() || '0917 458 2219',
      barangay,
      accountType: 'patient',
    });
    setRoleMode('patient');
    showToast(
      isNewAccount
        ? `Patient account created for ${barangay}!`
        : `Welcome back, ${currentUser.name || 'Elena M. Reyes'}!`
    );
    setActivePage('home');
  };

  const handleProviderLogin = (isRegister = false) => {
    const matched = facilities.find(
      (f) =>
        f.name.toLowerCase().includes(providerClinicName.toLowerCase()) ||
        f.shortName.toLowerCase().includes(providerClinicName.toLowerCase())
    );
    if (matched) {
      setManagedFacilityId(matched.id);
    }
    setRoleMode('provider');
    showToast(
      isRegister
        ? `Clinic registration received for ${providerClinicName}. Opening Provider Portal.`
        : 'Signed in to E-Ayo Provider Portal.'
    );
    setActivePage('provider-portal');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header */}
      <header className="hidden lg:block bg-surface-container-high border-b border-outline px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-DEFAULT bg-primary flex items-center justify-center border border-outline">
              <span
                className="material-symbols-outlined text-on-primary text-[22px]"
                aria-hidden="true"
              >
                health_and_safety
              </span>
            </div>
            <span className="font-headline text-headline-sm text-on-surface">E-Ayo</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePage('home')}
            className="font-label text-label-md text-on-surface underline cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between gap-3 max-w-md mx-auto w-full px-gutter-md pt-gutter-lg">
        <button
          type="button"
          onClick={() => setActivePage('splash')}
          aria-label="Back to Welcome"
          className="min-h-[48px] min-w-[48px] rounded-full bg-surface-container-high border border-outline inline-flex items-center justify-center text-on-surface hover:bg-secondary cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            arrow_back
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-DEFAULT bg-primary flex items-center justify-center border border-outline">
            <span
              className="material-symbols-outlined text-on-primary text-[20px]"
              aria-hidden="true"
            >
              health_and_safety
            </span>
          </div>
          <span className="font-headline text-title-md text-on-surface">E-Ayo</span>
        </div>
        <div className="w-12" aria-hidden="true"></div>
      </header>

      <main className="flex-1 max-w-md lg:max-w-5xl w-full mx-auto px-gutter-md lg:px-6 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 6 Cols: Welcome Illustration */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden bg-surface-container-high border border-outline p-3 shadow-2xs">
            <img
              src={STITCH_IMAGES.heroFamily}
              alt="Friendly Baybay City healthcare worker welcoming a local family"
              className="w-full h-60 lg:h-72 object-contain bg-[#FAF2E7] rounded-lg"
            />
          </div>
          <h1 className="font-headline text-headline-md lg:text-headline-lg text-on-surface text-balance">
            Your Health, Within Your City.
          </h1>
          <p className="font-body text-body-md lg:text-body-lg text-on-surface-variant text-pretty">
            Log in as a Baybay City resident to manage appointments, or as a healthcare provider to
            confirm patient schedules.
          </p>
        </div>

        {/* Right 6 Cols (Desktop) / Main Column (Mobile): Role Toggle & Form */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="lg:hidden flex flex-col gap-1.5">
            <h1 className="font-headline text-headline-md text-on-surface">Welcome to E-Ayo</h1>
            <p className="font-body text-body-md text-on-surface-variant text-balance">
              Choose your account type to continue in Baybay City.
            </p>
          </div>

          {/* Account Type Toggle */}
          <div data-component-id="tabs-horizontal">
            <div
              role="tablist"
              aria-label="Account type"
              className="flex p-1 rounded-full bg-surface-container border border-outline gap-1"
            >
              <button
                type="button"
                role="tab"
                id="tab-patient"
                aria-selected={role === 'patient'}
                aria-controls="panel-patient"
                onClick={() => setRole('patient')}
                className={`flex-1 min-h-[48px] px-3 py-2 rounded-full font-label text-label-md transition-colors duration-state-change ease-state-change cursor-pointer ${
                  role === 'patient'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>Patient</span>
              </button>
              <button
                type="button"
                role="tab"
                id="tab-provider"
                aria-selected={role === 'provider'}
                aria-controls="panel-provider"
                onClick={() => setRole('provider')}
                className={`flex-1 min-h-[48px] px-3 py-2 rounded-full font-label text-label-md transition-colors duration-state-change ease-state-change cursor-pointer ${
                  role === 'provider'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>Healthcare Provider</span>
              </button>
            </div>

            {/* Patient Panel */}
            {role === 'patient' && (
              <div
                role="tabpanel"
                id="panel-patient"
                aria-labelledby="tab-patient"
                className="mt-5 rounded-lg lg:rounded-xl bg-surface-container-high border border-outline p-5 lg:p-6 flex flex-col gap-4 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-outline-variant">
                  <div>
                    <h2 className="font-headline text-title-md text-on-surface">Patient Account</h2>
                    <p className="font-body text-body-md text-on-surface-variant">
                      Book visits and track your schedules
                    </p>
                  </div>
                  <span
                    className="material-symbols-outlined text-[28px] text-on-surface"
                    aria-hidden="true"
                  >
                    person
                  </span>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">
                    Mobile Number or Email
                  </span>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="0917 123 4567"
                    className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">
                    Barangay in Baybay City
                  </span>
                  <select
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface focus:border-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  >
                    {BAYBAY_BARANGAYS.filter((b) => b !== 'All Barangays').map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => handlePatientLogin(false)}
                  className="min-h-[48px] w-full px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change ease-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Log In as Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePatientLogin(true)}
                  className="min-h-[48px] w-full px-6 py-3 rounded-full bg-secondary border border-outline text-on-surface font-label text-label-lg hover:bg-primary/40 transition-colors duration-state-change ease-state-change inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Create Patient Account</span>
                </button>
              </div>
            )}

            {/* Healthcare Provider Panel */}
            {role === 'provider' && (
              <div
                role="tabpanel"
                id="panel-provider"
                aria-labelledby="tab-provider"
                className="mt-5 rounded-lg lg:rounded-xl bg-surface-container-high border border-outline p-5 lg:p-6 flex flex-col gap-4 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-outline-variant">
                  <div>
                    <h2 className="font-headline text-title-md text-on-surface">
                      Healthcare Provider
                    </h2>
                    <p className="font-body text-body-md text-on-surface-variant">
                      Register your clinic or manage requests
                    </p>
                  </div>
                  <span
                    className="material-symbols-outlined text-[28px] text-on-surface"
                    aria-hidden="true"
                  >
                    local_hospital
                  </span>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">
                    Facility / Clinic Name
                  </span>
                  <select
                    value={managedFacilityId}
                    onChange={(e) => {
                      setManagedFacilityId(e.target.value);
                      const f = facilities.find((fac) => fac.id === e.target.value);
                      if (f) setProviderClinicName(f.name);
                    }}
                    className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface focus:border-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  >
                    {facilities.map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">Facility Type</span>
                  <select
                    value={providerFacilityType}
                    onChange={(e) => setProviderFacilityType(e.target.value)}
                    className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface focus:border-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  >
                    <option>Private Clinic</option>
                    <option>Public Hospital / Health Center</option>
                    <option>Diagnostic &amp; Dialysis Center</option>
                    <option>Maternity &amp; Lying-In</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">
                    Clinic Contact Email
                  </span>
                  <input
                    type="email"
                    value={providerEmail}
                    onChange={(e) => setProviderEmail(e.target.value)}
                    placeholder="admin@baybayclinic.ph"
                    className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => handleProviderLogin(false)}
                  className="min-h-[48px] w-full px-6 py-3 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change ease-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Open Provider Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProviderLogin(true)}
                  className="min-h-[48px] w-full px-6 py-3 rounded-full bg-secondary border border-outline text-on-surface font-label text-label-lg hover:bg-primary/40 transition-colors duration-state-change ease-state-change inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Register a New Clinic</span>
                </button>
              </div>
            )}
          </div>

          <p className="font-body text-body-md text-on-surface-variant text-center">
            Need help?{' '}
            <button
              type="button"
              onClick={() => setActivePage('about')}
              className="font-label underline text-on-surface cursor-pointer"
            >
              Learn about E-Ayo Baybay City
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};
