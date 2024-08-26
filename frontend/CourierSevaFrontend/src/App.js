import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import AboutUs from "./PageComponent/AboutUs";
import ContactUs from "./PageComponent/ContactUs";
import HomePage from "./PageComponent/HomePage";
import AddCourierForm from "./CourierComponent/AddCourierForm";
import ViewCourierDeliveryPersons from "./UserComponent/ViewCourierDeliveryPersons";
import ViewCouriersByCompany from "./CourierComponent/ViewCouriersByCompany";
import CustomerProfile from "./UserComponent/CustomerProfile";
import ViewCouriersByCustomer from "./CourierComponent/ViewCouriersByCustomer";
import ViewAllCouriers from "./UserComponent/ViewAllCouriers";
import ViewAllCustomers from "./UserComponent/ViewAllCustomers";
import ViewAllDeliveryPersons from "./UserComponent/ViewAllDeliveryPersons";
import ViewAllCustomerCouriers from "./CourierComponent/ViewAllCustomerCouriers";
import ViewCouriersByDelivery from "./CourierComponent/ViewCouriersByDelivery";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/customer/register" element={<UserRegister />} />
        <Route path="/user/courier/register" element={<UserRegister />} />
        <Route path="/courier/delivery/register" element={<UserRegister />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/courier/customer/add" element={<AddCourierForm />} />
        <Route
          path="/courier/delivery-person/all"
          element={<ViewCourierDeliveryPersons />}
        />
        <Route
          path="/courier/customer/all"
          element={<ViewCouriersByCompany />}
        />
        <Route path="/customer/profile/detail" element={<CustomerProfile />} />
        <Route
          path="/customer/couriers/all"
          element={<ViewCouriersByCustomer />}
        />
        <Route path="/admin/couriers/all" element={<ViewAllCouriers />} />
        <Route path="/admin/customers/all" element={<ViewAllCustomers />} />
        <Route
          path="/admin/delivery-persons/all"
          element={<ViewAllDeliveryPersons />}
        />
        <Route
          path="/admin/customer/courier/all"
          element={<ViewAllCustomerCouriers />}
        />
        <Route
          path="/delivery-person/couriers/all"
          element={<ViewCouriersByDelivery />}
        />
      </Routes>
    </div>
  );
}

export default App;
