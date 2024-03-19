import axios from "axios";
let AuthToken = sessionStorage.getItem("token");
console.log("token::: ", AuthToken);
//  export const BASEURL = "http://54.175.30.202:5500/";
export const BASEURL = "http://localhost:5500/";

const Headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  token: AuthToken,
};

const axiosInstance = axios.create({
  baseURL: `${BASEURL}api/`,
  headers: Headers,
});
export default axiosInstance;
