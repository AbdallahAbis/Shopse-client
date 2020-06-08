import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import {
  selectIsLoading,
  selectSex,
  selectShopMen,
  selectShopWomen,
} from "../state/shop/shop.selectors"
import {
  selectSearchValue,
  selectSortMethod,
} from "../state/utils/utils.reducer"
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
`
const Title = styled(Link)`
  font-weight: 300;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`
const Price = styled(Link)`
  font-weight: 700;
`

const ItemsGrid = ({ men, women, sex, loading, sortMethod, searchValue }) => {
  let currentSex = sex === "women" ? women : men
  const products = SortAndSearch(currentSex, sortMethod, searchValue)

  console.log(products, loading)

  return products.length === 0 && !loading ? (
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
              to={`/${sex}/${product.Slug}`}
              aria-label="see product's details"
            >
              <Img fluid={product.Thumbnail.childImageSharp.fluid} />
            </ImageContainer>
            <Info>
              <Title
                to={`/${sex}/${product.Slug}`}
                aria-label="check product's details"
              >
                {product.Title}
              </Title>
              <Price
                to={`/${sex}/${product.Slug}`}
                aria-label="check product's details"
              >
                ${product.Price.toFixed(2)}
              </Price>
            </Info>
          </div>
        </InnerContainer>
      ))}
    </Container>
  )
}

const mapStateToProps = createStructuredSelector({
  sex: selectSex,
  men: selectShopMen,
  women: selectShopWomen,
  loading: selectIsLoading,
  sortMethod: selectSortMethod,
  searchValue: selectSearchValue,
})

export default connect(mapStateToProps)(ItemsGrid)
