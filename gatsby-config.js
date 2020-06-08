const config = require("./src/config")

module.exports = {
  siteMetadata: {
    title: `Shopse`,
    siteUrl: `https://shopse.netlify.app`,
    description: `An eCommerce website designed by M.N and developed by A.A`,
  },
  proxy: {
    prefix: "/api",
    url: "http://localhost:4242",
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
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.DEPLOY_URL
          ? "https://shopse.herokuapp.com"
          : "http://localhost:1337",
        queryLimit: 1000,
        contentTypes: [`men`, `women`, `user`],
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
