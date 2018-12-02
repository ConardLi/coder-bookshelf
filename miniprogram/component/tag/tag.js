// pages/search/tag/tag.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pre: app.globalData.pre
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick: function() {
      wx.navigateTo({
        url: '../../pages/bookList/bookList?tag=' + this.properties.name,
      })
    }
  },

})