//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })

            this.addUser(app.globalData.userInfo)
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })

                this.addUser(res.userInfo)
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo

                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                    this.addUser(app.globalData.userInfo)
                },
                fail: err => {
                    console.log("err:", err)
                }

            })
        }
    },

    getUserInfo(e) {
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
            this.addUser(app.globalData.userInfo)
            // wx.switchTab({ url: '/pages/index/index' })
        }
    },

    // 如果数据库没有此用户，则添加
    addUser(user) {
        if (app.globalData.hasUser) {
            return
        }
        // 在此插入储存用户代码
        wx.cloud.callFunction({
            name: 'login',
            data: {
                option: "isNull"
            },
            success: res => {
                // console.log("loginIsNullRes:", res)
                if (res.result==0) {
                    this.addUserToDatabase(user)
                }
            },
            fail: err => {
                console.log("err:", err)
            }
        })
        app.globalData.nickName = user.nickName
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },

    addUserToDatabase(user) {
        const db = wx.cloud.database();
        const banner = db.collection('user');
        banner.add({
                data: {
                    nickName: user.nickName,
                    createTime: new Date(),
                    totalAssets: 0,
                    dailyLimit: 0,
                    totalExpenses:0,
                    totalIncomes:0,
                    daily_expenses: {},
                    daily_incomes: {},
                    fixed_expenses: {},
                    fixed_incomes: {}
                }
            })
            .then(res => {
                // console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
})