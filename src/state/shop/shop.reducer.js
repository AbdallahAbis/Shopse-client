import ShopActionTypes from "./shop.types"

const INITIAL_STATE = {
  sex: "women",
  men: [],
  women: [],
  isLoading: true,
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.CHANGE_SEX:
      return {
        ...state,

        sex: state.sex === "women" ? "men" : "women",
      }
    case ShopActionTypes.FETCH_SHOP_DATA_MEN:
      return {
        ...state,
        men: action.payload,
        isLoading: false,
      }
    case ShopActionTypes.FETCH_SHOP_DATA_WOMEN:
      return {
        ...state,
        women: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default shopReducer
