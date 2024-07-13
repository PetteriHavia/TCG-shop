import { useSelector } from 'react-redux'
import placeholderIMG from '../assets/images/products-header.png'
import ProductControl from '../components/ProductControl'

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


  return (
    <section className='container-md'>
      <div className="cart-page-header">
        <h2>Cart Preview</h2>
      </div>
      <div className="cart-page-content">
        <div className="cart-page-list">
          {cart.length > 0 ? (
            cart.map((product) => (
              <div className="cart-page-item" key={`${product.id}-${product.condition ?? 'no-condition'}`}>
                <img src={placeholderIMG} alt="product image" />
                <h4>{product.name}</h4>
                <div className="cart-page-product-price">
                  {product.discountPrice ? (
                    <p><span>{product.normalPrice}€</span> {product.discountPrice}€</p>
                  ) : (
                    <p>{product.normalPrice}€</p>
                  )}
                </div>
                <ProductControl item={product} />
                {product.discountPrice ? (
                  <p>{calcProductTotal(product.discountPrice, product.amount)}€</p>
                ) : (
                  <p>{calcProductTotal(product.normalPrice, product.amount)}€</p>
                )}
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
            <h4>{calcCartSubtotal()}€</h4>
          </div>
          <div className="summary-row">
            <h4>Total</h4>
            <h4>{calcCartTotal()}€</h4>
          </div>
          <button className="summary-button">Checkout</button>
        </div>
      </div>
    </section>
  )
}

export default CartPage