import { NavLink, Link } from "react-router-dom"
import { MdKeyboardArrowDown } from "react-icons/md";

const MenuItem = ({ item }) => {
  console.log(item)
  return (
    <li>
      <div className="nav-item-content">
        <NavLink to="#" className="main-link">
          {item.label} {item.children && <MdKeyboardArrowDown size="25px" />}
        </NavLink>
      </div>
      {item.children &&
        <div className="dropdown-container">
          <div className="dropdown">
            {item.children?.map((children, index) => (
              <div key={index} className="dropdown-item">
                <p>{children.heading}</p>
                {children.submenu?.map((sub, index) => (
                  <Link key={index} className="sub-link">{sub.label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      }
    </li>
  );
};

export default MenuItem