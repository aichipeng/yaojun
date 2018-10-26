// pages/member/collection/collection.js
import { getCollection } from '../../../api/member.js'
Page({
  data: {
    page: 0,
    pagenum: 10,
    // wpage: 0,
    // wpagenum: 10,
    tid: '0',
    headerNav: [
      { name: "课程收藏", id: '0' }, 
      { name: "文章收藏", id: '1' }, 
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getCollection: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: this.data.page,
      pagenum: this.data.pagenum,
      // wpage: this.data.wpage,
      // wpagenum: this.data.wpagenum,
    }
    getCollection(obj).then(res => {
      wx.hideLoading();
      // console.log(res);
      let info = res.data.info
      let list = this.data.tid == '0' ? info.course : info.article
      this.setData({
        info: info,
        list: list,
      })
    })
  },
  changetid: function(e) {
    let tid = e.currentTarget.dataset.tid;
    this.setData({
      tid: tid,
      page: 0,
      pagenum: 10,
    })
    this.getCollection();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCollection()
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
    let count = this.data.tid == 0 ? this.data.info.coursecount : this.data.info.arccount
    if (this.data.pagenum < count) {
      this.setData({
        pagenum: this.data.pagenum + 10,
        // page: this.data.page + 1
      })
      this.getCollection();
    } else {
      wx.showToast({
        title: '没有数据了！',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function (res) { },
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})