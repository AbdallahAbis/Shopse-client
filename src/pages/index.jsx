import { graphql } from "gatsby"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import ItemsGrid from "../components/items-grid"
import ItemsHeader from "../components/items-header"
import Layout from "../components/layout"
import { fetchMenData, fetchWomenData } from "../state/shop/shop.actions"

const HomePage = ({ location, data, fetchMenData, fetchWomenData }) => {
  useEffect(() => {
    fetchMenData(data.Men.Products)
    fetchWomenData(data.Women.Products)
  })

  return (
    <Layout location={location}>
      <ItemsHeader />
      <ItemsGrid />
    </Layout>
  )
}
export const HomeQuery = graphql`
  {
    Women: allStrapiWomen {
      Products: nodes {
        id
        Title
        Description
        Price
        Slug
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
    Men: allStrapiMen {
      Products: nodes {
        id
        Title
        Description
        Price
        Slug
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
  fetchMenData: data => dispatch(fetchMenData(data)),
  fetchWomenData: data => dispatch(fetchWomenData(data)),
})

export default connect(null, mapDispatchToProps)(HomePage)
