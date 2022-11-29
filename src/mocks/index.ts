import { LoginAccount } from "@/types";
import Mock from "mockjs";

const Random = Mock.Random;
Mock.mock("/mock/user/validateAccount", "post", (data) => {
  let response;
  const requestData:LoginAccount =  JSON.parse(data.body);  
  if (requestData.password === "123456") {
    const res = Mock.mock({
      username: "@cname",
      loginTime: "@now()",
      avator:Random.image('100x100', Random.color(), '@cname')
    });
    response = {
        data:res,
        success:true,
        msg:"ok"
    };
  } else {
    response = {
        success:false,
        msg: "password error",
    };
  }
  return response;
});

Mock.mock("/mock/user/test", "get", () => {
  const res = Mock.mock({
    username: "@cname",
    time: "@now()",
  });
  return {
    data: res,
    msg:"ok"
  };
});
