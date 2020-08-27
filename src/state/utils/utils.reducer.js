import { createSelector } from "reselect"

const initialState = {
  searchValue: "",
  searchInputStatus: "hidden",
  sortBy: "",
  category: "",
  itemSize: "",
  itemColor: "",
}

//TYPES
const LISTEN_FOR_SEARCH = "LISTEN_FOR_SEARCH"
const SEARCH_INPUT_STATUS = "SEARCH_INPUT_STATUS"
const RESET_SEARCH_VALUE = "RESET_SEARCH_VALUE"
const SELECT_SORT_METHOD = "SELECT_SORT_METHOD"
const SELECT_CATEGORY = "SELECT_CATEGORY"
const SELECT_ITEM_SIZE = "SELECT_ITEM_SIZE"
const SELECT_ITEM_COLOR = "SELECT_ITEM_COLOR"

//ACTIONS
export const changeSearch = value => ({
  type: LISTEN_FOR_SEARCH,
  payload: value,
})
export const toggleSearchInput = () => ({
  type: SEARCH_INPUT_STATUS,
})
export const resetSearchValue = () => ({
  type: RESET_SEARCH_VALUE,
})
export const changeSortMethod = method => ({
  type: SELECT_SORT_METHOD,
  payload: method,
})
export const changeCategory = category => ({
  type: SELECT_CATEGORY,
  payload: category,
})
export const changeItemSize = size => ({
  type: SELECT_ITEM_SIZE,
  payload: size,
})
export const changeItemColor = color => ({
  type: SELECT_ITEM_COLOR,
  payload: color,
})

// SELECTORS
const selectUtils = state => state.utils

export const selectSearchValue = createSelector(
  [selectUtils],
  utils => utils.searchValue
)
export const selectSearchBarStatus = createSelector(
  [selectUtils],
  utils => utils.searchInputStatus
)
export const selectSortMethod = createSelector(
  [selectUtils],
  utils => utils.sortBy
)
export const selectCategory = createSelector(
  [selectUtils],
  utils => utils.category
)
export const selectItemSize = createSelector(
  [selectUtils],
  utils => utils.itemSize
)
export const selectItemColor = createSelector(
  [selectUtils],
  utils => utils.itemColor
)

//REDUCER

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTEN_FOR_SEARCH:
      return {
        ...state,
        searchValue: action.payload,
      }
    case SEARCH_INPUT_STATUS:
      return {
        ...state,
        searchInputStatus:
          state.searchInputStatus === "hidden" ? "shown" : "hidden",
      }
    case RESET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: "",
      }
    case SELECT_SORT_METHOD:
      return {
        ...state,
        sortBy: action.payload,
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }
    case SELECT_ITEM_SIZE:
      return {
        ...state,
        itemSize: action.payload,
      }
    case SELECT_ITEM_COLOR:
      return {
        ...state,
        itemColor: action.payload,
      }
    default:
      return state
  }
}

export default utilsReducer
