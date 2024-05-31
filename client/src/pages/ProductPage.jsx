import { useParams } from "react-router-dom"
import { useGetSingleProductQuery } from "../redux/reducers/apiSlice";
import placeholderIMG from '../assets/images/products-header.png'
import { useEffect, useState } from "react";
import ProductVersionList from "../components/ProductVersionList";
import { getDiscountedPrice, getDiscountSum } from "../utils/calculateDicount";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductPage = () => {

  const [currentItemPrice, setCurrentItemPrice] = useState(0);
  const [currentItemStock, setCurrentItemStock] = useState(1)
  const [productAmount, setProductAmount] = useState(1);

  const { identifier } = useParams();

  const { data: product, isLoading } = useGetSingleProductQuery(identifier)

  useEffect(() => {
    if (!isLoading && product) {
      if (Array.isArray(product.price)) {
        setCurrentItemPrice(product.price[0].price);
        setCurrentItemStock(product.price[0].amount);
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

  const handleSetCurrentItem = (price, amount) => {
    setCurrentItemPrice(price)
    setCurrentItemStock(amount)
    setProductAmount(1)
  }

  if (isLoading) {
    return (
      <div className="container-md">
        <p>Loading...</p>
      </div>
    )
  }

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
                <button>Add To Cart</button>
              </div>
              {product.categories.some(category => category.name === "Single card") ?
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