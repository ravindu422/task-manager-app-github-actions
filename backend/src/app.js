import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Healt check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

//Routes
//app.use('api/tasks', taskRoutes);

export default app;