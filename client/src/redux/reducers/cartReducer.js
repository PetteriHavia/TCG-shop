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
      const { id, amount, condition } = action.payload
      return state.map(item => item.id === id && item.condition === condition ? { ...item, amount } : item)
    },
    deleteProductFromCart: (state, action) => {
      const { id, condition } = action.payload;
      return state.filter(item => !(item.id === id && item.condition === condition))
    },
  }
})

export const { showCartItems, addItemsToCart, updateCartItemAmount, deleteProductFromCart } = cartSlice.actions
export default cartSlice.reducer