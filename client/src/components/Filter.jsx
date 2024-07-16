
import { MdClose } from "react-icons/md"
import useScreenSize from "../hooks/useScreenSize"
import { useDispatch, useSelector } from "react-redux"
import { setAvailability, setRarity, setType } from "../redux/reducers/filterReducer"

const Filter = ({ filterToggle, setFilterToggle, setName }) => {
  const windowSize = useScreenSize()
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const types = [
    { id: 1, name: "Single card", },
    { id: 2, name: "Booster", },
    { id: 3, name: "Tin Box", },
    { id: 4, name: "Elite Trainer Box", }
  ]

  const rarity = [
    { id: 1, name: "Common", },
    { id: 2, name: "Uncommon", },
    { id: 3, name: "Rare", },
    { id: 4, name: "Holo Rare" },
    { id: 5, name: "Ultra Rare" },
    { id: 6, name: "Illustration Rare" }
  ]

  const handleToggelCheckBox = (e) => {
    const { name, value, checked } = e.target
    switch (name) {
      case "availability":
        dispatch(setAvailability(checked))
        break;
      case "type":
        dispatch(setType(value))
        break;
      case "rarity":
        dispatch(setRarity(value))
        break;
      default:
        break
    }
  }

  return (
    <div className={`filter ${filterToggle ? "is-active" : ""}`}>
      {windowSize.width <= 992 ?
        <div className="close-icon">
          <MdClose onClick={() => setFilterToggle(false)} />
        </div> : null}
      <div className="filter-part">
        <h3>Availability</h3>
        <div className="input-box">
          <input type="checkbox" name="availability" checked={filters.availability} onChange={handleToggelCheckBox} />
          <label>Hide Out Of Stock</label>
        </div>
      </div>
      {!setName ?
        <div className="filter-part" >
          <h3>Type</h3>
          {types.map((item) => (
            <div key={item.id} className="input-box">
              <input type="checkbox" name="type" value={item.name} checked={filters.type.includes(item.name)} onChange={handleToggelCheckBox} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
        : null}
      <div className="filter-part" >
        <h3>Rarity</h3>
        {rarity.map((item) => (
          <div key={item.id} className="input-box" name="rarity">
            <input type="checkbox" name="rarity" value={item.name} checked={filters.rarity.includes(item.name)} onChange={handleToggelCheckBox} />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter