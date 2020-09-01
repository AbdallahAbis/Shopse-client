import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled, { css } from "styled-components"
import { changeItemSize, selectItemSize } from "../state/utils/utils.reducer"
import SmallTitle from "./small-title"
import device from "../theme/media"

const SelectSizeContainer = styled.div`
  width: 100%;

  margin-bottom: 8rem;
  animation: ${({ animation }) =>
    css`
      ${animation} 0.6s 1.1s both
    `};
  // Media Query ...................

  @media ${device.tabPort} {
    margin-bottom: 4rem;
  }
`
const SelectSizeInnerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const SizeInnerContainer = styled.div`
  min-width: 4rem;
  min-height: 4rem;
  max-width: 12rem;
  padding: 0 1rem;
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
  &:not(:last-child) {
    margin-right: 1rem;
  }
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

const Size = ({
  sizes,
  bottomAnimation,
  rightAnimation,
  itemSize,
  changeItemSize,
  selectedSize,
  ...props
}) => {
  // takes care of adding and removing the class name
  const handleSelectSize = e => {
    const element = e.target
    const value = element.innerText
    // get all the children of size container (All size nodes)
    const siblings = [...element.parentNode.childNodes]
    const containsClass = []

    changeItemSize(value)

    siblings.forEach(sibling => {
      // if the element doesn't contain the className 'selected' then give it the className.
      if (!sibling.classList.contains("selected")) {
        element.classList.add("selected")
      }
      // if the element contain the className 'selected' then add it to the array and take the className from it.
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
      <SelectSizeInnerContainer>
        {
          // check if colors is an Array and loop through it
          Array.isArray(sizes) && sizes.length > 1 ? (
            sizes.map((singleSize, i) => (
              <SizeInnerContainer
                onClick={handleSelectSize}
                className={
                  (itemSize === singleSize || selectedSize === singleSize) &&
                  "selected"
                }
                delay={(20 / 100) * i}
                animation={rightAnimation}
                key={i}
              >
                <p>{singleSize}</p>
              </SizeInnerContainer>
            ))
          ) : (
            // if it's not an array then
            <SizeInnerContainer className="selected" animation={rightAnimation}>
              <p>{sizes}</p>
            </SizeInnerContainer>
          )
        }
      </SelectSizeInnerContainer>
    </SelectSizeContainer>
  )
}
const mapStateToProps = createStructuredSelector({
  itemSize: selectItemSize,
})
const mapDispatchToProps = dispatch => ({
  changeItemSize: size => dispatch(changeItemSize(size)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Size)
