import { busconsult, bustrain } from '../../api/others.js';
Page({
  data: {
    tp: '1',
    mark: true,
    gid: '0',
    oid: '0',
    cid: '0',
    boxInfo: [
      { imgUrl: "/images/release1.png", tp: '1' },
      { imgUrl: "/images/release2.png", tp: '2' },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  getForm: function(e) {
    let tp = e.currentTarget.dataset.tp;
     wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    if (tp == '1') {
      bustrain({}, false, false).then(res => {
        wx.hideLoading();
        this.setData({
          tp: tp,
          info: res.data.info,
          mark: false,
        })
      })
    }
    if (tp == '2') {
      busconsult({}, false, false).then(res => {
        wx.hideLoading();        
        this.setData({
          tp: tp,
          info: res.data.info,
          mark: false,
        })
      })
    }
  },

  changeGid: function(e) {
    // console.log(e)
    this.setData({
      gid: e.detail.value,
    })
  },

  changeOid: function(e) {
    // console.log(e)
    this.setData({
      oid: e.detail.value,
    })
  },

  changeCid: function(e) {
    // console.log(e)
    this.setData({
      cid: e.detail.value,
    })
  },

  setorder: function(e) {
    // console.log(e);
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    if (this.data.tp == '1') {
      bustrain(e.detail.value, true, true).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        if (res.data.status == 1) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        }
      })
    }
    if (this.data.tp == '2') {
      busconsult(e.detail.value, true, true).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        if (res.data.status == 1) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})