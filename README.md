Markdown
# 📝 Todo Management API (Backend Intern Assignment)

A secure and scalable REST API built with Node.js, Express, and MongoDB Atlas. This project implements full User Authentication, Role-Based Access Control (RBAC), and paginated Todo management.

## 🚀 Features
- **Authentication:** Secure Signup and Login using JWT (JSON Web Tokens).
- **Security:** Password hashing using `bcryptjs` for data safety.
- **User Roles:** Distinct roles for `USER` and `ADMIN`.
- **Soft Delete:** Users can deactivate their accounts (`isDeleted: true`) without permanent data loss.
- **Todo CRUD:** Users can Create, Read, Update, and Delete their own tasks.
- **Pagination:** Efficient data fetching for todos with page-based pagination.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Auth:** JWT, Passport/Middleware logic
- **Validation:** JSON input validation

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yashu1905-bit/todo-management-api.git](https://github.com/yashu1905-bit/todo-management-api.git)
   cd todo-management-api
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
Run the server:

Bash
node server.js
🧪 API Endpoints
Auth APIs
POST /api/auth/signup - Register a new user

POST /api/auth/login - Login and receive JWT Token

User APIs
GET /api/users/profile - Get current user profile (Protected)

DELETE /api/users/me - Soft delete own account (Protected)

Todo APIs (Protected)
POST /api/todos - Create a new todo

GET /api/todos?page=1&limit=5 - Get user-specific todos with pagination
