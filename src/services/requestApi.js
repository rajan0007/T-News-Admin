import axiosInstance from "./http-common";

class DataService {
  Login(data) {
    return axiosInstance.post("auth/loginProviderAndAdmin", data);
  }

  UpdateAdmin(data) {
    return axiosInstance.patch("auth/changeAdminPassword", data);
  }

  //Customer
  GetUser() {
    return axiosInstance.get("auth/all-user");
  }
  UpdateCustomer(data) {
    console.log("data", data);
    return axiosInstance.patch("auth/updateUserProfile", data);
  }
  DeleteCustomer(data) {
    console.log("data", data);
    return axiosInstance.post("auth/deleteUser", data);
  }

  //Provider
  GetAllProvider() {
    return axiosInstance.get("provider/allProvider");
  }
  UpdateProvider(data) {
    return axiosInstance.patch("provider/updateProvider", data);
  }
  DeleteProvider(data) {
    return axiosInstance.post("provider/deleteProvider", data);
  }
  FindProvider(data) {
    return axiosInstance.post("/provider/findProviderById", data);
  }
  ProviderImage(data) {
    return axiosInstance.post("/auth/upload", data);
  }
  GetProviderBooking(data) {
    return axiosInstance.post("/booking/getProviderById", data);
  }

  //Booking
  Booking() {
    return axiosInstance.get("/booking/allBooking");
  }

  //Admin
  GetAllAdmin() {
    return axiosInstance.get("auth/all-admin");
  }
  DeleteAdmin(data) {
    return axiosInstance.post("auth/deleteAdmin", data);
  }
  UpdateAdmin(data) {
    return axiosInstance.patch("auth/updateAdminProfile", data);
  }
  AddAdmin(data) {
    return axiosInstance.post("auth/addAdmin", data);
  }
}

const DataServices = new DataService();

export default DataServices;
