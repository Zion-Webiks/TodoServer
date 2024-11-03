import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import missionsRouter from './routes/missionsroutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/missions', missionsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
