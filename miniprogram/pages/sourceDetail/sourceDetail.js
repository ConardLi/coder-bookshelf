import {
  $wuxToast,
  $wuxLoading
} from '../../component/index'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    this.setData({
      data: JSON.parse(options.data),
    });
  },

  /**
   * 阅读
   */
  handleRead: function() {

  },
})