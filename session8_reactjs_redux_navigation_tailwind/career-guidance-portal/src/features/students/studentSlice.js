import { createSlice } from "@reduxjs/toolkit"

const studentSlice = createSlice({
    name: "students",
    initialState: {
        list: [],
        company:"Intellipaat"
    },
    reducers: {
        addStudent: (state, action) => {
            state.list.push(action.payload)
        },
        removeStudent: (state, action) => {
            state.list = state.list.filter((student) => student.id !== action.payload)
        }
    }

})

export const { addStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;