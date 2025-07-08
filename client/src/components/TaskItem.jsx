import { useTaskContext } from '../context/TaskContext';

export default function TaskItem({ task }) {
  const { setEditingTask, handleDelete } = useTaskContext();

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm flex justify-between items-start bg-white hover:shadow-md transition-all duration-200">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-2 capitalize">
          Status: <span className="font-medium">{task.status}</span>
        </p>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => setEditingTask(task)}
          className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-600 border border-red-600 px-3 py-1 rounded-md hover:bg-red-50 focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
