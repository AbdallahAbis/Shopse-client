export const addItemToCart = (cartItems, itemToAdd) => {
  const itemExist =
    cartItems.find(item => item.id === itemToAdd.id) &&
    cartItems.find(
      item =>
        item.title.replace(/\s/g, "") === itemToAdd.title.replace(/\s/g, "")
    )

  if (itemExist) {
    return cartItems.map(item =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    )
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }]
}
export const removeItemFromCart = (cartItems, itemToRemove) => {
  const itemExist =
    cartItems.find(item => item.id === itemToRemove.id) &&
    cartItems.find(
      item =>
        item.title.replace(/\s/g, "") === itemToRemove.title.replace(/\s/g, "")
    )

  if (itemExist) {
    if (itemToRemove.quantity > 1) {
      return cartItems.map(item =>
        item.id === itemToRemove.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    }
  }
}
export const deleteItem = (cartItems, itemToDelete) => {
  const itemExist =
    cartItems.find(item => item.id === itemToDelete.id) &&
    cartItems.find(
      item =>
        item.title.replace(/\s/g, "") === itemToDelete.title.replace(/\s/g, "")
    )

  if (itemExist) {
    return cartItems.filter(
      item =>
        item.title.replace(/\s/g, "") !== itemToDelete.title.replace(/\s/g, "")
    )
  }
}
