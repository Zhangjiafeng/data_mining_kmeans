const app = getApp()
Page({
  data: {
    username:'',
    password:'',
    repassword:'',
    tel:'',
    name:'',
    address:'',
    credit:'',
    email:''
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      Pass: e.detail.value
    })
  },
  //获取输入账号
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  //获取输入email
  emailInput:function(e){
    this.setData({
      email:e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //获取输入的二次密码
  repasswordInput: function (e) {
    this.setData({
      repassword: e.detail.value
    })
  },
  // 获取输入姓名
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获取输入联系方式
  phoneInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //获取输入地址
  addressInput:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  //获取输入的证件号
  creditInput:function(e){
    this.setData({
      credit:e.detail.value
    })
  },
  //注册
  register:function(){
    var that=this;
    if (this.data.username.length == 0 || this.data.tel.length == 0 || this.data.credit.length == 0 || this.data.name.length==0||this.data.address.length==0||this.data.email.length==0){
      wx.showModal({
        title: '警告',
        content: '输入信息不完整',
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
    else if(this.data.password.length<6){
      wx.showModal({
        title: '警告',
        content: '密码强度过低',
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
    }else if(this.data.password!=this.data.repassword){
      wx.showModal({
        title: '警告',
        content: '两次输入密码不相同',
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
    }else{
     // console.log("asdasasasasasas");
      wx.request({
        url: app.globalData.URL+'cusRegister',
        data: {
          username:that.data.username,
          password:that.data.password,
          name:that.data.name,
          tel:that.data.tel,
          credit:that.data.credit,
          address:that.data.address,
          email:that.data.email
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          var info=res.data;
          wx.showModal({
            title: '提示',
            content: res.data,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                console.log(res.data);
                if(info=='注册成功'){
                  wx.switchTab({
                    url: '../mine/mine'
                  })
                }
               
              }
              // } else if (res.cancel) {
              //   console.log('用户点击取消')
              // }
            }
          })
          var err = res.data.err;
          if (err) {
            that.setData({
              error: err
            })
          } else {
            console.log(res.data);
  
          }
          return;
        }
      })
    }
  }
})