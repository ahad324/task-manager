import { useTaskContext } from '../context/TaskContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function TaskManager() {
  const { loading, error, editingTask, setEditingTask, handleAddOrUpdate } =
    useTaskContext();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Manage Your Tasks
      </h2>
      <TaskForm
        onSubmit={handleAddOrUpdate}
        editingTask={editingTask}
        cancelEdit={() => setEditingTask(null)}
      />
      {loading ? (
        <div className="flex justify-center" aria-live="polite">
          <div
            className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p
          className="text-center text-red-600 py-2 bg-red-50 rounded-md"
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
