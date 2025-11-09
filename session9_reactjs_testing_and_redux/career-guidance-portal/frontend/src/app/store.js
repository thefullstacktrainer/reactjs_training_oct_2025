import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import studentsReducer from "../features/students/studentSlice";
import sessionsReducer from "../features/sessions/sessionsSlice";
import mentorsReducer from "../features/mentors/mentorSlice";
import logsReducer from "../features/logs/logSlice";
import liveAnalyticsReducer from "../features/analytics/liveAnalyticsSlice";
import sessionEventsReducer from "../features/sessions/sessionEventsSlice";
import progressReducer from "../features/students/progressSlice";
import notificationsReducer from "../features/notifications/notificationSlice";

const authPersistedReducer = persistReducer({ key:"auth", storage, whitelist:["token","user"] }, authReducer);

export const store = configureStore({
  reducer: { 
    auth: authPersistedReducer, 
    students: studentsReducer, 
    sessions: sessionsReducer, 
    mentors: mentorsReducer, 
    logs: logsReducer, 
    live: liveAnalyticsReducer, 
    sessionEvents: sessionEventsReducer, 
    progress: progressReducer, 
    notifications: notificationsReducer 
  },
  middleware: (getDefault)=>getDefault({ serializableCheck:false })
});
export const persistor = persistStore(store);
