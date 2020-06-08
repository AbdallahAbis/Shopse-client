import React from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCartTotal } from "../../state/cart/cart.selectors"

const grow = keyframes`

to{
    width: 100%;
}
`
const slideUp = keyframes`
from{
  transform: translateX(-100%)
  opacity: 0;
}
to{
transform: none;
opacity: 1;
}
`
const Succeeded = styled.p`
  margin: 0 auto;
  color: var(--color-text);
  position: relative;
  display: table;
  font-weight: 700;
  margin-bottom: 5rem;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1rem;
    height: 5px;
    width: 0;
    background: #24b47e;
    animation: ${grow} 0.7s cubic-bezier(0.18, 0.25, 0, 1.95) 0.5s both;
  }
`

const Total = styled.p`
  margin: 0 auto;
  color: var(--color-text);
  position: relative;
  display: table;
  animation: ${slideUp} 0.5s cubic-bezier(0.18, 0.25, 0, 1.95) 0.8s both;
  width: 70%;
  text-align: center;

  span {
    font-weight: 700;
  }
`

const SuccessMessage = ({ total }) => (
  <div>
    <Succeeded>Your test payment succeeded</Succeeded>
    <Total>
      <span>${total.toFixed(2)}</span> was fakely set to my Stripe test account.
    </Total>
  </div>
)
const mapStateToProps = createStructuredSelector({
  total: selectCartTotal,
})
export default connect(mapStateToProps)(SuccessMessage)
