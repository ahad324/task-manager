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
  status: Joi.string()
    .valid('pending', 'in progress', 'completed')
    .optional(),
});

// Validate MongoDB ObjectId
const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// @desc Get all tasks
// @route GET /api/tasks
// @access Public
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Get single task by ID
// @route GET /api/tasks/:id
// @access Public
export const getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Create a new task
// @route POST /api/tasks
// @access Public
export const createTask = async (req, res) => {
  try {
    const { error, value } = createTaskSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
    }
    const task = await Task.create(value);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Update a task by ID
// @route PUT /api/tasks/:id
// @access Public
export const updateTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const { error, value } = updateTaskSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
    }
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Update only provided fields
    Object.assign(task, value);
    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Delete a task by ID
// @route DELETE /api/tasks/:id
// @access Public
export const deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};