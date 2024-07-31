import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../types";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (email: string) => {
    const response = await axios.get(`/api/tasks?email=${email}`);
    return response.data as Task[];
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }: { id: string; status: Task["status"] }) => {
    const response = await axios.patch(`/api/tasks/${id}`, { status });
    return response.data as Task;
  }
);

interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })
      .addCase(
        updateTaskStatus.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (task) => task._id === action.payload._id
          );
          if (index !== -1) {
            state.tasks[index].status = action.payload.status;
          }
        }
      );
  },
});

export default tasksSlice.reducer;
