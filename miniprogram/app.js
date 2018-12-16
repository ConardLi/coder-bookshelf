//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {
      pre: 'https://lsqimg-1257917459.cos-website.ap-beijing.myqcloud.com',
      filePre:'https://lsqfile-1257917459.cos.ap-beijing.myqcloud.com'
    }

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid;
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
      }
    })

  }
})