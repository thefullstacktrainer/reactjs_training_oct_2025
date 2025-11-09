import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { list: [], unread: 0 },
  reducers: {
    pushNotification: (state, action) => { state.list.unshift(action.payload); if (state.list.length > 50) state.list.pop(); state.unread++; },
    markAllRead: (state) => { state.unread = 0; },
    clearNotifications: (state) => { state.list = []; state.unread = 0; }
  }
});
export const { pushNotification, markAllRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
