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
  if (option == 'getDailyExpensesAndIncomes') {
    var dailyYear = event.dailyYear;
    var dailyMonth = event.dailyMonth;
    var dailyDate = event.dailyDate;
    var dailyExpensesTime = `daily_expenses.${dailyYear}.${dailyMonth}.${dailyDate}`
    var dailyIncomesTime = `daily_incomes.${dailyYear}.${dailyMonth}.${dailyDate}`
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid,
        }).field({
          totalAssets:true,
          totalExpenses:true,
          totalIncomes:true,
          dailyLimit:true,
          [dailyExpensesTime]: true,
          [dailyIncomesTime]: true
        })
        .get()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else if (option == 'deleteDaily') {
    var dailyYear = event.dailyYear;
    var dailyMonth = event.dailyMonth;
    var dailyDate = event.dailyDate;
    var key = `${event.dailyType}.${dailyYear}.${dailyMonth}.${dailyDate}.${event.dailyIndex}`
    var preKey = `${event.dailyType}.${dailyYear}.${dailyMonth}.${dailyDate}`
    var totalKind=`${event.totalKind}`
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            [totalKind]:_.inc(event.totalAmount),
            'totalAssets':_.inc(event.totalAmount),
            [key]: _.remove()
          }
        })
        .then((res) => {
          db.collection('user').where({
            _openid: _openid
          }).update({
            data: {
              [preKey]:_.pull(null)
            }
          })
          .then((res) => {
           resolve(res)
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else if (option == 'getAssetsAndLimit') {
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid
        }).get()
        .then((res) => {
          var dic = {
            "totalAssets": res.data[0].totalAssets,
            "dailyLimit": res.data[0].dailyLimit
          }
          resolve(dic)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else if (option == 'updateTotalAssets') {
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            totalAssets: event.totalAssets
          }
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else if (option == 'updateDailyLimit') {
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            dailyLimit: event.dailyLimit
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