# Login-and-Register-backend-project
# Authentication System

A modern full-stack authentication system with React, Shadcn UI, and Express.

## Features

- **User registration** with validation
- **Secure login** with JWT authentication
- **HTTP-only cookies** for refresh tokens
- **Access token storage** for API requests
- **Modern UI** with Shadcn UI components
- **Form validation** with Zod
- **TypeScript support** throughout the stack

## Tech Stack

### Frontend
- React 18
- Vite
- Shadcn UI
- React Router DOM
- React Hook Form
- Zod validation
- Axios for API requests
- TypeScript

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL database
- JWT for authentication
- Zod for schema validation
- TypeScript

## Project Structure

project/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── ui/ # Shadcn UI components
│ │ ├── views/
│ │ │ ├── Login.tsx # Login page
│ │ │ └── Register.tsx # Registration page
│ │ ├── services/
│ │ │ └── api.ts # Axios instance for API requests
│ │ ├── App.tsx # Main application with routes
│ │ └── main.tsx # Entry point
│ ├── package.json
│ └── vite.config.ts
│
├── backend/
│ ├── src/
│ │ ├── controller/
│ │ │ └── auth.controllers.ts # Authentication controllers
│ │ ├── routes/
│ │ │ └── auth.routes.ts # Authentication routes
│ │ ├── schemas/
│ │ │ └── auth.schema.ts # Validation schemas
│ │ ├── services/
│ │ │ └── auth.services.ts # Authentication services
│ │ ├── utils/
│ │ │ └── jwt.utils.ts # JWT utilities
│ │ └── index.ts # Entry point
│ ├── prisma/
│ │ └── schema.prisma # Database schema
│ └── package.json

text

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
cd backend

text

2. Install dependencies:
npm install

text

3. Create a `.env` file with the following variables:
DATABASE_URL="postgresql://username:password@localhost:5432/auth_db"
ACCESS_TOKEN_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
PORT=5000

text

4. Run database migrations:
npx prisma migrate dev

text

5. Start the backend server:
npx tsx src/index.ts

text

### Frontend Setup

1. Navigate to the frontend directory:
cd frontend

text

2. Install dependencies:
npm install

text

3. Start the development server:
npm run dev

text

4. Open your browser and navigate to:
http://localhost:5173

text

## API Endpoints

### Authentication

- **POST /api/auth/register**
- Register a new user
- Body: `{ name: string, email: string, password: string }`

- **POST /api/auth/login**
- Login a user
- Body: `{ email: string, password: string }`

## Authentication Flow

1. User registers with name, email, and password
2. User logs in with email and password
3. Backend validates credentials and returns:
- Access token (short-lived, stored in localStorage)
- Refresh token (long-lived, stored as HTTP-only cookie)
4. Frontend includes access token in Authorization header for API requests
5. When access token expires, refresh token is used to obtain a new access token

## Security Features

- Passwords are hashed using bcrypt
- Refresh tokens are stored as HTTP-only cookies
- Access tokens are short-lived (15 minutes)
- CORS protection for API endpoints
- Input validation using Zod schemas

## Development

### Running Tests

Backend tests
cd backend
npm test

Frontend tests
cd frontend
npm test

text

### Building for Production

Backend
cd backend
npm run build

Frontend
cd frontend
npm run build

text

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Prisma](https://www.prisma.io/) for the database ORM
- [Zod](https://zod.dev/) for schema validation
