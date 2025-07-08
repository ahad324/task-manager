# Task Manager

A full-stack Task Manager application built using the MERN stack (MongoDB, Express, React, Node.js) with a clean, responsive UI and full CRUD functionality. The app allows users to register, log in, and manage tasks (create, read, update, delete) with a modern interface and secure authentication using Bearer Tokens.

## Project Structure

```
task-manager/
├── client/               # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│   ├── README.md
│
├── server/               # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── index.js
│   ├── .env
│   ├── package.json
│   ├── .gitignore
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── README.md
│
├── README.md             # Root README with overview and structure
```

## Technologies Used

**Frontend:**
- React, Vite, React Router
- Tailwind CSS for styling
- react-spinners for loading indicators
- Axios for API requests
- Context API for state management

**Backend:**
- Node.js, Express.js
- MongoDB, Mongoose
- JSON Web Tokens (JWT) for Bearer Token authentication
- Joi for input validation
- Swagger UI for API documentation

**Tools:**
- ESLint, Prettier for code quality
- dotenv for environment variables
- nodemon for development
- Postman for API testing

## Features

- **User Authentication**: Register, login, and logout with JWT-based Bearer Token authentication.
- **Task Management**: Add, edit, delete, and view tasks with status tracking (pending, in progress, completed).
- **Protected Routes**: Task-related routes require authentication, enforced via Bearer Token.
- **Responsive UI**: Modern design with Tailwind CSS, fixed header, and smooth transitions.
- **Loading States**: Professional ClipLoader spinner during API requests and auth checks.
- **Error Handling**: Clear error messages for validation and API failures.
- **API Documentation**: Swagger UI at `/api/docs`.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- npm (v8+)
- Git (optional)
- Postman (for API testing)

### Installation

#### Clone the Repository:

```bash
git clone https://github.com/ahad324/task-manager.git
cd task-manager
```

#### Set Up Frontend:

Navigate to `client` directory and follow instructions in `client/README.md`.

#### Set Up Backend:

Navigate to `server` directory and follow instructions in `server/README.md`.

### Running Locally

1. Start MongoDB (local or Docker).
2. Start the backend server:

```bash
cd server
npm run dev
```

3. Start the frontend development server:

```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173` and API at `http://127.0.0.1:3000/api`.

### Testing APIs

Use Postman with `Bearer <token>` for protected routes (e.g., `GET /api/tasks`). Obtain the token via `POST /api/auth/login`.

## Deployment

- **Frontend**: Build with `npm run build` and deploy to Vercel or Netlify. Update `VITE_API_URL` for the production backend.
- **Backend**: Deploy to Railway or Heroku. Set `.env` variables for `MONGO_URI`, `PORT`, and `JWT_SECRET`.
- **MongoDB**: Use MongoDB Atlas for production.

## Troubleshooting

- **API Connection**: Ensure backend is running and `VITE_API_URL` matches API URL.
- **Authentication Issues**: Verify Bearer Token in Postman or browser requests.
- **MongoDB Errors**: Check MongoDB connection and logs.
- **UI Issues**: Confirm `react-spinners` and Tailwind CSS are installed.

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## Author

**AbdulAhad**  
GitHub: [https://github.com/ahad324/task-manager](https://github.com/ahad324/task-manager)
