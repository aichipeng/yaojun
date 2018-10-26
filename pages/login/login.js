// pages/login/login.js
let logins = require('../../api/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_type: 1,
    mobile: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  changetype: function(e) {
    this.setData({
      login_type: e.currentTarget.dataset.tp
    })
  },

  setmobile: function(e) {
    let mobile = e.detail.value;
    this.setData({
      mobile: mobile,
    })
  },

  gettemp: function(e) {
    let params = {
      mobile: this.data.mobile,
      temp: 'sms_login',
    }
    logins.verifycode(params).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    })
  },

  login: function(e) {
    if (e.detail.value.mobile != '') {
      if (this.isPhoneNo(e.detail.value.mobile)) {
        let params = {};
        if (this.data.login_type == 1) {
          params.mobile = e.detail.value.mobile;
          params.pwd = e.detail.value.pwd
        }
        if (this.data.login_type == 2) {
          params.mobile = e.detail.value.mobile;
          params.verifycode = e.detail.value.verifycode
        }
        logins.login(params).then(res => {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
            mask: true,
          })
          if (res.data.status != 0) {
            wx.setStorageSync("token", res.data.info)
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index',
              })
            }, 2000)
          }
        })
      } else {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    }
    else {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }
  },

  //验证手机号
  isPhoneNo: function (phone) {
    var pattern = /^1[345678]\d{9}$/;
    return pattern.test(phone);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})