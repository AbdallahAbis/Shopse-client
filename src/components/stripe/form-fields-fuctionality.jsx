import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import React, { useState } from "react"
import FormFields from "./form-fields"
import SuccessMessage from "./success-message"
import validateInfo from "./validation"

const FormFunc = ({ clientSecret, error, setError }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [data, setData] = useState({
    name: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  })
  const stripe = useStripe()
  const elements = useElements()
  console.log(typeof stripe, stripe)
  const handleFocus = e => {
    const element = e.target
    const classList = element.classList
    const elementFocused = element === document.activeElement
    if (elementFocused) {
      classList.remove("empty")
      classList.add("focused")
    } else if (!elementFocused && e.target.value.length === 0) {
      classList.remove("focused")
      classList.add("empty")
    }
  }

  const handleChange = e => {
    const elementName = e.target.name
    const elementValue = e.target.value
    const error = validateInfo(elementName, elementValue)
    if (!error) {
      setData({ ...data, [elementName]: elementValue })
    }
    setError(error)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const { name, address, city, state, zip } = e.target
    if (
      !name.value.length ||
      !address.value.length ||
      !city.value.length ||
      !state.value.length ||
      !zip.value.length
    ) {
      return setError("All Fields Are Required!")
    }

    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    })

    if (payload.error) {
      setError(payload.error.message)
      setProcessing(false)
      console.log("[error]", payload.error)
    } else {
      setError(null)
      setSucceeded(true)
      setProcessing(false)
      console.log("[PaymentIntent]", payload.paymentIntent)
    }
  }
  return succeeded ? (
    <SuccessMessage />
  ) : (
    <FormFields
      data={data}
      processing={processing}
      clientSecret={clientSecret}
      setData={setData}
      CardNumberElement={CardNumberElement}
      stripe={stripe}
      error={error}
      handleFocus={handleFocus}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default FormFunc
