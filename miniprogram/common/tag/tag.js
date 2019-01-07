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
    type: {
      type: String,
      value: 'book',
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
      let preUrl = '../../pages/bookList/bookList?tag=';
      if (this.properties.type === 'data'){
        preUrl = '../../pages/sourceList/sourceList?tag=';
      }
      wx.navigateTo({
        url: preUrl + this.properties.name,
      })
    }
  },

})