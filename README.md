A React Native app to track, explore, and manage your favorite places. Includes authentication, favorites, place creation, and onboarding screens for first-time users.

Features

Authentication

Register new users

Login / logout

JWT token saved securely using Expo SecureStore

Onboarding

3 onboarding screens with GIFs and illustrations

Only shown on the first login

Places

Browse all saved places

Add new places with title, notes, visited date, and photo

Edit or delete places

Favorites

Mark places as favorite

View a separate favorites list

Screens

Onboarding Screens

Welcome

Browse & Favorites

Create & Explore

Authentication Screens

Login

Register

Main App Screens

Places List

Place Details

Create Place

Add Details

Edit Place

Favorites List

Tech Stack

Frontend: React Native + Expo

Navigation: React Navigation (Stack + Tabs)

Forms: React Hook Form

State Management: React Context + React Query (TanStack)

Storage: Expo SecureStore (JWT & user data)

GIF Support: react-native-fast-image

Backend: Your own deployed REST API

Installation

Clone the repository:

git clone https://github.com/yourusername/places-diary.git
cd places-diary

Install dependencies:

npm install

Start the Expo app:

npx expo start

Run on your device or simulator:

Scan the QR code in Expo Go

Or select iOS/Android simulator

Usage

On first launch

Onboarding screens appear with GIFs explaining features.

Register/Login

Register a new account or login.

Places

Browse places, mark favorites, create new ones.

Logout

Tap logout in the header of the main tabs.

Onboarding Logic

Onboarding screens are shown only once per user.

Completion is tracked in SecureStore or context (hasSeenOnboarding flag).

Users can navigate using Next/Get Started buttons.

Folder Structure
/src
 ├─ /screens
 │   ├─ Onboarding1.js
 │   ├─ Onboarding2.js
 │   ├─ Onboarding3.js
 │   ├─ LoginScreen.js
 │   ├─ RegisterScreen.js
 │   ├─ PlacesScreen.js
 │   └─ ...
 ├─ /context
 │   └─ AuthContext.js
 ├─ /hooks
 │   ├─ places/
 │   └─ auth/
 ├─ /navigation
 │   ├─ MainTabs.js
 │   ├─ PlacesStack.js
 │   └─ ...
 └─ /validation
     └─ passwordRules.js
Screenshots / GIFs

You can include your onboarding GIFs and screenshots here:

Onboarding GIF example:

Notes

JWT token is stored securely in Expo SecureStore.

Designed for seamless integration with your deployed backend.
