import CreditCard from "creditcard.js"

const card = new CreditCard()
const numbers = /^[0-9]+$/
const letters = /^[A-Za-z]+$/

export const checkName = value => {
  const error =
    value && !value.replace(/ /g, "").replace(/ /g, "").match(letters)
      ? "Your name can only have Alphabets and Spaces"
      : null

  return error
}
export const checkNumber = value => {
  const valueError =
    value && !value.replace(/ /g, "").match(numbers)
      ? "Only numbers are allowed!"
      : null
  const spaced = value
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()

  return { spaced, valueError }
}
export const checkDate = value => {
  const month = value.substring(0, 2)
  const year = value.substring(3, 5)
  const joined =
    value.length === 3 || value.length >= 6
      ? value.replace(/^(\d\d)(\d)$/g, "$1 / $2")
      : value.replace(" / ", "")
  console.log(value.length)
  const error =
    value && !value.replace(" / ", "").match(numbers)
      ? "Only numbers are allowed!"
      : null

  return { month, year, joined, error }
}
export const checkType = value => {
  const originalValue = value.replace(/ /g, "")
  const getCardName = card.getCreditCardNameByNumber(originalValue)
  const cardName = getCardName !== "Credit card is invalid!" ? getCardName : ""
  const amexType = cardName === "Amex"
  const visaType = cardName === "Visa"
  const masterCardType = cardName === "Mastercard"
  const cardIsAccepted = (amexType || visaType || masterCardType) && cardName

  const error =
    cardName && !cardIsAccepted
      ? `We're sorry, but we don't accept ${cardName} Card.`
      : !cardName
      ? "Please Provide a valid Card."
      : ""

  return { error, cardIsAccepted }
}
