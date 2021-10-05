/**
 * @description 数据校验器
 * @param {object} data 校验的数据
 * @param {array} validKeys  校验的参数
 */

function validator(data, validKeys) {
  let valid = true;
  let validKey = '';
  for (let index = 0; index < validKeys.length; index++) {
    const key = validKeys[index];
    if (data[key] || data[key] == 0) continue; //  校验有值就结束本次
    valid = false;
    validKey = key;
  }
  return {
    valid,
    validKey
  };
}

module.exports = {
  validator
};
