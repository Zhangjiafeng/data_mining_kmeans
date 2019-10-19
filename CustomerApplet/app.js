//app.js
App({
  onLaunch:function(){
    var that=this;
    var date=new Date();
    that.globalData.year=date.getFullYear();
    that.globalData.month=date.getMonth()+1;
    that.globalData.day=date.getDate();
    console.log(date.getDate())
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.globalData.userName = res.data
        // console.log(res)
      },
    })
    wx.getStorage({
      key: 'userID',
      success: function (res) {
        that.globalData.userID = res.data
      },
    })
    wx.getStorage({
      key: 'username',
      success: function (res) {
        that.globalData.username = res.data
      },
    })
  },
  globalData: {
    URL:'http://39.106.149.14:8080/',
    userName:null,
    userID:'',
    tel:'',
    username:'',
    year:2019,
    month:1,
    day:1
  }
})
