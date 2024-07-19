import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { MdOutlineShoppingCart } from "react-icons/md"
import placeholderIMG from "../assets/images/products-header.png"
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom"
import ProductControl from "./ProductControl";


const CartPreview = () => {

  const cart = useSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (cart.length === 0) {
      setIsOpen(false)
    }
  }, [cart])

  const handleOpenCartPreview = () => {
    if (cart.length > 0) {
      setIsOpen(true)
    }
  }

  const handleClosePreview = () => {
    setIsOpen(false)
  }

  const calculateTotal = () => {
    const total = cart.reduce((acc, curr) => {
      const price = curr.discountPrice ? curr.discountPrice : curr.normalPrice
      return acc + (price * curr.amount)
    }, 0)
    return Math.round(total * 100) / 100
  }

  return (
    <div className="carttest">
      <div className="cart-icons">
        <MdOutlineShoppingCart onClick={handleOpenCartPreview} />
        {cart.length > 0 ? <span>{cart.length}</span> : null}
      </div>
      {isOpen && cart.length > 0 ?
        (
          <div className="cart-preview">
            <div className="cart-header">
              <h3>Cart</h3>
              <div className="close-icon">
                <MdClose onClick={handleClosePreview} />
              </div>
            </div>
            <div className="container">
              {cart.map((item) => (
                <div key={`${item.name}-${item.condition ?? 'no-condition'}`}>
                  <div className="cart-item-container">
                    <img src={placeholderIMG} alt="product image" />
                    <div className="cart-item-info">
                      <Link to={`/products/${item.categories[0]}/${item.slug}`}>{item.name}</Link>
                      <div className="cart-item-action">
                        <ProductControl item={item} />
                        <div className="cart-item-price">
                          <p>{item.discountPrice ? item.discountPrice : item.normalPrice}€</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <p>{cart.length} products</p>
                <p>Total: {calculateTotal()}€</p>
              </div>
              <Link to="/cart">
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        )
        : null}
    </div>
  )
}

export default CartPreview