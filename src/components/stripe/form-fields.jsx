import { useStripe } from "@stripe/react-stripe-js"
import React from "react"
import styled from "styled-components"
import ErrorMessage from "./error-message"
import Input from "./input"

const Container = styled.form`
  input,
  button {
    appearance: none;
    outline: none;
    border-style: none;
  }

  button {
    display: block;
    width: 80%;
    height: 4rem;
    margin: 8rem auto 1.5rem auto;
    background-color: var(--color-tertiary);
    color: var(--color-primary);
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    font-size: 1.7rem;
    :disabled {
      opacity: 0.5;
      cursor: wait;
    }
  }

  .stripeElement--webkit-autofill {
    background: transparent;
  }

  .credit {
    display: block;
    text-align: center;
    font-size: 10px;
    margin-top: -1rem;
    color: #9ea9b3;
  }
`
export const Row = styled.div`
  display: flex;
  &:not(:last-child) {
    margin: 0 0 2.5rem 0;
  }
`

const FormFields = ({
  data,
  handleFocus,
  handleChange,
  handleSubmit,
  error,
  processing,
  clientSecret,
}) => {
  const stripe = useStripe()
  const { name, address, city, state, zip } = data

  return (
    <Container onSubmit={handleSubmit}>
      <Row>
        <Input
          handleFocus={handleFocus}
          handleChange={handleChange}
          name="name"
          value={name}
          placeholder="Abdallah Abis"
          autoComplete="name"
          aria-label="Your Full Name"
          label="Full Name"
        />
      </Row>
      <Row>
        <Input
          handleFocus={handleFocus}
          handleChange={handleChange}
          name="address"
          value={address}
          placeholder="349 23rd Avenue Burlington"
          autoComplete="street-address"
          aria-label="Your Street Address"
          label="Address"
        />
      </Row>
      <Row>
        <Input
          handleFocus={handleFocus}
          handleChange={handleChange}
          name="city"
          value={city}
          placeholder="Ait Melloul"
          autoComplete="address-level2"
          aria-label="Your City "
          label="City"
        />
        <Input
          handleFocus={handleFocus}
          handleChange={handleChange}
          name="state"
          value={state}
          placeholder="CA"
          autoComplete="address-level1"
          aria-label="Your State"
          label="State"
        />
        <Input
          handleFocus={handleFocus}
          handleChange={handleChange}
          name="zip"
          value={zip}
          placeholder="14527"
          autoComplete="postal-code"
          aria-label="Your ZIP code"
          label="ZIP"
        />
      </Row>
      <Row>
        <Input element="card" name="element-container" label="Card Number" />
      </Row>
      <Row>
        <Input element="date" name="element-container" label="Expiration" />
        <Input element="cvc" name="element-container" label="CVC" />
      </Row>
      <button type="submit" disabled={processing || !clientSecret || !stripe}>
        {processing ? "Processing…" : "Check Out"}
      </button>
      <span className="credit">4242 4242 4242 4242 - 08/80 - 111</span>

      <ErrorMessage error={error} />
    </Container>
  )
}

export default FormFields
