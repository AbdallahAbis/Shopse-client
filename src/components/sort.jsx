import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  changeSortMethod,
  selectSortMethod,
} from "../state/utils/utils.reducer"
import CustomSelect from "./custom-select"

const SortBy = ({ sortMethod, setSortMethod }) => {
  const values = ["Price low to high", "Price high to low", "Date Posted"]
  return (
    <CustomSelect
      values={values}
      defaultValue="Sort"
      selected={sortMethod}
      handleValueChange={setSortMethod}
      fontSize="1.4rem"
    />
  )
}

const mapStateToProps = createStructuredSelector({
  sortMethod: selectSortMethod,
})
const mapDispatchToProps = dispatch => ({
  setSortMethod: method => dispatch(changeSortMethod(method)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortBy)
