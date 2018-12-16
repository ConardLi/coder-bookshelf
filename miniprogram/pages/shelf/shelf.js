// miniprogram/pages/shelf/shelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        name: 'javascript高级程序设计'
      },
      {
        name: 'javascript高级程序设计'
      },
      {
        name: 'javascript高级程序设计'
      },
      {
        name: 'javascript高级程序设计'
      },
      {
        name: 'javascript高级程序设计'
      }
    ]
  },

  onLoad: function(options) {

  },

  onShow: function() {
    this.auth();
  },

  /**
   * 跳转到检索页
   */
  toSearch: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  /**
   * 用户授权
   */
  auth: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res);
            }
          });
          this.selectComponent("#auth").hide();
        } else {
          this.selectComponent("#auth").show();
        }
      }
    })
  },

  /**
   * 授权回调
   */
  authCallback(e) {
    console.log(e.detail);
  }
})