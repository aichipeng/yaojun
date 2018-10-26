// pages/buy/buy.js
import { buy } from '../../api/pay.js'
Page({
  data: {
    payType:[
      { name: '微信支付', paytype:'wxpayapp'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name: options.name ? options.name : '',
      price: options.price ? options.price : '',
      ordersn: options.ordersn ? options.ordersn : false,
      id: options.id ? options.id : false,
      type: options.type ? options.type : '',
    })
  },

  choosePay: function(e) {
    this.setData({
      paytype: e.currentTarget.dataset.paytype,
    })
    this.pay();
  },
  
  pay: function () {
    let obj = {
      paytype: this.data.paytype,
    }
    if (this.data.ordersn) {
      obj.ordersn = this.data.ordersn;
    }
    if (this.data.id){
      obj.id = this.data.id;
      obj.type = this.data.type;
    }
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    buy(obj).then(res => {
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
      // console.log(res)
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