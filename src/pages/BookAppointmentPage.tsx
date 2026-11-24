import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const NOVEMBER_DAYS = [
  { dayLabel: 'Mon', dayNum: '23', fullDate: 'November 23, 2026', disabled: true },
  { dayLabel: 'Tue', dayNum: '24', fullDate: 'November 24, 2026', disabled: false },
  { dayLabel: 'Wed', dayNum: '25', fullDate: 'November 25, 2026', disabled: false },
  { dayLabel: 'Thu', dayNum: '26', fullDate: 'November 26, 2026', disabled: false },
  { dayLabel: 'Fri', dayNum: '27', fullDate: 'November 27, 2026', disabled: false },
];

const TIME_SLOTS = [
  { label: '8:00 AM (Full)', value: '8:00 AM', disabled: true },
  { label: '9:00 AM', value: '9:00 AM', disabled: false },
  { label: '10:30 AM', value: '10:30 AM', disabled: false },
  { label: '1:00 PM (Full)', value: '1:00 PM', disabled: true },
  { label: '2:30 PM', value: '2:30 PM', disabled: false },
  { label: '4:00 PM', value: '4:00 PM', disabled: false },
];

export const BookAppointmentPage: React.FC = () => {
  const {
    facilities,
    bookingDraft,
    setBookingDraft,
    currentUser,
    createAppointment,
    setActivePage,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const selectedFacility =
    facilities.find((f) => f.id === bookingDraft.facilityId) || facilities[0];

  const [selectedService, setSelectedService] = useState<string>(
    bookingDraft.service ||
      selectedFacility.detailedServices[0]?.name ||
      'General Outpatient Consultation'
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    bookingDraft.date || 'November 25, 2026'
  );
  const [selectedTime, setSelectedTime] = useState<string>(bookingDraft.time || '9:00 AM');
  const [patientName, setPatientName] = useState<string>(
    currentUser.name || 'Elena M. Reyes'
  );
  const [contactNumber, setContactNumber] = useState<string>(
    currentUser.contact || '0917 458 2219'
  );
  const [reason, setReason] = useState<string>(
    'Recurring headache and blood pressure check-up'
  );
  const [requestedDoctor, setRequestedDoctor] = useState<string>(
    bookingDraft.requestedDoctor || 'Any available doctor'
  );
  const [paymentMethod, setPaymentMethod] = useState<'Cash at Clinic' | 'Online Payment'>(
    'Cash at Clinic'
  );

  const currentServiceObj =
    selectedFacility.detailedServices.find((s) => s.name === selectedService) ||
    selectedFacility.detailedServices[0];

  const currentFee = currentServiceObj?.fee || '₱150';

  const goToStep = (nextStep: 1 | 2 | 3) => {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) {
      goToStep((step - 1) as 1 | 2 | 3);
    } else {
      setActivePage('clinic-detail');
    }
  };

  const handleFacilityChange = (newFacId: string) => {
    const fac = facilities.find((f) => f.id === newFacId) || facilities[0];
    const firstSrv = fac.detailedServices[0]?.name || 'General Outpatient Consultation';
    setBookingDraft((prev) => ({
      ...prev,
      facilityId: fac.id,
      service: firstSrv,
    }));
    setSelectedService(firstSrv);
    setRequestedDoctor('Any available doctor');
  };

  const handleSubmit = () => {
    createAppointment({
      facilityId: selectedFacility.id,
      service: selectedService,
      fee: currentFee,
      requestedDoctor,
      date: selectedDate,
      time: selectedTime,
      patientName: patientName.trim() || 'Elena M. Reyes',
      contactNumber: contactNumber.trim() || '0917 458 2219',
      barangay: currentUser.barangay || 'Brgy. Cogon',
      reason: reason.trim() || 'General check-up',
      paymentMethod,
    });
    setActivePage('request-submitted');
  };

  const stepLabels: Record<1 | 2 | 3, string> = {
    1: 'Step 1 of 3 • Choose Service',
    2: 'Step 2 of 3 • Date & Time',
    3: 'Step 3 of 3 • Patient Info',
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Task Flow Header */}
      <header className="lg:hidden sticky top-0 z-30 bg-surface-container-high border-b border-outline px-4 py-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back"
          className="min-h-[48px] min-w-[48px] rounded-full bg-surface-container-low border border-outline inline-flex items-center justify-center text-on-surface hover:bg-secondary cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            arrow_back
          </span>
        </button>
        <div className="text-center">
          <span className="font-headline text-title-md text-on-surface block">
            Book Appointment
          </span>
          <span className="font-label text-label-sm text-on-surface-variant">
            {stepLabels[step]}
          </span>
        </div>
        <div className="w-12" aria-hidden="true"></div>
      </header>

      {/* Desktop Top Navigation */}
      <header className="hidden lg:block sticky top-0 z-30 bg-surface-container-high border-b border-outline px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
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
          <span className="font-headline text-title-md text-on-surface">Book Appointment</span>
          <button
            type="button"
            onClick={() => setActivePage('clinic-detail')}
            className="min-h-[48px] px-4 py-2 rounded-full bg-surface-container-low border border-outline text-on-surface font-label text-label-md inline-flex items-center gap-1.5 hover:bg-secondary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              close
            </span>
            <span>Cancel</span>
          </button>
        </div>
      </header>

      {/* Mobile Progress Bar */}
      <div className="lg:hidden max-w-2xl w-full mx-auto px-4 pt-4">
        <div className="grid grid-cols-3 gap-2">
          <div className={`h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-outline-variant'}`} />
          <div className={`h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-outline-variant'}`} />
          <div className={`h-2 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-outline-variant'}`} />
        </div>
      </div>

      <main className="flex-1 max-w-2xl lg:max-w-6xl w-full mx-auto px-4 lg:px-6 py-5 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left 8 Cols: 3-Step Form */}
        <div className="lg:col-span-8 flex flex-col gap-5 lg:gap-6">
          {/* Desktop Labeled Progress Bar */}
          <div className="hidden lg:grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <div
                className={`h-2.5 rounded-full ${
                  step >= 1 ? 'bg-primary' : 'bg-outline-variant'
                }`}
              />
              <span
                className={`font-label text-label-sm ${
                  step >= 1 ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                1. Choose Service
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div
                className={`h-2.5 rounded-full ${
                  step >= 2 ? 'bg-primary' : 'bg-outline-variant'
                }`}
              />
              <span
                className={`font-label text-label-sm ${
                  step >= 2 ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                2. Date &amp; Time
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div
                className={`h-2.5 rounded-full ${
                  step >= 3 ? 'bg-primary' : 'bg-outline-variant'
                }`}
              />
              <span
                className={`font-label text-label-sm ${
                  step >= 3 ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                3. Patient Info
              </span>
            </div>
          </div>

          {/* Facility Context Banner */}
          <div className="rounded-lg bg-secondary border border-outline p-3.5 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="material-symbols-outlined text-[24px] text-on-surface shrink-0"
                aria-hidden="true"
              >
                local_hospital
              </span>
              <div className="min-w-0">
                <p className="font-headline text-label-lg text-on-surface truncate">
                  {selectedFacility.name}
                </p>
                <p className="font-body text-body-md text-on-surface">
                  {selectedFacility.barangay}
                </p>
              </div>
            </div>

            <select
              aria-label="Change facility"
              value={selectedFacility.id}
              onChange={(e) => handleFacilityChange(e.target.value)}
              className="min-h-[40px] rounded-full bg-surface-container-high border border-outline px-3 py-1.5 font-label text-label-sm text-on-surface cursor-pointer"
            >
              {facilities.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.shortName}
                </option>
              ))}
            </select>
          </div>

          {/* STEP 1: Choose Service */}
          {step === 1 && (
            <section
              id="step-1"
              className="lg:rounded-xl lg:bg-surface-container-high lg:border lg:border-outline lg:p-6 flex flex-col gap-4"
            >
              <h1 className="font-headline text-headline-md text-on-surface">
                1. Choose a Service
              </h1>
              <div className="flex flex-col gap-3">
                {selectedFacility.detailedServices.map((srv) => {
                  const isChecked = selectedService === srv.name;
                  return (
                    <label
                      key={srv.name}
                      className={`min-h-[48px] rounded-lg p-4 flex items-center justify-between gap-3 cursor-pointer transition-colors duration-state-change ${
                        isChecked
                          ? 'bg-surface-container-high lg:bg-surface-container-low border-2 border-on-surface'
                          : 'bg-surface-container-high lg:bg-surface-container-low border border-outline hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="service"
                          value={srv.name}
                          checked={isChecked}
                          onChange={() => setSelectedService(srv.name)}
                          className="w-5 h-5 text-on-surface focus:ring-primary"
                        />
                        <div>
                          <span className="font-headline text-label-lg text-on-surface block">
                            {srv.name}
                          </span>
                          <span className="font-body text-body-md text-on-surface-variant">
                            {srv.duration ? `${srv.duration} • ` : ''}
                            {srv.description}
                          </span>
                        </div>
                      </div>
                      <span className="font-headline text-title-md text-on-surface tabular-nums shrink-0">
                        {srv.fee}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActivePage('clinic-detail')}
                  className="min-h-[48px] px-5 lg:px-6 py-3 rounded-full bg-surface-container-high lg:bg-surface-container-low border border-outline text-on-surface font-label text-label-lg inline-flex items-center justify-center hover:bg-secondary cursor-pointer"
                >
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="flex-1 lg:flex-initial min-h-[48px] px-6 lg:px-8 py-3 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Next: Date &amp; Time</span>
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: Choose Date & Time */}
          {step === 2 && (
            <section
              id="step-2"
              className="lg:rounded-xl lg:bg-surface-container-high lg:border lg:border-outline lg:p-6 flex flex-col gap-4 lg:gap-5"
            >
              <h1 className="font-headline text-headline-md text-on-surface">
                2. Choose Date &amp; Time
              </h1>

              {/* Day Picker */}
              <div className="rounded-lg bg-surface-container-high lg:bg-transparent border lg:border-0 border-outline p-4 lg:p-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-title-md text-on-surface">November 2026</span>
                  <span className="font-label text-label-sm text-on-surface-variant">
                    Select a day
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2 lg:gap-3 text-center">
                  {NOVEMBER_DAYS.map((day) => {
                    const isSelected = selectedDate === day.fullDate;
                    if (day.disabled) {
                      return (
                        <button
                          key={day.dayNum}
                          type="button"
                          disabled
                          className="min-h-[48px] rounded-DEFAULT bg-outline-variant border border-outline-variant p-2 lg:p-3 flex flex-col items-center justify-center text-on-surface cursor-not-allowed"
                        >
                          <span className="font-label text-label-sm line-through">
                            {day.dayLabel}
                          </span>
                          <span className="font-headline text-label-lg tabular-nums line-through">
                            {day.dayNum}
                          </span>
                        </button>
                      );
                    }
                    return (
                      <button
                        key={day.dayNum}
                        type="button"
                        onClick={() => setSelectedDate(day.fullDate)}
                        className={`min-h-[48px] rounded-DEFAULT p-2 lg:p-3 flex flex-col items-center justify-center transition-colors duration-state-change cursor-pointer ${
                          isSelected
                            ? 'bg-primary border-2 border-on-surface text-on-primary'
                            : 'bg-surface-container-low border border-outline text-on-surface hover:bg-secondary'
                        }`}
                      >
                        <span className="font-label text-label-sm">{day.dayLabel}</span>
                        <span className="font-headline text-label-lg tabular-nums">
                          {day.dayNum}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="rounded-lg bg-surface-container-high lg:bg-transparent border lg:border-0 border-outline p-4 lg:p-0 flex flex-col gap-3">
                <span className="font-headline text-title-md text-on-surface">
                  Available Time Slots ({selectedDate.replace(', 2026', '')})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 lg:gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.value;
                    if (slot.disabled) {
                      return (
                        <button
                          key={slot.value}
                          type="button"
                          disabled
                          className="min-h-[48px] px-3 py-2 rounded-full bg-outline-variant text-on-surface font-label text-label-md cursor-not-allowed line-through tabular-nums"
                        >
                          <span>{slot.label}</span>
                        </button>
                      );
                    }
                    return (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => setSelectedTime(slot.value)}
                        className={`min-h-[48px] px-3 py-2 rounded-full font-label text-label-md tabular-nums transition-colors duration-state-change cursor-pointer ${
                          isSelected
                            ? 'bg-primary border-2 border-on-surface text-on-primary'
                            : 'bg-surface-container-low border border-outline text-on-surface hover:bg-secondary'
                        }`}
                      >
                        <span>{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="min-h-[48px] px-5 lg:px-6 py-3 rounded-full bg-surface-container-high lg:bg-surface-container-low border border-outline text-on-surface font-label text-label-lg inline-flex items-center justify-center hover:bg-secondary cursor-pointer"
                >
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="flex-1 lg:flex-initial min-h-[48px] px-6 lg:px-8 py-3 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Next: Patient Info</span>
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: Patient Info & Review Summary */}
          {step === 3 && (
            <section
              id="step-3"
              className="lg:rounded-xl lg:bg-surface-container-high lg:border lg:border-outline lg:p-6 flex flex-col gap-4"
            >
              <h1 className="font-headline text-headline-md text-on-surface">
                3. Patient Information &amp; Review
              </h1>

              <div className="rounded-lg bg-surface-container-high lg:bg-transparent border lg:border-0 border-outline p-4 lg:p-0 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-label text-label-md text-on-surface">
                      Patient Full Name
                    </span>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-label text-label-md text-on-surface">Mobile Number</span>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface tabular-nums"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">
                    Reason for Consultation
                  </span>
                  <textarea
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">
                    Doctor Preference (Optional)
                  </span>
                  <select
                    value={requestedDoctor}
                    onChange={(e) => setRequestedDoctor(e.target.value)}
                    className="min-h-[48px] w-full rounded-DEFAULT bg-surface-container-low border border-outline px-4 py-3 font-body text-body-md text-on-surface"
                  >
                    <option value="Any available doctor">Any available doctor</option>
                    {selectedFacility.doctors.map((doc) => (
                      <option key={doc.id} value={`${doc.name} (${doc.specialty})`}>
                        {doc.name} ({doc.specialty})
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-on-surface">
                    Payment Preference
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label
                      className={`min-h-[48px] rounded-DEFAULT px-4 py-2.5 flex items-center gap-2 cursor-pointer ${
                        paymentMethod === 'Cash at Clinic'
                          ? 'bg-secondary border-2 border-on-surface'
                          : 'bg-surface-container-low border border-outline'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Cash at Clinic'}
                        onChange={() => setPaymentMethod('Cash at Clinic')}
                        className="w-4 h-4 text-on-surface"
                      />
                      <span className="font-label text-label-md text-on-surface">
                        Cash at Clinic
                      </span>
                    </label>
                    <label
                      className={`min-h-[48px] rounded-DEFAULT px-4 py-2.5 flex items-center gap-2 cursor-pointer ${
                        paymentMethod === 'Online Payment'
                          ? 'bg-secondary border-2 border-on-surface'
                          : 'bg-surface-container-low border border-outline'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Online Payment'}
                        onChange={() => setPaymentMethod('Online Payment')}
                        className="w-4 h-4 text-on-surface"
                      />
                      <span className="font-label text-label-md text-on-surface">Online</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Mobile Review Summary */}
              <div className="lg:hidden rounded-lg bg-secondary border border-outline p-4 flex flex-col gap-2">
                <h2 className="font-headline text-title-md text-on-surface">Review Summary</h2>
                <p className="font-body text-body-md text-on-surface">
                  <strong>Service:</strong> {selectedService} ({currentFee})
                  <br />
                  <strong>Schedule:</strong> {selectedDate} at {selectedTime}
                  <br />
                  <strong>Note:</strong> Your request will be sent to the clinic for confirmation.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="min-h-[48px] px-5 lg:px-6 py-3 rounded-full bg-surface-container-high lg:bg-surface-container-low border border-outline text-on-surface font-label text-label-lg inline-flex items-center justify-center hover:bg-secondary cursor-pointer"
                >
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 lg:flex-initial min-h-[48px] px-6 lg:px-8 py-3 rounded-full bg-primary text-on-primary font-label text-label-lg hover:bg-primary-deep transition-colors duration-state-change inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Submit Appointment Request</span>
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Right 4 Cols (Desktop Sticky Summary) */}
        <aside className="hidden lg:flex lg:col-span-4 rounded-xl bg-secondary border border-outline p-6 flex-col gap-4 sticky top-24">
          <h2 className="font-headline text-title-md text-on-surface">Appointment Summary</h2>
          <dl className="flex flex-col gap-3 text-body-md text-on-surface">
            <div>
              <dt className="font-label text-label-sm text-on-surface">Facility</dt>
              <dd className="font-body text-body-md">{selectedFacility.name}</dd>
            </div>
            <div>
              <dt className="font-label text-label-sm text-on-surface">Service</dt>
              <dd className="font-body text-body-md">
                {selectedService} ({currentFee})
              </dd>
            </div>
            <div>
              <dt className="font-label text-label-sm text-on-surface">Requested Schedule</dt>
              <dd className="font-body text-body-md tabular-nums">
                {selectedDate} • {selectedTime}
              </dd>
            </div>
          </dl>
          <div className="rounded-DEFAULT bg-surface-container-high border border-outline p-3.5 flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-[20px] text-on-surface shrink-0 mt-0.5"
              aria-hidden="true"
            >
              info
            </span>
            <p className="font-body text-body-md text-on-surface">
              Your requested schedule is not yet guaranteed until the clinic confirms it.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};
