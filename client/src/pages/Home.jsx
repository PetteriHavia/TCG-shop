import Hero from "../components/Hero"
import ProductShowcase from "../components/ProductShowcase"
import ServiceDetails from "../components/ServiceDetails"
import { useGetProductStatusQuery } from "../redux/reducers/apiSlice"
import Footer from "../components/Footer"


const Home = () => {

  const { data: saleProductData, isLoading: saleProductDataLoading } = useGetProductStatusQuery("sale")
  const { data: newProductData, isLoading: newProductDataLoading } = useGetProductStatusQuery("new")

  return (
    <>
      <Hero />
      {saleProductData && <ProductShowcase products={saleProductData} header={"Special Offers"} status={"Sale"} />}
      {newProductData && <ProductShowcase products={newProductData} header={"New Products"} status={"New"} />}
      <ServiceDetails />
      <Footer />
    </>
  )
}

export default Home