# YanCal

YanCal is a Progressive Web App for viewing and managing school bell schedules. It provides daily and monthly schedule views, organization-specific schedules, authentication, offline support, barcode-based access, and administrative tools for creating and importing schedules.

## Features

- Daily and monthly bell schedule views
- Current-period highlighting and schedule navigation
- Firebase Authentication with email and Google sign-in
- Cloud schedule synchronization with Firebase Firestore
- Offline-capable PWA using a service worker
- Installable on desktop and mobile devices
- Barcode/ID-based schedule access
- Calendar export in ICS format
- Admin tools for:
  - Generating bell schedules
  - Importing schedules from JSON or CSV
  - Mass-importing users
  - Publishing schedules to Firestore
- Built-in countdown, notifications, cache controls, and debugging tools

## Project Structure

```text
.
├── firebase.json          # Firebase Hosting configuration
├── .firebaserc            # Firebase project configuration
├── v1/                    # Legacy YanCal interface
└── v2/                    # Current application
    ├── index.html         # Main application landing page
    ├── SUI2.html          # User schedule interface
    ├── SBAR.html          # Barcode/ID schedule interface
    ├── SBARo.html         # Offline barcode/ID interface
    ├── admin.html         # Admin dashboard
    ├── Admin/
    │   ├── SCHED_ADMIN2.html
    │   ├── SCHED_CSV.html
    │   └── Mass_Users.html
    ├── manifest.json      # PWA manifest
    ├── sw.js              # Service worker
    ├── assetsToCache.json # Offline cache list
    └── AppImages/         # App icons and platform assets
```

## Technology

- HTML, CSS, and vanilla JavaScript
- Firebase Authentication
- Firebase Cloud Firestore
- Firebase Hosting
- Service Workers and Web App Manifest
- Papa Parse for CSV importing
- Quagga for barcode scanning
- Font Awesome and Google Fonts via CDN

## Running Locally

The project is a static Firebase Hosting site. Install the Firebase CLI if needed:

```bash
npm install -g firebase-tools
```

Log in to Firebase:

```bash
firebase login
```

Start the local development server:

```bash
firebase serve
```

The site will be available at the local URL shown by the Firebase CLI.

## Deployment

The configured Firebase project is `yancal`. Deploy the application with:

```bash
firebase deploy
```

Firebase Hosting serves the `v2/` directory, as configured in `firebase.json`.

## Firebase Configuration

The client-side Firebase configuration is embedded in the application pages. To use a different Firebase project:

1. Create or select a Firebase project.
2. Enable Authentication providers as needed.
3. Enable Cloud Firestore.
4. Update the Firebase configuration in the relevant HTML files.
5. Update `.firebaserc` with the target project ID.
6. Deploy with Firebase Hosting.

Do not place private credentials or server-side secrets in the client-side application.

## Administration

Open `v2/admin.html` to access administrative tools. Authorized administrators can:

- Generate schedules for date ranges
- Add custom schedule days
- Export schedules as JSON or CSV
- Import schedules
- Publish schedules to Firestore
- Import users in bulk
- Import schedules from CSV files

## Offline Support

The app registers `v2/sw.js` as a service worker. Cached assets are listed in `v2/assetsToCache.json`, with `v2/index.html` used as the offline fallback page.

When changing application files, update `assetsToCache.json` if the new files should be available offline.

## License

Copyright © 2026 Rayan Nasir. All rights reserved.
