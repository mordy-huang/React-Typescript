import axios from "../utils/request";
export const testMockData = async () => {
  return await axios.get("/user/test");
};
