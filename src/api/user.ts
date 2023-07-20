import request from "@/util/request";
import { IPageParam, IResult } from ".";
import type { IUser } from '@shared/types'

interface IUserParam extends IPageParam{}

export const getUsers = (query: IUserParam = { page: 1, pageSize: 20}) => {
  return request.get<IResult<IUser>>(`/api/getUsers`, {
    params: query
  });
};


export const getRouters = () => {
  return request.get(`/api/getRouters`);
};
