// pages/list/list.js
let course = require('../../api/course.js');
const app = getApp();
Page({
  data: {
    type: '',       //是否付费 1收费 2免费
    keysword:'',   //搜索内容
    pid: '',        //分类上级id
    cateid: '',     //分类id
    page: 1,        //分页
    pagenum: 10,    //每页数
    sid: '',        //筛选条件 1价格 2分类 3是否付费
    zid: 'sort',    //价格排序 sort综合 asc低到高 desc高到低
    catename:'全部课程',
    zList: [
      {
        name: '综合排行', id:'sort'
      },
      {
        name: '价格最低', id: 'asc'
      }, 
      {
        name: '价格最高', id: 'desc'
      },
    ],
    tList: [
      {
        name: '全部公益课', id: ''
      },
      {
        name: '免费公益课', id: '2'
      },
      {
        name: '精品训练课', id: '1'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  getlist: function(e) {
    const that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let params = {
      page: that.data.page,
      keysword: app.globalData.keysword||'',
      ca: that.data.cateid,
      type: that.data.type,
      pagenum: that.data.pagenum,
      price: that.data.zid,
    }
    course.getCourse(params).then(res => {
      wx.hideLoading();
      if (res.data.status==1) {
        that.setData({
          info: res.data.info,
          keysword: '',
        })
      }else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
          mask: true,
        })
      }
    })
  },

  changesid: function(e) {
    let sid = e.currentTarget.dataset.sid;
    if (sid == this.data.sid) {
      sid = '';
    }
    this.setData({
      sid: sid,
    })
  },

  changechildren: function(e) {
    let pid = e.currentTarget.dataset.pid;
    let catename = e.currentTarget.dataset.catename;
    let children;
    if (pid != '' && this.data.info.cate.children != undefined) {
      children = this.data.info.cate.children[pid];
    } else {
      children = '';
    }
    this.setData({
      children: children,
      pid: pid,
      cid: -1,
      catename: catename,
    })
  },
  
  changecid: function(e) {
    let cid = e.currentTarget.dataset.cid;
    let catename = e.currentTarget.dataset.catename;
    if (catename != '') {
      catename = e.currentTarget.dataset.catename;
    }else { 
      if (this.data.pid != '') {
        for (let i = 0; i < this.data.info.cate.category.length; i++) {
          console.log(this.data.info.cate.category[i].id)
          if (this.data.info.cate.category[i].id == this.data.pid) {
            catename = this.data.info.cate.category[i].title
          }
        }
      } else {
        catename = this.data.catename;
      }
    }
    let cateid = cid != '' ? cid : this.data.pid;
    this.setData({
      cid: cid,
      cateid: cateid,
      sid: '',
      pagenum: 10,
      catename: catename,
    })
    this.getlist();
  },

  changezid: function(e) {
    let zid = e.currentTarget.dataset.zid;
    let zname = e.currentTarget.dataset.zname;
    this.setData({
      zid: zid,
      sid: '',
      pagenum: 10,
    })
    this.getlist();
  },

  changetype: function(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      sid: '',
      pagenum: 10,
    })
    this.getlist();
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
    app.globalData.keysword = '';
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.keysword = '';
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
    if (this.data.pagenum < this.data.info.course.count) {
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