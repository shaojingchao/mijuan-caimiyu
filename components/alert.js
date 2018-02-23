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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btns: [],
    userPhoto: '/assets/img/avatar.png',
    isDebug: app.globalData.debug,
    fail_btns: [
      {
        text: '',
        url: '',
        opentype: ''
      },
      {
        text: '中奖纪录',
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
        text: '中奖纪录',
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGoLottery:function(){
      if (this.properties.times == 0) {
        wx.showModal({
          title: '提示',
          content: '今天的机会用完了-_-',
          showCancel: false
        })
        return false
      }
      this.triggerEvent('golottery')
    },
    bindLottery: function () {
      var _self = this.properties.lid
      wx.$http({
        url: app.api.lottery,
        lid: app.globalData.lid,
        success: function (res) {
          console.log(res)
        }
      })
    }
  }
})
