import { graphql, StaticQuery, useStaticQuery } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { createGlobalStyle } from "styled-components"
import config from "../config"
import * as fontFiles from "../fonts/fonts"
import { fetchProducts } from "../state/shop/shop.actions"
import { selectLoading } from "../state/shop/shop.selectors"
import device from "../theme/media"
import Header from "./header"
import Loader from "./loader"
import HeadHelmet from "../utils/head-helmet"

// global styles for the site
const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: "Europa";
    font-weight: 300;
    font-style: normal;
    src: url(${fontFiles.EuropaLightWOFF2}) format("woff2"),
      url(${fontFiles.EuropaLightWOFF}) format("woff"),
      url(${fontFiles.EuropaLightTTF}) format("truetype");
  }
  @font-face {
    font-family: "Europa";
    font-weight: 700;
    font-style: normal;
    src: url(${fontFiles.EuropaBoldWOFF2}) format("woff2"),
      url(${fontFiles.EuropaBoldWOFF}) format("woff"),
      url(${fontFiles.EuropaBoldTTF}) format("truetype");
  }

:root{
    --color-primary: ${config.colors.primary};
    --color-secondary: ${config.colors.secondary};
    --color-tertiary: ${config.colors.tertiary};
    --color-text: ${config.colors.text};
    --header: 10rem;

    --font-primary: 'Europa';

    --space-vSmall: 1rem;

}
::selection {
    background-color: var(--color-tertiary);
    color: var(--color-secondary);
}
 div{
   -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

*,*::before, *::after{
    padding: 0;
    margin: 0;
    box-sizing: inherit;
}

html{
  box-sizing: border-box;
  font-size: 62.5%;

    // Media Query ...................
    @media ${device.tabPort} {
     font-size: 52.5%;
    }
    @media ${device.verySmallPhone} {
     font-size: 42.5%;
    }
}

body{
    font-family: var(--font-primary);
    font-size: 1.6rem;
    font-weight: 300;
    padding: ${({ location }) => (location.pathname === "/" ? "0" : " 0 5rem")};
    color: var(--color-text);
    background: var(--color-secondary);

     // Media Query ...................
   
      @media ${device.phone} {
    padding: ${({ location }) => (location.pathname === "/" ? "0" : " 0 2rem")};
      }
    
}

a {
    text-decoration: none;
    color: var(--color-text);
}
input{
  border: 0.5px solid var(--color-tertiary);
    border-top: none;
    border-right: none;
    border-left: none;
}
select{
   -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    font-size: 1.6rem;
    color: var(--color-text);
    &:-moz-focusring {
      color: transparent;
      text-shadow: 0 0 0 var(--color-text);
    }
}
`

const Layout = ({ children, location, loading, products, fetchProducts }) => {
  // Querying data from Strapi and SiteMetaData
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
      products: strapi {
        men: man {
          clothes: men_clothes {
            title
            slug
            description
            price
            available
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
            __typename
            updated_at
          }
          shoes: men_shoes {
            title
            slug
            description
            price
            available
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
            __typename
            updated_at
          }
          accessories: men_accessories {
            title
            slug
            description
            price
            available
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
            __typename
            updated_at
          }
        }
        women: woman {
          clothes: women_clothes {
            title
            slug
            description
            price
            available
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
            __typename
            updated_at
          }
          shoes: women_shoes {
            title
            slug
            description
            price
            available
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
            __typename
            updated_at
          }
          accessories: women_accessories {
            title
            slug
            description
            price
            available
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
            __typename
            updated_at
          }
        }
      }
    }
  `)

  React.useEffect(() => {
    // update the state with the queried products.
    fetchProducts(data.products)
  }, [data, fetchProducts])
  return loading ? (
    <Loader />
  ) : (
    <div id="root">
      <HeadHelmet metadata={data.site.siteMetadata} />
      <GlobalStyles location={location} />
      <Header location={location} />
      <main>{children}</main>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
})
const mapDispatchToProps = dispatch => ({
  fetchProducts: data => dispatch(fetchProducts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
