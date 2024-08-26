import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderCourier = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-courier");
    sessionStorage.removeItem("courier-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000); 
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/courier/customer/add"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Customer Courier</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/courier/customer/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Customer Couriers</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/courier/delivery/register"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Delivery</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/courier/delivery-person/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">My Delivery Persons</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/home"
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderCourier;
