import { LiaMinusCircleSolid, LiaPlusCircleSolid, LiaTrashAlt } from "react-icons/lia";
import { useDispatch } from "react-redux"
import { updateCartItemAmount, deleteProductFromCart } from "../redux/reducers/cartReducer";

const ProductControl = ({ item }) => {
  const dispatch = useDispatch()
  console.log(item)
  const controlProductAmount = (action, id, condition) => {
    const newAmount = action === "minus" && item.amount === 1
      ? dispatch(deleteProductFromCart({ id, condition }))
      : action === "minus"
        ? item.amount - 1
        : Math.min(item.amount + 1, item.inStock)

    dispatch(updateCartItemAmount({ id, condition, amount: newAmount }))
  };

  const MinusIcon = item.amount === 1 ? LiaTrashAlt : LiaMinusCircleSolid

  return (
    <div className="cart-item-amount">
      <MinusIcon onClick={() => controlProductAmount("minus", item.id, item.condition)} />
      <p>{item.amount}</p>
      <LiaPlusCircleSolid onClick={() => controlProductAmount("plus", item.id, item.condition)} />
    </div>
  )
}

export default ProductControl