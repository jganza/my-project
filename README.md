# GlowGuide

GlowGuide is a mobile app concept for women to upload selfies and receive personalized beauty advice. It focuses on inclusive, privacy-aware, and explainable recommendations spanning makeup, skincare, and hairstyles.

## Product Requirements Document (PRD)

### 1) Vision & Goals
**Vision:** Help women feel confident by delivering personalized beauty guidance that is inclusive, explainable, and easy to act on.

**Goals**
- Deliver accurate face shape, skin tone, and facial feature analysis from a selfie.
- Translate analysis into makeup, hair, and skincare recommendations that feel personalized and trustworthy.
- Enable real-time AR try-on for makeup and hairstyles.
- Provide offline access to basics and a premium subscription tier for advanced insights.

**Non-Goals (MVP)**
- Full salon booking or appointment management.
- Social network features beyond optional sharing.
- Medical or dermatology diagnosis.

### 2) Target Users & Personas
**Primary:** Women (18–45) seeking personalized guidance for makeup, hair, and skincare.

**Personas**
- **Nadia (24, student):** Wants affordable makeup picks and easy tutorials.
- **Priya (32, professional):** Needs routine-based skincare recommendations for hyperpigmentation.
- **Elena (41, parent):** Wants low-effort hair suggestions that work with natural texture.

### 3) User Needs & Pain Points
- **Uncertainty about shade matching** online.
- **Overwhelming product choices** without guidance.
- **Limited understanding of face shape** and how it impacts styling.
- **Skincare routines that are too complex** or not tailored to concerns.

### 4) Product Scope & Features
#### Core Features (MVP)
- **Selfie analysis:** face shape, skin tone/undertone, facial feature mapping.
- **Makeup recommendations:** product lists by brand/shade/type with purchase links.
- **Hairstyle suggestions:** tailored by face shape and hair texture.
- **Skincare routine builder:** based on user-inputted concerns.
- **Offline mode:** cached analysis and basic recommendations.

#### Premium Features
- **AR try-on** for makeup and hairstyles.
- **Advanced shade matching** with seasonal palette updates.
- **Expanded product catalog** and personalized routine tracking.

### 5) User Stories
- As a user, I want to upload a selfie and get an immediate summary of my face shape and skin tone.
- As a user, I want product recommendations that include brand, shade, and purchase links.
- As a user, I want hairstyle ideas that fit my face shape and texture.
- As a user, I want a skincare routine that reflects my concerns and sensitivity level.
- As a premium user, I want AR try-on to preview makeup and hair changes before purchasing.

### 6) Functional Requirements
**Selfie Capture & Analysis**
- The app must provide a guided selfie capture screen with lighting tips.
- The app must detect a face and reject low-quality images.
- The system must return face shape, skin tone/undertone, and key facial features.

**Recommendations Engine**
- The system must generate makeup product recommendations by brand, shade, and type.
- The system must link each product to a purchase URL.
- The system must suggest hairstyles based on face shape and hair texture.
- The system must generate skincare routines based on user-inputted concerns.

**Offline Mode**
- The app must cache the last analysis and basic recommendations locally.
- The app must sync updates when connectivity returns.

**Subscription**
- The app must allow premium purchases and manage entitlements.
- Premium-only features must be gated and labeled.

### 7) Non-Functional Requirements
- **Privacy:** Explicit consent for photo uploads; delete-on-request.
- **Performance:** Initial analysis results within 5 seconds on average.
- **Reliability:** 99% crash-free sessions.
- **Accessibility:** Support dynamic text sizes and screen readers.

### 8) Success Metrics
- **Activation rate:** % users completing selfie analysis within first session.
- **Conversion rate:** % users upgrading to premium.
- **Retention:** 7-day and 30-day active users.
- **Recommendation CTR:** Clicks on product links.

### 9) Risks & Mitigations
- **Bias in facial analysis:** Use diverse training data, measure fairness.
- **AR performance variability:** Device capability checks and graceful fallbacks.
- **Privacy concerns:** Transparent data policies and on-device processing when possible.

## User Journeys

### Journey 1: New User Onboarding → Analysis Results
1. User opens app and sees onboarding value proposition.
2. User grants camera permission and captures a selfie.
3. App analyzes selfie and displays face shape + skin tone.
4. User taps into makeup or hairstyle recommendations.

### Journey 2: Skincare Routine Creation
1. User selects concerns (acne, dryness, hyperpigmentation).
2. App generates AM/PM routine and highlights key ingredients.
3. User saves routine and enables reminders.

### Journey 3: Premium AR Try-On
1. User taps “Try AR.”
2. App checks subscription; prompts upgrade if needed.
3. User previews makeup shades or hairstyles in AR.
4. User purchases recommended items via linked retailers.

## Clickable Prototype Plan

### Prototype Goals
- Validate onboarding flow and selfie capture usability.
- Test comprehension of analysis results and recommendations.
- Evaluate interest in AR try-on and subscription upgrade flow.

### Tooling
- **Design:** Figma for screens and interactive components.
- **Prototype:** Figma Prototype or ProtoPie for advanced interactions.

### Core Screens
1. **Welcome / Onboarding**
2. **Selfie Capture**
3. **Analysis Results**
4. **Makeup Recommendations**
5. **Hairstyle Suggestions**
6. **Skincare Routine**
7. **AR Try-On Preview**
8. **Subscription Paywall**

### Prototype Interactions
- Tapping “Use Photo” → Analysis Results screen.
- Selecting “View Makeup” → Recommendations screen with tabs.
- Tapping “Try AR” → AR preview screen (mock overlay).
- “Upgrade to Premium” → Paywall screen.

### Usability Testing Plan
- Recruit 5–8 participants from target demographic.
- Task-based testing: “Get lipstick recommendations and try AR.”
- Measure time-to-task completion and user confidence ratings.
- Collect qualitative feedback on trust and clarity.

## Engineering Tasks (MVP → Beta)

### Mobile (React Native)
- Build onboarding and permission flow with camera and storage access.
- Implement selfie capture with lighting guidance and face-alignment overlay.
- Add analysis results UI with explainable outputs and confidence indicators.
- Create modular recommendation cards (makeup, hair, skincare) with CTA links.
- Build offline cache layer for last analysis + basic recommendations.
- Integrate subscription gating and upgrade UI (App Store / Play Store billing).

### Backend & APIs
- Create authentication (email/OTP + OAuth optional) and user profile service.
- Implement analysis API endpoints for selfie processing and feature extraction.
- Build recommendations service with rules engine + ML ranking.
- Add product catalog ingestion pipeline (brand, shade, type, image, retailer link).
- Build routine generator service and templates for common concerns.

### ML / AI
- Train face shape and undertone classifiers on diverse datasets.
- Develop feature mapping model (eyes, lips, brow, nose, cheekbones).
- Implement confidence scoring and model explainability summaries.
- Set up model monitoring for drift and bias audits.

### AR Try-On (Beta)
- Implement ARKit/ARCore overlays for lipstick, blush, eyeshadow.
- Create hair overlay assets and blending for realistic previews.
- Build performance gates and fallback to static previews on low-end devices.

### Infrastructure & DevOps
- CI pipeline for linting, unit tests, and mobile builds.
- Observability: logging, crash reporting, and performance monitoring.
- Secure storage for opt-in photo uploads with automatic expiry.

## Data Schemas (High-Level)

### users
- `id` (uuid)
- `email` (string)
- `display_name` (string)
- `created_at` (timestamp)
- `subscription_tier` (enum: free, premium)
- `preferences` (jsonb: skin concerns, hair texture, tone preference)

### selfies
- `id` (uuid)
- `user_id` (uuid, FK users)
- `image_url` (string, optional)
- `analysis_status` (enum: pending, complete, failed)
- `created_at` (timestamp)
- `deleted_at` (timestamp, nullable)

### analyses
- `id` (uuid)
- `selfie_id` (uuid, FK selfies)
- `face_shape` (enum)
- `skin_tone` (string)
- `undertone` (enum)
- `features` (jsonb: eye_shape, brow_type, lip_shape, cheekbones)
- `confidence` (jsonb)
- `created_at` (timestamp)

### products
- `id` (uuid)
- `brand` (string)
- `name` (string)
- `category` (enum: foundation, concealer, blush, lipstick, eyeshadow)
- `shade` (string)
- `tone_match` (jsonb: suitable_tones, undertones)
- `retailer_url` (string)
- `image_url` (string)

### recommendations
- `id` (uuid)
- `analysis_id` (uuid, FK analyses)
- `product_id` (uuid, FK products)
- `reason` (string)
- `rank` (int)
- `created_at` (timestamp)

### skincare_routines
- `id` (uuid)
- `user_id` (uuid, FK users)
- `concerns` (jsonb)
- `am_steps` (jsonb)
- `pm_steps` (jsonb)
- `created_at` (timestamp)

## Launch Planning Details

### Pre-Launch
- Finalize MVP scope and acceptance criteria.
- Complete privacy policy, consent language, and data retention policy.
- Build App Store / Play Store listings with screenshots and descriptions.
- Run internal alpha with 20–30 users; fix critical issues.

### Beta Launch
- Release to 300–500 users with TestFlight / Play Console.
- Collect feedback on accuracy and trust in recommendations.
- Track activation, retention, and conversion metrics.

### Public Launch
- Roll out regionally to validate performance and support.
- Partner with 1–2 brands for featured product recommendations.
- Launch marketing campaign focused on shade-matching confidence.

### Post-Launch
- Iterate models with user feedback and rating signals.
- Expand product catalog and hair style assets.
- Introduce routine tracking and seasonal trends.

## Wireframes (Low Fidelity)

### 1) Onboarding / Selfie Capture
```
+------------------------------------+
| GlowGuide                          |
| "Let’s find your glow"             |
| [ Camera View ]                    |
|                                    |
|  (Retake)        (Use Photo)       |
+------------------------------------+
```

### 2) Analysis Results
```
+------------------------------------+
| Your Results                       |
| Face Shape: Oval                   |
| Skin Tone: Medium (Warm)           |
| Features: Almond eyes, full lips   |
| [ View Makeup ]  [ View Hair ]     |
+------------------------------------+
```

### 3) Makeup Recommendations
```
+------------------------------------+
| Makeup Picks                       |
| Foundation: Brand X - Shade W320   |
| Lipstick: Brand Y - Peach Glow     |
| Blush: Brand Z - Coral Mist        |
| [ Try AR ]   [ Buy Links ]         |
+------------------------------------+
```

### 4) Hairstyle Suggestions
```
+------------------------------------+
| Hairstyles for Oval Faces          |
| - Textured Lob                     |
| - Long Layers                      |
| - Soft Curtain Bangs               |
| [ Preview ]                        |
+------------------------------------+
```

### 5) Skincare Routine
```
+------------------------------------+
| Skincare Routine                   |
| AM: Cleanser → Vit C → Moisturize  |
| PM: Cleanser → Retinol → Moisturize|
| [ Customize ]                      |
+------------------------------------+
```

## Technical Approach

### Tech Stack (Cross-Platform)
- **Mobile:** React Native (iOS + Android)
- **State management:** Redux Toolkit or Zustand
- **Backend:** Node.js + Express or NestJS
- **AI/ML:**
  - On-device: TensorFlow Lite (face landmarks, classification)
  - Cloud: Python (FastAPI) for heavier analysis
- **AR Try-On:**
  - iOS: ARKit
  - Android: ARCore
  - Unified overlays via a React Native AR bridge
- **Database:** PostgreSQL for users + product catalog; Redis for caching
- **Storage:** S3-compatible object storage for user photos (opt-in)

### ML Pipeline (High-Level)
1. **Selfie capture** → face detection → landmark extraction.
2. **Feature classification** (face shape, undertone, facial features).
3. **Recommendation engine** (rule-based + ML ranking).
4. **Feedback loop** using user ratings and engagement signals.

## Privacy & Safety
- **Explicit consent** before uploading photos.
- **Local processing** where possible; cloud only when needed.
- **Clear data controls:** delete selfies, opt-out of personalization.

## iOS / Android Deployment Plan
1. **MVP scope:** selfie analysis + basic recommendations (offline available).
2. **Beta:** AR try-on + subscription.
3. **App Store / Play Store** submission with privacy labels, data policy, and compliance checks.
4. **Monitoring:** Crashlytics + analytics.

## Roadmap
- **Phase 1:** Research + data collection + MVP build.
- **Phase 2:** AR try-on + premium subscription launch.
- **Phase 3:** Partner integrations with brands and retail links.

---
If you want, I can expand this further into detailed API contracts or a data labeling plan.
