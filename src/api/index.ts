import request from "@/util/request";

type Param = Record<string, any>
export const BenGet = <T>(api: API_URL, query: Param) => {
  return request.get<T>(api, {
    params: query
  });
};


export enum API_URL {
    getUsers = '/api/getUsers',
    getRouters = '/api/getRouters'
}