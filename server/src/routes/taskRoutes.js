import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Route to get all tasks or create a new task (GET/POST /tasks)
router.route('/').get(getTasks).post(createTask);

// Route to get, update, or delete a single task by ID (GET/PUT/DELETE /tasks/:id)
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router;
