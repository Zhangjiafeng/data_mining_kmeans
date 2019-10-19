const app = getApp()
Page({
  data: {
    Info:[],
    name:'',
    id:'',
    date:'2019-12-12',
    year:0,
    month:0,
    day:0,
    start:'',
    end:''
  },
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },

  onLoad:function (params) {
    var that=this;
    console.log("id="+params.id);
    that.setData({
      id:params.id
    });

    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:1000
    });
    wx.request({
      url: app.globalData.URL+'getCusById',
      data:{
        id:params.id
      }, 
      method:'POST',
      success:function(res){
        wx.hideToast();
        var err = res.data.err;
        if (err) {
          that.setData({
            error: err
          })
        } else {
          console.log(res.data);
          var data=res.data;
           that.setData({
             Info:res.data
           })
        }
      }
    })
  },

  enroll:function(){
    var that=this;
    if(app.globalData.userID){
      wx.request({
        url: app.globalData.URL+'cusSubscribe',
        data: {
          userid: app.globalData.userID,
          userName: app.globalData.userName,
          teacherid:that.data.Info._id,
          teachername:that.data.Info.name,
          date:that.data.date,
          teacherName:that.data.Info.name
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: res.data,
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
        }
      }) 
        
    }
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
      name: app.globalData.userName,
      year:app.globalData.year,
      month:app.globalData.month,
      day:app.globalData.day,
      start:app.globalData.year+'-'+app.globalData.month+'-'+app.globalData.day,
      end: (app.globalData.year+1) + '-' + 12 + '-' + 31,
      date: app.globalData.year + '-' + app.globalData.month + '-' +app.globalData.day
    })
    console.log(app.globalData.userName);
   // console.log(that.data.name);
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