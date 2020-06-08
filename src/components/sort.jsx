import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import {
  changeSortMethod,
  selectSortMethod,
} from "../state/utils/utils.reducer"

const SelectWrapper = styled.form`
  width: 15rem;
  position: relative;

  &:hover {
    & > * {
      &:first-child {
        transform: translateY(0) rotate(135deg);
      }
    }
  }
`

const Select = styled.select`
  outline: none;
  border: none;
  width: 100%;
  font-size: 1.3rem;
  padding-bottom: 1rem;
  text-indent: 0.2rem;
  border-bottom: 0.5px solid var(--color-tertiary);
  color: var(--color-text);
  font-family: var(--font-primary);
  position: relative;
  cursor: pointer;

  option {
    background: var(--color-primary);
  }
`

const ArrowDown = styled.i`
  border: solid var(--color-tertiary);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: translateY(-50%) rotate(45deg);
  z-index: 2;

  position: absolute;
  top: 25%;
  right: 1rem;

  transition: all 0.5s;
`

const SortBy = ({ sortMethod, setSortMethod }) => {
  const handleChange = e => {
    setSortMethod(e.target.value)
  }
  return (
    <SelectWrapper>
      <ArrowDown />
      <Select onChange={handleChange} value={sortMethod}>
        <option value="default" hidden>
          Sort
        </option>
        <option value="priceLowToHigh">Price low to high</option>
        <option value="priceHighToLow">Price high to low</option>
        <option value="date">Date Published</option>
      </Select>
    </SelectWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  sortMethod: selectSortMethod,
})
const mapDispatchToProps = dispatch => ({
  setSortMethod: method => dispatch(changeSortMethod(method)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortBy)
