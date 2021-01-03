// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //控制swiper切换
    //支出=============================================
    fixedExpensesKind: 0, //类型(0餐饮1交通2住宿3购物4订票5娱乐6其他)
    fixedExpensesName: '餐饮', //名称
    fixedExpensesAmount: 0, //数额
    fixedExpensesRemarks: null, //备注
    fixedExpensesWay: 0, //支付方式
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
    showMonthExpenses: false,
    showDateExpenses: false,
    selectedMonthExpenses: null,
    selectedDateExpenses: null,
    numListMonthExpenses: {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '7': false,
      '8': false,
      '9': false,
      '10': false,
      '11': false,
      '12': false,
    },
    numListDateExpenses: {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '7': false,
      '8': false,
      '9': false,
      '10': false,
      '11': false,
      '12': false,
      '13': false,
      '14': false,
      '15': false,
      '16': false,
      '17': false,
      '18': false,
      '19': false,
      '20': false,
      '21': false,
      '22': false,
      '23': false,
      '24': false,
      '25': false,
      '26': false,
      '27': false,
      '28': false,
      '29': false,
      '30': false,
      '31': false,
    },
    //收入=========================================
    fixedIncomesKind: 0, //类型(0工资1利息2投资3兼职4经营所得5中奖6其他)
    fixedIncomesName: '工资', //名称
    fixedIncomesAmount: 0, //数额
    fixedIncomesRemarks: null, //备注
    fixedIncomesWay: 0, //支付方式
    incomesKinds: [
      '工资',
      '利息',
      '投资',
      '兼职',
      '经营所得',
      '中奖',
      '其他'
    ],
    incomesWay: ['微信', '支付宝', '银行卡'],
    showMonthIncomes: false,
    showDateIncomes: false,
    selectedMonthIncomes: null,
    selectedDateIncomes: null,
    numListMonthIncomes: {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '7': false,
      '8': false,
      '9': false,
      '10': false,
      '11': false,
      '12': false,
    },
    numListDateIncomes: {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '7': false,
      '8': false,
      '9': false,
      '10': false,
      '11': false,
      '12': false,
      '13': false,
      '14': false,
      '15': false,
      '16': false,
      '17': false,
      '18': false,
      '19': false,
      '20': false,
      '21': false,
      '22': false,
      '23': false,
      '24': false,
      '25': false,
      '26': false,
      '27': false,
      '28': false,
      '29': false,
      '30': false,
      '31': false,
    },



    activeIconsMonth: {
      '1': '/images/add_fixed/month/active/1-active.png',
      '2': '/images/add_fixed/month/active/2-active.png',
      '3': '/images/add_fixed/month/active/3-active.png',
      '4': '/images/add_fixed/month/active/4-active.png',
      '5': '/images/add_fixed/month/active/5-active.png',
      '6': '/images/add_fixed/month/active/6-active.png',
      '7': '/images/add_fixed/month/active/7-active.png',
      '8': '/images/add_fixed/month/active/8-active.png',
      '9': '/images/add_fixed/month/active/9-active.png',
      '10': '/images/add_fixed/month/active/10-active.png',
      '11': '/images/add_fixed/month/active/11-active.png',
      '12': '/images/add_fixed/month/active/12-active.png'
    },
    inactiveIconsMonth: {
      '1': '/images/add_fixed/month/normal/1-normal.png',
      '2': '/images/add_fixed/month/normal/2-normal.png',
      '3': '/images/add_fixed/month/normal/3-normal.png',
      '4': '/images/add_fixed/month/normal/4-normal.png',
      '5': '/images/add_fixed/month/normal/5-normal.png',
      '6': '/images/add_fixed/month/normal/6-normal.png',
      '7': '/images/add_fixed/month/normal/7-normal.png',
      '8': '/images/add_fixed/month/normal/8-normal.png',
      '9': '/images/add_fixed/month/normal/9-normal.png',
      '10': '/images/add_fixed/month/normal/10-normal.png',
      '11': '/images/add_fixed/month/normal/11-normal.png',
      '12': '/images/add_fixed/month/normal/12-normal.png'
    },
    activeIconsDate: {
      '1': '/images/add_fixed/date/active/1-active.png',
      '2': '/images/add_fixed/date/active/2-active.png',
      '3': '/images/add_fixed/date/active/3-active.png',
      '4': '/images/add_fixed/date/active/4-active.png',
      '5': '/images/add_fixed/date/active/5-active.png',
      '6': '/images/add_fixed/date/active/6-active.png',
      '7': '/images/add_fixed/date/active/7-active.png',
      '8': '/images/add_fixed/date/active/8-active.png',
      '9': '/images/add_fixed/date/active/9-active.png',
      '10': '/images/add_fixed/date/active/10-active.png',
      '11': '/images/add_fixed/date/active/11-active.png',
      '12': '/images/add_fixed/date/active/12-active.png',
      '13': '/images/add_fixed/date/active/13-active.png',
      '14': '/images/add_fixed/date/active/14-active.png',
      '15': '/images/add_fixed/date/active/15-active.png',
      '16': '/images/add_fixed/date/active/16-active.png',
      '17': '/images/add_fixed/date/active/17-active.png',
      '18': '/images/add_fixed/date/active/18-active.png',
      '19': '/images/add_fixed/date/active/19-active.png',
      '20': '/images/add_fixed/date/active/20-active.png',
      '21': '/images/add_fixed/date/active/21-active.png',
      '22': '/images/add_fixed/date/active/22-active.png',
      '23': '/images/add_fixed/date/active/23-active.png',
      '24': '/images/add_fixed/date/active/24-active.png',
      '25': '/images/add_fixed/date/active/25-active.png',
      '26': '/images/add_fixed/date/active/26-active.png',
      '27': '/images/add_fixed/date/active/27-active.png',
      '28': '/images/add_fixed/date/active/28-active.png',
      '29': '/images/add_fixed/date/active/29-active.png',
      '30': '/images/add_fixed/date/active/30-active.png',
      '31': '/images/add_fixed/date/active/31-active.png'
    },
    inactiveIconsDate: {
      '1': '/images/add_fixed/date/normal/1-normal.png',
      '2': '/images/add_fixed/date/normal/2-normal.png',
      '3': '/images/add_fixed/date/normal/3-normal.png',
      '4': '/images/add_fixed/date/normal/4-normal.png',
      '5': '/images/add_fixed/date/normal/5-normal.png',
      '6': '/images/add_fixed/date/normal/6-normal.png',
      '7': '/images/add_fixed/date/normal/7-normal.png',
      '8': '/images/add_fixed/date/normal/8-normal.png',
      '9': '/images/add_fixed/date/normal/9-normal.png',
      '10': '/images/add_fixed/date/normal/10-normal.png',
      '11': '/images/add_fixed/date/normal/11-normal.png',
      '12': '/images/add_fixed/date/normal/12-normal.png',
      '13': '/images/add_fixed/date/normal/13-normal.png',
      '14': '/images/add_fixed/date/normal/14-normal.png',
      '15': '/images/add_fixed/date/normal/15-normal.png',
      '16': '/images/add_fixed/date/normal/16-normal.png',
      '17': '/images/add_fixed/date/normal/17-normal.png',
      '18': '/images/add_fixed/date/normal/18-normal.png',
      '19': '/images/add_fixed/date/normal/19-normal.png',
      '20': '/images/add_fixed/date/normal/20-normal.png',
      '21': '/images/add_fixed/date/normal/21-normal.png',
      '22': '/images/add_fixed/date/normal/22-normal.png',
      '23': '/images/add_fixed/date/normal/23-normal.png',
      '24': '/images/add_fixed/date/normal/24-normal.png',
      '25': '/images/add_fixed/date/normal/25-normal.png',
      '26': '/images/add_fixed/date/normal/26-normal.png',
      '27': '/images/add_fixed/date/normal/27-normal.png',
      '28': '/images/add_fixed/date/normal/28-normal.png',
      '29': '/images/add_fixed/date/normal/29-normal.png',
      '30': '/images/add_fixed/date/normal/30-normal.png',
      '31': '/images/add_fixed/date/normal/31-normal.png'
    },
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
  onChangeMonthExpenses(event) {
    let that = this;
    let arr = event.detail
    this.setData({
      selectedMonthExpenses: arr,
      numListMonthExpenses: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '10': false,
        '11': false,
        '12': false,
      },
    });
    for (var i = 0; i < arr.length; i++) {
      var key = `numListMonthExpenses.${arr[i]}`
      that.setData({
        [key]: true,
      })
    }
  },

  showPopupMonthExpenses() {
    this.setData({
      showMonthExpenses: true
    });
  },

  onCloseMonthExpenses() {
    this.setData({
      showMonthExpenses: false
    });
  },
  onChangeDateExpenses(event) {
    let arr = event.detail
    this.setData({
      selectedDateExpenses: arr,
      numListDateExpenses: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '10': false,
        '11': false,
        '12': false,
        '13': false,
        '14': false,
        '15': false,
        '16': false,
        '17': false,
        '18': false,
        '19': false,
        '20': false,
        '21': false,
        '22': false,
        '23': false,
        '24': false,
        '25': false,
        '26': false,
        '27': false,
        '28': false,
        '29': false,
        '30': false,
        '31': false,
      },
    });
    var key = `numListDateExpenses.${arr}`
    this.setData({
      [key]: true,
    })
  },
  showPopupDateExpenses() {
    this.setData({
      showDateExpenses: true
    });
  },
  onCloseDateExpenses() {
    this.setData({
      showDateExpenses: false
    });
  },
  // 点击图标
  chooseExpensesIcon: function (e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      fixedExpensesKind: id,
      fixedExpensesName: this.data.expensesKinds[id]
    })
  },
  //改变名称
  bindExpensesNameChange(e) {
    //console.log(e.detail.value)
    this.setData({
      fixedExpensesName: e.detail.value
    })
  },
  //改变金额
  bindExpensesAmountChange(e) {
    this.setData({
      fixedExpensesAmount: parseInt(e.detail.value)
    })
  },
  //改变备注
  bindExpensesRemarksChange(e) {
    //console.log(e)
    this.setData({
      fixedExpensesRemarks: e.detail.value
    })
  },
  // 改变支付方式
  bindExpensesWayChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      fixedExpensesWay: e.detail.value
    })
  },
  //提交信息
  addFixed_Expense() {
    // 插入记录
    if (this.data.selectedMonthExpenses == null) {
      wx.showToast({
        title: '请添加正确月份！',
      })
    } else if (this.data.selectedDateExpenses == null) {
      wx.showToast({
        title: '请添加正确日期！',
      })
    } else {
      let that = this;
      var fixedExpense = {
        fixedExpensesKind: that.data.fixedExpensesKind,
        fixedExpensesName: that.data.fixedExpensesName,
        fixedExpensesAmount: that.data.fixedExpensesAmount,
        fixedExpensesRemarks: that.data.fixedExpensesRemarks,
        fixedExpensesWay: that.data.fixedExpensesWay,
        fixedExpensesMonth: that.data.selectedMonthExpenses,
        fixedExpensesDate: that.data.selectedDateExpenses,
      }
      wx.cloud.callFunction({
          name: 'add_fixed',
          data: {
            option: "addFixed_Expense",
            fixedExpense: fixedExpense,
            fixedExpenseID: this.uuID()
          }
        }).then(res => {
          wx.redirectTo({
            url: '/pages/fixed_index/fixed_index?showAddSuccess=true'
          })
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '错误！',
          })
        })
    }


  },
  //========================================================================
  //收入
  onChangeMonthIncomes(event) {
    let that = this;
    let arr = event.detail
    this.setData({
      selectedMonthIncomes: arr,
      numListMonthIncomes: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '10': false,
        '11': false,
        '12': false,
      },
    });
    for (var i = 0; i < arr.length; i++) {
      var key = `numListMonthIncomes.${arr[i]}`
      that.setData({
        [key]: true,
      })
    }
  },

  showPopupMonthIncomes() {
    this.setData({
      showMonthIncomes: true
    });
  },

  onCloseMonthIncomes() {
    this.setData({
      showMonthIncomes: false
    });
  },
  onChangeDateIncomes(event) {
    let arr = event.detail
    this.setData({
      selectedDateIncomes: arr,
      numListDateIncomes: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '10': false,
        '11': false,
        '12': false,
        '13': false,
        '14': false,
        '15': false,
        '16': false,
        '17': false,
        '18': false,
        '19': false,
        '20': false,
        '21': false,
        '22': false,
        '23': false,
        '24': false,
        '25': false,
        '26': false,
        '27': false,
        '28': false,
        '29': false,
        '30': false,
        '31': false,
      },
    });
    var key = `numListDateIncomes.${arr}`
    this.setData({
      [key]: true,
    })
  },
  showPopupDateIncomes() {
    this.setData({
      showDateIncomes: true
    });
  },
  onCloseDateIncomes() {
    this.setData({
      showDateIncomes: false
    });
  },
  // 点击图标
  chooseIncomesIcon: function (e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      fixedIncomesKind: id,
      fixedIncomesName: this.data.incomesKinds[id]
    })
  },
  //改变名称
  bindIncomesNameChange(e) {
    //console.log(e.detail.value)
    this.setData({
      fixedIncomesName: e.detail.value
    })
  },
  //改变金额
  bindIncomesAmountChange(e) {
    this.setData({
      fixedIncomesAmount: parseInt(e.detail.value)
    })
  },
  //改变备注
  bindIncomesRemarksChange(e) {
    //console.log(e)
    this.setData({
      fixedIncomesRemarks: e.detail.value
    })
  },

  // 改变支付方式
  bindIncomesWayChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      fixedIncomesWay: e.detail.value
    })
  },

  //提交信息
  addFixed_Incomes() {
    // 插入记录
    if (this.data.selectedMonthIncomes == null) {
      wx.showToast({
        title: '请添加正确月份！',
      })
    } else if (this.data.selectedDateIncomes == null) {
      wx.showToast({
        title: '请添加正确日期！',
      })
    } else {
      let that = this;
      var fixedIncome = {
        fixedIncomesKind: that.data.fixedIncomesKind,
        fixedIncomesName: that.data.fixedIncomesName,
        fixedIncomesAmount: that.data.fixedIncomesAmount,
        fixedIncomesRemarks: that.data.fixedIncomesRemarks,
        fixedIncomesWay: that.data.fixedIncomesWay,
        fixedIncomesMonth: that.data.selectedMonthIncomes,
        fixedIncomesDate: that.data.selectedDateIncomes,
      }
      wx.cloud.callFunction({
          name: 'add_fixed',
          data: {
            option: "addFixed_Income",
            fixedIncome: fixedIncome,
            fixedIncomeID: this.uuID()
          }
        }).then(res => {
          wx.redirectTo({
            url: '/pages/fixed_index/fixed_index?showAddSuccess=true'
          })
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '错误！',
          })
        })
    }
  },

  uuID() {
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
  },

})