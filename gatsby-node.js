const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNode } = actions

  let multipleImages = node.Images

  if (
    node.internal.type === "StrapiWomen" ||
    node.internal.type === "StrapiMen"
  ) {
    if (multipleImages.length > 0) {
      const images = await Promise.all(
        multipleImages.map(el =>
          createRemoteFileNode({
            url: `http://localhost:1337${el.url}`,
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId,
          })
        )
      )

      multipleImages.forEach((image, i) => {
        image.localFile___NODE = images[i].id
      })
    }
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        Women: allStrapiWomen {
          Products: nodes {
            Slug
          }
        }
        Men: allStrapiMen {
          Products: nodes {
            Slug
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const productTemplate = path.resolve(`src/templates/product.js`)
  result.data.Women.Products.forEach(({ Slug }) => {
    const path = `/women/${Slug}`
    createPage({
      path,
      component: productTemplate,
      context: { slug: Slug },
    })
  })
  result.data.Men.Products.forEach(({ Slug }) => {
    const path = `/men/${Slug}`
    createPage({
      path,
      component: productTemplate,
      context: { slug: Slug },
    })
  })
}
