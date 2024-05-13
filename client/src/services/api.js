const products = "http://localhost:3003/api/products";
const categories = "http://localhost:3003/api/categories"

const getCategories = async () => {
  const response = await fetch(categories)
  const data = await response.json()
  return data
}

export default { getCategories }