import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { apiSlice } from '../redux/slices/apiSlice'
import cartSliceReducer from '../redux/slices/cartSlice'
import  loginSliceReducer  from '../redux/slices/loginSlice'
import registerSliceReducer from '../redux/slices/registerSlice'

 const store = configureStore({
  reducer: {

    [apiSlice.reducerPath]:apiSlice.reducer,
    cart:cartSliceReducer,
    login:loginSliceReducer,
    register:registerSliceReducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true,
})


export default store