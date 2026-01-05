import { createClient } from '@supabase/supabase-js';
import { logger } from '../../utils/logger.js';

let supabase = null;

export const connectSupabase = () => {
    try {
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase URL and Key are required in environment variables');
        }

        supabase = createClient(supabaseUrl, supabaseKey);

        logger.success('Supabase client initialized');
        //console.log(`URL: ${supabaseUrl}`)

        return supabase
    } catch (error) {
        logger.error('Supabase connection error:', error.message);
        process.exit(1);
    }
};

export const getSupabase = () => {
    if (!supabase) {
        throw new Error('Supabase not initialized. Calla connectSupabase() first.');
    }

    return supabase;
};

export const disconnectSupabase = () => {
    if (supabase) {
        logger.warn('Supabase client closed');
        supabase = null;
    }
};