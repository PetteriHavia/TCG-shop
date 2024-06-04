import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md"
import placeholderIMG from "../assets/images/products-header.png"
import { LiaMinusCircleSolid, LiaPlusCircleSolid, LiaTrashAlt } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { updateCartItemAmount, deleteProductFromCart } from "../redux/reducers/cartReducer";


const CartPreview = () => {

  const cart = useSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const handleOpenCartPreview = () => {
    if (cart.length > 0) {
      setIsOpen(true)
    }
  }

  const handleClosePreview = () => {
    setIsOpen(!isOpen)
  }

  const calculateTotal = () => {
    return cart.reduce((acc, curr) => (curr.discountPrice ? acc += curr.discountPrice : acc += curr.normalPrice), 0).toFixed(2)
  }


  const controlProductAmount = (action, id) => {
    const item = cart.find(item => item.id === id)
    const newAmount = item.amount === 1 ? dispatch(deleteProductFromCart({ id }))
      : action === "minus" ? item.amount - 1
        : Math.min(item.amount + 1, item.isStock)

    dispatch(updateCartItemAmount({ id, amount: newAmount }))
    /*
   if (action === "minus") {
     dispatch(updateCartItemAmount({ id, amount: cart.find(item => item.id === id).amount - 1 }))
   } else {
     dispatch(updateCartItemAmount({ id, amount: cart.find(item => item.id === id).amount + 1 }))
   }*/
  }

  return (
    <div className="carttest">
      <MdOutlineShoppingCart onClick={handleOpenCartPreview} />
      {isOpen && cart.length > 0 ?
        (
          <div className="cart-preview">
            <div className="cart-header">
              <h3>Cart</h3>
              <MdClose onClick={handleClosePreview} />
            </div>
            {cart.map((item) => (
              <div key={item.id} className="container">
                <div className="cart-item-container">
                  <img src={placeholderIMG} alt="product image" />
                  <div className="cart-item-info">
                    <p>{item.name}</p>
                    <div className="cart-item-action">
                      <div className="cart-item-amount">
                        {item.amount === 1 ? <LiaTrashAlt onClick={() => controlProductAmount("minus", item.id)} /> :
                          <LiaMinusCircleSolid onClick={() => controlProductAmount("minus", item.id)} />}
                        <p>{item.amount}</p>
                        <LiaPlusCircleSolid onClick={() => controlProductAmount("plus", item.id)} />
                      </div>
                      <div className="cart-item-price">
                        <p>{item.discountPrice ? item.discountPrice : item.normalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-footer">
              <div className="cart-total">
                <p>{cart.length} products</p>
                <p>Total: {calculateTotal()}</p>
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