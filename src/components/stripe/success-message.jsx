import React from "react"
import styled, { keyframes } from "styled-components"
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

const Message = styled.p`
  margin: 0 auto;
  color: var(--color-text);
  position: relative;
  display: table;
  animation: ${slideUp} 0.5s cubic-bezier(0.18, 0.25, 0, 1.95) 0.8s both;
  width: 70%;
  text-align: center;

  a {
    color: #7795ff;
    font-weight: 700;
  }
`

const SuccessMessage = () => (
  <div>
    <Succeeded>Your test payment succeeded</Succeeded>
    <Message>
      Kindly check out{" "}
      <a href="https://abisabdallah.com/" target="_blank">
        my website
      </a>
      for more projects.
    </Message>
  </div>
)

export default SuccessMessage
