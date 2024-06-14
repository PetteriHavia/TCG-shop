import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md"
import placeholderIMG from "../assets/images/products-header.png"
import { LiaMinusCircleSolid, LiaPlusCircleSolid, LiaTrashAlt } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { updateCartItemAmount, deleteProductFromCart } from "../redux/reducers/cartReducer";
import { Link } from "react-router-dom"
import { formatPath } from "../utils/formatPath";


const CartPreview = () => {

  const cart = useSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

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

  const controlProductAmount = (action, id, condition) => {
    const item = cart.find(item => item.id === id && item.condition === condition)
    console.log(item)

    const newAmount = action === "minus" && item.amount === 1
      ? dispatch(deleteProductFromCart({ id, condition }))
      : action === "minus"
        ? item.amount - 1
        : Math.min(item.amount + 1, item.inStock)

    dispatch(updateCartItemAmount({ id, condition, amount: newAmount }))
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
                      <Link to={`/products/${formatPath(item.name)}`}>{item.name}</Link>
                      <div className="cart-item-action">
                        <div className="cart-item-amount">
                          {item.amount === 1 ? <LiaTrashAlt onClick={() => controlProductAmount("minus", item.id, item.condition)} /> :
                            <LiaMinusCircleSolid onClick={() => controlProductAmount("minus", item.id, item.condition)} />}
                          <p>{item.amount}</p>
                          <LiaPlusCircleSolid onClick={() => controlProductAmount("plus", item.id, item.condition)} />
                        </div>
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
              <button>
                Checkout
              </button>
            </div>
          </div>
        )
        : null}
    </div>
  )
}

export default CartPreview