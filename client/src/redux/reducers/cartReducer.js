import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    showCartItems: (state) => {
      return state
    },
    addItemsToCart: (state, action) => {
      return state.concat(action.payload)
    },
    updateCartItemAmount: (state, action) => {
      const { id, amount } = action.payload
      return state.map(item => item.id === id ? { ...item, amount } : item)
    }
  }
})

export const { showCartItems, addItemsToCart, updateCartItemAmount } = cartSlice.actions
export default cartSlice.reducer