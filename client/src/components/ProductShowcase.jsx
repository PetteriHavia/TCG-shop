import { useDispatch } from 'react-redux'
import ProductCard from './ProductCard'
import { setStatus } from '../redux/reducers/filterReducer'
import { Link } from 'react-router-dom'

const ProductShowcase = ({ products, header, status }) => {
  const dispatch = useDispatch()

  const handleUpdateFilterStatus = () => {
    dispatch(setStatus(status))
  }

  return (
    <section>
      <div className="container-md">
        <div className="header-row">
          <h2>{header}</h2>
          <Link to={`/products`}>
            <button onClick={handleUpdateFilterStatus}>See All</button>
          </Link>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase