import React from "react"
import { connect } from "react-redux"
import ItemsGrid from "../components/items-grid"
import ItemsHeader from "../components/items-header"
import Layout from "../components/layout"
import { changeSex } from "../state/shop/shop.actions"

const ProductsPage = ({ location, changeSex }) => {
  return (
    <Layout location={location}>
      <ItemsHeader location={location} />
      <ItemsGrid location={location} />
    </Layout>
  )
}

const mapDispatchToProps = dispatch => ({
  changeSex: () => dispatch(changeSex()),
})

export default connect(null, mapDispatchToProps)(ProductsPage)
