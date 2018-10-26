// pages/video/video.js
import { recordAdd, courseLike } from '../../api/course.js'
Page({
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let videoInfo = options.videoInfo ? JSON.parse(options.videoInfo) : '';
    let themeid = options.themeid ? options.themeid : '';
    console.log(videoInfo.endtimes)
    wx.setNavigationBarTitle({
      title: videoInfo.name,
    })
    this.setData({
      videoInfo: videoInfo,
      themeid: themeid
    })
  },
  courseLike: function() {
    courseLike({ video_id: this.data.videoInfo.id}).then(res => {
      console.log(res);
    })
  },
  timeupdate: function(e) {
    // console.log(e)
    this.setData({
      endtimes: e.detail.currentTime,
      videotime: e.detail.duration,
    })
  },

  // 保存观看记录
  recordAdd: function() {
    let obj = {
      endtimes: this.data.endtimes,
      videotime: this.data.videotime,
      themeid: this.data.themeid,
      videoid: this.data.videoInfo.id,
    }
    // console.log(obj)
    recordAdd(obj).then(res => {
      console.log(res.data.message);
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
    this.recordAdd();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.recordAdd();
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