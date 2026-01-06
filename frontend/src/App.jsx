import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/Taskform';
import FilterBar from './components/Filterbar';
import TaskList from './components/Tasklist';


function App() {
  const [filter, setFilter] = useState('all');
  const {
    tasks,
    loading,
    error,
    createTask,
    deleteTask,
    toggleTaskComplete
  } = useTasks();

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleDeleteTask = async (id) => {  
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  
  const taskCounts = {
    all: tasks?.length || 0,
    active: tasks?.filter(t => !t.completed).length || 0,
    completed: tasks?.filter(t => t.completed).length || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">  
      <div className='container mx-auto px-4 py-8 max-w-3xl'>
        <header className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Task Manager</h1>
          <p className='text-gray-600'>Organize your tasks efficiently</p>
        </header>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <p>{error}</p>
          </div>
        )}

        <TaskForm onSubmit={handleCreateTask} />

        <FilterBar 
          filter={filter}
          onFilterChange={setFilter}  
          taskCounts={taskCounts}
        />

        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
            <p className='mt-4 text-gray-600'>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks || []}  
            onToggle={toggleTaskComplete}
            onDelete={handleDeleteTask}
            filter={filter}
          />
        )}
      </div>
    </div>
  );
}

export default App;