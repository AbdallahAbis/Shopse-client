import { graphql } from "gatsby"
import React, { useRef } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import Color from "../components/color"
import CustomButton from "../components/custom-button"
import Like from "../components/icons/like"
import Layout from "../components/layout"
import Size from "../components/size"
import Slider from "../components/slider"
import { addItem } from "../state/cart/cart.actions"
import { halfRotate, slideBottom, slideRight } from "../utils/keyframes"

const Container = styled.div`
  height: calc(100vh - var(--header));
  width: 100%;
  overflow: hidden;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;

  &::before {
    content: "";
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: linear-gradient(
      to right,
      var(--color-secondary) 50%,
      var(--color-primary) 50%
    );
  }
`
const ImagesContainer = styled.div`
  width: 100%;
  height: 100%;

  animation: ${halfRotate} 1s both;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 80%;

  & > * {
    &:first-of-type {
      width: 80%;
      height: 100%;
    }
  }
`
const ProductTitle = styled.h1`
  font-weight: 300;
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: ${slideBottom} 0.2s 0.5s both;
`
const ProductPrice = styled.p`
  font-size: 2rem;
  margin-bottom: 10rem;
  animation: ${slideBottom} 0.2s 0.7s both;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`

const ProductPage = ({ location, data, addCurrentItem }) => {
  const {
    id,
    Title,
    Thumbnail,
    Images,
    Price,
    Other: { color, size },
  } = data.Men.Products[0] || data.Women.Products[0]
  const ref = useRef(null)

  const item = { id, Title, Thumbnail, Price: Number(Price.toFixed(2)) }

  console.log(item)

  return (
    <Layout location={location}>
      <Container>
        <ImagesContainer ref={ref}>
          <Slider width={ref} images={Images}></Slider>
        </ImagesContainer>
        <TextContainer>
          <div>
            <ProductTitle>{Title}</ProductTitle>
            <ProductPrice>${Price.toFixed(2)}</ProductPrice>
            <Color
              colors={color}
              bottomAnimation={slideBottom}
              rightAnimation={slideRight}
            />
            <Size
              sizes={size}
              bottomAnimation={slideBottom}
              rightAnimation={slideRight}
            ></Size>
            <ActionsContainer>
              <CustomButton
                onClick={() => addCurrentItem(item)}
                bottomAnimation={slideBottom}
              >
                Add To Cart
              </CustomButton>
              <Like bottomAnimation={slideBottom} />
            </ActionsContainer>
          </div>
        </TextContainer>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    Women: allStrapiWomen(filter: { Slug: { eq: $slug } }) {
      Products: nodes {
        id
        Title
        Description
        Price
        Thumbnail {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        Images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        Other {
          color
          size
        }
      }
    }
    Men: allStrapiMen(filter: { Slug: { eq: $slug } }) {
      Products: nodes {
        id
        Title
        Description
        Price
        Thumbnail {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        Images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        Other {
          color
          size
        }
      }
    }
  }
`

const mapDispatchToProps = dispatch => ({
  addCurrentItem: item => dispatch(addItem(item)),
})

export default connect(null, mapDispatchToProps)(ProductPage)
