import placeholderIMG from "../assets/images/products-header.png";
import { getDiscountedPrice, getPrice } from "../utils/calculateDicount";
import { Link } from "react-router-dom"
import { formatPath } from "../utils/formatPath";

const ProductCard = ({ item }) => {

  return (
    <>
      {item &&
        <div key={item._id} className="card">
          {item.discount > 0 ? <p className="discount-sticker">-{item.discount}%</p> : null}
          <Link to={`/products/${item.setName}/${item.slug}`} className='product-details'>
            <img src={placeholderIMG} alt="product image" />
            <p>{item.productName}</p>
          </Link>
          <div className="product-details">
            {item.discount > 0 ?
              <h4><span className="discount-span">{getPrice(item)} €</span>{getDiscountedPrice(getPrice(item), item.discount)} €</h4>
              :
              <h4>{getPrice(item)} €</h4>
            }
          </div>
        </div>
      }
    </>
  )
}

export default ProductCard