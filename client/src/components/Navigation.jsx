import { MdSearch } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { IconContext } from "react-icons/lib";

const Navigation = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav>
      <ul>
        <li>
          <img src="#" alt="Logo" />
        </li>
        <li>Pokemon</li>
        <li>Single Cards</li>
        <li>Supplies</li>
        <li>Contact</li>
      </ul>
      <div className="nav-actions">
        <div className="nav-search">
          <div className={`search-bar ${toggle ? "search-active" : ""}`}>
            {toggle ? <input type="text" placeholder="Search product..." /> : null}
            <IconContext.Provider value={{ className: "nav-icon" }}>
              <MdSearch onClick={() => setToggle(!toggle)} />
            </IconContext.Provider>
          </div>
        </div>
        <IconContext.Provider value={{ className: "nav-icon" }}>
          <MdOutlineShoppingCart />
        </IconContext.Provider>
      </div>
    </nav >
  )
}

export default Navigation