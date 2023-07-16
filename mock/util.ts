export const generateData = (data) => {
  return {
    code: 0,
    message: "ok",
    data,
  };
};

export const generateErrorData = (errMsg, errCode) => {
    return {
      code: errCode,
      message: errMsg,
      data: []
    };
  };


export const tryOnExecute = (fn) => {
  try {
    const res = fn();
    return generateData(res)
  } catch (e) {
    return generateErrorData(e.message, 500)
  }
};

export function delay(miles: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, miles);
  });
}
