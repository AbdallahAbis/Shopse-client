const config = require("./src/config")
process.env.GATSBY_CONCURRENT_DOWNLOAD = 1

module.exports = {
  siteMetadata: {
    title: `Shopse`,
    siteUrl: `https://shopse.netlify.app`,
    description: `An eCommerce website designed by M.N and developed by A.A`,
  },
  proxy: {
    prefix: "/api",
    url: "http://localhost:1999",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "STRAPI",
        fieldName: "strapi",
        url: "https://shopse-cms.herokuapp.com/graphql",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: config.colors.primary,
        theme_color: config.colors.primary,
        display: `minimal-ui`,
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
  ],
}
