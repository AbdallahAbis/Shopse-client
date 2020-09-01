// creating a function to take care of Search, Sort and set category.

export const SortAndSearch = (
  currentSex,
  sortMethod,
  searchValue,
  category
) => {
  // if the currentSex was provided then do the following
  if (currentSex) {
    let products =
      !category || category === "categories" // checking for the category value
        ? [].concat.apply([], Object.values(currentSex)) // return all the categories
        : currentSex[category] // if the category was provided then return it

    // checking for sort method value and sorting based on it
    if (sortMethod && sortMethod === "price_low_to_high")
      products.sort((a, b) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      )
    if (sortMethod && sortMethod === "price_high_to_low")
      products.sort((a, b) =>
        a.price > b.price ? -1 : b.price > a.price ? 1 : 0
      )
    if (sortMethod && sortMethod === "date_posted")
      products.sort((a, b) =>
        a.updated_at > b.updated_at ? -1 : b.updated_at > a.updated_at ? 1 : 0
      )

    // checking for the search value and filtering the products based on it.
    products = searchValue
      ? products.filter(item =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : products
    return products
  }

  // if current sex wasn't provided then return []
  return []
}
