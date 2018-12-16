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
      this.toggle(false);
    },
    returnHome() {
      wx.switchTab({
        url: '../../pages/search/search'
      });
    },
    toggle(value) {
      this.setData({
        show: value
      });
    }
  }
})