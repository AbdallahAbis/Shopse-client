export const addItemToCart = (cartItems, itemToAdd) => {
  const itemExist = cartItems.find(item => item.id === itemToAdd.id)

  if (itemExist) {
    return cartItems.map(item =>
      item.id === itemToAdd.id ? { ...item, Quantity: item.Quantity + 1 } : item
    )
  }

  return [...cartItems, { ...itemToAdd, Quantity: 1 }]
}
export const removeItemFromCart = (cartItems, itemToRemove) => {
  const itemExist = cartItems.find(item => item.id === itemToRemove.id)

  if (itemExist) {
    if (itemToRemove.Quantity > 1) {
      return cartItems.map(item =>
        item.id === itemToRemove.id
          ? { ...item, Quantity: item.Quantity - 1 }
          : item
      )
    }
  }
}
export const deleteItem = (cartItems, itemToDelete) => {
  const itemExist = cartItems.find(item => item.id === itemToDelete.id)

  if (itemExist) {
    return cartItems.filter(item => item.id !== itemToDelete.id)
  }
}
