import type { IUser } from '@shared/types'
import BaseService from "./baseService";
import Mock from "mockjs";


type ICreateUserDto = Omit<IUser, "id">;
class userService extends BaseService<IUser, ICreateUserDto> {
  constructor() {
    super();
    this.mockData = this.generate()
  }
  getList(query) {
    const page = ~~query.page || 1;
    const pageSize = ~~query.pageSize || 20;
    const mockObj = { total: 500, list: [] as IUser[] };

    let datalist = this.mockData.list.slice();
    if (query.name) {
      datalist = datalist.filter((item) => item.name.indexOf(query.name) > -1);
      mockObj.total = datalist.length;
    }
    if (query.address) {
      datalist = datalist.filter(
        (item) => item.address.indexOf(query.address) > -1
      );
      mockObj.total = datalist.length;
    }
    if (query.email) {
      datalist = datalist.filter(
        (item) => item.email.indexOf(query.email) > -1
      );
      mockObj.total = datalist.length;
    }
    if (query.date) {
      datalist = datalist.filter((item) => item.date.indexOf(query.date) > -1);
      mockObj.total = datalist.length;
    }
    datalist = datalist.slice((page - 1) * pageSize, page * pageSize);
    // 0 10 20 30
    mockObj.list = datalist;
    console.log(mockObj);
    return mockObj;
  }
  generate() {
    const mockObj = { total: 500 };
    const listKey = `list|500`;
    mockObj[listKey] = [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        name: "@name",
        //商品地址
        address: "@county(true)",
        avatar: "@Image('100x100','@color','小甜甜')",
        role: "",
        email: "@email",
        date: "@date",
      },
    ];
    return Mock.mock(mockObj);
  }
}

export default userService