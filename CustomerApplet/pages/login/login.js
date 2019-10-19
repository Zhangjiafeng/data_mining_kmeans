const app = getApp()
Page({
  data: {
    Name: '',
    Pass: '',
    Info:{}
  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      Name: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      Pass: e.detail.value
    })
  },
  login: function () {
    var that = this;
    if(that.data.Name==""||that.data.Pass==""){
      wx.showModal({
        title: '提示',
        content: '请输入完整信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })  
      return;
    }
    wx.request({
      url: app.globalData.URL+'cusLogin',
      data: {
        username: that.data.Name,
        password:that.data.Pass
      },
      method: 'POST',
      success: function (res) {
       if(res.data==''){
         wx.showModal({
           title: '提示',
           content: '输入信息有误',
           showCancel: false,
           success: function (res) {
           
             if (res.confirm) {
               console.log('用户点击确定')
             }
           }
         })  
         return;
       }else{
        var err = res.data.err;
        if (err) {
          console.log('error')
          that.setData({
            error: err
          })
        } else {
          that.setData({
            Info: res.data
          })
          wx.setStorage({
            key: 'userName',
            data: res.data[0].name,
          })
          wx.setStorage({
            key: 'userID',
            data: res.data[0]._id,
          })
          wx.setStorage({
            key: 'username',
            data: res.data[0].username,
          })
          app.globalData.userName = res.data[0].name;
          app.globalData.userID = res.data[0]._id;
      
          app.globalData.tel = res.data[0].tel;
          app.globalData.username = res.data[0].username;
          console.log('id='+res.data[0]._id)
          wx.showModal({
            title: '提示',
            content: '登录成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../mine/mine'
                })
              }
             
            }
          }) 
          
        }
        return;
      }}
    })
  }
})