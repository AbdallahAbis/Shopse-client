import React from "react"
import styled from "styled-components"
import SortBy from "./sort"
import Categories from "./categories"
import device from "../theme/media"

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
  }

  // Media Query ...................
  @media ${device.tabPort} {
    margin: 5rem 0;
  }
`

const ItemsHeader = ({ location }) => (
  <Container>
    <div>
      <Categories location={location} />
    </div>
    <SortBy />
  </Container>
)

export default ItemsHeader
