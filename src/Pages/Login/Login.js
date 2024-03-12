import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import { useAppContext } from "../../Lib/ContextLib";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { API_URL } from "../../config";
import DataServices from "../../services/requestApi";
import axiosInstance from "../../services/http-common";
import Logo from "../../img/logo.png";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function Login() {
  const history = useNavigate();

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const { setAuthenticated, setAccessOject } = useAppContext();

  const LoginSchema4 = Yup.object().shape({
    email: Yup.string().required("required"),
    password: Yup.string().required("required"),
  });

  return (
    <div className="hold-transition login-page">
      <div class="login-box">
        <div class="card card-outline" style={{ 
          borderTop:'3px solid #007bff'
         
        }}>
          <div class="card-header text-center" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           
            <img
              src={Logo}
              alt="Logo"
              style={{ opacity: "0.8", width: "25%", height: "50px" }}
            />
           <p class="h3">
              <b>House-Fix</b>
            </p>
          </div>
          <div class="card-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema4}
              onSubmit={async (values) => {
                setButtonLoader(true);
                console.log("Login=====>", values);
                try {
                  const { data } = await DataServices.Login(values);
                  console.log("response::: ", data?.status);
                  if (data?.status) {
                    setAuthenticated(true);
                    toast.success(data?.message);
                    console.log("data?.data?",data?.data?.data._id)
                    sessionStorage.setItem("user", JSON.stringify(data?.data?.data._id));
                    sessionStorage.setItem("role", data?.data?.role);

                    // axiosInstance.defaults.headers.token = data?.data?.token;
                    history("/dashboard");
                   
                    setButtonLoader(false);
                  } else {
                    toast.warning(data?.message);
                    setButtonLoader(false);
                  }
                } catch (e) {
                  console.log("e::: ", e);
                  if (e?.response?.data.statusCode === 400) {
                    console.log("else::: ");
                    toast.warning(e?.response?.data.message);
                    setButtonLoader(false);
                  }
                }
              }}
            >
              {({ touched, errors, isSubmitting, values }) => (
                <div>
                  <Form>
                    <div class="input-group mb-3">
                      <Field
                        type="email"
                        name="email"
                        className={`form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                        placeholder="Email"
                      />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <MailRoundedIcon />
                        </div>
                      </div>
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <Field
                        type="password"
                        name="password"
                        className={`form-control
                          ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                        placeholder="Password"
                      />
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <LockRoundedIcon />
                        </div>
                      </div>
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                    </div>
                    <p
                      className="mb-0"
                      style={{
                        textAlign: "end",
                        color: "#25124d",
                        cursor: "pointer",
                      }}
                      onClick={() => history("/forgot-password")}
                    >
                      Forgot Password?
                    </p>

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
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
