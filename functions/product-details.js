exports.handler = async event => {
  let data = getProductDetails()
  return {
    statusCode: 200,
    body: data,
  }
}
