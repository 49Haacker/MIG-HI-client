import axios, { AxiosError } from "@/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const adminCustomerLogin = createAsyncThunk(
  "loginAdminCustomer",
  async (number: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("customer-login", {
        phoneNo: number,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        console.error(
          "Login error:",
          axiosError.response?.data ?? axiosError.message
        );
        return rejectWithValue(axiosError.response?.data ?? axiosError.message);
      } else {
        console.error("Login error:", error);
        return rejectWithValue("Unknown error occurred");
      }
    }
  }
);

// Initial state interface
interface LoginState {
  loginData: object;
  loading: boolean;
  error: null | string;
}

// Initial state
const initialState: LoginState = {
  loginData: {},
  loading: false,
  error: null,
};

// Create login slice
const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(adminCustomerLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(adminCustomerLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.loginData = action.payload;
    });
    builder.addCase(adminCustomerLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default loginSlice.reducer;
