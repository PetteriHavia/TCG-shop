import { FiGrid, FiList } from "react-icons/fi";

const GridControl = ({ grid, setSelectDropdownItem, setSearchParams }) => {

  const gridOptions = [
    { type: 'product-grid', icon: <FiGrid /> },
    { type: 'product-list', icon: <FiList /> }
  ]

  const selectOptions = [
    { type: "A - Z" },
    { type: "Price: High to Low" },
    { type: "Price: Low to High" },
  ]

  const handleFilter = (e) => {
    setSelectDropdownItem(e.target.value)
  }

  return (
    <div className="grid-control-container">
      <div className="grid-template-control">
        {gridOptions.map((item) => (
          <button
            key={item.type}
            className={`grid-type ${grid === item.type ? "active" : ""}`}
            onClick={() => setSearchParams(prev => { prev.set("grid", item.type); return prev })}
          >
            <span>{item.icon}</span>
          </button>
        ))}
        <select onChange={handleFilter}>
          {selectOptions.map((option) => (
            <option key={option.type} value={option.type}>{option.type}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default GridControl