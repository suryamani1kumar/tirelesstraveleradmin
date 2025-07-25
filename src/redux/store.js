import { configureStore } from "@reduxjs/toolkit";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import updateStatusData from "../utils/statusUpdate"
import updateData from "../utils/updateData"

const store = configureStore({
  reducer: {
    fetchApi: fetchData,
    postApi: postData,
    updateStatusApi: updateStatusData,
    updateApi: updateData,
  },
});

export default store;
