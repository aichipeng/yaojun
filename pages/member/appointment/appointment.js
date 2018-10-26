// pages/member/appointment/appointment.js
import { getAppointment } from '../../../api/member.js'
Page({

  data: {
    page: 0,
    pagenum: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getlist();
  },
  getlist: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: this.data.page,
      pagenum: this.data.pagenum,
    }
    getAppointment(obj).then(res => {
      wx.hideLoading();
      this.setData({
        info: res.data.info,
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})