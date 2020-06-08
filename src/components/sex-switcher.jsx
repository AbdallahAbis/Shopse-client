import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import { changeSex } from "../state/shop/shop.actions"
import { selectSex } from "../state/shop/shop.selectors"

const Border = styled.div`
  height: 3rem;
  width: 6rem;
  font-size: 1.3rem;
  color: var(--color-text);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 55rem;
  cursor: pointer;

  position: relative;

  &::before {
    content: "shop Women";
    position: absolute;
    left: -9.4rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  &::after {
    content: "shop Men";
    position: absolute;
    right: -7.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
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

  transform: translateY(-50%);
  transition: left 0.2s linear;
  opacity: 1;

  .men & {
    left: 57%;
  }
`

const SexSwitcher = ({ changeSex, sex }) => {
  return (
    <Border
      className={sex}
      onClick={changeSex}
      aria-label="toggle men and women"
    >
      <Ball />
    </Border>
  )
}

const mapStateToProps = createStructuredSelector({
  sex: selectSex,
})
const mapDispatchToProps = dispatch => ({
  changeSex: () => dispatch(changeSex()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SexSwitcher)
