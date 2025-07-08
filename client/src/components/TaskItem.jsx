import { useTaskContext } from '../context/TaskContext';

export default function TaskItem({ task }) {
  const { setEditingTask, handleDelete } = useTaskContext();

  return (
    <div className="border rounded p-4 shadow-sm flex justify-between items-start bg-gray-50">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs mt-1 italic">Status: {task.status}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setEditingTask(task)}
          className="text-blue-500 border px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 border px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
