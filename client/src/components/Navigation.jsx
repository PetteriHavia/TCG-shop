import { MdSearch } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { IconContext } from "react-icons/lib";
import MenuItem from "./MenuItem";
import { useGetAllCategoriesQuery } from '../redux/reducers/apiSlice'

const Navigation = () => {
  const [toggle, setToggle] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery()

  const groupedCategories = categoriesData?.reduce((groups, category) => {
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
          submenu: groupedCategories?.Expansion?.map(category => ({
            label: category.name,
            link: `products/${category.id}`
          }))
        },
        {
          heading: "Pokemon Products",
          submenu: groupedCategories?.['Pokemon Products']?.map(category => ({
            label: category.name,
            link: `products/${category.id}`
          }))
        },
        {
          heading: "Pokemon Products",
          submenu: groupedCategories?.['Pokemon Products']?.map(category => ({
            label: category.name,
            link: `products/${category.id}`
          }))
        },
      ],
    },
    {
      label: "Single Cards",
      children: [
        {
          heading: "Expansion",
          submenu: groupedCategories?.Expansion?.map(category => ({
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
      <IconContext.Provider value={{ size: "2rem" }} >
        <div className="menu">
          <MdMenu className="menu-icon" onClick={() => setIsOpen(true)} />
          <img src="#" alt="Logo" />
          {!isLoading ?
            <ul className={isOpen ? "" : "hidden"}>
              {isOpen ? <li className="close-icon"><MdClose onClick={() => setIsOpen(false)} /></li> : null}
              {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </ul>
            : null}
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
    </nav >
  )
}

export default Navigation




/*

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
      /*
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
  ]*/