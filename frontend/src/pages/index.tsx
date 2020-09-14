import React, { useState, useEffect } from "react"
import { PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

type DataProps = {}

const IndexPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(process.env.GATSBY_API + "/items")
      .then(res => res.json())
      .then(json => {
        // Result is an indexed object, so convert to an array
        setItems(Object.keys(json).map(key => json[key]))
      })
  }, [])

  const addToCart = item => {
    console.log("Buying", item)
  }

  return (
    <Layout className="home">
      <SEO title="Welcome" />
      <h2>Want to buy something?</h2>
      <div className="items">
        {items.map(item => (
          <div className="item card" key={item.id}>
            <div className="card-top">
              <h3>{item.name}</h3>
              <img src={item.image} alt={item.name} />
              <p className="description">{item.description}</p>
            </div>
            <p className="card-bottom">
              <button onClick={() => addToCart(item)}>
                Buy now, for ${item.price}
              </button>
            </p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
