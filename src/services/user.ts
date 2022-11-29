import axios from "../utils/request";
export const testMockData = async () => {
  return await axios.get("/user/test");
};

export const validateAccountRequest = async  (username:string,password:string)=> {
  return  await axios.post(`/user/validateAccount`, {
    username: username,
    password: password,
  })
};

