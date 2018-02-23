var app = getApp()
var api = app.api
Page({
  data: {
    userPhoto: '/assets/img/avatar.png',
    isDebug: app.globalData.debug,
    lid: 0, //活动id
    times_count: 0,
    queslist: [],
    ques_total: 0,
    ready_state: 'start', //状态 ready 3 2 1 done
    game_state: 'doing', // doing showscore lottery done
    ques_selected: null, // 当前题用户做答选项
    ques_times: 60, // 答题时间
    ques_heading: '', // 题文
    ques_items: [], // 选项
    current_ques: 0, // 当前题号
    user_answer: [false], // 用户答案
    music_state: 'stop',
    lottery: { 
    }
  },

  onLoad: function () {
    var _self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        _self.setData({
          userPhoto: res.data.avatarUrl
        })
      },
    })
    
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    wx.showLoading({
      title: '正在加载...',
    })
    wx.$http({
      url: api.gamedata,
      success: (res) => {
          this.setData({
            queslist: res.data.data,
            ques_total: res.data.data.length,
            ready_state: 'ready',
            lid: res.data.lid
          })
          app.globalData.lid = res.data.lid
          this.setCurrentQues(0)
          wx.hideLoading()
      }
    })
  },
  onHide: function () {
    wx.stopBackgroundAudio()
    this.bindMusicStop()
  },

  // 播放背景音乐
  bindMusicOn: function () {
    var _self = this
    if (this.data.music_state === 'playing') {
      wx.pauseBackgroundAudio()
      _self.setData({
        music_state: 'pause'
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: api.gameBgMusic,
        title: '纯音乐 - 欢快古典音乐',
        success: function () {
          _self.setData({
            music_state: 'playing'
          })
        },
        fail: function () {
          console.log('fail')
        }
      })
    }
  },

  // 停止背景音乐
  bindMusicStop: function () {
    wx.stopBackgroundAudio()
    this.setData({
      music_state: 'pause'
    })
  },

  // 设置当前题
  setCurrentQues: function (order) {
    var data = this.data.queslist[order]
    this.setData({
      ques_heading: data.content,
      ques_items: data.options,
      ques_times: parseInt(data.timeout),
      current_ques: order,
      ques_selected: null,
    })
  },
  // 准备答题
  bindReady: function () {
    this.setData({
      ready_state: 3
    })
    var _timer = setInterval(() => {
      if (this.data.ready_state > 1) {
        this.setData({
          ready_state: this.data.ready_state - 1
        })
      } else {
        this.setData({
          ready_state: 'done'
        })
        this.startAnswer()
        clearInterval(_timer)
      }
    }, 1000)
  },
  // 开始答题
  quesTimer: null,
  startAnswer: function () {
    //播放背景音乐
    this.bindMusicOn()
    if (this.data.ques_times > 0) {
      // 设置定时器
      this.quesTimer = setInterval(() => {
        if (this.data.ques_times > 0) {
          this.setData({
            ques_times: this.data.ques_times - 1
          })
        } // 答题时间结束
         else {
           // 如果还有题
          if (this.data.ques_total > (this.data.current_ques + 1)) {
            this.bindNextQues()
          }
          // 否则清除定时器，发送答案到服务器
           else {
            clearInterval(this.quesTimer)
            this.bindSendAnswer()
          }
        }
      }, 1000)
    } 
  },
  // 选项切换事件
  bindQuesSelect: function (e) {
    var _current_ques = this.data.current_ques
    var _value = e.currentTarget.dataset.value
    var _answer = e.currentTarget.dataset.answer
    this.setData({
      ques_selected: _value
    })
    console.log(this.data.current_ques)
    this.setData({
      [`user_answer[${_current_ques}]`]: _answer
    })
    console.log(this.data.user_answer)
  },
  // 下一题
  bindNextQues: function () {
    console.log('next ques')
    if (this.data.current_ques + 1 < this.data.ques_total) {
      this.setCurrentQues(this.data.current_ques + 1)
    } else {
      this.bindSendAnswer()
    }
  },

  // 提交答案
  bindSendAnswer: function () {
    // 清除答题计数器
    clearInterval(this.quesTimer)
    this.bindMusicStop() // 停止背景音乐
    var _self = this
    var _user_answer = this.data.user_answer
    var _lid = this.data.lid
    wx.showLoading({
      title: '加载中...'
    })
    console.log('发送答案')
    wx.$http({
      url: api.sendanwser,
      data: {
        data: _user_answer,
        lid: _lid
      },
      success: function (res) {
        _self.setData({
          game_state: 'showscore',
          game_score: res.data.data.grade.toString(),
          times_count: res.data.data.timesCount.toString()
        })
        wx.hideLoading()
      }
    })
  },
  // 去抽奖界面
  bindGoLottery: function (){
    this.setData({
      game_state: 'lottery',
    })
  },
  // 抽奖结束
  // bindLottery: function () {
  //   this.setData({
  //     game_state: 'done'
  //   })
  // }
})