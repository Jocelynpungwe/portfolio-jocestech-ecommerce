import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import customeFetch from '../../utils/customeFetch'
import { clearCart } from '../cart/cartSlice'

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
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

export const logoutUser = createAsyncThunk(
  'user/ogoutUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await customeFetch.get('/auth/logout')
      // have to clear everything later
      thunkAPI.dispatch(clearCart())

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
        addUserToLocalStorage(user)
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
        addUserToLocalStorage(user)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        const navigate = useNavigate()
        const { msg } = payload
        state.isLoading = false
        state.user = null
        removeUserFromLocalStorage()
        navigate('/')
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  },
})

export default userSlice.reducer
