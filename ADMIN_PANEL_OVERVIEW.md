# Admin Panel Design Overview - Vimero (YouTube Clone)

This document provides a comprehensive overview of the current frontend UI architecture, components, and design patterns. It serves as a blueprint for extending the project into an Admin Panel.

## 1. Project Branding & Core Identity
- **Project Name**: Vimero (YouTube Clone)
- **Primary Accent Color**: `#0493D1` (Used for active states, hover effects, and primary buttons)
- **Design Mode**: Strict **Light Mode** (Optimized for readability and professional aesthetics)
- **Typography**: Geist Sans & Geist Mono (Modern, clean, and developer-friendly)

## 2. Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4 (Utilizing the latest `@theme` block and utility layers)
- **Icons**: Lucide React
- **Logic**: Client-side state management using React Hooks (`useState`, `useEffect`, `useContext`)

## 3. UI Component Library
The following components are designed to be reusable for the Admin Panel:

### Navigation Syst   ems
- `Navbar.tsx`: Features a responsive search bar, mobile-first search overlay, and profile management.
- `Sidebar.tsx`: Adapts from a permanent desktop sidebar to a mobile overlay. Includes active state highlighting with `bg-accent/10` and `text-accent`.
- `BottomNav.tsx`: Tab-based navigation optimized for mobile touch interactions.

### Video & Content Display
- `VideoCard.tsx`: Grid-ready card component with simplified metadata display and touch-friendly context menus.
- `ShortsPlayer.tsx`: Vertical video player with interaction overlays (Like, Comment, Share). Useful for managing "Short-form" content analytics.
- `VideoPlayer.tsx`: Custom-built HTML5 video controls with settings, playback speed, and fullscreen support.

### Interactive Elements
- `ActionButtons.tsx`: A horizontally scrollable interaction bar for video-specific actions.
- `ShareModal.tsx`: A premium sharing interface with one-tap link copying and social integration.
- `ThemeProvider.tsx`: Centralized theme control, currently locked to light mode to maintain brand consistency.

## 4. Data Models (Core Objects)
The admin panel should be built to manage these existing data structures:

### Video Object
```typescript
interface Video {
    id: string;
    title: string;
    thumbnail: string;
    channelId: string;
    views: string;
    uploadedAt: string;
    duration: string;
    description: string;
    videoUrl: string;
    category: string;
}
```

### Short Object
```typescript
interface ShortVideo {
    id: string;
    videoUrl: string;
    thumbnail: string;
    channelName: string;
    channelAvatar: string;
    description: string;
    likes: number;
    comments: number;
    audioTrack: string;
}
```

## 5. Potential Admin Panel Roadmap

### Proposed Admin Layouts
1. **Dashboard Home**: Use the existing `Grid` patterns from the home page to display "Analytics Cards" (Total Views, New Subscribers, Revenue).
2. **Content Management**:
    *   A list view (similar to the Search results page) for bulk editing videos.
    *   Integrated `ActionButtons` for quick actions (De-list, Edit, Analytics).
3. **Upload Workflow**: Use the existing `Modal` system from `ShareModal.tsx` to build an upload wizard.
4. **Branding Settings**: A dedicated page to update the `--accent` color variable across the site.

## 6. Implementation Notes for Developer
- **Responsive Layout**: Always maintain the `max-w-full overflow-x-hidden` patterns established in `layout.tsx` to prevent zoom-out issues on mobile.
- **Micro-interactions**: Use the `transition-all duration-200` and `hover:scale-105` patterns for interactive elements to keep the UI feeling "alive".
- **Global Pointer**: Ensure all new buttons use the global `cursor: pointer` rule defined in `globals.css`.
