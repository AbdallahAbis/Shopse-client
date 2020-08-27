const generateImages = (products, loading, number = 2) => {
  let images
  if (!loading) {
    const randomNumber = Math.floor(Math.random() * 2)
    const womenArray = [].concat.apply([], Object.values(products.women))
    const menArray = [].concat.apply([], Object.values(products.men))
    const women = []
    const men = []


    for (let i = 0; i < number; i++) {
      let plus = randomNumber + i
      let minus = 0
      women.push(womenArray[plus > womenArray.length - 1 ? minus : plus])
      men.push(menArray[plus > menArray.length - 1 ? minus : plus])
    }

    images = { men, women }
  }
  return images ? images : null
}

export default generateImages
