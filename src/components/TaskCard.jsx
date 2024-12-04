import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../redux/slices/taskSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  return (
    <div className="p-4 bg-white rounded shadow hover:shadow-lg">
      {isEditing ? (
        <TaskForm task={task} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h3 className="mb-2 text-lg font-bold text-black">{task.title}</h3>
          <p className="mb-2 text-sm text-gray-600">{task.description}</p>
          <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
          <div className="flex flex-col items-center justify-between mt-4">
            <button
              onClick={handleToggle}
              className={`px-4 py-1 text-white rounded ${
                task.completed ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {task.completed ? "Completed" : "Mark Complete"}
            </button>
            <div className="flex items-center gap-1 mt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
