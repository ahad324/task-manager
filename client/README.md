# Task Manager Frontend

## Overview

The Task Manager Frontend is a React-based single-page application (SPA) designed to manage tasks efficiently. It interacts with a backend API to perform CRUD (Create, Read, Update, Delete) operations on tasks. The application features a clean, responsive user interface built with Tailwind CSS and includes a context-based state management system for seamless task handling.

## Features

- **Task Management**: Create, read, update, and delete tasks with title, description, and status (pending, in progress, completed).
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **Context API**: Manages task state globally with React Context.
- **Error Handling**: Displays user-friendly error messages for API failures.
- **Loading States**: Shows a spinner during API requests for better UX.
- **Accessibility**: Includes ARIA attributes for improved accessibility.

## Directory Structure

```
client/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── assets/
│   │   ├── react.svg           # React logo
│   ├── components/
│   │   ├── TaskForm.jsx        # Form for adding/editing tasks
│   │   ├── TaskItem.jsx        # Component for displaying a single task
│   │   ├── TaskList.jsx        # Component for listing all tasks
│   ├── context/
│   │   ├── TaskContext.jsx     # React Context for task state management
│   ├── services/
│   │   ├── api.js              # Axios instance for API requests
│   │   ├── taskService.js      # API service functions for task operations
│   ├── index.css               # Tailwind CSS styles
│   ├── main.jsx                # Entry point for React application
```

## Prerequisites

- **Node.js**: Version 18 or higher (tested with v22.17.0)
- **npm**: Version 8 or higher
- **Backend API**: A running instance of the Task Manager backend API (default: http://127.0.0.1:3000/api)
- **MongoDB**: Required for the backend API to store tasks

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

- `react`, `react-dom`
- `axios` for API requests
- `tailwindcss` for styling

### Set Up Environment Variables

Create a `.env` file in the `client` directory:

```
VITE_API_URL=http://127.0.0.1:3000/api
```

Replace the URL if your backend API is hosted elsewhere.

### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Usage

### Access the Application

Open a browser and navigate to `http://localhost:5173`.

### Manage Tasks

- **Add a Task**: Enter a title, optional description, and select a status in the form, then click "Add Task".
- **Edit a Task**: Click the "Edit" button on a task, update the details, and click "Update".
- **Delete a Task**: Click the "Delete" button and confirm the action.
- **View Tasks**: Tasks are displayed in a scrollable list with their title, description, and status.

### Error Handling

- If the backend API is unavailable, an error message (e.g., "Failed to fetch tasks") will appear.
- Validation errors from the API (e.g., missing title) are displayed clearly.

## API Integration

The frontend communicates with the backend API via the following endpoints (configured in `src/services/taskService.js`):

- `GET /api/tasks`: Fetch all tasks
- `GET /api/tasks/:id`: Fetch a single task by ID
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update an existing task
- `DELETE /api/tasks/:id`: Delete a task

API base URL is set via `VITE_API_URL` (default: `http://127.0.0.1:3000/api`)

## Development

### Scripts

Available scripts in `package.json`:

- `npm run dev`: Starts the Vite development server
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the production build locally

### Styling

- Tailwind CSS styles in `src/index.css`
- Utility classes: `text-primary`, `text-error`, etc.

### State Management

- Global state via `React Context` in `TaskContext.jsx`
- API calls handled via `taskService` with dynamic imports

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

Ensure the backend API is deployed and update `.env` with the production API URL.

## Troubleshooting

### API Errors

- Ensure backend API is running at `VITE_API_URL`
- Check browser console logs (via `axios`)

### No Tasks Displayed

- Make sure MongoDB has data and backend is working
- Test API with curl or Postman

### Styling Issues

- Confirm Tailwind CSS is set up correctly

### Dev Server Fails

- Run `npm install` to ensure dependencies
- Resolve port conflicts (default is `5173`)

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## Author

**AbdulAhad**

GitHub: [https://github.com/ahad324/task-manager](https://github.com/ahad324/task-manager)
