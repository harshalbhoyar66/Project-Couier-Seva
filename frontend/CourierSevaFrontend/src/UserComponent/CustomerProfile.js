import { useLocation } from "react-router-dom";

const CustomerProfile = () => {
  const location = useLocation();// use to get the current location of current object
  var fetchedCustomer = location.state; // fetching current object State

  return (
    <div className="mt-3">
     
      <div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
        <div
          className="card rounded-card h-100 shadow-lg"
          style={{
            width: "900px",
          }}
        >
          <div className="card-body">
            <h2 className="card-title text-color-second text-center">
              Personal Detail
            </h2>

            <div className="row mt-4">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>First Name:</b> {fetchedCustomer.firstName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Last Name:</b> {fetchedCustomer.lastName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Email Id:</b> {fetchedCustomer.emailId}
                </p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Contact:</b> {fetchedCustomer.phoneNo}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Address:</b>{" "}
                  {fetchedCustomer.address.street +
                    " " +
                    fetchedCustomer.address.city +
                    " " +
                    fetchedCustomer.address.pincode +
                    " " +
                    fetchedCustomer.address.state +
                    " " +
                    fetchedCustomer.address.country}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Customer Ref Id:</b>{" "}
                  <b className="text-color-second">
                    {fetchedCustomer.customerRefId}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
