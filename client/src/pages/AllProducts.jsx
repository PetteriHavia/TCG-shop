import { useLocation, useParams } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs"
import Filter from "../components/Filter"
import { useGetCategoryQuery } from "../redux/reducers/apiSlice"
import { formatPath } from "../utils/formatPath"

const AllProducts = () => {

  const { category } = useParams()
  const location = useLocation()

  const headerText = location.pathname.split("/").filter(item => item !== "").slice(-1)

  const { data: categoryData, isLoading } = useGetCategoryQuery(category)

  if (isLoading) {
    <div>Loading...</div>
  }

  console.log(categoryData)

  return (
    <div className="container-md">
      <Breadcrumbs />
      {!isLoading ?
        <>
          <div className="url-header">
            <h2>{decodeURIComponent(headerText)}</h2>
          </div>
          <div className="search-layout">
            <Filter text={headerText} />
            <div className="search-results">test</div>
          </div>
        </>
        : null
      }
    </div>
  )
}
export default AllProducts