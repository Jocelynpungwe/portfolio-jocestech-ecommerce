import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import customeFetch from '../../utils/customeFetch'
import { getSingleProductReview } from '../product/productSlice'

const initialState = {
  title: '',
  comment: '',
  rating: 1,
  isLoading: false,
  isError: false,
  isEdit: false,
  editReviewId: '',
}

export const addReview = createAsyncThunk(
  'review/addReview',
  async (review, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/reviews', review)

      thunkAPI.dispatch(
        getSingleProductReview(thunkAPI.getState().products.single_product.id)
      )

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async (reviews, thunkAPI) => {
    const { reviewId, review } = reviews
    try {
      const { data } = await customeFetch.patch(`/reviews/${reviewId}`, review)
      thunkAPI.dispatch(
        getSingleProductReview(thunkAPI.getState().products.single_product.id)
      )
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewsId, thunkAPI) => {
    try {
      const { data } = await customeFetch.delete(`/reviews/${reviewsId}`)
      thunkAPI.dispatch(
        getSingleProductReview(thunkAPI.getState().products.single_product.id)
      )

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    handleReviewChange: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    handleEditReview: (state, { payload }) => {
      const { reviewId, reviews } = payload

      const editReview = reviews.find((review) => {
        return review._id === reviewId
      })

      state.isEdit = true
      state.editReviewId = reviewId
      state.comment = editReview.comment
      state.rating = editReview.rating
      state.title = editReview.title
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(addReview.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.isEdit = true
        state.editReviewId = ''
        state.comment = initialState.comment
        state.rating = initialState.rating
        state.title = initialState.title
      })
      .addCase(addReview.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(updateReview.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.isEdit = true
        state.editReviewId = ''
        state.comment = initialState.comment
        state.rating = initialState.rating
        state.title = initialState.title
      })
      .addCase(updateReview.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true
        state.isError = false
        console.log('pending')
      })
      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.isEdit = true
        state.editReviewId = ''
        state.comment = initialState.comment
        state.rating = initialState.rating
        state.title = initialState.title
        console.log('fullfiled')
        console.log(current(state))
      })
      .addCase(deleteReview.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        console.log('reject')
        console.log(payload)
      })
  },
})

export const { handleReviewChange, handleEditReview } = reviewSlice.actions
export default reviewSlice.reducer
