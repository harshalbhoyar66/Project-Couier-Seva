import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));//converting into a javascript object
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    window.location.reload(true);// windows.location is obj which load current page by method reload
    setTimeout(() => {
      navigate("/home");
    }, 2000); 
  };
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/user/admin/register"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Admin</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/user/courier/register"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Courier</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/admin/couriers/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">All Couriers</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/admin/delivery-persons/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">All Delivery Persons</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/admin/customers/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">All Customers</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/admin/customer/courier/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">All Customer Couriers</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/home"
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
