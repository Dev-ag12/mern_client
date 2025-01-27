import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./src/features/auth/authSlice";
import postJobReducer from "./src/features/jobs/postJobSlice";
import jobReducer from "./src/features/jobs/jobSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    postJob: postJobReducer,
    jobList: jobReducer,
  },
});

export default store;
