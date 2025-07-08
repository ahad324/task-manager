import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await import('../services/taskService').then((m) =>
        m.getTasks()
      );
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddOrUpdate = async (data) => {
    try {
      if (editingTask) {
        await import('../services/taskService').then((m) =>
          m.updateTask(editingTask._id, data)
        );
      } else {
        await import('../services/taskService').then((m) => m.createTask(data));
      }
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await import('../services/taskService').then((m) => m.deleteTask(id));
        loadTasks();
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting task');
      }
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        editingTask,
        setEditingTask,
        handleAddOrUpdate,
        handleDelete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);
