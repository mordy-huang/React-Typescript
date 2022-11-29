interface GrobalState {
  isLogin: boolean;
  loginInfo: LoginInfo;
  loading: boolean;
}

interface LoginInfo {
  username: string;
  loginTime: string;
  avator: string;
}

interface ResponseBody<T> {
  success: boolean;
  msg: string;
  data: T;
}

interface LoginAccount {
  username: string;
  password: string;
}

export type { ResponseBody, LoginAccount, GrobalState, LoginInfo };
