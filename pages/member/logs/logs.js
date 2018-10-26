// pages/member/logs/logs.js
import { getDownload, getReprint, getReply } from '../../../api/member.js'
Page({
  data: {
    page: 0,
    pagenum: 10,
    tp: '1',
    headerNav: [
      { name: "我的下载", tp: '1' },
      { name: "我的转载", tp: '2' },
      { name: "最新回复", tp: '3' },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let tp = options.tp ? options.tp : ''; //tp：1我的缓存 2我的预约 3我的帖子 4消息中心
    // console.log(tp)
    this.setData({
      tp: tp,
    })
    this.getlist()
  },
  getlist: function() {
    switch (this.data.tp) {
      case '1':
        this.getDownload(this.data.page, this.data.pagenum)
        break;
      case '2':
        this.getReprint(this.data.page, this.data.pagenum)
        break;
      case '3':
        this.getReply(this.data.page, this.data.pagenum)
        break;
    }
  },

  //我的下载
  getDownload: function (page, pagenum) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: page,
      pagenum: pagenum,
    }
    getDownload(obj).then(res => {
      wx.hideLoading();
      // console.log(res)
      this.setData({
        info: res.data.info || ''
      })
    })
  },

  //我的转载
  getReprint: function (page, pagenum) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: page,
      pagenum: pagenum,
    }
    getReprint(obj).then(res => {
      wx.hideLoading();
      // console.log(res)
      this.setData({
        info: res.data.info || ''
      })
    })
  },

  //最新回复
  getReply: function (page, pagenum) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: page,
      pagenum: pagenum,
    }
    getReply(obj).then(res => {
      wx.hideLoading();
      // console.log(res)
      this.setData({
        info: res.data.info||''
      })
    })
  },

  changetp: function (e) {
    let tp = e.currentTarget.dataset.tp;
    this.setData({
      tp: tp,
      pagenum: 10,
    })
    this.getlist();
  },

  getDetail: function(e) {
    let ty = e.currentTarget.dataset.ty; //1是课程，2是文章，3是讲师，4资料
    let id = e.currentTarget.dataset.id;
    let url = '';
    switch(ty) {
      case '1':
        url = "/pages/detail/detail"
        break;
      case '2':
        url = "/pages/fieldview/detail/detail"
        break;
      case '3':
        url = "/pages/lecturer/detail/detail"
        break;
      case '4':
        url = ""
        break;
    }
    if (url!='') {
      wx.navigateTo({
        url: url + '?id=' + id,
      })
    }
  },

  goDetail: function (e) {
    let tp = e.currentTarget.dataset.tp; //1是课程，2是文章，3是公益课，4资料
    let id = e.currentTarget.dataset.id;
    let url = '';
    switch (tp) {
      case '1':
        url = "/pages/detail/detail"
        break;
      case '2':
        url = "/pages/fieldview/detail/detail"
        break;
      case '3':
        url = "/pages/rubclass/detail/detail"
        break;
      case '4':
        url = ""
        break;
    }
    if (url != '') {
      wx.navigateTo({
        url: url + '?id=' + id,
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