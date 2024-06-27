import { configureStore } from "@reduxjs/toolkit"
import categoriesReducer from "../redux/reducers/categoriesReducer"
import cartReducer from "../redux/reducers/cartReducer"
import { shopApi } from "./reducers/apiSlice"
import filterReducer from "../redux/reducers/filterReducer"

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    filters: filterReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware)
})