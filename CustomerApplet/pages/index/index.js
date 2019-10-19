// pages/tiding/tiding.js
const app = getApp();
var a = -1;
var b = -1;
var c = -1;
var d = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    states:0,
    time:0,
    score:0,
    username: '',
    AllData:[],
    Data: [],
    teachTimes:[{value:'1',text:'小于40次',checked:false},{value:'2',text:'40-60次',checked:false},{value:'3',text:'大于60次',checked:false}],
    teachScores: [{ value: '1', text: '小于7.5分', checked: false }, { value: '2', text: '7.5-8.5分', checked: false }, { value: '3', text: '大于8.5分', checked: false }]
  },
  changeScore:function(e){
    //console.log(e.detail.value);
    this.setData({
      score:e.detail.value
    })
  },
  changeTime:function(e){
   //console.log(e.detail)
    this.setData({
      time:e.detail.value
    })
  },
  alltea:function(){
    var data=this.data.AllData;
    this.setData({
      Data:data
    })
  },
  complete:function(){
    this.setData({
      states:0
    })
    var that=this;
    var data=that.data.AllData;
    console.log(that.data.score)
    if(that.data.score==1){
      data=data.filter(function(item){
        return item.evaluation<7.5
      })
    }else if(that.data.score==2){
      data = data.filter(function (item) {
        return item.evaluation >= 7.5 && item.evaluation<8.5
      })
    }else if(that.data.score==3){
      data = data.filter(function (item) {
        //console.log(item)
        return item.evaluation >= 8.5
      })
    }
    if(that.data.time==1){
      data=data.filter(function(item){
        return item.times<40
      })
    }else if(that.data.time==2){
      data=data.filter(function(item){
        return item.times>=40&&item.times<60
      })
    }else if(that.data.time==3){
      data=data.filter(function(item){
        return item.times>=60
      })
    }
    that.setData({
      Data:data
    })
  },
  changeBoxBtn: function (e) {
    // console.log(e.target.dataset.num)
    var that=this;
    if(that.data.states==0){
      this.setData({
        states:3
      })
    }else{
      this.setData({
        states:0
      })
    }
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
    })
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
  gtLogin: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'userName',
      success: function(res) {
        app.globalData.userName=res.data
       // console.log(res)
      },
    })
    wx.getStorage({
      key: 'userID',
      success: function(res) {
        app.globalData.userID=res.data
      },
    })
    wx.getStorage({
      key: 'username',
      success: function(res) {
        app.globalData.username=res.data

      },
    })
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
        url: app.globalData.URL+'recommendTeacher',
        data: {
          id: app.globalData.userID
        },
        method: 'POST',
        success: function (res) {
          wx.hideToast();
          var data = res.data;
          that.setData({
            Data: data,
            AllData:data
          })
          console.log(res.data)
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