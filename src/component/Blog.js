import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Loader from "../Loader/Loader";
import CloseIcon from "@mui/icons-material/Close";
import FileUpload from "react-drag-n-drop-image";
import { BASEURL } from "../config";

function CustomBody() {
  return (
    <div
      className="drag-file-area mt-0"
      style={{
        border: "0px",
        borderRadius: "0px",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <CloudDownloadIcon style={{ fontSize: "50px" }} />
      </div>
      <h3 className="dynamic-message" style={{ fontFamily: "Montserrat" }}>
        Drag &amp; drop any file here
      </h3>
      <label className="">
        <span className="">
          <span
            className="browse-files-text"
            style={{
              fontFamily: "Montserrat",
              color: "#539ffe",
            }}
          >
            browse file
          </span>
          <span style={{ fontFamily: "Montserrat" }}>from device</span>
        </span>
      </label>
    </div>
  );
}

function ShowData({ files, onRemoveImage }) {
  return (
    <div className="">
      {files.map((item) => {
        return (
          <>
            <div
              className="drag-file-area mt-0"
              style={{
                border: "0px",
                borderRadius: "0px",
                position: "relative",
              }}
            >
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <div style={{ height: "200px", width: "200px" }} className="">
                  <img
                    src={item.preview}
                    alt="Image preview..."
                    height="100%"
                    width="100%"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <CloseIcon
                  style={{
                    cursor: "pointer",
                    color: "red",
                    position: "absolute",
                    right: 10,
                    top: 10,
                  }}
                  // onClick={() => {
                  //   setDragImage2(true);
                  //   setImage2(null);
                  // }}
                  onClick={() => onRemoveImage(item.id)}
                />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default function Blog() {
  const [showPage, setShowPage] = useState(false);
  const [alert, setAlert] = React.useState(null);
  const [tableData, setTableData] = React.useState([]);
  const [rowValue, setRowValue] = React.useState();
  const [openValue, setOpenValue] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [showPrePage, setShowPrePage] = React.useState(10);
  const [imageFile, setImageFile] = React.useState();
  const [buttonLoader, setbuttonLoader] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [showImages, setShowData] = React.useState(false);
  const [isEditDataImage1, setIsEditDataImage1] = React.useState(false);
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

  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("required"),
    desc: Yup.string().required("required"),
   
  });

  React.useEffect(() => {
    getBranch();
  }, []);

  const getBranch = () => {
    setLoader(true);
    axios(`${BASEURL}/api/blog/allBlog`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        setLoader(false);
        console.log("dataTable.dataRows :::", response.data);
        setTableData(response.data.message);
      })
      .catch((error) => {
        console.log("getBranch error :::", error);
      });
  };

  const IsEditOnRemoveImage = () => {
    setShowData(false);
    console.log("isEditOnRemove::: ");
    //  setFiles((prev) => prev.filter((i) => i.id !== id));
    setFiles([]);
    setIsEditDataImage1(false);
  };

  const onRemoveImage = (id) => {
    setShowData(false);
    setFiles((prev) => prev.filter((i) => i.id !== id));
  };

  const onError = (error) => {
    console.error(error);
  };

  const onChange = (e) => {
    if (files.length === 0) {
      console.log(e[0].file.name, "true");
      setShowData(true);
      console.log("e[0].file::: ", e[0].file);
      setImageFile(e[0].file);
      setFiles(e);
    }
  };

  const clickEditButton = (item) => {
    setShowPage(true);
    setIsEditDataImage1(true);
    console.log("item edit value :::", item.imageUrl);
    setRowValue(item);
    setOpenValue(2);
  };

  const openAddTournament = (value) => {
    console.log("imageFile :::", imageFile);
    setImageFile();
    setIsEditDataImage1(false);
    setRowValue();
    console.log("openAddTournament :::", value);
    setShowPage(true);
    setOpenValue(value);
  };

  const updateTournament = (value) => {
    let merged = { ...value, id: rowValue._id };
    console.log("updateTournament merged value :::", merged);

    if (imageFile) {
      console.log("imageFile :::", imageFile);
      console.log("rowValue :::", rowValue);
      const imageUrl1 = rowValue.imageUrl;
      const splitData1 = imageUrl1.split("/");
      const fileWithNewName1 = new File(
        [imageFile],
        splitData1[splitData1.length - 1],
        {
          type: imageFile.type,
        }
      );
      console.log("fileWithNewName1::: ", fileWithNewName1);

      let img1FormData = new FormData();
      img1FormData.append("image", fileWithNewName1);
      console.log("image_1_response :::", img1FormData);

      axios(`${BASEURL}/api/banner/upload-banner`, {
        method: "POST",
        credentials: "include",
        data: img1FormData,
      })
        .then((result) => {
          console.log("handleSubmit result :::", result.data);
          if (result.data.isValid) {
            axios
              .post(`${BASEURL}/api/banner/update-banner`, merged)
              .then((res) => {
                console.log("update :::", res.data);
                if (res.data.isValid) {
                  successAdd(result.data.message);
                  setbuttonLoader(false);
                } else {
                  warningAlert();
                  setbuttonLoader(false);
                }
              })
              .catch((err) => {
                setbuttonLoader(false);
                console.log("update err :::", err);
                warningAlert();
              });
          }
        })
        .catch((err) => {
          console.log("handleSubmit err :::", err);
        });
    } else {
      axios
        .post(`${BASEURL}/api/banner/update-banner`, merged)
        .then((res) => {
          console.log("update :::", res.data);
          if (res.data.isValid) {
            successAdd(res.data.message);
            setbuttonLoader(false);
          } else {
            warningAlert();
            setbuttonLoader(false);
          }
        })
        .catch((err) => {
          setbuttonLoader(false);
          console.log("update err :::", err);
          warningAlert();
        });
    }
  };

  const addNewTournament = (value) => {
    console.log("imageFile ---", imageFile, value);

    // const formData = new FormData();
    // formData.append("image", imageFile);

    // change image file name
    const file = imageFile;
    let originalFileName = imageFile.name.split(".");
    let fileName =
      new Date() + "." + originalFileName[originalFileName.length - 1];
    const fileWithNewName = new File([file], fileName, { type: file.type });

    const formData = new FormData();
    formData.append("image", fileWithNewName);
    // end change image file name

    axios(`${BASEURL}/api/banner/upload-banner`, {
      method: "POST",
      credentials: "include",
      data: formData,
    })
      .then((result) => {
        console.log("handleSubmit result :::", result.data);
        if (result.data.isValid) {
          let merged = { ...value, imageName: fileName };
          console.log("merged value :::", merged);

          axios(`${BASEURL}/api/banner/add-banner`, {
            method: "POST",
            credentials: "include",
            data: merged,
          })
            .then((result) => {
              console.log("handleSubmit result :::", result.data.message);
              if (result.data.isValid) {
                setbuttonLoader(false);

                successAdd(result.data.message);
              } else {
                warningAlert();
                setbuttonLoader(false);
              }
            })
            .catch((err) => {
              console.log("handleSubmit err :::", err);
              warningAlert();
            });
        }
      })
      .catch((err) => {
        console.log("handleSubmit err :::", err);
      });
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

  const successDeleted = () => {
    console.log("donw");
    setAlert(
      <SweetAlert
        success
        style={{ display: "block" }}
        title="Deleted!"
        onConfirm={() => {
          getBranch();
          setAlert(null);
          // setIsPlayerEditButtonClicked(false);
        }}
        confirmBtnBsStyle="success"
      >
        Your Player Record has been deleted
      </SweetAlert>
    );
  };

  const deleteData = (e) => {
    console.log("e===>", e._id);
    const body = {
      id: e._id,
    };
    axios.post(`${BASEURL}/api/banner/delete-banner`, body).then((res) => {
      console.log(res);
      if (res.data.isValid) {
        successDeleted();
      }
      getBranch();
    });
  };

  const successAdd = (msg) => {
    console.log("donw");
    setAlert(
      <SweetAlert
        success
        style={{ display: "block" }}
        title={msg}
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

  const successEdit = () => {
    console.log("donw");
    setAlert(
      <SweetAlert
        success
        style={{ display: "block" }}
        title="Edited successfully!"
        onConfirm={() => {
          getBranch();
          setAlert(null);
          setShowPage(false);
          // setIsPlayerEditButtonClicked(false);
        }}
        confirmBtnBsStyle="success"
      >
        Your Player Record has been Edited ...
      </SweetAlert>
    );
  };

  const warningAlert = () => {
    console.log("donw");
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block" }}
        title="Something Went Wrong .....!"
        onConfirm={() => {
          //  getBranch();
          setAlert(null);
          //  setShowPage(false);
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
                  title: rowValue ? rowValue?.title : "",
                  desc: rowValue ? rowValue?.desc :"",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  setbuttonLoader(true);
                  console.log(values);

                  if (openValue == 1) {
                    console.log("update formik value :::", openValue);
                    addNewTournament(values);
                  }
                  if (openValue == 2) {
                    console.log("update formik value :::", openValue);
                    updateTournament(values);
                  }
                }}
              >
                {({ touched, errors, isSubmitting, values }) => (
                  <div>
                    <Form>
                      <div className="form-group">
                        <label htmlFor="password" className="mt-3">
                          Title
                        </label>
                        <Field
                          type="text"
                          name="title"
                          placeholder="Enter title"
                          className={`mt-2 form-control
                          ${touched.title && errors.title ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="title"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" className="mt-3">
                        Description
                        </label>
                        <Field
                          type="text"
                          name="des"
                          placeholder="Enter desc"
                          className={`mt-2 form-control
                          ${touched.desc && errors.desc ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="desc"
                          className="invalid-feedback"
                        />
                      </div>
                      
                      {isEditDataImage1 ? (
                        <div className="file-upload-box">
                          <div
                            className="drag-file-area mt-0"
                            style={{
                              border: "0px",
                              borderRadius: "0px",
                              position: "relative",
                            }}
                          >
                            <div
                              className="d-flex"
                              style={{ justifyContent: "center" }}
                            >
                              <div
                                style={{ height: "200px", width: "200px" }}
                                className=""
                              >
                                <img
                                  src={rowValue?.imageUrl}
                                  alt="preview..."
                                  height="100%"
                                  width="100%"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <CloseIcon
                                style={{
                                  cursor: "pointer",
                                  color: "red",
                                  position: "absolute",
                                  right: 10,
                                  top: 10,
                                }}
                                onClick={() => IsEditOnRemoveImage()}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="file-upload-box">
                          {showImages ? (
                            <ShowData
                              files={files}
                              onRemoveImage={onRemoveImage}
                            />
                          ) : (
                            <FileUpload
                              onError={onError}
                              body={<CustomBody />}
                              overlap={false}
                              fileValue={files}
                              onChange={(e) => onChange(e)}
                            />
                          )}
                        </div>
                      )}
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
            </Box>
          </div>
        </div>
      ) : (
        <div className="content p-3">
          <div class="card ">
            <div className="row pl-4 pr-4 pt-4">
              <div className="col-5">
                <button
                  style={{ width: "118px" }}
                  onClick={() => {
                    openAddTournament(1);
                  }}
                  type="button"
                  className="btn btn-primary btn-block "
                >
                  <AddIcon />
                  Add New
                </button>
              </div>
              <div className="col-7">
                <h3 class="card-title">
                  <b>Banner List</b>
                </h3>
              </div>
            </div>

            <div class="card-body" style={{ overflow: "scroll" }}>
              <table id="" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>SrNo</th>
                    <th>url</th>
                    <th>location</th>
                    <th>type</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <>
                  <tbody>
                    {!loader ? (
                      <>
                        {tableData.length > 0 ? (
                          <>
                            {tableData
                             
                              .map((item, index) => (
                                <>
                                  <tr key={index}>
                                    <td>{index + 1 + pagination.start}</td>
                                    <td>{item.url}</td>
                                    <td>{item.location}</td>
                                    <td>{item.type}</td>
                                    <td>{item.status}</td>
                                    <td className="d-flex justify-content-evenly ">
                                      <EditIcon
                                        className="mr-3 courser"
                                        onClick={() => clickEditButton(item)}
                                      />

                                      <ClearIcon
                                        className="courser text-danger"
                                        onClick={() =>
                                          warningWithConfirmMessage(item)
                                        }
                                      />
                                    </td>
                                  </tr>
                                </>
                              ))}
                          </>
                        ) : (
                          <>
                            <tr
                              style={{ backgroundColor: "whitesmoke" }}
                              className="text-center"
                            >
                              <td colSpan={6}>
                                <h5>No Data Available</h5>
                              </td>
                            </tr>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </tbody>
                </>
              </table>

              <div className="mt-4">{loader && <Loader />}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
