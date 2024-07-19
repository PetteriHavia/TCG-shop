export const formatPrice = (num) => {
  return num.toFixed(2).replace('.', ',');
}

export const getPrice = (product) => {
  if (Array.isArray(product.price)) {
    return product.price.length > 0 ? (product.price[0].price) : null;
  }
  return product.price;
}

export const getDiscountSum = (price, discount) => {
  const sum = (price * discount) / 100;
  return sum;
}

export const getDiscountedPrice = (price, discount) => {
  const discountedPrice = price - (discount * price / 100);
  return discountedPrice;
}