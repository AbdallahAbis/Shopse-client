import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import favicon from "../images/icon.png"

const HeadHelmet = ({ metadata }) => (
  <Helmet>
    <html lang="en" prefix="og: http://ogp.me/ns#" />
    <title itemProp="name" lang="en">
      {metadata.title}
    </title>
    <link rel="shortcut icon" href={favicon} />
    <link rel="canonical" href="https://abisabdallah.com" />

    <meta name="description" content={metadata.description} />

    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={metadata.siteUrl} />
    <meta property="og:site_name" content={metadata.title} />
    <meta property="og:image:width" content="3360" />
    <meta property="og:image:height" content="1900" />
    <meta property="og:image:type" content="image/webp" />

    <meta itemProp="name" content={metadata.title} />
    <meta itemProp="description" content={metadata.description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={metadata.siteUrl} />

    <meta name="twitter:title" content={metadata.title} />
    <meta name="twitter:description" content={metadata.description} />
    <meta name="twitter:image:alt" content={metadata.title} />
  </Helmet>
)

export default HeadHelmet

HeadHelmet.propTypes = {
  metadata: PropTypes.object.isRequired,
}
