import ShopActionTypes from "./shop.types"

export const changeSex = () => ({
  type: ShopActionTypes.CHANGE_SEX,
})
export const fetchMenData = data => ({
  type: ShopActionTypes.FETCH_SHOP_DATA_MEN,
  payload: data,
})
export const fetchWomenData = data => ({
  type: ShopActionTypes.FETCH_SHOP_DATA_WOMEN,
  payload: data,
})
