import React from "react"
import styled, { keyframes } from "styled-components"

import { slideDown } from "../utils/keyframes"

const Error = styled.p`
  color: #ea4c4c;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 1.2rem;
  position: absolute;
  bottom: -3rem;
  left: 0;
  animation: ${slideDown} 0.2s both;
`

const ErrorMessage = ({ children }) => <Error>{children}</Error>

export default ErrorMessage
