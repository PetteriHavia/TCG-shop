import { MdSearch } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { IconContext } from "react-icons/lib";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect } from "react";
import api from "../services/api";
import MenuItem from "./MenuItem";

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

  const menuItems = [
    {
      label: "Pokemon",
      children: [
        {
          heading: "Expansion",
          submenu: groupedCategories.Expansion?.map(category => ({
            label: category.name,
            link: `products/${category.id}`
          }))
        },
        {
          heading: "Pokemon Products",
          submenu: groupedCategories['Pokemon Products']?.map(category => ({
            label: category.name,
            link: `products/${category.id}`
          }))
        }
      ],
    },
    {
      label: "Single Cards",
      children: [
        {
          heading: "Expansion",
          submenu: groupedCategories.Expansion?.map(category => ({
            label: category.name,
            link: `products/${category.id}`
          }))
        }
      ],
    },
    {
      label: "Supplies",
      link: `products/supplies`
    },
  ]

  return (
    <nav>
      {groupedCategories ?
        <IconContext.Provider value={{ size: "2rem" }} >
          <div className="menu">
            <img src="#" alt="Logo" />
            <ul>
              {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </ul>
          </div>
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
        : null}
    </nav >
  )
}

export default Navigation