import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import CheckoutItem from "../components/checkout-item"
import EmptyMessage from "../components/empty-message"
import Layout from "../components/layout"
import api from "../components/stripe/api"
import StripeForm from "../components/stripe/stripe-form"
import { selectCartItems, selectCartTotal } from "../state/cart/cart.selectors"
import device from "../theme/media"

// Stripe API
let stripePromise
if (typeof window !== `undefined`) {
  stripePromise = api.getPublicStripeKey().then(key => loadStripe(key))
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.3fr;
  height: calc(100vh - var(--header));
  align-items: center;
  max-height: calc(100vh - var(--header));

  // Media Query ...................

  @media ${device.tabPort} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    margin-bottom: 5rem;
  }
`
const InfoContainer = styled.div`
  padding-top: 8rem;
  padding-left: 3rem;
  height: 100%;
  position: relative;

  // Media Query ...................

  @media ${device.tabPort} {
    grid-row: 1;
    padding-left: 0;
    padding-bottom: 10rem;
  }
`
const CheckoutContainer = styled.div`
  background-color: var(--color-primary);
  border: 0.5px solid rgb(44, 45, 49, 0.2);
  width: 27%;
  height: 70vh;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 5rem;
  top: 50%;
  transform: translateY(-41%);
  flex: auto;
  padding: 0 4rem;

  // Media Query ...................

  @media ${device.tabPort} {
    grid-row: 2;
    width: 95%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    margin: 0;
    justify-self: center;
    padding: 1rem 2rem;
    margin-bottom: 9rem;
  }
`

const CheckoutFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: var(--color-secondary);
  width: 100%;
  height: 8rem;
  padding: 0 12rem;
  font-weight: 700;
  display: grid;
  grid-template-columns: 2.5fr 1.3fr;
  div {
    border-top: 0.5px solid rgb(44, 45, 49, 0.2);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    // Media Query ...................

    @media ${device.tabPort} {
      height: 100%;
      margin: auto 0;
      border-top: none;
    }
  }

  // Media Query ...................

  @media ${device.tabPort} {
    padding: 0 4rem;
    width: 100%;
    display: block;
    height: 7rem;

    background: var(--color-secondary);
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    z-index: 5000;
  }
`
const Title = styled.h1`
  font-size: 3.5rem;
  opacity: 0.75;
  margin-bottom: 5rem;
`

const CheckoutPage = ({ cartItems, total, location }) => {
  return (
    <Layout location={location}>
      <Container>
        {cartItems.length === 0 ? (
          <EmptyMessage>Your cart is empty, Please Add an Item</EmptyMessage>
        ) : (
          <InfoContainer>
            <Title>We are glad you're here!</Title>
            {cartItems.map((item, i) => (
              <CheckoutItem item={item} key={i} />
            ))}
            <CheckoutFooter>
              <div>
                <h2>TOTAL</h2>
                <h2>${total.toFixed(2)}</h2>
              </div>
            </CheckoutFooter>
          </InfoContainer>
        )}
        <CheckoutContainer>
          <Elements stripe={stripePromise}>
            <StripeForm cartTotalAmount={total} />
          </Elements>
        </CheckoutContainer>
      </Container>
    </Layout>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
})

export default connect(mapStateToProps)(CheckoutPage)
