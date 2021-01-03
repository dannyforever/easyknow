// pages/index/index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    assets: 0,
    limit: 0
  },
  goback: function (e) {
    wx.navigateBack({
      delta: 0,
    })
  },
  bindAssetsChange(e) {
    this.setData({
      assets: parseInt(e.detail.value)
    })
  },
  bindLimitChange(e) {
    this.setData({
      limit: parseInt(e.detail.value)
    })
  },
  updateAssetsTap() {
    let that = this;
    let totalAssets = Number(that.data.assets)
    if (!isNaN(totalAssets)) {
      wx.cloud.callFunction({
          name: 'index',
          data: {
            option: 'updateTotalAssets',
            totalAssets: totalAssets
          }
        }).then(res => {
          // console.log(res)
          wx.showToast({
            title: '更新成功！',
          })
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '错误！',
          })
        })
    } else {
      wx.showToast({
        title: '请输入数字！',
      })
    }
  },
  updateLimitTap() {
    let that = this;
    let dailyLimit = that.data.limit;
    if (!isNaN(dailyLimit)) {
      wx.cloud.callFunction({
          name: 'index',
          data: {
            option: 'updateDailyLimit',
            dailyLimit: that.data.limit
          }
        }).then(res => {
          // console.log(res)
          wx.showToast({
            title: '更新成功！',
          })
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '错误！',
          })
        })
    } else {
      wx.showToast({
        title: '请输入数字！',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.cloud.callFunction({
      name: 'index',
      data: {
        option: 'getAssetsAndLimit',
      },
      success: res => {
        that.setData({
          assets: res.result['totalAssets'],
          limit: res.result['dailyLimit']
        })
      },
      fail: err => {
        console.log("err:", err)
      }
    })
  }
})