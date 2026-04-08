# NIOS Progress Tracker — Setup Guide
## DESG211 Assignment 3 | React + Material UI Dashboard

---

## 📦 Prerequisites

Make sure you have the following installed:
- **Node.js** v18+ → https://nodejs.org
- **npm** v9+ (bundled with Node)

Verify with:
```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

---

## 🚀 Setup — Step by Step

### Step 1: Extract the project
Unzip the downloaded folder or navigate to the project directory:
```bash
cd nios-tracker
```

### Step 2: Install all dependencies
```bash
npm install
```
This installs:
- `@mui/material` + `@mui/icons-material` — Google Material UI v5
- `@emotion/react` + `@emotion/styled` — MUI's styling engine
- `react` + `react-dom` v18
- `react-router-dom` v6 — screen navigation
- `vite` — fast dev server & bundler

### Step 3: Start the dev server
```bash
npm run dev
```
Opens at: **http://localhost:5173**

---

## 📂 Project Structure

```
nios-tracker/
├── index.html                        # Entry HTML with Google Fonts (DM Sans + Inter)
├── vite.config.js                    # Vite config
├── package.json
└── src/
    ├── main.jsx                      # React root mount
    ├── App.jsx                       # Router with all 9 routes
    ├── theme.js                      # MUI custom theme — moodboard colors
    ├── components/
    │   └── Layout.jsx                # Shared NavBar + Sidebar (used by all screens)
    └── screens/
        ├── parent/
        │   ├── P1_ProgressOverview.jsx   # Progress hero, level badge, sparkline bars
        │   ├── P2_EffortConsistency.jsx  # Streak, study calendar, time rings
        │   ├── P3_LearningAreas.jsx      # Topic pills, subject cards, heatmap
        │   └── P4_SupportGuidance.jsx    # Action chips, GPS rerouting, need cards
        └── educator/
            ├── E1_StudentOverview.jsx    # Accuracy ring, Bloom's ladder, KPIs
            ├── E2_PerformanceBreakdown.jsx # Subject bars + chapter heatmap
            ├── E3_ErrorAnalysis.jsx       # Step-wise error breakdown, root cause
            ├── E4_ConceptGaps.jsx         # Gap pills + prerequisite dependency chains
            └── E5_InterventionGuidance.jsx # Assign + Send to student actions
```

---

## 🎨 Design System

### Colors (Moodboard-aligned)
| Token        | Hex       | Usage                        |
|-------------|-----------|------------------------------|
| Green       | `#7aaa8a` | Growth, mastered, positive   |
| Yellow      | `#c9a94a` | Developing, effort, streaks  |
| Light Purple| `#a49acc` | Cognition, Bloom's taxonomy  |
| Soft Blue   | `#7ba8cc` | Trust, clarity, trends       |
| Warm Amber  | `#c4804a` | Gaps, errors (no harsh red!) |
| Off-white   | `#f2efe9` | Background                   |
| Dark Nav    | `#2d2a38` | Sidebar + top nav            |

### Typography
- **Headings & hero numbers**: DM Sans (700–800 weight)
- **Body & labels**: Inter (400–600 weight)

### Canvas
- 1440 × 900px desktop target
- Cards: 16px radius, 1px border `#e4e0d8`
- Pills: 20px fully-rounded

---

## 🗺️ Screen Routes

| Route                    | Screen                           | Role      |
|--------------------------|----------------------------------|-----------|
| `/parent/overview`       | P1 — Progress Overview           | Parent    |
| `/parent/consistency`    | P2 — Effort & Consistency        | Parent    |
| `/parent/learning`       | P3 — Learning Areas              | Parent    |
| `/parent/support`        | P4 — Support Guidance            | Parent    |
| `/educator/overview`     | E1 — Student Overview            | Educator  |
| `/educator/performance`  | E2 — Performance Breakdown       | Educator  |
| `/educator/diagnosis`    | E3 — Step-wise Error Analysis    | Educator  |
| `/educator/gaps`         | E4 — Concept Gaps & Prereq Chain | Educator  |
| `/educator/intervene`    | E5 — Intervention Guidance       | Educator  |

The sidebar icons navigate between screens. The "Switch to Educator/Parent" chip in the top nav switches role contexts.

---

## 🔨 Build for Production

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

---

## 🖼️ Figma Import

To import the designs into Figma:
1. Take screenshots of each screen at 1440 × 900 (use browser zoom out if needed)
2. Or use a Figma plugin like **HTML to Figma** or **Anima** to import the live React app directly
3. Apply Autoflow connections between screens using the route map above

---

## 📋 Assignment Checklist

- [x] 9 wireframe screens (4 Parent + 5 Educator)
- [x] Moodboard color system applied
- [x] Material Design component library (MUI v5)
- [x] DM Sans + Inter typography (moodboard-aligned)
- [x] Shared layout: sidebar + top nav
- [x] Role switching (Parent ↔ Educator)
- [x] No harsh reds — Warm Amber for all gap/error states
- [x] Positive parent framing ("Working On" not "Weak at")
- [x] Interactive elements: collapsible chips, assign/send buttons, toast notifications
- [x] Consistent color tokens via theme.js
