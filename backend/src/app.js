import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import taskRoutes from '../routes/taskRoutes';
import { errorHandler, notFound } from '../middleware/errorHandler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healt check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'Supabase (PostgreSQL)', 
    });
});

// API routes
app.use('api/tasks', taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;