import { configureStore } from "@reduxjs/toolkit"
import categoriesReducer from "../redux/reducers/categoriesReducer"
import { shopApi } from "./reducers/apiSlice"

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware)
})