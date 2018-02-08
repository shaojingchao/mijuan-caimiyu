//app.js
import request from '/utils/request.js'
wx.$http = request

var CONFIG = {
  HOSTNAME: 'http://192.168.4.112:4000',
  DEBUG: false
}
var HOSTNAME = 'http://192.168.4.112:4000'
App({
  onShow: function () {
  },
  api: {
    login: CONFIG.HOSTNAME + '/index/riddle/login.html', // 登录
    adduserinfo: CONFIG.HOSTNAME + '/index/riddle/ajax-save-user-info.html', // 领奖
    prizerecordlist: CONFIG.HOSTNAME + '/index/riddle/get-lottery-user-list.html', // 中奖记录
    myprizelist: CONFIG.HOSTNAME + '/index/riddle/ajax-get-user-lottery.html', // 我的奖励
    lottery: CONFIG.HOSTNAME + '/index/riddle/ajax-draw-lottery.html', // 抽奖
    sendanwser: CONFIG.HOSTNAME + '/index/riddle/examine-answer.html', // 提交答题结果
    gamedata: CONFIG.HOSTNAME + '/index/riddle/index.html', // 随机获取谜语
    activityintro: CONFIG.HOSTNAME + '/index/riddle/get-lottery-info.html', // 活动介绍
    persontimes: CONFIG.HOSTNAME + '/index/riddle/get-person-time.html', // 活动介绍
  },
  globalData: {
    userInfo: null,
    debug: CONFIG.DEBUG
  }
})