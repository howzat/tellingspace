const flatprint = (message: string, obj: Object) => {
  console.log(message, flattenObject(obj))
}

export default flatprint

// @ts-ignore
const flattenObject = (obj, prefix = '') => {
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object') {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    }
    else {
      // @ts-ignore
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {})
}