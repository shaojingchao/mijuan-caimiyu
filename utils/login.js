function login(app, url, cb) {
  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (!res.authSetting['scope.userInfo']) {
        wx.authorize({
          scope: 'scope.userInfo',
          success: () => {
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          },
          fail: () => {
            wx.showToast({
              icon: 'none',
              title: '获取登录权限失败'
            })
          }
        })
      }
    }
  })

  console.log(app, url)

  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  // 登录
  wx.login({
    success: res => {
      var js_code = res.code
      console.log('js_code', js_code)
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo
          wx.$http({
            url: url,
            data: {
              code: js_code,
              rawData: res.rawData,
              signature: res.signature,
              encryptedData: res.encryptedData,
              iv: res.iv
            },
            success: res => {
              console.log(res)
              cb && cb(res)
            }
          })
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(res)
          }
        },
        fail: (res) => {
          wx.showToast({
            icon: 'none',
            title: '获取用户信息失败'
          })
        }
      })
    },
    fail: (res) => {
      console.log(res.errMsg)
      wx.showToast({
        icon: 'none',
        title: '获取登录权限失败'
      })
    }
  })
}

export default login