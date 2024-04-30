import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/axios";

interface VerifyOtpState {
  loading: boolean;
  error: string | null;
}

const initialState: VerifyOtpState = {
  loading: false,
  error: null,
};

export interface VerifyOtpResponse {
  data: {
    id: number;
    createdAt: string;
    isOtpVerified: string;
    otp: string;
    phoneNo: string;
    updatedAt: string;
    userType: string;
    userTypeText: string;
  };
  message: string;
  status: string;
  statusCode: number;
  token: string;
}

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async ({ phoneNumber, code }: { phoneNumber: string; code: string }) => {
    const response = await axios.post("otp-verify", {
      phoneNo: phoneNumber,
      otp: code,
    });

    return response.data;
  }
);

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      // Handle successful OTP verification
      if (action.payload.statusCode === 200) {
        localStorage.setItem("token", action.payload.token);
      } else {
        state.error = "OTP verification failed";
      }
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Unknown error occurred";
    });
  },
});

export default verifyOtpSlice.reducer;
