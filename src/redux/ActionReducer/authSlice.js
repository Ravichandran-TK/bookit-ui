import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ formValues, navigate, toast }) => {
    try {
      const response = await api.signIn(formValues);
      toast.success('Logged in successfully.')
      navigate(`/home`);
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.response.data.message);
      }
      return err.response.data.message;
    }
  }
);

export const workspacebooking = createAsyncThunk(
  "auth/workspacebooking",
  async () => {
    console.log("inside-workspace");
    try {
      const response = await api.workspaceDetails();
      return response.data;
    } catch (err) {
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log(err.response.data.message);
      }
      return err.response.data.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    workspace_details: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [workspacebooking.pending]: (state, action) => {
      state.loading = true;
    },
    [workspacebooking.fulfilled]: (state, action) => {
      state.loading = false;
      state.workspace_details = action.payload;
    },
    [workspacebooking.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
