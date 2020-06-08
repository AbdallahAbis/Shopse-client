import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import cartReducer from "./cart/cart.reducer"
import shopReducer from "./shop/shop.reducer"
import utilsReducer from "./utils/utils.reducer"

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"],
}
const shopPersistConfig = {
  key: "shop",
  storage,
  whitelist: ["sex"],
}

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  utils: utilsReducer,
  shop: persistReducer(shopPersistConfig, shopReducer),
})

export default rootReducer
