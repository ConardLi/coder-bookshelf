import {
  $wuxToast,
  $wuxLoading
} from '../../component/index'
import regeneratorRuntime from './../../utils/runtime.js';

const app = getApp();
const openid = app.globalData.openid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    value: '',
    tag: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  submit: async function() {
    const {
      name,
      value,
      tag
    } = this.data;
    if (name && value && tag) {
      try {
        await this.seatchSource(name);
        await this.addSource(name, value, tag);
        const arr = tag.split(',');
        console.log(arr);
        arr.forEach(async(tag) => {
          const exit = await this.searchTag(tag);
          if (!exit) {
            this.addTag(tag);
          }
        });
        $wuxToast().show({
          duration: 1500,
          color: '#fff',
          text: '成功！',
        })
      } catch (e) {
        $wuxToast().show({
          duration: 1500,
          color: '#fff',
          text: e.toString(),
        });
      }
    } else {
      $wuxToast().show({
        duration: 1500,
        color: '#fff',
        text: '有个空的！',
      })
    }
  },

  /**
   * 插入标签
   */
  addTag: function(tag) {
    $wuxLoading().show({
      text: `插入新标签：${tag}`,
    })
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('tag').add({
        data: {
          name:tag,
          type: 'data'
        },
        success: res => {
          $wuxLoading().hide();
          resolve(true);
        },
        fail: err => {
          $wuxLoading().hide();
          reject('插入标签失败了！');
        }
      })
    });
  },

  /**
   * 查询标签是否存在
   */
  searchTag: function(tag) {
    $wuxLoading().show({
      text: `查询是否存在${tag}标签`,
    })
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('tag').where({
        _openid: openid,
        name: tag,
        type: 'data'
      }).get({
        success: res => {
          $wuxLoading().hide();
          if (res.data.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    })
  },

  /**
   * 插入资源
   */
  addSource: function(name, value, tag) {
    $wuxLoading().show({
      text: `插入新资源：${name}`,
    })
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('source').add({
        data: {
          name,
          value,
          tag
        },
        success: res => {
          $wuxLoading().hide();
          resolve(true);
        },
        fail: err => {
          $wuxLoading().hide();
          reject('插入资源失败了！');
        }
      })
    });
  },

  /**
   * 查询资源是否存在
   */
  seatchSource: function(name) {
    $wuxLoading().show({
      text: '查询是否存在资源',
    })
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('source').where({
        _openid: openid,
        name: name
      }).get({
        success: res => {
          $wuxLoading().hide();
          if (res.data.length > 0) {
            reject('资源已存在');
          } else {
            $wuxToast().show({
              duration: 1500,
              color: '#fff',
              text: '新书！',
            })
            resolve(true);
          }
        }
      });
    })
  },

  nameChange: function(value) {
    this.setData({
      name: value.detail.value
    })
  },

  valueChange: function(value) {
    this.setData({
      value: value.detail.value
    })
  },

  tagChange: function(value) {
    this.setData({
      tag: value.detail.value
    })
  }
})