import { createSlice } from "@reduxjs/toolkit"

const resultSlice = createSlice({
    name: "results",
    initialState: {
        scores: [20,30,45],
    },
    reducers: {
    }

})

export default resultSlice.reducer;