import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useAuthContext } from './AuthContext';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuthContext();

  const loadTasks = useCallback(async () => {
    if (!user) return;
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
  }, [user]); // 👈 depends on `user`

  useEffect(() => {
    loadTasks();
  }, [loadTasks]); // 👈 add it safely now

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
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await import('../services/taskService').then((m) => m.deleteTask(id));
        await loadTasks();
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
