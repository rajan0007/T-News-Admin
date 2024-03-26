import React, { useRef, useState } from "react";
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
import user_icon from "../img/user.png";
import DataServices from "../services/requestApi";
import { toast } from "react-toastify";
import Edit from "@mui/icons-material/Edit";

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
  const [isEdit, setIsEdit] = React.useState(false);
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
        console.log("dataTable.dataRows :::", response.data.data);
        setTableData(response.data.data);
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
    setImage(item.image);
    setOpenValue(2);
  };

  const openAddTournament = (value) => {
    console.log("imageFile :::", imageFile);
    setImageFile();
    setIsEditDataImage1(false);
    setRowValue();
    console.log("openAddTournament :::", value);
    setShowPage(true);
    setImage(null);
    setOpenValue(value);
  };

  const updateTournament = async (value) => {
    setbuttonLoader(true);
    const dto = {
      id: rowValue._id,
      title: value.title,
      desc: value.desc,
    };
    try {
      const { data } = await DataServices.UpdateBlog(dto);
      if (data?.status) {
        toast.success(data?.message);
        setIsEdit(false);
        setShowPage(false);
        getBranch();
        setbuttonLoader(false);
      } else {
        toast.warning(data?.message);
      }
      setbuttonLoader(false);
    } catch (e) {
      console.log("e::: ", e);
    }
  };

  const addNewTournament = async (value) => {
    const { data } = await DataServices.addBlog(value);
    console.log("data::: ", data.data._id);
    if (data?.status) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("id", data?.data._id);
      try {
        const { data } = await DataServices.blogImage(formData);
        console.log("data::: ", data);
        if (data?.status) {
          toast.success(data?.message);
          setIsEdit(true);
          setShowPage(false);
          getBranch();
          setbuttonLoader(false);
        } else {
          toast.warning(data?.message);
        }
      } catch (error) {}
    }
    setbuttonLoader(false);
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
    axios.post(`${BASEURL}/api/blog/deleteBlog`, body).then((res) => {
      console.log(res);
      if (res.data.status) {
        setAlert(null);
        toast.success(res?.data?.message);
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

  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      setSelectedImage(selectedImage);
      reader.readAsDataURL(selectedImage);
      const formData = new FormData();

      if (openValue == 2) {
        formData.append("file", selectedImage);
        formData.append("id", rowValue._id);
        try {
          const { data } = await DataServices.blogImage(formData);
          if (data?.status) {
            toast.success(data?.message);
            setIsEdit(false);
            getBranch();
          } else {
            toast.warning(data?.message);
          }
        } catch (error) {}
      }
    }
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
                  desc: rowValue ? rowValue?.desc : "",
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
                      <div className="row">
                        <div className="col-9">
                          <div className="form-group">
                            <label htmlFor="password" className="mt-3">
                              Title
                            </label>
                            <Field
                              type="text"
                              name="title"
                              disabled={!isEdit}
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
                              disabled={!isEdit}
                              name="desc"
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
                        </div>
                        <div
                          className="col-3"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
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
                                    onClick={() => fileInputRef.current.click()}
                                  >
                                    {!isEdit ? "Edit" : "Add"}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "end",
                        }}
                      >
                        {!isEdit && (
                          <button
                            className="btn btn-primary"
                            onClick={() => setIsEdit(true)}
                          >
                            Edit
                          </button>
                        )}
                        {isEdit && (
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
                        )}
                        <div>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              setShowPage(false);
                              setIsEdit(true);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
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
            <div className="row pl-4 pr-4 pt-4">
              <div className="col-5">
                <button
                  style={{ width: "118px" }}
                  onClick={() => {
                    openAddTournament(1);
                    setIsEdit(true);
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
                  <b>Blog List</b>
                </h3>
              </div>
            </div>

            <div class="card-body" style={{ overflow: "scroll" }}>
              <table id="" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>SrNo</th>

                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <>
                  <tbody>
                    {!loader ? (
                      <>
                        {tableData?.length > 0 ? (
                          <>
                            {tableData?.map((item, index) => (
                              <>
                                <tr key={index}>
                                  <td>{index + 1 + pagination.start}</td>

                                  <td>{item.title}</td>
                                  <td>{item.desc}</td>
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
