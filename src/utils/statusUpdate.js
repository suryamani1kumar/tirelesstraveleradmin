import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./axiosInstance";

export const updateStatusApi = createAsyncThunk(
    "putApi",
    async ( url , { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(url);
            const data = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const updateStatusData = createSlice({
    name: "updateStatusData",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateStatusApi.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateStatusApi.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(updateStatusApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default updateStatusData.reducer;
