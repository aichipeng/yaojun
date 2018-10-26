const api = require('api.js');

// 圈子首页
exports.friendsIndex = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/friends_all", true, true))
  })
}

// 圈子（帖子，圈子分类）列表  type	2圈子 3帖子
exports.friendsAll = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/sns_more", true, true))
  })
}

// 圈子详情
exports.friendsDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friendsapp/friends_detail", true, true))
  })
}

// 贴子详情
exports.noteDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/friends/note_detail", true, true))
  })
}

// 添加圈子
exports.foundCircle = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/circle/found_circle", true, true))
  })
}

// (加入/退出)圈子 status 1加入 -1退出
exports.operationCircle = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/circle/operationcircle", true, true))
  })
}

// 贴子点赞
exports.replyLike = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/reply/replylike", true, true))
  })
}

// 帖子评论
exports.addreply = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/reply/addreply", true, true))
  })
}
