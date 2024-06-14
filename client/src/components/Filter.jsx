
import { MdClose } from "react-icons/md"
import useScreenSize from "../hooks/useScreenSize"

const Filter = ({ text, filterToggle, setFilterToggle }) => {
  const windowSize = useScreenSize()
  const rarity = [
    { id: 1, name: "Single Card", },
    { id: 2, name: "Booster", },
    { id: 3, name: "Tin Box", },
    { id: 4, name: "Elite Trainer Box", }
  ]

  const types = [
    { id: 1, name: "Common", },
    { id: 2, name: "Uncommon", },
    { id: 3, name: "Rare", },
    { id: 4, name: "Ultra Rare" }
  ]

  return (
    <div className={`filter ${filterToggle ? "is-active" : ""}`}>
      {windowSize.width <= 992 ?
        <div className="close-icon">
          <MdClose onClick={() => setFilterToggle(false)} />
        </div> : null}
      <div className="filter-part">
        <h3>Availability</h3>
        <div className="input-box">
          <input type="checkbox" name="availability" />
          <label>Hide Out Of Stock</label>
        </div>
      </div>
      <div className="filter-part" >
        <h3>Type</h3>
        {types.map((item) => (
          <div key={item.id} className="input-box">
            <input type="checkbox" name="type" />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
      <div className="filter-part" >
        <h3>Rarity</h3>
        {rarity.map((item) => (
          <div key={item.id} className="input-box">
            <input type="checkbox" name="rarity" />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter