import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { useAppContext } from "../../Lib/ContextLib";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function OtpFields({ email, setResetPassvalue }) {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    otp: Yup.string().required("required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          setButtonLoader(true);
          console.log(values, email);
          const data = {
            email: email.email,
            otp: values.otp,
          };

          axios(`${API_URL}/api/auth/forgot-password-otp`, {
            method: "POST",
            credentials: "include",
            data: data,
          })
            .then((result) => {
              console.log("result::: ", result);
              if (result.data.isValid) {
                toast.success(result.data.message);
                resetForm();
                setButtonLoader(false);
                setResetPassvalue(true);
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
                  type="number"
                  name="otp"
                  autoComplete="otp"
                  className={`form-control
                          ${touched.otp && errors.otp ? "is-invalid" : ""}`}
                  placeholder="OTP"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <LockRoundedIcon />
                  </div>
                </div>
                <ErrorMessage
                  component="div"
                  name="otp"
                  className="invalid-feedback"
                />
              </div>

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
  );
}
