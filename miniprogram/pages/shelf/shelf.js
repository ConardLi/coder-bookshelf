const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pre: app.globalData.pre,
    list: []
  },

  onLoad: function(options) {

  },

  onShow: function() {
    this.auth();
    this.queryBook();
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
  },

  /**
   * 查询书架
   */
  queryBook: function() {
    wx.showLoading({
      title: '正在整理书架...',
    })
    const openid = app.globalData.openid;
    const db = wx.cloud.database();
    db.collection('user-book').where({
      _openid: openid
    }).get({
      success: res => {
        this.setData({
          list: res.data
        })
        wx.hideLoading();
      },
      fail: err => {
        wx.hideLoading();
      }
    })
  },

  /**
   * 详情页
   */
  toDetail: function(e) {
    wx.showLoading({
      title: '努力查询中...',
    })
    const db = wx.cloud.database()
    db.collection('book').where({
      name: e.currentTarget.dataset.name
      })
      .get({
        success: res => {
          wx.navigateTo({
            url: '../../pages/detail/detail?data=' + JSON.stringify(res.data[0])
          });
          wx.hideLoading();
        },
        fail: err => {
          wx.hideLoading();
        }
      })
  }
})