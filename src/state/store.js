import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import rootReducer from "./root.reducer"

// creating redux store
const store = createStore(rootReducer)

// creating a persistor for th store
const persistor = persistStore(store)

// wrapping everything by the store and persistor
export default ({ element }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{element}</PersistGate>
  </Provider>
)
