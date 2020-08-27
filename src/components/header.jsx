import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import device from "../theme/media"
import CartIcon from "./icons/cart"
import SearchIcon from "./icons/search"
import UserIcon from "./icons/user-profile"
import SexSwitcher from "./sex-switcher"

const HeaderContainer = styled.div`
  height: 10rem;
  width: 100%;
  position: relative;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  & > * {
    &:not(:last-child) {
      margin-right: 4rem;

      // Media Query ...................

      @media ${device.phone} {
        margin-right: 3rem;
      }
    }
  }
`
const PagesLogo = styled(Link)`
  font-weight: 700;
  font-size: 3rem;
  z-index: 1000;
`
const HomeHeader = styled.div`
  font-weight: 700;
  font-size: 3rem;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SearchContainer = styled.div`
  width: 35rem;
  height: 4rem;

  // Media Query ...................

  @media ${device.tabPort} {
    width: 40rem;
  }
  @media ${device.phone} {
    width: 23rem;
  }
  @media ${device.smallPhone} {
    width: 15rem;
  }
  @media ${device.verySmallPhone} {
    display: none;
  }
`

const Header = ({ location, searchBarStatus }) => {
  const isHome = location && location.pathname === "/"
  const isProducts = location && location.pathname.includes("/products")
  return isHome ? (
    <HomeHeader>
      <Link to="/" aria-label="our logo, click for homePage">
        shopse.
      </Link>
    </HomeHeader>
  ) : (
    <HeaderContainer>
      <PagesLogo to="/" aria-label="our logo, click for homePage">
        shopse.
      </PagesLogo>
      {isProducts && <SexSwitcher location={location} />}
      <OptionsContainer>
        <SearchContainer>
          {isProducts && <SearchIcon location={location} />}
        </SearchContainer>
        <UserIcon />
        <CartIcon />
        {/* <MenuIcon /> */}
      </OptionsContainer>
    </HeaderContainer>
  )
}

export default Header
