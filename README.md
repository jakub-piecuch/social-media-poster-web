# Social Media Poster - Application Summary

## Project Overview
Social Media Poster is a Next.js application that allows users to create, schedule, and manage social media posts across different platforms. The application functions as an automation system that runs multiple "bot" accounts on a schedule, generating traffic in Facebook groups through comments and posts.

## Technical Stack
- **Frontend**: Next.js with React 19
- **Backend**: Next.js API routes (backend for frontend)
- **Database**: MongoDB v7.0
- **Authentication**: NextAuth.js with Facebook OAuth
- **Containerization**: Docker

## Key Features
- Management of social media bot accounts
- Facebook API integration for automated interactions
- OAuth-based authentication for Facebook accounts
- Secure token management and refresh mechanisms
- Domain-driven design for scalable architecture

## Project Structure

### Package Structure
```
social-media-poster/
├── src/                       # Main source code
│   ├── app/                   # Frontend package
│   │   ├── api/               # Backend API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── facebook-accounts/ # Facebook account management
│   │   │   ├── facebook-api/  # Facebook Graph API services
│   │   │   └── social-media-user/ # Social media user management
│   │   ├── components/        # UI components
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Shared utilities
│   ├── errors/                # Error handling infrastructure
│   ├── lib/                   # Core libraries (MongoDB, etc.)
│   └── auth.ts                # NextAuth configuration
└── public/                    # Static assets
```

## Architecture Details

### Domain-Driven Design
The application follows domain-driven design principles with clear separation of concerns:
- **Controllers**: Handle HTTP requests/responses and parameter validation
- **Services**: Contain business logic and orchestrate operations
- **Repositories**: Abstract database operations
- **Models**: Define domain entities and data structures

### Facebook API Integration
The Facebook API integration provides a comprehensive set of features:

#### Data Model
```typescript
interface FacebookAuthData {
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
  scopes: string[];
  facebookUserId: string;
  isActive: boolean;
}
```

#### Authentication Flow
1. Admin users log in to the application using NextAuth
2. Admin initiates Facebook account addition via `/api/auth/facebook/initiate`
3. User is redirected to Facebook for authorization
4. Facebook redirects to our callback URL
5. Callback exchanges the authorization code for an access token
6. The system creates a new Facebook account in the database
7. Tokens are securely stored and refreshed as needed

#### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/facebook/initiate` | Initiates Facebook OAuth flow |
| GET | `/api/auth/facebook/callback` | Handles OAuth callback |
| GET | `/api/facebook-api` | Lists all Facebook accounts |
| POST | `/api/facebook-api` | Creates a new Facebook account |
| GET | `/api/facebook-api/[id]` | Gets a specific Facebook account |
| PATCH | `/api/facebook-api/[id]` | Updates account status |
| DELETE | `/api/facebook-api/[id]` | Deletes a Facebook account |

#### Core Services
- **FacebookApiService**: Handles all interactions with the Facebook Graph API
- **FacebookAccountService**: Manages Facebook account operations within our system
- **SocialMediaUserRepository**: Provides data access layer for all social media accounts

### Error Handling
The application implements a robust error handling system:
- Custom exception classes for different error types
- Consistent error response format
- Domain-specific exceptions for better error identification

## MongoDB Structure
- Collections follow domain-driven design
- Indexes for optimal query performance
- Compound indexes to ensure data integrity

## Environment Configuration
The following environment variables are required:
```
# MongoDB Connection
MONGODB_URI=mongodb://root:rootpassword@localhost:27017/social-media-poster

# NextAuth Secret
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Facebook API
FACEBOOK_CLIENT_ID=your_facebook_app_id_here
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/auth/callback/facebook
FACEBOOK_API_VERSION=v22.0
```

## Docker Setup
- MongoDB container for development and production
- Docker Compose for orchestration
- Volume mapping for data persistence

## Getting Started
1. Clone the repository
2. Create a `.env.local` file with the required environment variables
3. Start the MongoDB container with Docker Compose:
   ```
   docker-compose up -d mongodb
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Run the development server:
   ```
   npm run dev
   ```

## Future Development
- **Bot Scheduling System**: Implementation of automated scheduling for bot actions
- **Frontend Dashboard**: User interface for managing bot accounts and activities
- **Analytics**: Reporting on bot performance and engagement metrics
- **Multi-platform Support**: Extending to other social media platforms beyond Facebook