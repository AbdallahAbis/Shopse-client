import React from "react"
import styled, { keyframes } from "styled-components"

const loading = keyframes`
  from   {  transform: rotate(0deg); }
  to     {  transform: rotate(360deg); }
`

export const Container = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const SpinnerShape = styled.div`
  width: 43px;
  height: 43px;
  border-width: 3px;
  margin: 20px auto;
  border-radius: 50%;
  border: dashed 5px var(--color-text);
  animation-name: ${loading};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`
const Spinner = () => (
  <Container>
    <SpinnerShape />
  </Container>
)
export default Spinner
