// pages/prize/receive.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prizeTitle: '',
    prizeIndate: '',
    region: [],
    customItem: '全部',
    subject: '',
    formFocus: '',
    validateMap: {
      receivers: false,
      phonenumber: false,
      address: false,
      detailaddress: false
    },
    validateMapTips: {
      receivers: '请填写收货人信息',
      phonenumber: '请填写手机号',
      address: '请选择地区',
      detailaddress: '请填写详细信息'
    },
    postData: {
      'username': '', // 用户名
      'userphone': '', // 手机号
      'useraddress': '', // 地址
      'kldm': '', // 1-文科 2-理科
      'grade': '3' // 1-高一 2-高二 3-高三
    }
  },

  // 选择学科
  bindSelectSubject: function (e) {
    var _id = e.currentTarget.dataset.id
    this.setData({
      subject: _id,
      'postData.kldm': _id
    })
  },
  bindReceiversInput: function (e) {
    this.setData({
      'postData.username': e.detail.value
    })
  },
  bindPhonenumberInput: function (e) {
    this.setData({
      'postData.userphone': e.detail.value
    })
  },
  bindDetailaddressInput: function (e) {
    this.setData({
      'postData.useraddress': this.data.region.concat(e.detail.value).join(',')
    })
  },

  // 选择地区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.validateItem('address', e.detail.value.length > 0 ? true : false)  
  },
  // 选择位置
  // chooseLocation:function () {
  //   // wx.chooseLocation({
  //   //   success: function (res) {
  //   //     console.log(res)
  //   //   }
  //   // })
  // },

  // 验证用户信息完整性
  bindValidate: function (e) {
    var _target = e.currentTarget.dataset
    var _value = e.detail.value
    if (!_value) {
      this.validateItem(_target.name, false)
      // wx.showToast({
      //   icon: 'none',
      //   title: _target.tips + '不能为空',
      // })
    } else if (_value && _target.name === 'phonenumber') {
      this.validateItem(_target.name, /^1\d{10}$/.test(_value))
      // wx.showToast({
      //   icon: 'none',
      //   title: '手机号为11位数字',
      // })
    } else {
      this.validateItem(_target.name, true)
    }
  },

  // 验证表单信息
  validateItem: function (name, val) {
    this.setData({
      ['validateMap.' + name]: val
    })
  },

  // 提交用户信息
  bindSendUserInfo: function () {
    var _self = this
    var _validateMap = this.data.validateMap
    var _validateMapTips = this.data.validateMapTips

    if (!this.data.subject) {
      wx.showModal({
        title: '提示',
        content: '请选择文理科！',
        showCancel: false
      })
      return false
    }

    // 验证表单信息
    for (let key in _validateMap) {
      if (!_validateMap[key]) {
        var _content = _validateMapTips[key]
        if (key === 'phonenumber' && _self.data.postData.userphone) {
          _content = '请检查手机号格式'
        }
        wx.showModal({
          title: '提示',
          content: _content,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              _self.setData({
                formFocus: key
              })
            }
          }
        })
        return false
      }
    }

    var _myinfo = this.data.postData
    console.log(_myinfo)
    wx.$http({
      url: app.api.adduserinfo,
      data: _myinfo,
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '信息已提交，奖品将于2018年5月10日全国统一发货',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })
  },
  onLoad: function (param) {
    console.log(param)
    var _self = this
    wx.showNavigationBarLoading()
    wx.$http({
      url: app.api.receivePrize,
      data: {
        id: param.id
      },
      success: function (res) {
        console.log(res)
        _self.setData({
          prizeTitle: res.data.data.title,
          prizeIndate: res.data.data.indate
        })
        wx.hideNavigationBarLoading()
      }
    })
  }
})