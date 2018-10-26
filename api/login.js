const api = require('api.js');

// temp短信验证码  sms_login登录  sms_forget忘记密码  sms_reg注册用户
exports.verifycode = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Account/verifycode", true, false))
  })
}

// {mobile verifycode}短信登录  {mobile pwd}密码登录 
exports.login = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Account/login", true, false))
  })
}

// 注册
exports.register = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Account/register", true, false))
  })
}

// 忘记密码
exports.forget = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Account/forget", true, false))
  })
}

// 退出登录
exports.logout = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Account/logout", false, false))
  })
}

// 第三方登录 openid type(qq,weixin,sina)
exports.thirdApp = (params) => {
  return new Promise((resolve, reject) => {
    resolve(api.request(params, "/index.php?s=/Home/Thirdapp/get_user", false, false))
  })
}