import axiosInstance from "./http-common";

class DataService {
  //   Login Services
  Login(data) {
    return axiosInstance.post("auth/loginProviderAndAdmin", data);
  }
  //customer
  GetAllProvider() {
    return axiosInstance.get("provider/allProvider");
  }
  UpdateProvider(data) {
    return axiosInstance.patch("provider/updateProvider", data);
  }
  UpdateAdmin(data) {
    return axiosInstance.patch("auth/changeAdminPassword", data);
  }
  FindProvider(data) {
    console.log("datafatch",data)
    return axiosInstance.post("/provider/findProviderById", data);
  }
  ProviderImage(data) {
    return axiosInstance.post("/auth/upload", data);
  }

}

const DataServices = new DataService();

export default DataServices;
