// pages/member/order/list/list.js
import { getOrder, orderCancel } from '../../../../api/member.js'
Page({

  data: {
    page: 1,
    pagenum: 10,
    status: '',
    keyword: '',
    tablist: [{
        name: '全部订单',
        status: ''
      },
      {
        name: '已付款',
        status: '3'
      },
      {
        name: '未付款',
        status: '1'
      },
      {
        name: '删除',
        status: '0'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getlist();
  },
  getlist: function() {
    const that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let obj = {
      page: that.data.page,
      pagenum: that.data.pagenum,
      status: that.data.status,
      keyword: that.data.keyword,
    }
    getOrder(obj).then(res => {
      wx.hideLoading();
      that.setData({
        info: res.data.info,
      })
    })
  },

  changestatus: function(e) {
    let status = e.currentTarget.dataset.status;
    this.setData({
      status: status,
      pagenum: 10,
    });
    this.getlist();
  },

  getDetail: function(e) {
    console.log(e)
    let tp = e.currentTarget.dataset.tp;
    let id = e.currentTarget.dataset.id;
    let url = '';
    switch (tp) {
      case 'theme':
        url = '/pages/detail/detail'
      break;
      case 'activity':
        url = '/pages/rubclass/detail/detail'
      break;
      // case 'means':
      //   url = ''
      // break;
      // default:
      //   url = ''
    }
    if (url != '') {
      wx.navigateTo({
        url: url + '?id=' + id,
      })
    }
  },
  
  orderCancel: function(e) {
    const that = this;
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '取消订单',
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          let orderid = e.currentTarget.dataset.id;
          orderCancel({ orderid: orderid }).then(res => {
            if (res.data.status == 1) {
              that.getlist();
            }
          })
        }
      },
    })
  },

  goBuy: function(e) {
    let info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '../../../buy/buy?ordersn=' + info.ordersn + '&name=' + info.name + '&price=' + info.price,
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