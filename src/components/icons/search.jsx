import React, { useRef } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled, { css } from "styled-components"
import {
  changeSearch,
  selectSearchBarStatus,
  selectSearchValue,
  toggleSearchInput,
} from "../../state/utils/utils.reducer"

const Icon = css`
  fill: var(--color-tertiary);
  cursor: pointer;
  position: relative;
  z-index: 1;
`

const Container = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  position: relative;
  z-index: 1001;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    height: 140%;
    width: 0;
    visibility: hidden;

    background: var(--color-secondary);
    border: 0.5px solid var(--color-tertiary);
    border-top: none;
    border-right: none;
    border-left: none;

    color: var(--color-text);
    font-family: var(--font-primary);
    font-size: 1.3rem;

    transition: all 0.2s;
    outline: none;
  }
  &.true {
    input {
      width: 35rem;
      visibility: visible;
      padding-right: 4rem;
      padding-left: 1rem;
    }
  }
`

const Search = styled.svg`
  ${Icon}
  height: 100%;
`
const Close = styled.svg`
  ${Icon}
  height: 65%;
`

const SearchIcon = ({
  handleSearchInput,
  searchValue,
  toggleSearchInput,
  searchInputStatus,
}) => {
  const visible = searchInputStatus === "shown"
  const ref = useRef()

  const handleChange = e => {
    handleSearchInput(e.target.value)
  }

  return (
    <Container className={visible} aria-label="search">
      <input
        value={searchValue}
        type="text"
        ref={ref}
        onChange={handleChange}
        aria-label="Search For a Product"
      />
      {visible ? (
        <Close
          onClick={toggleSearchInput}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
        </Close>
      ) : (
        <Search
          onClick={toggleSearchInput}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
        </Search>
      )}
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  searchValue: selectSearchValue,
  searchInputStatus: selectSearchBarStatus,
})
const mapDispatchToProps = dispatch => ({
  handleSearchInput: value => dispatch(changeSearch(value)),
  toggleSearchInput: () => dispatch(toggleSearchInput()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchIcon)
