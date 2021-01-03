// pages/fixed_index/fixed_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //控制swiper切换
    fixed_expenses: null,
    fixed_incomes: null
  },

  // 返回上一页
  goback: function (e) {
    wx.navigateBack({
      delta: 0,
    })
  },

  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  // 点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
    /**
   * 数据添加成功提示
   */
  showAddSuccess() {
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
    this.getFixedExpensesAndIncomes()
  },
  /**
   * 数据更改成功提示
   */
  showAlterSuccess() {
    wx.showToast({
      title: '修改成功！',
    })
    this.getFixedExpensesAndIncomes()
  },
  /**
   * 获取固定收支
   */
  getFixedExpensesAndIncomes(e) {
    let that = this;
    wx.cloud.callFunction({
      name: 'fixed_index',
      data: {
        option: "getFixedExpensesAndIncomes",
      },
      success: res => {
        if (res.result) {
          if (res.result.fixed_expenses) {
            that.setData({
              fixed_expenses: res.result.fixed_expenses
            })
          } else {
            that.setData({
              fixed_expenses: null
            })
          }
          if (res.result.fixed_incomes) {
            that.setData({
              fixed_incomes: res.result.fixed_incomes
            })
          } else {
            that.setData({
              fixed_incomes: null
            })
          }
        } else {
          that.setData({
            fixed_expenses: null,
            fixed_incomes: null
          })
        }
        // console.log("res:", res.result)
      },
      fail: err => {
        console.log("err:", err)
      }
    })
  },
  // 跳转到修改操作页面
  expenseAlter: function (e) {
    // console.log("所点击列表下标：", e.currentTarget.dataset.id);
    var ID = e.currentTarget.dataset.id
    var object = {
      expenseID:ID,
      expense: this.data.fixed_expenses[ID],
      isExpense: true
    }
    wx.navigateTo({
      url: '/pages/alter_fixed/alter_fixed?object=' + JSON.stringify(object),
    })
  },
  // 跳转到修改操作页面
  incomeAlter: function (e) {
    // console.log("所点击列表下标：", e.currentTarget.dataset.id);
    var ID = e.currentTarget.dataset.id
    var object = {
      incomeID:ID,
      income:this.data.fixed_incomes[ID],
      isExpense: false
    }
    wx.navigateTo({
      url: '/pages/alter_fixed/alter_fixed?object=' + JSON.stringify(object),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
      if(options.showAddSuccess){
        this.showAddSuccess()
    }
    this.getFixedExpensesAndIncomes()
  }
})