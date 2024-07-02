import { useSelector } from 'react-redux'
import placeholderIMG from '../assets/images/products-header.png'
import ProductControl from '../components/ProductControl'

const CartPage = () => {

  const cart = useSelector((state) => state.cart)

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
                  <p>{product.discountPrice * product.amount}€</p>
                ) : (
                  <p>{product.normalPrice * product.amount}€</p>
                )}
              </div>
            ))
          ) : (
            null
          )}
        </div>
      </div>
    </section>
  )
}

export default CartPage