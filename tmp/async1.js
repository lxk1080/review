console.log('async1');





/**
 *  cookie 的 设置、获取、检查、删除、清空
 */
function CookieUtil() {
  this.setCookie = setCookie;
  this.getCookie = getCookie;
  this.checkCookie = checkCookie;
  this.delCookie = delCookie;
  this.clearCookies = clearCookies;

  /**
   * 设置cookie（有效日期可省略，单位：天）
   */
  function setCookie(c_name, value, expiredays) {
    var nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + expiredays);
    if(typeof value == 'object') {
      value = JSON.stringify(value);
    }
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + nowDate.toGMTString());
  }

  // 获取cookie
  function getCookie(c_name) {
    if(document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if(c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if(c_end == -1) {
          c_end = document.cookie.length
        }
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return null;
  }

  // 检测cookie是否存在
  function checkCookie(name) {
    var cookieValue = getCookie(name);
    if(cookieValue != null) {
      alert('cookie "' + name + '" 已存在!');
    } else {
      alert('不存在的cookie "' + name + '"');
    }
  }

  // 删除cookies
  function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

  //删除所有cookies
  function clearCookies() {
    var cookies = document.cookie.split(";");
    for(var i = 0; i < cookies.length; i++) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      var domain = location.host.substr(location.host.indexOf('.'));
      document.cookie = name + "=;expires=" + exp.toGMTString();
    }
  }
}