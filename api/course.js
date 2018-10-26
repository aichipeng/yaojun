const api = require('api.js');

// 课程列表 搜索课程  price asc从低到高 desc价格从高到低 sort综合排序  type 1收费 2免费
exports.getCourse = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Courseapp/get_course", true, true))
  })
}

// 课程详情
exports.courseDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Courseapp/course_detail", true, true))
  })
}

// 视频观看记录添加
exports.recordAdd = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/courseapp/record_add", true, true))
  })
}

// 课程点赞
exports.courseLike = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/courseapp/videolike", true, true))
  })
}

// 课程收藏 status 1收藏 -1取消收
exports.courseCollection = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/courseapp/course_collection", true, true))
  })
}


