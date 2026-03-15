A modern, performance-optimized image gallery built with React.js and Tailwind CSS. This application integrates with the Picsum Photos API to provide a seamless browsing experience with local persistence.

✨ Key Features
Custom Data Fetching: Implements a robust custom hook (useFetchPhotos) to handle asynchronous API calls and state management.

Persistent Favorites: Uses useReducer and useEffect to manage a "Favorites" list that persists across browser sessions via localStorage.

Optimized Search: Features a real-time search bar that filters images by author, utilizing useMemo to prevent unnecessary re-computations.

State Management: Employs useReducer for complex state logic (adding/removing favorites) and useCallback for stable event handlers.

Responsive Design: A fully responsive grid layout (1 column on mobile, up to 4 on desktop) built using Tailwind CSS.

UX Focused: Includes a custom animated spinner for loading states and graceful error handling.

🛠️ Tech Stack
Framework: React (Vite/CRA)

Styling: Tailwind CSS

Hooks Used: useReducer, useMemo, useCallback, useState, useEffect.

API: https://picsum.photos/v2/list?limit=30
