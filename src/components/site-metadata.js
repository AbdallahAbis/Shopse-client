import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

import shopseIcon from "../images/icon.png"

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          siteUrl
          title
          description
        }
      }
    }
  `)
  return site.siteMetadata
}

const SiteMetadata = ({ pathname }) => {
  const { siteUrl, title, description } = useSiteMetadata()

  const href = `${siteUrl}${pathname}`

  return (
    <Helmet defer={false} defaultTitle={title} titleTemplate={`%s | ${title}`}>
      <html lang="en" />
      <link rel="canonical" href={href} />
      <meta name="Description" content={description} />
      <meta name="docsearch:version" content="2.0" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
      />

      <meta property="og:url" content={href} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={`${siteUrl}${shopseIcon}`} />
      <meta property="og:image:alt" content="shopse Logo" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />

      <meta name="twitter:card" content="summary" />
    </Helmet>
  )
}

export default SiteMetadata
