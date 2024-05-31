import { getDiscountedPrice } from "../utils/calculateDicount";

const ProductVersionList = ({ product, handleSetCurrentItem, discount }) => {

  const getConditionBackgrounColor = (condition) => {
    switch (condition) {
      case "NM/M":
        return "#57BB8A";
      case "EX":
        return "#ABC978";
      case "GD":
        return "#FFD666"
    }
  }

  return (
    <div className="column">
      <h2>Version</h2>
      <ul>
        {product.map((item, index) => (
          <li key={item.condition} className="product-item">
            <input type="radio" name="item_price" onChange={() => handleSetCurrentItem(item.price, item.amount)} defaultChecked={index === 0} />
            <div className="condition">
              {discount > 0 ?
                <p><span className="discount-span">{item.price}€</span>{getDiscountedPrice(item.price, discount)}€ <span>(InStock: {item.amount})</span></p>
                :
                <p>{item.price}€ <span>(InStock: {item.amount})</span></p>
              }
              <p>Condition: <span style={{ backgroundColor: getConditionBackgrounColor(item.condition) }}>{item.condition}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductVersionList