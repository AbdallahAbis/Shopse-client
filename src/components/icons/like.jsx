import React, { useState } from "react"
import styled, { css } from "styled-components"

const SVG = styled.svg`
  height: 2.5rem;
  fill: none;
  stroke-width: 2;
  stroke: var(--color-tertiary);
  animation: ${({ animation }) =>
    css`
      ${animation} 1s 1.7s both;
    `};

  cursor: pointer;
  &.true {
    fill: var(--color-tertiary);
  }
`

const Like = ({ bottomAnimation }) => {
  const [liked, setLiked] = useState(false)
  return (
    <SVG
      onClick={() => setLiked(!liked)}
      className={liked}
      animation={bottomAnimation}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 0 55 50"
    >
      <path d="M24.9 10.1c2-4.8 6.6-8.1 12-8.1 7.2 0 12.4 6.2 13.1 13.5 0 0 0.4 1.8-0.4 5.1 -1.1 4.5-3.5 8.5-6.9 11.5L24.9 48 7.4 32.2c-3.4-3-5.8-7-6.9-11.5 -0.8-3.3-0.4-5.1-0.4-5.1C0.7 8.2 5.9 2 13.2 2 18.5 2 22.8 5.3 24.9 10.1z" />
    </SVG>
  )
}

export default Like
