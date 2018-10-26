const domain = 'https://yaojunzk.com';
exports.domain = domain;
exports.request = function(params, url, isPost, isToken) {
  let param = params ? params : [];
  let method;
  if (isPost) {
    method = 'POST'
  } else {
    method = 'GET'
  };
  if (isToken) {
    let token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '';
    param.token = token;
    // console.log(param)
    //验证登录状态
    if (token == '') {
      wx.showToast({
        title: '未登录，正在前往',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function(res) {
          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }, 1000)
        },
      })
    }
  }
  // console.log(param);

  // 请求接口
  return new Promise(function(resolve, reject) {
    wx.request({
      url: domain + url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: method,
      dataType: 'json',
      data: param,
      success: function(res) {
        resolve(res);
      }
    })
  })
}