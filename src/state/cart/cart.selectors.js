import { createSelector } from "reselect"

const selectCart = state => state.cart

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
)
export const selectToggleHidden = createSelector(
  [selectCart],
  cart => cart.cartStatus
)

// selects the total cost of all products added to cart
export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (currentValue, cartItem) =>
      currentValue + cartItem.quantity * cartItem.price,
    0
  )
)
