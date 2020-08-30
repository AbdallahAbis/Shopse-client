const createPaymentIntent = options => {
  if (typeof window !== `undefined`) {
    return window
      .fetch(`${process.env.GATSBY_BACKEND_URL}/api/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          return null
        }
      })
      .then(data => {
        if (!data || data.error) {
          throw new Error("PaymentIntent API Error")
        } else {
          return data.client_secret
        }
      })
  }
}

const getPublicStripeKey = () => {
  if (typeof window !== `undefined`) {
    return window
      .fetch(`${process.env.GATSBY_BACKEND_URL}/api/public-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          return null
        }
      })
      .then(data => {
        if (!data || data.error) {
          throw Error("API Error")
        } else {
          return data.publishableKey
        }
      })
  }
}

const api = {
  createPaymentIntent,
  getPublicStripeKey: getPublicStripeKey,
}

export default api
