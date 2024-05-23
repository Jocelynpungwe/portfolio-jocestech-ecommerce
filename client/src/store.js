import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './features/toggle/toggleSlice'
import userSlice from './features/user/userSlice'
import productSlice from './features/product/productSlice'

const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    user: userSlice,
    products: productSlice,
  },
})

export default store
