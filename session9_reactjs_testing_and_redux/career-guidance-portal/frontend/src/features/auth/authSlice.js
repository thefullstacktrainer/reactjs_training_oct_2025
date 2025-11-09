import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../../api/axiosClient";
import { socket } from "../../api/socket";

const AUTH_API = "/mentors";

// 🔹 Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${AUTH_API}/login`, credentials);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, status: "idle", error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      setAuthToken(null); // ✅ clear auth header
      socket.disconnect(); // optional cleanup
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;

        // ✅ set token in axios header
        setAuthToken(action.payload.token);

        // ✅ auto-join mentor socket room
        if (action.payload?.id) {
          socket.connect();
          socket.emit("joinRoom", `mentor_${action.payload.id}`);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
