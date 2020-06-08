import React from "react"
import styled, { css } from "styled-components"
import SmallTitle from "./small-title"

const SelectSizeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 4rem);
  grid-template-rows: max-content 4rem;
  align-items: center;
  grid-column-gap: 1.5rem;
  grid-row-gap: 0.5rem;
  margin-bottom: 8rem;
  animation: ${({ animation }) =>
    css`
      ${animation} 0.6s 1.1s both
    `};
`
const SizeInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 0.5px solid var(--color-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--color-text);
  font-weight: 300;
  font-family: var(--font-primary);
  animation: ${({ delay, animation }) =>
    css`${animation} 1.8s cubic-bezier(0.32, 0, 0.67, 0) ${delay}s both`};
  cursor: pointer;
  &.selected {
    background: var(--color-tertiary);
    color: var(--color-primary);
    font-weight: 700;
  }
  P {
    text-align: center;
    font-size: 1.6rem;
    pointer-events: none;
  }
`

const Size = ({ sizes, bottomAnimation, rightAnimation, ...props }) => {
  const handleSelectSize = e => {
    const element = e.target
    const siblings = [...element.parentNode.childNodes]
    const containsClass = []

    siblings.forEach(sibling => {
      if (sibling.classList.contains("selected")) {
        containsClass.push(sibling)
        containsClass[0].classList.remove("selected")
        containsClass.splice(0)
        element.classList.add("selected")
      }
    })
  }
  return (
    <SelectSizeContainer animation={bottomAnimation} {...props}>
      <SmallTitle>Select Size</SmallTitle>
      {sizes.map((singleSize, i) => (
        <SizeInnerContainer
          onClick={handleSelectSize}
          className={i === 0 && "selected"}
          delay={(20 / 100) * i}
          animation={rightAnimation}
          key={i}
        >
          <p>{singleSize}</p>
        </SizeInnerContainer>
      ))}
    </SelectSizeContainer>
  )
}
export default Size
