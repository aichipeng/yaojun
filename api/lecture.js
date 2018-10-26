const api = require('api.js');

// 讲师列表 is_star 1讲师 2咨询师
exports.lectureAll = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/lecturerapp/lectureall", true, true))
  })
}

// 讲师详情
exports.lectureDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/lecturerapp/lectureinfo", true, true))
  })
}

// 讲师申请
exports.lecturerApply = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/lecturerapp/lecturerapply", false, true))
  })
}

// 讲师预约
exports.appointment = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/lecturerapp/appointment", true, true))
  })
}

// 讲师提现 applytype 支付宝1 微信2 银行卡3
exports.lecturerCash = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/lecturerapp/lecturercash", true, false))
  })
}

// 关注讲师
exports.lecturerFollow = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/lecturerapp/lecturerfollow", true, true))
  })
}

// 取消关注
exports.lecturerUnfollow = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/lecturerapp/unfollow", true, true))
  })
}