import React from "react"
import styled, { keyframes } from "styled-components"

const gone = keyframes`
to{
  visibility: hidden;
  margin-bottom: 100vh;
  height: 0;
}
`
const animate = keyframes`
0%{
  height: 0;
  margin-top: 100vh;
}
100%{
  height: 100vh;
  margin-top: 0;
}

`
const animateReverse = keyframes`
0%{
  height: 0;
  margin-bottom: 100vh;
}
100%{
  height: 100vh;
  margin-bottom: 0;
}


`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to right,
    var(--color-secondary) 50%,
    var(--color-primary) 50%
  );
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  z-index: 1000;
  animation: ${gone} 0.6s cubic-bezier(0.32, 0, 0.67, 0) both;
  div:nth-child(1) {
    background: var(--color-primary);
    animation: ${animate} .5s cubic-bezier(0.32, 0, 0.67, 0) both;
  }
  div:nth-child(2) {
    background: var(--color-secondary);
    animation: ${animateReverse} .5s cubic-bezier(0.32, 0, 0.67, 0) both;
  }
  /* div:nth-child(3) {
    background: var(--color-secondary);
    animation: ${animate} 5s cubic-bezier(0.32, 0, 0.67, 0) both;
  }
  div:nth-child(4) {
    background: var(--color-secondary);
    animation: ${animate} 5s cubic-bezier(0.32, 0, 0.67, 0) both;
  } */
`

const Loader = () => {
  return (
    <Container>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  )
}

export default Loader
