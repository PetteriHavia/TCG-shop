
import placeholderIMG from '../assets/images/products-header.png'
import { Link } from 'react-router-dom'

const ProductShowcase = ({ products, header }) => {
  const getPrice = (product) => {
    if (Array.isArray(product.price)) {
      return product.price.length > 0 ? product.price[0].price : null
    }
    return product.price
  }

  const formatPrice = (price) => {
    return price.toFixed(2)
  }

  const getDicountedPrice = (price, discount) => {
    const discountedPrice = price - (discount * price / 100)
    return formatPrice(discountedPrice)
  }

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
              <img src={placeholderIMG} alt="product image" />
              <div className="product-details">
                <Link to={`products/${item.productName}`}><p>{item.productName}</p></Link>
                {item.discount > 0 ?
                  <h4><span>{getPrice(item)} €</span>{getDicountedPrice(getPrice(item), item.discount)} €</h4>
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