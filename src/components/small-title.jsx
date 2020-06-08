import React from "react"
import styled from "styled-components"

const Text = styled.p`
  grid-column: 1 / -1;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
`

const SmallTitle = ({ children }) => <Text>{children}</Text>

export default SmallTitle
