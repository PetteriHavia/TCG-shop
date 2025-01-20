import { useLocation, useParams } from "react-router-dom";
import React, { useState, useMemo } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Filter from "../components/Filter";
import { useGetCategoryQuery } from "../redux/reducers/apiSlice";
import ProductCard from "../components/ProductCard";
import useScreenSize from "../hooks/useScreenSize";
import PageNotFound from "../components/PageNotFound";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import GridControl from "../components/GridControl";


const AllProducts = () => {
  const filters = useSelector((state) => state.filters);
  const [filterToggle, setFilterToggle] = useState(false);
  const [gridType, setGridType] = useState("product-grid");
  const [selectDropdownItem, setSelectDropdownItem] = useState("A - Z");
  const windowSize = useScreenSize();
  const { category, setName } = useParams();
  const location = useLocation();

  const { data: filterData, isLoading: isLoadingFilter } = useGetCategoryQuery({
    category: category || "all",
    filters,
    setName,
  });

  const headerText =
    category || setName
      ? decodeURIComponent(
        location.pathname
          .split("/")
          .filter((item) => item !== "")
          .slice(-1)
      )
      : "all";

  const isInvalidCategory = !isLoadingFilter && !filterData && category;


  const checkPrice = (price) => {
    if (Array.isArray(price)) {
      return price.map(p => p.price);
    } else {
      return [price]
    }
  }


  const sortData = useMemo(() => {
    if (!filterData) {
      return []
    }

    return [...filterData].sort((a, b) => {
      const priceA = checkPrice(a.price)
      const priceB = checkPrice(b.price)
      switch (selectDropdownItem) {
        case "A - Z":
          return a.productName.localeCompare(b.productName)
        case "Price: High to Low":
          return Math.max(...priceB) - Math.max(...priceA)
        case "Price: Low to High":
          return Math.max(...priceA) - Math.max(...priceB)
        default:
          break;
      }
    })
  }, [filterData, selectDropdownItem])

  return (
    <>
      <section className="container-md">
        {isInvalidCategory ? (
          <PageNotFound />
        ) : (
          <>
            <Breadcrumbs />
            <div className="url-header">
              <h2>{headerText}</h2>
            </div>
            <GridControl
              gridType={gridType}
              setGridType={setGridType}
              selectDropdownItem={selectDropdownItem}
              setSelectDropdownItem={setSelectDropdownItem}
              filterData={filterData}
            />
            {windowSize.width > 992 ? null : (
              <button onClick={() => setFilterToggle(true)}>Filter</button>
            )}
            <div className="search-layout">
              <Filter
                filterToggle={filterToggle}
                setFilterToggle={setFilterToggle}
                setName={setName}
              />
              {isLoadingFilter ? (
                <div>Loading...</div>
              ) : filterData && filterData.length === 0 ? (
                <div>No products available</div>
              ) : (
                <div className={gridType}>
                  <React.Fragment key={filterData.id}>
                    {sortData.map((product) => (
                      <ProductCard
                        item={product}
                        key={product.id}
                        categoryName={product.categories[0].name}
                      />
                    ))}
                  </React.Fragment>
                </div>
              )}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};
export default AllProducts;
