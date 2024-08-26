import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewAllCustomerCouriers = () => {
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

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

  useEffect(() => {
    const getAllCouriers = async () => {
      const response = await retrieveAllCouriers();
      if (response) {
        setCouriers(response.couriers);
      }
    };

    getAllCouriers();
  }, []);

  const retrieveAllCouriers = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/courier/fetch/all"
      
    );

    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); 

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
          <h2>All Customer Couriers</h2>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCustomerCouriers;
