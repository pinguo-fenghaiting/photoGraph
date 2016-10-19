var {root, userCenterRoot} = require("./common.js");
var md5 = require('../utils/md5.js')

// 注册号码
// 11000000907
// 密码
// 123456

var User = {
    // 初始化
    init:function () {
        this.setUserParams();
        this.setPublicParams();
    },

    // 校验手机号码格式
    checkPhoneNum: function () {
        var _phoneNum = this.getUserName();
        if (/^1\d{10}$/.test(_phoneNum)) {
            return true;
        } else {
            console.log("用户名错误");
            return false;
        }
    },

    // 校验邮箱格式
    checkEmail: function () {
        var _email = this.getUserName();
        if (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(_email)) {
            return true;
        } else {
            console.log("邮箱格式错误");
            return false;
        }
    },

    // 校验密码格式
    checkPassword: function () {
        var _password = this.getPassword();
        var _length = _password.length;
        if (_length >= 6 && _length <= 20) {
            return true;
        } else {
            console.log("密码错误");
            return false;
        }
    },

    // 获取验证码
    getRequestRegisterCode: function (successCallback, failCallback) {
        if (!this.checkPhoneNum()) {
            failCallback && failCallback("用户名错误");
            return false;
        }
        if (!this.checkPassword()) {
            failCallback && failCallback("密码错误");
            return false;
        }
        // var url = root + '/manage/index/sendCode';
        var url = root + '/photoBazaar/sPro/sendCode';
        var data = {
            mobile: this.getUserName(),
            password: this.getPassword()
        };
        wx.request({
            url: url,
            data: data?data:{},
            medthod: 'post',
            header:{
                "Content-Type":"application/json"
            },
            success: function(res) {
                var data = res.data;
                successCallback && successCallback(res);
            }
        });
    },

    // 注册
    register: function (successCallback, failCallback) {
        if (!this.checkPhoneNum()) {
            failCallback && failCallback("用户名错误");
            return false;
        }
        if (this.getRegisterCode() == '' || this.getRegisterCode() == 'undefined') {
            failCallback && failCallback("验证码错误");
            return false;
        }
        // var url = userCenterRoot + '/api/v2/mobLoginForTest',
        var url = root + '/photoBazaar/sPro/register';
        var data = {
            mobile: this.getUserName(),
            vcode: this.getRegisterCode()
        };
        wx.request({
            url: url,
            data: data?data:{},
            medthod: 'post',
            header:{
                "Content-Type":"application/json"
            },
            success: function(res) {
                var data = res.data;
                if (res.data.status == "200") {
                    this.UserParams = data.data;
                    this.setToken(data.data.token);
                    this.setUserId(data.data.userId);
                    this.setPublicParams();
                    console.log(this.UserParams);
                }
                successCallback && successCallback(res);
            }.bind(this)
        });
    },

    // 登录
    login: function (successCallback, failCallback) {
        var data = {};
        var isMobile = true;

        if (isMobile) {
            data = {
                mobile: this.getMobile(),
                password: this.getPassword(),
                // password: md5.MD5(md5.MD5(this.getPassword())),
                appkey: "f6cb3d93e7ac1146"
            };
        }
        wx.request({
            url: root + '/photoBazaar/sPro/login',
            // url: userCenterRoot + '/api/v2/mobLoginForTest',
            // url: root + '/manage/index/photoGrapherLogin',
            data: data?data:{},
            medthod: 'post',
            header:{
                "Content-Type":"application/json"
            },
            success: function(res) {
                var data = res.data;
                if (res.data.status == "200") {
                    this.UserParams = data.data;
                    // this.setToken(data.data.utoken);
                    // this.setUserId(data.data.pgid);
                    this.setToken(data.data.token);
                    this.setUserId(data.data.userId);
                    this.setPublicParams();
                    // avatar: "https://phototask.c360dn.com/FgLLcrZnb5GdQ9ND8SEC6JqJFYZI"
                    // backgroundPic: ""
                    // birthday: ""
                    // cc: 86
                    // certificated: 2
                    // city: "1"
                    // country: "1"
                    // desc: ""
                    // description: ""
                    // email: ""
                    // firstLogin: false
                    // forgetPass: 0
                    // gender: ""
                    // language: "zh-Hans"
                    // lastLoginTime: 1476497959
                    // mobile: "18583269107"
                    // nickname: "丰哦吼吼吼"
                    // province: "51"
                    // regDateTime: 1462864073
                    // setPass: 1
                    // third: ""
                    // token: "VGkxQjhXNTZiTXprckt6NkVXOEsxcmwvYlFRenE3cDZGbkgyYndTSzNhMGU3Yll1Q2tCeW92WG5NMzFNQXNaZ2JkYlpOdUdOT1ZZRzhNOG96akN0UUhLNUkwQ1BFc0xsYUZHSDN3Y0tTUzBGYVBMUzNDaCtpQWF3T2JhT2pkVHM="
                    // tokenEnd: 1479090029
                    // tokenExpire: 2592000
                    // userId: "06943d573188c9317ee6e176"
                }
                successCallback && successCallback(data);
            }.bind(this)
        });
    },
    // 用户名
    setUserName: function (_userName) {
    	this._userName = _userName;
    },
    getUserName: function () {
    	return this._userName;
    },
    // 手机号
    setMobile: function (_mobile) {
    	this._mobile = _mobile;
    },
    getMobile: function () {
    	return this._mobile;
    },
    // 密码
    setPassword: function (_password) {
    	this._password = _password;
    },
    getPassword: function () {
    	return this._password;
    },
    // 注册验证码
    setRegisterCode: function (_registerCode) {
    	this._registerCode = _registerCode;
    },
    getRegisterCode: function () {
    	return this._registerCode;
    },
    // 用户信息
    setUserParams: function () {
        this.UserParams = {
            avatar: ''
        };
    },
    getUserParams: function () {
        return this.UserParams;
    },
    // token
    setToken: function (_token) {
        this._token = _token;
    },
    getToken: function () {
        return this._token;
    },
    // userId
    setUserId: function (_userId) {
        this._userId = _userId;
    },
    getUserId: function () {
        return this._userId;
    },
    // 设置公共参数
    setPublicParams: function() {

        // var data = {
            // mnc: "01",
            // device: "Unknown",
            // deviceId: "4A27FABF-D501-4AA8-BF4F-BA844D742BF2",
            // icc: "cn",
            // channel: "appstore",
            // appversion: "1.1.8",
            // appVersion: "1.1.8",
            // locale: "zh-Hans-CN",
            // sp: "0",
            // appKey: "f6cb3d93e7ac1146",
            // cid: "",
            // appname: "想拍就拍",
            // token: "eElOUUVuSGdzMC9UTSswaTk5R2NlWUJIVUlyUnRZL1pIOTl5VWY0REJyQTB6UklaNEhaajd3NDgvb3JnOVlYbg==",
            // platform: "iphone",
            // timestamp: "1476761678.339511",
            // certType: "production",
            // appName: "想拍就拍",
            // cnet: "wifi",
            // systemVersion: "10.0",
            // appkey: "f6cb3d93e7ac1146",
            // userId: "03be0558071a791624e21e83",
        // }
        this.publicParams = {
            mnc: "01",
            device: "Unknown",
            deviceId: "4A27FABF-D501-4AA8-BF4F-BA844D742BF2",
            icc: "cn",
            channel: "appstore",
            appversion: "1.1.8",
            appVersion: "1.1.8",
            locale: "zh-Hans-CN",
            sp: "0",
            appKey: "f6cb3d93e7ac1146",
            cid: "",
            appname: "想拍就拍",
            platform: "iphone",
            timestamp: "1476863455.339511",
            certType: "production",
            appName: "想拍就拍",
            cnet: "wifi",
            systemVersion: "10.0",
            appkey: "f6cb3d93e7ac1146",
            token: this.getToken(),
            userId: this.getUserId()
        };
    },
    
    getDataWithPublicParams: function(data) {
        var _publicParams = this.publicParams;
        for (var key in this.publicParams) {
            data[key] = _publicParams[key];
        }
        return data;
    },


}

module.exports = {
    User: User
}