const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../db/data.json');

/**
 * @description 读取文件数据
 */
function readFileData() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

/**
 * @description 写入文件（写入数据）
 */
function writeFileData(content) {
  fs.writeFileSync(dataPath, content);
}

module.exports = {
  readFileData,
  writeFileData
};
