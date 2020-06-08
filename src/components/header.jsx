import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import SexSwitcher from "./sex-switcher"
import SearchIcon from "./icons/search"
import UserIcon from "./icons/user-profile"
import CartIcon from "./icons/cart"
import MenuIcon from "./icons/menu"

const HeaderContainer = styled.div`
  height: 10rem;
  width: 100%;
  position: relative;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  & > * {
    &:nth-child(2) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
const Logo = styled(Link)`
  font-weight: 700;
  font-size: 3rem;
  z-index: 1000;
`
const OptionsContainer = styled.div`
  display: flex;
  align-items: center;

  & > * {
    &:not(:last-child) {
      margin-right: 4rem;
    }
  }
`

const Header = ({ location }) => {
  const Home = location && location.pathname === "/"
  return (
    <HeaderContainer>
      <Logo to="/" aria-label="our logo, click for homePage">
        shopse.
      </Logo>
      <div>{Home && <SexSwitcher />}</div>
      <OptionsContainer>
        <SearchIcon />
        <UserIcon />
        <CartIcon />
        <MenuIcon />
      </OptionsContainer>
    </HeaderContainer>
  )
}

export default Header
