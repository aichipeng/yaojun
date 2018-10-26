// pages/member/index.js
import { getUser } from '../../api/member.js'
import { logout } from '../../api/login.js'
Page({

  data: {
    img_bg: '../../images/user_10.png',
    listinfo: [{
        icon: '../../images/user_1.png',
        text: '最近学习',
        url: 'studycentre/index'
      },
      {
        icon: '../../images/user_2.png',
        text: '班级圈',
        url: '../grade/list/list'
      },
      // {
      //   icon: '../../images/user_3.png',
      //   text: '社交圈',
      //   url: '../social/index/index'
      // },
      {
        icon: '../../images/user_4.png',
        text: '我的商城',
        url: ''
      },
      {
        icon: '../../images/user_5.png',
        text: '我的订单',
        url: 'order/list/list'
      },
      {
        icon: '../../images/user_7.png',
        text: '我的预约',
        url: 'appointment/appointment'
      },
      {
        icon: '../../images/user_6.png',
        text: '我的下载',
        url: 'logs/logs?tp=1'
      },
      {
        icon: '../../images/user_8.png',
        text: '我的转载',
        url: 'logs/logs?tp=2'
      },
      {
        icon: '../../images/user_9.png',
        text: '消息中心',
        url: 'logs/logs?tp=3'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
  signOut: function() {
    wx.showModal({
      title: '提示',
      content: '是否退出登录',
      showCancel: true,
      success: function(res) {
        if(res.confirm){
          logout().then(res => {
            // console.log(res);
            if (res.data.status == 1) {
              wx.removeStorage({
                key: 'token',
                success: function (res) {
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                },
              })
            }
          })
        }
      },
    })
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
    getUser().then(res => {
      this.setData({
        info: res.data.info,
      })
    })
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