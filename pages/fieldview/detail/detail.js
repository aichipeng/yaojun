// pages/fieldView/detail/detail.js
import { articleCollection, articleLike, articleDetail } from '../../../api/article.js'
import { addComment, addShare } from '../../../api/others.js'
const WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {
    reply: false,
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
    articleDetail({ id: this.data.id }).then(res => {
      wx.hideLoading();
      this.setData({
        info: res.data.info,
        comment: res.data.comment,
        mycollection: res.data.info.mycollection,
        shareqqurl: res.data.shareqqurl,
      })
      if (res.data.info.content != '') {
        WxParse.wxParse('content', 'html', res.data.info.content, this, 5);
      }
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
  //评价 回复提交
  addcommit: function(e) {
    // console.log(e);
    const that = this;
    let obj = {};
    obj.type = '2';
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

  // 收藏
  collect: function() {
    const that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      article_id: that.data.info.id,
      status: that.data.mycollection==0?'1':'-1'
    }
    articleCollection(obj).then(res => {
      wx.hideLoading();
      if (res.data.status == 1) {
        that.setData({
          mycollection: that.data.mycollection == 0 ? '1' : '0',
        })
      }
    })
  },

  //点赞
  // praise: function(e) {
  //   const that = this;
  //   articleLike({ article_id: that.data.info.id }).then(res => {
  //     if (res.data.status == 1) {
  //       let info = that.data.info;
  //       info.like = parseInt(info.like) + 1;
  //       that.setData({
  //         info: info,
  //       })
  //     }
  //   })
  // },
  
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
    const that = this
    return {
      // title: that.data.class.name,
      // path: that.data.info.shareqqurl,
      success: function (res) {
        let obj = {
          type: 2,
          url: that.data.shareqqurl,
          themeid: that.data.info.id,
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