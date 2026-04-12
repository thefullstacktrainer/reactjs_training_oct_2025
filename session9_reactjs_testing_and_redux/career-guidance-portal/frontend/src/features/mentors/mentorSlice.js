import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export const fetchMentors = createAsyncThunk("mentors/fetchAll", async () => (await api.get("/admin/mentors")).data);
export const createMentor = createAsyncThunk("mentors/create", async (data) => (await api.post("/admin/mentors", data)).data);
export const updateMentor = createAsyncThunk("mentors/update", async ({ id, changes }) => (await api.put(`/admin/mentors/${id}`, changes)).data);
export const deleteMentor = createAsyncThunk("mentors/delete", async (id) => { await api.delete(`/admin/mentors/${id}`); return id; });

const mentorsSlice = createSlice({
  name: "mentors",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMentors.pending, (state)=>{state.status="loading"})
     .addCase(fetchMentors.fulfilled, (state, action)=>{state.status="succeeded"; state.list=action.payload})
     .addCase(fetchMentors.rejected, (state, action)=>{state.status="failed"; state.error=action.error.message})
     .addCase(createMentor.fulfilled, (state, action)=>{state.list.push(action.payload)})
     .addCase(updateMentor.fulfilled, (state, action)=>{ const index=state.list.findIndex(mentor=>mentor.id===action.payload.id); if(index>-1) state.list[index]=action.payload; })
     .addCase(deleteMentor.fulfilled, (state, action)=>{ state.list = state.list.filter(mentor=>mentor.id!==action.payload); });
  }
});
export default mentorsSlice.reducer;
