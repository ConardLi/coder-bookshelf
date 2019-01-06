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
    author: '',
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
      author,
      tag
    } = this.data;
    if (name && author && tag) {
      try {

        await this.seatchBook(name);
        await this.addBook(name, author, tag);
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
          type: 'book'
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
        type: 'book'
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
   * 插入书籍
   */
  addBook: function(name, author, tag) {
    $wuxLoading().show({
      text: `插入新书籍：${name}`,
    })
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('book').add({
        data: {
          name,
          author,
          tag
        },
        success: res => {
          $wuxLoading().hide();
          resolve(true);
        },
        fail: err => {
          $wuxLoading().hide();
          reject('插入书籍失败了！');
        }
      })
    });
  },

  /**
   * 查询书籍是否存在
   */
  seatchBook: function(name) {
    $wuxLoading().show({
      text: '查询是否存在书籍',
    })
    return new Promise((resolve, reject) => {
      const db = wx.cloud.database();
      db.collection('book').where({
        _openid: openid,
        name: name
      }).get({
        success: res => {
          $wuxLoading().hide();
          if (res.data.length > 0) {
            reject('书籍已存在');
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

  authorChange: function(value) {
    this.setData({
      author: value.detail.value
    })
  },

  tagChange: function(value) {
    this.setData({
      tag: value.detail.value
    })
  }
})