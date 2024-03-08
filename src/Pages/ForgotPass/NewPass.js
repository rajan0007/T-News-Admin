import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function NewPass({ email }) {
  const history = useNavigate();
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const LoginSchemaResetPass = Yup.object().shape({
    newPass: Yup.string().required("required"),
    confirmPass: Yup.string().oneOf(
      [Yup.ref("newPass"), null],
      "Passwords must match"
    ),
  });
  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          newPass: "",
          confirmPass: "",
        }}
        validationSchema={LoginSchemaResetPass}
        onSubmit={(values, { resetForm }) => {
          setButtonLoader(true);
          const data = {
            password: values.newPass,
            email: email.email,
          };
          console.log("data::: ", data);
          axios(`${API_URL}/api/auth/forgot-password`, {
            method: "POST",
            credentials: "include",
            data: data,
          })
            .then((result) => {
              console.log("result::: ", result);
              if (result.data.isValid) {
                toast.success(result.data.message);
                setButtonLoader(false);
                history("/login");
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
          console.log(values);
          resetForm();
        }}
      >
        {({ touched, errors, isSubmitting, values }) => (
          <div>
            <Form>
              <div class="input-group mb-3">
                <Field
                  type="password"
                  name="newPass"
                  autoComplete="off"
                  className={`form-control
                          ${
                            touched.newPass && errors.newPass
                              ? "is-invalid"
                              : ""
                          }`}
                  placeholder="New Password"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <LockRoundedIcon />
                  </div>
                </div>
                <ErrorMessage
                  component="div"
                  name="newPass"
                  className="invalid-feedback"
                />
              </div>
              <div class="input-group mb-3">
                <Field
                  type="password"
                  name="confirmPass"
                  className={`form-control
                          ${
                            touched.confirmPass && errors.confirmPass
                              ? "is-invalid"
                              : ""
                          }`}
                  placeholder="Confirm Password"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <LockRoundedIcon />
                  </div>
                </div>
                <ErrorMessage
                  component="div"
                  name="confirmPass"
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
