import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 🔹 Login User
export const loginUser = createAsyncThunk("auth/loginUser", async (loginData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch(getUserProfile(data.jwt)); // Fetch user data after login
    }
    return data.jwt;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Register User
export const registerUser = createAsyncThunk("auth/registerUser", async (registerData, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch(getUserProfile(data.jwt)); // Fetch user data after signup
    }
    return data.jwt;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Get User Profile
export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Find User by ID
export const findUserById = createAsyncThunk("auth/findUserById", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}`); // Fixed: use axios instead of api
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Update User Profile
export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/api/users/update`, reqData); // Fixed: use axios
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Follow User
export const followUserAction = createAsyncThunk("auth/followUserAction", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/api/users/${userId}/follow`); // Fixed: use axios
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Set to null initially; we'll hydrate on client side
    jwt: null,  // Set to null initially; we'll hydrate on client side
    loading: false,
    error: null,
    findUser: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
      }
    },
    // Add a reducer to initialize state from localStorage on client side
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        state.jwt = localStorage.getItem("jwt") || null;
        state.user = JSON.parse(localStorage.getItem("user")) || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.jwt = action.payload; state.loading = false; })
      .addCase(loginUser.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.jwt = action.payload; state.loading = false; })
      .addCase(registerUser.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(getUserProfile.pending, (state) => { state.loading = true; })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(findUserById.fulfilled, (state, action) => { state.findUser = action.payload; })
      .addCase(updateUserProfile.fulfilled, (state, action) => { state.findUser = action.payload; })
      .addCase(followUserAction.fulfilled, (state, action) => { state.findUser = action.payload; });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;