import {
  $wuxToast,
  $wuxLoading
} from '../../component/index'

// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like: false,
    percent: 0,
    showPro: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log(110)
  },

  /**
   * 点击收藏
   */
  handleLike: function() {
    this.setData({
      like: !this.data.like
    })
  },

  /**
   * 阅读
   */
  handleRead: function() {
    const path = wx.getStorageSync('tempFilePath');
    if (path) {
      this.openFile(path);
    } else {
      this.setData({
        showPro: true
      })
      const downloadTask = wx.downloadFile({
        url: 'https://636f-coder-bookshelf-db68e0-1258175022.tcb.qcloud.la/pdf/React in Action.pdf?sign=a7e67f4fc47a3a23ed80f0f9cac44ab7&t=1543670390',
        success: (res) => {
          wx.setStorage({
            key: "tempFilePath",
            data: res.tempFilePath
          })
          this.openFile(res.tempFilePath);
        },
        fail: function(res) {
          this.setData({
            showPro: false
          })
          $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: '下载失败，请重试！',
          })
        }
      });

      downloadTask.onProgressUpdate((res) => {
        const temp = res.totalBytesWritten / res.totalBytesExpectedToWrite * 100;
        this.setData({
          percent: temp.toFixed(2)
        })
      })
    }
  },

  /**
   * 打开文件
   */
  openFile(src) {
    console.log(1);
    this.setData({
      showPro: false,
      percent: 0
    })
    $wuxLoading().show({
      text: '正在加载图书',
    })
    wx.openDocument({
      filePath: src,
      success: (res) => {
        console.log(2);
        $wuxLoading().hide();
      },
      fail:()=>{
        wx.removeStorageSync('tempFilePath')
        this.handleRead();
      }
    })
  }
})