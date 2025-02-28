import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = () => {
  const storage = localStorage.getItem("cart");
  return storage ? JSON.parse(storage) : [];
}

const cartSlice = createSlice({
  name: "cart",
  initialState: getLocalStorage(),
  reducers: {
    showCartItems: (state) => {
      return state
    },
    addItemsToCart: (state, action) => {
      const updatedCart = [...state, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    },
    updateCartItemAmount: (state, action) => {
      const { id, amount, condition } = action.payload
      const updatedCart = state.map((product) => product.id === id && product.condition === condition ? { ...product, amount } : product)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    },
    deleteProductFromCart: (state, action) => {
      const { id, condition } = action.payload;
      const updatedCart = state.filter((product) => product.id !== id || product.condition !== condition)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    },
  }
})

export const { showCartItems, addItemsToCart, updateCartItemAmount, deleteProductFromCart } = cartSlice.actions
export default cartSlice.reducer