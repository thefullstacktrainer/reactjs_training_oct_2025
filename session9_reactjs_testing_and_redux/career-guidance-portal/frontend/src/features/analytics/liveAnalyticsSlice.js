import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const fetchLiveStats = createAsyncThunk("live/fetch", async () => {
  const response = await api.get("/analytics/summary");
  return response.data;
});

const liveAnalyticsSlice = createSlice({
  name: "liveAnalytics",
  initialState: { stats: { total: 0, byMentor: {}, updated: null }, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLiveStats.pending, (state)=>{ state.status="loading"; })
     .addCase(fetchLiveStats.fulfilled, (state, action)=>{ state.status="succeeded"; state.stats=action.payload; })
     .addCase(fetchLiveStats.rejected, (state, action)=>{ state.status="failed"; state.error=action.error.message; });
  }
});
export default liveAnalyticsSlice.reducer;
