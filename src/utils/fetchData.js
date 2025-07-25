import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./axiosInstance";

export const getData = createAsyncThunk("fetchData", async (url) => {
    const response = await axiosInstance.get(url)
    const data = response.data
    return data
})

const fetchData = createSlice({
    name: "fetchApi",
    initialState: {
        data: [],
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

    }
})

export default fetchData.reducer