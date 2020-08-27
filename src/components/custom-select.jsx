import { Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import styled, { keyframes } from "styled-components"
import device from "../theme/media"

const show = keyframes`
0%{
    height: 0;
    visibility: hidden;
    opacity: 0;
    margin-bottom: 100%;
}
50%{
   opacity: 0; 
}
100%{
    height: 100%;
      visibility: visible;
      margin-bottom: 0;
      opacity: 1;
}
`
const SelectWrapper = styled.div`
  width: 20rem;
  margin-top: 1.5rem;
  position: relative;
@media not all and (pointer: coarse) {
 &:hover {
    i{
        transform: translateY(-100%) rotate(135deg);
      }
    }
}
  
  }

  // Media Query ...................
  @media ${device.tabPort} {
    width: 17rem;
  }
  @media ${device.phone} {
  }
`

const Select = styled.div`
  height: 4.5rem;
  color: var(--color-text);
  font-family: var(--font-primary);
  position: relative;
  border-bottom: 0.5px solid var(--color-tertiary);
  display: flex;
  align-items: center;
  cursor: pointer;

  div {
    background: var(--color-primary);
    position: absolute;
    width: 100%;
    top: 101%;
    height: 0;
    visibility: hidden;
    opacity: 0;
    margin-bottom: 100%;
    transition: all 0.2s;
    z-index: 1000;

    button,
    a {
      height: 0;
      padding: 1rem;
      border: none;
      border-bottom: 0.5px solid var(--color-tertiary);
      background: var(--color-primary);
      font-size: 1.4rem;
      width: 100%;
      font-family: var(--font-primary);
      font-weight: 300;
      text-align: start;
      cursor: pointer;
      display: none;
      visibility: hidden;
    }

    &.true {
      animation: ${show} 0.2s both;
      transition: all 0.2s;

      button,
      a {
        height: 100%;
        display: inline-block;
        visibility: visible;
      }
    }
    .true {
      background: var(--color-tertiary);
      color: var(--color-secondary);
      font-weight: 700;
    }
  }
`
const Selected = styled.p`
  font-size: ${({ fontSize }) => fontSize};
  padding-bottom: 1rem;
  line-height: 0.7;
`

const ArrowDown = styled.i`
  border: solid var(--color-tertiary);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  z-index: 2;

  position: absolute;
  top: 50%;
  right: 0;
  transition: all 0.5s;
  transform: translateY(-100%) rotate(45deg);
`

const SelectChoice = ({ routing, value, gender, ...props }) => {
  return routing ? (
    <Link
      to={`/${gender}/products/${value.toLowerCase()}`}
      value={value}
      {...props}
    >
      {value}
    </Link>
  ) : (
    <button value={value} {...props}>
      {value}
    </button>
  )
}

const CustomInput = ({
  values,
  defaultValue,
  gender,
  selected,
  handleValueChange,
  fontSize,
  routing,
  location,
}) => {
  const [itemToShow, setItemToShow] = useState(null)
  const [visibility, setVisibility] = useState(false)
  const ref = useRef()

  useEffect(() => {
    function handleClickOutside(e) {
      const element = e.target
      const selectDropdownArea = ref.current

      if (selectDropdownArea && !selectDropdownArea.contains(element)) {
        return setVisibility(false)
      }
    }

    if (visibility) document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [visibility, ref])

  const handleChange = e => {
    const element = e.target
    const value = element.getAttribute("value")

    setItemToShow(value)
    handleValueChange(value.toLowerCase().replace(/ /g, "_"))
  }

  useEffect(() => {
    setItemToShow(selected.replace(/_/g, " "))
    handleValueChange(selected)
  }, [selected, handleValueChange])

  const generateClassName = value => {
    if (visibility) return String(itemToShow === value.toLowerCase())
  }

  return (
    <>
      {gender && <p>{gender.charAt(0).toUpperCase() + gender.slice(1)}</p>}
      <SelectWrapper ref={ref} className="noSelect">
        <ArrowDown />
        <Select onClick={() => setVisibility(!visibility)}>
          {!itemToShow && (
            <Selected fontSize={fontSize}>{defaultValue}</Selected>
          )}
          <Selected fontSize={fontSize}>
            {itemToShow &&
              `${itemToShow.charAt(0).toUpperCase()}${itemToShow.slice(1)}`}
          </Selected>
          <div className={String(visibility)}>
            {values.map((elementValue, i) => (
              <SelectChoice
                onClick={handleChange}
                onKeyDown={handleChange}
                key={i}
                value={elementValue}
                gender={gender}
                routing={routing}
                className={String(generateClassName(elementValue))}
              >
                {elementValue}
              </SelectChoice>
            ))}
          </div>
        </Select>
      </SelectWrapper>
    </>
  )
}

export default CustomInput
