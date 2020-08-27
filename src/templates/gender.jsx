import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import SearchIcon from "../components/icons/search"
import Layout from "../components/layout"
import { selectLoading, selectProducts } from "../state/shop/shop.selectors"
import { changeCategory } from "../state/utils/utils.reducer"
import generateImages from "../utils/generate-decoration-images"
import device from "../theme/media"

const Container = styled.div`
  height: calc(100vh - var(--header));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;

  z-index: -1;
  overflow: hidden;

  &::before {
    content: "SHOPSE";
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30rem;
    font-weight: 700;
    line-height: 0.5;
    color: var(--color-primary);
    opacity: 0.4;

    // Media Query ...................
    @media ${device.tabPort} {
      font-size: 23rem;
    }
    @media ${device.phone} {
      font-size: 15rem;
    }
  }

  .men-image {
    position: absolute;
    transition: all 0.3s ease-in;

    &:nth-child(odd) {
      width: 25rem;
      height: 40rem;
      left: 5%;
      top: 20%;
    }
    &:nth-child(even) {
      width: 22rem;
      height: 30rem;
      right: 5%;
      top: 50%;
    }

    &:nth-child(odd),
    &:nth-child(even) {
      // Media Query ...................
      @media ${device.tabPort} {
        width: 18rem;
        height: 30rem;
      }
      @media ${device.phone} {
        display: none;
      }
    }

    .gatsby-image-wrapper {
      width: 100%;
      height: 100%;
      border: 0.5px solid var(--color-tertiary);
    }
  }
`
const SearchContainer = styled.div`
  width: 30%;
  height: 5rem;

  // Media Query ...................

  @media ${device.tabPort} {
    width: 40%;
  }
  @media ${device.phone} {
    width: 80%;
  }
`
const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  h1 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 2px;
    margin-bottom: 3rem;
  }
  a {
    font-weight: 300;
    font-size: 4rem;
    transition: all 0.2s linear;
    &:not(:last-child) {
      margin-bottom: 4rem;
    }

    &:hover {
      transition: all 0.2s linear;
      text-shadow: -0.5px -0.5px 0 var(--color-text),
        -1px -1px 0 var(--color-text);
    }
  }
`
const GenderPage = ({ location, changeCategory, products, loading }) => {
  const gender = location.pathname.replace(/^\/+/g, "")

  const images = generateImages(products, loading, 2)

  const handleClick = e => {
    const element = e.target
    const value = element.getAttribute("value")
    changeCategory(value.toLowerCase().replace(/ /g, ""))
  }
  return (
    <Layout location={location}>
      <Container>
        <Background>
          {images &&
            images[gender].map(({ thumbnail }, i) => (
              <div key={i} className="men-image">
                <Img fluid={thumbnail.imageFile.childImageSharp.fluid} />
              </div>
            ))}
        </Background>
        <SearchContainer>
          <SearchIcon location={location} />
        </SearchContainer>
        <CategoriesContainer>
          <h1>Categories:</h1>
          <Link
            to={`/${gender}/products/categories`}
            onClick={handleClick}
            value="categories"
          >
            All Categories
          </Link>
          <Link
            to={`/${gender}/products/accessories`}
            onClick={handleClick}
            value="accessories"
          >
            Accessories
          </Link>
          <Link
            to={`/${gender}/products/clothes`}
            onClick={handleClick}
            value="clothes"
          >
            Clothes
          </Link>
          <Link
            to={`/${gender}/products/shoes`}
            onClick={handleClick}
            value="shoes"
          >
            Shoes
          </Link>
        </CategoriesContainer>
      </Container>
    </Layout>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  loading: selectLoading,
})
const mapDispatchToProps = dispatch => ({
  changeCategory: category => dispatch(changeCategory(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GenderPage)
