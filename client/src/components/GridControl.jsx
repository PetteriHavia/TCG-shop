import { FiGrid, FiList } from "react-icons/fi";

const GridControl = ({ gridType, setGridType, setSelectDropdownItem }) => {

  const gridOptions = [
    { type: 'grid', icon: <FiGrid /> },
    { type: 'list', icon: <FiList /> }
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
            className={`grid-type ${gridType === item.type ? "active" : ""}`}
            onClick={() => setGridType(item.type)}
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