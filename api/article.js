const api = require('api.js');

// 文章列表
exports.articleAll = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Articleapp/article", true, true))
  })
}

// 文章详情
exports.articleDetail = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/articleapp/get_article", true, true))
  })
}

// 文章收藏 status 1收藏 -1取消收藏
exports.articleCollection = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Articleapp/articlecollection", true, true))
  })
}

// 文章点赞
exports.articleLike = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/articleapp/articlelike", true, true))
  })
}