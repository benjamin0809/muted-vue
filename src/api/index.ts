import request from "@/util/request";

type Param = Record<string, any>
interface Resp {
  code: number
  message: string
}
export const BenGet = <T>(api: API_URL, query: Param) => {
  return request.get<T>(api, {
    params: query
  });
};

export const BenPost = <T extends Resp>(api: API_URL, body: Param) => {
  return request.post<T>(api, body);
};

export enum API_URL {
    getUsers = '/api/getUsers',
    deleteUser = '/api/deleteUser',
    getUser = '/api/getUser',
    saveUser = '/api/saveUser',
    getRouters = '/api/getRouters'
}