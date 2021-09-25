const { validator } = require('../validator');
const QuestionModel = require('../model/questionModel');
const { readFileData, writeFileData } = require('../servives');

/**
 * @description 添加题目
 * @param {object} params 添加参数
 */
function addQuestion(params) {
  let p = params;
  p.description = p.description || '';
  const { valid, validKey } = validator(p, ['subject', 'type', 'score']);
  if (!valid) return { valid, validKey };
  const ques = new QuestionModel(params);
  const data = readFileData() || [];
  data.push(ques);
  writeFileData(JSON.stringify(data));
  return { valid, validKey };
}

/**
 * @description 删除题目
 * @param {number} id 删除的id
 */
function deleteQuestion(params) {
  const { valid, validKey } = validator(params, ['id']);
  if (!valid) return { valid, validKey };
  let data = readFileData() || [];
  data = data.filter(item => item.id != params.id);
  writeFileData(JSON.stringify(data));
  return { valid, validKey };
}

/**
 * @description 修改题目
 * @param {object} params 修改的参数
 */
function updateQuestion(params) {
  let p = params;
  p.description = p.description || '';
  const { valid, validKey } = validator(p, ['id', 'subject', 'type', 'score']);
  if (!valid) return { valid, validKey };
  let data = readFileData() || [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].id != p.id) continue;
    data[i] = p;
  }
  writeFileData(JSON.stringify(data));
  return { valid, validKey };
}

/**
 * @description 获取题目数据
 * @param {object} params 查询参数
 */
function getQuestionList(params) {
  const { valid, validKey } = validator(params, ['page', 'pageSize']);
  if (!valid) return { valid, validKey };
  let data = readFileData() || [];
  // 筛选 - 题型
  if (params.types && params.types.length) {
    data = data.filter(item => {
      return params.types.includes(item.type);
    });
  }

  // 分页
  const start = (params.page - 1) * params.pageSize;
  const end = params.page * params.pageSize;
  const d = data.slice(start, end);
  return {
    valid,
    validKey,
    data: {
      page: params.page,
      pageSize: params.pageSize,
      total: data.length,
      data: d
    }
  };
}

/**
 * @description 获取单个题目数据
 * @param {number} id 查询id
 */
function getQuestion(params) {
  const { valid, validKey } = validator(params, ['id']);
  if (!valid) return { valid, validKey };
  let data = readFileData() || [];
  data = data.filter(item => item.id == params.id);
  return { valid, validKey, data: data[0] };
}

module.exports = {
  getQuestionList,
  getQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion
};
