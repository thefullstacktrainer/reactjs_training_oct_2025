import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const fetchStudents = createAsyncThunk("students/fetch", async ()=> (await api.get("/students")).data);
export const addStudent = createAsyncThunk("students/add", async (student)=> (await api.post("/students", student)).data);
export const deleteStudent = createAsyncThunk("students/delete", async (id)=> { await api.delete(`/students/${id}`); return id; });
export const fetchMyMentees = createAsyncThunk("students/fetchMine", async ()=> (await api.get("/students/mine")).data);
export const assignStudentMentor = createAsyncThunk("students/assign", async ({ studentId, mentorId })=> (await api.put(`/students/${studentId}/assign`, { mentorId })).data);

const studentSlice = createSlice({
  name: "students",
  initialState: { list: [], mine: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchStudents.pending, (state)=>{ state.status="loading"; })
     .addCase(fetchStudents.fulfilled, (state, action)=>{ state.status="succeeded"; state.list=action.payload; })
     .addCase(addStudent.fulfilled, (state, action)=>{ state.list.push(action.payload); })
     .addCase(deleteStudent.fulfilled, (state, action)=>{ state.list = state.list.filter(student=>student.id!==action.payload); })
     .addCase(fetchMyMentees.fulfilled, (state, action)=>{ state.mine = action.payload; });
  }
});
export default studentSlice.reducer;
