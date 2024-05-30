
export const getPrice = (product) => {
  if (Array.isArray(product.price)) {
    return product.price.length > 0 ? product.price[0].price.toFixed(2) : null
  }
  return product.price.toFixed(2)
}

export const getDiscountedPrice = (price, discount) => {
  const discountedPrice = price - (discount * price / 100).toFixed(2)
  return discountedPrice
}