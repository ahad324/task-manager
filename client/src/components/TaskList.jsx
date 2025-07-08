import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks } = useTaskContext();

  if (!tasks.length)
    return (
      <p className="text-center text-gray-500 py-4">
        No tasks found. Add a new task to get started.
      </p>
    );

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}
