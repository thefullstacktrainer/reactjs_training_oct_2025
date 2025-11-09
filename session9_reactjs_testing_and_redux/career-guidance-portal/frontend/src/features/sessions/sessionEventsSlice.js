import { createSlice } from "@reduxjs/toolkit";

const sessionEventsSlice = createSlice({
  name: "sessionEvents",
  initialState: { liveSessions: [] },
  reducers: {
    addLiveSession: (state, action) => {
      if (!state.liveSessions.find((session) => session.id === action.payload.id))
        state.liveSessions.unshift(action.payload);
    },
    clearSessions: (state) => { state.liveSessions = []; }
  }
});

export const { addLiveSession, clearSessions } = sessionEventsSlice.actions;
export default sessionEventsSlice.reducer;
