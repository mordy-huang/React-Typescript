import axios from "axios";
const request = axios.create();
request.defaults.baseURL = "/mock/";
request.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    if (error.response.status == 504 || error.response.status == 404) {
      console.log(error);
    } else if (error.response.status == 403) {
      console.log(error);
    } else {
      console.log(error);
    }
    console.log("fetch error", error.name, error.message);
    if (error.name == "ResponseError") {
      throw error;
    }
    throw new Error("server_not_available");
  }
);
export default request;
