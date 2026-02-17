# Frontend Project Overview - Vimero (YouTube Clone)

## 1. Introduction
**Vimero** is a high-fidelity YouTube clone built with React 19 and Next.js 16. The project focuses on a premium, mobile-first user experience, featuring a custom video player, vertical shorts viewer, and a unified design system.

## 2. Branding & Design System
- **Branding**: The application is branded as "Vimero" using a custom logo (`/logo.png`).
- **Accent Color**: Primary branding uses `#0493D1`. This color is globally applied to:
    - Active navigation states.
    - Button hover effects.
    - Interaction highlights (Like/Dislike).
    - Progress bars and links.
- **Theme**: Strictly **Light Mode** for a clean, professional aesthetic.
- **Micro-interactions**: Subtle scales, transitions, and hover effects are implemented across all interactive elements to provide a premium feel.
- **Global Cursor**: Every button and link is configured with a `cursor: pointer` for consistent desktop feedback.

## 3. Technology Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components).
- **Library**: [React 19](https://react.dev/).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with the new `@theme` configuration.
- **Icons**: [Lucide React](https://lucide.dev/).
- **Utilities**: `clsx` for conditional styling and standard React Hooks for state/context management.

## 4. Key UI Components

### Navigation
- **Navbar**: Sticky top navigation with desktop search, mobile search overlay, and user profile.
- **Sidebar**: Collapsible drawer for desktop featuring categorized navigation and subscription mockups.
- **BottomNav**: Mobile-only fixed navigation bar for quick access to Home, Shorts, Subscriptions, and Library.

### Media Experience
- **VideoPlayer**: Custom HTML5 controller with:
    - Play/Pause, Mute/unmute, and Fullscreen.
    - Custom-styled progress bar and volume slider.
    - Speed and quality settings menu.
- **ShortsPlayer**: A scroll-friendly vertical video player optimized for portraits, featuring intersection observers for auto-play and custom "More" options.
- **VideoCard**: Premium thumbnail display with hover-to-play hints and quick "Watch Later" integration.

### Interaction & Feedback
- **ActionButtons**: Standardized interaction bar for Liked/Disliked states, Download tracking, and Share triggers.
- **ShareModal**: A clean, animated modal for copying video links and social sharing.
- **CategoryFilter**: Horizontally scrollable chips for refining home page content.

## 5. Application Architecture

### Page Directory
- `app/page.tsx`: Main video feed with category filtering.
- `app/watch/[id]`: Interactive watch page with recommendations and description.
- `app/shorts`: Vertical feed for short-form content.
- `app/search`: Dynamic search results with query parameter handling.
- `app/library` / `app/history` / `app/liked`: User-specific content management sections.

### State & Context Management
- **SidebarProvider**: Manages the open/collapsed state of the global sidebar.
- **ThemeProvider**: Enforces light mode and provides theme context.
- **LikedVideosProvider**: Global state tracking for liked content.
- **WatchLaterProvider**: Global state tracking for saved videos.

## 6. Development & Deployment
- **Local Dev**: `npm run dev`
- **Responsive Design**: Uses Tailwind's breakpoint system (`sm`, `md`, `lg`) to adapt seamlessly from mobile to ultrawide displays.
- **Performance**: Optimized with Next.js Image components and effective hydration strategies.
