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
        <div className="crumb" key={item}>
          <Link to={currentLink}>{formatedItem}</Link>
        </div>
      )
    })

  return (
    <div className="breadcrumbs">
      <div className="crumb" key="home">
        <Link to="/">Home</Link>
      </div>
      {crumbs}
    </div>
  )
}

export default Breadcrumbs