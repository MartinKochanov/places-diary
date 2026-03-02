# React Native – Exam Project - 📱 Place Diary Mobile

## 1. Project Overview

**Application Name:** Place Diary

**Application Category / Topic:** Travel

**Link to the android apk file:** https://drive.google.com/file/d/13mifk8YYbhC9fcZn6nC48aG5ObMd_Q77/view?usp=sharing

**Main Purpose:**
Place Diary is a mobile application that allows users to track, explore, and manage their favorite places they have visited. Users can save locations with photos, notes, and visit dates, mark places as favorites, and view them on an interactive map. The app helps users create a personal diary of memorable locations.

---

## 2. User Access & Permissions

### Guest (Not Authenticated)
An unauthenticated user can access:
- **Login Screen** – Enter credentials to access the app
- **Register Screen** – Create a new account with email and password

### Authenticated User
A logged-in user can access:
- **Main sections / tabs:**
  - Places Tab – Browse all saved places with country filtering
  - Favourites Tab – View places marked as favorites
- **Details screens:**
  - Place Details Screen – View full details of a place including photo, notes, location on map
- **Create / Edit / Delete actions:**
  - Create new places with location picker, photo, notes, and visit date
  - Edit existing place details (title, notes, photo, date)
  - Delete places with confirmation dialog
  - Toggle favorite status on any place

---

## 3. Authentication & Session Handling

### Authentication Flow
1. **App start:** The app checks for a stored JWT token in Expo SecureStore
2. **Authentication status check:** If a token exists, the app calls the `/auth/me` endpoint to validate it and retrieve user data
3. **Successful login/registration:** 
   - JWT token is stored securely in SecureStore
   - User data is saved in React Context
   - Navigation switches to Onboarding (first time) or Main app
4. **Logout:** 
   - Token is deleted from SecureStore
   - User state is cleared
   - Navigation returns to Login screen

### Session Persistence
- **Storage method:** JWT token stored using `expo-secure-store`
- **Automatic login:** On app restart, the stored token is retrieved and validated via the `/auth/me` API call. If valid, the user is automatically logged in without re-entering credentials.

---

## 4. Navigation Structure

### Root Navigation Logic
Navigation is conditionally rendered based on authentication and onboarding status:
- **Not authenticated** → `AuthStack` (Login, Register screens)
- **Authenticated but not onboarded** → `OnboardingStack` (3-screen walkthrough)
- **Authenticated and onboarded** → `MainTabs` (Main application)

Additionally, if the device is offline, an `OfflineScreen` is displayed.

### Main Navigation
The main navigation consists of **2 bottom tabs**:
1. **Places Tab** – Stack navigator for browsing and managing places
2. **Favourites Tab** – Stack navigator for viewing favorite places

### Nested Navigation
There is nested navigation (Stack inside each Tab):

**PlacesStack:**
- PlacesList – Main list of all places
- PlaceDetails – Detailed view of a single place
- CreatePlace – Map-based location picker
- AddDetails – Form to add title, notes, photo, date
- EditPlace – Form to edit existing place

**FavouritesStack:**
- FavouritesList – List of favorite places
- PlaceDetails – Detailed view of a favorite place

---

## 5. List → Details Flow

### List / Overview Screen
- **Data displayed:** List of places showing image, title, city, country, and favorite status
- **User interaction:** 
  - Tap on a place card to view details
  - Pull-to-refresh to reload data
  - Filter by country using a dropdown picker
  - Infinite scroll pagination for large datasets
  - Tap "+" button to create a new place

### Details Screen
- **Navigation trigger:** User taps on a `PlaceCard` component in the list
- **Route parameters:** The `placeId` is passed via navigation params: `navigation.navigate("PlaceDetails", { placeId: place.id })`
- **Data fetching:** The details screen uses `usePlace(placeId)` hook to fetch full place data

---

## 6. Data Source & Backend

**Backend Type:** Real backend

The application uses a custom REST API backend deployed on Render.com:
- **Base URL:** `https://placec-diary-be.onrender.com/api/v1/`
- **Authentication:** JWT-based bearer token authentication
- **External APIs:** LocationIQ for geocoding and place search

---

## 7. Data Operations (CRUD)

### Read (GET)
- **Places list:** `GET /places` – Fetched in `PlacesScreen` with pagination and country filter
- **Single place:** `GET /places/:id` – Fetched in `PlaceDetailsScreen`
- **Favorites:** `GET /places?isFavourite=true` – Fetched in `FavouritePlacesScreen`
- **Countries:** `GET /places/countries` – Fetched for the filter dropdown

### Create (POST)
- **How:** User navigates to CreatePlace screen, selects location on map or via search, then fills out the AddDetails form with title, notes, photo, and visit date
- **Endpoint:** `POST /places`

### Update (PATCH)
- **Edit place:** User taps edit icon on PlaceDetails, modifies fields in EditPlace screen
- **Toggle favorite:** User taps heart icon on PlaceDetails
- **Endpoint:** `PATCH /places/:id`
- **UI update:** React Query automatically invalidates and refetches the places list

### Delete (DELETE)
- **How:** User taps trash icon on PlaceDetails, confirms in alert dialog
- **Endpoint:** `DELETE /places/:id`
- **UI update:** User is navigated back to list, React Query refetches data

---

## 8. Forms & Validation

### Forms Used
1. **Register Form** – Create new user account
2. **Login Form** – Authenticate existing user
3. **Add Details Form** – Add information when creating a place
4. **Edit Place Form** – Modify existing place information

### Validation Rules

**Email field (Register Form):**
- Required: "Email is required"
- Pattern: Must match email format (`/^\S+@\S+\.\S+$/`) – "Invalid email address"

**Password field (Register Form) – Multiple validation rules:**
- Required: "Password is required"
- Minimum length: 8 characters – "Password must be at least 8 characters"
- Maximum length: 20 characters – "Password must be at most 20 characters"
- Must contain lowercase letter – "Must contain a lowercase letter"
- Must contain uppercase letter – "Must contain an uppercase letter"
- Must contain digit – "Must contain a digit"
- Must contain special character – "Must contain a special character"
- Must not contain spaces – "Must not contain spaces"

**Title field (Add/Edit Place Form):**
- Required and length: 1-50 characters – "Title must be between 1 and 50 characters"

**Notes field (Add/Edit Place Form):**
- Required: "Description is required"

**Date Visited field (Add/Edit Place Form):**
- Cannot be in the future – "Date cannot be in the future"

---

## 9. Native Device Features

### Used Native Feature(s)
1. **Location / Maps**
2. **Image Picker**

### Usage Description

**Location / Maps (`expo-location` + `react-native-maps`):**
- **Where used:** CreatePlace screen and PlaceDetails screen
- **Functionality:** 
  - Requests user's current location permission
  - Gets current GPS coordinates and displays on map
  - Allows users to tap on map to select a location
  - Performs reverse geocoding to get address from coordinates
  - Displays saved place location with a marker on the details screen

**Image Picker (`expo-image-picker`):**
- **Where used:** AddDetails screen and EditPlace screen
- **Functionality:**
  - Requests media library permissions
  - Opens device photo gallery for image selection
  - Allows users to attach a photo to their place entry
  - Displays selected image preview before saving

---

## 10. Typical User Flow

1. **Launch app** – User opens the app and sees the Login screen (or is auto-logged in if session exists)
2. **Register/Login** – New users create an account; returning users enter credentials
3. **Onboarding** – First-time users see a 3-screen walkthrough with animations explaining app features
4. **Browse places** – User views their saved places in a scrollable list, can filter by country
5. **View details** – User taps a place to see full details including photo, notes, and map location
6. **Create new place** – User taps "+" button, searches or selects location on map, adds details and photo
7. **Mark favorite** – User taps heart icon on a place to add it to favorites
8. **Edit/Delete** – User modifies place details or removes a place from their collection
9. **Logout** – User logs out, returning to the login screen

---

## 11. Error & Edge Case Handling

### Authentication Errors
- Invalid login credentials show an alert: "Login failed – Invalid email or password"
- Session restore failure silently clears the invalid token and redirects to login
- Registration errors are logged and the user remains on the register screen

### Network / Data Errors
- **Offline detection:** The app uses `@react-native-community/netinfo` to detect network status
- **Offline screen:** When offline, a dedicated screen is shown with "No Connection" message and wifi-off icon
- **API errors:** Places screen shows error message with "Tap to retry" option
- **Details error:** Shows "Failed to load place" message

### Empty / Missing Data States
- **Empty places list:** Shows `EmptyState` component with icon and message: "No Places Found – Start by adding your first place!"
- **Empty filtered results:** Shows contextual message: "We couldn't find any places in [country]. Try a different location!"
- **Empty favorites:** Shows empty state encouraging user to mark places as favorites
- **Refresh option:** Pull-to-refresh and retry buttons available on list screens
