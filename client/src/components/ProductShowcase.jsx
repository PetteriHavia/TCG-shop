
import placeholderIMG from '../assets/images/products-header.png'
import { Link } from 'react-router-dom'
import { getDiscountedPrice, getPrice } from '../utils/calculateDicount'
import { formatPath } from '../utils/formatPath'

const ProductShowcase = ({ products, header }) => {

  return (
    <section>
      <div className="container-md">
        <div className="header-row">
          <h2>{header}</h2>
          <button>See All</button>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <div key={item._id} className="card">
              {item.discount > 0 ? <p className="discount-sticker">-{item.discount}%</p> : null}
              <Link to={`products/${formatPath(item.productName)}`} className='product-details'>
                <img src={placeholderIMG} alt="product image" />
                <p>{item.productName}</p>
                {item.setName ? <p>{item.setName}</p> : null}
              </Link>
              <div className="product-details">
                {item.discount > 0 ?
                  <h4><span className="discount-span">{getPrice(item)} €</span>{getDiscountedPrice(getPrice(item), item.discount)} €</h4>
                  :
                  <h4>{getPrice(item)} €</h4>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase