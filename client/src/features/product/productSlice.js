import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import customeFetch from '../../utils/customeFetch'

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: [],
}

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, thunkAPI) => {
    try {
      const { data } = await customeFetch.get('/products')
      console.log(data)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.products_loading = true
        state.products_error = false
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        const { products } = payload
        state.products_loading = false
        state.products_error = false
        state.products = products

        state.featured_products = products.filter((product) => {
          return product.featured === true
        })
        console.log(current(state))
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.products_loading = false
        state.products_error = true
      })
  },
})

export default productSlice.reducer
