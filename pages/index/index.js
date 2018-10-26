//index.js
//获取应用实例
const app = getApp();
let index = require('../../api/index.js');
Page({
  data: {
    inputVal: "",
  },
  onLoad: function() {
    const that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    index.appIndex().then(res => {
      // console.log(res)
      wx.hideLoading();
      if (res.data.status == 1) {
        that.setData({
          info: res.data.info,
          theme: res.data.info.theme,
          activity: res.data.info.activity,
        })
      }
    });
  },
  changeRec: function(e) {
    let name = e.currentTarget.dataset.name;
    index.refreshIndex({ name: name }).then(res => {
      // console.log(res)
      if (res.data.status == 1) {
      console.log(res)
        this.setData({
          [name]: res.data.info
        })
      }
    });
  },
})