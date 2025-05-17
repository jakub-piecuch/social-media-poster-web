# Social Media Poster

A modern web application for creating, managing, and scheduling social media posts across different platforms, with a focus on Facebook groups integration.

## Project Overview

Social Media Poster is a Next.js application that allows users to create and manage social media posts across different platforms. The application enables users to:

- Manage social media user accounts
- Create and organize Facebook groups
- Create and schedule posts for different platforms
- Manage post submissions and approvals

## Technical Stack

- **Frontend**: Next.js 15.x with React 19
- **Backend**: Next.js API routes
- **Database**: MongoDB 7.0
- **UI Components**: Custom components based on ShadCN UI
- **State Management**: React Query for server state
- **Styling**: Tailwind CSS

## Project Structure

The application follows a domain-driven design approach with clear separation of concerns:

```
social-media-poster/
├── src/                          # Main source directory
│   ├── app/                      # Next.js app directory
│   │   ├── api/                  # API routes
│   │   │   ├── facebook/         # Facebook API endpoints
│   │   │   │   ├── groups/       # Facebook groups endpoints
│   │   │   ├── posts/            # Posts management endpoints
│   │   │   └── social-media-users/ # User management endpoints
│   │   ├── accounts/             # Account management UI
│   │   ├── dashboard/            # Dashboard UI
│   │   ├── facebook/             # Facebook integration UI
│   │   │   └── groups/           # Facebook groups management UI
│   │   ├── posts/                # Post management UI
│   │   ├── social-media-users/   # Social media users UI
│   ├── components/               # Shared UI components
│   ├── errors/                   # Error handling
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities and helpers
│   └── modules/                  # Feature modules
```

### Domain Model

The application is built around these core entities:

1. **Posts**: Content published to social media platforms
2. **Groups**: Facebook groups where posts can be published
3. **SocialMediaUsers**: User accounts on different platforms

## Key Features

### Current Features

- **Social Media User Management**:
  - Create and manage social media user accounts
  - Associate users with platforms (Facebook, Instagram)

- **Facebook Groups Management**:
  - Create and manage Facebook groups
  - Connect groups with user accounts

- **Post Management**:
  - Create posts for different platforms
  - Submit and reject posts
  - View post status

### UI Components

- Modern, responsive design using Tailwind CSS
- Data tables with sorting and filtering
- Modal dialogs for creating and editing entities
- Slide panels for viewing details
- Toast notifications for user feedback

## Architecture

The application follows a layered architecture:

1. **API Layer**: Next.js API routes that handle HTTP requests
2. **Service Layer**: Business logic implementation
3. **Repository Layer**: Data access abstraction
4. **Model Layer**: Domain entities and data structures

Each domain entity (Post, Group, SocialMediaUser) has its own set of:
- API endpoints
- Service implementations
- Repository access
- Exception handling

## Getting Started

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- MongoDB 7.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-poster.git
   cd social-media-poster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB using Docker:
   ```bash
   docker-compose up -d mongodb
   ```

4. Create a `.env.local` file with required environment variables:
   ```
   MONGODB_URI=mongodb://root:rootpassword@localhost:27017/social-media-poster
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Creating New Features

When adding new features:

1. Create API endpoints in the appropriate domain folder
2. Implement service layer with business logic
3. Add repository methods for data access
4. Create UI components for the feature
5. Connect UI to the API using React Query

### Architectural Principles

- Follow domain-driven design
- Keep business logic in service layer
- Use repository pattern for data access
- Handle errors consistently

## Future Development

Planned features for future development:

- **Authentication System**: Complete NextAuth integration for user authentication
- **Bot Scheduling System**: Automated scheduling for post publishing
- **Advanced Analytics**: Track post performance and engagement
- **Multi-platform Support**: Extend to other social media platforms
- **Content Templates**: Reusable templates for posts
- **Media Management**: Support for image and video content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
