
function json2url(data) {
  const res = [];
  for (let key in data) {
    const str = `${key}=${data[key]}`;
    res.push(str);
  }
  return res.join('&');
}

// 简单点的，如果面试可以写写
function myAjax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status === 404) {
          reject('404 not find');
        }
      }
    }
    xhr.send();
  });
}

// 复杂点的，有需要可以用
function ajax(json) {
  // 1. 处理传递的json对象
  json = json || {};
  if (!json.url) return;
  const url = json.url;
  const type  = (json.type || 'get').toLowerCase();
  const data = json2url(json.data || {});

  // 2. 实例化XMLHttpRequest对象
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // 兼容 IE 的处理
    xhr = window.ActiveXObject('Microsoft.XMLHTTP');
  }

  // 3. 处理get和post请求
  switch (type) {
    case 'get':
      url = `${url}?${data}`;
      xhr.open('get', url.replace(/\?$/g, ''), true);
      xhr.send();
      break;
    case 'post':
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(data);
      break;
    default: throw new Error('the request type is not correct!');
  }

  // 4. 处理响应
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        json.success && json.success(xhr.responseText);
      } else {
        json.error && json.error(xhr.status);
      }
    }
  }
}


