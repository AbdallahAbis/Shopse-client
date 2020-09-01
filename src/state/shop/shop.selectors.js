import { createSelector } from "reselect"

const selectShop = state => state.shop

export const selectLoading = createSelector([selectShop], data => data.loading)
export const selectSex = createSelector([selectShop], data => data.sex)

export const selectProducts = createSelector(
  [selectShop],
  data => data.products
)

// selects all products and push them to one single array
export const selectAllProducts = createSelector([selectShop], data => {
  const men = [].concat.apply([], Object.values(data.products.men))
  const women = [].concat.apply([], Object.values(data.products.women))
  return [...men, ...women]
})
