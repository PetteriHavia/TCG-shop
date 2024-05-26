import { LiaBoxSolid } from "react-icons/lia";
import { LiaClock } from "react-icons/lia";
import { LiaGlobeEuropeSolid } from "react-icons/lia";

const ServiceDetails = () => {
  const gridItems = [
    {
      id: 1,
      icon: <LiaBoxSolid />,
      header: "Free Delivery",
      text: "On all orders over 50€"
    },
    {
      id: 2,
      icon: <LiaClock />,
      header: "Same Day Dispatch",
      text: "Order before 4pm"
    },
    {
      id: 3,
      icon: <LiaGlobeEuropeSolid />,
      header: "Internal Shiping",
      text: "Worldwide shipping"
    }
  ]

  return (
    <section>
      <div className="container-md">
        <div className="services">
          {gridItems.map((item) => (
            <div key={item.id} className="services-card">
              {item.icon}
              <div className="card-text">
                <h3>{item.header}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceDetails