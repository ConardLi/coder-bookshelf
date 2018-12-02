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
    pre: 'https://lsqimg-1257917459.cos-website.ap-beijing.myqcloud.com'
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