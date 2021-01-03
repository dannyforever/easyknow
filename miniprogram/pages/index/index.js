Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalAssets: 0,
    totalExpenses: 0,
    totalIncomes: 0,
    dailyLimit: 0,
    //==================================================================
    daily_expenses: null,
    daily_incomes: null,
    expensesWay: ['微信', '支付宝', '银行卡'],
    incomesWay: ['微信', '支付宝', '银行卡'],
    daily_time: null,
    //===================================================================
    calendarConfig: {
      inverse: false, // 单选模式下是否支持取消选中,
      theme: 'default',
      defaultDate: null, // 默认选中指定某天，如需选中需配置 autoChoosedWhenJump: true
      weekMode: false, // 周视图模式
      autoChoosedWhenJump: true, // 设置默认日期及跳转到指定日期后是否需要自动选中
    },
    //===================================================================
  },
  // 菜单
  gomenu: function (e) {
    wx.navigateTo({
      url: '/pages/menu/menu',
    })
  },
  //=======================================================
  afterTapDate(e) {
    var e = {
      year: e.detail.year,
      month: e.detail.month,
      date: e.detail.date
    }
    var date = this.formatDate(e)
    this.setData({
      daily_time: date
    })
    this.getDailyExpensesAndIncomes(date)
  },
  changeWeekMode() {
    const calendar = this.selectComponent('#calendar').calendar
    if (!this.week) {
      calendar['switchView']().then(calendarData => {
        console.log('switch success!', calendarData)
      })
      this.week = true
    } else {
      calendar['switchView']('week').then(calendarData => {})
      this.week = false
    }
  },
  //=======================================================
  // 跳转到修改操作页面
  expenseAlter: function (e) {
    // console.log("所点击列表下标：", e.currentTarget.dataset.id);
    var expense = this.data.daily_expenses[e.currentTarget.dataset.id]
    var dailyTime = this.data.daily_time.year + '-' + this.data.daily_time.month + '-' + this.data.daily_time.date
    var object = {
      dailyContent: expense,
      dailyTime: dailyTime,
      dailyIndex: e.currentTarget.dataset.id,
      isExpense: true
    }
    wx.navigateTo({
      // url: `/pages/alter_daily/alter_daily?isExpense=true&&t=${t}&&a=${a}&&k=${k}&&n=${n}&&r=${r}&&w=${w}`,
      url: '/pages/alter_daily/alter_daily?object=' + JSON.stringify(object),
    })
  },
  // 跳转到修改操作页面
  incomeAlter: function (e) {
    // console.log("所点击列表下标：", e.currentTarget.dataset.id);
    var income = this.data.daily_incomes[e.currentTarget.dataset.id]
    var dailyTime = this.data.daily_time.year + '-' + this.data.daily_time.month + '-' + this.data.daily_time.date
    var object = {
      dailyContent: income,
      dailyTime: dailyTime,
      dailyIndex: e.currentTarget.dataset.id,
      isExpense: false
    }
    wx.navigateTo({
      url: '/pages/alter_daily/alter_daily?object=' + JSON.stringify(object),
    })
  },
  //==========================================================
  // 前往记账
  addDaily: function (e) {
    wx.navigateTo({
      url: '/pages/add_daily/add_daily',
    })
  },
  deleteDailyExpense(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success(res) {
        if (res.confirm) {
          var dic = {
            dailyType: "daily_expenses",
            dailyIndex: e.currentTarget.dataset.id,
            totalKind: "totalExpenses",
            totalAmount: (that.data.daily_expenses[e.currentTarget.dataset.id].dailyExpensesAmount)
          }
          that.deleteDaily(dic)
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  deleteDailyIncome(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success(res) {
        if (res.confirm) {
          var dic = {
            dailyType: "daily_incomes",
            dailyIndex: e.currentTarget.dataset.id,
            totalKind: "totalIncomes",
            totalAmount: -(that.data.daily_incomes[e.currentTarget.dataset.id].dailyIncomesAmount)
          }
          that.deleteDaily(dic)
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  deleteDaily(e) {
    // console.log(e)
    let daily_time = this.data.daily_time
    wx.cloud.callFunction({
      name: 'index',
      data: {
        option: "deleteDaily",
        dailyType: e.dailyType,
        dailyYear: daily_time.year,
        dailyMonth: daily_time.month,
        dailyDate: daily_time.date,
        dailyIndex: e.dailyIndex,
        totalAmount: e.totalAmount,
        totalKind: e.totalKind
      },
      success: res => {
        // console.log('res',res)
        this.showDeleteSuccess();
      },
      fail: err => {
        console.log("err:", err)
      }
    })
  },
  /**
   * 数据添加成功提示
   */
  showAddSuccess() {
    wx.showToast({
      title: '添加成功！',
    })
    var d = new Date();
    var e = {
      year: d.getFullYear(),
      month: (d.getMonth() + 1),
      date: d.getDate()
    }
    var date = this.formatDate(e)
    const calendar = this.selectComponent('#calendar').calendar
    calendar
      .jump({
        year: date.year,
        month: date.month,
        date: date.date
      })
      .then()
  },
  /**
   * 数据删除成功提示
   */
  showDeleteSuccess() {
    wx.showToast({
      title: '删除成功！',
    })
    this.getDailyExpensesAndIncomes(this.data.daily_time);
  },
  /**
   * 数据更改成功提示
   */
  showAlterSuccess() {
    wx.showToast({
      title: '修改成功！',
    })
    this.getDailyExpensesAndIncomes(this.data.daily_time);
  },

  /**
   * 渲染当日收支
   */
  getDailyExpensesAndIncomes(e) {
    this.setData({
      daily_expenses: null,
      daily_incomes: null
    })
    let that = this;
    wx.cloud.callFunction({
      name: 'index',
      data: {
        option: "getDailyExpensesAndIncomes",
        dailyYear: e.year,
        dailyMonth: e.month,
        dailyDate: e.date
      },
      success: res => {
        if (res.result.data.length > 0) {
          let dailyExpensesIsEmpty = this.isEmptyObject(res.result.data[0].daily_expenses)
          let dailyIncomesIsEmpty = this.isEmptyObject(res.result.data[0].daily_incomes)
          that.setData({
            totalAssets: res.result.data[0].totalAssets,
            totalExpenses: res.result.data[0].totalExpenses,
            totalIncomes: res.result.data[0].totalIncomes,
            dailyLimit: res.result.data[0].dailyLimit,
          })
          if (!dailyExpensesIsEmpty && !dailyIncomesIsEmpty) {
            that.setData({
              daily_expenses: res.result.data[0].daily_expenses[e.year][e.month][e.date],
              daily_incomes: res.result.data[0].daily_incomes[e.year][e.month][e.date]
            })
          } else if (dailyExpensesIsEmpty && dailyIncomesIsEmpty) {
            that.setData({
              daily_expenses: null,
              daily_incomes: null
            })
          } else if (dailyExpensesIsEmpty) {
            that.setData({
              daily_expenses: null,
              daily_incomes: res.result.data[0].daily_incomes[e.year][e.month][e.date]
            })
          } else if (dailyIncomesIsEmpty) {
            that.setData({
              daily_expenses: res.result.data[0].daily_expenses[e.year][e.month][e.date],
              daily_incomes: null
            })
          }
        } else {
          that.setData({
            daily_expenses: null,
            daily_incomes: null
          })
        }
        //  console.log("res:",res.result)
      },
      fail: err => {
        console.log("err:", err)
      }
    })
  },
  isEmptyObject(obj) {
    for (var n in obj) {
      return false
    }
    return true;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(options){
    //   if(options.showAddSuccess){
    //     this.showAddSuccess()
    //   }
    // }
    var d = new Date();
    var e = {
      year: d.getFullYear(),
      month: (d.getMonth() + 1),
      date: d.getDate()
    }
    var date = this.formatDate(e)
    var time = date.year + '-' + date.month + '-' + date.date;
    this.setData({
      daily_time: date,
      ['calendarConfig.defaultDate']: time
    })
    this.getDailyExpensesAndIncomes(date)
  },


  //===================================================================
  //日期格式转为日期标准字符串：2020-12-20
  formatDate(e) {
    var time = e;
    if (time.month < 10) {
      time.month = "0" + time.month;
    }
    if (time.date < 10) {
      time.date = "0" + time.date
    }
    return time;
  }

})