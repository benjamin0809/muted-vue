
interface BaseDto {
    id: number
}
interface IData<T> {
    list: T[];
    total: number;
  }
class BaseService<T extends BaseDto, C> {
  mockData: IData<T> = {
    list: [],
    total: 0
  };
  constructor() {}
  delete(id: number) {
    const idx = this.mockData.list.findIndex((item) => item.id === id);
    if(idx > -1) {
        this.mockData.list.splice(idx, 1);
    } else {
        throw new Error(`can not find target id is ${id}`)
    }
  }
  update(dto: T) {
    if (!dto.id) {
        throw new Error('id is empty')
    }
    const target = this.mockData.list.find(item => item.id === dto.id);
    if(target){
        Object.assign(target, dto)
    } else {
        throw new Error(`can not find target id is ${dto.id}`)
    }
  }
  add(dto: C) {
    const lastTarget = this.mockData.list.at(-1);
    const id = lastTarget?.id! + 1;
    const obj = Object.assign({}, dto, { id });
    this.mockData.list.push(obj as any);
  }
  get(id: number) {
    if (!id) {
        throw new Error('id is empty')
    }
    const target = this.mockData.list.find(item => item.id == id);
    if(target){
        return target
    } else {
        throw new Error(`can not find target id is ${id}`)
    }
  }


}
export default BaseService;
