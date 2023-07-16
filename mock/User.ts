import Mock from "mockjs";

interface IUser {
  id: number;
  name: string;
  address: string;
  role: string;
  avatar: string;
  email: string;
  date: string;
}
interface IData {
  list: IUser[];
  total: number;
}
type ICreateUserDto = Omit<IUser, "id">;
class User {
  #mockData: IData = this.generate();
  constructor() {}
  getList(query) {
    const page = ~~query.page || 1;
    const pageSize = ~~query.pageSize || 20;
    const mockObj = { total: 500, list: [] as IUser[] };

    let datalist = this.#mockData.list.slice();
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
  delete(id: number) {
    const idx = this.#mockData.list.findIndex((item) => item.id === id);
    if(idx > -1) {
        this.#mockData.list.splice(idx, 1);
    } else {
        throw new Error(`can not find target id is ${id}`)
    }
  }
  update(dto: IUser) {
    if (!dto.id) {
        throw new Error('id is empty')
    }
    const target = this.#mockData.list.find(item => item.id === dto.id);
    if(target){
        Object.assign(target, dto)
    } else {
        throw new Error(`can not find target id is ${dto.id}`)
    }
  }
  add(dto: ICreateUserDto) {
    const lastTarget = this.#mockData.list.at(-1);
    const id = lastTarget?.id! + 1;
    const obj = Object.assign({}, dto, { id });
    this.#mockData.list.push(obj);
  }
  get(id: number) {
    if (!id) {
        throw new Error('id is empty')
    }
    const target = this.#mockData.list.find(item => item.id == id);
    if(target){
        return target
    } else {
        throw new Error(`can not find target id is ${id}`)
    }
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
export default User;
