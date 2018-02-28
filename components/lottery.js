// components/alert.js
var app = getApp()
Component({
  /**
   * 组件的初始数据
   */
  data: {
    step: '1',
    prizeId: '',
    result: 'luck',
    state: '',
    error: ''
  },
  attached: function () {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 抽奖
    /*
     {
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
              prizeId: res.data.data.id,
              result: res.data.data.isLuck === true ? 'luck' : 'fail',
              error: res.data.error
            })
          }, 1500)
        }
      })
    }
  }
})
