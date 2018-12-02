// component/book-Item/book-item.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
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
    /**
     * 跳转到详情页
     */
    handleDetail: function() {
      wx.navigateTo({
        url: '../../pages/detail/detail?data=' + JSON.stringify(this.properties.data)
      })
    }
  },



})