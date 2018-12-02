import {
  $wuxLoading
} from '../../component/index';

// miniprogram/pages/bookList/bookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    no:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.tag) {
      this.getDataByTag(options.tag);
    }
  },

  /**
   * 根据标签查询数据列表
   */
  getDataByTag: function(value) {
    $wuxLoading().show({
      text: '正在努力的找',
    })
    const db = wx.cloud.database()
    db.collection('book').where({
      tag: db.RegExp({
        regexp: value,
        options: 'i',
      })
    }).get().then(res => {
      if(res.data.length>0){
        this.setData({
          list: res.data
        });
      }else{
        this.setData({
          no:true
        })
      };
      $wuxLoading().hide();
    })
  }
})