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
    isDebug: app.globalData.debug,
    fail_btns: [
      {
        text: '再来一次',
        url: '/pages/game/index?restart=1',
        opentype: 'redirect'
      },
      {
        text: '中奖纪录',
        url: '/pages/index/index?showtips=1&index=1&t=' + new Date().getTime(),
        opentype: 'navigate'
      },
      {
        text: '返回首页',
        url: '/pages/index/index',
        opentype: 'navigate'
      },
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
        text: '在玩一次',
        url: '/pages/game/index?restart=1',
        opentype: 'redirect'
      },
    ]
  },
  attached: function () {
    var _self = this
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
