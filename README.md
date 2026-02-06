# Gym Tracker

A mobile application built with **React Native**, **Expo**, **NativeWind** (Tailwind CSS), and **Supabase**.

## Tech Stack

- **React Native** – Cross-platform mobile development
- **Expo** – Development framework and tooling
- **NativeWind** – Utility-first CSS (Tailwind) for React Native
- **Supabase** – Backend (Auth, Database, Storage, Realtime)

## Prerequisites

- Node.js 18+
- npm or yarn
- [Expo Go](https://expo.dev/go) app on your device (for testing)
- iOS Simulator or Android Emulator (optional)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Add your Supabase URL and anon/publishable key to `.env`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_project_url
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   ```

### 3. Run the app

```bash
npm start
```

Then:

- Press **i** for iOS simulator
- Press **a** for Android emulator
- Scan the QR code with Expo Go on your device

## Project Structure

```
gym_tracker/
├── App.tsx           # Root component
├── lib/
│   └── supabase.ts   # Supabase client
├── global.css        # Tailwind directives
├── assets/           # Images and static files
└── ...
```

## Using NativeWind

Use Tailwind classes via the `className` prop:

```tsx
<View className="flex-1 bg-slate-100 p-4">
  <Text className="text-lg font-bold text-slate-800">Hello</Text>
</View>
```

## Using Supabase

Import the client where needed:

```tsx
import { supabase } from './lib/supabase';

// Query data
const { data } = await supabase.from('your_table').select('*');

// Auth
const { data } = await supabase.auth.signInWithPassword({ email, password });
```

## Scripts

- `npm start` – Start Expo dev server
- `npm run ios` – Run on iOS
- `npm run android` – Run on Android
- `npm run web` – Run in web browser
