import request from "@/util/request";

interface IUser {
  list: any[],
  total: number
}
interface IUserParam {
  page: number
  pageSize: number
}
export const getUsers = (query: IUserParam = { page: 1, pageSize: 20}) => {
  return request.get<IUser>(`/api/getUsers`, {
    params: query
  });
};


export const getRouters = () => {
  return request.get(`/api/getRouters`);
};
