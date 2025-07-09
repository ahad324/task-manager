# Task Manager User Manual

## Getting Started

1. Open `http://localhost:5173` in your browser.
2. Ensure the backend is running at `http://127.0.0.1:3000/api`.

## Registration

1. Click "Register" in the header.
2. Enter a username (min 3 characters), email, and password (min 6 characters).
3. Click "Register" to create an account.
4. Redirected to `/tasks` upon success.

## Login

1. Click "Login" in the header.
2. Enter your email and password.
3. Click "Login" to access your tasks.
4. Error messages (e.g., "Invalid credentials") appear for 5 seconds if failed.

## Using Protected Features

- **Task Management**: After login, access `/tasks` to:
  - Add tasks with title, description, and status.
  - Edit or delete tasks via respective buttons.
- **Logout**: Click "Logout" in the header to sign out.

## Troubleshooting

- If tasks don’t load, verify login status or backend connectivity.
- Clear browser cache if authentication fails.
