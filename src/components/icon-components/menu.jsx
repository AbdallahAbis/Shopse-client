import React, { useState } from "react"
import styled from "styled-components"

const OuterContainer = styled.div`
  height: 2.7rem;
  width: 3.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`

const Container = styled.div`
  height: 2.2rem;
  width: 3rem;
  position: relative;

  .line1,
  .line2,
  .line3 {
    width: 100%;
    height: 2px;
    background: var(--color-tertiary);
    border-radius: 10px;

    position: absolute;
    left: 0;

    transition: all 0.3s;
  }

  .line1 {
    top: 5%;
  }

  .line2 {
    top: 50%;
    width: 70%;
    transform: none;
  }

  .line3 {
    top: 95%;
  }

  // Open

  &.true {
    .line1 {
      top: 50%;
      transform: rotate(-50deg);
    }
    .line2 {
      transform: translateX(-100%);
      background: transparent;
      transition: all 0.5s;
    }
    .line3 {
      top: 50%;
      transform: rotate(50deg);
    }
  }
`

const MenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <OuterContainer aria-label="menu" onClick={() => setIsOpen(!isOpen)}>
      <Container className={isOpen}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </Container>
    </OuterContainer>
  )
}
export default MenuIcon
