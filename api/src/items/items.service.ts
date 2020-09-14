/**
 * Data Model Interfaces
 */
import { Item } from "./item.interface"
import { Items } from "./items.interface"

/**
 * In-Memory Store
 */
const items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 5.99,
    description:
      "This is a tasty burger. It has all the things you'd expect, and then we stab it with a stick!",
    image: "/images/burger.jpg",
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 8.99,
    description:
      "Round and cheese, you'll love the thin crust on this pizza. Made by a genuine human, you won't find a pizza like this anywhere else this side of right here!",
    image: "/images/pizza.jpg",
  },
  3: {
    id: 3,
    name: "Tea",
    price: 1.99,
    description:
      "Fancy a cuppa tea? We've got herbals, black teas, and even little gingerperson biscuits to go with it. Nom nom nom!",
    image: "/images/tea.jpg",
  },
}

/**
 * Service Methods
 */
export const findAll = async (): Promise<Items> => {
  return items
}

export const find = async (id: number): Promise<Item> => {
  const record: Item = items[id]

  if (record) {
    return record
  }

  throw new Error("No record found")
}

export const create = async (newItem: Item): Promise<void> => {
  const id = new Date().valueOf()
  items[id] = {
    ...newItem,
    id,
  }
}

export const update = async (updatedItem: Item): Promise<void> => {
  if (items[updatedItem.id]) {
    items[updatedItem.id] = updatedItem
    return
  }

  throw new Error("No record found to update")
}

export const remove = async (id: number): Promise<void> => {
  const record: Item = items[id]

  if (record) {
    delete items[id]
    return
  }

  throw new Error("No record found to delete")
}
