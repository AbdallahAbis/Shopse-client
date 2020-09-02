// importing config in the src to use it
const config = require("./src/config")

// defining the path to Environment variables
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// setting the concurrent download value to allow the queries to run even after 30s which is the default
process.env.GATSBY_CONCURRENT_DOWNLOAD = 1

module.exports = {
  siteMetadata: {
    title: `shopse.`,
    siteUrl: `https://shopse.netlify.app`,
    description: `An eCommerce website designed by M.N and developed by A.A`,
  },

  // sitting the proxy for development env to let gatsby connect with the Backend (Shopse-Server)
  proxy: {
    prefix: "/api",
    url: "http://localhost:1999",
  },
  plugins: [
    // Let's you access files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    // Connects with Strapi
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "STRAPI",
        fieldName: "strapi",
        url: process.env.GATSBY_CMS_URL,
      },
    },
    //  allows to add the site to their home screen on most mobile browsers
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `shopse.`,
        short_name: `shopse.`,
        start_url: `/`,
        background_color: config.colors.primary,
        theme_color: config.colors.primary,
        display: `minimal-ui`,
        icon: "src/images/icon.png",
      },
    },
    // Let's webpack to access svg files
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    // for styled-components
    `gatsby-plugin-styled-components`,

    // for easy to load and responsive images
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // for PWA
    `gatsby-plugin-offline`,
  ],
}
