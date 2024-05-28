import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import customeFetch from '../../utils/customeFetch'

const initialBilling = {
  address: {
    line1: '',
    city: '',
    state: '',
    postal_code: '',
  },
}

const initialState = {
  orderLoading: false,
  orderError: false,
  order: {},
  clientSecret: null,
  ...initialBilling,
}

export const createOrder = createAsyncThunk(
  'order/create',
  async (item, thunkAPI) => {
    try {
      const { data } = await customeFetch.post('/orders', item)
      console.log('order created', data)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const updateOrder = createAsyncThunk(
  'order/update',
  async (item, thunkAPI) => {
    try {
      const { order, address, paymentIntentId } = item
      console.log(address)
      const { data } = await customeFetch.patch(`/orders/${order.orderId}`, {
        paymentIntentId,
        address,
      })

      console.log('order/update', data)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    toggleAddress: (state, { payload }) => {
      const { value, name } = payload
      state.address[name] = value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, { payload }) => {
        state.orderLoading = true
        state.orderError = false
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        const { order, clientSecret } = payload
        state.orderLoading = false
        state.orderError = false
        state.clientSecret = clientSecret
        state.order = {
          orderId: order._id,
          orderItems: order.orderItems,
        }
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
      })
      .addCase(updateOrder.pending, (state, { payload }) => {
        state.orderLoading = true
        state.orderError = false
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = false

        console.log('update payment:', payload)
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.orderLoading = false
        state.orderError = true
      })
  },
})

export const { toggleAddress } = orderSlice.actions
export default orderSlice.reducer
