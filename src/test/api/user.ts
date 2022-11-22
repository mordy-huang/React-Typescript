import request from '../_mocks_/request';

export function getUserName(userID:number) {
  return request(`/users/${userID}`).then((user:any):string => user.name);
}

