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
  if (option == 'alterDaily') {
    if (event.dailyTime == event.previousDailyTime) {
      var dailyDatepart = event.dailyTime.split("-");
      var key = `${event.dailyType}.${dailyDatepart[0]}.${dailyDatepart[1]}.${dailyDatepart[2]}.${event.previousDailyIndex}`
      var totalKind=`${event.totalKind}`
      return new Promise((resolve, reject) => {
        db.collection('user').where({
            _openid: _openid
          }).update({
            data: {
              [totalKind]:_.inc(event.totalAmount),
              'totalAssets':_.inc(event.totalAmount),
              [key]: event.dailyContent
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
      var dailyDatepart=event.dailyTime.split("-");
      var preDailyDatepart=event.previousDailyTime.split("-");
      var preKey = `${event.dailyType}.${preDailyDatepart[0]}.${preDailyDatepart[1]}.${preDailyDatepart[2]}`
      var key = `${event.dailyType}.${dailyDatepart[0]}.${dailyDatepart[1]}.${dailyDatepart[2]}`
      var preKeyArray=`${preKey}.${event.previousDailyIndex}`
      var totalKind=`${event.totalKind}`
      return new Promise((resolve, reject) => {
        db.collection('user').where({
            _openid: _openid
          }).update({
            data: {
              [totalKind]:_.inc(event.totalAmount),
              'totalAssets':_.inc(event.totalAmount),
              [preKeyArray]:_.remove(),
              [key]: _.push(event.dailyContent)
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
    }
  } else {
    return "请求出错！"
  }
}