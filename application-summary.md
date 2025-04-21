# Social Media Poster - Application Summary

## Project Overview
Social Media Poster is a Next.js application that allows users to create, schedule, and manage social media posts across different platforms.
This will act like bunch of bots (fake social-media accounts) running on a schedule commenting posts and basically making traffic on the groups.

## Technical Stack
- **Frontend**: Next.js with React
- **Backend**: Next.js API routes (backend for frontend)
- **Database**: MongoDB v7.0
- **Containerization**: Docker

## Project Structure

### Package Structure
```
social-media-poster/
├── src/                       # Main source code
│   ├── app/                   # Frontend package
│   │   ├── components/        # Reusable UI components
│   │   │   ├── common/        # Common UI elements (buttons, inputs, etc.)
│   │   │   └── modules/       # Feature-specific components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Frontend utilities
│   │   ├── constants/         # Frontend constants
│   │   └── styles/            # Global styles
│   ├── api/                   # Backend API routes & backend packages
│   └── [routes]/              # App routes
all these below for api will be domain driven so each document stored in db will have its own package with all these
│       ├── controllers/       # Request handlers (similar to Spring controllers)
│       ├── services/          # Business logic layer
│       ├── models/            # Data models and schemas
│       ├── repositories/      # Data access layer
│       ├── utils/             # Backend utility functions
│       ├── middleware/        # API middleware
│       └── config/            # Application configuration
├── pages/                     # Next.js pages
└── public/                    # Static assets
```

## Architecture Details

### Frontend Architecture
- **Component Structure**: 
  - Clear separation between common UI elements and feature-specific modules
  - Each module has its own components, hooks, and types
  - Component composition pattern for reusability

- **State Management**:
  - React hooks for local state
  - Context API for shared state between components
  - Potential use of SWR or React Query for data fetching and caching

- **Routing**:
  - Next.js App Router for client-side navigation
  - Dynamic routes for feature-specific pages

### Backend Architecture
- **Layered Architecture** (inspired by Spring Boot):
  - **Controller Layer**: Handles HTTP requests and responses, parameter validation
  - **Service Layer**: Contains business logic, orchestrates operations
  - **Repository Layer**: Abstracts data access operations
  - **Model Layer**: Defines data structures and schemas

- **API Design**:
  - RESTful API design principles
  - Proper error handling and status codes
  - Authentication and authorization middleware

- **Documentation**:
  - do not add java docs   

### Database Structure
- MongoDB collections will follow domain-driven design principles
- Clear entity relationships and references
- Appropriate indexing for performance
- Data validation at schema level

## Docker Setup
- MongoDB container for development and production
- Separate containers for the application
- Docker Compose for orchestration
- Volume mapping for persistence

## Development Workflow
- Modular development approach
- Component-first development for frontend
- API-first development for backend features
- Integration testing for API endpoints

## Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure storage of credentials

## Docker Configuration
- MongoDB connection string: `mongodb://root:rootpassword@localhost:27017/`
- MongoDB container running on port 27017
