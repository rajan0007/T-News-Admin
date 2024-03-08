import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast } from "react-toastify";
import DataServices from "../services/requestApi";

export default function CustomerList() {
  const [showPage, setShowPage] = useState(false);
  const [alert, setAlert] = React.useState(null);
  const [tableData, setTableData] = React.useState([]);
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
    password: Yup.string().required("required"),
    firstName: Yup.string().required("required"),
    email: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    phoneNo: Yup.string().required("required"),
    profession: Yup.string().required("required"),
    city: Yup.string().required("required"),
    state: Yup.string().required("required"),
    password: Yup.string().required("required"),
    address: Yup.string().required("required"),
  });

  React.useEffect(() => {
    getBranch();
  }, []);

  const getBranch = async () => {
    setLoader(true);
    try {
      const { data } = await DataServices.GetAllProvider();
      setLoader(false);
      console.log("data", data);
      setTableData(data?.data);
    } catch (e) {
      toast.error(e.data.message);
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

  const updateTournament = async (value) => {
    setButtonLoader(true);
    const dto = { id: rowValue._id, ...value };
    console.log("data::: ", dto);
    try {
      const { data } = await DataServices.UpdateProvider(dto);
      if (data.status) {
        toast.success(data?.message);
        setShowPage(!showPage);
        getBranch();
      } else {
        toast.warning(data?.message);
      }
      setButtonLoader(false);
    } catch (e) {
      console.log("e::: ", e);
      setButtonLoader(false);
    }
  };

  const warningWithConfirmMessage = (e) => {
    console.log("donw");
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block" }}
        title="Are you sure?"
        onConfirm={() => {
          deleteData(e);
          //  setIsPlayerEditButtonClicked(false);
        }}
        onCancel={() => setAlert(null)}
        // confirmBtnCssClass={classes.button + " " + classes.danger}
        // cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      ></SweetAlert>
    );
  };

  const successDeleted = (msg) => {
    console.log("donw");
    setAlert(
      <SweetAlert
        success
        style={{ display: "block" }}
        title={<h4>{msg}</h4>}
        onConfirm={() => {
          getBranch();
          setAlert(null);
          // setIsPlayerEditButtonClicked(false);
        }}
        confirmBtnBsStyle="success"
      ></SweetAlert>
    );
  };

  const deleteData = (e) => {
    // console.log("e===>", e._id);
    // const data = { id: e._id };
    // axios.post(`${API_URL}/api/admin/delete-admin-player`, data).then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    //   if (res.data.isValid) {
    //     successDeleted(res.data.message);
    //   }
    //   getBranch();
    // });
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
                  profession: rowValue ? rowValue?.profession : "",
                  city: rowValue ? rowValue?.city : "",
                  state: rowValue ? rowValue?.state : "",
                  address: rowValue ? rowValue?.address : "",
                  password: rowValue ? rowValue?.password : "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  if (parseInt(openValue) === 2) {
                    updateTournament(values);
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
                          placeholder="phoneNo"
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
                        <label htmlFor="password">Profession</label>
                        <Field
                          type="text"
                          name="profession"
                          placeholder="profession"
                          className={`mt-2 form-control
                          ${
                            touched.profession && errors.profession
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="profession"
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
                        <label htmlFor="password">address</label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Address"
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
                  <div>
                    <input
                      class="input-simple"
                      type="text"
                      placeholder="Search Email..."
                      //   value={searchSubType}
                      //   onChange={(e) => setSearchTourName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body" style={{ overflow: "scroll" }}>
              <table id="" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Email</th>
                    <th>User name</th>
                    <th>Phone No</th>
                    <th>Profession</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, i) => (
                    <>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{item?.email}</td>
                        <td>
                          {item?.firstName} {item?.lastName}
                        </td>
                        <td>{item?.phoneNo}</td>
                        <td>{item?.profession}</td>
                        <td className="d-flex justify-content-evenly ">
                          <EditIcon
                            className="mr-3 courser"
                            onClick={() => {
                              setShowPage(!showPage);
                              clickEditButton(item);
                            }}
                          />
                          <ClearIcon
                            className="courser text-danger"
                            onClick={() => warningWithConfirmMessage()}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">{loader && "Loading..."}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
