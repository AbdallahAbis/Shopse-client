import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import { connect } from "react-redux"
import { removeItem } from "../state/cart/cart.actions"
import Remove from "./icons/remove"

const Container = styled.div`
  width: 100%;
  height: 10rem;
  display: grid;
  grid-template-columns: 1fr 2fr 2.5rem 1fr;
  align-items: center;
  justify-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-primary);
  position: relative;

  .gatsby-image-wrapper {
    width: 80%;
    justify-self: center;
    align-self: stretch;
  }

  h6 {
    font-size: 1.4rem;
    font-weight: 300;
    justify-self: start;
    padding: 0 1rem;
  }

  p {
    font-size: 1.6rem;
    font-weight: 700;
  }
`

const ItemsCount = styled.div`
  width: 2.5rem;
  height: 1.5rem;
  background: transparent;
  border: 0.5px solid var(--color-tertiary);
  border-top: none;
  border-bottom: none;
  color: var(--color-text);
  p {
    font-size: 1.4rem;
    font-weight: 300;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`

const RemoveItem = styled(Remove)`
  height: 1.4rem;
  width: 1.5rem;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`

const CartItem = ({ item, removeItemFromCart }) => {
  const { Title, Price, Quantity, Thumbnail } = item
  return (
    <Container>
      <RemoveItem item={item} />
      <Img fluid={Thumbnail.childImageSharp.fluid} alt={Title} />
      <h6>{Title}</h6>
      <ItemsCount>
        <p>{Quantity}</p>
      </ItemsCount>
      <p>${Price.toFixed(2) * Quantity}</p>
    </Container>
  )
}
const mapDispatchToProps = dispatch => ({
  removeItemFromCart: item => dispatch(removeItem(item)),
})

export default connect(null, mapDispatchToProps)(CartItem)
