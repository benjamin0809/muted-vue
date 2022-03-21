import { cloneDeep } from "lodash-es";

export const arrayToTree = (arr: any) => {
  const list = cloneDeep(arr);
  let hash = {};
  let result: any[] = [];
  list.forEach((element) => {
    hash[element.id] = element;
  });

  list.forEach((element) => {
    if (element.pid === 0) {
      result.push(element);
    } else {
      if (hash[element.pid]) {
        if (!hash[element.pid].children) hash[element.pid].children = [];
        hash[element.pid].children.push(element);
      }
    }
  });

  return result
};
