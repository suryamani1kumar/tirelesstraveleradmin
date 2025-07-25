import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./axiosInstance";

export const sumbitData = createAsyncThunk(
  "postData",
  async ({ url, requestBody, headers }, { rejectWithValue }) => {
    try {
      const config = headers ? { headers } : {};
      const response = await axiosInstance.post(url, requestBody, config);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const postData = createSlice({
  name: "postData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sumbitData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sumbitData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(sumbitData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default postData.reducer;
