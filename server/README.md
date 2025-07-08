# 🛠️ Task Manager API – Setup Guide

> A step-by-step guide for setting up and running the Task Manager project locally.

---

## ✅ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (installed locally or use MongoDB Atlas)
- Git (optional, for cloning)
- VSCode (or any code editor)
- Terminal access (e.g., CMD, Terminal, iTerm)

---

## 📦 Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ahad324/task-manager.git
cd task-manager
```

Or manually create the folder and copy project files.

---

### 2. Install Dependencies

Navigate to the server directory:

```bash
cd server
npm install
```

---

### 3. Create Environment File

In the `server` folder, create a `.env` file:

```bash
touch .env
```

Add the following content:

```env
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
PORT=3000
NODE_ENV=development
API_URL=http://127.0.0.1:3000/api
```

---

### 4. Start MongoDB

Make sure MongoDB is running locally:

**If installed directly:**

```bash
mongod
```

**Or using Docker:**

```bash
docker run -d --name taskmanager-mongo -p 27017:27017 mongo
```

---

### 5. Start the Server

Run the server using:

```bash
npm run dev
# or
npx nodemon src/index.js
```

Expected output:

```
Server running on port 3000
MongoDB Connected: 127.0.0.1
```

---

### 6. Test the API

Use Postman or browser to check:

```
GET http://127.0.0.1:3000/api/tasks
```

You should see an empty array `[]`.

---

### 7. View Swagger Docs (Optional)

If Swagger is integrated:

```
GET http://127.0.0.1:3000/api/docs
```

---

### 8. Project Directory Structure

```bash
task-manager/
├── server/
│   ├── .vscode/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│   └── .gitignore
│   └── prettierrc.md
│   ├── eslint.config.js
```

---

### ✅ Setup Complete

The API is now running locally and ready for development.
