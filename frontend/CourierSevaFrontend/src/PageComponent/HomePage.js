import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import courier1 from "../images/courier1.png";
import courier2 from "../images/courier2.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 text-color">
            <h1>Welcome to CourierSeva</h1>
            <p>
              Welcome to CourierSeva, where precision meets
              passion in the world of courier management. Whether you're a
              customer expecting a package, an administrator overseeing
              operations, or a delivery person on the move - our Courier
              Management System is designed to elevate your experience.
            </p>
            <p>
              At CourierSeva, we understand the importance of
              reliability, security, and efficiency in every step of the
              delivery process. Our commitment to excellence is not just a
              promise but a philosophy that guides us. With state-of-the-art
              technology and a dedicated team, we aim to redefine the way you
              perceive courier services.
            </p>
            <Link to="/user/login"  className="btn bg-color custom-bg-text">
              Get Started
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src={courier2}
              alt="Logo"
              width="400"
              height="auto"
              className="home-image"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <img
              src={courier1}
              alt="Logo"
              width="400"
              height="auto"
              className="home-image"
            />
          </div>
          <div className="col-md-8 text-color">
            <h1 className="ms-5">Simplify Courier Operations with Ease.</h1>
            <p className="ms-5">
              Welcome to streamlined courier management at its finest. Our
              intuitive system simplifies every aspect of the logistics journey,
              ensuring efficient operations from package creation to final
              delivery.
            </p>
            <p className="ms-5">
              With a user-friendly interface and robust features, Courier
              Management offers a seamless experience. Whether you're a customer
              tracking a parcel or an administrator optimizing routes, our
              platform provides the tools you need for effortless logistics.
              Join us as we redefine courier management – simple, smart, and
              always at your fingertips.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text ms-5">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
