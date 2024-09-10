import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/app/lib/api";

export interface TaskState {
  tasks: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
};

// Fetch tasks from the server
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message); // Handle errors gracefully
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: {
    title: string;
    description?: string;
    priority: string;
    status: string;
  }) => {
    const response = await api.post("/tasks", taskData); // No userId needed here
    return response.data;
  }
);
// Update an existing task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData: {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
  }) => {
    try {
      const response = await api.patch(`/tasks/${taskData._id}`, {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
      });
      return response.data;
    } catch (error: any) {
      // Improved error handling
      const message = error.response?.data?.message || "Failed to update task";
      console.error(message); // Log the error for debugging
      throw new Error(message);
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await api.delete(`/tasks`, { data: { taskId } });
    return taskId;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = "idle";
      })
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        console.error("Fetch tasks failed:", action.payload);
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        console.error("Create task failed:", action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        console.error("Update task failed:", action.payload);
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        console.error("Delete task failed:", action.payload);
      });
  },
});

export default taskSlice.reducer;
