// components/alert.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'success'
    },
    score: {
      type: String,
      value: 0
    },
    times: {
      type: String,
      value: 0
    },
    error: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btns: [],
    userPhoto: '/assets/img/avatar.png',
    error_msg: '',
    isDebug: app.globalData.debug,
    fail_btns: [
      {
        text: '',
        url: '',
        opentype: ''
      },
      {
        text: '中奖记录',
        url: '/pages/index/index?showtips=1&index=1&t=' + new Date().getTime(),
        opentype: 'navigate'
      },
      {
        text: '再来一次',
        url: '/pages/game/index?restart=1',
        opentype: 'redirect'
      }
    ],
    success_btns: [
      {
        text: '立即抽奖',
        url: '/pages/game/index',
        opentype: 'navigate'
      },
      {
        text: '中奖记录',
        url: '/pages/index/index?showtips=1&index=1&t=' + new Date().getTime(),
        opentype: 'navigate'
      },
      {
        text: '再玩一次',
        url: '/pages/game/index?restart=1',
        opentype: 'redirect'
      },
    ]
  },
  attached: function () {
    var _self = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _self.setData({
          userPhoto: res.data.avatarUrl
        })
      },
    })
    if (this.properties.type === 'fail') {
      this.setData({
        btns: this.data.fail_btns
      })
    } else {
      this.setData({
        btns: this.data.success_btns
      })
    }

    var _msg = ''
    switch (_self.properties.error) {
      case 1001: _msg = '已经中过奖了，不能继续抽奖~'
        break;
      case 1002: _msg = '抽奖次数已用完~'
        break;
      case 1006: _msg = '登录状态过期，请重新登录'
        break;
      case 1007: _msg = '活动还没开始哦~'
        break;
      case 1008: _msg = '活动已经结束啦~'
        break;
    }
    console.log(_self.properties.error)
    _self.setData({
      error_msg: _msg
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGoLottery:function(){
      if (this.properties.times == 0) {
        wx.showModal({
          title: '提示',
          content: '抽奖次数用完了~',
          showCancel: false
        })
        return false
      }
      this.triggerEvent('golottery')
    },
    // bindLottery: function () {
    //   var _self = this.properties.lid
    //   wx.$http({
    //     url: app.api.lottery,
    //     lid: app.globalData.lid,
    //     success: function (res) {
    //       console.log(res)
    //     }
    //   })
    // }
  }
})
