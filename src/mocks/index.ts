import Mock from 'mockjs';


Mock.mock('user/validateAccount', 'post', (username: string, password: string) => {
  let response;
  if (password === "123456") {
    const res = Mock.mock({
      username: "@cname",
      loginTime: '@now()'
    })

    response = {
      status: 200,
      data: res
    }
  }
  else {
    response = {
      status: 500,
      data: {
        msg: "password error"
      }
    }
  }
  return response;
}
)


Mock.mock('/user/test', 'get', () => {
    const res = Mock.mock({
      username: "@cname",
      time: '@now()'
    })

    return  {
      status: 200,
      data: res
    }
}
)
// export default Mock;
// Mock.mock('/user/test', 'get', () => {
//   const res = mock.mock({
//     username: "@cname",
//     time: '@now()'
//   })

//   return  {
//     status: 200,
//     data: res
//   }
// }
// );