import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectSex } from "../state/shop/shop.selectors"
import { changeCategory, selectCategory } from "../state/utils/utils.reducer"
import CustomSelect from "./custom-select"
import { useState } from "react"
import { useEffect } from "react"

const Categories = ({ gender, category, changeCategory, location }) => {
  const [selected, setSelected] = useState(category)
  const values = ["Categories", "Clothes", "Shoes", "Accessories"]

  useEffect(() => {
    const selectedCategory = location.pathname.split("/")
    const potentialCategory = selectedCategory[selectedCategory.length - 1]
    if (potentialCategory === category) return

    const selected =
      potentialCategory !== "categories" &&
      potentialCategory !== "clothes" &&
      potentialCategory !== "shoes" &&
      potentialCategory !== "accessories"
        ? "categories"
        : potentialCategory

    setSelected(selected)
  }, [location.pathname, category])

  return (
    <CustomSelect
      values={values}
      defaultValue="Categories"
      gender={gender}
      selected={selected}
      handleValueChange={changeCategory}
      fontSize="3rem"
      routing="true"
      location={location.pathname}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  gender: selectSex,
  category: selectCategory,
})
const mapDispatchToProps = dispatch => ({
  changeCategory: category => dispatch(changeCategory(category)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Categories)
