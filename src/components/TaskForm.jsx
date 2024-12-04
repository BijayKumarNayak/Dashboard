import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/slices/taskSlice";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ task = null, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      // Editing an existing task
      dispatch(
        editTask({
          id: task.id,
          updates: { title, description, dueDate },
        })
      );
    } else {
      // Adding a new task
      dispatch(
        addTask({
          id: uuidv4(),
          title,
          description,
          dueDate,
          completed: false,
        })
      );
    }

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow">
      <h2 className="mb-4 text-lg font-bold text-black">
        {task ? "Edit Task" : "Add Task"}
      </h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        {task ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
