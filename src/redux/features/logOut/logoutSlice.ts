import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "@/axios";

// Define the logout async thunk
export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("logout");
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError;
        console.error(
          "LogOut error:",
          axiosError.response?.data ?? axiosError.message
        );
        return rejectWithValue(axiosError.response?.data ?? axiosError.message);
      } else {
        console.error("LogOut error:", error);
        return rejectWithValue("Unknown error occurred");
      }
    }
  }
);

interface LogoutState {
  loading: boolean;
  error: null | string;
}

const initialState: LogoutState = {
  loading: false,
  error: null as string | null,
};

// Create the logout slice
const logoutSlice = createSlice({
  name: "logout",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      localStorage.removeItem("token");
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default logoutSlice.reducer;
