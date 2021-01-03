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
  if (option == 'getFixedExpensesAndIncomes') {
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid,
        }).field({
          'fixed_expenses': true,
          'fixed_incomes': true,
        })
        .get()
        .then((res) => {
          var fixed = {
            "fixed_expenses": res.data[0].fixed_expenses,
            "fixed_incomes": res.data[0].fixed_incomes,
          }
          resolve(fixed)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else if (option == 'deleteFixed') {
    var fixedID = event.fixedID
    var key = `${event.fixedType}.${fixedID}`
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            [key]: _.remove()
          }
        })
        .then((res) => {
          db.collection('user').where({
              _openid: _openid
            }).update({
              data: {
                [preKey]: _.pull(null)
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