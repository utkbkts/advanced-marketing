import { createSlice } from "@reduxjs/toolkit";
const cart = JSON.parse(localStorage.getItem("cart"));
const initialState = {
  cart: cart ? cart : [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const itemToAdd = action.payload.item;
      const existingItem = state.cart.find((item) => item.id === itemToAdd.id);
    
      if (existingItem) {
        existingItem.count = (existingItem.count || 0) + 1; 
      } else {
        itemToAdd.count = 1; 
        state.cart.push(itemToAdd);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload.id;
      state.cart = state.cart.filter((item) => item.id !== itemIdToRemove);
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Sepet verilerini güncelle
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          item.count++;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const {
  setItems,
  addToCart,
  increaseCount,
  decreaseCount,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
