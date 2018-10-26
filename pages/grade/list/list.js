// pages/grade/list/list.js
import { gradesAll } from '../../../api/grades.js'
Page({

  data: {
    page: 1,
    pagenum: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  getgrade: function() {
    const that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: that.data.page,
      pagenum: that.data.pagenum,
    }
    gradesAll(obj).then(res => {
      wx.hideLoading();
      if (res.data.status==0) {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }else{
        that.setData({
          info: res.data.info,
        })
      }
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
    this.getgrade();
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
    if (this.data.pagenum < this.data.info.count) {
      this.setData({
        pagenum: this.data.pagenum + 10,
        // page: this.data.page + 1
      })
      this.getgrade();
    } else {
      wx.showToast({
        title: '没有数据了！',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function(res) {},
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})