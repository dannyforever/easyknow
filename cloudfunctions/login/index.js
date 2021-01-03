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

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext();
  let option = event.option;
  let _openid = wxContext.OPENID
  if (option == 'isNull') {
    return new Promise((resolve, reject) => {
      db.collection('user').where({
          _openid: _openid
        }).get()
        .then((res) => {
          if (res.data[0] == null) {
            resolve(0)
          } else {
            resolve(1)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else {
    return "请求出错！"
  }


}