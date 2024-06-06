import { Link, useLocation } from "react-router-dom"

const Breadcrumbs = () => {

  const location = useLocation()
  let currentLink = ""

  const crumbs = location.pathname.split("/")
    .filter(crumb => crumb !== "")
    .map(item => {
      const decodedItem = decodeURIComponent(item)
      currentLink += `/${decodedItem}`
      const formatedItem = decodedItem.replace(/-/g, ' ')
      return (
        <li className="crumb" key={item}>
          <span>
            <Link to={currentLink}>{formatedItem}</Link>
          </span>
        </li>
      )
    })

  return (
    <ul className="breadcrumbs">
      <li className="crumb" key="home">
        <Link to="/">Home</Link>
      </li>
      {crumbs}
    </ul>
  )
}

export default Breadcrumbs