import Img from "gatsby-image"
import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { removeItem } from "../state/cart/cart.actions"
import Remove from "./icon-components/remove"

const Container = styled.div`
  max-width: 100%;
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
  const { title, price, quantity, thumbnail } = item
  return (
    <Container>
      <RemoveItem item={item} />
      <Img fluid={thumbnail.imageFile.childImageSharp.fluid} alt={title} />
      <h6>{title}</h6>
      <ItemsCount>
        <p>{quantity}</p>
      </ItemsCount>
      <p>${price.toFixed(2) * quantity}</p>
    </Container>
  )
}
const mapDispatchToProps = dispatch => ({
  removeItemFromCart: item => dispatch(removeItem(item)),
})

export default connect(null, mapDispatchToProps)(CartItem)
