import { MdSearch } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { IconContext } from "react-icons/lib";
import MenuItem from "./MenuItem";
import { useGetAllCategoriesQuery } from '../redux/reducers/apiSlice'
import { useRef, useEffect } from "react";
import CartPreview from "./CartPreview";
import useScreenSize from "../hooks/useScreenSize";

const Navigation = () => {
  const [toggle, setToggle] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const windowSize = useScreenSize()
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
        setActiveIndex(null)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

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
            link: `products/${category.name}`
          }))
        },
        {
          heading: "Pokemon Products",
          submenu: groupedCategories?.['Pokemon Products']?.map(category => ({
            label: category.name,
            link: `products/${category.name}`
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
            link: `products/Single-card/${category.name}`
          }))
        }
      ],
    },
    {
      label: "Supplies",
      link: `products/supplies`
    },
  ]

  const handleMenuIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <nav className="top-navigation">
      <div className="container-md">
        <IconContext.Provider value={{ size: "2rem" }} >
          <div className="menu" ref={menuRef}>
            <img src="#" alt="Logo" />
            <MdMenu className="menu-icon" onClick={() => setIsOpen(true)} />
            {!isLoading ?
              <ul className={isOpen ? "is-active" : ""}>
                {windowSize.width <= 992 ? <li className="close-icon"><MdClose onClick={() => setIsOpen(false)} /></li> : null}
                {menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} index={index} activeIndex={activeIndex} onItemClick={() => handleMenuIndex(index)} />
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
            <CartPreview />
          </div>
        </IconContext.Provider>
      </div>
    </nav >
  )
}

export default Navigation