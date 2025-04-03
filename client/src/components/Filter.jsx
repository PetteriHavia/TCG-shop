import { MdClose } from "react-icons/md"
import useScreenSize from "../hooks/useScreenSize"

const Filter = ({ filterToggle, setFilterToggle, setName, searchParams, handleFilterChange }) => {
  const windowSize = useScreenSize()

  const handleToggle = (key, value) => {
    console.log(value)
    const currentValues = searchParams.get(key)?.split(",") || []
    if (currentValues.includes(value)) {
      handleFilterChange(key, currentValues.filter((item) => item !== value))
    } else {
      handleFilterChange(key, [...currentValues, value])
    }
  }

  const types = [
    { id: 1, name: "Single card", },
    { id: 2, name: "Booster", },
    { id: 3, name: "Tin Box", },
    { id: 4, name: "Elite Trainer Box", }
  ]

  const status = [
    { id: 1, name: "New" },
    { id: 2, name: "Sale" }
  ]

  const rarity = [
    { id: 1, name: "Common", },
    { id: 2, name: "Uncommon", },
    { id: 3, name: "Rare", },
    { id: 4, name: "Holo Rare" },
    { id: 5, name: "Ultra Rare" },
    { id: 6, name: "Illustration Rare" }
  ]

  /*const handleToggelCheckBox = (e) => {
    const { name, value, checked } = e.target
    switch (name) {
      case "availability":
          dispatch(setAvailability(value))
        break;
      case "type":
        dispatch(setType(value))
        break;
      case "rarity":
        dispatch(setRarity(value))
        break;
      case "status":
        dispatch(setStatus(value))
        break;
      default:
        break
    }
  }*/


  return (
    <div className={`filter ${filterToggle ? "is-active" : ""}`}>
      {windowSize.width <= 992 ?
        <div className="close-icon">
          <MdClose onClick={() => setFilterToggle(false)} />
        </div> : null}
      <div className="filter-part">
        <h3>Availability</h3>
        <div className="input-box">
          <input
            type="checkbox"
            name="availability"
            checked={searchParams.get("availability") === "true" || false}
            onChange={(e) => handleFilterChange("availability", e.target.checked ? "true" : "")} />
          <label>Hide Out Of Stock</label>
        </div>
      </div>
      <div className="filter-part">
        <h3>Product Selection</h3>
        {status.map((item) => (
          <div key={item.id} className="input-box">
            <input
              type="checkbox"
              name="status"
              value={item.name}
              checked={searchParams.get("status")?.split(",").includes(item.name) || false}
              onChange={() => handleToggle("status", item.name)} />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
      {!setName ?
        <div className="filter-part" >
          <h3>Type</h3>
          {types.map((item) => (
            <div key={item.id} className="input-box">
              <input
                type="checkbox"
                name="type"
                value={item.name}
                checked={searchParams.get("type")?.split(",").includes(item.name) || false}
                onChange={() => handleToggle("type", item.name)} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
        : null}
      <div className="filter-part" >
        <h3>Rarity</h3>
        {rarity.map((item) => (
          <div key={item.id} className="input-box" name="rarity">
            <input
              type="checkbox"
              name="rarity"
              value={item.name}
              checked={searchParams.get("rarity")?.split(",").includes(item.name) || false}
              onChange={() => handleToggle("rarity", item.name)} />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter