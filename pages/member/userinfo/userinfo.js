// pages/member/userinfo/userinfo.js
import { getUser, makeInfo, uploadPicture } from '../../../api/member.js'
import { domain } from '../../../api/api.js'
Page({
  data: {
    avatarid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(domain);
    getUser().then(res => {
      // console.log(res)
      this.setData({
        info: res.data.info,
        avatar: res.data.info.avatar
      })
    })
  },
  chooseImage: function() {
    let that = this;
    wx.chooseImage({
      success: function(res) {
        console.log(res.tempFilePaths[0]);
        wx.uploadFile({
          url: domain + "/index.php?s=/Home/File/uploadPicture",
          filePath: res.tempFilePaths[0],
          name: 'download',
          header: {},
          formData: {},
          success: function(e) {
            console.log(JSON.parse(e.data));
            that.setData({
              avatar: res.tempFilePaths[0],
              avatarid: JSON.parse(e.data).id,
            })
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  makeInfo: function(e) {
    console.log(e)
    makeInfo(e.detail.value).then(res => {
      if (res.data.status == 1) {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        } ,1500);
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