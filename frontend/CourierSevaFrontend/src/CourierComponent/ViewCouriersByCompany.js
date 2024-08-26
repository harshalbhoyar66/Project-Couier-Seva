import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewCouriersByCompany = () => {
  const courier_person = JSON.parse(sessionStorage.getItem("active-courier"));
  const courier_jwtToken = sessionStorage.getItem("courier-jwtToken");
  const [users, setAllUsers] = useState([]);

  const [assignCourierTrackingNumber, setAssignCourierTrackingNumber] =
    useState("");
  const [assignCourierId, setAssignCourierId] = useState("");
  const [assignDeliveryId, setAssignDeliveryId] = useState("");

  const [couriers, setCouriers] = useState([
    {
      sender: {
        customerRefId: "",
        firstName: "",
        lastName: "",
        emailId: "",
        phoneNo: "",
      },
      receiverAddress: {
        street: "",
        landmark: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
      },

      deliveryPerson: {
        firstName: "",
        emailId: "",
        phoneNo: "",
      },
      courier: {
        courierRefId: "",
        firstName: "",
        emailId: "",
      },
    },
  ]);

  let navigate = useNavigate();

  const [showModal, setShowSkillModal] = useState(false);

  const handleClose = () => setShowSkillModal(false);
  const handleShow = () => setShowSkillModal(true);

  const assignCourierStatus = (courierId, assignCourierTrackingNumber) => {
    setAssignCourierTrackingNumber(assignCourierTrackingNumber);
    setAssignCourierId(courierId);
    handleShow();
  };
  const retrieveAllStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/helper/delivery/status/fetch/all"
    );
    return response.data;
  };

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/courier/delivery-person?courierId=" +
        courier_person.id
      //   ,
      // {
      //   headers: {
      //     Authorization: "Bearer " + courier_jwtToken, // Replace with your actual JWT token
      //   },
      // }
    );
    console.log(response.data);
    return response.data;
  };

  const updateCourierStatus = (e) => {
    e.preventDefault();

    let putData = {
      id: assignCourierId,
      deliveryPersonId: assignDeliveryId,
    };

    if (assignCourierId === "" || assignDeliveryId === "") {
      toast.error("Missing input for updating the courier status", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetch("http://localhost:8080/api/courier/assign-delivery", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + jwtToken,
        },
        body: JSON.stringify(putData),
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
                window.location.reload(true);
              }, 1000);
            } else if (!res.success) {
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
              }, 1000); // Redirect after 3 seconds
            } else {
              toast.error("It seems server is down", {
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
              }, 1000); // Redirect after 3 seconds
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
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        });
    }
  };

  useEffect(() => {
    const getAllCouriers = async () => {
      const response = await retrieveAllCouriers();
      if (response) {
        setCouriers(response.couriers);
      }
    };

    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllUsers(allUsers.users);
      }
    };

    getAllUsers();
    getAllCouriers();
  }, []);

  const retrieveAllCouriers = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/courier/fetch/courier-wise?courierId=" +
        courier_person.id
      //   ,
      // {
      //   headers: {
      //     Authorization: "Bearer " + employer_jwtToken, // Replace with your actual JWT token
      //   },
      // }
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const viewCustomerProfile = (customer) => {
    navigate("/customer/profile/detail", { state: customer });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>Customer Couriers</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Tracking Number</th>
                  <th scope="col">Company</th>
                  <th scope="col">Sender Name</th>
                  <th scope="col">Courier Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Weight (In kg)</th>
                  <th scope="col">Courier Date</th>
                  <th scope="col">Receiver Name</th>
                  <th scope="col">Receiver Address</th>
                  <th scope="col">Delivery Person</th>
                  <th scope="col">Delivery Contact</th>
                  <th scope="col">Delivery Date</th>
                  <th scope="col">Delivery Time</th>
                  <th scope="col">Delivery Message</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {couriers.map((courier) => {
                  return (
                    <tr>
                      <td>
                        <b>{courier.trackingNumber}</b>
                      </td>
                      <td>
                        <b>{courier.courier.firstName}</b>
                      </td>

                      <td>
                        <b
                          className="text-color"
                          onClick={() => viewCustomerProfile(courier.sender)}
                        >
                          {courier.sender.firstName}
                        </b>
                      </td>

                      <td>
                        <b>{courier.courierName}</b>
                      </td>
                      <td>
                        <b>{courier.courierType}</b>
                      </td>
                      <td>
                        <b>{courier.weight}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(courier.courierDate)}</b>
                      </td>
                      <td>
                        <b>{courier.receiverName}</b>
                      </td>

                      <td>
                        <b>
                          {courier.receiverAddress.street +
                            ", " +
                            courier.receiverAddress.city +
                            ", " +
                            courier.receiverAddress.pincode +
                            ", " +
                            courier.receiverAddress.state +
                            ", " +
                            courier.receiverAddress.country}
                        </b>
                      </td>

                      {(() => {
                        if (courier.deliveryPerson) {
                          return (
                            <td>
                              <b>{courier.deliveryPerson.firstName}</b>
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              <b className="text-danger">Not Asssigned</b>
                            </td>
                          );
                        }
                      })()}

                      {(() => {
                        if (courier.deliveryPerson) {
                          return (
                            <td>
                              <b>{courier.deliveryPerson.phoneNo}</b>
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              <b className="text-danger">Not Asssigned</b>
                            </td>
                          );
                        }
                      })()}

                      {(() => {
                        if (courier.deliveryDate) {
                          return (
                            <td>
                              <b>{courier.deliveryDate}</b>
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              <b className="text-danger">Pending</b>
                            </td>
                          );
                        }
                      })()}

                      {(() => {
                        if (courier.deliveryTime) {
                          return (
                            <td>
                              <b>{courier.deliveryTime}</b>
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              <b className="text-danger">Pending</b>
                            </td>
                          );
                        }
                      })()}

                      {(() => {
                        if (courier.message) {
                          return (
                            <td>
                              <b>{courier.message}</b>
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              <b className="text-danger">Pending</b>
                            </td>
                          );
                        }
                      })()}

                      <td>
                        <b>{courier.deliveryStatus}</b>
                      </td>
                      <td>
                        {(() => {
                          if (!courier.deliveryPerson) {
                            return (
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-sm bg-color custom-bg-text mb-3"
                                  onClick={() =>
                                    assignCourierStatus(
                                      courier.id,
                                      courier.trackingNumber
                                    )
                                  }
                                >
                                  Assign Delivery
                                </button>
                                <ToastContainer />
                              </div>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* employee work experience modal */}
      <Modal show={showModal} onHide={handleClose} size="md">
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Assign Delivery Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div className="mb-3 text-color">
                <label for="emailId" class="form-label">
                  <b>Courier Tracking Number</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={assignCourierTrackingNumber}
                  requrired
                />
              </div>
              <div className=" mb-3">
                <label className="form-label">
                  <b>Delivery Person</b>
                </label>

                <select
                  name="assignDeliveryId"
                  onChange={(e) => {
                    setAssignDeliveryId(e.target.value);
                  }}
                  className="form-control"
                  required
                >
                  <option value="">Select Delivery Person</option>

                  {users.map((person) => {
                    return (
                      <option value={person.id}>{person.firstName}</option>
                    );
                  })}
                </select>
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="button" // Change the type to "button"
                  onClick={updateCourierStatus} // Remove the arrow function
                  className="btn bg-color custom-bg-text"
                >
                  Assign Delivery
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewCouriersByCompany;
