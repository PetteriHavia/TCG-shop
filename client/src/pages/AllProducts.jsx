import { useLocation, useParams } from "react-router-dom"
import React, { useState } from "react"
import Breadcrumbs from "../components/Breadcrumbs"
import Filter from "../components/Filter"
import { useGetCategoryQuery } from "../redux/reducers/apiSlice"
import ProductCard from "../components/ProductCard"
import useScreenSize from "../hooks/useScreenSize"
import PageNotFound from "../components/PageNotFound"
import { useSelector } from "react-redux"

const AllProducts = () => {
  const filters = useSelector((state) => state.filters)
  const [filterToggle, setFilterToggle] = useState(false)
  const windowSize = useScreenSize()
  const { category } = useParams()
  const location = useLocation()

  const { data: filterData, isLoading: isLoadingFilter } = useGetCategoryQuery({ category: category || "all", filters })

  const headerText = location.pathname.split("/").filter(item => item !== "").slice(-1)

  const isInvalidCategory = !isLoadingFilter && !filterData && category;

  return (
    <section className="container-md">
      {isInvalidCategory ?
        <PageNotFound />
        :
        <>
          <Breadcrumbs />
          <div className="url-header">
            <h2>{filterData?.name}</h2>
          </div>
          {windowSize.width > 992 ? null : <button onClick={() => setFilterToggle(true)}>Filter</button>}
          <div className="search-layout">
            <Filter text={headerText} filterToggle={filterToggle} setFilterToggle={setFilterToggle} />
            {isLoadingFilter ?
              <div>Loading...</div>
              : filterData && filterData.length === 0 ?
                <div>No products available</div>
                :
                <div className="product-grid">
                  <React.Fragment key={filterData.id}>
                    {filterData.map((product) => (
                      <ProductCard item={product} key={product.id} categoryName={product.categories[0].name} />
                    ))}
                  </React.Fragment>
                </div>
            }
          </div>
        </>
      }
    </section>
  )
}
export default AllProducts