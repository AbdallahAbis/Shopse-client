export const SortAndSearch = (currentSex, sortMethod, searchValue) => {
  if (sortMethod && sortMethod === "priceLowToHigh")
    currentSex.sort((a, b) =>
      a.Price > b.Price ? 1 : b.Price > a.Price ? -1 : 0
    )
  if (sortMethod && sortMethod === "priceHighToLow")
    currentSex.sort((a, b) =>
      a.Price > b.Price ? -1 : b.Price > a.Price ? 1 : 0
    )
  if (sortMethod && sortMethod === "date")
    currentSex.sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0))

  currentSex = searchValue
    ? currentSex.filter(item =>
        item.Title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : currentSex
  return currentSex
}
