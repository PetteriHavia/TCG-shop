import Hero from "../components/Hero"
import ProductShowcase from "../components/ProductShowcase"
import { useGetProductStatusQuery } from "../redux/reducers/apiSlice"


const Home = () => {

  const { data: saleProductData, isLoading: saleProductDataLoading } = useGetProductStatusQuery("sale")
  const { data: newProductData, isLoading: newProductDataLoading } = useGetProductStatusQuery("new")

  return (
    <>
      <Hero />
      {saleProductData && <ProductShowcase products={saleProductData} header={"Special Offers"} />}
      {newProductData && <ProductShowcase products={newProductData} header={"New Products"} />}
    </>
  )
}

export default Home