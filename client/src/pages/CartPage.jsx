import { useSelector } from 'react-redux'
import ProductControl from '../components/ProductControl'
import { formatPrice } from '../utils/calculateDicount'

const CartPage = () => {

  const cart = useSelector((state) => state.cart)

  const calcProductTotal = (price, amount) => {
    return price * amount
  }

  const calcCartSubtotal = () => {
    return cart.reduce((acc, curr) => {
      if (curr.discountPrice) {
        return acc + (curr.discountPrice * curr.amount)
      } else {
        return acc + (curr.normalPrice * curr.amount)
      }
    }, 0)
  }

  const calcCartTotal = () => {
    // Currently, there are no additional costs, so total equals subtotal
    return calcCartSubtotal()
  }

  const formattedCart = cart.map((product) => {
    const price = product.discountPrice || product.normalPrice
    const totalPrice = calcProductTotal(price, product.amount)
    return {
      ...product,
      formattedPricePrice: formatPrice(price),
      formattedTotal: formatPrice(totalPrice),
      formattedDiscount: product.discountPrice ? formatPrice(product.discountPrice) : formatPrice(product.normalPrice),
      formattedNormal: formatPrice(product.normalPrice)
    }
  })

  return (
    <section className='container-md'>
      <div className="cart-page-header">
        <h2>Cart Preview</h2>
      </div>
      <div className="cart-page-content">
        <div className="cart-page-list">
          {cart.length > 0 ? (
            formattedCart.map((product) => (
              <div className="cart-page-item" key={`${product.id}-${product.condition ?? 'no-condition'}`}>
                <img src={`http://localhost:3003/media/${product.image}`} alt="product image" />
                <h4>{product.name}</h4>
                <div className="cart-page-product-price">
                  {product.discountPrice ? (
                    <p><span className='discount-span'>{product.formattedNormal}€</span>{product.formattedDiscount}€</p>
                  ) : (
                    <p>{product.normalPrice}€</p>
                  )}
                </div>
                <div className="cart-page-price-control">
                  <ProductControl item={product} />
                  <p>Total: {product.formattedTotal}€</p>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="cart-page-summary">
          <h2>Total Amount</h2>
          <h3>Cart</h3>
          <div className="summary-row">
            <h4>Subtotal</h4>
            <h4>{formatPrice(calcCartSubtotal())}€</h4>
          </div>
          <div className="summary-row">
            <h4>Total</h4>
            <h4>{formatPrice(calcCartTotal())}€</h4>
          </div>
          <button className="summary-button">Checkout</button>
        </div>
      </div>
    </section>
  )
}

export default CartPage