var express = require('express');
var router = express.Router();
const {
  getQuestionList,
  getQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion
} = require('../controller');
const SucModel = require('../model/sucModel');
const ErrModel = require('../model/errModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.send({ msg: '项目启动成功' });
});

// 查询题目列表数据
router.post('/getQuestionList', function(req, res, next) {
  const params = req.body;
  const { valid, validKey, data } = getQuestionList(params);
  let obj;
  if (valid) {
    obj = new SucModel(data);
  } else {
    obj = new ErrModel(`${validKey}校验失败`);
  }
  res.send(obj);
});

// 查询单个题目数据
router.post('/getQuestion', function(req, res) {
  const params = req.body;
  const { valid, validKey, data } = getQuestion(params);
  let obj;
  if (valid) {
    obj = new SucModel(data);
  } else {
    obj = new ErrModel(`${validKey}校验失败`);
  }
  res.send(obj);
});

// 添加题目数据
router.post('/addQuestion', function(req, res) {
  const params = req.body;
  const { valid, validKey, data } = addQuestion(params);
  let obj;
  if (valid) {
    obj = new SucModel(data);
  } else {
    obj = new ErrModel(`${validKey}校验失败`);
  }
  res.send(obj);
});

// 修改题目数据
router.put('/updateQuestion', function(req, res) {
  const params = req.body;
  const { valid, validKey, data } = updateQuestion(params);
  let obj;
  if (valid) {
    obj = new SucModel(data);
  } else {
    obj = new ErrModel(`${validKey}校验失败`);
  }
  res.send(obj);
});

// 删除题目数据
router.post('/deleteQuestion', function(req, res) {
  const params = req.body;
  const { valid, validKey, data } = deleteQuestion(params);
  let obj;
  if (valid) {
    obj = new SucModel(data);
  } else {
    obj = new ErrModel(`${validKey}校验失败`);
  }
  res.send(obj);
});

// 删除题目数据
router.get('/getTypeList', function(req, res) {
  res.send(
    new SucModel([
      {
        id: 1,
        text: '主观题'
      },
      {
        id: 2,
        text: '客观题'
      }
    ])
  );
});

module.exports = router;
