import { configureStore } from "@reduxjs/toolkit"
import categoriesReducer from "../redux/reducers/categoriesReducer"

export default configureStore({
  reducer: {
    categories: categoriesReducer,
  }
})