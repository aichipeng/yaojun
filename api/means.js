const api = require('api.js')

// 资料列表 is_common 2专用资料 1通用资料
exports.meansAll = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/meansapp/meansall", true, true))
  })
}

// 资料详情
exports.meansDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/meansapp/detail", true, true))
  })
}

// 资料下载
exports.meansDowns = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/meansapp/downs", true, true))
  })
}