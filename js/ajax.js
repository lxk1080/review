function json2url(json) {
  var arr = [];
  for (var k in json) {
    arr.push(k + '=' + json[k])
  }
  return arr.join('&')
}

function ajax(json) {
  json = json || {};
  if (!json.url) return;
  json.type = json.type || 'get';
  json.data = json.data || {};

  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest()
  } else {
    var xhr = window.ActiveXObject('Microsoft.XMLHTTP')
  }

  switch (json.type) {
    case 'get':
      var url = json.url + '?' + json2url(json.data);
      xhr.open('get', url.replace(/\?$/g, ''), true);
      xhr.send();
      break;
    case 'post':
      xhr.open('post', json.url, true);
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(json.data);
      break
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status>=200 && xhr.status < 300 || xhr.status === 304) {
        json.success && json.success(xhr.responseText)
      } else {
        json.error && json.error(xhr.status)
      }
    }
  }
}