import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface AuthState {
  user: { id: string; email: string; fullName: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: string; email: string; fullName: string }>
    ) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state:RootState) => state.auth.user;
export default authSlice.reducer;
