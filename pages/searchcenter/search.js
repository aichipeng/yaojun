// pages/searchcenter/search.js
Page({
  data: {
    keysword: '',
    array: ['课程', '讲师', '文章', '蹭课'],
    tp: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tp: e.detail.value
    })
    if (this.data.keysword != '') {
      this.goSearch()
    }
  },

  setWords: function(e) {
    this.setData({
      keysword: e.detail.value,
    })
  },

  clearSearch: function() {
    this.setData({
      keysword: '',
    })
  },

  goSearch: function() {
    console.log(this.data.tp);
    switch (this.data.tp) {
      case '0':
        getApp().globalData.keysword = this.data.keysword;
        wx.switchTab({
          url: '../list/list'
        });
        break;
      case '1':
        wx.navigateTo({
          url: '../lecturer/list/list?keysword=' + this.data.keysword,
        })
        break;
      case '2':
        wx.navigateTo({
          url: '../fieldview/list/list?keysword=' + this.data.keysword,
        })
        break;
      case '3':
        wx.navigateTo({
          url: '../rubclass/index/index?keysword=' + this.data.keysword,
        })
        break;
      case '4':
        wx.navigateTo({
          url: '../social/list/list?keysword=' + this.data.keysword,
        })
        break;
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