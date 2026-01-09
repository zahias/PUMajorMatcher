# PU Major Compass Application

## Overview

This is a full-stack web application called "PU Major Compass" that helps high school students discover their ideal undergraduate major at Phoenicia University through an interactive quiz assessment. The application uses a modern React frontend with a Node.js/Express backend, implementing a category-based matching algorithm to recommend university majors based on user responses.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2026)

- **Renamed**: App renamed from "Major Matcher" to "Major Compass"
- **New Quiz Format**: 15 multiple-choice questions with 6 options each (A-F)
- **Simplified Algorithm**: Letter-counting system instead of weighted keywords
- **User Info Collection**: Form collects name, phone, email, high school before quiz
- **Disclaimers**: Instructions shown before quiz starts
- **Category Mapping**: Each letter maps to a major category (A→Business, B→Communication, C→CS/Engineering, D→Architecture, E→Health Sciences, F→Law)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with Phoenicia University branding (navy blue HSL 220, gold)
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
- **User Info Form**: Collects full name, contact number, email, and high school
- **Disclaimers Screen**: Shows instructions before quiz starts
- **15 MCQ Questions**: Each with 6 options (A-F) mapping to major categories
- **Progress Tracking**: Visual progress bar with question navigation
- **Answer Persistence**: Local state with ability to go back/forward

### Major Matching Algorithm
- **Simple Counting**: Counts how many times each letter (A-F) was selected
- **Category Mapping**:
  - A → Business Administration
  - B → Communication & Media
  - C → Computer Science / Engineering
  - D → Architecture
  - E → Health Sciences (Nursing, Public Health, Speech Therapy)
  - F → Law
- **Percentage Calculation**: Based on count / total questions
- **Reason Generation**: Personalized explanations based on matched category

### Shareable Badge
- **html2canvas Export**: Creates 1080x1350px shareable images
- **Social Media Ready**: Designed for Instagram, Facebook, Twitter, WhatsApp
- **Personalized**: Shows user's name and top 3 matches

### Data Models
- **Major Categories**: Letter-based categories with name, icon, college, and majors array
- **Quiz Answers**: Question ID and selected letter value
- **User Info**: Full name, contact number, email, high school
- **Quiz Results**: User info, answers, top matches, scores, timestamps

## Data Flow

### Quiz Flow
1. User starts on hero page with university branding
2. User fills out personal information form
3. Disclaimers screen explains quiz instructions
4. Quiz loads 15 questions sequentially with progress tracking
5. Answers are stored locally during quiz progression
6. Upon completion, algorithm counts letter selections
7. Results show top matched categories ranked by count
8. User can create and download shareable badge
9. Quiz results are persisted to database

### API Data Flow
- `POST /api/quiz-results` - Saves completed quiz results with user info

### State Management
- **App State**: Controls view state (hero, quiz, results) and stores answers/userInfo
- **Quiz State**: Manages current question, answers, and step (info, disclaimers, quiz)
- **Local State**: React hooks for UI interactions

## File Structure

### Key Files
- `client/src/lib/quizData.ts` - 15 questions and 6 major categories
- `client/src/lib/matchingAlgorithm.ts` - Letter-counting algorithm
- `client/src/components/UserInfoForm.tsx` - Pre-quiz user info collection
- `client/src/components/QuizQuestion.tsx` - Question display with 6 options
- `client/src/pages/quiz.tsx` - Quiz flow with info, disclaimers, and questions
- `client/src/pages/results.tsx` - Results display with matches and badge
- `client/src/components/ShareBadge.tsx` - Shareable badge generator
- `client/src/App.tsx` - Main app with routing and state management
- `client/src/components/Hero.tsx` - Landing page hero section

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Query for state management
- **Build Tools**: Vite, TypeScript, ESBuild for production builds
- **Database**: Drizzle ORM, @neondatabase/serverless for PostgreSQL connection

### UI/UX Dependencies
- **Component Library**: Radix UI primitives for accessible base components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Animation**: Framer Motion for smooth transitions
- **Badge Export**: html2canvas for shareable image generation
- **Icons**: Lucide React for UI icons

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
