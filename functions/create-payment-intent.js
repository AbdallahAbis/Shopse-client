const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context, callback) => {
  if (
    event.httpMethod === "POST" &&
    event.path === "/.netlify/functions/create-payment-intent"
  ) {
    const body = JSON.parse(event.body)
    const paymentIntent = await stripe.paymentIntents.create(options)
    const options = {
      ...body,
    }

    callback(null, {
      statusCode: 200,
      body: res.json(paymentIntent),
    })
  } else {
    callback(null, {
      statusCode: 400,
      body: {},
    })
  }
}
