import { Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled, { css } from "styled-components"
import {
  changeSearch,
  resetSearchValue,
  selectSearchBarStatus,
  selectSearchValue,
  toggleSearchInput,
} from "../../state/utils/utils.reducer"
import device from "../../theme/media"

const Icon = css`
  fill: var(--color-tertiary);
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  input {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    height: 140%;
    width: 0;
    visibility: hidden;

    background: transparent;
    color: var(--color-text);
    font-family: var(--font-primary);
    font-size: 1.3rem;

    transition: all 0.2s;
    outline: none;

    // Media Query ...................

    @media ${device.tabPort} {
      font-size: 1.6rem;
    }
  }
  &.true {
    input {
      width: 100%;
      height: 100%;
      visibility: visible;
      padding-right: 4rem;
      padding-left: 1rem;
    }
  }
`

const IconContainer = styled.div`
  ${Icon}
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Search = styled.svg`
  height: 3rem;
  pointer-events: none;
  position: relative;
  z-index: -2;
`
const Close = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  pointer-events: none;
`

const SearchIcon = ({
  handleSearchInput,
  searchValue,
  toggleSearchInput,
  resetSearchValue,
  searchInputStatus,
  location,
}) => {
  const [isGender, setIsGender] = useState(false)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef()
  const iconRef = useRef()
  // defining the gender based on the location
  const gender = location.pathname.endsWith("/men") ? "men" : "women"

  useEffect(() => {
    const path = location.pathname
    // checks if the user is in the Gender page
    const gender = path.endsWith("/men") || path.endsWith("/women")
    // checks for either the value of searchInputStatus or if the user in in the gender page to show the search bar
    const shown = searchInputStatus === "shown" || isGender ? true : false

    // updating the state
    setIsGender(gender)
    setVisible(shown)

    // updating the status of the Search Input
    if (isGender && searchInputStatus === "shown") toggleSearchInput()
  }, [location.pathname, isGender, searchInputStatus, toggleSearchInput])

  useEffect(() => {
    // if the user is in Gender page or the search value isn't 0, then break from the useEffect func.
    if (isGender || searchValue.length !== 0) return

    function handleClickOutside(e) {
      const element = e.target
      const searchInput = inputRef.current
      const searchIcon = iconRef.current

      // if the there's no searchInput OR searchIcon OR the SearchInput contains the click then don't do anything.
      if (!searchInput || !searchIcon || searchInput.contains(element)) return

      // if none of the above then close/open the search input and reset the value
      if (!searchInput.contains(element) && !searchIcon.contains(element)) {
        resetSearchValue()
        toggleSearchInput()
      }
    }

    // enable the event listener if the search bar is visible already.
    if (visible) document.addEventListener("mousedown", handleClickOutside)

    // kill the event listener.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [
    visible,
    searchInputStatus,
    toggleSearchInput,
    resetSearchValue,
    isGender,
    searchValue,
  ])

  const handleToggle = () => {
    if (!isGender) {
      resetSearchValue()
      toggleSearchInput()
    }
  }

  const enterKeyPressed = e => {
    if (!isGender) return
    const searchIcon = iconRef.current
    if (e.keyCode === 13) {
      searchIcon.firstChild.click()
    }
  }

  return (
    <Container className={visible} aria-label="search">
      <input
        value={searchValue}
        type="text"
        ref={inputRef}
        onChange={e => handleSearchInput(e.target.value)}
        placeholder="What are you looking for?"
        aria-label="Search For a Product"
        onKeyDown={e => enterKeyPressed(e)}
      />
      <IconContainer
        onClick={handleToggle}
        ref={iconRef}
        style={{
          cursor: `${
            searchValue.length === 0 && isGender ? "auto" : "pointer"
          }`,
        }}
      >
        {visible && !isGender ? (
          <Close xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M284.3 256L506.1 34.1c7.8-7.8 7.8-20.5 0-28.3 -7.8-7.8-20.5-7.8-28.3 0L256 227.7 34.1 5.9c-7.8-7.8-20.5-7.8-28.3 0 -7.8 7.8-7.8 20.5 0 28.3l221.9 221.9L5.9 477.9c-7.8 7.8-7.8 20.5 0 28.3 3.9 3.9 9 5.9 14.1 5.9 5.1 0 10.2-2 14.1-5.9L256 284.3l221.9 221.9c3.9 3.9 9 5.9 14.1 5.9s10.2-2 14.1-5.9c7.8-7.8 7.8-20.5 0-28.3L284.3 256z" />
          </Close>
        ) : isGender && searchValue.length !== 0 ? (
          <Link
            to={`/${gender}/products/categories`}
            style={{
              pointerEvents: `${searchValue.length === 0 ? "none" : "auto"}`,
            }}
          >
            <Search xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
            </Search>
          </Link>
        ) : (
          <Search xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
          </Search>
        )}
      </IconContainer>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  searchValue: selectSearchValue,
  searchInputStatus: selectSearchBarStatus,
})
const mapDispatchToProps = dispatch => ({
  handleSearchInput: value => dispatch(changeSearch(value)),
  resetSearchValue: () => dispatch(resetSearchValue()),
  toggleSearchInput: () => dispatch(toggleSearchInput()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchIcon)
