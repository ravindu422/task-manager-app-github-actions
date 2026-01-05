import { getSupabase } from "../config/supabase.js";

class Task {
    // Get all tasks
    static async findAll(filter = {}) {
        const supabase = getSupabase();

        let query = supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

        if (filter.completed !== undefined) {
            query = query.eq('completed', filter.completed);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data;
    }

    // Find task by ID
    static async findById(id) {
        const supabase = getSupabase();

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }

    // Create new task
    static async create(taskSata) {
        const { title, description= '' } = taskSata;

        // Validation
        if (!title || title.trim() === '') {
            throw new Error('Title is required');            
        }

        if (title.length > 100) {
            throw new Error('Description cannot exceed 500 characters');
        }

        const supabase = getSupabase();

        const { data,error } = await supabase 
            .from('tasks')
            .insert([{ title, description }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    }

    // Update task
    static async update(id, taskData) {
        const { title, description, completed } = taskData;

        // Build update object
        const updates = {}

        if (title !== undefined) {
            if (title.trim() === '') {
                throw new Error('Title is required');
            }
            if (title.length > 100) {
                throw new Error('Title cannot exceed 100 characters');
            }
            updates.title = title;
        }

        if (description !== undefined) {
            if (description.length > 500) {
                throw new Error('Description cannot exceed 500 characters');
            }
            updates.description = description;
        }

        if (completed !== undefined) {
            updates.completed = completed;
        }

        if (Object.keys(updates).length === 0) {
            return this.findById(id);
        }

        const supabase = getSupabase();

        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }

    // Delete task
    static async delete(id) {
        const supabase = getSupabase();

        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }

    // Delete All
    static async deleteAll() {
        const supabase = getSupabase();

        const { error } = await supabase
            .from('tasks')
            .delete()
            .neq('id', 0);

        if (error) throw error;
    }
}

export default Task;