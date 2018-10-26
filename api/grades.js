const api = require('api.js')

// 班级列表
exports.gradesAll = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/gradesapp/gradesall", true, true))
  })
}

// 班级详情
exports.gradesDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/gradesapp/gradesdetail", true, true))
  })
}