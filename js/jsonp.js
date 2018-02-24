/**
 * [util 工具类]
 */
let util = {};

/**
 * 返回数组的指定项
 */
util.indexOf = function (array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
};

/**
 * 判断是不是ie
 * 如果是ie返回版本号，不是则返回false
 */
util.isIE = function () {
  let myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/**
 * 对象浅复制
 */
util.extend = function (dst, obj) {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      dst[i] = obj[i];
    }
  }
};

/**
 * 获取一个随机的5位字符串
 */
util.getName = function (prefix) {
  return prefix + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};

/**
 * 判断是否为函数
 */
util.isFunction = function (source) {
  return Object.prototype.toString.call(source) === '[object Function]'
};

/**
 * 在页面中注入js脚本
 */
util.createScript = function (url, charset) {
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  charset && script.setAttribute('charset', charset);
  script.setAttribute('src', url);
  script.async = true;
  return script;
};

/**
 * jsonp
 */
util.jsonp = function (url, onsuccess, onerror, charset) {
  // 1. 设置回调函数名
  let callbackName = util.getName('Callback_');

  // 2. 设置回调函数体
  window[callbackName] = function () {
    if (onsuccess && util.isFunction(onsuccess)) {
      onsuccess(arguments[0]);
    }
  };

  // 3. 创建script对象
  let script = util.createScript(url + '?jsonpCallback=' + callbackName, charset);

  // 在script加载完成后，清除script对象，如果加载出错，则执行错误回调函数
  // FF只支持onload ，IE只支持onreadstatechange，这里兼容写法
  script.onload = script.onreadystatechange = function () {
    // FF的判断语句 || IE的判断语句
    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
      // 清除加载完成后的事件
      script.onload = script.onreadystatechange = null;
      // 移除该script对象
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // 删除函数或变量
      window[callbackName] = null;
    }
  }
  script.onerror = function () {
    if (onerror && util.isFunction(onerror)) {
      onerror();
    }
  }

  // 4. 添加script标签到dom中
  document.getElementsByTagName('head')[0].appendChild(script);
};

/**
 * crc32加密
 */
util.crc32 = function (url) {
  let a = document.createElement('a');
  a.href = url;
  let T = (function () {
    let c = 0,
      table = new Array(256);
    for (let n = 0; n != 256; ++n) {
      c = n;
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
      table[n] = c;
    }
    return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
  })();
  let crc32_str = function (str) {
    let C = -1;
    for (let i = 0, L = str.length, c, d; i < L;) {
      c = str.charCodeAt(i++);
      if (c < 0x80) {
        C = (C >>> 8) ^ T[(C ^ c) & 0xFF];
      } else if (c < 0x800) {
        C = (C >>> 8) ^ T[(C ^ (192 | ((c >> 6) & 31))) & 0xFF];
        C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xFF];
      } else if (c >= 0xD800 && c < 0xE000) {
        c = (c & 1023) + 64;
        d = str.charCodeAt(i++) & 1023;
        C = (C >>> 8) ^ T[(C ^ (240 | ((c >> 8) & 7))) & 0xFF];
        C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 2) & 63))) & 0xFF];
        C = (C >>> 8) ^ T[(C ^ (128 | ((d >> 6) & 15) | ((c & 3) << 4))) & 0xFF];
        C = (C >>> 8) ^ T[(C ^ (128 | (d & 63))) & 0xFF];
      } else {
        C = (C >>> 8) ^ T[(C ^ (224 | ((c >> 12) & 15))) & 0xFF];
        C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 6) & 63))) & 0xFF];
        C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xFF];
      }
    }
    return C ^ -1;
  };
  let r = a.pathname + '?r=' + Math.random().toString(10).substring(2);
  if (r[0] != '/') {
    r = '/' + r;
  }
  let s = crc32_str(r) >>> 0;
  let is_web = location.protocol.indexOf('http') > -1;
  return (is_web ? [location.protocol, a.hostname] : ['http:', a.hostname]).join('//') + r + '&s=' + s;
};

export default util;