// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //控制swiper切换
    //支出=============================================
    dailyExpensesKind: 0, //类型(0餐饮1交通2住宿3购物4订票5娱乐6其他)
    dailyExpensesName: '餐饮', //名称
    dailyExpensesTime: null, //时间
    dailyExpensesAmount: 0, //数额
    dailyExpensesRemarks: null, //备注
    dailyExpensesWay: 0, //支付方式

    dailyExpensesYear: null,
    dailyExpensesMonth: null,
    dailyExpensesDate: null,

    expensesKinds: [
      '餐饮',
      '交通',
      '住宿',
      '购物',
      '订票',
      '娱乐',
      '其他'
    ],
    expensesWay: ['微信', '支付宝', '银行卡'],
    //收入=========================================
    dailyIncomesKind: 0, //类型(0工资1利息2投资3兼职4经营所得5中奖6其他)
    dailyIncomesName: '工资', //名称
    dailyIncomesTime: null, //时间
    dailyIncomesAmount: 0, //数额
    dailyIncomesRemarks: null, //备注
    dailyIncomesWay: 0, //支付方式

    dailyIncomesYear: null,
    dailyIncomesMonth: null,
    dailyIncomesDate: null,

    incomesKinds: [
      '工资',
      '利息',
      '投资',
      '兼职',
      '经营所得',
      '中奖',
      '其他'
    ],
    incomesWay: ['微信', '支付宝', '银行卡']
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
  //========================================================================
  //支出
  // 点击图标
  chooseExpensesIcon: function (e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      dailyExpensesKind: id,
      dailyExpensesName: this.data.expensesKinds[id]
    })
  },
  //改变名称
  bindExpensesNameChange(e) {
    //console.log(e.detail.value)
    this.setData({
      dailyExpensesName: e.detail.value
    })
  },
  // 改变日期值
  bindExpensesDateChange(e) {
    // var strDate = e.detail.value.split(" ");
    // console.log("strDate:",strDate)
    var strDatepart = e.detail.value.split("-");
    // console.log("strDatepart:",strDatepart)
    this.setData({
      dailyExpensesTime: e.detail.value,
      dailyExpensesYear: strDatepart[0],
      dailyExpensesMonth: strDatepart[1],
      dailyExpensesDate: strDatepart[2]
    })
  },
  //改变金额
  bindExpensesAmountChange(e) {
    this.setData({
      dailyExpensesAmount: parseInt(e.detail.value)
    })
  },
  //改变备注
  bindExpensesRemarksChange(e) {
    //console.log(e)
    this.setData({
      dailyExpensesRemarks: e.detail.value
    })
  },

  // 改变支付方式
  bindExpensesWayChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      dailyExpensesWay: e.detail.value
    })
  },

  //提交信息
  addDaily_Expense() {
    // 插入记录
    let that = this;
    var dailyExpense = {
      dailyExpensesKind: that.data.dailyExpensesKind,
      dailyExpensesName: that.data.dailyExpensesName,
      dailyExpensesAmount: that.data.dailyExpensesAmount,
      dailyExpensesRemarks: that.data.dailyExpensesRemarks,
      dailyExpensesWay: that.data.dailyExpensesWay
    }
    // console.log('dailyExpense:',dailyExpense)
    wx.cloud.callFunction({
        name: 'add_daily',
        data: {
          option: "addDaily_Expense",
          dailyExpensesYear: that.data.dailyExpensesYear,
          dailyExpensesMonth: that.data.dailyExpensesMonth,
          dailyExpensesDate: that.data.dailyExpensesDate,
          dailyExpense: dailyExpense
        }
      }).then(res => {
        wx.navigateBack({
          delta: 1,
          success: function (res) {
            let pages = getCurrentPages();
            pages[0].showAddSuccess();
          }
        })
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: '错误！',
        })
      })

  },


  //========================================================================
  //收入
  // 点击图标
  chooseIncomesIcon: function (e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      dailyIncomesKind: id,
      dailyIncomesName: this.data.incomesKinds[id]
    })
  },
  //改变名称
  bindIncomesNameChange(e) {
    //console.log(e.detail.value)
    this.setData({
      dailyIncomesName: e.detail.value
    })
  },
  // 改变日期值
  bindIncomesDateChange(e) {
    // var strDate = e.detail.value.split(" ");
    // console.log("strDate:",strDate)
    var strDatepart = e.detail.value.split("-");
    //console.log("strDatepart:",strDatepart)
    this.setData({
      dailyIncomesTime: e.detail.value,
      dailyIncomesYear: strDatepart[0],
      dailyIncomesMonth: strDatepart[1],
      dailyIncomesDate: strDatepart[2]
    })
  },
  //改变金额
  bindIncomesAmountChange(e) {
    this.setData({
      dailyIncomesAmount: parseInt(e.detail.value)
    })
  },
  //改变备注
  bindIncomesRemarksChange(e) {
    //console.log(e)
    this.setData({
      dailyIncomesRemarks: e.detail.value
    })
  },

  // 改变支付方式
  bindIncomesWayChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      dailyIncomesWay: e.detail.value
    })
  },

  //提交信息
  addDaily_Incomes() {
    console.log()
    // 插入记录
    let that = this;
    var dailyIncomes = {
      dailyIncomesKind: that.data.dailyIncomesKind,
      dailyIncomesName: that.data.dailyIncomesName,
      dailyIncomesAmount: that.data.dailyIncomesAmount,
      dailyIncomesRemarks: that.data.dailyIncomesRemarks,
      dailyIncomesWay: that.data.dailyIncomesWay
    }
    wx.cloud.callFunction({
        name: 'add_daily',
        data: {
          option: "addDaily_Incomes",
          dailyIncomesYear: that.data.dailyIncomesYear,
          dailyIncomesMonth: that.data.dailyIncomesMonth,
          dailyIncomesDate: that.data.dailyIncomesDate,
          dailyIncomes: dailyIncomes
        }
      }).then(res => {
        wx.navigateBack({
          delta: 1,
          success: function (res) {
            let pages = getCurrentPages();
            pages[0].showAddSuccess();
          }
        })
      })
      .catch(err => {
        console.log(err)
        wx.showToast({
          title: '错误！',
        })
      })

  },

  //========================================================================

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //初始化日期
    var d = new Date();
    var e = {
      year: d.getFullYear(),
      month: (d.getMonth() + 1),
      date: d.getDate()
    }
    var date = this.formatDate(e)
    var time = date.year + '-' + date.month + '-' + date.date;
    this.setData({
      dailyExpensesYear: date.year,
      dailyExpensesMonth: date.month,
      dailyExpensesDate: date.date,
      dailyExpensesTime: time,
      dailyIncomesYear: date.year,
      dailyIncomesMonth: date.month,
      dailyIncomesDate: date.date,
      dailyIncomesTime: time
    })
  },
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