import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const updateProgress = createAsyncThunk("progress/update",
  async ({ id, progress }) => (await api.put(`/students/${id}/progress`, { progress })).data
);

const progressSlice = createSlice({
  name: "progress",
  initialState: { updates: {} },
  reducers: {
    socketProgress: (state, action) => { state.updates[action.payload.id] = action.payload; }
  },
  extraReducers: (builder) => {
    builder.addCase(updateProgress.fulfilled, (state, action)=>{ state.updates[action.payload.id]=action.payload; });
  }
});

export const { socketProgress } = progressSlice.actions;
export default progressSlice.reducer;
