// pages/lecturer/detail/detail.js
const WxParse = require('../../../wxParse/wxParse.js');
import { lectureDetail, lecturerFollow, lecturerUnfollow } from '../../../api/lecture.js';
import { addComment } from '../../../api/others.js';
Page({
  data: {
    tid: 1,
    reply: false,
    img_bg: '../../../images/background.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id ? options.id : '';
    this.setData({
      id: id,
    })
    this.getDetail();
  },

  getDetail: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    lectureDetail({ id: this.data.id }).then(res => {
      wx.hideLoading();
      this.setData({
        info: res.data.info,
        area_id: res.data.info.area_id.split(','),
        comment: res.data.studentcomment,
        // focu: res.data.info.focu,
      })
      if (res.data.info.education != null && res.data.info.education != '') {
        WxParse.wxParse('introduce', 'html', res.data.info.education, this, 5);
      }
    });
  },

  changetid: function(e) {
    let tid = e.currentTarget.dataset.tid;
    this.setData({
      tid: tid,
    })
  },
  fellow: function() {
    let info = this.data.info;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    if (info.focu  == 0) {
      lecturerFollow({ lectureid: this.data.info.id }).then(res => {
        if (res.data.status == 1) {
          wx.hideLoading();
          info.focu = 1;
          info.fellow = parseInt(info.fellow) + 1;
          this.setData({
            info: info,
          })
        }
      })
    } 
    if (info.focu == 1) {
      lecturerUnfollow({ lectureid: this.data.info.id }).then(res => {
        if (res.data.status == 1) {
          wx.hideLoading();
          info.focu = 0;
          info.fellow = parseInt(info.fellow) - 1;
          this.setData({
            info: info,
          })
        }
      })
    }
  },
  //回复弹窗
  showPopup: function (e) {
    console.log(e)
    let pid = e.currentTarget.dataset.pid || '0';
    let p_pid = e.currentTarget.dataset.p_pid || '0';
    this.setData({
      pid: pid,
      p_pid: p_pid,
      reply: true,
    })
  },
  
  hidePopup: function (e) {
    this.setData({
      reply: false,
    })
  },

  //回复内容
  setcommit: function (e) {
    // console.log(e)
    this.setData({
      reply_commit: e.detail.value,
    })
  },

  addcommit: function (e) {
    // console.log(e);
    const that = this;
    let obj = {};
    obj.type = 3;
    obj.themeid = that.data.info.id;
    obj.pid = e.currentTarget.dataset.pid || '0';
    obj.p_pid = e.currentTarget.dataset.p_pid || '0';
    obj.comment = e.detail.value || that.data.reply_commit;
    console.log(obj);
    addComment(obj).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 2000,
        mask: true,
      })
      if (res.data.status == 1) {
        this.getDetail();
        this.setData({
          reply: false,
          commit: '',
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