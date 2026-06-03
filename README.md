# 📚 LMS (Learning Management System)

A full-stack Learning Management System built with modern web technologies. This project provides a complete platform for users to learn, enroll in courses, manage payments, and track progress—with a robust backend API and an interactive frontend interface.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.2.x-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)](https://www.mongodb.com/)
[![Tailwindcss](https://img.shields.io/badge/Tailwindcss-4.x-teal.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

---

## 🌟 Project Overview

The LMS project is a comprehensive Learning Management System designed to facilitate online education. It includes:
- **User Authentication & Profile Management**: Secure JWT-based authentication with role-based access
- **Course Management**: Create, update, and manage courses with lectures
- **Payment Integration**: Razorpay-powered subscription system for course access
- **File Management**: Cloudinary integration for storing avatars, course thumbnails, and lecture content
- **Email Services**: Automated email notifications for password resets and user communications
- **Modern UI**: Responsive frontend built with React, Vite, and Tailwindcss

This is a full-stack application with a backend API and a client-side web application.

---

## ✨ Features

### ✅ Backend Features (Completed)

#### 🔐 User Authentication & Authorization
- User registration with optional avatar upload
- User login with JWT token generation
- Secure logout functionality
- Password change (authenticated users)
- Forgot password with email reset links
- Secure password reset via email
- User profile management (view & update)
- Role-based access control (USER and ADMIN roles)

#### 📁 File Management
- Avatar upload with Multer middleware
- Cloudinary integration for secure cloud storage
- Automatic local file cleanup after upload

#### 🛡️ Security & Middleware
- JWT-based authentication with cookie storage
- bcrypt password hashing with salt rounds
- CORS configuration for cross-origin requests
- Centralized error handling middleware
- Comprehensive input validation

#### 📧 Communication
- Nodemailer integration for transactional emails
- HTML email templates for password reset notifications

#### 📚 Course Management
- Create courses with title, description, and category
- Update course information
- Delete courses
- Add lectures to courses with video content
- Retrieve lectures by course ID
- Course thumbnail uploads to Cloudinary

#### 💳 Payment Gateway - Razorpay
- Subscription plan creation and management
- Course subscription purchases
- Payment verification with signature validation
- Subscription cancellation
- Admin payment and transaction tracking
- Complete transaction logging

### 🚧 Frontend Features (In Development)
- User-friendly interface for course browsing
- Authentication pages (login/signup/password reset)
- Course enrollment and management
- Payment processing UI
- User dashboard and profile management
- Course details and lecture viewing

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12
- **Styling**: Tailwindcss 4.3.0 with Vite integration
- **Package Manager**: npm
- **Linting**: ESLint with React plugins

### Backend
- **Runtime**: Node.js 18.x
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB 7.x with Mongoose 9.6.1 ODM
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Security**: bcryptjs 3.0.3
- **File Upload**: Multer 2.1.1
- **Cloud Storage**: Cloudinary 2.10.0
- **Email Service**: Nodemailer 8.0.7
- **Payment Gateway**: Razorpay 2.9.6
- **Utilities**: 
  - dotenv (environment variables)
  - cookie-parser (cookie handling)
  - cors (cross-origin requests)
  - morgan (HTTP logging)
- **Development**: Nodemon for auto-restart

---

## 📁 Folder Structure

```
LMS_Project/
│
├── README.md                          # Root documentation
│
├── client/                            # Frontend (React + Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── README.md
│   │
│   ├── public/
│   │   └── [static assets]
│   │
│   └── src/
│       ├── main.jsx                   # React entry point
│       ├── App.jsx                    # Main component
│       ├── App.css
│       ├── index.css
│       │
│       └── assets/
│           └── [images, fonts, etc.]
│
├── server/                            # Backend (Node.js + Express)
│   ├── package.json
│   ├── server.js                      # Server entry point
│   ├── app.js                         # Express app configuration
│   ├── jsconfig.json
│   ├── README.md
│   │
│   ├── config/
│   │   ├── dbConnection.js            # MongoDB connection
│   │   ├── cloudinary.js              # Cloudinary setup
│   │   └── razorpay.js                # Razorpay configuration
│   │
│   ├── models/
│   │   ├── userModel.js               # User schema
│   │   ├── courseModel.js             # Course schema
│   │   └── paymentModel.js            # Payment/Subscription schema
│   │
│   ├── controllers/
│   │   ├── controllers.js             # User controllers
│   │   ├── courseControllers.js       # Course controllers
│   │   └── paymentControllers.js      # Payment controllers
│   │
│   ├── routes/
│   │   ├── userRoutes.js              # User authentication & profile routes
│   │   ├── courseRoutes.js            # Course management routes
│   │   └── paymentRoutes.js           # Payment processing routes
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js          # JWT verification
│   │   ├── errorMiddleware.js         # Error handling
│   │   └── multerMiddleware.js        # File upload handling
│   │
│   ├── utils/
│   │   ├── cloudinary.js              # Cloudinary utilities
│   │   ├── errorUtils.js              # Custom error classes
│   │   └── sentEmail.js               # Email sending utility
│   │
│   └── uploads/                       # Temporary file storage
```

---

## 🛠️ Setup Steps

### Prerequisites
- **Node.js** 18.x or higher
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas cloud)
- **Cloudinary Account** (for file uploads)
- **Razorpay Account** (for payment processing)
- **Gmail Account** (for email service)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LMS_Project
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

This will install the following key dependencies:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cloudinary** - Cloud file storage
- **multer** - File upload handling
- **nodemailer** - Email service
- **razorpay** - Payment gateway
- **cors** - Cross-origin resource sharing
- **cookie-parser** - Cookie handling
- **dotenv** - Environment variables
- **morgan** - HTTP request logging
- **nodemon** - Development auto-restart

#### Environment Variables
Create a `.env` file in the `server` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URL=mongodb://localhost:27017/LMS
# OR use MongoDB Atlas:
# MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/LMS

# JWT Secret (Generate a secure random string)
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Service (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**Note**: For Gmail, use an [App Password](https://myaccount.google.com/apppasswords) instead of your actual password.

### 3. Frontend Setup

#### Install Dependencies
```bash
cd client
npm install
```

This will install the following key dependencies:
- **react** - UI framework
- **react-dom** - React DOM binding
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - Vite React plugin
- **tailwindcss** - Utility-first CSS framework
- **@tailwindcss/vite** - Tailwindcss Vite plugin
- **eslint** - Code linting
- **eslint-plugin-react-hooks** - React hooks linting
- **eslint-plugin-react-refresh** - React refresh linting

#### Environment Variables (Optional)
Create a `.env` file in the `client` directory if needed:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 How to Run Frontend + Backend

### Option 1: Run Both in Separate Terminals

#### Terminal 1 - Start Backend Server
```bash
cd server
npm run dev
```
The backend will start on `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will start on `http://localhost:5173`

### Option 2: Using npm Scripts from Root (if configured)
From the project root directory, you can run both services:
```bash
# Run backend
cd server && npm run dev

# In another terminal, run frontend
cd client && npm run dev
```

### Building for Production

#### Build Backend
```bash
cd server
npm run build  # or your build script
```

#### Build Frontend
```bash
cd client
npm run build
npm run preview  # To preview the production build
```

---

## 📋 Environment Variables

### Backend (.env in `server/`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/LMS` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |
| `RAZORPAY_KEY_ID` | Razorpay Key ID | `key_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret | `secret_xxxxx` |
| `SMTP_HOST` | Email SMTP host | `smtp.gmail.com` |
| `SMTP_PORT` | Email SMTP port | `587` |
| `SMTP_USER` | Email account | `your_email@gmail.com` |
| `SMTP_PASS` | Email app password | `your_app_password` |
| `SMTP_FROM` | Email sender address | `your_email@gmail.com` |
| `FRONTEND_URL` | Frontend base URL | `http://localhost:5173` |

### Frontend (.env in `client/`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

---

## 📸 Screenshots & API Documentation

### API Documentation
- **Backend API Endpoints**: See [server/README.md](server/README.md) for detailed API documentation
- **API Base URL**: `http://localhost:5000`

### Key API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password via token

#### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

#### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course (Admin)
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)
- `GET /api/courses/:id/lectures` - Get course lectures
- `POST /api/courses/:id/lectures` - Add lecture to course (Admin)

#### Payments
- `POST /api/payments/subscribe` - Create subscription order
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/cancel` - Cancel subscription
- `GET /api/payments/admin/transactions` - Get all transactions (Admin)

### Frontend Screenshots
*Screenshots and UI mockups coming soon as frontend development progresses.*

---

## 📖 Additional Documentation

- **Backend Details**: See [server/README.md](server/README.md)
- **Frontend Details**: See [client/README.md](client/README.md)

---

## 📝 Notes

- The backend is fully functional with all core features implemented.
- The frontend is in the initial setup phase with React and styling configured.
- Database connection defaults to local MongoDB; update `MONGO_URL` for MongoDB Atlas.
- All sensitive credentials should be stored in `.env` files (never commit these to version control).
- CORS is configured to allow requests from the frontend URL.

---

## 📄 License

ISC License - See LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Please follow the project's code structure and conventions.

---

**Last Updated**: June 2026
