import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import Loader from "../Loader/Loader";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataServices from "../services/requestApi";
import { toast } from "react-toastify";

export default function Admin() {
  const [alert, setAlert] = React.useState(null);
  const [tableData, setTableData] = React.useState([]);
  const [showPage, setShowPage] = React.useState(false);
  const [searchSubType] = React.useState();
  const [rowValue, setRowValue] = React.useState();
  const [openValue, setOpenValue] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [searchTourName, setSearchTourName] = React.useState();
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [showPrePage, setShowPrePage] = React.useState(10);
  const [pagination, setPagination] = React.useState({
    start: 0,
    end: showPrePage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  const updateShowPerpagevalue = (value) => {
    setShowPrePage(value);
    setPagination({ start: 0, end: value });
  };
  const addSchema = Yup.object().shape({
    email: Yup.string().required("required"),
    password: Yup.string().required("required"),
    confirmPassword: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const editSchema = Yup.object().shape({
    email: Yup.string().required("required"),
    password: Yup.string().required("required"),
    oldPassword: Yup.string().required("required"),
    confirmPassword: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  useEffect(() => {
    getBranch();
  }, []);

  const getBranch = async () => {
    setLoader(true);
    try {
      const { data } = await DataServices.GetAllAdmin();
      setTableData(data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoader(false);
    }
  };

  const clickEditButton = (item) => {
    console.log("item edit value :::", item);
    setRowValue(item);
    setOpenValue(2);
  };

  const openAddAdmin = (value) => {
    setRowValue();
    console.log("openAddAdmin :::", value);
    setShowPage(true);
    setOpenValue(value);
  };

  const updateAdmin = async (value) => {
    setButtonLoader(true);
    console.log("updateTournament value :::", value);
    try {
      const { data } = await DataServices.UpdateAdmin(value);
      if (data.status) {
        toast.success(data.message);
        setShowPage(false);
        setButtonLoader(false);
        getBranch();
      }
    } catch (error) {
      console.error("Error adding new tournament:", error);
    }
  };

  const addNewAdmin = async (value) => {
    console.log("addNewTournament value :::", value, openValue, rowValue);
    console.log("value", value);
    setButtonLoader(true);

    try {
      const { data } = await DataServices.AddAdmin(value);
      console.log("data", data);
      if (data.status) {
        toast.success(data.message);
        setShowPage(false);
        setButtonLoader(false);
        getBranch();
      }
    } catch (error) {
      console.error("Error adding new tournament:", error);
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
    console.log("donw");
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
    console.log("e===>", e._id);
    const dto = { id: e._id };
    try {
      const { data } = await DataServices.DeleteAdmin(dto);
      console.log("deleteData response:", data);
      if (data?.status) {
        successDeleted(data?.message);
      } else {
        toast.warning(data?.message);
      }
    } catch (error) {}
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
                  email: rowValue ? rowValue?.email : "",
                  password: "",
                  oldPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={openValue == 1 ? addSchema : editSchema}
                onSubmit={(values) => {
                  // setButtonLoader(true);
                  delete values.confirmPassword;
                  console.log("update formik value :::", values, openValue);
                  if (openValue == 1) {
                    delete values.oldPassword;
                    console.log("add formik value :::", openValue);
                    addNewAdmin(values);
                  }
                  if (openValue == 2) {
                    console.log("update formik value :::", openValue, values);
                    updateAdmin(values);
                  }
                }}
              >
                {({ touched, errors, isSubmitting, values, setFieldValue }) => (
                  <div>
                    <Form>
                      <div className="form-group">
                        <label htmlFor="password">Email</label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          disabled={openValue == 2}
                          className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      </div>
                      {openValue == 2 && (
                        <div className="form-group">
                          <label htmlFor="password">Old Password</label>
                          <Field
                            type="text"
                            name="oldPassword"
                            placeholder="Password"
                            className={`mt-2 form-control
                          ${
                            touched.oldPassword && errors.oldPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="oldPassword"
                            className="invalid-feedback"
                          />
                        </div>
                      )}
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
                      <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <Field
                          type="text"
                          name="confirmPassword"
                          placeholder="Password"
                          className={`mt-2 form-control
                          ${
                            touched.confirmPassword && errors.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="confirmPassword"
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
                          type="button"
                          className="btn btn-secondary btn-block mt-4 ms-2"
                          onClick={() => setShowPage(false)}
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
            {/* <div class="pl-4 pr-4 pt-4">
              <h3 class="card-title">
                <b>Admin List</b>
              </h3>
              <div>
                <input
                  class="input-simple"
                  type="text"
                  placeholder="Search Email..."
                  value={searchSubType}
                  onChange={(e) => setSearchTourName(e.target.value)}
                />
              </div>
            </div> */}
            <div class="pl-4 pr-4 pt-4">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <button
                    style={{ width: "118px" }}
                    onClick={() => {
                      openAddAdmin(1);
                    }}
                    type="button"
                    className="btn btn-primary btn-block "
                  >
                    <AddIcon />
                    Add New
                  </button>
                </div>
                {/* <div className="mt-2 col-md-6 col-lg-6 d-flex justify-content-start justify-content-lg-end">
                  <div>
                    <input
                      class="input-simple"
                      type="text"
                      placeholder="Search Email..."
                      value={searchSubType}
                      onChange={(e) => setSearchTourName(e.target.value)}
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div class="card-body" style={{ overflow: "scroll" }}>
              <table id="" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((item, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.email}</td>
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
                          onClick={() => warningWithConfirmMessage(item)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
