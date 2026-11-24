# E-Ayo — Baybay City Digital Healthcare PWA

> **"Your Health, Within Your City."**  
> *Healthcare made easier for every Baybayanon. Find trusted local clinics, hospitals, and health centers in Baybay City, Leyte and request appointments in minutes.*

**E-Ayo** is a centralized, offline-ready Progressive Web Application (PWA) mockup connecting residents across all barangays of **Baybay City, Leyte, Philippines (6521)** with verified local public hospitals, city health centers, diagnostic & dialysis laboratories, birthing clinics, and private medical providers.

---

## 1. Stitch Design System (`E-Ayo Baybay Healthcare`)

This codebase implements the **Stitch Design System** (`stitch_e_ayo_baybay_city_healthcare_pwa/stitch_e_ayo_baybay_city_healthcare_pwa/e_ayo_design_system.md`), blending **Tactile Modernism** with **Accessible Community Care**:

- **Warm, Reassuring Palette**: Soft cream (`#F5EBD0`) and peach (`#FFDFC3`) surfaces replace sterile clinical whites, paired with deep warm brown (`#3B2A26`) text to guarantee WCAG AA+ contrast (`4.5:1` or higher) on every surface.
- **Tonal Layering & Soft-Salmon Outlines**: Elevated cards (`#FFF9EE`) and containers (`#FFDFC3`) use crisp `1px` soft-salmon borders (`#F3B5A0`) rather than heavy drop shadows.
- **Ergonomic 48px Touch Targets**: Every interactive button, navigation tab, filter chip, input field, and card action enforces a minimum height of `48px` (`min-h-[48px]`) for first-time smartphone users, seniors, and busy families.

### Color Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| `primary` | `#FEA38E` | Coral primary brand color, active navigation pills, and primary CTAs |
| `primary-deep` | `#E8735A` | Hover & active coral state |
| `on-primary` | `#3B2A26` | Deep warm brown text/icons on coral primary buttons |
| `secondary` / `surface-container` | `#FFDFC3` | Peach cream secondary surfaces, hero banners, and highlighted summary cards |
| `tertiary` | `#FBA2AB` | Pink accent badges, facility tags, and notification indicators |
| `surface` | `#F5EBD0` | Primary warm cream application canvas |
| `surface-container-low` | `#FAF3E0` | Subtle cream input fields and secondary wells |
| `surface-container-high` | `#FFF9EE` | Elevated cream cards, sticky headers, and navigation bars |
| `on-surface` | `#3B2A26` | Primary headings and body typography |
| `on-surface-variant` | `#7A625B` | Supporting descriptions, metadata, and inactive tabs |
| `outline` | `#F3B5A0` | Crisp `1px` soft-salmon borders and dividers |
| `outline-variant` | `#E6C9B8` | Internal list dividers and disabled slot fills |
| `status-pending-*` | `#FEF3C7` / `#92400E` | Amber badge for **Pending Confirmation** appointment requests |
| `status-confirmed-*` | `#DCFCE7` / `#166534` | Green badge & button for **Confirmed** appointments |
| `status-completed-*` | `#E2E8F0` / `#334155` | Soft blue-gray badge for **Completed** consultations |
| `status-cancelled-*` | `#FEE2E2` / `#991B1B` | Muted red badge & outline for **Cancelled / Declined** requests |

### Typography & Iconography

- **Headings, Labels & Buttons (`Poppins`)**: Friendly geometric structure (`display-lg` 36px, `display-lg-mobile` 28px, `headline-lg` 32px, `headline-md` 24px, `headline-sm` 20px, `title-md` 18px, `label-lg` 16px, `label-md` 14px, `label-sm` 12px).
- **Body Copy (`Nunito`)**: Rounded, open letterforms with a strict minimum `16px` base size (`body-lg` 18px, `body-md` 16px).
- **Reference Codes (`Source Code Pro`)**: Monospace `15px` (`mono-md`) with `tabular-nums` for reference numbers (`EAYO-2026-0001`), consultation fees (`₱150`), and phone numbers.
- **Icons (`Material Symbols Outlined`)**: Google Material Symbols with filled states on active navigation tabs and confirmation badges.

---

## 2. Complete 11-Screen Stitch Architecture (Mobile PWA + Desktop Web)

The application unifies all **11 Mobile Screens** and **8 Desktop Web Screens** from `stitch_e_ayo_baybay_city_healthcare_pwa`:

1. **Splash & Onboarding (`1._splash_onboarding`)**
   - Brand header with **Offline Ready** status pill, Baybay City family healthcare illustration, *"Your Health, Within Your City."* headline, 3 value highlights (*Local Clinics*, *Easy Requests*, *Verified Care*), and **Get Started** / **Log In or Register** actions.
2. **Login & Register (`2._login_register` & `web_login_register`)**
   - Role switcher tabs for **Patient** vs **Healthcare Provider** accounts, resident Barangay selector in Baybay City, and facility registration/management entry.
3. **Home (`3._home` & `web_home`)**
   - Dismissible **Install E-Ayo** PWA banner, welcome hero (*"Maayong adlaw, Baybayanon!"* / *"Your Health, Within Your City."*), prominent search bar, quick action buttons, **Browse by Facility Type** chips, **Featured Clinics & Hospitals**, **Popular Services** grid, and **How E-Ayo Works** (1. Find, 2. Book, 3. Get Confirmed).
4. **Find a Clinic (`4._find_a_clinic` & `web_find_a_clinic`)**
   - Search by clinic, hospital, doctor name, or barangay; collapsible mobile filter drawer & desktop **Filter Providers** sidebar (*Facility Type*, *Category*, *Barangay*, *Available Appointments*, *Open 24 Hours*); and action cards with **View Details** and **Book Appointment**.
5. **Clinic Profile (`5._clinic_profile` & `web_clinic_profile`)**
   - Facility cover photo, ownership & 24-hour badges, **Hours & Contact**, interactive Baybay City location preview, **Services & Consultation Fees** table (`₱150`, `₱200`, `₱250`, `₱450`, etc.), **Available Doctors** roster, and sticky booking panel.
6. **Medical Services (`6._services` & `web_services`)**
   - 8 core medical service categories (*General Consultation*, *Maternal and Child Care*, *Laboratory Services*, *Diagnostic Services*, *Dental Services*, *Immunization*, *Chronic Disease Care*, *Mental Health*) paired with a dynamic **Providers for Selected Service** drawer and **Book This Service** CTA.
7. **Book Appointment — 3-Step Flow (`7._book_appointment` & `web_book_appointment`)**
   - **Step 1: Choose a Service** (radio cards with duration and peso fees).
   - **Step 2: Choose Date & Time** (November 2026 day selector and time slot pills with `(Full)` slot handling).
   - **Step 3: Patient Information & Review** (Patient Full Name, Mobile Number, Reason for Consultation, Doctor Preference, Payment Preference, and sticky **Appointment Summary**).
8. **Request Submitted (`8._request_submitted`)**
   - Confirmation screen with **Pending Confirmation** status badge, non-guaranteed schedule notice, monospace Reference No. (`EAYO-2026-0001`), summary table, and **Go to My Appointments** / **Back to Home** actions.
9. **My Appointments (`9._my_appointments` & `web_my_appointments`)**
   - Scrollable status filter tabs (*Upcoming*, *Pending*, *Confirmed*, *Completed*, *Cancelled*, *History*), **Notifications** panel, appointment cards with **Reschedule** and **Cancel** buttons, and **New Request** CTA.
10. **Provider Dashboard (`10._provider_dashboard` & `web_provider_dashboard`)**
    - Dedicated clinic management portal with **Pending / Confirmed / This Week** metric counters, **New Appointment Request** review cards (**Accept Appointment**, **Suggest Another Schedule**, **Decline Request**), and **Manage Your Facility** tools (*Clinic Profile*, *Doctors and Staff*, *Services and Fees*, *Operating Hours*, *Availability*).
11. **About Us (`11._about_us`)**
    - Platform mission, community care overview for Baybayanons, and **Baybay City Health Network Desk** contact information.

---

## 3. Project Structure

```text
e-ayo/
├── index.html                          # Fonts (Poppins, Nunito, Source Code Pro) & Material Symbols
├── README.md                           # Project & Stitch Design System documentation
├── package.json                        # React 18, TypeScript, Vite 6, Tailwind CSS v4
├── stitch_e_ayo_baybay_city_healthcare_pwa/
│   └── stitch_e_ayo_baybay_city_healthcare_pwa/
│       ├── e_ayo_design_system.md      # Canonical Stitch Design System specification
│       ├── 1._splash_onboarding/       # Mobile Screen 1
│       ├── 2._login_register/          # Mobile Screen 2
│       ├── 3._home/                    # Mobile Screen 3
│       ├── 4._find_a_clinic/           # Mobile Screen 4
│       ├── 5._clinic_profile/          # Mobile Screen 5
│       ├── 6._services/                # Mobile Screen 6
│       ├── 7._book_appointment/        # Mobile Screen 7
│       ├── 8._request_submitted/       # Mobile Screen 8
│       ├── 9._my_appointments/         # Mobile Screen 9
│       ├── 10._provider_dashboard/     # Mobile Screen 10
│       ├── 11._about_us/               # Mobile Screen 11
│       └── web_*/                      # Desktop Web Responsive Layouts
└── src/
    ├── index.css                       # Stitch @theme tokens, typography classes & utilities
    ├── main.tsx                        # Application entry point
    ├── App.tsx                         # Main shell, install banner, top/bottom nav & screen router
    ├── components/
    │   └── Navbar.tsx                  # Stitch Install Banner, Sticky Top Header & 5-Tab Bottom Nav
    ├── context/
    │   └── AppContext.tsx              # State for 11 screens, facilities, bookings & provider actions
    ├── data/
    │   ├── facilitiesData.ts           # Baybay City healthcare providers, doctors, fees & photos
    │   └── servicesData.ts             # 8 Stitch service categories & 6 popular services
    └── pages/
        ├── SplashOnboardingPage.tsx    # Screen 1: Welcome & Onboarding
        ├── LoginRegisterPage.tsx       # Screen 2: Patient & Provider Login / Register
        ├── HomePage.tsx                # Screen 3: Home
        ├── FindClinicPage.tsx          # Screen 4: Find a Clinic Directory
        ├── ClinicDetailPage.tsx        # Screen 5: Clinic Profile
        ├── ServicesPage.tsx            # Screen 6: Medical Services
        ├── BookAppointmentPage.tsx     # Screen 7: 3-Step Book Appointment
        ├── RequestSubmittedPage.tsx    # Screen 8: Request Submitted Receipt
        ├── AppointmentsPage.tsx        # Screen 9: My Appointments & Notifications
        ├── ProviderPortalPage.tsx      # Screen 10: Provider Dashboard
        └── AboutPage.tsx               # Screen 11: About Us
```

---

## 4. Getting Started

### Prerequisites
- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### Installation & Local Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```
