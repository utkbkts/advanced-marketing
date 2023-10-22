import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./Authservice";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  Message: "",
};

//KAYIT İŞLEMİ
export const register = createAsyncThunk(
  "auth/register",
  async (userResponse, thunkAPI) => {
    try {
      return await authService.register(
        userResponse.email,
        userResponse.password,
        userResponse.name,
        userResponse.selectedFile
      );
    } catch (error) {
      const message = error.message;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//GİRİŞ İŞLEMİ

export const login = createAsyncThunk("auth/login",async(user,thunkAPI)=>{
  try {
      return await authService.login(user.email,user.password)
  } catch (error) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
  }
})
//LOGOUT
export const logout = createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
    try {
      await authService.logout()
    } catch (error) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  })
export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.Message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //KAYIT
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.Message = action.payload;
        state.user = null;
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.Message = action.payload;
        state.user = null;
      })
        //login
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = null;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.Message = action.payload;
          state.user = null;
        });
  },
});

export const { reset } = AuthSlice.actions;
export default AuthSlice.reducer;
