// 处理换行
export default {
  // 处理换行
  br_show: (val) => {
    if (val && typeof (val) == "string") {
      return val.replace(/[<>]/g, (a) => {
        return { "<": "&lt;", ">": "&gt;", }[a];
      }).replace(/\n/g, "<br/>");
    }
    else if (val) {
      return String(val).replace(/[<>]/g, (a) => {
        return { "<": "&lt;", ">": "&gt;", }[a];
      }).replace(/\n/g, "<br/>");
    }
    else {
      return "";
    }
  },
  // 解析树数据 参数：数据 ，子集key，存放的新数组，取出的数据
  filter_data: function (data, son, object, answer) {
    let storage = {};
    if (!Array.isArray(data)) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      for (let key in object) {
        storage[key] = data[i][key];
      }
      answer.push(storage);
      storage = {};
      if (data[i][son] && (data[i][son].length != 0)) {
        this.filterData(data[i][son], son, object, answer);
      }
    }
    return answer;
  },
  // 校验权限
  comparison: (rule, roles) => {
    let result = false
    for (let i = 0; i < rule.length; i++) {
      if (roles.indexOf(rule[i]) !== -1) {
        result = result || true
      }
    }
    return result
  },
  // 过滤搜索内容 参数-对象Object
  filter_search(val) {
    return new Promise((resolve) => {
      let result = {};
      for (let k in val) {
        if (val[k].value && val[k].value.length) {
          result[k] = val[k]
        }
      }
      resolve(result)
    })
  },
  // 获取本周、上周、下周的起止日期
  getMonday(type, dates) {
    // type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
    let now = new Date();
    let nowTime = now.getTime();
    let day = now.getDay();
    let longTime = 24 * 60 * 60 * 1000;
    let n = longTime * 7 * (dates || 0);
    let dd = ''
    if (type == "s") {
      dd = nowTime - (day - 1) * longTime + n;
    }
    if (type == "e") {
      dd = nowTime + (7 - day) * longTime + n;
    }
    dd = new Date(dd);
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;
    let d = dd.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    day = y + "-" + m + "-" + d;
    return day;
  },
  //校验手机号码
  isPhoneNum(num) {
    return /^1[3456789]\d{9}$/.test(num)
  },
  //去空格
  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  //数组去重
  removeDuplicateItems(arr) {
    return [...new Set(arr)]
  },

  IsURL(linkUrl){ 
    var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
    + '?(([0-9a-z_!~*\'().&amp;=+$%-]+: )?[0-9a-z_!~*\'().&amp;=+$%-]+@)?' //ftp的user@
    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
    + '|' // 允许IP和DOMAIN（域名）
    + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
    + '[a-z]{2,6})' // first level domain- .com or .museum
    + '(:[0-9]{1,4})?' // 端口- :80
    + '((/?)|' // a slash isn't required if there is no file name
    + '(/[0-9a-z_!~*\'().;?:@&amp;=+$,%#-]+)+/?)$';
    var reg = new RegExp(strRegex);
    if(!reg.test(linkUrl.toLowerCase())){
      return false;
    } else {
      return true
    }
  }
}
