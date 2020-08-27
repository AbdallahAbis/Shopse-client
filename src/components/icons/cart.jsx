import { Link } from "gatsby"
import React, { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import { toggleCartHidden } from "../../state/cart/cart.actions"
import {
  selectCartItems,
  selectToggleHidden,
  selectCartTotal,
} from "../../state/cart/cart.selectors"
import CartItem from "../cart-item"
import EmptyMessage from "../empty-message"

const CartContainer = styled.div`
  position: relative;
`
const SVGContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  svg {
    stroke: var(--color-tertiary);
    height: 100%;
    width: 100%;
    stroke-width: 3px;
    fill: none;
    cursor: pointer;

    z-index: 1001;
    position: relative;
  }
`

const CartDropdownContainer = styled.div`
  width: 35rem;
  height: 50rem;
  background: var(--color-secondary);
  z-index: 1000;

  position: absolute;
  top: 5rem;
  right: 1rem;

  border-radius: 3rem;
  border-top-right-radius: 0;

  box-shadow: 0px 10px 27px -20px #000;
  overflow: hidden;
`
const IconBackground = styled.div`
  position: absolute;
  top: 0%;
  right: 0;
  height: 5rem;
  width: 6rem;
  background: var(--color-secondary);
  z-index: 200;
`
const InnerContainer = styled.div`
  visibility: hidden;
  opacity: 0;
  transform-origin: top right;
  transition: all 0.2s;
  position: absolute;
  height: 0;
  width: 0;
  transform: scale(0.1);
  height: 55rem;
  width: 41rem;
  z-index: 1000;
  top: -1.5rem;
  right: -2rem;
  .shown & {
    transform: scale(1);
    visibility: visible;
    opacity: 1;
  }
`

const CartBody = styled.div`
  height: 80%;
  width: 100%;
  border: 1px solid var(--color-secondary);
  border-top: none;
  border-bottom: none;
  position: absolute;
  top: 10%;
  left: 0;
  box-sizing: content-box;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: ${({ scrollWidth }) => `${scrollWidth}px`};
`

const TotalCount = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background: var(--color-tertiary);

  position: absolute;
  top: 0;
  right: -0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  cursor: pointer;
  user-select: none;

  p {
    color: var(--color-primary);
    font-size: 1.2rem;
  }
`

const TitleContainer = styled.div`
  width: 100%;
  height: 10%;
  background: var(--color-secondary);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-primary);
  border-top-left-radius: 3rem;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 1.24rem;
  }
`

const CartFooter = styled.div`
  height: 10%;
  width: 100%;
  background: linear-gradient(
    to left,
    var(--color-tertiary) 50%,
    var(--color-primary) 50%
  );

  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom-right-radius: 3rem;
  border-bottom-left-radius: 3rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;

  font-size: 1.2rem;
  font-weight: 700;
  a {
    color: var(--color-primary);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      color: var(--color-text);
    }
  }
  &::before {
    content: "";
    height: 100%;
    width: 1px;
    background: var(--color-primary);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`
const TotalContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;

  .price {
    font-size: 1.6rem;
  }
`

const SVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <polygon points="44 18 54 18 54 63 10 63 10 18 20 18 " />
    <path d="M22 24V11c0-5.5 4.5-10 10-10s10 4.5 10 10v13" />
  </svg>
)

const CartIcon = ({ cartItems, isHidden, toggleCartHidden, totalPrice }) => {
  const dropdownRef = useRef(null)
  const backgroundRef = useRef(null)
  const iconRef = useRef(null)
  const bodyRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(e) {
      const element = e.target
      const dropdown = dropdownRef.current
      const background = backgroundRef.current
      const icon = iconRef.current

      if (dropdown && background && icon) {
        if (background.contains(element) || icon.contains(element)) return
        if (!dropdown.contains(element)) return toggleCartHidden()
      }
    }

    if (isHidden === "shown")
      document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [toggleCartHidden, isHidden])

  return (
    <CartContainer aria-label="cart" className={isHidden.toString()}>
      <SVGContainer onClick={toggleCartHidden} ref={iconRef}>
        <SVG />
        <TotalCount>
          <p>{cartItems.length}</p>
        </TotalCount>
      </SVGContainer>
      <InnerContainer>
        <IconBackground ref={backgroundRef} />
        <CartDropdownContainer ref={dropdownRef}>
          <TitleContainer>
            <h2>YOUR ITEMS</h2>
          </TitleContainer>
          <CartBody
            ref={bodyRef}
            scrollWidth={
              bodyRef.current &&
              bodyRef.current.offsetWidth - bodyRef.current.clientWidth
            }
          >
            {cartItems.length === 0 ? (
              <EmptyMessage place="cart">
                Your cart is empty, Please add some items
              </EmptyMessage>
            ) : (
              cartItems.map((item, i) => <CartItem item={item} key={i} />)
            )}
          </CartBody>
          <CartFooter>
            <TotalContainer>
              <p>TOTAL</p>
              <p className="price">${totalPrice}</p>
            </TotalContainer>
            <Link to="/checkout" onClick={toggleCartHidden}>
              CHECKOUT
            </Link>
          </CartFooter>
        </CartDropdownContainer>
      </InnerContainer>
    </CartContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  isHidden: selectToggleHidden,
  cartItems: selectCartItems,
  totalPrice: selectCartTotal,
})
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
