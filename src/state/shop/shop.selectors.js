import { createSelector } from "reselect"

const selectShop = state => state.shop

export const selectIsLoading = createSelector(
  [selectShop],
  data => data.isLoading
)
export const selectSex = createSelector([selectShop], data => data.sex)
export const selectShopMen = createSelector([selectShop], data => data.men)
export const selectShopWomen = createSelector([selectShop], data => data.women)
