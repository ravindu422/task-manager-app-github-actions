import dotenv from 'dotenv';
import app from './app.js';
import { connectSupabase } from './config/supabase.js';
import { logger } from '../utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 5020;

const startServer = async () => {
    try {
        connectSupabase();

        app.listen(PORT, () => {
            logger.success(`Server running on port ${PORT}`);
            logger.info(`Health check: http://localhost:${PORT}/health`);
        })
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle shutdown gracefully
const shutdown = () => {
    console.log("\x1b[1;35m\n Shutting down gracefully...\x1b[0m");
    //logger.info('\n Shutting down gracefully...');
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();