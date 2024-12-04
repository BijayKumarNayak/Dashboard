import { createSlice } from "@reduxjs/toolkit";
const loadFromLocalStorage = () => {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch {
    return [];
  }
};
const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const initialState = {
  tasks: loadFromLocalStorage(),
  filter: "all",
};
const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveToLocalStorage(state.tasks);
    },

    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) Object.assign(task, updatedTask);
      saveToLocalStorage(state.tasks);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
      saveToLocalStorage(state.tasks);
    },
    filterTask: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, filterTask, toggleTask } =
  taskSlice.actions;
export default taskSlice.reducer;
