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
const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key))

const Container = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.3fr;
  height: calc(100vh - var(--header));
  align-items: center;
  max-height: calc(100vh - var(--header));
`
const InfoContainer = styled.div`
  padding-top: 8rem;
  padding-left: 3rem;
  height: 100%;
  position: relative;
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
  position: fixed;
  right: 5rem;
  top: 50%;
  transform: translateY(-41%);
  flex: auto;
  padding: 0 4rem;
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
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
const Title = styled.h1`
  font-size: 3.5rem;
  opacity: 0.75;
  margin-bottom: 5rem;
`

const CheckoutPage = ({ cartItems, total }) => {
  return (
    <Layout>
      {cartItems.length === 0 ? (
        <EmptyMessage>Your cart is empty, Please Add an Item</EmptyMessage>
      ) : (
        <Container>
          <InfoContainer>
            <Title>We are glad you're here!</Title>
            {cartItems.map(item => (
              <CheckoutItem item={item} key={item.id} />
            ))}
            <CheckoutFooter>
              <div>
                <h2>TOTAL</h2>
                <h2>${total.toFixed(2)}</h2>
              </div>
            </CheckoutFooter>
          </InfoContainer>
          {/* <PaymentForm /> */}
          <CheckoutContainer>
            <Elements stripe={stripePromise}>
              <StripeForm cartTotalAmount={total} />
            </Elements>
          </CheckoutContainer>
        </Container>
      )}
    </Layout>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
})

export default connect(mapStateToProps)(CheckoutPage)
