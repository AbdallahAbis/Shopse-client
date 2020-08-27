import ShopActionTypes from "./shop.types"

const INITIAL_STATE = {
  sex: "women",
  products: {},
  loading: true,
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.CHANGE_SEX:
      return {
        ...state,

        sex: state.sex === "women" ? "men" : "women",
      }
    case ShopActionTypes.FETCH_SHOP_PRODUCTS:
      return {
        ...state,
        products: { ...state.products, ...action.payload },
        loading: false,
      }
    default:
      return state
  }
}

export default shopReducer
