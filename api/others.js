const api = require('api.js')

// 添加评论 type 1课程 2文章 3讲师 4资料
exports.addComment = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Comment/addComment", true, true))
  })
}

// 分类
exports.category = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Category/index", true, false))
  })
}

// 线下申请（申请尧君会员）
exports.applyUser = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/user/applyuser", true, true))
  })
}

// 帮助中心内容
exports.getHelp = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/helpapp/get_help", true, false))
  })
}

// 底部导航
exports.getNavi = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/helpapp/get_navi", true, false))
  })
}

// 企业培训提交
// exports.bustrainSubmit = (params) => {
//   return new Promise((resolve, reject) => {
//     resolve(api.request(params, "/index.php?s=/Home/need/bustrain", true, true))
//   })
// }

// GET企业培训  POST企业培训提交
exports.bustrain = (params, isPost, isToken) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/need/bustrain", isPost, isToken))
  })
}

// 企业咨询提交
// exports.busconsultSubmit = (params) => {
//   return new Promise((resolve, reject) => {
//     resolve(api.request(params, "/index.php?s=/Home/need/busconsult", true, true))
//   })
// }

// GET企业咨询  POST企业咨询提交
exports.busconsult = (params, isPost, isToken) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/need/busconsult", isPost, isToken))
  })
}

// 分享 sharetype 1qq 2微信 3新浪微博  type 1课程 2 文章
exports.addShare = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/share/addshare", true, true))
  })
}