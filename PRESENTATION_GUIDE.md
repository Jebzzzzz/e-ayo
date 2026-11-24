# E-Ayo Mockup Owner's Presentation & Feature Discussion Guide

> **Purpose of this Document:**  
> This guide is written specifically for the **project owner / presenter** of the **E-Ayo Baybay City Healthcare PWA** mockup. It gives you a clear **demo sequence**, **exact talking points** for all 11 screens, **design justification**, and **Q&A defense answers** so you can confidently explain and demonstrate every feature to stakeholders, panelists, instructors, or local health officials.

---

## 1. The 30-Second Elevator Pitch (How to Introduce E-Ayo)

When you begin your presentation, start with the core problem and E-Ayo’s tagline:

> **"E-Ayo — *Your Health, Within Your City* — is a centralized, mobile-first Progressive Web App (PWA) designed exclusively for the residents of Baybay City, Leyte. Right now, Baybayanons often don't know which local clinic offers a specific lab test or specialist, what the consultation fees are, or what hours a doctor is on duty—leading to long queues or unnecessary trips to Ormoc or Tacloban. E-Ayo brings Baybay City’s public hospitals, City Health Office, Dialysis & Diagnostic Center, and private clinics into one warm, easy-to-use platform where residents can discover services, request appointments in 3 simple steps, and receive confirmed schedules directly from the clinic."**

### Problem vs. E-Ayo Solution Cheat Sheet

| Local Healthcare Challenge in Baybay City | How the E-Ayo Mockup Solves It |
| :--- | :--- |
| **Scattered Information:** Patients don't know operating hours, fees, or available doctors across barangays. | **Centralized Clinic Directory & Profiles** with transparent Peso fees (`₱150`, `₱200`, `Free`), operating hours, and direct click-to-call numbers. |
| **Long Waiting Lines:** Early-morning queuing at public centers without knowing if slots are full. | **3-Step Appointment Request Flow** with visual date & time-slot availability (`Full` slots are clearly disabled). |
| **Schedule Uncertainty:** Real-world clinics cannot always guarantee instant automated bookings due to emergencies. | **Two-Way Request & Confirmation Loop:** Bookings start as *Pending Confirmation* until the clinic approves or suggests a new time in the **Provider Portal**. |
| **Digital Literacy & Senior Accessibility:** Many healthcare apps look cold, cluttered, and hard to tap for older residents. | **Warm Community Care Design System** with `16px+` readable fonts, high-contrast brown-on-cream text, and large `48px` touch targets. |

---

## 2. How to Discuss the Design System (Why It Looks This Way)

If someone asks **"Why did you choose these colors, fonts, and layout?"**, highlight these four intentional UX decisions from the **E-Ayo Stitch Design System**:

1. **Warm Reassuring Palette vs. Cold Clinical White:**
   - Traditional medical apps use sterile whites and harsh blues that can feel intimidating.
   - E-Ayo uses **Warm Cream (`#F5EBD0`)**, **Elevated Cream Cards (`#FFF9EE`)**, **Peach Cream (`#FFDFC3`)**, and **Coral Primary Buttons (`#FEA38E`)** paired with **Deep Warm Brown (`#3B2A26`)** text.
   - **Accessibility Fact to Mention:** Deep warm brown (`#3B2A26`) on pastel surfaces guarantees **WCAG AA+ contrast (4.5:1 or higher)**. We never put white text on light pastel backgrounds.
2. **Reserved Semantic Colors for Appointment Statuses:**
   - To prevent visual confusion, traffic-light colors are reserved **strictly** for appointment statuses:
     - **Amber (`Pending Confirmation`)**: Waiting for clinic review.
     - **Green (`Confirmed`)**: Approved by the clinic.
     - **Blue-Gray (`Completed`)**: Past finished visit.
     - **Muted Red (`Cancelled / Declined`)**: Cancelled by patient or declined by clinic.
3. **Senior-Friendly Typography & 48px Touch Targets:**
   - **Poppins** is used for headings and buttons; **Nunito** (strictly `16px` or larger) is used for body copy; **Source Code Pro** monospace (`tabular-nums`) is used for Reference Numbers (`EAYO-2026-0001`) and fees (`₱150`).
   - Every single button, tab, and input is at least **`48px` tall (`min-h-[48px]`)**, making it effortless to tap for seniors, parents holding children, or first-time smartphone users.
4. **Offline-Ready PWA Architecture:**
   - Point out the **"Install E-Ayo on your phone"** top banner and the **"Offline Ready"** status badge in the header.
   - As a Progressive Web App, residents in outlying barangays can install E-Ayo directly from their browser without needing Play Store/App Store downloads or heavy storage space.

---

## 3. Screen-by-Screen Feature Guide & Talking Points (All 11 Screens)

Use this section as your roadmap when walking through each screen of the mockup.

---

### Screen 1: Splash & Onboarding (`Welcome` Button in Top Header / Footer)
- **How to Open It:** Click the **"Welcome"** button in the top navigation bar (or footer).
- **Features on Screen:**
  - Brand header with E-Ayo logo (`Baybay City, Leyte`) and **`Offline Ready`** pill.
  - Community healthcare illustration and **`Exclusively for Baybayanons`** location pill.
  - Tagline: **"Your Health, Within Your City."**
  - 3 Quick Value Cards: **`Local Clinics`**, **`Easy Requests`**, and **`Verified Care`**.
  - Primary CTA (**`Get Started`**) and Secondary CTA (**`Log In or Register`**).
- **What to Say:**
  > *"This is the first-time onboarding screen for mobile users. Within 3 seconds, it reassures the user that E-Ayo is built specifically for Baybay City residents, works reliably even on slow connections ('Offline Ready'), and lets them either jump straight into browsing clinics ('Get Started') or sign into their account."*

---

### Screen 2: Login & Register (`Log In` Pill on Desktop / `Profile` Tab on Mobile)
- **How to Open It:** Click **`Log In`** (or user name pill) in the top right on desktop, or the **`Profile`** tab in the bottom bar on mobile, or **`Log In or Register`** from the Welcome screen.
- **Features on Screen:**
  - **Account Type Toggle Pill (`Patient` vs. `Healthcare Provider`)**: One unified authentication screen serving both sides of the platform.
  - **Patient Account Tab**: Mobile Number or Email, **Barangay in Baybay City** dropdown (*Brgy. Cogon*, *Brgy. Poblacion*, *Brgy. Galenzoga*, *Brgy. Pangasugan*, etc.), Password, **`Log In as Patient`**, and **`Create Patient Account`**.
  - **Healthcare Provider Tab**: Facility / Clinic selector, Facility Type (*Private Clinic*, *Public Hospital / Health Center*, *Diagnostic & Dialysis Center*, *Maternity & Lying-In*), Clinic Contact Email, **`Open Provider Dashboard`**, and **`Register a New Clinic`**.
- **What to Say:**
  > *"E-Ayo serves two user roles: Patients and Healthcare Providers. Notice how patients select their Barangay in Baybay City—this helps contextualize local care—while clinics and hospitals can switch to the Healthcare Provider tab to register their facility or open the Provider Portal to manage incoming requests."*

---

### Screen 3: Home Screen (`Home` Tab)
- **How to Open It:** Default landing screen, or click **`Home`** in the navigation bar.
- **Features on Screen:**
  - **Dismissible PWA Install Banner**: *"Install E-Ayo on your phone"* with **`Install App`** and dismiss (`X`) buttons.
  - **Welcome Hero**: Greeting (*"Maayong adlaw, Baybayanon!"* on mobile / *"Your Health, Within Your City."* on desktop), prominent rounded search bar, and 3 core action pills (**`Find a Clinic`**, **`Book an Appointment`**, **`Explore Services`**).
  - **Browse by Facility Type Chips**: **`Public Health Centers`**, **`Diagnostic and Dialysis`**, **`Pediatric and Maternal`**, and **`General Clinics`** (clicking any chip filters the directory automatically).
  - **Featured Clinics & Hospitals**: Visual cards for flagship providers (*Immaculate Conception Hospital*, *Baybay City Health Office*, *Kidzklinika*) showing ownership badges (`Public • Level 1`, `Private • Pediatric`) and operating hours (`24 Hours`, `Mon–Sat 8AM–5PM`).
  - **Popular Services Grid**: 6 high-demand local services (*Kidney Dialysis*, *Diagnostics*, *Primary Care*, *Physical Therapy*, *Maternity Care*, *Aesthetic Treatments*).
  - **How E-Ayo Works**: Simple 3-step visual explainer (*1. Find a Provider → 2. Request a Schedule → 3. Get Confirmed*).
- **What to Say:**
  > *"The Home screen is organized around what a patient actually needs in an urgent or routine moment. Whether they want to search by doctor name, filter by public vs. private facilities, tap a high-demand service like Kidney Dialysis, or jump straight to booking, everything is one tap away."*

---

### Screen 4: Find a Clinic Directory (`Find a Clinic` Tab)
- **How to Open It:** Click **`Find a Clinic`** in the top or bottom navigation bar.
- **Features on Screen:**
  - **Real-Time Search Bar**: Searches across clinic names, doctor names, services, and barangays.
  - **Filter System**:
    - On **Mobile**: A collapsible **`Filters`** drawer with Facility Type, Category, and quick toggle pills (`Available Appointments`, `Open Now`, `24 Hours`).
    - On **Desktop**: A sticky left **`Filter Providers`** sidebar (`Facility Type`, `Category`, `Barangay`, and `Availability` checkboxes) paired with a 2-column provider grid.
  - **Provider Action Cards**: Each card displays a facility photo, ownership badge (`Public • Level 1`, `Private`), booking status badge (`Appointments Open`, `Walk-in & Booking`, `Delivery 24/7`), barangay location, key service tags (`Emergency Care`, `Hemodialysis`, `Pediatric Check-up`), operating hours, a clickable phone number (`tel:`), and two clear buttons: **`View Details`** and **`Book Appointment`**.
- **What to Say:**
  > *"In Find a Clinic, residents can compare public and private facilities across Baybay City side by side. Every card gives immediate answers before the user even clicks in: Is it public or private? Is it open 24 hours? What barangay is it in? Users can call the clinic directly or tap 'View Details' or 'Book Appointment'."*

---

### Screen 5: Clinic Profile (`View Details` on any Clinic Card)
- **How to Open It:** Click **`View Details`** on any clinic card (e.g., *Baybay City Immaculate Conception Hospital*).
- **Features on Screen:**
  - **Facility Header Card**: Exterior photo, ownership & level badge (`Public • Level 1 Hospital`), operating badge (`Open 24 Hours`), full name, and street address.
  - **Hours, Contact & Map Location Preview**: Shows emergency vs. outpatient hours, clickable phone number, and a Baybay City map preview showing distance from the City Plaza (e.g., *Brgy. Cogon • 1.2 km from City Plaza*).
  - **Services & Consultation Fees Table**: Transparent breakdown of services with exact description and Peso fees (e.g., *General Outpatient Consultation — ₱150*, *Pediatric Check-up — ₱200*, *Complete Blood Count (CBC) — ₱250*, *Chest X-Ray — ₱450*, or *Free* at the City Health Office).
  - **Available Doctors Roster**: Cards showing each doctor's name, specialty, and clinic days (e.g., *Dr. Maria Elena Santos — Internal Medicine • Mon–Fri*).
  - **Sticky Booking CTA**: Sticky right sidebar card on desktop and sticky bottom bar on mobile.
- **What to Say:**
  > *"Price and doctor transparency is one of E-Ayo's biggest benefits. On the Clinic Profile page, families can see the exact consultation or lab fee before leaving home, check which doctor is on duty from Monday to Saturday, view the location distance from the City Plaza, and start a booking for that specific clinic."*

---

### Screen 6: Medical Services Explorer (`Services` Tab)
- **How to Open It:** Click **`Services`** in the navigation bar.
- **Features on Screen:**
  - **8 Core Service Categories**:
    1. *General Consultation*
    2. *Maternal and Child Care*
    3. *Laboratory Services*
    4. *Diagnostic Services*
    5. *Dental Services*
    6. *Immunization*
    7. *Chronic Disease Care*
    8. *Mental Health*
  - **Interactive Matching Providers Drawer (`Providers for [Selected Service]`)**: Tapping any service category highlights the card in coral/peach and dynamically updates the bottom drawer to show which Baybay City facilities offer that service, along with clickable facility chips and a **`Book This Service`** button.
- **What to Say:**
  > *"Many patients don't know which clinic they need—they only know what medical service they need, such as a dental extraction, an ultrasound, an anti-rabies vaccine, or mental health counseling. On the Medical Services page, tapping any of the 8 categories immediately reveals which local Baybay City facilities provide that exact care and lets them book it directly."*

---

### Screen 7: Book Appointment — 3-Step Flow (`Book Appointment` Button)
- **How to Open It:** Click **`Book Appointment`** from Home, Find a Clinic, Clinic Profile, or Services.
- **Features on Screen:**
  - **3-Segment Progress Indicator**: Clearly guides the patient through `1. Choose Service`, `2. Date & Time`, and `3. Patient Info`.
  - **Facility Context Banner**: Displays the selected hospital/clinic at the top (with a quick dropdown if the patient wants to switch facilities).
  - **Step 1 — Choose a Service**: Large radio cards showing service name, estimated duration (`30 mins`, `15 mins`), description, and fee (`₱150`, `₱200`, `₱250`).
  - **Step 2 — Choose Date & Time**:
    - Day selector for **November 2026** where past/unavailable days (`Mon 23`) are struck through and disabled.
    - Time slot pills where full slots (`8:00 AM (Full)`, `1:00 PM (Full)`) are disabled and available slots (`9:00 AM`, `10:30 AM`, `2:30 PM`, `4:00 PM`) highlight with a bold border when tapped.
  - **Step 3 — Patient Information & Review**: Pre-filled patient name (`Elena M. Reyes`), mobile number, reason for consultation, optional **Doctor Preference** dropdown (*Any available doctor* or a specific physician), and **Payment Preference** (*Cash at Clinic* vs. *Online*).
  - **Sticky Appointment Summary (Desktop Right Column / Mobile Review Box)**: Summarizes Facility, Service + Fee, Requested Schedule, and the important disclaimer: *"Your requested schedule is not yet guaranteed until the clinic confirms it."*
- **What to Say:**
  > *"Instead of overwhelming patients with one long medical form, E-Ayo breaks booking into 3 digestible steps. Notice in Step 2 how full time slots like 8:00 AM and 1:00 PM are clearly marked 'Full' and disabled so patients don't double-book. In Step 3, they can request a specific doctor or choose 'Any available doctor', select 'Cash at Clinic' or 'Online', and review their summary before submitting."*

---

### Screen 8: Request Submitted Confirmation (`Submit Appointment Request` in Step 3)
- **How to Open It:** Complete Step 3 of the Book Appointment flow and click **`Submit Appointment Request`**.
- **Features on Screen:**
  - Confirmation header with **`Pending Confirmation`** amber status badge.
  - **Expectation-Setting Callout Box**: *"Please wait for the clinic to confirm your appointment. Your requested schedule is not yet guaranteed."*
  - **Appointment Details Table**:
    - Monospace **`Reference No.`** (`EAYO-2026-0006`) formatted in `Source Code Pro` for easy reading or screenshot saving.
    - Facility, Service, Date, Time, and `Pending` status pill.
  - Action buttons: **`Go to My Appointments`** and **`Back to Home`**.
- **What to Say:**
  > *"Once submitted, E-Ayo generates a unique reference code like EAYO-2026-0001 and sets honest expectations: the status is 'Pending Confirmation' until the clinic staff reviews it. This prevents patients from showing up assuming an unreviewed request is already final."*

---

### Screen 9: My Appointments & Notifications (`My Appointments` / `Appointments` Tab)
- **How to Open It:** Click **`My Appointments`** in the top navigation, **`Appointments`** in the mobile bottom bar, the notification bell icon, or **`Go to My Appointments`** after booking.
- **Features on Screen:**
  - **Notifications Panel**: Highlights real-time updates (e.g., *"Your appointment was confirmed — Kidzklinika approved your visit for Nov 26, 2026 at 10:00 AM"* and *"Request received — EAYO-2026-0001 is waiting for hospital confirmation"*).
  - **Status Filter Tabs**: **`Upcoming`**, **`Pending`**, **`Confirmed`**, **`Completed`**, **`Cancelled`**, and **`History`**.
  - **Appointment Cards**: Each card shows the monospace reference number, color-coded status badge, facility name, service & doctor, date & time, and two patient self-service actions: **`Reschedule`** and **`Cancel`**.
- **What to Say:**
  > *"In My Appointments, patients can track all their requests in one place. They can filter by Pending, Confirmed, Completed, or Cancelled visits, read confirmation notices in the Notifications panel, and easily reschedule or cancel if their plans change."*

---

### Screen 10: Healthcare Provider Portal (`Provider Portal` Tab)
- **How to Open It:** Click **`Provider Portal`** in the top navigation bar (or log in via the **`Healthcare Provider`** tab on the Login screen).
- **Features on Screen:**
  - **Facility Switcher in Header**: Lets you switch which Baybay City clinic you are managing, plus quick buttons for **`Patient Site`** and **`Switch Account`**.
  - **3 Real-Time Metric Counters**:
    - **Pending Requests** (Amber card)
    - **Confirmed Today** (Green card)
    - **Total This Week** (Cream card)
  - **New Appointment Request Review Cards**: Displays patient name, reference code (`EAYO-2026-0001`), Service, Requested Doctor, Date & Time, and Reason for consultation, paired with **3 clinic decision buttons**:
    1. **`Accept Appointment`** (Green button — immediately confirms the patient's appointment).
    2. **`Suggest Another Schedule`** (Opens an inline date & time picker to propose an alternative slot and confirm).
    3. **`Decline Request`** (Red-outlined button — marks the request as Cancelled/Declined).
  - **Manage Your Facility Menu (Left Sidebar on Desktop / Bottom List on Mobile)**:
    - **`Dashboard`**: Review appointment requests.
    - **`Clinic Profile`**: Preview the public clinic profile.
    - **`Doctors and Staff`**: View current roster and add a new doctor live.
    - **`Services and Fees`**: View service list and add a new service + Peso fee live.
    - **`Operating Hours`** & **`Availability`**: Update clinic hours and contact number live.
- **What to Say:**
  > *"This is the clinic side of E-Ayo. When a patient submits a request, it lands here in the Provider Portal under Pending Requests. The clinic receptionist or nurse has three realistic options: Accept the appointment as requested, Suggest Another Schedule if the doctor is busy at that hour, or Decline the request. They can also update their doctors, consultation fees, and operating hours right from the sidebar."*

---

### Screen 11: About Us (`About Us` Link in Footer)
- **How to Open It:** Click **`About Us`** in the footer (or *"Learn about E-Ayo Baybay City"* on the Login screen).
- **Features on Screen:**
  - **About E-Ayo Hero Card**: *"Healthcare Made Easier for Every Baybayanon"*.
  - **Our Mission Card**: Explains how E-Ayo connects public hospitals, city health centers, diagnostic labs, and private clinics in Baybay City.
  - **Contact & Support Card**: *Baybay City Health Network Desk • Brgy. Poblacion, Baybay City, Leyte 6521 • Phone: (053) 563-9120 • Email: support@e-ayo.baybay.ph*.
  - **`Find a Clinic Near You`** CTA button.

---

## 4. The "Golden Path" 3-Minute Live Demo Script (Step-by-Step)

If you want to impress your audience with an interactive end-to-end demonstration, follow these exact 6 steps:

1. **Start at Welcome (`Welcome` button) → Click `Get Started`:**
   - Show the warm Stitch design system, the **`Offline Ready`** badge, and the **Install App** banner on the **Home** screen.
2. **Browse & Filter Clinics (`Find a Clinic`):**
   - Click **`Find a Clinic`**, point out the public and private providers (*Baybay City Immaculate Conception Hospital*, *Baybay City Health Office*, *Baybay City Medical Diagnostic & Dialysis Center*, *Kidzklinika*, *Baybay Family Care and Maternity Clinic*), and click **`View Details`** on *Immaculate Conception Hospital*.
3. **Inspect Transparent Fees & Doctors (`Clinic Profile`):**
   - Point out the consultation fees (`₱150`, `₱200`, `₱250`, `₱450`) and available doctors, then click **`Book Appointment`**.
4. **Complete the 3-Step Booking (`Book Appointment`):**
   - **Step 1:** Select *Pediatric Check-up (₱200)* and click **`Next: Date & Time`**.
   - **Step 2:** Select *Thu 26* and *10:30 AM* (point out how *8:00 AM (Full)* is disabled) and click **`Next: Patient Info`**.
   - **Step 3:** Keep or edit the patient details and click **`Submit Appointment Request`**.
5. **Show the Receipt (`Request Submitted`) → Open `Provider Portal`:**
   - Point out the new Reference Number (e.g., `EAYO-2026-0006`) and its **`Pending Confirmation`** badge.
   - Click **`Go to My Appointments`** to show it sitting in the patient's list, then click **`Provider Portal`** in the top navigation bar.
6. **Approve the Request as the Clinic (`Provider Portal`) → Verify in `My Appointments`:**
   - In the **Provider Portal**, locate the newly submitted request under **New Appointment Request**.
   - Click **`Accept Appointment`** (or **`Suggest Another Schedule`**).
   - Click **`My Appointments`** in the top navigation bar to show the audience that the patient's appointment status has immediately changed from **Pending Confirmation** to **Confirmed**!

---

## 5. Common Questions & How to Answer Them (Q&A Prep)

### Q1: "Why doesn't the app confirm the appointment immediately when the patient submits?"
> **Answer:** *"In local Philippine clinics and public hospitals in Baybay City, doctors often handle emergency rounds, deliveries, or walk-in queues. Making every booking an 'Appointment Request' (Pending Confirmation) gives the clinic staff control in the Provider Portal to either Accept the slot or Suggest Another Schedule—preventing overbooking and wasted trips for the patient."*

### Q2: "How does this help patients who want free public healthcare vs. private specialist care?"
> **Answer:** *"E-Ayo includes both! Every clinic card is clearly tagged with 'Public' or 'Private' badges, and the Services & Consultation Fees section shows 'Free' for public services at the Baybay City Health Office and PhilHealth coverage at the Dialysis Center alongside exact Peso fees for private clinics like Kidzklinika and Baybay Family Care."*

### Q3: "Is this a mobile app or a desktop website?"
> **Answer:** *"It is a responsive Progressive Web App (PWA) designed mobile-first for a 390px smartphone screen—complete with a 5-tab thumb-friendly bottom navigation bar and an 'Install App' prompt—that automatically expands into a multi-column desktop layout (`max-w-7xl`) with sticky sidebars for clinic receptionists and desktop users."*

### Q4: "What happens if a clinic adds a new doctor or changes its consultation fees?"
> **Answer:** *"In the Provider Portal (Screen 10), clinic administrators have a 'Manage Your Facility' menu where they can add new doctors, add services and fees, and update operating hours. Any change made there updates the patient-facing Clinic Profile immediately."*
