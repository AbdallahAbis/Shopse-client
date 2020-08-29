const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    STRAPI_UploadFile: {
      imageFile: {
        type: "File",
        async resolve(source) {
          return await createRemoteFileNode({
            url: `${source.url}`,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        products: strapi {
          men: man {
            clothes: men_clothes {
              slug
            }
            shoes: men_shoes {
              slug
            }
            accessories: men_accessories {
              slug
            }
          }
          women: woman {
            clothes: women_clothes {
              slug
            }
            shoes: women_shoes {
              slug
            }
            accessories: women_accessories {
              slug
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query in gatsby-node.`)
    return
  }

  const products = result.data.products
  const productsTemplate = path.resolve(`src/templates/products.jsx`)
  const productTemplate = path.resolve(`src/templates/product.jsx`)
  const genderTemplate = path.resolve(`src/templates/gender.jsx`)

  for (let [key, value] of Object.entries(products)) {
    createPage({
      path: `${key}`,
      component: genderTemplate,
    })
  }
  for (let [key, value] of Object.entries(products)) {
    createPage({
      path: `${key}/products`,
      component: productsTemplate,
    })
  }
  for (let [key, value] of Object.entries(products.men)) {
    createPage({
      path: `men/products/${key}`,
      component: productsTemplate,
    })
    createPage({
      path: `men/products/categories`,
      component: productsTemplate,
    })
  }
  for (let [key, value] of Object.entries(products.women)) {
    createPage({
      path: `women/products/${key}`,
      component: productsTemplate,
    })
    createPage({
      path: `women/products/categories`,
      component: productsTemplate,
    })
  }

  for (let [key, values] of Object.entries(products.men)) {
    values.forEach(value => {
      createPage({
        path: `men/products/${key}/${value.slug}`,
        component: productTemplate,
        context: {
          slug: value.slug,
        },
      })
    })
  }
  for (let [key, values] of Object.entries(products.women)) {
    values.forEach(value => {
      createPage({
        path: `women/products/${key}/${value.slug}`,
        component: productTemplate,
        context: {
          slug: value.slug,
        },
      })
    })
  }
}
