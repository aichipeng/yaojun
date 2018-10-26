// pages/lecturer/order/order.js
import { lectureDetail, appointment } from '../../../api/lecture.js';
Page({
  data: {
    date: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id ? options.id : '';
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    lectureDetail({ id: id }).then(res => {
      wx.hideLoading();
      this.setData({
        info: res.data.info,
        area_id: res.data.info.area_id.split(','),
      })
    })
  },
  setorder: function(e) {
    // console.log(e)
    appointment(e.detail.value).then(res => {
      if (res.data.status == 1) {
        wx.showModal({
          content: res.data.message,
          showCancel: true,
          confirmText: '查看预约',
          success: function (res) {
            if (res.confirm) {
              console.log('查看预约')
              wx.navigateTo({
                url: '/pages/member/appointment/appointment',
              })
            }
          },
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    })
  },
  
  bindDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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