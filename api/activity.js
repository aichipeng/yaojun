const api = require('api.js');

// 公益课列表 type 0公益课 1付费精品课 2高峰论坛
exports.activityAll = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Activityapp/activityall", true, true))
  })
}

// 公益课详情
exports.activityDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/activityapp/get_activity", true, true))
  })
}

// 公益课报名
exports.enterActivity = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/activityapp/enteractivity", true, true))
  })
}

// 公益课免费报名
exports.freeActivity = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/activityapp/free_activity", true, true))
  })
}