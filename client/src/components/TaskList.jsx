import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks } = useTaskContext();

  if (!tasks.length)
    return (
      <p className="text-center text-gray-500 py-2 transition-all duration-300">
        No tasks found.
      </p>
    );

  return (
    <div className="space-y-4 transition-all duration-300 overflow-scroll h-96">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}
