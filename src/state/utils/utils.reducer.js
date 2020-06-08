import { createSelector } from "reselect"

const initialState = {
  searchValue: "",
  searchInputStatus: "hidden",
  sortBy: "",
}

//TYPES
const LISTEN_FOR_SEARCH = "LISTEN_FOR_SEARCH"
const SEARCH_INPUT_STATUS = "SEARCH_INPUT_STATUS"
const SELECT_SORT_METHOD = "SELECT_SORT_METHOD"

//ACTIONS
export const changeSearch = value => ({
  type: LISTEN_FOR_SEARCH,
  payload: value,
})
export const toggleSearchInput = () => ({
  type: SEARCH_INPUT_STATUS,
})
export const changeSortMethod = method => ({
  type: SELECT_SORT_METHOD,
  payload: method,
})

// SELECTORS
const selectUtils = state => state.utils

export const selectSearchValue = createSelector(
  [selectUtils],
  search => search.searchValue
)
export const selectSearchBarStatus = createSelector(
  [selectUtils],
  search => search.searchInputStatus
)
export const selectSortMethod = createSelector(
  [selectUtils],
  search => search.sortBy
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
        searchValue: "",
        searchInputStatus:
          state.searchInputStatus === "hidden" ? "shown" : "hidden",
      }
    case SELECT_SORT_METHOD:
      return {
        ...state,
        sortBy: action.payload,
      }
    default:
      return state
  }
}

export default utilsReducer
