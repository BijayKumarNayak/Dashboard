import React from "react";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    if (filter === "overdue") return new Date(task.dueDate) < new Date();
    return true;
  });
  return (
    <div className="w-full md:w-[600px]">
      <TaskForm />
      <FilterBar />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
