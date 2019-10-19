// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Infos: [],
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  outLogin:function(e){
    if(app.globalData.userName==null){
      wx.showModal({
        title: '提示',
        content: '暂时还没有登录',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
          // } else if (res.cancel) {
          //   console.log('用户点击取消')
          // }
        }
      })
      return;
    }
    app.globalData.userName=null;
    app.globalData.userTime=0;
    app.globalData.userID='';
    app.globalData.tel='';
    app.globalData.username='';
    wx.setStorage({
      key: 'userName',
      data: '',
    })
    wx.setStorage({
      key: 'userID',
      data: '',
    })
    wx.setStorage({
      key: 'username',
      data: '',
    })
    var that=this;
    that.setData({
      name:""
    })
    wx.showModal({
      title: '提示',
      content: '注销成功',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
        // } else if (res.cancel) {
        //   console.log('用户点击取消')
        // }
      }
    }) 
    // wx.showToast({
    //   title: '加载中...',
    //   icon: "loading",
    //   duration: 10000
    // });
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
    var that = this;
    that.setData({
      name: app.globalData.userName
    })
    console.log(app.globalData.userName);
  },
  serve: function () {
    wx.showModal({
      title: '联系电话',
      content: '18810151112',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
        // } else if (res.cancel) {
        //   console.log('用户点击取消')
        // }
      }
    })  
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