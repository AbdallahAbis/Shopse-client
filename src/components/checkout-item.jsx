import Img from "gatsby-image"
import React from "react"
import { connect } from "react-redux"
import styled, { css } from "styled-components"
import { removeItem, addItem } from "../state/cart/cart.actions"
import Remove from "./icons/remove"

const quantityButtons = css`
  padding: 1rem 0.5rem;
  line-height: 0;
  cursor: pointer;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.7fr 1fr 7rem 0.5fr;
  grid-auto-rows: max-content;
  align-items: center;
  justify-items: center;
  grid-gap: 5rem;
  padding: 3rem 0;
  border-bottom: 1px solid var(--color-primary);
`
const ImageContainer = styled.div`
  height: 12rem;
  width: 9rem;
  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    justify-self: center;
    align-self: stretch;
    border-radius: 5px;
  }
`
const ItemTitle = styled.h3`
  justify-self: start;
  font-size: 1.7rem;
  opacity: 0.75;
`
const ItemQuantity = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: center;
  justify-items: center;
  font-weight: 700;
  justify-self: start;
  user-select: none;
`

const QuantityText = styled.div`
  border: 1px solid rgba(44, 45, 49, 0.75);
  border-radius: 5px;
  width: 5rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    opacity: 0.75;
  }
`

const Plus = styled.div`
  ${quantityButtons}
  font-size: 1.9rem;
  margin-left: 1.5rem;
`
const Minus = styled.div`
  ${quantityButtons}
  font-size: 1.8rem;
  margin-right: 1.5rem;
  &.disabled {
    opacity: 0.3;
    pointer-events: none;
    cursor: none;
  }
`
const ItemPriceContainer = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  position: relative;
  padding: 0 0.5rem;

  &::before {
    content: "$";
    font-size: 1.5rem;
    height: 1rem;
    width: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-150%, -60%);
  }
`
const CheckoutItem = ({ item, removeItem, addItem }) => {
  const { Title, Price, Quantity, Thumbnail } = item
  return (
    <Container>
      <ImageContainer>
        <Img fluid={Thumbnail.childImageSharp.fluid} alt={Title} />
      </ImageContainer>
      <ItemTitle>{Title}</ItemTitle>
      <ItemQuantity>
        <Minus
          onClick={() => removeItem(item)}
          className={Quantity === 1 && "disabled"}
        >
          &#x2212;
        </Minus>
        <QuantityText>
          <p>{Quantity}</p>
        </QuantityText>
        <Plus onClick={() => addItem(item)}>&#x2b;</Plus>
      </ItemQuantity>
      <ItemPriceContainer>
        <p>{Price.toFixed(2) * Quantity}</p>
      </ItemPriceContainer>
      <Remove item={item} />
    </Container>
  )
}

const mapDispatchToProps = dispatch => ({
  removeItem: item => dispatch(removeItem(item)),
  addItem: item => dispatch(addItem(item)),
})

export default connect(null, mapDispatchToProps)(CheckoutItem)
