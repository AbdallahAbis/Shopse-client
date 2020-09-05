import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import styled, { css } from "styled-components"
import Layout from "../components/layout"
import { selectLoading, selectProducts } from "../state/shop/shop.selectors"
import generateImages from "../utils/generate-decoration-images"
import device from "../theme/media"

const image = css`
  position: absolute;
  top: 20%;
  width: 25rem;
  height: 40rem;
  transition: all 0.3s ease-in;

  &:last-child {
    width: 22rem;
    height: 35rem;
    top: 50%;
  }

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    /* border: 0.5px solid var(--color-tertiary); */
  }
`

const Container = styled.div`
  height: 100vh;
  width: 100%;
  min-height: 100vh;
  min-width: 100%;
  display: flex;
  overflow: hidden;

  @media ${device.tabPort} {
    flex-direction: column;
  }

  .inner {
    width: 50%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    position: relative;
    &:last-of-type {
      background: var(--color-primary);
    }

    &:hover {
      width: 100%;

      .men-image {
        transition: all 0.4s ease-in;
        transform: rotate(-10deg) translateX(0);

        &:last-child {
          transform: rotate(5deg) translateX(0);
          transition-delay: 0.3s;
        }

        // Media Query
        @media ${device.tabPort} {
          display: none;
        }
      }
      .women-image {
        transition: all 0.4s ease-in;
        transform: rotate(15deg) translateX(0);

        &:last-child {
          transform: rotate(-5deg) translateX(0);
          transition-delay: 0.3s;
        }

        // Media Query
        @media ${device.tabPort} {
          display: none;
        }
      }

      .text {
        span {
          font-size: 2.5rem;
          transition: all 0.5s;

          // Media Query
          @media ${device.tabPort} {
            font-size: 2rem;
          }
        }
        a {
          transition: all 0.5s;
          font-size: 10rem;

          // Media Query
          @media ${device.tabPort} {
            font-size: 8rem;
          }
        }
      }
    }

    .text {
      span {
        display: block;
        font-size: 2rem;
        transition: all 0.5s;
      }
      a {
        transition: all 0.5s;

        font-size: 8rem;
      }
    }

    .women-image {
      ${image}
      left: 5%;
      transform: translateX(-200%);
    }
    .men-image {
      ${image}
      right: 5%;
      transform: translateX(200%);
    }

    // Media Query ...................
    @media ${device.tabPort} {
      width: 100%;
      height: 50%;
    }
  }
`

const HomePage = ({ location, products, loading }) => {
  const images = generateImages(products, loading, 2)
  return (
    <Layout location={location}>
      <Container>
        <div className="inner">
          <div className="text">
            <span>shop</span>
            <Link to="/women">Women</Link>
          </div>
          {!loading &&
            images.women.map(({ thumbnail }, i) => (
              <div key={i} className="women-image">
                <Img fluid={thumbnail.imageFile.childImageSharp.fluid} />
              </div>
            ))}
        </div>
        <div className="inner">
          <div className="text">
            <span>shop</span>
            <Link to="/men">Men</Link>
          </div>
          {!loading &&
            images.men.map(({ thumbnail }, i) => (
              <div key={i} className="men-image">
                <Img fluid={thumbnail.imageFile.childImageSharp.fluid} />
              </div>
            ))}
        </div>
      </Container>
    </Layout>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  loading: selectLoading,
})

export default connect(mapStateToProps)(HomePage)
