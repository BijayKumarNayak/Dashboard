import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTask } from "../redux/slices/taskSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  const filters = ["all", "completed", "pending", "overdue"];

  return (
    <div className="flex items-center justify-center gap-4 p-4 mt-2 bg-gray-100 rounded shadow">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch(filterTask(filter))}
          className={`px-4 py-2 rounded ${
            currentFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
