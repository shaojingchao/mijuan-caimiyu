//index.js
import login from '../../utils/login.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    tabCurrentIndex: '0',
    routeCache: '',
    hasTipsData: false, // 是否已加载过锦囊数据
    prizeRecoreList: [],
    myPrize: [],
    activityIntro: {},
    personTimes: '-',
    showTips: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow: function (a,b,c) {
    var _self = this

    // 检查登陆态
    wx.checkSession({
      success: function () {
        if (!wx.getStorageSync('login_token')) {
          wx.showLoading({
            title: '正在登录...'
          })
          login(app, app.api.login, function (res) {
            console.log('已重新登录')
            wx.hideLoading()
          })
        }
      },
      fail: function (res) {
        login(app, app.api.login) //重新登录
        console.log('checkSession: fail')
      }
    })

    // 获取参与人数
    wx.$http({
      url: app.api.persontimes,
      success: function (res) {
        _self.setData({
          personTimes: res.data.data.personTime
        })
      }
    })
    this.parseRouteParam(this.options)
  },

  // 解析页面参数
  parseRouteParam: function (opts) {
    var _val = opts.showtips + opts.index + opts.t
    if (this.data.routeCache === _val){
      return false
    } else {
      this.setData({
        routeCache: _val
      })
    }
    if (opts.showtips == 1) {
      this.getTipsData()
      this.setData({
        showTips: true
      })
    }
    if (opts.index) {
      this.setData({
        tabCurrentIndex: opts.index
      })
    }
  },
  // 查看活动锦囊
  bindShowTips: function () {
    this.getTipsData()
    this.setData({
      showTips: true
    })
  },
  // 获取活动锦囊数据
  getTipsData: function () {
    // 避免重复请求数据
    if (this.data.hasTipsData) return false
    var _self = this
    // 活动介绍
    wx.$http({
      url: app.api.activityintro,
      success: function (res) {
        console.log('活动介绍', res)
        _self.setData({
          activityIntro: res.data.data,
          hasTipsData: true
        })
      }
    })

    // 中奖纪录
    wx.$http({
      url: app.api.prizerecordlist,
      success: function (res) {
        console.log('中奖纪录', res)
        _self.setData({
          prizeRecoreList: res.data.data
        })
        console.log(res.data.data[0])
      }
    })

    // 我的奖励
    wx.$http({
      url: app.api.myprizelist,
      success: function (res) {
        
        _self.setData({
          myPrize: res.data.data
        })
        console.log('我的奖励', res, _self.data.myPrize)

      }
    })
  },
  // 关闭活动锦囊
  bindHideTips: function () {
    // if(this.options.showtips == 1) {
    //   wx.redirectTo({
    //     url: '/pages/index/index'
    //   })
    // }
    this.setData({
      showTips: false
    })
  },

  // 活动锦囊 - tab切换
  tabTipsToggle: function (e) {
    this.setData({
      tabCurrentIndex: e.currentTarget.dataset.index
    })
  },

  // 中奖记录加载更多
  scrollToBottom1: function () {
    console.log(this.data.prizeRecoreList)
    var _prizeRecoreList = this.data.prizeRecoreList
    this.setData({
      prizeRecoreList: _prizeRecoreList.concat([1, 2, 3, 4])
    })
  },

  // 开始游戏
  bindStartGame: function () {
    wx.navigateTo({
      url: '../game/index'
    })
  },

  // 领取奖品
  bindReceivePrize: function (e) {
    var _status = e.currentTarget.dataset.status
    var _id = e.currentTarget.dataset.id
    if (_status != 1) {
      wx.navigateTo({
        url: '../prize/receive?id='+_id,
      })
    }
  }
})
