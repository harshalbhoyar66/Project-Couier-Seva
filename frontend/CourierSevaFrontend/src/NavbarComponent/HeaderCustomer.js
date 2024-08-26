import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderCustomer = () => {
  let navigate = useNavigate();

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));

  const userLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const viewCustomerProfile = () => {
    navigate("/customer/profile/detail", { state: customer });
  };

  return (
    <>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
        <li className="nav-item">
          <Link
            to="/courier/customer/add"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">Add Customer Courier</b>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/customer/couriers/all"
            className="nav-link active"
            aria-current="page"
          >
            <b className="text-color">My Couriers</b>
          </Link>
        </li>

        <li className="nav-item">
          <div className="nav-link active" aria-current="page">
            <b className="text-color" onClick={viewCustomerProfile}>
              My Profile
            </b>
            <ToastContainer />
          </div>
        </li>

        <li className="nav-item">
          <Link
            to="#"
            className="nav-link active"
            aria-current="page"
            onClick={userLogout}
          >
            <b className="text-color">Logout</b>
          </Link>
          <ToastContainer />
        </li>
      </ul>
    </>
  );
};

export default HeaderCustomer;
