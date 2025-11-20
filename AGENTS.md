# AGENTS.md - Project N.A.L.A. Development Log

## Overview
Project N.A.L.A. (Network-Assisted Lost Animal) is a pet finder platform designed to help reunite lost pets with their owners through a community-driven approach with geolocation features.

## Recent Updates

### 2025-11-20: Initial MVP Scaffold

**Commit**: `17422d4` - Add NALA MVP scaffold

A complete MVP implementation was created to establish the foundation of Project N.A.L.A. This includes all core features needed for a functional pet finder application.

#### Core Features Implemented

1. **Data Layer**
   - Mock data system with 3 users and 5 pets (including featured pet "Nala")
   - User profiles with trust scores and verification status
   - Pet records with lost/found/safe status tracking
   - Geolocation data (latitude/longitude) for all pets
   - PostgreSQL schema with PostGIS extension for geospatial queries

2. **Pages & Navigation**
   - **Landing Page**: Entry point for the application
   - **Dashboard**: Main view showing nearby pets with map simulator
   - **Report Wizard**: Form for reporting lost or found pets
   - **Chat System**: Messaging between pet owners and finders
   - **Layout Component**: Consistent navigation with bottom nav bar

3. **UI/UX Components**
   - Pet cards displaying status, location, breed, and reward information
   - Map visualization with radius indicator and location pins
   - Dark mode toggle for accessibility
   - Bottom navigation for mobile-first design
   - Responsive grid layout for pet listings

4. **Anti-Fraud Features**
   - Trust score system for users (0-100 scale)
   - User verification badges
   - Anti-fraud banner in chat interface warning about payment scams
   - Flagging system for suspicious messages (schema level)

5. **Database Schema**
   - **Users Table**: ID, name, email, trust score, verification status, avatar
   - **Pets Table**: ID, name, breed, status, description, photo, reward, geolocation, owner reference
   - **Messages Table**: ID, pet reference, sender/receiver, content, flagging system
   - Spatial indexing with PostGIS for efficient geolocation queries
   - Helper functions for distance calculation and nearby pets search
   - Support for radius-based queries (default 10km)

#### Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom theme support
- **UI Components**: shadcn-ui + Radix UI primitives
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: TanStack React Query
- **Forms**: React Hook Form + Zod validation
- **Database**: PostgreSQL + PostGIS (schema defined, not yet connected)

#### Key Design Decisions

1. **Geolocation-First**: All pet records include precise lat/lng coordinates with PostGIS support for efficient spatial queries
2. **Trust-Based System**: User trust scores help identify reliable community members
3. **Mobile-First**: Bottom navigation and responsive design prioritize mobile UX
4. **Safety Features**: Anti-fraud warnings and message flagging to protect users
5. **Mock Data**: Initial implementation uses TypeScript mock data for rapid prototyping

#### File Structure

```
src/
├── components/
│   ├── Layout.tsx           # Main layout with bottom nav
│   ├── NavLink.tsx          # Navigation link component
│   ├── PetCard.tsx          # Pet listing card
│   └── ui/                  # shadcn-ui components
├── data/
│   └── mocks.ts             # Mock users and pets data
├── db/
│   └── schema.sql           # PostgreSQL + PostGIS schema
├── pages/
│   ├── Landing.tsx          # Landing page
│   ├── Dashboard.tsx        # Main dashboard with map
│   ├── Report.tsx           # Report lost/found wizard
│   ├── Chat.tsx             # Messaging interface
│   └── NotFound.tsx         # 404 page
├── App.tsx                  # Root component with routing
└── main.tsx                 # Entry point
```

#### Next Steps & Potential Improvements

Based on this MVP foundation, potential next steps include:

1. **Backend Integration**
   - Connect PostgreSQL database with PostGIS
   - Implement REST API or GraphQL endpoints
   - Set up authentication system

2. **Map Enhancement**
   - Integrate real map service (Google Maps, Mapbox, OpenStreetMap)
   - Display actual pet locations on interactive map
   - Implement radius filtering and clustering

3. **Real-Time Features**
   - WebSocket integration for live chat
   - Real-time notifications for nearby pets
   - Push notifications for status updates

4. **Advanced Features**
   - Image upload for pet photos
   - AI-powered pet matching (image recognition)
   - Advanced search and filtering
   - Social sharing capabilities
   - Reward payment integration

5. **Trust & Safety**
   - Enhanced verification system
   - Report and moderation tools
   - Community guidelines and policies
   - Automated fraud detection

## Development Notes

- **Lovable Integration**: Project uses Lovable for rapid prototyping with automatic Git commits
- **Type Safety**: Full TypeScript implementation with strict types
- **Accessibility**: Dark mode support and semantic HTML structure
- **Performance**: Spatial indexing ready for large-scale geolocation queries

## References

- **Lovable Project URL**: https://lovable.dev/projects/a17793de-2eea-4bff-8cee-2c2001f9f754
- **PostGIS Documentation**: For geospatial query optimization
- **React Query**: For future API integration and caching

---

*This file tracks significant changes and architectural decisions for Project N.A.L.A. It is maintained by AI agents and human developers collaborating on the project.*
