const api = require('api.js');

//首页
exports.appIndex = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Indexapp", true, true))
  })
}

//换一批 name theme课程 activity公益课
exports.refreshIndex = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/indexapp/refreshindex", true, true))
  })
}