import abraIMG from "../assets/images/abra.jpg"

const PageNotFound = () => {
  return (
    <div className="error-container">
      <div className="error-text">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>Sorry the page you are looking for does not exist. </p>
      </div>
      <img src={abraIMG} alt="abra" />
    </div>
  )
}

export default PageNotFound