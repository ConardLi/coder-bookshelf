const app = getApp();

// common/uesrAuth/userAuth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    pre: app.globalData.pre,
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      if (e.detail.userInfo) {
        this.triggerEvent("authCallback", { userInfo : e.detail.userInfo});
      }else{
        this.triggerEvent("authCallback", false);
        this.hide();
      }
    },

    returnHome() {
      wx.switchTab({
        url: '../../pages/search/search'
      });
    },

    show() {
      this.setData({
        show: true
      });
    },

    hide() {
      this.setData({
        show: false
      });
    }
  }
})