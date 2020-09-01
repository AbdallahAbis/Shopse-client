// Creating a function that will generate images from men/women array.

const generateImages = (products, loading, number = 2) => {
  let images

  // checking if there's no loading
  if (!loading) {
    //
    // defining variables
    const randomNumber = Math.floor(Math.random() * 2)
    const womenArray = [].concat.apply([], Object.values(products.women))
    const menArray = [].concat.apply([], Object.values(products.men))
    const women = []
    const men = []

    // looping through the array using the provided number.
    for (let i = 0; i < number; i++) {
      let plus = randomNumber + i
      let minus = 0
      women.push(womenArray[plus > womenArray.length - 1 ? minus : plus])
      men.push(menArray[plus > menArray.length - 1 ? minus : plus])
    }

    // setting the value of the images to an object of men, and women.
    images = { men, women }
  }

  return images ? images : null
}

export default generateImages
