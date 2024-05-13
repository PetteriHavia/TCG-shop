import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice({
  name: "Categories",
  initialState: {},
  reducers: {
    getData: (state, action) => {
      return action.payload
    }
  }
})

export const { getData } = categorySlice.actions
export default categorySlice.reducer