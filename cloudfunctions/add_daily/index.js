// 云函数入口文件
//npm install --save
//npm install --save wx-server-sdk@latest

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'easyknow-6g56y1u7dc710405'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext();
  let option = event.option;
  let _openid = wxContext.OPENID
  if (option == 'addDaily_Expense') {
    var expenseYear = event.dailyExpensesYear;
    var expenseMonth = event.dailyExpensesMonth;
    var expenseDate = event.dailyExpensesDate;
    var expenseTime = `daily_expenses.${expenseYear}.${expenseMonth}.${expenseDate}`
    return new Promise((resolve, reject) => {

      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            'totalExpenses':_.inc(-(event.dailyExpense.dailyExpensesAmount)),
            'totalAssets':_.inc(-(event.dailyExpense.dailyExpensesAmount)),
            [expenseTime]: _.push(event.dailyExpense)
          }
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else if (option == 'addDaily_Incomes') {
    var incomesYear = event.dailyIncomesYear;
    var incomesMonth = event.dailyIncomesMonth;
    var incomesDate = event.dailyIncomesDate;
    var incomesTime = `daily_incomes.${incomesYear}.${incomesMonth}.${incomesDate}`
    return new Promise((resolve, reject) => {

      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            'totalIncomes':_.inc((event.dailyIncomes.dailyIncomesAmount)),
            'totalAssets':_.inc((event.dailyIncomes.dailyIncomesAmount)),
            [incomesTime]: _.push(event.dailyIncomes)
          }
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else {
    return "请求出错！"
  }
}