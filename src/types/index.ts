export interface GrobalState {
  isLogin: boolean;
  loginInfo: LoginInfo;
  loading: boolean;
}

export interface LoginInfo {
  username: string;
  loginTime: string;
  avator: string;
}

export interface ResponseBody<T> {
  success: boolean;
  msg: string;
  data: T;
}

export interface LoginAccount {
  username: string;
  password: string;
}

export interface TodoItem {
  name:string;
  id:string;
}
