// pages/member/follow/follow.js
// const WxParse = require('../../wxParse/wxParse.js');
import { myFollow } from '../../../api/member.js'
Page({

  data: {
    page: 0,
    pagenum: 10,
    is_star: '1', //1讲师 2咨询师
    headerNav: [
      { name: "关注的讲师", is_star: '1' },
      { name: "关注的咨询师", is_star: '2' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    myFollow(obj).then(res => {
      // console.log(res);
      wx.hideLoading();
      let list = [];
      let info = res.data.info;
      for (let i = 0; i < info.follow.length; i++) {
        if (this.data.is_star == '1' && info.follow[i].teacher.is_star == '1') {
          list[list.length] = info.follow[i];
        }
        if (this.data.is_star == '2' && info.follow[i].teacher.is_star == '2') {
          list[list.length] = info.follow[i];
        }
      }
      this.setData({
        info: info,
        list: list,
      })
    })
  },
  changestar: function(e) {
    let star = e.currentTarget.dataset.star;
    this.setData({
      is_star: star,
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