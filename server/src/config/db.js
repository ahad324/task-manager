import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error message and exit process with failure
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
