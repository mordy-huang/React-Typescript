import axios from "../utils/request";

export const getTudoList = async ()=>{
  return  await axios.get(`/toduList/get`)
} 