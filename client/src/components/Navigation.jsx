import { MdSearch } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { IconContext } from "react-icons/lib";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect } from "react";
import api from "../services/api";

const Navigation = () => {
  const [toggle, setToggle] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.getCategories()
      .then((data) => (
        setCategories(data)))
  }, [])

  const groupedCategories = categories.reduce((groups, category) => {
    const groupKey = category.group
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(category)
    return groups
  }, {})

  /* Testing multiple ways of implementing the menu
  
    const createMenu = Object.keys(groupedCategories).map(groupKey => ({
      group: groupKey,
      test: groupedCategories[groupKey].map(category => ({
        name: category.name,
        link: `/products/${category.id}`
      }))
    }))
  */


  return (
    <nav>
      <IconContext.Provider value={{ size: "2rem" }} >
        <ul>
          <li>
            <img src="#" alt="Logo" />
          </li>
          <li>Pokemon <MdKeyboardArrowDown /></li>
          <li>Single Cards<MdKeyboardArrowDown /></li>
          <li>Supplies</li>
          <li>Contact</li>
        </ul>
        <div className="nav-actions">
          <div className="nav-search">
            <div className={`search-bar ${toggle ? "search-active" : ""}`}>
              {toggle ? <input type="text" placeholder="Search product..." /> : null}
              <MdSearch onClick={() => setToggle(!toggle)} />
            </div>
          </div>
          <MdOutlineShoppingCart />
        </div>
      </IconContext.Provider>
    </nav >
  )
}

export default Navigation