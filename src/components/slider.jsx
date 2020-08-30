import Img from "gatsby-image"
import React, { useState } from "react"
import styled from "styled-components"
import { slideImages } from "../utils/keyframes"
import device from "../theme/media"

const SliderContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`

const Arrow = styled.div`
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: ${({ direction }) => (direction === "right" ? "97%" : "3%")};
  transform: ${({ direction }) =>
    direction === "right"
      ? "rotate(180deg)  translate(100%, 50%)"
      : " translateY(-50%)"};

  svg {
    fill: var(--color-tertiary);
  }
`
const ImageContainer = styled.div`
  height: 80%;
  width: 55%;
  position: absolute;
  top: 50%;
  left: 50%;
  .gatsby-image-wrapper {
    animation: ${slideImages} 0.5s both;
    border: 1px solid var(--color-secondary);
    width: 100%;
    height: 100%;
  }
  &:nth-child(odd) {
    transform: ${({ rotate }) =>
      `translate(-50%, -50%) rotate(${1 + rotate * 2}deg)`};

    @media ${device.tabPort} {
      transform: translate(-50%, -50%);
    }
  }
  &:nth-child(even) {
    transform: translate(-50%, -50%) rotate(-10deg);

    @media ${device.tabPort} {
      transform: translate(-50%, -50%);
    }
  }
`

const Slider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(images.length - 1)

  const slidePrev = () => {
    if (activeIndex === images.length - 1) return setActiveIndex(0)
    setActiveIndex(activeIndex + 1)
  }

  const slideNext = () => {
    if (activeIndex === 0) return setActiveIndex(images.length - 1)
    setActiveIndex(activeIndex - 1)
  }

  return (
    <SliderContainer>
      <Arrow direction="right" onClick={slideNext}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.2 477.2">
          <path d="M145.2 238.6l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1L145.2 238.6z" />
        </svg>
      </Arrow>
      <Arrow onClick={slidePrev}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.2 477.2">
          <path d="M145.2 238.6l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1L145.2 238.6z" />
        </svg>
      </Arrow>
      {images
        .slice(0)
        .reverse()
        .map((image, i) =>
          images.indexOf(image) >= activeIndex ? (
            <ImageContainer rotate={i} key={i}>
              <Img fluid={image.imageFile.childImageSharp.fluid} />
            </ImageContainer>
          ) : null
        )}
    </SliderContainer>
  )
}

export default Slider
