import { createSlice } from "@reduxjs/toolkit";
import { cartCalculations } from "../../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((p) => p._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return cartCalculations(state, item);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return cartCalculations(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      

      return cartCalculations(state);
    },


    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

     

      return cartCalculations(state);
    },

     clearCart: (state, action) => {

      state.cartItems =[]
      return cartCalculations(state);
    },


  },
});

export const { addToCart, removeFromCart,saveShippingAddress,savePaymentMethod,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
