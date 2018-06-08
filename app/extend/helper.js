const moment = require('moment');
moment.locale('zh-cn'); // 使用中文

/**
 * 转换MongoDB的日常
 * @param {*} date IOS date时间
 */
exports.ago = function (date) { 
    date = moment(date);
    return date.fromNow();
}