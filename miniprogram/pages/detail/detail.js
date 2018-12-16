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
    likeId: '',
    percent: 0,
    showPro: false,
    pre: app.globalData.pre,
    data: {},
    readed: ""
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
    });
    this.queryLike();
  },

  /**
   * 点击收藏
   */
  handleLike: function() {
    if (!this.data.like) {
      this.addBook();
    } else {
      this.removeBook();
    }
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
  onGetUserInfo: function(e) {
    console.log(e.detail)
    if (!this.logged && e.detail.userInfo) {

    }
  },

  queryLike: function() {
    const openid = app.globalData.openid;
    const bookName = this.data.data.name;
    const db = wx.cloud.database();
    db.collection('user-book').where({
      _openid: openid,
      bookName: bookName
    }).get({
      success: res => {
        if (res.data.length > 0) {
          const obj = res.data[0];
          this.setData({
            likeId: obj._id,
            like: true
          })
        }
      }
    })
  },

  /**
   * addbook
   */
  addBook: function() {
    const bookName = this.data.data.name;
    if (bookName) {
      const db = wx.cloud.database();
      db.collection('user-book').add({
        data: {
          bookName: bookName
        },
        success: res => {
          wx.showToast({
            icon: 'none',
            title: '收藏成功',
          })
          this.setData({
            like: !this.data.like
          })
        },
        fail: err => {
          console.log(err);
          wx.showToast({
            icon: 'none',
            title: '收藏失败，请重试'
          })
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '收藏失败，请重试'
      })
    }
  },

  /**
   * removeBook
   */
  removeBook: function() {
    const db = wx.cloud.database();
    const openid = app.globalData.openid;
    const bookName = this.data.data.name;
    db.collection('user-book').where({
      _openid: openid,
      bookName: bookName
    }).get({
      success: res => {
        if (res.data.length > 0) {
          const obj = res.data[0];
          db.collection('user-book')
            .doc(obj._id)
            .remove({
              success: res => {
                wx.showToast({
                  icon: 'none',
                  title: '取消收藏...',
                })
                this.setData({
                  like: !this.data.like
                })
              },
              fail: err => {
                console.log(err);
                wx.showToast({
                  icon: 'none',
                  title: '操作失败，请重试！'
                })
              }
            })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '操作失败，请重试！'
        })
      }
    });

  }
})