import React, { useRef, useState } from "react";
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
import logo from "../img/logo.png";
import user_icon from "../img/user.png";

export default function Profile() {
  const isPro = sessionStorage.getItem("role");
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("user", user);

  const [showPage, setShowPage] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [rowValue, setRowValue] = React.useState();
  const [openValue, setOpenValue] = React.useState(0);

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [showPrePage] = React.useState(10);
  const [isEdit, setIsEdit] = React.useState(false);

  const LoginSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    lastName: Yup.string().required("Name is required"),
    phoneNo: Yup.string()
      .min(10, "PhoneNumber must be 10 characters")
      .required("PhoneNumber is required"),
    profession: Yup.string().required("Profession is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
    cPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    address: Yup.string().required("Address is required"),
    perHourPrice: Yup.string().required("required"),
  });
  const AdminSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("New Password is required"),
    cPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    oldPassword: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Old Password is required"),
  });
  React.useEffect(() => {
    getBranch();
  }, []);

  const getBranch = async () => {
    setLoader(true);

    try {
      const { data } = await DataServices.FindProvider({ id: user });
      setLoader(false);
      console.log("data", data);
      setTableData(data?.data[0]);
    } catch (e) {
      toast.error(e.data.message);
    }
  };
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("id", user);
      try {
        const { data } = await DataServices.ProviderImage(formData);
        if (data?.status) {
          toast.success(data?.message);
          setIsEdit(false);
          getBranch();
        } else {
          toast.warning(data?.message);
        }
      } catch (error) {}
    }
  };
  return (
    <div>
      {" "}
      <div class="content p-3 ">
        <div className="card p-3">
          <Box sx={{ width: "100%" }}>
            {loader
              ? "Loader..."
              : isPro == "Provider" && (
                  <Formik
                    initialValues={{
                      firstName: tableData ? tableData?.firstName : "",
                      email: tableData ? tableData?.email : "",
                      lastName: tableData ? tableData?.lastName : "",
                      phoneNo: tableData ? tableData?.phoneNo : "",
                      profession: tableData ? tableData?.profession : "",
                      city: tableData ? tableData?.city : "",
                      state: tableData ? tableData?.state : "",
                      address: tableData ? tableData?.address : "",
                      password: tableData ? tableData?.password : "",
                      cPassword: tableData ? tableData?.password : "",
                      perHourPrice: tableData ? tableData?.perHourPrice : "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { resetForm }) => {
                      delete values.cPassword;
                      const dto = {
                        ...values,
                        id: user,
                      };
                      console.log("dto", dto);
                      setButtonLoader(true);
                      try {
                        const { data } = await DataServices.UpdateProvider(dto);
                        if (data?.status) {
                          toast.success(data?.message);
                          setIsEdit(false);
                          getBranch();
                        } else {
                          toast.warning(data?.message);
                        }
                        setButtonLoader(false);
                      } catch (e) {
                        console.log("e::: ", e);
                        setButtonLoader(false);
                      }
                      resetForm();
                    }}
                  >
                    {({
                      touched,
                      errors,
                      isSubmitting,
                      values,
                      setFieldValue,
                    }) => (
                      <div>
                        <div
                          className="d-flex"
                          style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h3>Profile</h3>
                          {!isEdit && (
                            <button
                              className="btn btn-primary"
                              onClick={() => setIsEdit(true)}
                            >
                              Edit
                            </button>
                          )}
                        </div>

                        <hr />

                        <Form className="mt-3">
                          <div className="row">
                            <div className="col-8">
                              <div className="row">
                                <div className="col-6">
                                  <div className="form-group">
                                    <label htmlFor="password">First Name</label>
                                    <Field
                                      type="text"
                                      name="firstName"
                                      disabled={isEdit ? false : true}
                                      placeholder="First Name"
                                      className={`mt-2 form-control
                    ${
                      touched.firstName && errors.firstName ? "is-invalid" : ""
                    }`}
                                    />
                                    <ErrorMessage
                                      component="div"
                                      name="firstName"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label htmlFor="password">Last Name</label>
                                    <Field
                                      type="text"
                                      name="lastName"
                                      placeholder="Last Name"
                                      disabled={isEdit ? false : true}
                                      className={`mt-2 form-control
                    ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                                    />
                                    <ErrorMessage
                                      component="div"
                                      name="lastName"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label htmlFor="password">Email</label>
                                    <Field
                                      type="email"
                                      name="email"
                                      placeholder="Email"
                                      disabled={isEdit ? false : true}
                                      className={`mt-2 form-control
                    ${touched.email && errors.email ? "is-invalid" : ""}`}
                                    />
                                    <ErrorMessage
                                      component="div"
                                      name="email"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group">
                                    <label htmlFor="password">Phone No</label>
                                    <Field
                                      type="text"
                                      name="phoneNo"
                                      placeholder="phoneNo"
                                      disabled={isEdit ? false : true}
                                      className={`mt-2 form-control
                    ${touched.phoneNo && errors.phoneNo ? "is-invalid" : ""}`}
                                    />
                                    <ErrorMessage
                                      component="div"
                                      name="phoneNo"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-4 d-flex"
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                className="border"
                                style={{
                                  borderRadius: "50%",
                                  height: "150px",
                                  width: "150px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                              >
                                {image ? (
                                  <img
                                    src={image}
                                    style={{
                                      width: "100%",
                                      objectFit: "cover",
                                      height: "100%",
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={tableData?.image || user_icon}
                                    style={{
                                      width: "100%",
                                      objectFit: "cover",
                                      height: "100%",
                                    }}
                                  />
                                )}
                                {isEdit && (
                                  <>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      style={{ display: "none" }}
                                      onChange={handleImageChange}
                                      ref={fileInputRef}
                                    />

                                    <button
                                      type="button"
                                      className="btn btn-secondary mt-2"
                                      style={{
                                        position: "absolute",
                                        bottom: "0",
                                        width: "100%",
                                      }}
                                      onClick={() =>
                                        fileInputRef.current.click()
                                      }
                                    >
                                      Edit
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="password">Profession</label>
                                <Field
                                  type="text"
                                  name="profession"
                                  placeholder="Profession"
                                  disabled={isEdit ? false : true}
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
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="password">
                                  Price/ Per Hour
                                </label>
                                <Field
                                  type="text"
                                  name="perHourPrice"
                                  placeholder="Price / hour"
                                  disabled={isEdit ? false : true}
                                  className={`mt-2 form-control
                    ${
                      touched.perHourPrice && errors.perHourPrice
                        ? "is-invalid"
                        : ""
                    }`}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="perHourPrice"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="password">Address</label>
                            <Field
                              type="text"
                              name="address"
                              as="textarea"
                              disabled={isEdit ? false : true}
                              rows={3}
                              placeholder="Address"
                              className={`mt-2 form-control
                    ${touched.address && errors.address ? "is-invalid" : ""}`}
                            />
                            <ErrorMessage
                              component="div"
                              name="address"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="password">City</label>
                                <Field
                                  type="text"
                                  name="city"
                                  disabled={isEdit ? false : true}
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
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="password">State</label>
                                <Field
                                  type="text"
                                  name="state"
                                  disabled={isEdit ? false : true}
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
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                  type="text"
                                  name="password"
                                  disabled={isEdit ? false : true}
                                  placeholder="Password"
                                  className={`mt-2 form-control
                    ${touched.password && errors.password ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="password"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <label htmlFor="cPassword">
                                  Confirm Password
                                </label>
                                <Field
                                  type="text"
                                  name="cPassword"
                                  placeholder="Confirm Password"
                                  disabled={isEdit ? false : true}
                                  className={`mt-2 form-control
                    ${
                      touched.cPassword && errors.cPassword ? "is-invalid" : ""
                    }`}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="cPassword"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>
                          </div>
                          {isEdit && (
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
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              </button>
                              <button
                                style={{ width: "100px" }}
                                onClick={() => setIsEdit(false)}
                                type="button"
                                className="btn btn-secondary btn-block mt-4 ms-2"
                              >
                                Close
                              </button>
                            </div>
                          )}
                        </Form>
                      </div>
                    )}
                  </Formik>
                )}

            {isPro == "Admin" && (
              <Formik
                initialValues={{
                  oldPassword: rowValue ? rowValue?.password : "",
                  newPassword: rowValue ? rowValue?.password : "",
                  cPassword: rowValue ? rowValue?.password : "",
                }}
                validationSchema={AdminSchema}
                onSubmit={async (values, { resetForm }) => {
                  console.log("values", values);
                  const dto = {
                    email: user?.email,
                    password: values.newPassword,
                    oldPassword: values.oldPassword,
                  };

                  try {
                    const { data } = await DataServices.UpdateAdmin(dto);
                    if (data.status) {
                      toast.success(data?.message);
                    } else {
                      toast.warning(data?.message);
                    }
                    setButtonLoader(false);
                    setIsEdit(true);
                  } catch (e) {
                    console.log("e::: ", e);
                    setButtonLoader(false);
                  }
                  resetForm();
                }}
              >
                {({ touched, errors, isSubmitting, values, setFieldValue }) => (
                  <div>
                    <div
                      className="d-flex"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3>Profile</h3>
                      {!isEdit && (
                        <button
                          className="btn btn-primary"
                          onClick={() => setIsEdit(true)}
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    <hr />

                    <Form className="mt-3">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="cPassword">Old Password</label>
                            <Field
                              type="text"
                              name="oldPassword"
                              placeholder="Old Password"
                              disabled={isEdit ? false : true}
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
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <Field
                              type="text"
                              name="newPassword"
                              disabled={isEdit ? false : true}
                              placeholder="New Password"
                              className={`mt-2 form-control
                    ${
                      touched.newPassword && errors.newPassword
                        ? "is-invalid"
                        : ""
                    }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="newPassword"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="cPassword">Confirm Password</label>
                            <Field
                              type="text"
                              name="cPassword"
                              disabled={isEdit ? false : true}
                              placeholder="Confirm Password"
                              className={`mt-2 form-control
                    ${
                      touched.cPassword && errors.cPassword ? "is-invalid" : ""
                    }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="cPassword"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>
                      {isEdit && (
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
                            onClick={() => setIsEdit(false)}
                            type="button"
                            className="btn btn-secondary btn-block mt-4 ms-2"
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </Form>
                  </div>
                )}
              </Formik>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
