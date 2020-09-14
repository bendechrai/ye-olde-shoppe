import React, { useState, useEffect } from "react"
import { PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react"

type DataProps = {}

const AdminPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const { getAccessTokenSilently } = useAuth0()

  const [items, setItems] = useState([])
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = () => {
    fetch(process.env.GATSBY_API + "/items")
      .then(res => res.json())
      .then(json => {
        // Result is an indexed object, so convert to an array
        setItems(Object.keys(json).map(key => json[key]))
      })
  }

  const handleEditItem = item => {
    if (!editItem || item.id !== editItem.id) {
      setEditItem(item)
    }
  }

  const handleEditChange = ev => {
    setEditItem({
      ...editItem,
      [ev.target.name]: ev.target.value,
    })
  }

  const handleUpdateItem = ev => {
    ev.preventDefault()

    getAccessTokenSilently().then(token => {
      fetch(process.env.GATSBY_API + "/items", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: editItem?.id ? "PUT" : "POST",
        body: JSON.stringify({ item: editItem }),
      })
        .then(res => {
          if (res.status !== 200) {
            alert("You don't have permission to do this.")
            return
          }
          setEditItem(null)
          loadItems()
        })
        .catch(() => alert("You don't have permission to do this."))
    })
  }

  const handleDeleteItem = item => {
    getAccessTokenSilently().then(token => {
      fetch(process.env.GATSBY_API + "/items/" + item.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }).then(res => {
        if (res.status !== 200) {
          alert("You don't have permission to do this.")
          return
        }
        loadItems()
      })
    })
  }

  return (
    <Layout className="admin">
      <SEO title="Admin" />

      <form onSubmit={handleUpdateItem} hidden={!editItem}>
        <h2>
          {editItem?.id ? "Editing" : "Adding"} {editItem?.name}
        </h2>
        <div>
          <label htmlFor="id">ID</label>
          <input type="text" name="id" value={editItem?.id} disabled={true} />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={editItem?.name}
            onChange={handleEditChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={editItem?.price}
            onChange={handleEditChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={editItem?.description}
            onChange={handleEditChange}
          />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            value={editItem?.image}
            onChange={handleEditChange}
          />
          <div>
            <img src={editItem?.image} alt="[Image Preview]" />
            <div className="controls">
              <button type="submit">
                {editItem?.id ? "Save Changes" : "Create Item"}
              </button>
              <button
                onClick={ev => {
                  ev.preventDefault()
                  setEditItem(null)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>

      <table className="items">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.image} alt={item.name} />
              </td>
              <td className="action">
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="action">
              <button
                onClick={() =>
                  handleEditItem({
                    id: "",
                    name: "<item name>",
                    price: "<0.00>",
                    description: "<item description>",
                    image: "/images/default.jpg",
                  })
                }
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  )
}

export default withAuthenticationRequired(AdminPage)
