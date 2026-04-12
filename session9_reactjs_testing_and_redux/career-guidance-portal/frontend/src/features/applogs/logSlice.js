import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const fetchLogs = createAsyncThunk("logs/fetchAll", async () => (await api.get("/admin/logs")).data);
export const searchLogs = createAsyncThunk("logs/search", async (params) => {
  const query = new URLSearchParams(params).toString();
  return (await api.get(`/admin/logs/search?${query}`)).data;
});

const logsSlice = createSlice({
  name: "logs",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogs.pending, (state)=>{state.status="loading"})
     .addCase(fetchLogs.fulfilled, (state, action)=>{state.status="succeeded"; state.list=action.payload})
     .addCase(searchLogs.fulfilled, (state, action)=>{state.status="succeeded"; state.list=action.payload})
     .addCase(fetchLogs.rejected, (state, action)=>{state.status="failed"; state.error=action.error.message});
  }
});
export default logsSlice.reducer;
