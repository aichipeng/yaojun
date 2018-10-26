// pages/rubclass/detail/detail.js
import { activityDetail, enterActivity, freeActivity } from '../../../api/activity.js'
import { buy } from '../../../api/pay.js'
const WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {
    tid: 1,
    modle: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    let id = options.id ? options.id : '';
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    activityDetail({ id: id }).then(res => {
      wx.hideLoading();
      this.setData({
        info: res.data.info,
        times: res.data.info.times.split(' '),
      })
      if (res.data.info.content!='') {
        WxParse.wxParse('content', 'html', res.data.info.content, this, 5);
      }
      if (res.data.info.list != '') {
        WxParse.wxParse('list', 'html', res.data.info.list, this, 5);
      }
    })
  },
  changetid: function(e) {
    let tid = e.currentTarget.dataset.tid;
    this.setData({
      tid: tid,
    })
  },
  getmodle: function() {
    let modle = this.data.modle;
    this.setData({
      modle: true,
    })
  },
  close: function () {
    this.setData({
      modle: false,
    })
  },

  submitEnter: function (e) {
    // console.log(e.detail.value)
    // console.log(this.isPhoneNo(e.detail.value.phone))
    if (this.isPhoneNo(e.detail.value.phone) || e.detail.value.phone == '') {
      enterActivity(e.detail.value).then(res => {
        if (res.data.status == 1) {
          let info = this.data.info;
          wx.navigateTo({
            url: '../../buy/buy?id=' + info.id + '&name=' + info.actname + '&price=' + info.money + '&type=activity'
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
            mask: true,
          })
        }
      })
    }else {
      wx.showToast({
        title: '手机号码有误！',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }
  },
  
  //验证手机号
  isPhoneNo: function(phone) {
    var pattern = /^1[345678]\d{9}$/;
    return pattern.test(phone);
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