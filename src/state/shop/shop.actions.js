import ShopActionTypes from "./shop.types"

export const changeSex = () => ({
  type: ShopActionTypes.CHANGE_SEX,
})
export const fetchProducts = products => ({
  type: ShopActionTypes.FETCH_SHOP_PRODUCTS,
  payload: products,
})
