import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";

// LOGIN or REGISTER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    // Try to sign in first
    const { data: existingUser, error: lookupError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (existingUser?.user) {
      // if user exists, ensure they are in the "users" table 
      await supabase.from("users").upsert({
        auth_id: existingUser.user.id,
        email: existingUser.user.email,
      });
      return existingUser.user;
    }

    // If sign in fails due to invalid credentials, attempt to sign up
    if (lookupError && lookupError.message.includes("Invalid login credentials")) {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      // If sign up also fails, return the error
      if (signUpError) return rejectWithValue(signUpError.message);

      // On successful sign up, add user to "users" table and return user data
      await supabase.from("users").upsert({
        auth_id: signUpData.user.id,
        email: signUpData.user.email,
      });

      return signUpData.user;
    }

    return rejectWithValue(lookupError?.message || "Unknown error");
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await supabase.auth.signOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    initializing: true,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setInitializing(state, action) {
      state.initializing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Export the actions to be used in components
export const { setUser, setInitializing } = authSlice.actions;
// Export the reducer to be included in the store
export default authSlice.reducer;
