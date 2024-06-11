import ProductCard from './ProductCard'

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
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase