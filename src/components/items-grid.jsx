import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import { selectProducts, selectSex } from "../state/shop/shop.selectors"
import {
  selectCategory,
  selectSearchValue,
  selectSortMethod,
} from "../state/utils/utils.reducer"
import device from "../theme/media"
import { slideDown } from "../utils/keyframes"
import { SortAndSearch } from "../utils/sortAndSearch"
import EmptyMessage from "./empty-message"

const Container = styled.div`
  margin: 0 5rem 20rem 5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
  grid-gap: 5rem;
  transition: all 0.1s;

  // Media Query ...................
  @media ${device.tabPort} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    margin: 0 0 20rem 0;
    grid-gap: 2rem;
  }
  @media ${device.phone} {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`
const InnerContainer = styled.div`
  height: 55rem;
  width: 100%;
  position: relative;
  animation: ${slideDown} 1s both;

  & > * {
    &:first-of-type {
      height: 100%;
      width: 100%;
    }
  }

  // Media Query ...................
  @media ${device.phone} {
    height: 37rem;
  }
`
const ImageContainer = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 87%;
  cursor: pointer;

  .gatsby-image-wrapper {
    max-width: 100%;
    height: 100%;
  }

  // Media Query ...................
  @media ${device.phone} {
    height: 80%;
  }
`
const Info = styled.div`
  height: 13%;
  width: 100%;
  transform: none;

  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  // Media Query ...................
  @media ${device.phone} {
    height: 20%;
  }
`
const Title = styled(Link)`
  font-weight: 300;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`
const Price = styled(Link)`
  font-weight: 700;
`

const ItemsGrid = ({
  allProducts,
  gender,
  sortMethod,
  searchValue,
  category,
  location,
}) => {
  // get the current gender from the URL and set Current Gender
  let currentSex = location.pathname.includes("/men/")
    ? allProducts.men
    : allProducts.women

  // check if there's any search / sort / category changes required
  let products = SortAndSearch(currentSex, sortMethod, searchValue, category)

  const generatePath = (category, product) => {
    // generates the path to a single Page if the category was set
    if (category && category !== "categories" && gender && product)
      return `/${gender}/products/${category}/${product.slug}`

    const typeName = product.__typename

    // generates Category for the selected product if it wasn't selected.
    const setCategory = typeName.includes("Clothes")
      ? "clothes"
      : typeName.includes("Shoes")
      ? "shoes"
      : typeName.includes("Accessories")
      ? "accessories"
      : category
    return `/${gender}/products/${setCategory}/${product.slug}`
  }

  return !products || products.length === 0 ? (
    // show the message when there's no products.
    <EmptyMessage>
      Sorry for letting you down, We don't have such an Item.
    </EmptyMessage>
  ) : (
    <Container>
      {products.map((product, i) => (
        <InnerContainer
          key={i}
          style={{ animationDelay: `${(10 / 100) * i}s` }}
        >
          <div>
            <ImageContainer
              to={generatePath(category, product)}
              aria-label="see product's details"
            >
              <Img fluid={product.thumbnail.imageFile.childImageSharp.fluid} />
            </ImageContainer>
            <Info>
              <Title
                to={generatePath(category, product)}
                aria-label="check product's details"
              >
                {product.title}
              </Title>
              <Price
                to={generatePath(category, product)}
                aria-label="check product's details"
              >
                ${product.price.toFixed(2)}
              </Price>
            </Info>
          </div>
        </InnerContainer>
      ))}
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  gender: selectSex,
  allProducts: selectProducts,
  sortMethod: selectSortMethod,
  searchValue: selectSearchValue,
  category: selectCategory,
})

export default connect(mapStateToProps)(ItemsGrid)
