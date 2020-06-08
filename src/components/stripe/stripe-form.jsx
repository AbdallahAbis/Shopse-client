import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCartTotal } from "../../state/cart/cart.selectors"
import api from "./api"
import FormFunc from "./form-fields-fuctionality"

const StripeForm = ({ cartTotalAmount }) => {
  const [error, setError] = useState(null)

  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    api
      .createPaymentIntent({
        amount: Math.round(cartTotalAmount * 100),
        currency: "usd",
      })
      .then(clientSecret => {
        setClientSecret(clientSecret)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [cartTotalAmount])

  return (
    <FormFunc clientSecret={clientSecret} error={error} setError={setError} />
  )
}
const mapStateToProps = createStructuredSelector({
  cartTotalAmount: selectCartTotal,
})

export default connect(mapStateToProps)(StripeForm)
