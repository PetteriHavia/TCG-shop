import { useLocation, useParams } from "react-router-dom"
import React, { useState } from "react"
import Breadcrumbs from "../components/Breadcrumbs"
import Filter from "../components/Filter"
import { useGetAllCategoriesQuery, useGetCategoryQuery } from "../redux/reducers/apiSlice"
import ProductCard from "../components/ProductCard"
import useScreenSize from "../hooks/useScreenSize"

const AllProducts = () => {
  const [filterToggle, setFilterToggle] = useState(false)
  const windowSize = useScreenSize()
  const { category } = useParams()
  const location = useLocation()

  const { data: allCategoriesData, isLoading: isLoadingAll } = useGetAllCategoriesQuery({ skip: (category) })
  const { data: singleCategoryData, isLoading: isLoadingSingle } = useGetCategoryQuery(category, { skip: !category })

  const headerText = location.pathname.split("/").filter(item => item !== "").slice(-1)

  return (
    <section className="container-md">
      <Breadcrumbs />
      {!isLoadingAll ?
        <>
          <div className="url-header">
            <h2>{decodeURIComponent(headerText)}</h2>
          </div>
          {windowSize.width > 992 ? null : <button onClick={() => setFilterToggle(true)}>Filter</button>}
          <div className="search-layout">
            <Filter text={headerText} filterToggle={filterToggle} setFilterToggle={setFilterToggle} />
            <div className="product-grid">
              {allCategoriesData && allCategoriesData.map((item) => (
                <React.Fragment key={item.id}>
                  {item.products.map((product) => (
                    <ProductCard item={product} key={product.id} categoryName={item.name} />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
        : null
      }
    </section>
  )
}
export default AllProducts