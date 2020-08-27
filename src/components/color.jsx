import React from "react"
import styled, { css } from "styled-components"
import SmallTitle from "./small-title"
import device from "../theme/media"

const ColorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 2.7rem);
  grid-template-rows: max-content max-content;
  justify-items: center;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  margin-bottom: 7rem;
  animation: ${({ animation }) =>
    css`
      ${animation} 0.6s 0.9s both
    `};

  p {
    justify-self: start;
  }
  // Media Query ...................

  @media ${device.tabPort} {
    margin-bottom: 4rem;
  }
`

const ColorCircle = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background: ${({ color }) => `${color}`};
  cursor: pointer;
  animation: ${({ delay, animation }) =>
    css`${animation} 1s cubic-bezier(0.32, 0, 0.67, 0) ${delay}s both`};
  &.selected {
    box-shadow: 0px 0px 0px 4px var(--color-secondary),
      0px 0px 5px 1px var(--color-tertiary);
  }
  p {
    color: ${({ color }) =>
      `${
        color === "black" || "#000" || "#000000" ? "var(--color-text)" : color
      }`};
  }
`

const Color = ({ colors, bottomAnimation, rightAnimation }) => {
  return (
    <ColorsContainer animation={bottomAnimation}>
      <SmallTitle>Select Color</SmallTitle>
      {Array.isArray(colors) ? (
        colors.map((singleColor, i) => (
          <ColorCircle
            delay={(10 / 100) * i + 0.7}
            color={singleColor}
            className="selected"
            animation={rightAnimation}
            key={i}
          />
        ))
      ) : (
        <ColorCircle
          delay={(10 / 100) * 1}
          color={colors}
          className="selected"
          animation={rightAnimation}
        />
      )}
    </ColorsContainer>
  )
}

export default Color
