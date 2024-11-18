Secure File Sharing System

A secure file-sharing REST API built with Node.js and MongoDB. This system allows two types of users: Ops Users who can upload files, and Client Users who can download and list files. The project includes authentication, authorization, file upload/download, and secure file access links.

Features

Ops User:

Login
Upload .pptx, .docx, and .xlsx files only

Client User:

Sign Up (receives an encrypted URL)
Email Verification
Login
List all uploaded files
Download files through secure encrypted URLs

Tech Stack

Backend: Node.js, Express.js
Database: MongoDB (via MongoDB Atlas or local MongoDB)
Authentication: JSON Web Tokens (JWT) and bcrypt for password hashing
File Handling: Multer for file uploads
Email Service: Nodemailer for email verification
Encryption: Crypto for encrypted URLs
Prerequisites
Node.js (v14 or higher)
MongoDB (local or MongoDB Atlas)

Getting Started

1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/secure-file-sharing-system.git
cd secure-file-sharing-system

2. Install Dependencies
bash
Copy code
npm install

3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:


# MongoDB URI (replace with your MongoDB Atlas URI if using a remote database)
MONGO_URI=mongodb://localhost:27017/fileSharing

# JWT Secret
JWT_SECRET=your_jwt_secret

# Email Configuration (for Nodemailer)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

4. Start the Server
bash
Copy code
npm start
The server will start on http://localhost:3000.

API Endpoints

1. Auth Routes
POST /api/auth/signup - Sign up as a Client User and receive an encrypted URL.
POST /api/auth/login - Login for both Ops User and Client User.
GET /api/auth/verify-email/:verification_code - Verify Client User email.

2. File Routes
POST /api/files/upload - Upload files (allowed only for Ops Users). Only .pptx, .docx, and .xlsx files are permitted.
GET /api/files/list - List all uploaded files (allowed only for Client Users).
GET /api/files/download/:file_id - Download a file through a secure encrypted URL (allowed only for Client Users).

Project Structure

/file-sharing-system

  ├── /config
  
  │   ├── db.js                # Database connection setup
  
  │   └── jwtSecret.js         # JWT secret configuration
  
  ├── /controllers
  
  │   ├── authController.js    # Handles sign-up, login, and email verification
  
  │   └── fileController.js    # Handles file upload, listing, and download
  
  ├── /models
  
  │   ├── User.js              # User schema and model
  
  │   └── File.js              # File schema and model
  
  ├── /routes
  
  │   ├── authRoutes.js        # Routes for authentication
  
  │   └── fileRoutes.js        # Routes for file operations
  
  ├── /uploads                 # Directory to store uploaded files
  
  ├── .env                     # Environment variables (not included in Git)
  
  └── server.js                # Main server file

Usage

1. Ops User Workflow
Login as an Ops User using the /api/auth/login endpoint.
Upload a file (only .pptx, .docx, .xlsx) using the /api/files/upload endpoint.

2. Client User Workflow
Sign up as a Client User using the /api/auth/signup endpoint. An email verification link will be sent.
Verify email using the /api/auth/verify-email/:verification_code endpoint.
Login using the /api/auth/login endpoint.
List all files using the /api/files/list endpoint.
Download a file using the /api/files/download/:file_id endpoint (a secure URL is provided).

Deployment on Render

Push your code to GitHub.

Go to Render and create a new Web Service.

Connect your GitHub repository and configure the service.

Add environment variables (MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS) in the Render dashboard.

Deploy the application and obtain your live URL.

Security Considerations

JWT Authentication: Tokens are used for secure user authentication.

URL Encryption: Files can only be accessed by authorized users with an encrypted URL.

File Validation: Only .pptx, .docx, and .xlsx file types are allowed for upload.
Password Hashing: User passwords are hashed using bcrypt.
