import { useState, useEffect } from 'react';

const defaultForm = { title: '', description: '', status: 'pending' };

export default function TaskForm({ onSubmit, editingTask, cancelEdit }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'pending',
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    if (!editingTask) setForm(defaultForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50 p-6 rounded-xl shadow-sm mb-6"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="Enter task title"
          value={form.title}
          onChange={handleChange}
          required
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          rows="4"
        />
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
