import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled, { keyframes } from "styled-components"
import { changeSex } from "../state/shop/shop.actions"
import { selectSex } from "../state/shop/shop.selectors"
import { Link } from "gatsby"
import { useEffect } from "react"
import device from "../theme/media"

const scale = keyframes`
0%{
  transform: translateY(-50%) scale(.1);
}
100%{
  transform:translateY(-50%) scale(1);
}
`
const Container = styled.div`
  @media ${device.tabLand} {
    width: 100%;
    height: 7rem;
    background: var(--color-secondary);

    position: fixed;

    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  }
`

const Border = styled(Link)`
  display: block;
  height: 3rem;
  width: 6rem;
  font-size: 1.3rem;
  color: var(--color-text);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 55rem;
  cursor: pointer;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // Media Query ...................
  @media ${device.phone} {
    font-size: 1.5rem;
  }

  &::before {
    content: "shop Women";
    position: absolute;
    left: -9.4rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;

    // Media Query ...................
    @media ${device.phone} {
      left: -10.5rem;
    }
  }
  &::after {
    content: "shop Men";
    position: absolute;
    right: -7.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;

    // Media Query ...................
    @media ${device.phone} {
      right: -8.5rem;
    }
  }
`
const Ball = styled.div`
  height: 1.7rem;
  width: 1.7rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;

  position: absolute;
  top: 50%;
  left: 0.8rem;

  transition: left 0.5s linear;
  opacity: 1;
  animation: ${scale} 0.2s both;
  .men & {
    left: 57%;
  }
`

const GenderSwitcher = ({ changeSex, gender, location }) => {
  // get the opposite of the selected gender
  const theOppositeOfGender = gender === "men" ? "women" : "men"

  useEffect(() => {
    // get the selected gender
    const currentGender = location.pathname.includes("/men/") ? "men" : "women"

    if (gender !== currentGender) changeSex()
  }, [location.pathname, changeSex, gender])

  return (
    <Container>
      <Border
        to={`/${theOppositeOfGender}/products`}
        className={gender}
        onClick={changeSex}
        aria-label="toggle men and women"
      >
        <Ball />
      </Border>
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  gender: selectSex,
})
const mapDispatchToProps = dispatch => ({
  changeSex: () => dispatch(changeSex()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GenderSwitcher)
