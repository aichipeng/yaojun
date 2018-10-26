// pages/lecturer/list/list.js
import { lectureAll, lecturerFollow, lecturerUnfollow } from '../../../api/lecture.js' 
Page({
  data: {
    page: '',       //页数
    ca: '',         //分类
    address: '',    //地址
    industry: '',   //擅长行业（字符串）
    is_star: 0,     //1讲师 2咨询师
    pagenum: 10,    //每页数量
    keysword: '',   //搜索（名字，电话，标签，擅长行业）
    pid: '',
    pickerindex: 0,
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
    const that = this
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: that.data.page,
      ca: that.data.ca,
      is_star: that.data.is_star,
      pagenum: that.data.pagenum,
      industry: that.data.industry,
      address: that.data.address,
      keysword: that.data.keysword,
    }
    lectureAll(obj).then(res => {
      wx.hideLoading();
      that.setData({
        info: res.data.info,
      })
    })
  },
  changepid: function(e) {
    let pid = e.currentTarget.dataset.pid;
    this.setData({
      ca: pid,
      pid: pid,
      pagenum: 10,
    })
    this.getlist();
  },

  bindPickerChange: function(e) {
    let cid;
    let pid = this.data.pid;
    let category = this.data.info.cate.category
    let pickerindex = e.detail.value;
    for (let i = 0; i < category.length; i++) {
      if (pid == category[i].id) {
        cid = category[i].children[pickerindex].id
      }
    }
    this.setData({
      ca: cid,
      pagenum: 10,
    })
    this.getlist();
  },
  changestar: function(e) {
    let is_star = e.currentTarget.dataset.star;
    this.setData({
      is_star: is_star,
      pagenum: 10,
    });
    this.getlist();
  },

  follow: function(e) {
    let index = e.currentTarget.dataset.index;
    let lecture = this.data.info.lecture.user
    if (lecture[index].focu == 0) {
      lecturerFollow({ lectureid: lecture[index].id }).then(res => {
        this.getlist();
      })
    }
    if (lecture[index].focu == 1) {
      lecturerUnfollow({ lectureid: lecture[index].id }).then(res => {
        this.getlist();
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
    if (this.data.pagenum < this.data.info.lecture.count) {
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