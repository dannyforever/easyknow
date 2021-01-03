 // pages/alter_daily/alter_daily.js
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     //-----------------------------------------------------------------
     daily_type: null,
     isExpense: false,
     previousDailyTime: null,
     previousDailyIndex: null,
     previousExpensesAmount: 0,
     previousIncomesAmount: 0,
     //-----------------------------------------------------------------
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
     //console.log("strDatepart:",strDatepart)
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
       dailyExpensesAmount: e.detail.value
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
   //提交支出修改信息
   alterDaily_Expense() {
     // 插入记录
     let that = this;
     var dailyExpense = {
       dailyExpensesKind: that.data.dailyExpensesKind,
       dailyExpensesName: that.data.dailyExpensesName,
       dailyExpensesAmount: that.data.dailyExpensesAmount,
       dailyExpensesRemarks: that.data.dailyExpensesRemarks,
       dailyExpensesWay: that.data.dailyExpensesWay
     }
     var e = {
       dailyType: "daily_expenses",
       dailyTime: that.data.dailyExpensesTime,
       dailyContent: dailyExpense,
       previousDailyIndex: that.data.previousDailyIndex,
       previousDailyTime: that.data.previousDailyTime,
       totalAmount: (that.data.previousExpensesAmount - that.data.dailyExpensesAmount),
       totalKind: "totalExpenses",
     }
     this.alterDaily(e)
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
   alterDaily_Incomes() {
     // 插入记录
     let that = this;
     var dailyIncome = {
       dailyIncomesKind: that.data.dailyIncomesKind,
       dailyIncomesName: that.data.dailyIncomesName,
       dailyIncomesAmount: that.data.dailyIncomesAmount,
       dailyIncomesRemarks: that.data.dailyIncomesRemarks,
       dailyIncomesWay: that.data.dailyIncomesWay
     }
     var e = {
       dailyType: "daily_incomes",
       dailyTime: that.data.dailyIncomesTime,
       dailyContent: dailyIncome,
       previousDailyIndex: that.data.previousDailyIndex,
       previousDailyTime: that.data.previousDailyTime,
       totalAmount: -(that.data.previousIncomesAmount - that.data.dailyIncomesAmount),
       totalKind: "totalIncomes",
     }
     this.alterDaily(e)
   },




   alterDaily(e) {
     wx.cloud.callFunction({
         name: 'alter_daily',
         data: {
           option: "alterDaily",
           dailyType: e.dailyType,
           dailyTime: e.dailyTime,
           dailyContent: e.dailyContent,
           previousDailyIndex: e.previousDailyIndex,
           previousDailyTime: e.previousDailyTime,
           totalAmount: e.totalAmount,
           totalKind: e.totalKind,
         }
       }).then(res => {
         //  console.log(res)
         wx.navigateBack({
           delta: 1,
           success: function (res) {
             let page = getCurrentPages().pop();
             if (page == undefined || page == null) return;
             page.showAlterSuccess();
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









   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     var object = JSON.parse(options.object)
     let that = this;
     var strDatepart = object.dailyTime.split("-");
     this.setData({
       previousDailyTime: object.dailyTime,
       previousDailyIndex: object.dailyIndex,
       isExpense: object.isExpense
     })
     if (object.isExpense) {
       var expense = object.dailyContent
       that.setData({
         daily_type: '支出详细',
         dailyExpensesKind: expense.dailyExpensesKind,
         dailyExpensesName: expense.dailyExpensesName,
         dailyExpensesTime: object.dailyTime,
         dailyExpensesYear: strDatepart[0],
         dailyExpensesMonth: strDatepart[1],
         dailyExpensesDate: strDatepart[2],
         dailyExpensesAmount: expense.dailyExpensesAmount,
         previousExpensesAmount: expense.dailyExpensesAmount,
         dailyExpensesRemarks: expense.dailyExpensesRemarks,
         dailyExpensesWay: expense.dailyExpensesWay,
       })
     } else {
       var income = object.dailyContent
       that.setData({
         daily_type: '收入详细',
         dailyIncomesKind: income.dailyIncomesKind,
         dailyIncomesName: income.dailyIncomesName,
         dailyIncomesTime: object.dailyTime,
         dailyIncomesYear: strDatepart[0],
         dailyIncomesMonth: strDatepart[1],
         dailyIncomesDate: strDatepart[2],
         dailyIncomesAmount: income.dailyIncomesAmount,
         previousIncomesAmount: income.dailyIncomesAmount,
         dailyIncomesRemarks: income.dailyIncomesRemarks,
         dailyIncomesWay: income.dailyIncomesWay,
       })
     }
   }
 })