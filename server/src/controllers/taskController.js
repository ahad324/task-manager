import { Task } from '../models/taskModel.js';
import Joi from 'joi';
import mongoose from 'mongoose';

// Validation schema for creating a task
const createTaskSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().trim().optional().allow(''),
  status: Joi.string()
    .valid('pending', 'in progress', 'completed')
    .optional()
    .default('pending'),
});

// Validation schema for updating a task
const updateTaskSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().optional().allow(''),
  status: Joi.string().valid('pending', 'in progress', 'completed').optional(),
});

// Validate MongoDB ObjectId
const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// @desc Get all tasks for the authenticated user
// @route GET /api/tasks
// @access Private
export const getTasks = async (req, res) => {
  try {
    // Fetch all tasks created by the logged-in user, sorted by latest first
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Get single task by ID
// @route GET /api/tasks/:id
// @access Private
export const getTask = async (req, res) => {
  try {
    // Validate if task ID is a valid MongoDB ObjectId
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Find task by ID and ensure it belongs to the logged-in user
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Create a new task
// @route POST /api/tasks
// @access Private
export const createTask = async (req, res) => {
  try {
    // Validate incoming task data
    const { error, value } = createTaskSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
    }

    // Create and associate task with the current user
    const task = await Task.create({ ...value, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Update a task by ID
// @route PUT /api/tasks/:id
// @access Private
export const updateTask = async (req, res) => {
  try {
    // Validate task ID format
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Validate request body fields
    const { error, value } = updateTaskSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
    }

    // Find the task and ensure it belongs to the user
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Update the task fields
    Object.assign(task, value);
    const updated = await task.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Delete a task by ID
// @route DELETE /api/tasks/:id
// @access Private
export const deleteTask = async (req, res) => {
  try {
    // Validate task ID format
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Find task and ensure ownership
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Delete the task
    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};
