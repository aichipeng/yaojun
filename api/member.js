const api = require('api.js');

//个人信息
exports.getUser = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/user/get_user", true, true))
  })
}

//修改个人信息
exports.makeInfo = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/user/make_info", true, true))
  })
}

//学习中心
exports.getStudy = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/memberapp/get_study", true, true))
  })
}

//我的社交圈  circle_type 1精英圈 2boss圈
exports.getFriends = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/memberapp/get_friends", true, true))
  })
}

//订单记录  status  默认为全部（1未付款 3已付款 0删除）
exports.getOrder = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/memberapp/get_order", true, true))
  })
}

//订单取消
exports.orderCancel = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/order/order_cancel", true, true))
  })
}

//我的下载
exports.getDownload = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/memberapp/get_download", true, true))
  })
}

//我的收藏
exports.getCollection = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/memberapp/collection", true, true))
  })
}

//我的帖子
exports.getNote = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/get_note", true, true))
  })
}

//我的转载
exports.getReprint = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/get_reprint", true, true))
  })
}

//我的预约
exports.getAppointment = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/get_appointment", true, true))
  })
}

//我的关注
exports.myFollow = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/myfollow", true, true))
  })
}

//上传图片
exports.uploadPicture = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/File/uploadPicture", true, true))
  })
}

//回复信息（消息中心-贴子里的回复）
exports.getMessage = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/get_message", true, true))
  })
}

//讲师回复课程（消息中心）
exports.newthemeMess = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/newthememess", true, true))
  })
}

//最新回复
exports.getReply = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/get_reply", true, true))
  })
}