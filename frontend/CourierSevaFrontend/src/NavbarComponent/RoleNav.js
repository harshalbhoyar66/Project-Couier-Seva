import AdminHeader from "./AdminHeader";
import HeaderCourier from "./HeaderCourier";
import HeaderCustomer from "./HeaderCustomer";
import HeaderDelivery from "./HeaderDelivery";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const courier = JSON.parse(sessionStorage.getItem("active-courier"));
  const delivery = JSON.parse(sessionStorage.getItem("active-delivery"));

  if (customer != null) {
    return <HeaderCustomer />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (courier != null) {
    return <HeaderCourier />;
  } else if (delivery != null) {
    return <HeaderDelivery />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
