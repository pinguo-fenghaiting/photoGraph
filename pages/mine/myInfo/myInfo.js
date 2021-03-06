var UserServer = require("../../../server/user.js").User;
var Alert = require("../../template/alert/alert.js").Alert;

Page({
  data:{
    // text:"这是一个页面",
    toastText: "",
    animationData: {},
    hidden: true,
    userData: {},
    avatar: '',
    nickname: '',
    gender: 0,
    mobile: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _userData = UserServer.getUserParams();
    this.setData({
      avatar: _userData.avatar,
      nickname: _userData.nickname,
      gender: _userData.gender,
      mobile:  _userData.mobile
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  handleChoseImage: function () {
    var _self = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        _self.setData({
          avatar: tempFilePaths
        })
      }
    });
  },
  // 修改性别
  handleChoseGender: function (event) {
    var _self = this;
    var _userData = this.data.userData; 
    var gender = event.currentTarget.dataset.gender;
    this.setData({
      gender: gender
    });
    UserServer.setGender(this.data.gender);
    UserServer.setUserName(this.data.nickname);

    wx.showToast({
      title: '修改中...',
      icon: 'loading',
      duration: 10000
    })

    UserServer.updateInfo({sex: this.data.gender}, function (result) {
      wx.hideToast()
      var data = result.data.data;
      if (data.sex == 0 || data.sex == 1) {
        UserServer.getUserParams().gender = data.sex;
        wx.showToast({
          title: '更新资料成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },
  // 修改昵称
  handleChangeNickname: function (event) {
    var _self = this;
    var _nickname = event.detail.value;
    this.setData({
      nickname: _nickname
    });
    UserServer.setGender(this.data.gender);
    UserServer.setUserName(this.data.nickname);

    wx.showToast({
      title: '修改中...',
      icon: 'loading',
      duration: 10000
    })

    UserServer.updateInfo({nickname: this.data.nickname}, function (result) {
      wx.hideToast()
      var data = result.data.data;
      if (data.nickname != "undefined") {
        UserServer.getUserParams().nickname = data.nickname;
        wx.showToast({
          title: '更新资料成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },
  // 退出登录
  handleLogout: function () {
    wx.showToast({
      title: '退出登录中...',
      icon: 'loading',
      duration: 10000
    })
    var _self = this;
    UserServer.loginOut(function () {
      wx.hideToast()
      wx.redirectTo({url: "../../../pages/index/index"});
    });
  }
})