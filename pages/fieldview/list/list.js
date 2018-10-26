// pages/fieldView/list/list.js
import { articleAll } from '../../../api/article.js'
import { lecturerFollow, lecturerUnfollow } from '../../../api/lecture.js'
Page({

  data: {
    keysword: '',
    page: 1,
    pagenum: 10,
    article_cate: '',
    document: [],
    length: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      keysword: options.keysword || this.data.keysword,
    })
  },

  getlist: function(e) {
    const that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: that.data.page,
      keysword: that.data.keysword,
      article_cate: that.data.article_cate,
      pagenum: that.data.pagenum,
    }
    articleAll(obj).then(res => {
      wx.hideLoading();
      if (res.data.info.count == 0) {
        wx.showToast({
          title: '暂无相关内容！',
          icon: 'none',
          duration: 2000,
          mask: true,
          success: function (res) { },
        })
      }
      that.setData({
        info: res.data.info,
        document: res.data.info.document,
      })
    })
  },
  changecate: function(e) {
    let article_cate = e.currentTarget.dataset.cate;
    this.setData({
      article_cate: article_cate,
      document: [],
      page: 1,
    })
    this.getlist();
  },

  follow: function(e) {
    const that = this;
    let index = e.currentTarget.dataset.index;
    let document = that.data.document;
    let lectureid = document[index].teacher_id;
    let myfellow = document[index].teacher.myfellow;
    if (myfellow == 0) {
      lecturerFollow({ lectureid: lectureid }).then(res => {
        if (res.data.status == 1) {
          this.getlist();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000,
            mask: true,
          })
        }
      })
    }
    if (myfellow == 1) {
      lecturerUnfollow({ lectureid: lectureid }).then(res => {
        if (res.data.status == 1) {
          this.getlist();
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000,
            mask: true,
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
        success: function (res) { },
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})