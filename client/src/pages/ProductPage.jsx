import { useParams } from "react-router-dom"
import { useGetSingleProductQuery } from "../redux/reducers/apiSlice";
import placeholderIMG from '../assets/images/products-header.png'
import { useEffect, useState } from "react";
import ProductVersionList from "../components/ProductVersionList";
import { getDiscountedPrice, getDiscountSum } from "../utils/calculateDicount";
import Breadcrumbs from "../components/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, updateCartItemAmount } from "../redux/reducers/cartReducer";
import { LiaShoppingBagSolid } from "react-icons/lia";

const ProductPage = () => {

  const [currentItemPrice, setCurrentItemPrice] = useState(0);
  const [currentItemStock, setCurrentItemStock] = useState(1)
  const [productAmount, setProductAmount] = useState(1);
  const [currentItemCondition, setCurrentItemCondition] = useState('')
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch();
  const { identifier } = useParams();

  const { data: product, isLoading } = useGetSingleProductQuery(identifier)

  useEffect(() => {
    if (!isLoading && product) {
      if (Array.isArray(product.price)) {
        setCurrentItemPrice(product.price[0].price);
        setCurrentItemStock(product.price[0].amount);
        setCurrentItemCondition(product.price[0].condition)
      } else {
        setCurrentItemPrice(product.price);
        setCurrentItemStock(product.amount);
      }
    }
  }, [isLoading, product])

  const handleControl = (action) => {
    if (Array.isArray(product.price)) {
      if (action == "minus") {
        setProductAmount((prev) => (prev > 1 ? prev - 1 : 1))
      } else {
        setProductAmount((prev) => (prev < currentItemStock ? prev + 1 : currentItemStock))
      }
    } else {
      if (action == "minus") {
        setProductAmount((prev) => (prev > 1 ? prev - 1 : 1))
      } else {
        setProductAmount((prev) => (prev < product.amount ? prev + 1 : product.amount))
      }
    }
  }

  const handleSetCurrentItem = (price, amount, condition) => {
    setCurrentItemPrice(price)
    setCurrentItemStock(amount)
    setProductAmount(1)
    setCurrentItemCondition(condition)
  }

  if (isLoading) {
    return (
      <div className="container-md">
        <p>Loading...</p>
      </div>
    )
  }

  const handleAddProductToCart = (product) => {
    const productValues = {
      id: product.id,
      name: product.productName,
      amount: productAmount,
      inStock: currentItemStock,
      normalPrice: currentItemPrice,
    }
    if (product.discount > 0) {
      const discount = getDiscountedPrice(currentItemPrice, product.discount)
      productValues.discountPrice = discount
    }

    if (checkCategories) {
      productValues.condition = currentItemCondition
    }

    const existingItem = cart.find(item => item.id === product.id && (!checkCategories || item.condition === currentItemCondition));
    if (existingItem) {
      dispatch(updateCartItemAmount({ id: existingItem.id, amount: productAmount, condition: existingItem.condition }))
      return
    }
    dispatch(addItemsToCart(productValues))
  }

  const checkCategories = product?.categories.some(item => item.name === "Single card")

  return (
    <section>
      <div className="container-md">
        <Breadcrumbs params={identifier} />
        <div className="product-container">
          <img src={placeholderIMG} alt="product image" />
          <div className="product-layout">
            <div className="product-info">
              <div className="column">
                <h2>{product.productName}</h2>
                {product.discount > 0 ?
                  <div className="discount-information">
                    <h3>{getDiscountedPrice(currentItemPrice, product.discount)}€</h3>
                    <span>Save: <span>{product.discount}% </span><span>({getDiscountSum(currentItemPrice, product.discount)}€)</span></span>
                  </div>
                  :
                  <h3>{currentItemPrice.toFixed(2)}€</h3>
                }
                {product.amount && <h3>{product.amount} in Stock</h3>}
                <div className="product-amount-control">
                  <button onClick={() => handleControl("minus")}>-</button>
                  <p>{productAmount}</p>
                  <button onClick={() => handleControl("plus")}>+</button>
                </div>
                {product.rarity && <p>Rarity: {product.rarity}</p>}
                {product.setName && <p>Set: {product.setName}</p>}
                <button className="add-to-cart" onClick={() => handleAddProductToCart(product)}>
                  Add To Cart
                  <span>
                    <LiaShoppingBagSolid />
                  </span>
                </button>
              </div>
              {checkCategories ?
                <ProductVersionList discount={product.discount} product={product.price} handleSetCurrentItem={handleSetCurrentItem} />
                : null}
            </div>
          </div>
        </div>
        {product.description && product.description.length > 0 && (
          <div className="product-description">
            {product.description.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductPage