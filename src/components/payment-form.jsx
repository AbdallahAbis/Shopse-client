import React, { useState } from "react"
import styled from "styled-components"
import CustomButton from "./custom-button"
import creditCard from "creditcard.js"
import Visa from "../images/icons/visa.inline.svg"
import MasterCard from "../images/icons/masterCard.inline.svg"
import AmericanExpress from "../images/icons/americanExpress.inline.svg"
import CustomInput from "./custom-input"
import {
  checkNumber,
  checkDate,
  checkType,
  checkName,
} from "../utils/card-validator"

const PaymentContainer = styled.div`
  height: 80vh;
  width: 27vw;
  background: var(--color-primary);
  border: 1px solid var(--color-tertiary);
  border-radius: 15px;
  padding: 3rem;

  position: fixed;
  right: 5rem;
  top: 50%;
  transform: translateY(-41%);

  h1 {
    font-size: 2.6rem;
  }
`
const PaymentInfo = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const PaymentButton = styled(CustomButton)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 7rem auto 12rem auto;

  svg {
    height: 5rem;
    width: 8rem;
    filter: grayscale(100%) blur(1px);
    transition: all 0.3s;

    &.selected {
      filter: none;
      transform: scale(1.3);
      filter: drop-shadow(1px 1px 5px #000);
    }
  }
`
const DateAndCVV = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const PaymentForm = () => {
  const card = new creditCard()

  const [cardError, setCardError] = useState({ name: "", number: "", date: "" })
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    date: {
      joined: "",
      month: "",
      year: "",
    },
    cvv: "",
    type: "",
  })
  const { name, number, date, cvv, type } = cardInfo
  const { joined, month, year } = date
  const fullNumber = number.length >= 18
  const VIClassName = type === "Visa" && fullNumber ? "selected" : ""
  const MCClassName = type === "Mastercard" && fullNumber ? "selected" : ""
  const AEClassName = type === "Amex" && fullNumber ? "selected" : ""

  const handleChange = e => {
    const { name, value } = e.target

    if (name === "name") {
      const error = checkName(value)
      setCardError({ ...cardError, name: error })
      console.log(!error)

      !error && setCardInfo({ ...cardInfo, [name]: value })
      return
    }

    if (name === "number") {
      const { spaced, valueError } = checkNumber(value)
      const { error, cardIsAccepted } = checkType(value)
      setCardError({ ...cardError, number: error || valueError })
      !valueError &&
        setCardInfo({
          ...cardInfo,
          number: spaced,
          type: cardIsAccepted,
        })
      return
    }
    if (name === "date") {
      const { month, year, joined, error } = checkDate(value)
      setCardError({ ...cardError, date: error })
      !error &&
        setCardInfo({
          ...cardInfo,
          date: { ...date, joined, month, year },
        })
      return
    }

    setCardInfo({ ...cardInfo, [name]: value })
    console.log(cardInfo)
  }

  console.log(cardInfo)
  return (
    <PaymentContainer>
      <h1>Card Details</h1>
      <IconsContainer>
        <Visa className={VIClassName} />
        <MasterCard className={MCClassName} />
        <AmericanExpress className={AEClassName} />
      </IconsContainer>
      <PaymentInfo>
        <CustomInput
          type="text"
          name="name"
          value={name}
          placeholder="Abdallah Abis"
          onChange={handleChange}
          error={cardError.name}
        >
          Name on Card
        </CustomInput>
        <CustomInput
          type="tel"
          name="number"
          value={number}
          inputMode="numeric"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          onChange={handleChange}
          error={cardError.number}
        >
          Card Number
        </CustomInput>
        <DateAndCVV>
          <CustomInput
            type="text"
            name="date"
            value={joined}
            placeholder="MM  /  YY"
            inputType="date"
            maxLength="7"
            size="7"
            onChange={handleChange}
            error={cardError.date}
          >
            Expiration Date
          </CustomInput>
          <CustomInput
            type="text"
            name="vcc"
            placeholder="123"
            inputType="vcc"
            maxLength="3"
            size="3"
            onChange={handleChange}
            error={cardError.date}
          >
            VCC
          </CustomInput>
        </DateAndCVV>
      </PaymentInfo>
      <PaymentButton>Check Out</PaymentButton>
    </PaymentContainer>
  )
}
export default PaymentForm
