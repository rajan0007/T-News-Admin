import axios from "axios";
let AuthToken = sessionStorage.getItem("token");
console.log("token::: ", AuthToken);
 export const BASEURL = "https://house-fix-backend.vercel.app/";
// export const BASEURL = "http://192.168.1.14:5500/";

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
