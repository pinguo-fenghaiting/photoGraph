var DateManager = {
    init: function () {
        this.newDate = new Date();
        this.currentTimestamp = this.getCurrentTimestamp();
    },
    // 当前时间戳为
    getCurrentTimestamp: function () {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        // console.log("当前时间戳为：" + timestamp);
        return timestamp;
    },

    // 获取某个时间格式的时间戳
    // 2014-07-10 10:21:12的时间戳为：1404958872 
    getTimestamp: function (stringTime) {
        var timestamp2 = Date.parse(new Date(stringTime));
        timestamp2 = timestamp2 / 1000;
        console.log(stringTime + "的时间戳为：" + timestamp2);
        return timestamp2;
    },

    // 将当前时间换成时间格式字符串
    // Wed Jun 18 2014
    getTimeToDate:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toDateString());
        return newDate.toDateString();
    },
    // Wed, 18 Jun 2014 02:33:24 GMT
    getTimeToGMT:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toGMTString());
        return newDate.toGMTString();
    },
    // 2014-06-18T02:33:24.000Z
    getTimeToISO:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toISOString());
        return newDate.toISOString();
    },
    // 2014-06-18T02:33:24.000Z
    getTimeToJSON:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toJSON());
        return newDate.toJSON();
    },
    // 2014年6月18日
    getTimeToLocaleDate:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        // console.log(newDate.toLocaleDateString());
        return newDate.toLocaleDateString();
    },
    // 2014年6月18日 上午10:33:24 
    getTimeToLocale:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toLocaleString());
        return newDate.toLocaleString();
    },
    // 上午10:33:24 
    getTimeToLocaleTime:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toLocaleTimeString());
        return newDate.toLocaleTimeString();
    },
    // Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
    getTimeToStandard:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toString());
        return newDate.toString();
    },
    // 10:33:24 GMT+0800 (中国标准时间) 
    getTimeToTimeStandard:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toTimeString());
        return newDate.toTimeString();
    },
    // Wed, 18 Jun 2014 02:33:24 GMT
    getTimeToUTC:function (stringTime) {
        var stringTime = stringTime || this.currentTimestamp;
        var newDate = new Date();
        newDate.setTime(stringTime * 1000);
        console.log(newDate.toUTCString());
        return newDate.toUTCString();
    },
    // 2014-06-18 10:33:24
    getTime: function () {
        var newDate = new Date();
        Date.prototype.format = function(format) {
            var date = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S+": this.getMilliseconds()
            };
            if (/(y+)/i.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                    if (new RegExp("(" + k + ")").test(format)) {
                            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                    }
            }
            return format;
        }
        return newDate.format('yyyy-MM-dd h:m:s');
    }
}
module.exports = {
    DateManager: DateManager
}