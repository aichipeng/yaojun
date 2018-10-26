// pages/fieldview/reward/reward.js
import { reward } from '../../../api/pay.js'
import { articleDetail } from '../../../api/article.js'
Page({
  data: {
    getInput: false,
    money: '',
    moneyList: ['1', '5', '10', '20', '50', '100']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetail();
  },

  getDetail: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    articleDetail({ id: this.data.id }).then(res => {
      wx.hideLoading();
      this.setData({
        info: res.data.info,
      })
    })
  },

  changeMoney: function(e){
    this.setData({
      money: e.currentTarget.dataset.m,
      getInput: false,
    })
  },

  getInput: function() {
    this.setData({
      money: '',
      getInput: !this.data.getInput,
    })
  },

  setMoney: function(e) {
    this.setData({
      money: e.detail.value,
    })
  },

  gopay: function() {
    let obj = {
      id: this.data.id,
      money: this.data.money,
      type: 'document',
      paytype: 'wxpayapp',
    }
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    reward(obj).then(res => {
      wx.hideLoading();
      if (res.data.status == 1) {
        console.log(res.data.str)
        wx.requestPayment({
          timeStamp: res.data.str.timestamp + '',
          nonceStr: res.data.str.noncestr,
          signType: 'MD5',
          package: "prepay_id=" + res.data.str.prepayid,
          paySign: res.data.str.sign,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) {
            console.log(res)
          },
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})