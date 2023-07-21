import request from "@/util/request";

type Param = Record<string, any>
interface Resp {
  code: number
  message: string
}
export interface IPageParam {
  page: number
  pageSize: number
}

export interface IResult<T = any> {
  list: T[],
  total: number
}

type APIURL = API_URL | API_ROLE_URL
export const BenGet = <T>(api: APIURL, query: Param) => {
  return request.get<T>(api, {
    params: query
  });
};

export const BenPost = <T extends Resp>(api: APIURL, body: Param) => {
  return request.post<T>(api, body);
};
export enum API_URL {
    getUsers = '/api/getUsers',
    deleteUser = '/api/deleteUser',
    getUser = '/api/getUser',
    saveUser = '/api/saveUser',
    getRouters = '/api/getRouters'
}
export enum API_ROLE_URL {
  getRoles = '/api/getRoles',
  deleteRole = '/api/deleteRole',
  getRole = '/api/getRole',
  saveRole = '/api/saveRole'
}