const { readFileData } = require('../servives');
class questionModel {
  constructor({ type, subject, description, score }) {
    this.id = this.createId();
    this.type = type; // 题型（客观/主观）
    this.subject = subject; // 题干
    this.score = score; // 分数
    this.description = description; // 描述
  }
  // 生成 id
  createId() {
    let id = 0;
    const data = readFileData().map(i => i.id);
    if (!data.length) return id;

    return Math.max(...data) + 1;
  }
}

module.exports = questionModel;
