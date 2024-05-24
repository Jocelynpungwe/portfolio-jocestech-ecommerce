import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './features/toggle/toggleSlice'
import userSlice from './features/user/userSlice'
import productSlice from './features/product/productSlice'
import filterSlice from './features/filters/filterSlice'

const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    user: userSlice,
    products: productSlice,
    filter: filterSlice,
  },
})

export default store
