import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourierForm = () => {
  const [categories, setCategories] = useState([]);

  const courier_person = JSON.parse(sessionStorage.getItem("active-courier")) || {}; // Default to empty object if null
  const courier_jwtToken = sessionStorage.getItem("courier-jwtToken");

  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/helper/courier/type/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory);
      }
    };

    getAllCategories();
  }, []);

  const [courier, setCourier] = useState({
    courierName: "",
    customerRefId: "",
    courierUserId: courier_person.id || "", // Default to empty string if undefined
    street: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    receiverName: "",
    courierType: "",
    weight: "",
  });

  const handleInput = (e) => {
    setCourier({ ...courier, [e.target.name]: e.target.value });
  };

  const saveCourier = (e) => {
    e.preventDefault();
    if (!courier.courierName || !courier.customerRefId) {
      toast.error("Invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost:8080/api/courier/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //  Authorization: "Bearer " + courier_jwtToken,
      },
      body: JSON.stringify(courier),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate("/home");
            }, 1000);
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div className="card form-card shadow-lg" style={{ width: "60rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Add Courier</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="courierName" className="form-label">
                    <b>Courier Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="courierName"
                    name="courierName"
                    onChange={handleInput}
                    value={courier.courierName}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="customerRefId" className="form-label">
                    <b>Customer Reference Id</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerRefId"
                    name="customerRefId"
                    onChange={handleInput}
                    value={courier.customerRefId}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Courier Category</b>
                  </label>

                  <select
                    name="courierType"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Courier Category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="receiverName" className="form-label">
                    <b>Courier Receiver Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="receiverName"
                    name="receiverName"
                    onChange={handleInput}
                    value={courier.receiverName}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="weight" className="form-label">
                    <b>Courier Weight (In kg)</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="weight"
                    name="weight"
                    onChange={handleInput}
                    value={courier.weight}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="street" className="form-label">
                    <b>Street</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleInput}
                    value={courier.street}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="landmark" className="form-label">
                    <b>Landmark</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="landmark"
                    name="landmark"
                    rows="3"
                    onChange={handleInput}
                    value={courier.landmark}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleInput}
                    value={courier.city}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleInput}
                    value={courier.pincode}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="state" className="form-label">
                    <b>State</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    onChange={handleInput}
                    value={courier.state}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="country" className="form-label">
                    <b>Country</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    onChange={handleInput}
                    value={courier.country}
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveCourier}
                  >
                    Add Customer Courier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourierForm;
