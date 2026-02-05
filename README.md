# GlowGuide

GlowGuide is a cross-platform mobile beauty advisor designed for women to upload selfies and receive personalized beauty recommendations powered by AI. This repository now includes:

- A React Native app scaffold (`src/GlowGuideApp.jsx`) for iOS and Android.
- Product and UX planning documents.
- Wireframes and phased implementation guidance.

## Core Product Vision

GlowGuide helps users confidently choose beauty products and routines by combining:

1. **Face & feature analysis** (face shape, skin tone, undertone, facial features).
2. **Actionable recommendations** (makeup products by brand/shade/type with purchase links).
3. **Hairstyle suggestions** (tailored to face shape + hair texture).
4. **Skincare routines** (based on user-entered concerns and skin profile).
5. **AR try-on** for makeup and hairstyle preview.
6. **Offline basics** for saved routines and cached recommendation snapshots.
7. **Premium subscription** for advanced AI insights and unlimited recommendations.

## Recommended Tech Stack

### Mobile App
- **React Native + Expo** for cross-platform delivery.
- **React Navigation** for stack/tab navigation.
- **react-native-mmkv** or **AsyncStorage** for local/offline persistence.

### AI / ML Services
- **Face landmark & detection**: MediaPipe Face Mesh or cloud inference endpoint.
- **Skin tone/undertone classifier**: custom model served via FastAPI.
- **Recommendation ranking model**: gradient boosted trees or neural ranking on user/profile + catalog metadata.
- **Skincare guidance engine**: rules + model hybrid using structured concerns.

### AR Try-On
- **Camera pipeline**: Expo Camera / Vision Camera.
- **AR rendering**: Banuba / Snap Camera Kit / custom OpenCV + landmarks pipeline.

### Backend
- **Node.js or FastAPI** microservices.
- **PostgreSQL** for users/subscriptions/catalog.
- **Redis** for recommendation caching.
- **Object storage** (S3-compatible) for selfie uploads.

### Payments & Subscription
- **RevenueCat** to unify iOS/Android in-app subscriptions.

## Deployment Plan (iOS + Android)

1. Start with Expo managed workflow.
2. Connect Firebase Auth or Supabase Auth for sign-in.
3. Integrate RevenueCat entitlements for free vs premium gating.
4. Build with EAS:
   - `eas build --platform ios`
   - `eas build --platform android`
5. Distribute internal builds via TestFlight + Play Internal Testing.
6. Roll out gradually with crash/perf telemetry (Sentry + Firebase Analytics).

## Product Phases

### Phase 1 (MVP)
- Selfie upload + baseline AI analysis response.
- Makeup recommendations + purchase links.
- Skin concern input + daily skincare routine cards.
- Basic offline cache for last analysis + routines.

### Phase 2
- AR try-on for lipstick/foundation + hairstyle overlays.
- Personalized feed based on engagement and saves.
- Premium subscription tier with unlimited analyses.

### Phase 3
- Continuous learning loop from user feedback.
- Advanced premium recommendations and seasonal trend packs.
- Regional catalog + multilingual experience.

## Wireframes

See [`docs/wireframes.md`](docs/wireframes.md) for first-pass mobile wireframes.

## Starter App Scaffold

See [`src/GlowGuideApp.jsx`](src/GlowGuideApp.jsx) for the React Native starter implementation.
