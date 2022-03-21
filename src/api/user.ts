import request from "@/util/request";

export const getUsers = () => {
  return request.get(`/api/getUsers`);
};


export const getRouters = () => {
  return request.get(`/api/getRouters`);
};
