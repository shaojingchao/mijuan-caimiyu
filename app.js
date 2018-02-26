//app.js
import request from '/utils/request.js'
wx.$http = request
var _local = 'http://192.168.4.112:4000'
var _server = 'https://wx.tesoon.com'
var CONFIG = {
  HOSTNAME: _server,
  DEBUG: false
}
App({
  onShow: function () {
  },
  api: {
    gameBgMusic: CONFIG.HOSTNAME + '/statics/music/riddle_bgm.mp3',
    login: CONFIG.HOSTNAME + '/index/riddle/login.html', // 登录
    adduserinfo: CONFIG.HOSTNAME + '/index/riddle/ajax-save-user-info.html', // 领奖
    prizerecordlist: CONFIG.HOSTNAME + '/index/riddle/get-lottery-user-list.html', // 中奖记录
    myprizelist: CONFIG.HOSTNAME + '/index/riddle/ajax-get-user-lottery.html', // 我的奖励
    receivePrize: CONFIG.HOSTNAME + '/index/riddle/get-user-lottery-by-id.html', // 领取奖励
    lottery: CONFIG.HOSTNAME + '/index/riddle/ajax-draw-lottery.html', // 抽奖
    sendanwser: CONFIG.HOSTNAME + '/index/riddle/examine-answer.html', // 提交答题结果
    gamedata: CONFIG.HOSTNAME + '/index/riddle/index.html', // 随机获取谜语
    activityintro: CONFIG.HOSTNAME + '/index/riddle/get-lottery-info.html', // 活动介绍
    persontimes: CONFIG.HOSTNAME + '/index/riddle/get-person-time.html', // 活动介绍
  },
  onLaunch: function () {
    try {
      var res = wx.getStorageSync('userInfo')
      if (res) {
        console.log('res', res)
        this.globalData.userInfo = res
        console.log('globalData', this.globalData)
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  globalData: {
    userInfo: null,
    debug: CONFIG.DEBUG
  }
})