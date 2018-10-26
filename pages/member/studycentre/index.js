// pages/member/studycentre/index.js
import { getStudy } from '../../../api/member.js'
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
  getlist: function() {
    const that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      pagenum: that.data.pagenum,
      page: that.data.page,
    }
    getStudy(obj).then(res => {
      wx.hideLoading();
      that.setData({
        info: res.data.info,
      })
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
    this.getlist();
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
      this.getlist();
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