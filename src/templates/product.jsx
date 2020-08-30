import { graphql } from "gatsby"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled from "styled-components"
import Color from "../components/color"
import CustomButton from "../components/custom-button"
import Like from "../components/icons/like"
import Layout from "../components/layout"
import Size from "../components/size"
import Slider from "../components/slider"
import { addItem } from "../state/cart/cart.actions"
import { selectCartItems } from "../state/cart/cart.selectors"
import {
  changeItemSize,
  selectItemColor,
  selectItemSize,
  selectSearchValue,
} from "../state/utils/utils.reducer"
import { halfRotate, slideBottom, slideRight } from "../utils/keyframes"
import device from "../theme/media"
import ItemsHeader from "../components/items-header"
import ItemsGrid from "../components/items-grid"

const Container = styled.div`
  min-height: calc(100vh - var(--header));
  width: 100%;

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

    // Media Query ...................

    @media ${device.tabPort} {
      background: linear-gradient(
        to bottom,
        var(--color-secondary) 50%,
        var(--color-primary) 50%
      );
    }
  }

  // Media Query ...................

  @media ${device.tabPort} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    margin-bottom: 5rem;

    align-items: start;
  }

  // Media Query ...................

  @media ${device.verySmallPhone} {
    margin-bottom: 10rem;
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

      // Media Query ...................

      @media ${device.tabLand} {
        width: 100%;
      }
    }
  }

  // Media Query ...................

  @media ${device.tabPort} {
    height: 70%;
    width: 100%;
  }
`
const ProductTitle = styled.h1`
  font-weight: 300;
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: ${slideBottom} 0.2s 0.5s both;

  // Media Query ...................

  @media ${device.tabPort} {
    font-size: 3rem;
  }
`
const ProductPrice = styled.p`
  font-size: 2rem;
  margin-bottom: 10rem;
  animation: ${slideBottom} 0.2s 0.7s both;

  @media ${device.tabPort} {
    margin-bottom: 5rem;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;

  // Media Query ...................

  @media ${device.tabPort} {
    width: 40%;
  }
  @media ${device.phone} {
    width: 60%;
  }
`

const ProductPage = ({
  location,
  data,
  addCurrentItem,
  cartItems,
  itemSize,
  changeItemSize,
  itemColor,
  searchValue,
}) => {
  const men = data.products.men
  const women = data.products.women
  const { id, title, thumbnail, images, price, other } =
    men.clothes[0] ||
    men.shoes[0] ||
    men.accessories[0] ||
    women.clothes[0] ||
    women.shoes[0] ||
    women.accessories[0]

  useEffect(() => {
    changeItemSize("")
  }, [location.pathname, changeItemSize])

  const sizes = !other.sizes ? ["One Size"] : other.sizes
  const colors = Object.keys(other).length === 0 ? ["One Color"] : other.colors
  const currentSize =
    cartItems.find(item => item.id === id) &&
    cartItems.find(
      item => item.title.replace(/\s/g, "") === title.replace(/\s/g, "")
    ) &&
    cartItems.find(item => item.id === id).itemSize

  const item = { id, title, thumbnail, price, colors, itemSize }
  const handleAddItem = () => {
    addCurrentItem(item)
    changeItemSize("")
  }

  return (
    <Layout location={location}>
      {!searchValue ? (
        <Container>
          <ImagesContainer>
            <Slider images={images}></Slider>
          </ImagesContainer>
          <TextContainer>
            <div>
              <ProductTitle>{title}</ProductTitle>
              <ProductPrice>${price}</ProductPrice>
              <Color
                colors={colors}
                bottomAnimation={slideBottom}
                rightAnimation={slideRight}
              />
              <Size
                sizes={sizes}
                selectedSize={currentSize}
                bottomAnimation={slideBottom}
                rightAnimation={slideRight}
              ></Size>
              <ActionsContainer>
                <CustomButton
                  onClick={handleAddItem}
                  bottomAnimation={slideBottom}
                  disabledButton={
                    !currentSize && !(sizes[0] === "One Size") && !itemSize
                  }
                >
                  Add To Cart
                </CustomButton>
                <Like bottomAnimation={slideBottom} />
              </ActionsContainer>
            </div>
          </TextContainer>
        </Container>
      ) : (
        <>
          <ItemsHeader location={location} />
          <ItemsGrid location={location} />
        </>
      )}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    products: strapi {
      men: man {
        clothes: men_clothes(where: { slug: $slug }) {
          title
          id
          description
          price
          available
          other
          thumbnail {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          images {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        shoes: men_shoes(where: { slug: $slug }) {
          title
          id
          description
          price
          available
          other
          thumbnail {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          images {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        accessories: men_accessories(where: { slug: $slug }) {
          title
          id
          description
          price
          available
          other
          thumbnail {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          images {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
      women: woman {
        clothes: women_clothes(where: { slug: $slug }) {
          title
          id
          description
          price
          available
          other
          thumbnail {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          images {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        shoes: women_shoes(where: { slug: $slug }) {
          title
          id
          description
          price
          available
          other
          thumbnail {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          images {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        accessories: women_accessories(where: { slug: $slug }) {
          title
          id
          description
          price
          available
          other
          thumbnail {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          images {
            url
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  itemSize: selectItemSize,
  itemColor: selectItemColor,
  searchValue: selectSearchValue,
})
const mapDispatchToProps = dispatch => ({
  addCurrentItem: item => dispatch(addItem(item)),
  changeItemSize: value => dispatch(changeItemSize(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
