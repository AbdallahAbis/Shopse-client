export const SortAndSearch = (
  currentSex,
  sortMethod,
  searchValue,
  category
) => {
  if (currentSex) {
    let products =
      !category || category === "categories"
        ? [].concat.apply([], Object.values(currentSex))
        : currentSex[category]

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

    products = searchValue
      ? products.filter(item =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : products
    return products
  }
  return []
}
