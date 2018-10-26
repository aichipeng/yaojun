// pages/grade/detail/detail.js
import { gradesDetail } from '../../../api/grades.js'
import { operationCircle } from '../../../api/friends.js'
import { meansDowns } from '../../../api/means.js'
Page({

  data: {
    tablist: ['班级课程', '相关课件', '班级管理'],
    tid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    let id = options.id;
    gradesDetail({ id: id }).then(res => {
      that.setData({
        info: res.data.result.list,
        notic: res.data.result.notic,
        course: res.data.result.course,
        ware: res.data.result.info,
      })
    })
  },
  changetid: function(e) {
    let tid = e.currentTarget.dataset.tid;
    this.setData({
      tid: tid,
    })
  },
  download: function(e) {
    let file = e.currentTarget.dataset.file;
    let id = e.currentTarget.dataset.id;
    // let file = "https:yaojunzk.oss-cn-beijing.aliyuncs.com/image./Uploads/Download/2018-09-10/5b96429916a8d.doc"
    // console.log(file);
    // meansDowns({ id: id }).then(res => {

    // })
    // wx.downloadFile({
    //   url: file,
    //   // url: 'https://yaojunzk.oss-cn-beijing.aliyuncs.com/image./Uploads/Download/2018-10-10/5bbdd72ae792b.txt',
    //   header: {
    //     // "Content-Type": "application/json"
    //   },
    //   success: function(res) {
    //     console.log(res);
    //     if (res.statusCode === 200) {
    //       let filePath = res.tempFilePath;
    //       wx.saveFile({
    //         tempFilePath: filePath,
    //         success: function(res) {
    //           let savedFilePath = res.savedFilePath
    //           wx.showModal({
    //             content: '打开文件',
    //             showCancel: true,
    //             success: function(res) {
    //               if(res.confirm){
    //                 wx.openDocument({
    //                   filePath: savedFilePath,
    //                   success: '',
    //                   fail: '',
    //                   complete: '',
    //                 })
    //               }
    //             },
    //             fail: function(res) {},
    //             complete: function(res) {},
    //           })
    //         },
    //         fail: function(res) {},
    //         complete: function(res) {},
    //       })
    //     }
    //   },
    //   fail: function(res) {
    //     console.log(res)
    //   },
    //   complete: function(res) {},
    // })
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