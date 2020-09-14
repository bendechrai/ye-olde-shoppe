import React from "react"
import { PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

type DataProps = {}

const NotFoundPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <h2>404: Not found</h2>
      <p>The thing you want to do? It cannot be done.</p>
    </Layout>
  )
}

export default NotFoundPage
