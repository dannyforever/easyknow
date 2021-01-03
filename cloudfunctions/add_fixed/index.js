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
  if (option == 'addFixed_Expense') {
    var expenseID = event.fixedExpenseID;
    var expense = `fixed_expenses.${expenseID}`
    return new Promise((resolve, reject) => {

      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            [expense]: event.fixedExpense
          }
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else if (option == 'addFixed_Income') {
    var incomeID = event.fixedIncomeID;
    var income = `fixed_incomes.${incomeID}`
    return new Promise((resolve, reject) => {

      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            [income]: event.fixedIncome
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