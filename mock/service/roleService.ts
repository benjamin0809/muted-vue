import BaseService from "./baseService";
import Mock from "mockjs";
import type { IRole } from '@shared/types'
type ICreateRoleDto = Omit<IRole, "id">;
class roleService extends BaseService<IRole, ICreateRoleDto> {
  constructor() {
    super();
    this.mockData = this.generate()
  }
  getList(query) {
    const page = ~~query.page || 1;
    const pageSize = ~~query.pageSize || 20;
    const mockObj = { total: 500, list: [] as IRole[] };

    let datalist = this.mockData.list.slice();
    if (query.name) {
      datalist = datalist.filter((item) => item.name.indexOf(query.name) > -1);
      mockObj.total = datalist.length;
    }
    if (query.permission) {
      datalist = datalist.filter(
        (item) => item.permission.includes(query.permission)
      );
      mockObj.total = datalist.length;
    }
    if (query.orgId) {
      datalist = datalist.filter(
        (item) => item.orgId.indexOf(query.orgId) > -1
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
        orgId: "@id",
        permission: "@id",
        date: "@date",
      },
    ];
    return Mock.mock(mockObj);
  }
}

export default roleService