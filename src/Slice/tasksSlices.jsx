import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  selectedTask: {},
  isLoading: false,
  error: '',
};

const BASE_URL = 'http://localhost:3000/tasks';

// GET tasks from server
export const getTaskFromServer = createAsyncThunk(
  "tasks/getTaskFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('No tasks found');
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST new task to server
export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Task not added');
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PATCH - update task on server
export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${task.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Task not updated');
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE - delete task from server
export const deleteTaskFromServer = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Task not deleted');
      }
      return taskId; // Return the deleted task ID to update state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id=Math.random()*100;
      let task={...action.payload,id}
      state.taskList.push(task)
    },
    removeTaskFromList: (state, action) => {
      state.taskList = state.taskList.filter((task) => task.id !== action.payload);
    },
    updateTaskFromList: (state, action) => {
      state.taskList = state.taskList.map((task)=>task.id === action.payload.id ? action.payload:task)
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET Tasks
      .addCase(getTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.taskList = action.payload;
      })
      .addCase(getTaskFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.taskList = [];
      })
      // POST Task
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.taskList.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      // PATCH Task
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.taskList = state.taskList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // DELETE Task
      .addCase(deleteTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.taskList = state.taskList.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskFromServer.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { addTaskToList,updateTaskFromList,removeTaskFromList, setSelectedTask } = tasksSlice.actions;

export default tasksSlice.reducer;
