import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { useAppContext } from "../../Lib/ContextLib";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import NewPass from "./NewPass";
import OtpFields from "./OtpFields";
import Logo from "../../img/Web_Swift_logo.png";
import MailRoundedIcon from "@mui/icons-material/MailRounded";

export default function ForgotPassword() {
  // const history = useNavigate();
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [otp, setOtp] = React.useState(false);
  const [resetPass, setResetpass] = React.useState(false);
  const [email, setEmail] = React.useState("");

  // const { setAuthenticated, setAccessOject } = useAppContext();

  const LoginSchema4 = Yup.object().shape({
    email: Yup.string().required("required"),
  });

  const setResetPassvalue = (value) => {
    setResetpass(value);
  };

  return (
    <div className="hold-transition login-page">
      <div class="login-box">
        <div class="card card-outline card-success">
          <div class="card-header text-center">
            {/* <a class="h1">
              <b>Casino</b>
            </a> */}
            <img
              src={Logo}
              alt="Logo"
              style={{ opacity: "0.8", width: "70%", height: "50px" }}
            />
          </div>
          <div class="card-body">
            <p class="login-box-msg">Forgot Password</p>
            {resetPass ? (
              <>
                <NewPass email={email} />
              </>
            ) : (
              <>
                {otp ? (
                  <OtpFields
                    email={email}
                    setResetPassvalue={setResetPassvalue}
                  />
                ) : (
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={LoginSchema4}
                    onSubmit={(values, { resetForm }) => {
                      // setOtp(true);
                      setButtonLoader(true);
                      setEmail(values);
                      axios(`${API_URL}/api/auth/forgot-password-email`, {
                        method: "POST",
                        credentials: "include",
                        data: values,
                      })
                        .then((result) => {
                          if (result.data.isValid) {
                            toast.success(result.data.message);
                            setOtp(true);
                            setButtonLoader(false);
                            resetForm();
                          } else {
                            toast.warning(result.data.message);
                            setButtonLoader(false);
                            resetForm();
                          }
                        })
                        .catch((err) => {
                          console.log("err::: ", err);
                        });
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

                          <button
                            style={{ width: "40%" }}
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
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
