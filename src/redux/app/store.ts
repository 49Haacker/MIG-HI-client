import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/login/loginSlice";
import verifyOtpSlice from "../features/otpVerify/otpVerifySlice";
import logoutSlice from "../features/logOut/logoutSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    verifyOtp: verifyOtpSlice,
    logout: logoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
