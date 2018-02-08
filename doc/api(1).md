## 1.随机获取谜语

请求地址（测试）： http://192.168.4.112:4000/index/riddle/index.html

请求方式： ```POST``` 请求

### 返回
```json
{
    "data": [
        {
            "answer": "书包",
            "content": "<p>天天上学，长进不大，满腹知识，不能消化。（打一物品）</p>",
            "id": "17",
            "options": [
                {
                    "correct": true,
                    "option": "书包"
                },
                {
                    "correct": false,
                    "option": "答案二"
                },
                {
                    "correct": false,
                    "option": "答案一"
                }
            ],
            "timeout": "60",
            "typeid": "1",
            "typename": "字谜"
        },
        {
            "answer": "喜上眉梢", // 谜语谜底（答案）
            "content": "<p><strong><img src=\"/uploads/tmp/images/2018/0205/1517824271193797.png\" title=\"1517824271193797.png\" alt=\"1.png\"/>（打一成语）</strong><br/></p>", // 谜面（问题）
            "id": "24", // 谜语编号
            "options": [ // 谜语选项
                {
                    "correct": false,   // 选项正误 true-正确 false-错误
                    "option": "喜形于色" // 谜语选项内容
                },
                {
                    "correct": false,
                    "option": "手舞足蹈"
                },
                {
                    "correct": true,
                    "option": "喜上眉梢"
                }
            ],
            "timeout": "60", // 超时时间
            "typeid": "3", // 谜语类型编号
            "typename": "表情谜语" // 谜语类型
        }
    ],
    "error": 0, // 错误码 0-无错误
    "limit": 10, // 返回条数
    "msg": "获取成功", // 提示信息
    "total": 22 // 谜语总数
}
```

## 2.获取奖品信息

请求地址（测试）： http://192.168.4.112:4000/index/riddle/get-lottery-info.html

请求方式： ```POST``` 请求

### 返回
```json
{
    "data": {
        "lid": "1", // 活动编号
        "title": "活动名称 猜灯谜活动", // 活动名称
        "abody": "<p>这里是活动介绍</p>", // 活动介绍
        "starttime": "1517328000", // 活动开始时间 时间戳
        "endtime": "1519142400", // 活动结束时间 时间戳
        "prizeinfo": [ // 奖品列表
            {
                "abody": "<p>sdfsdfsdafsd</p>", // 奖品名称
                "id": "1", // 奖品编号
                "iffuture": "0", // 0-中奖奖品 1-未中奖（谢谢惠顾）
                "title": "《天星密卷》"
            },
            {
                "abody": null,
                "id": "2",
                "iffuture": "1",
                "title": "很遗憾您未中奖~"
            }
        ]
    },
    "error": 0,
    "msg": "ok"
}
```
### 错误返回
```json
{"data":[],"error":1,"msg":"请求验证失败"}
```

## 3.小程序获取openid
请求地址（测试）： http://192.168.4.112:4000/index/riddle/login.html

请求方式： ```POST``` 请求

参数： 微信小程序提供的参数

### 返回
```json
{
    "data": {
        "code": "1", // 小程序请求自带参数中的 code
        "token": "随机生成", // 随机token
    },
    "error": 0,
    "msg": "ok"
}
```

## 4.抽奖接口
请求地址（测试）： http://192.168.4.112:4000/index/riddle/ajax-draw-lottery.html

请求方式： ```post``` 请求

参数： 
```token```
```lid``` ```/index/riddle/get-lottery-info.html``` 中的 ```lid``` 活动编号

### 返回

#### 未中奖
```json
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
```
#### 中奖
```json
{
    "data": {
        "id": 1,
        "isLuck": true,
        "msg": "恭喜您！^_^ ，获得《天星密卷》",
        "timesCount": 0
    },
    "error": 0,
    "msg": "ok"
}
```

### 错误
```
{
    "data": [],
    "error": 1002,
    "msg": "您的抽奖次数已用完^_^"
}

{
    "data": [],
    "error": 1001,
    "msg": "你已经中奖，请填写联系方式，如果已填写请等候小编联系哦。"
}
```

## 5.获取用户中奖信息（我的奖励）
请求地址（测试）： http://192.168.4.112:4000/index/riddle/ajax-get-user-lottery.html

请求方式： ```post``` 请求

参数： 
```token```

### 返回
```json
{
    "data": [
        {
            "id": 1,
            "indate": "2018.02.07 - 2018.03.07",
            "status": 1, // 0-未领取 1-已领取 2-已过期
            "title": "价值298元押题密卷1套"
        }
    ],
    "error": 0,
    "msg": "ok"
}
```

### 不存在奖品
```json
{
    "data": [],
    "error": 1,
    "msg": "无中奖记录"
}

```

## 6.录入用户信息
请求地址（测试）： http://192.168.4.112:4000/index/riddle/ajax-save-user-info.html

请求方式： ```post``` 请求

参数： 
```python
    post = {
    'username': 'fhy', // 用户名
    'userphone': '13839979270', // 手机号
    'useraddress': '河南省郑州市高新区', // 地址
    'kldm': '2', // 1-文科 2-理科
    'grade': '3', // 1-高一 2-高二 3-高三
    }
```

### 返回

#### 添加记录
```json
{
    "data": {
    },
    "error": 0,
    "msg": "添加记录成功"
}
```

#### 修改记录
```json
{
    "data": [],
    "error": 0,
    "msg": "修改成功"
}

```

### 错误
```json
{
    "data": [],
    "error": 1,
    "msg": "无中奖记录"
}
```

## 7.检查分数
请求地址（测试）： http://192.168.4.112:4000/index/riddle/examine-answer.html
请求方式： ```post``` 请求

### 请求参数
```json
{
    "token": "token",
    "data": [true, false, true, false, true, true, true, true, true]
}
```

### 返回
```json
{
    "data": {
        "grade": 70, // 分数
        "timesCount": 3, // 剩余次数
       
    },
    "error": 0,
    "msg": "ok"
}
```

## 8.获取中奖用户列表（中奖纪录）
请求地址（测试）： http://192.168.4.112:4000/index/riddle/get-lottery-user-list.html
请求方式： ```post``` 请求

### 返回
```json
{
    "data": [
        {
            "avatarurl": "http://wx.qlogo.cn/mmopen/OGnNoGtmdKiaU95FKccKmzaJA0cMCu18JzgKOeIW9cQmic8yWVAKEcn3Ol3oZ2aBGciby5NXmpNBOQrAfxaMJJdOUMtwaOQhW9N/0",
            "gettime": "18.02.07",
            "nickname": "快乐"
        }
    ],
    "error": 0,
    "msg": "获取成功"
}
```

## 9.获取参与人次
请求地址（测试）：http://192.168.4.112:4000/index/riddle/get-person-time.html
请求方式： ```post``` 请求

### 返回
```json
{
    "data": [
        {
          "personTime": 2
        }
    ],
    "error": 0,
    "msg": "获取成功"
}
```

## error 状态码
```$xslt
1001 已中奖 无法抽奖
1002 抽奖次数用尽
1003 授权失败
1004 该lid对应的商品不存在
1005 无中奖记录
1006 重新登录
```