import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
// import {
//   addUserToLocalStorage,
//   getUserFromLocalStorage,
//   removeUserFromLocalStorage,
// } from '../../utils/localStorage'
import customeFetch from '../../utils/customeFetch'

const initialState = {
  isLoading: false,
  user: [],
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/auth/register', user)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/auth/login', user)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.user = user
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  },
})

export default userSlice.reducer
