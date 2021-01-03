// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goback: function (e) {
    wx.navigateBack({
      delta: 0,
      success: function (res) {
        let page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  bindAssets(){
    wx.navigateTo({
      url: '/pages/assets_limit/assets_limit',
    })
  },
  bindFixed(){
    wx.navigateTo({
      url: '/pages/fixed_index/fixed_index',
    })
  },
  bindAddFixed: function (e) {
    wx.navigateTo({
      url: '/pages/add_fixed/add_fixed',
    })
  },

  /**
   * 数据添加成功提示
   */
  showAddSuccess(e) {
    wx.showToast({
      title: '添加成功！',
    })
  },
  /**
   * 数据删除成功提示
   */
  showDeleteSuccess() {
    wx.showToast({
      title: '删除成功！',
    })
  },
  /**
   * 数据更改成功提示
   */
  showAlterSuccess() {
    wx.showToast({
      title: '修改成功！',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})