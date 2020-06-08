import React from "react"
import styled from "styled-components"
import SortBy from "./sort"

const Container = styled.div`
  height: 10rem;
  margin: 5rem;
  margin-bottom: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h1 {
    font-weight: 300;
  }
  p {
    color: var(--color-text);
    margin-bottom: var(--space-vSmall);
  }
`

const ItemsHeader = () => (
  <Container>
    <div>
      <p>Clothing</p>
      <h1>Coats & Jackets</h1>
    </div>
    <SortBy />
  </Container>
)

export default ItemsHeader
