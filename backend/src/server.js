import dotenv from 'dotenv';
import app from './app.js';
import { connectSupabase } from '../config/supabase.js';

dotenv.config();

const PORT = process.env.PORT || 5020;

const startServer = async () => {
    try {
        connectSupabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/health`);
        })
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle shutdown gracefully
const shutdown = () => {
    console.log('\n Shutting down gracefully...');
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();