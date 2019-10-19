// pages/tiding/tiding.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    Data: [],
    AllData:[],
    times:0,
    btnLeft:'Orange',
    btnRight:'',
    iconDis:true,
    hidden:true,
    subScore:10,
    sendId:''
  },
  haveDealed:function(){
    this.setData({
      btnRight: '',
      btnLeft: 'Orange',
      iconDis:true
    })
    var that = this;
    var data = that.data.AllData;
    data = data.filter(function (item) {
      return !item.status
    })
    that.setData({
      Data: data
    })
  },
  notDealed:function(){
    this.setData({
       btnLeft: '',
      btnRight: 'Orange',
      iconDis:false
    })
    var that=this;
    var data=that.data.AllData;
    data=data.filter(function(item){
      return item.status
    })
    that.setData({
      Data:data
    })
  },
  orderCancel:function(e){
    var that=this;
    wx.request({
      url: app.globalData.URL+'cancelOrder',
      data:{
        id:e.currentTarget.dataset.id
      },
      method:'POST',
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '成功处理',
          showCancel: false,
          success: function (res) {
            var data = that.data.AllData;
            for (let i = 0; i < data.length; i++) {
              if (data[i]._id == e.currentTarget.dataset.id) {
                data.splice(i,1);
                break;
              }
            }
            that.setData({
              AllData: data
            })
            that.haveDealed();
          }
        }) 
      }
    })
  },
  orderConfirm:function(e){
    console.log(e.currentTarget.dataset.id);
    var that=this;
    that.setData({
      hidden:false,
      sendId: e.currentTarget.dataset.id
    })
  },

  gtLogin: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this;

    that.setData({
      username: app.globalData.username
    });
    if (app.globalData.username != '') {
      wx.showToast({
        title: '加载中...',
        icon: "loading",
        duration: 10000
      });
      wx.request({
        url: app.globalData.URL+'getOrderList',
        data: {
          id: app.globalData.userID
        },
        method: 'POST',
        success: function (res) {
          wx.hideToast();
          var data = res.data;
          that.setData({
            AllData:data
          })
          data=data.filter(function(item){
            return !item.status
          })
          that.setData({
            Data: data
          })
          console.log(data)
        }
      })
    }
  },
  modifyInput: function (e) {
    this.setData({
      subScore: e.detail.value
    })
  },

  modalCancel: function () {
    this.setData({
      hidden: !this.data.hidden
    })
  },

  modalConfirm: function () {
    var that = this;
    var score = Number(this.data.subScore);
    if (score<0||score>10) {
      this.setData({
        hidden: !this.data.hidden
      })
      wx.showModal({
        title: '提示',
        content: '评分应在0-10分',
        showCancel: false
      });


    } else if (isNaN(score)) {
      this.setData({
        hidden: !this.data.hidden
      })
      wx.showModal({
        title: '提示',
        content: '请输入0-10内的数字!' ,
        showCancel: false
      });
    } else {
      this.setData({
        hidden: !this.data.hidden
      })
      wx.showModal({
        title: '提示',
        content: '确定评分为：' + score + '分？',
        success: function (res) {
          if (res.confirm) {
            // todo 向数据库发送数据

            console.log(that.data);
             wx.request({
              url: app.globalData.URL+'confirmOrder',
              data: {
                id: that.data.sendId,
                score:score
              },
              method: 'POST',
              success: function (res) {
                wx.showModal({
                  title: '提示',
                  content: '成功处理',
                  showCancel: false,
                  success: function (res) {
                    var data=that.data.AllData;
                    for(let i=0;i<data.length;i++){
                      if(data[i]._id==that.data.sendId){
                        data[i].status=1;
                      }
                    }
                    that.setData({
                      AllData:data,
                      sunScore:10
                    })
                    that.haveDealed();
                  }
                }) 
              }
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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