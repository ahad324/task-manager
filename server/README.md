# Task Manager API

## Overview

The Task Manager API is a Node.js and Express-based RESTful API for managing tasks and user authentication. It uses MongoDB for data storage, Mongoose for schema management, and JWT (JSON Web Tokens) for Bearer Token authentication. The API supports CRUD operations for tasks and includes endpoints for user registration, login, logout, and token verification.

## Features

- **User Authentication**: Register and login users with JWT-based Bearer Token authentication.
- **Task Management**: Create, read, update, and delete tasks associated with authenticated users.
- **Input Validation**: Uses Joi for validating user and task data.
- **Protected Routes**: Requires Bearer Token for task-related endpoints.
- **Error Handling**: Provides clear error messages for validation and server errors.
- **Swagger Documentation**: API documentation available at `/api/docs`.

## Directory Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── taskModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── index.js
├── .env
├── package.json
├── .gitignore
├── .eslintrc.js
├── .prettierrc
```

## Prerequisites

- **Node.js**: Version 18 or higher (tested with v22.17.0)
- **npm**: Version 8 or higher
- **MongoDB**: Local or Atlas instance
- **Postman**: For testing API endpoints

## Installation

### Clone the Repository

```bash
git clone https://github.com/ahad324/task-manager.git
cd task-manager/server
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

### Start MongoDB

#### Local MongoDB

```bash
mongod
```

#### Docker

```bash
docker run -d --name taskmanager-mongo -p 27017:27017 mongo
```

### Start the Server

```bash
npm run dev
```

API will be available at `http://127.0.0.1:3000/api`.

## Usage

### Test the API

#### Register a User

```http
POST http://127.0.0.1:3000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login

```http
POST http://127.0.0.1:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Access Protected Route (Get Tasks)

```http
GET http://127.0.0.1:3000/api/tasks
Authorization: Bearer <your_jwt_token>
```

#### Verify Token

```http
GET http://127.0.0.1:3000/api/auth/verify
Authorization: Bearer <your_jwt_token>
```

### Swagger Documentation

```
GET http://127.0.0.1:3000/api/docs
```

## API Endpoints

**Auth**:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/verify`

**Tasks**:

- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Development

### Scripts

- `npm run dev`
- `npm start`
- `npm run lint`
- `npm run format`

## Error Handling

- 400 for validation issues
- 401 for unauthorized access
- 500 for server errors

## Deployment

```bash
NODE_ENV=production npm start
```

Can be deployed to Railway, Heroku, etc. Set environment variables accordingly.

## Troubleshooting

- Verify MongoDB connection
- Use correct headers in Postman
- Check if token is valid
- Check `.env` configuration

## Contributing

1. Fork the repo
2. Create branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open PR

## Author

**AbdulAhad**  
GitHub: [https://github.com/ahad324/task-manager](https://github.com/ahad324/task-manager)
