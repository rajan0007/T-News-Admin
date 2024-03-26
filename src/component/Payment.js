import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast } from "react-toastify";
import DataServices from "../services/requestApi";
import { Button, Modal } from "react-bootstrap";

export default function Payment() {
  const [showPage, setShowPage] = useState(false);
  const [alert, setAlert] = React.useState(null);
  const [tableData, setTableData] = React.useState([]);
  const [info, setInfo] = useState([]);
  const [searchSubType] = React.useState();
  const [rowValue, setRowValue] = React.useState();
  const [openValue, setOpenValue] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [searchTourName, setSearchTourName] = React.useState();
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [showPrePage] = React.useState(10);
  const [pagination, setPagination] = React.useState({
    start: 0,
    end: showPrePage,
  });

  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
    firstName: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    lastName: Yup.string().required("Name is required"),
    phoneNo: Yup.string()
      .min(10, "PhoneNumber must be 10 characters")
      .required("PhoneNumber is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    password: Yup.string().required("required"),
    address: Yup.string().required("Address is required"),
  });

  React.useEffect(() => {
    getBranch();
  }, []);

  const getBranch = async () => {
    setLoader(true);
    try {
      const { data } = await DataServices.Booking();
      setLoader(false);
      console.log("getBranch data:", data);
      setTableData(data?.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const searchingData = [];
  let data = [];
  console.log("tableData 111 ---", tableData, searchTourName);
  // if (searchTourName) {
  //   console.log("tableData 222 ---", tableData, tableData.length > 0);
  //   data = tableData.filter((item) => {
  //     return Object.values(item?.email).join("").includes(searchTourName);
  //   });
  //   console.log("data 111 ---", data);
  //   data?.map((dataItem) => searchingData.push(dataItem));
  // } else {
  //   tableData.map((dataItem) => searchingData.push(dataItem));
  // }

  const clickEditButton = (item) => {
    setShowPage(true);
    console.log("item edit value :::", item);
    setRowValue(item);
    setOpenValue(2);
  };

  const updateCustomer = async (value) => {
    console.log("value", value);
    setButtonLoader(true);
    const dto = { id: rowValue._id, ...value };
    console.log("data::: ", dto);
    // try {
    //   const { data } = await DataServices.UpdateCustomer(dto);
    //   if (data.status) {
    //     toast.success(data?.message);
    //     setShowPage(!showPage);
    //     getBranch();
    //   } else {
    //     toast.warning(data?.message);
    //   }
    //   setButtonLoader(false);
    // } catch (e) {
    //   console.log("e::: ", e);
    //   setButtonLoader(false);
    // }
  };

  const warningWithConfirmMessage = (e) => {
    console.log("warningWithConfirmMessage called");
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block" }}
        title="Are you sure?"
        onConfirm={() => {
          deleteData(e);
        }}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      ></SweetAlert>
    );
  };

  const successDeleted = (msg) => {
    console.log("successDeleted called");
    setAlert(
      <SweetAlert
        success
        style={{ display: "block" }}
        title={<h4>{msg}</h4>}
        onConfirm={() => {
          getBranch();
          setAlert(null);
        }}
        confirmBtnBsStyle="success"
      ></SweetAlert>
    );
  };

  const deleteData = async (e) => {
    console.log("deleteData called with:", e._id);
    const dto = { id: e._id };
    // try {
    //   const { data } = await DataServices.DeleteCustomer(dto);
    //   console.log("deleteData response:", data);
    //   if (data?.status) {
    //     successDeleted(data?.message);
    //     getBranch(); // Refresh data after successful deletion
    //   } else {
    //     toast.warning(data?.message);
    //   }
    // } catch (error) {
    //   console.error("Error deleting data:", error);
    // }
  };

  const successAdd = (msg) => {
    console.log("donw");
    setAlert(
      <SweetAlert
        success
        style={{ display: "block" }}
        title={<h4>{msg}</h4>}
        onConfirm={() => {
          getBranch();
          setAlert(null);
          setShowPage(false);
          // setIsPlayerEditButtonClicked(false);
        }}
        confirmBtnBsStyle="success"
      ></SweetAlert>
    );
  };

  const successEdit = (msg) => {
    console.log("donw");
    setAlert(
      <SweetAlert
        success
        style={{ display: "block" }}
        title={<h4>{msg}</h4>}
        onConfirm={() => {
          getBranch();
          setAlert(null);
          setShowPage(false);
          // setIsPlayerEditButtonClicked(false);
        }}
        confirmBtnBsStyle="success"
      ></SweetAlert>
    );
  };
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      {alert}
      {showPage ? (
        <div class="content p-3 ">
          <div className="card p-3">
            <Box sx={{ width: "100%" }}>
              <Formik
                initialValues={{
                  firstName: rowValue ? rowValue?.firstName : "",
                  email: rowValue ? rowValue?.email : "",
                  lastName: rowValue ? rowValue?.lastName : "",
                  phoneNo: rowValue ? rowValue?.phoneNo : "",
                  city: rowValue ? rowValue?.city : "",
                  state: rowValue ? rowValue?.state : "",
                  address: rowValue ? rowValue?.address : "",
                  password: rowValue ? rowValue?.password : "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  if (parseInt(openValue) === 2) {
                    updateCustomer(values);
                  }
                }}
              >
                {({ touched, errors, isSubmitting, values, setFieldValue }) => (
                  <div>
                    <Form>
                      <div className="form-group">
                        <label htmlFor="password">First Name</label>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          className={`mt-2 form-control
                          ${
                            touched.firstName && errors.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="firstName"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Last Name</label>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          className={`mt-2 form-control
                          ${
                            touched.lastName && errors.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="lastName"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Email</label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Phone No</label>
                        <Field
                          type="text"
                          name="phoneNo"
                          placeholder="PhoneNo"
                          className={`mt-2 form-control
                          ${
                            touched.phoneNo && errors.phoneNo
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="phoneNo"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Address</label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Address"
                          as="textarea"
                          row={4}
                          className={`mt-2 form-control
                          ${
                            touched.address && errors.address
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="address"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">City</label>
                        <Field
                          type="text"
                          name="city"
                          placeholder="city"
                          className={`mt-2 form-control
                          ${touched.city && errors.city ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="city"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">State</label>
                        <Field
                          type="text"
                          name="state"
                          placeholder="state"
                          className={`mt-2 form-control
                          ${touched.state && errors.state ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="state"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                          type="text"
                          name="password"
                          placeholder="Password"
                          className={`mt-2 form-control
                          ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="d-flex">
                        <button
                          style={{ width: "100px" }}
                          type="submit"
                          className="btn btn-primary btn-block mt-4 mr-2"
                          disabled={buttonLoader}
                        >
                          <div
                            className="d-flex"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              className="d-flex"
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <b>Submit</b>
                            </div>
                            {buttonLoader && (
                              <div>
                                <div
                                  class="spinner-border ml-2 mt-1"
                                  role="status"
                                  style={{ height: "20px", width: "20px" }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </button>
                        <button
                          style={{ width: "100px" }}
                          onClick={() => setShowPage(false)}
                          type="button"
                          className="btn btn-secondary btn-block mt-4 ms-2"
                        >
                          Close
                        </button>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </Box>
          </div>
        </div>
      ) : (
        <div className="content p-3">
          <div class="card ">
            <div class="pl-4 pr-4 pt-4">
              <div className="row">
                <div className="col-md-6 col-lg-6"></div>
                <div className="mt-2 col-md-6 col-lg-6 d-flex justify-content-start justify-content-lg-end">
                  {/* <div>
                    <input
                      class="input-simple"
                      type="text"
                      placeholder="Search Email..."
                      //   value={searchSubType}
                      //   onChange={(e) => setSearchTourName(e.target.value)}
                    />
                  </div> */}
                </div>
              </div>
            </div>

            <div class="card-body" style={{ overflow: "scroll" }}>
              <table id="" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Customer Name</th>
                    <th>Service Name</th>
                    <th>CardHolder Name</th>
                    <th>Card Number</th>
                    <th>Card MM/YY</th>
                    <th>CVV</th>
                    <th>UPI id</th>
                    <th>Subtotal</th>
                    <th>Info</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, i) => (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          {item?.customerId?.firstName}{" "}
                          {item?.customerId?.lastName}
                        </td>
                        <td>{item?.serviceName}</td>
                        <td>{item?.cardHolderName || "-"}</td>
                        <td>{item?.cardNumber || "-"}</td>
                        <td>{item?.cardDate || "-"}</td>
                        <td>{item.cvv || "-"}</td>
                        <td>{item.upi || "-"}</td>
                        <td>₹&nbsp;{`${item.total}.00 ` || "-"}</td>
                        <td className="d-flex justify-content-center">
                          <VisibilityIcon
                            className="courser" 
                            style={{ color: "#4caf50" }}
                            onClick={() => {
                              setModalShow(true);
                              setInfo(item);
                            }}
                          />
                        </td>
                        {/* <td>
                          <div className="d-flex justify-content-evenly ">
                            <EditIcon
                              className="mr-3 courser"
                              // onClick={() => {
                              //   setShowPage(!showPage);
                              //   clickEditButton(item);
                              // }}
                            />
                            <ClearIcon
                              className="courser text-danger"
                              // onClick={() => warningWithConfirmMessage(item)}
                            />
                          </div>
                        </td> */}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
              >
                <Modal.Header>
                  <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ margin: "0px" }}
                  >
                    Booking Information
                  </Modal.Title>
                  <div>
                    <ClearIcon  className="courser" onClick={() => setModalShow(false)} />
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div
                      className="col-4"
                      style={{ borderRight: "2px solid #CACACA" }}
                    >
                      {console.log("info", info)}
                      <h3 style={{ fontSize: "18px" }}>Customer Details</h3>
                      <div className="card mt-2" style={{ width: "15rem" }}>
                        <div className="card-body">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={info?.customerId?.image}
                              className="rounded-50"
                              alt="Your Image"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </div>
                          <h5
                            className="card-subtitle mb-2 text-body-secondary mt-3"
                            style={{ fontSize: "16px" }}
                          >
                            Name :{info?.customerId?.firstName}{" "}
                            {info?.customerId?.lastName}
                          </h5>
                          <p className="card-subtitle mb-2 text-body-secondary mt-3">
                            <span style={{ fontWeight: "600" }}>Address :</span>{" "}
                            {info?.customerId?.address},{info?.customerId?.city}
                            ,{info?.customerId?.state}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <h3 style={{ fontSize: "18px", textAlign: "center" }}>
                        Profession Details
                      </h3>
                      <div className="row">
                        {info?.providerId?.map((item, i) => (
                          <div className="col-6">
                            <div className="card" style={{ width: "15rem" }}>
                              <div className="card-body">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={item.image}
                                    className="rounded-50"
                                    alt="Your Image"
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                  <h5 className="card-title">
                                    Price : {item.perHourPrice}/hr
                                  </h5>
                                </div>
                                <h5
                                  className="card-subtitle mb-2 text-body-secondary mt-3"
                                  style={{ fontSize: "16px" }}
                                >
                                  Name : {item.firstName} {item.lastName}
                                </h5>
                                <p className="card-subtitle mb-2 text-body-secondary mt-3">
                                  <span style={{ fontWeight: "600" }}>
                                    Profession :
                                  </span>{" "}
                                  {item.profession}
                                </p>
                                <p className="card-subtitle mb-2 text-body-secondary mt-3">
                                  <span style={{ fontWeight: "600" }}>
                                    Phone No :
                                  </span>{" "}
                                  {item.phoneNo}
                                </p>
                                <p className="card-subtitle mb-2 text-body-secondary mt-3">
                                  <span style={{ fontWeight: "600" }}>
                                    Address :
                                  </span>{" "}
                                  {item.address},{item.city},{item.state}
                                </p>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <span className="stars">
                                    <div
                                      className="fas fa-star"
                                      style={{ fontSize: "12px" }}
                                    />
                                    <div
                                      className="fas fa-star"
                                      style={{ fontSize: "12px" }}
                                    />
                                    <div
                                      className="fas fa-star"
                                      style={{ fontSize: "12px" }}
                                    />
                                    <div
                                      className="fas fa-star"
                                      style={{ fontSize: "12px" }}
                                    />
                                    <div className="fas fa-star-half-empty" />
                                    <br />
                                    <a
                                      className="review_count"
                                      href="#customer-reviews"
                                      style={{ fontSize: "12px" }}
                                    >
                                      685,501 Reviews
                                    </a>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
