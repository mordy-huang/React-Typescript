import axios from "axios";
const request = axios.create();
// request.defaults.baseURL = "/api/";
request.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    if (error.response.status == 504||error.response.status == 404) {
    } else if (error.response.status == 403) {
    }else {
    }
    console.log("fetch error", error.name, error.message);
    if (error.name == "ResponseError") {
      throw error;
    }
    throw new Error("server_not_available");
  }
);
export default request;
