import mongoose from 'mongoose';

// Define schema for Task collection
const taskSchema = new mongoose.Schema(
  {
    // Task title (required and trimmed)
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    // Optional task description
    description: {
      type: String,
      trim: true,
    },
    // Status with allowed values and default
    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed'],
      default: 'pending',
    },
    // Reference to the user who created the task
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create and export the Task model
export const Task = mongoose.model('Task', taskSchema);
