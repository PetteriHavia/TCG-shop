import { MdOutlineArrowCircleRight } from "react-icons/md";

const Footer = () => {
  return (
    <footer>
      <div className="container-md footer">
        <div className="footer-column">
          <img src="#" alt="Logo" />
          <p>Sign up for tcgstore.com newsletter</p>
          <div className="email-box">
            <input type="email" placeholder="example@email.com" />
            <MdOutlineArrowCircleRight />
          </div>
        </div>
        <div className="footer-column">
          <h3>Social Media</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Additional</h3>
          <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Cancellation Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer