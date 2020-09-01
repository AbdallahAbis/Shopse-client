import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import CustomButton from "../components/custom-button"
import Layout from "../components/layout"

const Container = styled.div`
  height: calc(100vh - var(--header));
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    letter-spacing: 1rem;
    color: var(--color-text);
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
      0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
      0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
      0 20px 20px rgba(0, 0, 0, 0.15);
  }
  a {
    letter-spacing: 0.2rem;
  }
`

const FourZeroFour = styled.p`
  font-size: 10rem;
`

const Text = styled.p`
  font-size: 4rem;

  margin-bottom: 5rem;
`

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Container>
        <InnerContainer>
          <FourZeroFour>404</FourZeroFour>
          <Text>Page Not Found</Text>
          <CustomButton as={Link} to="/">
            Go Back To Home Page
          </CustomButton>
        </InnerContainer>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
