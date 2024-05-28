import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './features/toggle/toggleSlice'
import userSlice from './features/user/userSlice'
import productSlice from './features/product/productSlice'
import filterSlice from './features/filters/filterSlice'
import cartSlice from './features/cart/cartSlice'
import orderSlice from './features/order/orderSlice'

const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    user: userSlice,
    products: productSlice,
    filter: filterSlice,
    cart: cartSlice,
    order: orderSlice,
  },
})

export default store
