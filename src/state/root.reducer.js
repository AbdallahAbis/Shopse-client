import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import cartReducer from "./cart/cart.reducer"
import shopReducer from "./shop/shop.reducer"
import utilsReducer from "./utils/utils.reducer"

// makes cartItems from cart's state persist in local storage
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"],
}

// makes sortBy, Category, SearchValue, and searchInputStatus from utils state persist in local storage
const utilsPersistConfig = {
  key: "utils",
  storage,
  whitelist: ["sortBy", "category", "searchValue", "searchInputStatus"],
}

// makes sex from shop's state persist in local storage
const shopPersistConfig = {
  key: "shop",
  storage,
  whitelist: ["sex"],
}

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  utils: persistReducer(utilsPersistConfig, utilsReducer),
  shop: persistReducer(shopPersistConfig, shopReducer),
})

export default rootReducer
