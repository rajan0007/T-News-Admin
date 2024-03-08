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
}

const DataServices = new DataService();

export default DataServices;
