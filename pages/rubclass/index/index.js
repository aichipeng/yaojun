// pages/rubclass/index/index.js
import { activityAll } from '../../../api/activity.js'
Page({
  data: {
    page: 1,          //页数
    keysword: '',     //关键字（名字）
    type: 0,          // 0全部 1公益课 2付费精品课 
    address: '',      //地址        
    pagenum: 10,      //每页几条
    starttime: '',    //开始时间（2017-08-12 12:23:00）
    endtime: '',      //结束时间（2017-08-12 12:23:00）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      keysword: options.keysword || this.data.keysword,
    })
  },

  getlist: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: this.data.page,
      type: this.data.type,
      keysword: this.data.keysword,
      address: this.data.address,
      pagenum: this.data.pagenum,
      starttime: this.data.starttime,
      endtime: this.data.endtime,
    }
    activityAll(obj).then(res => {
      wx.hideLoading();
      if (res.data.status == 0) {
        wx.showToast({
          title: res.data.massage,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
      // console.log(res)
      this.setData({
        info: res.data.info,
      })
    })
  },

  setkeywords: function(e) {
    let keysword = e.detail.value;
    this.setData({
      keysword: keysword,
    })
  },

  changetype: function(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      pagenum: 10, 
      keysword: '',
    })
    this.getlist();
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