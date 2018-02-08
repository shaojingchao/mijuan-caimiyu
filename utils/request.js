import login from 'login.js'

function request(param) {
  var _token = wx.getStorageSync('login_token')
  var _noop = function () { }

  // 登录态验证
  if (param.data && _token) {
    param.data.token = _token
  }
  param.data = Object.assign({
    token: _token
  }, param.data)
  wx.request({
    url: param.url,
    data: param.data,
    header: param.header,
    method: param.method || 'POST',
    dataType: param.dataType || 'json',
    responseType: param.responseType || 'text',
    success: function (res) {
      var _data = res.data

      // 数据正常
      if (_data.error === 0) {
        // 如果需要更新token
        console.log('_data', _data)
        if (_data.data.token) {
          wx.setStorageSync('login_token', _data.data.token)
        }
        param.success(res)
      } else if (_data.error === 1006) { // 登录超时
        wx.removeStorageSync('login_token')
        wx.showModal({
          content: '登录已过期，请重新登录',
          success: function (confirm, cancel) {
            if (confirm) {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          }
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          icon: 'none',
          title: _data.msg
        })
      }
    },
    fail: param.fail || _noop,
    complete: param.complete || _noop
  })
}
export default request