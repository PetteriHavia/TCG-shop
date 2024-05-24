import productsPreview from "../assets/images/products-header.png"
import productLogo from "../assets/images/sv5-logo.png"

const Hero = () => {
  return (
    <header>
      <div className="container-md">
        <div className="column">
          <img src={productLogo} alt="product logo" />
          <h1>SCARLET & VIOLET TEMPORAL FORCES AVAILABLE NOW</h1>
          <button>Browse More</button>
        </div>
        <div className="column">
          <img src={productsPreview} alt="product showcase" />
        </div>
      </div>
    </header>
  )
}

export default Hero