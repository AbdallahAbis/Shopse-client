import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import rootReducer from "./root.reducer"

const store = createStore(rootReducer)
const persistor = persistStore(store)

export default ({ element }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{element}</PersistGate>
  </Provider>
)
