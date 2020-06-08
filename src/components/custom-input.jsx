import React from "react"
import styled from "styled-components"
import ErrorMessage from "./error-message"

const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 5rem;
  }
  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    height: 4rem;
    /* text-align: ${({ type }) => (type ? "center" : "start")}; */
    width: ${({ type }) =>
      type === "date" ? "40%" : type === "vcc" ? "15%" : "100%"};

    font-size: 1.6rem;
    color: var(--color-text);
    outline: none;
    &::placeholder {
      opacity: 0.2;
      font-size: 1.4rem;
    }
  }
  label {
    font-weight: 700;
    font-size: 1.3rem;
    opacity: 0.8;
  }
`

const CustomInput = ({ children, inputType, error, ...props }) => {
  return (
    <Input type={inputType}>
      <label htmlFor="input">{children}</label>
      <input {...props} id="input" />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Input>
  )
}

export default CustomInput
