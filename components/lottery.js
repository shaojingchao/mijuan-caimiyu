// components/alert.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */

  /**
   * 组件的初始数据
   */
  data: {
    step: '1',
    result: 'luck',
    state: ''
  },
  attached: function () {
  },

  /**
   * 组件的方法列表
   * {
    "data": {
        "id": 2,
        "isLuck": false,
        "msg": "很遗憾您未中奖~",
        "timesCount": 0
    },
    "error": 0,
    "msg": "ok"
}
   */
  methods: {
    // 抽奖
    bindLottery: function () {
      console.log('bindLottery')
      var _self = this
      _self.setData({
        state: 'lottering'
      })
      wx.$http({
        url: app.api.lottery,
        data: {
          lid: app.globalData.lid,
        },
        success: function (res) {
          console.log('lottering result', res)
          setTimeout(() => {
            _self.setData({
              step: '2',
              result: res.data.data.isLuck === true ? 'luck' : 'fail'
            })
          }, 1500)
        }
      })
    }
  }
})
