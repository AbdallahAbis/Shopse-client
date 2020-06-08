const validateInfo = (elementName, elementValue) => {
  const numbers = /^[0-9]+$/
  const letters = /^[a-zA-Z ]*$/
  let error = null

  if (
    elementName === "name" ||
    elementName === "state" ||
    elementName === "city"
  ) {
    error =
      elementValue && !elementValue.replace(/ /g, "").match(letters)
        ? `${elementName.toUpperCase()} field can only contain Alphabets and Spaces!`
        : null
  }
  if (elementName === "zip") {
    error =
      elementValue && !elementValue.match(numbers)
        ? `${elementName.toUpperCase()} field can only contain have Numbers!`
        : null
  }

  return error
}
export default validateInfo
