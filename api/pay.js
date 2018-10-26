const api = require('api.js')

// 支付 type theme课程 means资料 activity公益课
exports.buy = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/coursepayapp/buy", true, true))
  })
}

// 打赏 paytype	wxpayapp微信打赏 alipayapp支付宝打赏  type video视频 means资料 document文章
exports.reward = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/coursepayapp/reward", true, true))
  })
}

// 会员升级 paytype alipayapp支付宝 wxpayapp微信
exports.upLevel = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/coursepayapp/level", true, true))
  })
}

// 支付方式 type 1课程 2资料
exports.buyType = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/coursepayapp/get_info", true, true))
  })
}

// 支付宝回调
exports.notifyUrl = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/payment/notifyurl", true, false))
  })
}

// 微信回调
exports.orderQuery = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/payment/orderQuery", true, false))
  })
}