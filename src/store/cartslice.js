import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  cartItems: [],
  cartQuantity: 0,
  cartIsVisible: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    toggleCart: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
    },
    increaseCartQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      state.cartQuantity++;
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems = [
          ...state.cartItems,
          { id: action.payload, quantity: 1 },
        ];
      }
    },
    decreaseCartQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      state.cartQuantity--;
      if (item.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        state.cartQuantity = state.cartQuantity - item.quantity;
      }
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: () => {
      return { ...initialCartState };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
