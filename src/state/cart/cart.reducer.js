import CartActionTypes from "./cart.types"

import { addItemToCart, removeItemFromCart, deleteItem } from "./cart.utils"

const INITIAL_STATE = {
  cartItems: [],
  cartStatus: "hidden",
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        cartStatus: state.cartStatus === "hidden" ? "shown" : "hidden",
      }
    case CartActionTypes.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      }
    case CartActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      }
    case CartActionTypes.DELETE_ITEM:
      return {
        ...state,
        cartItems: deleteItem(state.cartItems, action.payload),
      }
    default:
      return state
  }
}

export default cartReducer
