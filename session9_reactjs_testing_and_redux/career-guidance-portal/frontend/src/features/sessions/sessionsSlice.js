import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const fetchSessions = createAsyncThunk("sessions/fetchAll", async () => (await api.get("/sessions")).data);
export const createSession = createAsyncThunk("sessions/create", async (payload) => (await api.post("/sessions", payload)).data);

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending,   (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchSessions.fulfilled, (state, action) => { state.status = "succeeded"; state.list = action.payload; })
      .addCase(fetchSessions.rejected,  (state, action) => { state.status = "failed"; state.error = action.error.message; })
      .addCase(createSession.fulfilled, (state, action) => { state.list.push(action.payload); });
  },
});
export default sessionsSlice.reducer;
