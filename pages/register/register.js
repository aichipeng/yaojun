// pages/register/register.js
let register = require('../../api/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type ? options.type : this.data.type;
    let title = type == 1 ? '注册' : '忘记密码';
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      type: type,
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
    };
    if (this.data.type == 1) {
      params.temp = 'sms_reg'
    }
    if (this.data.type == 2) {
      params.temp = 'sms_forget'
    }
    register.verifycode(params).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    })
  },
  register: function(e) {
    let params = {
      mobile: e.detail.value.mobile,
      temp: 'verifycode',
      verifycode: e.detail.value.verifycode,
    };
    if (this.data.type == 1) {
      register.register(params).then(res => {
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
            mask: true,
          })
        }
        if (res.data.status == 1) {
          delete params.verifycode;
          params.temp = 'register';
          params.password = e.detail.value.password;
          params.repassword = e.detail.value.repassword;
        }
        register.register(params).then(res => {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
            mask: true,
          })
          if (res.data.status == 1) {
            setTimeout(function() {
              wx.reLaunch({
                url: '../login/login',
              })
            }, 2000)
          }
        })
      })
    }
    if (this.data.type == 2) {
      register.forget(params).then(res => {
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
            mask: true,
          })
        }
        if (res.data.status == 1) {
          delete params.verifycode;
          params.temp = 'forget';
          params.password = e.detail.value.password;
          params.repassword = e.detail.value.repassword;
          register.forget(params).then(res => {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
              mask: true,
            })
            if (res.data.status == 1) {
              setTimeout(function() {
                wx.reLaunch({
                  url: '../login/login',
                })
              }, 2000)
            }
          })
        }
      })
    }
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