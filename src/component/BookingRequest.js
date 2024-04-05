import React, { useEffect, useRef, useState } from "react";
import DataServices from "../services/requestApi";
import { toast } from "react-toastify";
import axios from "axios";
import { BASEURL } from "../config";
import SweetAlert from "react-bootstrap-sweetalert";
import { Modal } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../Loader/Loader";
export default function BookingRequest() {
  const [tableData, setTableData] = useState([]);
  const [alert, setAlert] = React.useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [info, setInfo] = useState([]);
  const [loader, setLoader] = React.useState(false);
  const [rowValue, setRowValue] = useState([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const handelSubmitOtp = async () => {
    setIsLoading(true);
    console.log(otp);
    const hasEmptyString = otp.some((value) => value === "");
    console.log(!hasEmptyString);
    if (!hasEmptyString) {
      console.log("true");
      const data = {
        id: rowValue._id,
        otp: parseInt(otp.join("")),
      };
      console.log("rowValue::: ", rowValue);

      console.log(data);

      await axios
        .post(`${BASEURL}/api/booking/verifyOtp`, data)
        .then((res) => {
          if (res?.data?.status) {
            console.log("res?.data?.status::: ", res?.data?.status);
            toast.success(res?.data?.message);
            setModalShow(false);
            getBookingReq();
          } else {
            toast.error(res.data?.message);
          }
        })
        .catch((err) => {});
    } else {
      toast.error("All fields required");
      setIsLoading(false);
    }
  };
  console.log("isLoading", isLoading);
  useEffect(() => {
    getBookingReq();
  }, []);

  const getBookingReq = async () => {
    setLoader(true);
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("user::: ", user);
    await axios
      .post(`${BASEURL}/api/booking/getProviderById`, {
        providerId: user,
      })
      .then((res) => {
        if (res.data) {
          setLoader(false);
          console.log("res.data:::>>>> ", res?.data?.data);
          setTableData(res?.data?.data);
        } else {
          toast.error(res.data?.message);
        }
      })
      .catch((err) => {});
  };

  // const verify = async (item) => {
  //   await axios
  //     .post(`${BASEURL}/api/booking/verifyOtp`)
  //     .then((res) => {
  //       if (res.data) {
  //         console.log("res.data::: ", res?.data?.data);
  //         setTableData(res?.data?.data);
  //         toast.success(res.data?.message);
  //       } else {
  //         toast.error(res.data?.message);
  //       }
  //     })
  //     .catch((err) => {});
  // };

  const sendOtp = async (item) => {
    setIsLoading(true);
    await axios
      .post(`${BASEURL}/api/booking/sendOtp`, {
        customerId: item.customerId._id,
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data?.message);
          setModalShow(true);
          setRowValue(item);
          setIsLoading(false);
        } else {
          toast.error(res.data?.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      {alert}
      <div className="content p-3">
        <div class="card ">
          <div class="pl-4 pr-4 pt-4">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <h4>Booking Request</h4>
              </div>
            </div>
          </div>

          <div class="card-body" style={{ overflow: "scroll" }}>
            <table id="" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>SrNo</th>
                  <th>User name</th>
                  <th>Service</th>
                  <th>Email</th>
                  <th>Professionals No</th>
                  <th>Ladder</th>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>time</th>
                  <th>Address</th>
                  <th>zipCode</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loader ? (
                ""
              ) : (
                <tbody>
                  {tableData.length == 0 ? (
                    <tr>
                      <td colSpan={15}>No data</td>
                    </tr>
                  ) : (
                    tableData?.map((item, i) => (
                      <>
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            {item?.customerId?.firstName}{" "}
                            {item?.customerId?.lastName}
                          </td>
                          <td>{item?.serviceName}</td>
                          <td>{item?.customerId.email}</td>
                          <td>{item?.providerId.length || "-"}</td>
                          {/* <td>{item?.providerId.map((provider,i) => (<>{i+1} - {provider.firstName}<br/></>))}</td> */}
                          <td>{item?.ladder || "-"}</td>
                          <td>{item?.date || "-"}</td>
                          <td>{`${item.totalHour} /hr ` || "-"}</td>
                          <td>{item?.time || "-"}</td>
                          <td>{item?.customerId?.address || "-"}</td>
                          <td>{item?.zipcode || "-"}</td>
                          <td>
                            <button
                              className={`btn ${
                                item?.status === "Success"
                                  ? "btn-outline-success"
                                  : "btn-outline-secondary"
                              }`}
                              disabled={
                                item?.status === "Success" ||
                                item?.status === "Pending"
                              }
                            >
                              {item?.status === "Success"
                                ? "Success"
                                : item?.status === "Pending"
                                ? "Pending"
                                : "Pending"}
                            </button>
                          </td>
                          {item?.status !== "Success" && (
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={async () => await sendOtp(item)}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <span
                                    className="spinner-border spinner-border-sm text-light"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                ) : (
                                  "Confirm"
                                )}
                              </button>
                            </td>
                          )}
                          {item?.status != "Pending" && (
                            <td>
                              <div className="d-flex justify-content-center">
                                <VisibilityIcon
                                  className="courser"
                                  style={{ color: "#dc3545" }}
                                  onClick={() => {
                                    setModalShow1(true);
                                    setInfo(item);
                                  }}
                                />
                              </div>
                            </td>
                          )}
                        </tr>
                      </>
                    ))
                  )}
                </tbody>
              )}
            </table>
            <div className="mt-4">{loader && <Loader />}</div>
          </div>
        </div>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ margin: "0px" }}
          >
            otp verify
          </Modal.Title>
          <div>
            <ClearIcon
              className="courser"
              onClick={() => setModalShow(false)}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <div className="col-lg-12 text-center">
              <div
                className=""
                style={{
                  flexDirection: "row",
                  columnGap: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                    ref={(reference) =>
                      (otpBoxReference.current[index] = reference)
                    }
                    style={{ height: "45px", width: "44px" }}
                    className={`border w-12 h-12 text-4xl text-black p-3 rounded-md block bg-light focus:border-2 focus:outline-none appearance-none text-center`}
                  />
                ))}
              </div>

              <p
                className={`text-lg text-white mt-4 ${
                  otpError ? "error-show" : ""
                }`}
              >
                {otpError}
              </p>

              <button
                type="button"
                onClick={() => handelSubmitOtp()}
                className="mb-4 btn btn-primary w-100"
              >
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow1}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ margin: "0px" }}
          >
            Customer Details
          </Modal.Title>
          <div>
            <ClearIcon
              className="courser"
              onClick={() => setModalShow1(false)}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {console.log("info", info)}
          <div className="">
            {console.log("info", info)}
            <div className="card mt-2" style={{ width: "20rem" }}>
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
                  Name : &nbsp;{info?.customerId?.firstName || "-"}{" "}
                  {info?.customerId?.lastName || "-"}
                </h5>
                <h6
                  className="card-subtitle mb-2 text-body-secondary mt-3"
                  style={{ fontSize: "16px" }}
                >
                  Email : &nbsp;{info?.customerId?.email || "-"}
                </h6>
                <h6
                  className="card-subtitle mb-2 text-body-secondary mt-3"
                  style={{ fontSize: "16px" }}
                >
                  Phone No. : &nbsp;{info?.customerId?.phoneNo || "-"}
                </h6>
                <p className="card-subtitle mb-2 text-body-secondary mt-3">
                  <span style={{ fontWeight: "600" }}>Address :</span> &nbsp;
                  {info?.customerId?.address || "-"},&nbsp;
                  {info?.customerId?.city || "-"},&nbsp;
                  {info?.customerId?.state || "-"}
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
