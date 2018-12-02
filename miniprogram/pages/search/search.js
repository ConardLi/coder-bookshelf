import {
  $wuxLoading
} from '../../component/index';

const tabs = ["tab1", "tab2"];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    index: 0,
    bookTags: [],
    dataTages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData('book', 'bookTags');
    this.initData('data', 'dataTags');
  },

  /**
   * 初始化数据
   */
  initData(type, data) {
    $wuxLoading().show({
      text: '正在加载类别',
    })
    const db = wx.cloud.database()
    db.collection('tag').where({
      type: type
    }).get().then(res => {
      this.setData({
        [data]: res.data
      });
      $wuxLoading().hide();
    })
  },

  /**
   * 点击tab 
   */
  onTabsChange(e) {
    const {
      key
    } = e.detail
    this.setData({
      current: key,
      index: tabs.indexOf(key)
    })
  },

  /**
   * 数据滑动变化
   */
  onSwiperChange(e) {
    const {
      current
    } = e.detail
    this.setData({
      current: tabs[current],
      index: current,
    })
  },
})