import React from "react"
import { PayPalButton } from "react-paypal-button-v2"

const CLIENT = {
  sandbox: process.env.SANDBOX,
  production: process.env.CLIENT_ID,
}

const PayPal = ({ total }) => {
  return (
    <PayPalButton
      amount={total}
      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name)
      }}
      options={{
        clientId: CLIENT.production,
      }}
    />
  )
}

export default PayPal
