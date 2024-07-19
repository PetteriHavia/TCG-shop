import placeholderIMG from "../assets/images/products-header.png";
import { getDiscountedPrice, getPrice, formatPrice } from "../utils/calculateDicount";
import { Link } from "react-router-dom"

const ProductCard = ({ item }) => {

  return (
    <>
      {item &&
        <Link to={`/products/${item.setName}/${item.slug}`} className='product-details'>
          <div key={item._id} className="card">
            {item.discount > 0 ? <p className="discount-sticker">-{item.discount}%</p> : null}
            <img src={placeholderIMG} alt="product image" />
            <p>{item.productName}</p>
            {item.discount > 0 ?
              <h4><span className="discount-span">{formatPrice(getPrice(item))} €</span>{formatPrice(getDiscountedPrice(getPrice(item), item.discount))} €</h4>
              :
              <h4>{formatPrice(getPrice(item))} €</h4>
            }
          </div>
        </Link>
      }
    </>
  )
}

export default ProductCard