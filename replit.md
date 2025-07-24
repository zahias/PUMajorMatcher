# Major Matching Quiz Application

## Overview

This is a full-stack web application that helps students discover their ideal major at Phoenicia University through an interactive quiz system. The application uses a modern React frontend with a Node.js/Express backend, implementing a sophisticated matching algorithm to recommend university majors based on user preferences and interests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query (TanStack Query) for server state and local React state
- **Animations**: Framer Motion for smooth transitions and micro-interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Logging**: Custom request/response logging with duration tracking

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Management**: Type-safe schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Quiz System
- **Interactive Questions**: Multiple choice and slider-based questions with weighted scoring
- **Progress Tracking**: Visual progress indicators with question navigation
- **Answer Persistence**: Session-based answer storage with ability to go back/forward
- **Matching Algorithm**: Sophisticated keyword and weight-based major matching system

### Major Matching Engine
- **Scoring System**: Multi-factor scoring based on keywords, interests, and weighted preferences
- **Result Ranking**: Percentage-based matching with detailed reasoning
- **Session Management**: Unique session IDs for tracking quiz attempts
- **Result Storage**: Persistent storage of quiz results and top matches

### Data Models
- **Majors**: University programs with metadata (name, college, description, careers, keywords)
- **Quiz Results**: User answers, calculated matches, scores, and timestamps
- **Validation**: Zod schemas for runtime type checking and API validation

### UI Components
- **Design System**: Consistent component library with Phoenicia University branding
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: ARIA-compliant components with keyboard navigation support
- **Animations**: Smooth transitions between quiz states and result displays

## Data Flow

### Quiz Flow
1. User starts on hero page with university branding
2. Quiz component loads questions sequentially with progress tracking
3. Answers are validated and stored locally during quiz progression
4. Upon completion, matching algorithm calculates compatibility scores
5. Results are displayed with ranked major recommendations
6. Quiz results are persisted to database with session tracking

### API Data Flow
- `GET /api/majors` - Fetches all available university majors
- `GET /api/majors/:key` - Retrieves specific major details
- `POST /api/quiz-results` - Saves completed quiz results
- `GET /api/quiz-results/:sessionId` - Retrieves historical quiz results

### State Management
- **Server State**: React Query manages API calls with caching and background updates
- **Local State**: React hooks for quiz progression, current answers, and UI state
- **Session State**: Temporary storage for quiz answers before final submission

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Query for state management
- **Build Tools**: Vite, TypeScript, ESBuild for production builds
- **Database**: Drizzle ORM, @neondatabase/serverless for PostgreSQL connection

### UI/UX Dependencies
- **Component Library**: Radix UI primitives for accessible base components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Animation**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with Zod resolvers for validation

### Development Tools
- **Validation**: Zod for schema validation and type safety
- **Date Handling**: date-fns for date formatting and manipulation
- **Utilities**: clsx for conditional class names, nanoid for unique IDs

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite development server with React Fast Refresh
- **TypeScript**: Strict type checking with path aliases for clean imports
- **Database**: Local PostgreSQL connection via DATABASE_URL environment variable

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles Node.js server to `dist/index.js`
- **Single Deployment**: Combined frontend and backend deployment
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection

### Build Scripts
- `npm run dev` - Development server with hot reloading
- `npm run build` - Production build for both frontend and backend
- `npm run start` - Production server startup
- `npm run db:push` - Database schema synchronization

The application follows a monorepo structure with shared TypeScript types and schemas, enabling type safety across the full stack while maintaining clear separation between frontend and backend concerns.