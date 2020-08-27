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

  &.true {
    background: #00000096;
    cursor: not-allowed;
    pointer-events: none;
  }
`

const CustomButton = ({
  children,
  bottomAnimation,
  disabledButton,
  ...props
}) => (
  <AddToCart className={disabledButton} animation={bottomAnimation} {...props}>
    {children}
  </AddToCart>
)

export default CustomButton
