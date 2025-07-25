import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./axiosInstance";

export const updateApi = createAsyncThunk(
  "putApi",
  async ({ url, requestBody, headers }, { rejectWithValue }) => {
    try {
      const config = headers ? { headers } : {};
      const response = await axiosInstance.put(url, requestBody, config);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const updateData = createSlice({
  name: "updateData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateApi.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default updateData.reducer;
