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
    like: false,
    percent: 0,
    showPro: false,
    pre: app.globalData.pre,
    data: {},
    readed:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    const pData = JSON.parse(options.data);
    const readed = wx.getStorageSync(pData.name);
    this.setData({
      data: pData,
      readed: readed
    })
  },

  /**
   * 点击收藏
   */
  handleLike: function() {
    wx.getSetting({
      success: res => {
        console.log(1, res);
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              if (res.code) {
                console.log(res);
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
        } else {

        }
      }
    })

    this.setData({
      like: !this.data.like
    })
  },

  /**
   * 阅读
   */
  handleRead: function() {
    const path = wx.getStorageSync(this.data.data.name);
    if (path) {
      this.openFile(path);
    } else {
      this.setData({
        showPro: true
      })
      const downloadTask = wx.downloadFile({
        url: app.globalData.filePre + "/book/" + this.data.data.name + ".pdf",
        success: (res) => {
          wx.setStorage({
            key: this.data.data.name,
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
        $wuxLoading().hide();
      },
      fail: () => {
        wx.removeStorageSync(this.data.data.name);
        this.handleRead();
      }
    })
  },

  /**
   * 点击获取授权
   */
  onGetUserInfo: function (e) {
    console.log(e.detail)
    if (!this.logged && e.detail.userInfo) {
      
    }
  }
})