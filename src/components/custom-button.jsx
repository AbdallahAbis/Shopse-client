import React from "react"
import styled, { css } from "styled-components"

const AddToCart = styled.h3`
  padding: 1.5rem 4rem;
  font-weight: 700;
  font-size: 1.6rem;
  background: var(--color-tertiary);
  color: var(--color-primary);
  cursor: pointer;
  animation: ${({ animation }) =>
    css`
      ${animation} 0.5s 1.3s both
    `};
  text-align: center;
  width: max-content;
`

const CustomButton = ({ children, bottomAnimation, ...props }) => (
  <AddToCart animation={bottomAnimation} {...props}>
    {children}
  </AddToCart>
)

export default CustomButton
