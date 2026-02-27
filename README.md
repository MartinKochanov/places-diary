# 📱 Place Diary Mobile

## Overview
A feature-rich **React Native** application built with **Expo** to track, explore, and manage your favorite places. This frontend integrates seamlessly with the Place Diary Backend to provide a secure, persistent, and visually engaging user experience.

---

## ⚙️ Tech Stack
* **Framework:** React Native + Expo
* **Navigation:** React Navigation (Stack + Tabs)
* **Forms:** React Hook Form
* **State Management:** React Context + React Query (TanStack)
* **Storage:** Expo SecureStore (JWT & user data persistence)
* **Media:** `react-native-fast-image` (GIF & high-performance image support)

---

## 📦 Features

### 🔐 Authentication
* **Onboarding:** 3-screen walkthrough with interactive GIFs and illustrations (shown only on first-time login).
* **Identity:** Full Register, Login, and Logout flows.
* **Security:** JWT tokens are stored securely using **Expo SecureStore**.

### 📍 Places Management
* **Browse:** View all saved locations in a clean, list-based UI.
* **Create:** Add new places with titles, custom notes, visited dates, and photos.
* **Modify:** Full Edit and Delete capabilities for existing entries.

### ❤️ Favorites
* **Quick Save:** One-tap marking of places as favorites.
* **Filtered View:** Dedicated favorites list for your top-tier locations.

---

## 📱 Screens Reference

| Group | Screens |
| :--- | :--- |
| **Onboarding** | Welcome, Browse & Favorites, Create & Explore |
| **Authentication** | Login, Register |
| **Main App** | Places List, Place Details, Favorites List |
| **Creation Flow** | Create Place, Add Details, Edit Place |

---

## 🚀 Installation & Setup

### Prerequisites
* **Node.js** (LTS version)
* **Expo Go** app installed on your physical device (iOS/Android) or an Emulator.

### Steps
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/places-diary.git](https://github.com/yourusername/places-diary.git)
    cd places-diary
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Endpoint:**
    Update your configuration file (e.g., `api.js` or `.env`) to point to your deployed backend URL.

4.  **Start the Expo app:**
    ```bash
    npx expo start
    ```

5.  **Run on your device:**
    * Scan the QR code in the terminal using the **Expo Go** app.
    * Press `i` for iOS simulator or `a` for Android emulator.

---

## 💡 Usage & Logic

### Onboarding Flow
The app uses a `hasSeenOnboarding` flag stored in **SecureStore**. 
* **New Users:** Guided through the Welcome, Browse, and Create walkthroughs.
* **Returning Users:** Directed straight to the Login/Main screen.

### State Persistence
User sessions are managed via **React Context**, ensuring the app knows your authentication status immediately upon launch without flickering.

---

## 🖼️ Screenshots / GIFs
> *Add your visual assets here to showcase the UI*

![Onboarding Example](https://via.placeholder.com/300x600?text=Onboarding+GIF+Placeholder)

---

## 👨‍💻 Author
**Martin Kochanov** – Software University – 2026
