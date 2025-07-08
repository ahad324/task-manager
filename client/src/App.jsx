import { useTaskContext } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const {
    loading,
    error,
    editingTask,
    setEditingTask,
    handleAddOrUpdate,
  } = useTaskContext();

  return (
    <div
      className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
      role="main"
      aria-label="Task Manager Application"
    >
      <h1
        className="text-3xl font-bold text-center text-primary mb-6"
        tabIndex="0"
      >
        Task Manager
      </h1>
      <TaskForm
        onSubmit={handleAddOrUpdate}
        editingTask={editingTask}
        cancelEdit={() => setEditingTask(null)}
      />
      {loading ? (
        <div className="flex justify-center" aria-live="polite">
          <div
            className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin transition-all duration-300"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p
          className="text-center text-error py-2 bg-red-50 rounded transition-all duration-300"
          role="alert"
        >
          {error}
        </p>
      ) : (
        <TaskList />
      )}
    </div>
  );
}

export default App;
