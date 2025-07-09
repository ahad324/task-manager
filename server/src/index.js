import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middlewares/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', protect, taskRoutes);

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the OpenAPI specification
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/API_Documentation.yaml'));

// Serve Swagger UI at /api-docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
