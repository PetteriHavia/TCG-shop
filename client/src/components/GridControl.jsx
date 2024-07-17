import React from 'react'
import { FiGrid, FiList } from "react-icons/fi";

const GridControl = ({ gridType, setGridType }) => {

  const gridOptions = [
    { type: 'grid', icon: <FiGrid /> },
    { type: 'list', icon: <FiList /> }
  ]

  const selectOptions = [
    { type: "A - Z" },
    { type: "Price: High to Low" },
    { type: "Price: Low to High" },
  ]

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
        <select>
          {selectOptions.map((option) => (
            <option key={option.type}>{option.type}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default GridControl