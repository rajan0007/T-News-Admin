import axiosInstance from "./http-common";

class DataService {
  Login(data) {
    return axiosInstance.post("auth/loginAdmin", data);
  }
  TokenVerify() {
    return axiosInstance.get("/auth/token-verify");
  }

  //Admin
  GetAllAdmin() {
    return axiosInstance.get("auth/all-admin");
  }
  UpdateAdmin(data) {
    return axiosInstance.patch("auth/changeAdminPassword", data);
  }
  UpdateAdmin(data) {
    return axiosInstance.patch("auth/updateAdminProfile", data);
  }
  AddAdmin(data) {
    return axiosInstance.post("auth/addAdmin", data);
  }
  DeleteAdmin(data) {
    return axiosInstance.post("auth/deleteAdmin", data);
  }

  //Blog
  addBlog(data) {
    return axiosInstance.post("blog/addBlog", data);
  }
  blogImage(data) {
    return axiosInstance.post("/blog/uploadImageBlog", data);
  }
  UpdateBlog(data) {
    return axiosInstance.patch("blog/updateBlog", data);
  }
}

const DataServices = new DataService();

export default DataServices;
