exports.handler = async event => {
  const subject = event.queryStringParameters.name || "API"
  return {
    statusCode: 200,
    body: `Welcome To ${subject}!`,
  }
}
