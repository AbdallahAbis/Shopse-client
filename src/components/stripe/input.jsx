import React from "react"
import styled, { keyframes } from "styled-components"
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"

const focus = keyframes`
from{
      transform: scale(0.85) translateY(-2.5rem);
    color: #24b47e;

}
to{
  transform: none;
    color: #9ea9b3;
}
`

const Field = styled.div`
  position: relative;
  width: 100%;
  height: 5rem;
  margin: 0 1rem;
  #element-container {
    background: none;
    padding-bottom: 2rem;

    &.StripeElement--focus,
    &.StripeElement:not(.StripeElement--empty) {
      & ~ label {
        transform: scale(0.85) translateY(-2.5rem);
        cursor: default;
        color: #24b47e;
      }
      & ~ div {
        background-color: #24b47e;
      }
    }
    &.StripeElement.StripeElement--invalid{
      & ~ label {
        color: #FF3333;
      }
      & ~ div {
        background-color: #FF3333;
      }
    }
  }

  div {
    position: absolute;
    width: 100%;
    height: 1px;
    left: 0;
    bottom: 0;
    background-color: #cfd7df;
    transition: background-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  label {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0.8rem;
    color: #9ea9b3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform-origin: 0 50%;
    cursor: text;
    pointer-events: none;
    transition-property: color, transform;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    /* animation: ${focus} 0.1s; */
  }

  input {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    color: #32325d;
    background-color: transparent;
    padding-bottom: 0.7rem;
    font-size: 1.4rem;
    font-family: var(--font-primary);

    &.focused {
      opacity: 1;
      color: var(--color-text);

      & ~ label {
        transform: scale(0.85) translateY(-2.5rem);
        cursor: default;
        color: #24b47e;
      }
      & ~ div {
        background-color: #24b47e;
      }

      ::placeholder {
        color: #aab7c4;
        opacity: 0.7;
        transition: color 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
    }
   

    &::placeholder {
      color: transparent;
      transition: color 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
      user-select: none;
    }
  }

  .half-width {
    width: 50%;
  }
  .quarter-width {
    width: calc(25% - 1rem);
  }
`
const Input = ({
  handleFocus,
  handleChange,
  name,
  value,
  placeholder,
  autoComplete,
  ariaLabel,
  label,
  element,
}) => {
  const options = {
    style: {
      base: {
        fontSize: "14px",
        fontFamily: "Europa",
        fontWeight: 300,
        color: "#000",
        padding: "50px",
        "::placeholder": {
          color: "transparent",
        },

        ":focus": {
          "::placeholder": {
            color: "#9ea9b3",
          },
        },
      },
      invalid: {
        color: "#FF3333",
      },
    },
  }
  return (
    <Field>
      {element === "card" ? (
        <CardNumberElement options={options} id={name} />
      ) : element === "date" ? (
        <CardExpiryElement options={options} id={name} />
      ) : element === "cvc" ? (
        <CardCvcElement options={options} id={name} />
      ) : (
        <input
          onFocus={handleFocus}
          onKeyUp={handleFocus}
          onBlur={handleFocus}
          onChange={handleChange}
          id={name}
          type="text"
          placeholder={placeholder}
          autoComplete={autoComplete}
          name={name}
          aria-label={ariaLabel}
          value={value}
        />
      )}
      <label htmlFor={name}>{label}</label>
      <div></div>
    </Field>
  )
}

export default Input
