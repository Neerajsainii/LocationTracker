# 🚀 Location Tracker for Multivendor Delivery Platform

A comprehensive real-time location tracking system designed for multivendor delivery platforms, similar to Rapido or Dunzo. This platform enables seamless coordination between customers, vendors, and delivery partners with live location tracking, order management, and real-time updates.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Backend Documentation](#backend-documentation)
- [Frontend Documentation](#frontend-documentation)
- [API Documentation](#api-documentation)
- [Real-time Features](#real-time-features)
- [Environment Configuration](#environment-configuration)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Location Tracker platform provides a complete solution for managing delivery operations across multiple vendors. It offers real-time location tracking, order management, and seamless communication between all stakeholders in the delivery ecosystem.

### Key Stakeholders:
- **Customers**: Track orders in real-time, view delivery partner location, get accurate ETAs
- **Vendors**: Manage orders, assign delivery partners, monitor business performance
- **Delivery Partners**: Accept orders, navigate efficiently, track earnings

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Role-based access control (Customer, Vendor, Delivery Partner)
- Secure user registration and login
- Session management with automatic token refresh

### 📍 Real-time Location Tracking
- Live GPS location updates via Socket.IO
- Interactive maps with Leaflet integration
- Route optimization and navigation
- Geofencing for delivery zones
- ETA calculation and updates

### 📦 Order Management
- Complete order lifecycle management
- Real-time order status updates
- Order assignment to delivery partners
- Order history and analytics
- Multi-vendor order coordination

### 🔄 Real-time Communication
- Socket.IO for instant updates
- Live location broadcasting
- Order status notifications
- Real-time chat system (planned)

### 📱 Responsive Design
- Mobile-first responsive design
- Progressive Web App (PWA) capabilities
- Cross-platform compatibility
- Touch-friendly interface

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv
- **Development**: nodemon, ts-node

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client
- **Maps**: Leaflet & React-Leaflet
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom components with class-variance-authority
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

### Database
- **Primary**: MongoDB Atlas (Cloud)
- **Local Development**: MongoDB Community Server
- **ODM**: Mongoose for schema modeling

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Build Tool**: TypeScript Compiler (tsc)
- **Development**: Concurrent development servers

## 📁 Project Structure

```
Location_Tracker_for_Multivendor_Delivery_Platform/
├── backend/                          # Backend application
│   ├── src/
│   │   ├── models/                   # Database models
│   │   │   ├── user.ts              # User schema
│   │   │   └── order.ts             # Order schema
│   │   ├── routes/                   # API routes
│   │   │   └── index.ts             # Main routes file
│   │   ├── middleware/               # Custom middleware
│   │   ├── utils/                    # Utility functions
│   │   │   └── jwt.ts               # JWT utilities
│   │   ├── types/                    # TypeScript type definitions
│   │   ├── database.ts               # Database connection
│   │   ├── app.ts                    # Express app configuration
│   │   └── index.ts                  # Server entry point
│   ├── dist/                         # Compiled JavaScript files
│   ├── .env                          # Environment variables
│   ├── package.json                  # Dependencies and scripts
│   ├── tsconfig.json                 # TypeScript configuration
│   └── nodemon.json                  # Nodemon configuration
├── frontend/                         # Frontend application
│   ├── src/
│   │   ├── app/                      # Next.js App Router
│   │   │   ├── login/               # Authentication pages
│   │   │   ├── dashboard/           # Dashboard pages
│   │   │   ├── tracking/            # Order tracking pages
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Home page
│   │   │   └── globals.css          # Global styles
│   │   ├── components/               # React components
│   │   │   ├── ui/                  # Reusable UI components
│   │   │   ├── maps/                # Map components
│   │   │   ├── auth/                # Authentication components
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   └── tracking/            # Tracking components
│   │   ├── lib/                      # Utility libraries
│   │   │   ├── api.ts               # API client
│   │   │   ├── socket.ts            # Socket.IO client
│   │   │   └── utils.ts             # Utility functions
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── store/                    # State management
│   │   │   └── authStore.ts         # Authentication store
│   │   └── types/                    # TypeScript definitions
│   │       └── index.ts             # Main type definitions
│   ├── public/                       # Static assets
│   ├── .env.local                    # Environment variables
│   ├── package.json                  # Dependencies and scripts
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   └── next.config.ts                # Next.js configuration
└── README.md                         # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Location_Tracker_for_Multivendor_Delivery_Platform
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables (see Environment Configuration section)
# Edit .env file with your MongoDB URI and other settings

# Build TypeScript
npm run build

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Configure environment variables
# Edit .env.local file with API URLs

# Start development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

## 🔧 Backend Documentation

### Architecture
The backend follows a modular architecture with clear separation of concerns:

- **Models**: Database schemas using Mongoose
- **Routes**: RESTful API endpoints
- **Middleware**: Authentication, validation, error handling
- **Utils**: Helper functions and utilities
- **Socket.IO**: Real-time communication layer

### Key Components

#### Database Models
```typescript
// User Model
interface User {
  _id: string;
  username: string;
  password: string; // hashed
  role: 'customer' | 'vendor' | 'delivery-partner';
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Model
interface Order {
  _id: string;
  vendorId: string;
  deliveryPartnerId?: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  pickupLocation: Location;
  deliveryLocation: Location;
  createdAt: Date;
  updatedAt: Date;
}
```

#### API Endpoints
```typescript
// Authentication
POST /api/register    // User registration
POST /api/login       // User login

// Orders
GET    /api/orders    // Get orders (filtered by user role)
POST   /api/orders    // Create new order
PUT    /api/orders/:id // Update order
GET    /api/orders/:id // Get specific order

// Users
GET    /api/user/me   // Get current user profile
PUT    /api/user/profile // Update user profile

// Location (planned)
POST   /api/location/update // Update user location
```

#### Socket.IO Events
```typescript
// Client to Server
'location-update'     // Send location update
'order-status-change' // Update order status
'join-room'          // Join order-specific room
'leave-room'         // Leave room

// Server to Client
'location-update'     // Broadcast location update
'order-status-change' // Broadcast status change
'new-order'          // New order notification
'order-assigned'     // Order assignment notification
```

### Scripts
```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
npm run watch    # Watch mode for development
```

## 🎨 Frontend Documentation

### Architecture
The frontend uses Next.js 14 with the App Router pattern, providing:

- **Server-side Rendering (SSR)**
- **Client-side Navigation**
- **Automatic Code Splitting**
- **Built-in Optimization**

### Key Components

#### State Management
```typescript
// Authentication Store (Zustand)
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}
```

#### API Client
```typescript
// Axios-based API client with interceptors
class ApiClient {
  // Automatic token attachment
  // Error handling and token refresh
  // Type-safe API methods
}
```

#### Socket.IO Integration
```typescript
// Real-time communication client
class SocketClient {
  // Connection management
  // Event emission and listening
  // Room management for order-specific updates
}
```

### UI Components
- **Button**: Reusable button with variants
- **Forms**: React Hook Form integration
- **Maps**: Leaflet-based map components
- **Notifications**: Toast notifications
- **Loading States**: Skeleton loaders and spinners

### Pages Structure
```typescript
// App Router Structure
app/
├── page.tsx              // Landing page
├── login/page.tsx        // Login page
├── register/page.tsx     // Registration page (planned)
├── dashboard/
│   ├── customer/page.tsx     // Customer dashboard
│   ├── vendor/page.tsx       // Vendor dashboard
│   └── delivery-partner/page.tsx // Delivery partner dashboard
└── tracking/
    └── [orderId]/page.tsx    // Order tracking page
```

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📡 API Documentation

### Authentication Endpoints

#### POST /api/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "role": "customer" | "vendor" | "delivery-partner",
  "email": "string (optional)",
  "phone": "string (optional)"
}
```

**Response:**
```json
{
  "token": "jwt_token_string"
}
```

#### POST /api/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt_token_string"
}
```

### Order Management Endpoints

#### GET /api/orders
Retrieve orders based on user role and permissions.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "order_id",
    "vendorId": "vendor_id",
    "customerId": "customer_id",
    "status": "pending",
    "items": [...],
    "totalAmount": 25.99,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/orders
Create a new order (customers only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "vendorId": "vendor_id",
  "items": [
    {
      "id": "item_id",
      "name": "Item Name",
      "quantity": 2,
      "price": 12.99
    }
  ],
  "deliveryLocation": {
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

#### PUT /api/orders/:id
Update order status or details.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "status": "accepted" | "preparing" | "ready" | "picked-up" | "in-transit" | "delivered"
}
```

## ⚡ Real-time Features

### Socket.IO Implementation

#### Connection Management
```typescript
// Client-side connection
const socket = io('http://localhost:5000', {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5
});
```

#### Location Tracking
```typescript
// Send location update
socket.emit('location-update', {
  userId: 'user_id',
  location: {
    latitude: 40.7128,
    longitude: -74.0060,
    timestamp: new Date().toISOString()
  },
  orderId: 'order_id' // optional
});

// Listen for location updates
socket.on('location-update', (data) => {
  // Update map with new location
  updateDeliveryPartnerLocation(data);
});
```

#### Order Status Updates
```typescript
// Send status update
socket.emit('order-status-change', {
  orderId: 'order_id',
  status: 'in-transit',
  timestamp: new Date().toISOString()
});

// Listen for status changes
socket.on('order-status-change', (data) => {
  // Update UI with new status
  updateOrderStatus(data);
});
```

## 🔧 Environment Configuration

### Backend Environment Variables (.env)
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/location_tracker
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/location_tracker

# Server Configuration
PORT=5000

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Environment
NODE_ENV=development
```

### Frontend Environment Variables (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Map Configuration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# App Configuration
NEXT_PUBLIC_APP_NAME=Location Tracker
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🔄 Development Workflow

### 1. Starting Development Servers

#### Backend
```bash
cd backend
npm run dev  # Starts on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm run dev  # Starts on http://localhost:3000
```

#### Concurrent Development
```bash
# From backend directory
npm run concurrent  # Starts both backend and frontend
```

### 2. Code Quality

#### TypeScript Compilation
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

#### Linting
```bash
# Frontend
cd frontend && npm run lint
```

### 3. Database Management

#### MongoDB Connection
- **Local**: Ensure MongoDB service is running
- **Atlas**: Use connection string from MongoDB Atlas dashboard

#### Schema Updates
- Modify models in `backend/src/models/`
- Restart backend server to apply changes

## 🚀 Deployment

### Backend Deployment

#### Environment Setup
1. Set production environment variables
2. Configure MongoDB Atlas for production
3. Set secure JWT secret

#### Build and Deploy
```bash
npm run build
npm start
```

#### Recommended Platforms
- **Railway**: Easy Node.js deployment
- **Heroku**: Traditional PaaS
- **DigitalOcean App Platform**: Scalable deployment
- **AWS EC2**: Full control deployment

### Frontend Deployment

#### Build for Production
```bash
npm run build
npm start
```

#### Recommended Platforms
- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: JAMstack deployment
- **AWS Amplify**: Full-stack deployment
- **DigitalOcean App Platform**: Container deployment

### Environment Variables for Production
Ensure all environment variables are properly configured in your deployment platform.

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow TypeScript and ESLint configurations
2. **Commits**: Use conventional commit messages
3. **Branches**: Create feature branches from main
4. **Testing**: Write tests for new features (planned)
5. **Documentation**: Update README for new features

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Update documentation
6. Submit pull request

### Code Review Checklist

- [ ] TypeScript compilation passes
- [ ] ESLint rules followed
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Socket.IO events documented
- [ ] Error handling implemented
- [ ] Security considerations addressed

## 📈 Future Enhancements

### Planned Features

#### Phase 1 (Current)
- [x] Basic authentication system
- [x] Order management
- [x] Real-time communication setup
- [x] Frontend foundation
- [ ] Registration page
- [ ] Dashboard components
- [ ] Map integration

#### Phase 2
- [ ] Advanced location tracking
- [ ] Route optimization
- [ ] Push notifications
- [ ] Payment integration
- [ ] Rating and review system
- [ ] Analytics dashboard

#### Phase 3
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Machine learning for delivery optimization
- [ ] Mobile app development
- [ ] API rate limiting
- [ ] Advanced security features

### Performance Optimizations

- [ ] Database indexing for location queries
- [ ] Redis caching for frequent queries
- [ ] CDN integration for static assets
- [ ] Image optimization
- [ ] Bundle size optimization
- [ ] Server-side caching

### Security Enhancements

- [ ] Rate limiting implementation
- [ ] Input validation and sanitization
- [ ] CORS configuration
- [ ] Helmet.js security headers
- [ ] API versioning
- [ ] Audit logging

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

1. **Documentation**: Check this README first
2. **Issues**: Create GitHub issues for bugs
3. **Discussions**: Use GitHub discussions for questions
4. **Email**: Contact the development team

### Common Issues

#### Backend Issues
- **MongoDB Connection**: Verify connection string and network access
- **Port Conflicts**: Ensure port 5000 is available
- **Environment Variables**: Check .env file configuration

#### Frontend Issues
- **API Connection**: Verify backend is running on correct port
- **Build Errors**: Check TypeScript compilation
- **Socket.IO**: Ensure backend Socket.IO server is running

### Development Tips

1. **Hot Reload**: Both servers support hot reload for development
2. **Debugging**: Use browser dev tools and Node.js debugger
3. **Logging**: Check console logs for real-time updates
4. **Database**: Use MongoDB Compass for database inspection

---

## 📊 Project Status

### Current Implementation Status

#### Backend ✅
- [x] Express.js server setup
- [x] MongoDB connection with Mongoose
- [x] JWT authentication system
- [x] User and Order models
- [x] Basic API routes
- [x] Socket.IO integration
- [x] TypeScript configuration
- [x] Environment configuration

#### Frontend ✅
- [x] Next.js 14 setup with App Router
- [x] TypeScript configuration
- [x] Tailwind CSS styling
- [x] Authentication store with Zustand
- [x] API client with Axios
- [x] Socket.IO client setup
- [x] Basic UI components
- [x] Login page implementation
- [x] Landing page
- [x] Toast notifications

#### In Progress 🚧
- [ ] Registration page
- [ ] Dashboard components
- [ ] Map integration with Leaflet
- [ ] Real-time location tracking
- [ ] Order tracking interface

#### Planned 📋
- [ ] Role-based dashboards
- [ ] Advanced map features
- [ ] Push notifications
- [ ] Mobile responsiveness optimization
- [ ] Performance optimizations

---

**Built with ❤️ for the delivery ecosystem**

*This project demonstrates a complete full-stack application with real-time capabilities, modern web technologies, and scalable architecture suitable for production deployment.* 