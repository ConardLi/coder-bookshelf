// pages/search/tag/tag.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick: function() {
      wx.navigateTo({
        url: '../../pages/bookList/bookList?name=' + this.properties.name,
      })
    }
  },

})