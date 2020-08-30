exports.handler = async event => {
  return {
    statusCode: 200,
    body: { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY },
  }
}
