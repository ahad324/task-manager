# Task Manager Frontend

## Overview

The Task Manager Frontend is a React-based single-page application (SPA) designed to manage tasks efficiently. It interacts with a backend API to perform CRUD (Create, Read, Update, Delete) operations on tasks. The application features a clean, responsive user interface built with Tailwind CSS, a professional loading spinner using react-spinners, and a context-based state management system for seamless task and authentication handling.

## Features

- **Authentication**: User registration and login with Bearer Token-based authentication.
- **Task Management**: Create, read, update, and delete tasks with title, description, and status (pending, in progress, completed).
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **Context API**: Manages authentication and task state globally with React Context.
- **Error Handling**: Displays user-friendly error messages for API failures, persisting for 5 seconds.
- **Loading States**: Uses a ClipLoader spinner from react-spinners during API requests and authentication checks for better UX.
- **Accessibility**: Includes ARIA attributes and screen-reader support for loading states and error messages.
- **Fixed Header**: Persistent navigation bar with dynamic Login/Register or Username/Logout options.

## Directory Structure

```
client/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── assets/
│   │   ├── react.svg           # React logo
│   │   ├── logo.png            # Task Manager logo
│   ├── components/
│   │   ├── Header.jsx          # Fixed navigation header
│   │   ├── Login.jsx           # Login form component
│   │   ├── ProtectedRoute.jsx  # Protects routes with authentication check and spinner
│   │   ├── Register.jsx        # Registration form component
│   │   ├── TaskForm.jsx        # Form for adding/editing tasks
│   │   ├── TaskItem.jsx        # Component for displaying a single task
│   │   ├── TaskList.jsx        # Component for listing all tasks
│   │   ├── TaskManager.jsx     # Main task management component
│   ├── context/
│   │   ├── AuthContext.jsx     # Context for authentication state
│   │   ├── TaskContext.jsx     # Context for task state management
│   ├── services/
│   │   ├── api.js              # Axios instance with Bearer Token interceptor
│   │   ├── authService.js      # API service functions for authentication
│   │   ├── taskService.js      # API service functions for task operations
│   ├── index.css               # Tailwind CSS styles with custom scrollbar
│   ├── main.jsx                # Entry point for React application
├── .env                        # Environment variables
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
```

## Prerequisites

- **Node.js**: Version 18 or higher (tested with v22.17.0)
- **npm**: Version 8 or higher
- **Backend API**: A running instance of the Task Manager backend API (default: http://127.0.0.1:3000/api)
- **MongoDB**: Required for the backend API to store tasks and users

## Installation

### Clone the Repository

```bash
git clone https://github.com/ahad324/task-manager.git
cd task-manager/client
```

### Install Dependencies

```bash
npm install
```

This installs required packages, including:

- react, react-dom, react-router-dom
- axios for API requests
- tailwindcss for styling
- react-spinners for loading spinner

### Set Up Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://127.0.0.1:3000/api
```

Replace the URL if your backend API is hosted elsewhere.

### Start the Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Usage

### Access the Application

Open a browser and navigate to http://localhost:5173.

### Authentication

- **Register**: Navigate to `/register`, enter a username, email, and password, and submit.
- **Login**: Navigate to `/login`, enter email and password, and submit. Errors (e.g., "Invalid credentials") persist for 5 seconds.
- **Logout**: Click the "Logout" button in the header when authenticated.

### Manage Tasks

- **Add a Task**: On the `/tasks` page, enter a title, optional description, and select a status, then click "Add Task".
- **Edit a Task**: Click the "Edit" button on a task, update details, and click "Update Task".
- **Delete a Task**: Click the "Delete" button and confirm the action.
- **View Tasks**: Tasks are displayed in a scrollable list with title, description, and status.

### Protected Routes

The `/tasks` route is protected. Unauthenticated users are redirected to `/login` with a ClipLoader spinner displayed during authentication checks.

### Error Handling

- API errors (e.g., "Failed to fetch tasks") are displayed in a styled alert for 5 seconds.
- Validation errors (e.g., missing task title) are shown clearly in the UI.

## API Integration

The frontend communicates with the backend API via the following endpoints (configured in `src/services/taskService.js` and `src/services/authService.js`):

### Auth Endpoints:

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and return a Bearer Token
- `POST /api/auth/logout`: Log out the user
- `GET /api/auth/verify`: Verify the Bearer Token

### Task Endpoints:

- `GET /api/tasks`: Fetch all tasks for the authenticated user
- `GET /api/tasks/:id`: Fetch a single task by ID
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update an existing task
- `DELETE /api/tasks/:id`: Delete a task

API base URL is set via `VITE_API_URL` (default: http://127.0.0.1:3000/api). Protected routes require a Bearer Token in the Authorization header.

## Development

### Scripts

Available scripts in `package.json`:

- `npm run dev`: Starts the Vite development server
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the production build locally

### Styling

- Tailwind CSS in `src/index.css` with custom scrollbar styles
- Consistent UI with rounded corners, shadows, and smooth transitions
- Blue color scheme (#2563EB) for buttons and spinner

### State Management

- `AuthContext.jsx`: Manages user authentication state and Bearer Token
- `TaskContext.jsx`: Manages task state with dynamic API imports
- Prevents infinite loops in task fetching with proper `useEffect` dependencies

### Accessibility

- ARIA attributes on forms, buttons, and loading spinner
- Screen-reader support with `sr-only` text for loading states

## Deployment

### Build the Application

```bash
npm run build
```

This generates a `dist` folder with optimized assets.

### Serve the Build

```bash
npm install -g serve
serve -s dist
```

Update `.env` with the production API URL for deployment.

## Troubleshooting

### API Errors

- Ensure backend API is running at `VITE_API_URL`
- Check browser console logs for Axios errors
- Test protected routes in Postman with `Bearer <token>`

### No Tasks Displayed

- Verify MongoDB has data and backend is working
- Test API endpoints with Postman

### Styling Issues

- Confirm Tailwind CSS is correctly set up in `index.css`
- Run `npm install` to ensure Tailwind dependencies

### Dev Server Fails

- Run `npm install` to ensure all dependencies
- Resolve port conflicts (default: 5173)

### Spinner Not Displaying

- Ensure `react-spinners` is installed (`npm install react-spinners`)
- Check `ProtectedRoute.jsx` for correct `ClipLoader` import

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## Author

**AbdulAhad**  
GitHub: [https://github.com/ahad324/task-manager](https://github.com/ahad324/task-manager)
