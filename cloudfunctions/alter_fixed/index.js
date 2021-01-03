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
  if (option == 'alterFixed') {
      var key = `${event.fixedType}.${event.fixedContentID}`
      return new Promise((resolve, reject) => {
        db.collection('user').where({
            _openid: _openid
          }).update({
            data: {
              [key]: event.fixedContent
            }
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }else if(option == 'deleteFixed'){
    var key = `${event.fixedType}.${event.fixedContentID}`
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid
        }).update({
          data: {
            [key]: _.remove()
          }
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }else {
    return "请求出错！"
  }
}