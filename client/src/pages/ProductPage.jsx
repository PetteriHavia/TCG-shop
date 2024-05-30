import { useParams } from "react-router-dom"
import { useGetSingleProductQuery } from "../redux/reducers/apiSlice";
import placeholderIMG from '../assets/images/products-header.png'
import { useEffect, useState } from "react";

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

  return (
    <section>
      <div className="container-md">
        {isLoading ?
          null
          :
          <div className="product-container">
            <img src={placeholderIMG} alt="product image" />
            <div className="product-layout">
              <div className="product-info">
                <div className="column">
                  <h2>{product.productName}</h2>
                  <h3>{currentItemPrice} €</h3>
                  <div className="product-amount-control">
                    <button onClick={() => handleControl("minus")}>-</button>
                    {productAmount}
                    <button onClick={() => handleControl("plus")}>+</button>
                  </div>
                  {product.rarity && <p>Rarity: {product.rarity}</p>}
                  {product.setName && <p>Set: {product.setName}</p>}
                </div>
                {product.categories.some(category => category.name === "Single card") ?
                  <div className="column">
                    <h2>Version</h2>
                    <ul>
                      {product.price.map((item, index) => (
                        <li key={item.condition} className="product-price">
                          <input type="radio" name="item_price" onChange={() => handleSetCurrentItem(item.price, item.amount)} defaultChecked={index === 0} />
                          <div className="test">
                            <p>{item.price}€ <span>(InStock: {item.amount})</span></p>
                            <p>Condition: {item.condition}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  : null}
              </div>
              {product.description.length > 0 &&
                <div className="product-description">
                  {product.description.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default ProductPage