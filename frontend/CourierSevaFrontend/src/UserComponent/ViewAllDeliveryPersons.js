import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllDeliveryPersons = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
 // const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setDeliveryPersons(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Delivery"
      
    );
    return response.data;
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
          <h2>All Delivery Persons</h2>
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
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {deliveryPersons.map((deliveryPerson) => {
                  return (
                    <tr>
                      <td>
                        <b>{deliveryPerson.firstName}</b>
                      </td>
                      <td>
                        <b>{deliveryPerson.lastName}</b>
                      </td>
                      <td>
                        <b>{deliveryPerson.emailId}</b>
                      </td>
                      <td>
                        <b>{deliveryPerson.phoneNo}</b>
                      </td>
                      <td>
                        <b>
                          {deliveryPerson.address.street +
                            ", " +
                            deliveryPerson.address.city +
                            ", " +
                            deliveryPerson.address.pincode +
                            ", " +
                            deliveryPerson.address.state +
                            ", " +
                            deliveryPerson.address.country}
                        </b>
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

export default ViewAllDeliveryPersons;
