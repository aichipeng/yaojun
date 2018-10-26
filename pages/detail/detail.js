// pages/detail/detail.js
const WxParse = require('../../wxParse/wxParse.js');
// const Course = require('../../api/course.js')
import { courseDetail, courseCollection } from '../../api/course.js';
import { addComment, addShare } from '../../api/others.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: 1,
    more: false,
    reply: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    this.setData({
      id: id,
    })
    // this.courseDetail();
  },

  courseDetail: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    courseDetail({ id: this.data.id }).then(res => {
      wx.hideLoading();
      // if (res.data.status == 1) {
        this.setData({
          info: res.data,
          class: res.data.class,
          catalog: res.data.video,
          comment: res.data.comment,
          mycollection: res.data.class.mycollection,
        })
        // WxParse.wxParse('course', 'html', '<span style="font-size:20px;">11</span>', that, 5);
        if (res.data.class.content != null) {
          WxParse.wxParse('course', 'html', res.data.class.content, this, 5);
        }
      // if (res.data.class.education != null) {
      //   WxParse.wxParse('lecturer', 'html', res.data.class.education, this, 5);
      // }
      // }else {
      //   wx.showToast({
      //     title: res.date.status,
      //     icon: 'none',
      //     duration: 2000,
      //     mask: true,
      //     success: function (res) { },
      //   })
      // }
    })
  },
  
  changecid: function(e) {
    let cid = e.currentTarget.dataset.cid;
    this.setData({
      cid: cid,
    })
  },

  getmore: function(e) {
    this.setData({
      more: !this.data.more,
    })
  },

  //观看视频
  getvideo: function(e) {
    let that = this;
    if (that.data.class.is_view == 1) {
      let videoInfo = e.currentTarget.dataset.videoinfo;
      // console.log(videoInfo);
      wx.navigateTo({
        url: '../video/video?videoInfo=' + JSON.stringify(videoInfo) + '&themeid=' + this.data.class.id
      })
    } else {
      wx.showModal({
        title: '付费项目',
        content: '是否购买',
        showCancel: true,
        success: function(res) {
          if(res.confirm) {
            that.buyCourse();
          }
        },
      })
    }
  },

  //课程收藏  status 1收藏 -1取消收
  courseCollection: function () {
    let mycollection = this.data.mycollection;
    let obj = {
      themeid: this.data.class.id,
    }
    obj.status = mycollection == '0' ? '1' : '-1'; 
    courseCollection(obj).then(res => {
      // console.log(res);
      mycollection = obj.status == '1' ? '1' : '0';
      if (res.data.status == 1) {
        this.setData({
          mycollection: mycollection,
        })
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    })
  },

  // 咨询
  // question: function() {
  //   console.log("咨询");
  // },

  // 购买课程
  buyCourse: function() {
    let info = this.data.class
    wx.navigateTo({
      url: '../buy/buy?id=' + info.id + '&name=' + info.name + '&price=' + info.price + '&type=theme'
    })
  },

  //回复弹窗
  showPopup: function(e) {
    console.log(e)
    let pid = e.currentTarget.dataset.pid || '0';
    let p_pid = e.currentTarget.dataset.p_pid || '0';
    this.setData({
      pid: pid,
      p_pid: p_pid,
      reply: true,
    })
  },

  hidePopup: function(e) {
    this.setData({
      reply: false,
    })
  },

  //回复内容
  setcommit: function(e) {
    // console.log(e)
    this.setData({
      reply_commit: e.detail.value,
    })
  },

  // 提交评论 
  addcommit: function(e) {
    // console.log(e);
    const that = this;
    let obj = {};
    obj.type = 1;
    obj.themeid = that.data.class.id;
    obj.pid = e.currentTarget.dataset.pid || '0';
    obj.p_pid = e.currentTarget.dataset.p_pid || '0';
    obj.comment = e.detail.value || that.data.reply_commit;
    // console.log(obj);
    addComment(obj).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      if (res.data.status == 1) {
        this.courseDetail();
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
    this.courseDetail();
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
  onShareAppMessage: function(e) {
    const that = this
    return {
      // title: that.data.class.name,
      // path: that.data.info.shareqqurl,
      success: function (res) {
        let obj = {
          type: 1,
          url: that.data.info.shareqqurl,
          themeid: that.data.class.id,
          sharetype: 2
        }
        addShare(obj).then(res => {
          if (res.data.status == 0) {
            wx.showToast({
              title: '分享失败',
              icon: 'none',
              duration: 2000,
              mask: true,
            })
          }
        })
      },
    }
  }
})